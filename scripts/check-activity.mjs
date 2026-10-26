// Weekly activity check for the list.
//
// An entry passes when its project is not archived and has a release (a GitHub
// release or a tag) or a commit on its default branch within the last 12
// months. Entries that fail are removed from the README, and the workflow turns
// that change into a pull request for review. Anything that needs a person to
// decide (a missing repository, a moved repository, a repository with too many
// releases or tags to read in full, a repository whose organization blocks the
// API token and that shows no recent commit, an entry with no repository to
// check) is only reported, never removed.
//
// Usage: node scripts/check-activity.mjs <readme> <output-dir>
// Writes <output-dir>/report.md and <output-dir>/outcome, plus
// <output-dir>/commit-message.txt when entries were removed. The outcome is
// "removed" when entries were removed, "unclear" when nothing was removed but
// some entries could not be judged, and "clean" otherwise.
// GITHUB_TOKEN must allow reading public repositories.

import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { setTimeout as sleep } from 'node:timers/promises';

// Entries that link to documentation or a product page, but whose releases
// come from a GitHub repository.
const SOURCE_REPOS = {
  'https://kafka.apache.org/documentation/#basic_ops': 'apache/kafka',
  'https://kafka.apache.org/documentation/#api': 'apache/kafka',
  'https://kafka.apache.org/documentation/streams/': 'apache/kafka',
  'https://kafka.apache.org/documentation/#georeplication': 'apache/kafka',
  'https://iceberg.apache.org/docs/latest/kafka-connect/': 'apache/iceberg',
  'https://testcontainers.com/modules/kafka/': 'testcontainers/testcontainers-java',
  'https://factorhouse.io/kpow/': 'factorhouse/kpow',
};

// Repositories per GraphQL request, kept well below the API's node limits.
const BATCH_SIZE = 25;

// Releases and tags per page, the most the API returns at once.
const PAGE_SIZE = 100;

// Neither list can be sorted by the date that counts: releases sort by when
// they were created rather than published, and tags by the date of the commit
// they point to. So before removing a project, every page of both lists is
// read. A repository with more pages than this is reported instead.
const MAX_PAGES = 20;

const RELEASE_PAGE = 'pageInfo { hasNextPage endCursor } nodes { publishedAt }';

// An annotated tag carries its own date; a lightweight tag only has its commit's.
const TAG_PAGE = `pageInfo { hasNextPage endCursor }
    nodes {
      target {
        ... on Commit { committedDate }
        ... on Tag { tagger { date } target { ... on Commit { committedDate } } }
      }
    }`;

const USER_AGENT = 'awesome-kafka-activity-check';

const RELEASE_ORDER = 'orderBy: { field: CREATED_AT, direction: DESC }';
const TAG_ORDER = 'refPrefix: "refs/tags/", orderBy: { field: TAG_COMMIT_DATE, direction: DESC }';

// Most repositories pass on these fields alone. Listing releases and tags is
// the slow part, and a batch that lists them for every repository can run past
// GitHub's time limit, so they are read one repository at a time and only for
// those that would otherwise be removed.
const REPO_FIELDS = `
  nameWithOwner
  isArchived
  defaultBranchRef { target { ... on Commit { committedDate } } }
  latestRelease { publishedAt }`;

const [readmePath, outDir] = process.argv.slice(2);
if (!readmePath || !outDir) {
  console.error('Usage: node scripts/check-activity.mjs <readme> <output-dir>');
  process.exit(2);
}
const token = process.env.GITHUB_TOKEN;
if (!token) {
  console.error('GITHUB_TOKEN is not set.');
  process.exit(2);
}

const today = new Date();
const cutoff = new Date(today);
cutoff.setUTCFullYear(cutoff.getUTCFullYear() - 1);
const day = (date) => date.toISOString().slice(0, 10);

const lines = readFileSync(readmePath, 'utf8').split('\n');
const entries = parseEntries(lines);
const repos = [...new Set(entries.map((entry) => entry.repo).filter(Boolean))];
const status = await fetchStatus(repos);
for (const repo of status.values()) {
  if (!repo.isArchived && !repo.restricted && !isActive(repo)) {
    await readReleasesAndTags(repo);
  }
}

const removed = [];
const notFound = [];
const moved = [];
const incomplete = [];
const restricted = [];
const unchecked = [];
for (const entry of entries) {
  if (!entry.repo) {
    unchecked.push(entry);
    continue;
  }
  const repo = status.get(entry.repo.toLowerCase());
  if (!repo) {
    notFound.push(entry);
    continue;
  }
  if (repo.nameWithOwner.toLowerCase() !== entry.repo.toLowerCase()) {
    moved.push({ ...entry, movedTo: repo.nameWithOwner });
    continue;
  }
  if (repo.isArchived) {
    removed.push({ ...entry, ...repo, reason: 'Archived' });
  } else if (!isActive(repo)) {
    if (repo.restricted) restricted.push({ ...entry, lastCommit: repo.lastCommit });
    else if (repo.incomplete) incomplete.push(entry);
    else removed.push({ ...entry, ...repo, reason: 'No recent activity' });
  }
}

const removedLines = new Set(removed.map((entry) => entry.index));
const kept = lines.filter((_, index) => !removedLines.has(index));
const emptySections = findEmptySections(kept);

const unclear = notFound.length + moved.length + incomplete.length + restricted.length > 0;
const outcome = removed.length > 0 ? 'removed' : unclear ? 'unclear' : 'clean';
writeFileSync(join(outDir, 'report.md'), buildReport());
writeFileSync(join(outDir, 'outcome'), `${outcome}\n`);
if (removed.length > 0) {
  writeFileSync(readmePath, kept.join('\n'));
  writeFileSync(join(outDir, 'commit-message.txt'), buildCommitMessage());
}

console.log(
  `Checked ${entries.length} entries against ${repos.length} repositories: ` +
    `${removed.length} removed, ${notFound.length} not found, ${moved.length} moved, ` +
    `${incomplete.length} not read in full, ${restricted.length} blocked by their organization, ` +
    `${unchecked.length} without a repository.`,
);

function parseEntries(readmeLines) {
  const found = [];
  let section = '';
  readmeLines.forEach((line, index) => {
    const heading = line.match(/^#{2,3} (.+)$/);
    if (heading) {
      section = heading[1];
      return;
    }
    const item = line.match(/^- \[([^\]]+)\]\((https?:\/\/[^)]+)\)/);
    if (item) {
      found.push({ index, name: item[1], link: item[2], section, repo: repoFor(item[2]) });
    }
  });
  return found;
}

function repoFor(link) {
  const github = link.match(/^https:\/\/github\.com\/([^/#?]+)\/([^/#?]+)/);
  return github ? `${github[1]}/${github[2]}` : (SOURCE_REPOS[link] ?? null);
}

function repositoryArgs(name) {
  const [owner, repo] = name.split('/');
  return `owner: ${JSON.stringify(owner)}, name: ${JSON.stringify(repo)}`;
}

async function fetchStatus(names) {
  const result = new Map();
  for (let start = 0; start < names.length; start += BATCH_SIZE) {
    const batch = names.slice(start, start + BATCH_SIZE);
    const fields = batch.map((name, i) => `r${i}: repository(${repositoryArgs(name)}) {${REPO_FIELDS}}`);
    const response = await graphql(`query {\n${fields.join('\n')}\n}`);
    const blocked = [];
    const unexpected = [];
    for (const error of response.errors ?? []) {
      // FORBIDDEN on a whole repository means its organization restricts the
      // token, with an IP allow list for example.
      const name = error.path?.length === 1 ? batch[Number(error.path[0].slice(1))] : undefined;
      if (error.type === 'NOT_FOUND') continue;
      if (error.type === 'FORBIDDEN' && name) blocked.push(name);
      else unexpected.push(error);
    }
    if (unexpected.length > 0) {
      throw new Error(`GitHub API errors: ${JSON.stringify(unexpected)}`);
    }
    batch.forEach((name, i) => {
      const repo = response.data?.[`r${i}`];
      if (repo) result.set(name.toLowerCase(), summarize(repo));
    });
    for (const name of blocked) {
      const repo = await fetchWithoutToken(name);
      if (repo) result.set(name.toLowerCase(), repo);
    }
  }
  return result;
}

// Some organizations only allow API access from their own IP addresses, and
// GitHub applies that to the workflow's token even for public repositories.
// Signed-out requests to github.com are not affected, so these repositories are
// read from their page (whether they are archived) and their commit feed (the
// latest commit on the default branch). Neither lists every release and tag, so
// a repository without a recent commit is reported instead of removed, and so
// is one whose page or feed cannot be read.
async function fetchWithoutToken(name) {
  const repo = {
    nameWithOwner: name,
    isArchived: false,
    lastRelease: null,
    lastCommit: null,
    incomplete: false,
    restricted: true,
  };
  const page = await fetchSignedOut(`https://github.com/${name}`);
  if (page.status === 404) return null;
  if (!page.ok) return repo;

  // A renamed or transferred repository redirects to its new address. The page
  // also describes other repositories, such as the parent of a fork, so the
  // archived flag is taken from the object for this one.
  const current = new URL(page.url).pathname.split('/').slice(1, 3).join('/').toLowerCase();
  const match = [...page.text.matchAll(/"name":"([^"]+)","ownerLogin":"([^"]+)"[^}]*?"isArchived":(true|false)/g)].find(
    ([, repoName, owner]) => `${owner}/${repoName}`.toLowerCase() === current,
  );
  if (!match) return repo;
  repo.nameWithOwner = `${match[2]}/${match[1]}`;
  repo.isArchived = match[3] === 'true';
  if (repo.isArchived) return repo;

  const feed = await fetchSignedOut(`https://github.com/${repo.nameWithOwner}/commits.atom`);
  if (feed.ok) {
    repo.lastCommit = latest([...feed.text.matchAll(/<updated>([^<]+)<\/updated>/g)].map((date) => date[1]));
  }
  return repo;
}

// A network error counts as a failed request, so the entry is reported
// instead of stopping the whole check.
async function fetchSignedOut(url) {
  try {
    const response = await fetch(url, { headers: { 'user-agent': USER_AGENT } });
    return { status: response.status, ok: response.ok, url: response.url, text: response.ok ? await response.text() : '' };
  } catch {
    return { status: 0, ok: false, url, text: '' };
  }
}

// Reads the release and tag pages of a repository that would otherwise be
// removed, stopping as soon as a recent date turns up.
async function readReleasesAndTags(repo) {
  const releases = { cursor: null, more: true };
  const tags = { cursor: null, more: true };
  for (let page = 1; page <= MAX_PAGES; page++) {
    const fields = [];
    if (releases.more) {
      fields.push(`releases(first: ${PAGE_SIZE}${after(releases.cursor)}, ${RELEASE_ORDER}) { ${RELEASE_PAGE} }`);
    }
    if (tags.more) {
      fields.push(`refs(first: ${PAGE_SIZE}${after(tags.cursor)}, ${TAG_ORDER}) { ${TAG_PAGE} }`);
    }
    const response = await graphql(`query {\nrepository(${repositoryArgs(repo.nameWithOwner)}) {\n${fields.join('\n')}\n}\n}`);
    if (response.errors?.length > 0) {
      throw new Error(`GitHub API errors: ${JSON.stringify(response.errors)}`);
    }
    const data = response.data.repository;
    if (data.releases) {
      repo.lastRelease = latest([repo.lastRelease, ...releaseDates(data.releases)]);
      releases.cursor = data.releases.pageInfo.endCursor;
      releases.more = data.releases.pageInfo.hasNextPage;
    }
    if (data.refs) {
      repo.lastRelease = latest([repo.lastRelease, ...tagDates(data.refs)]);
      tags.cursor = data.refs.pageInfo.endCursor;
      tags.more = data.refs.pageInfo.hasNextPage;
    }
    if (isActive(repo) || (!releases.more && !tags.more)) return;
  }
  repo.incomplete = true;
}

function after(cursor) {
  return cursor ? `, after: ${JSON.stringify(cursor)}` : '';
}

// A 502, 503, or 504 means GitHub could not answer in time or was briefly
// unavailable, so those and network errors get two more tries. The body is read
// before deciding, since a connection can also break after the status arrives.
async function graphql(query) {
  for (let attempt = 1; ; attempt++) {
    const result = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers: {
        authorization: `Bearer ${token}`,
        'content-type': 'application/json',
        'user-agent': USER_AGENT,
      },
      body: JSON.stringify({ query }),
    })
      .then(async (response) => ({ response, body: await response.text() }))
      .catch((error) => ({ error }));
    if (result.response?.ok) return JSON.parse(result.body);
    const transient = result.error || [502, 503, 504].includes(result.response.status);
    if (!transient || attempt === 3) {
      throw result.error ?? new Error(`GitHub API returned ${result.response.status}: ${result.body}`);
    }
    await sleep(attempt * 5000);
  }
}

function summarize(repo) {
  return {
    nameWithOwner: repo.nameWithOwner,
    isArchived: repo.isArchived,
    lastRelease: latest([repo.latestRelease?.publishedAt]),
    lastCommit: latest([repo.defaultBranchRef?.target?.committedDate]),
    incomplete: false,
  };
}

function releaseDates(connection) {
  return connection.nodes.map((release) => release.publishedAt);
}

function tagDates(connection) {
  return connection.nodes.map(({ target }) => target?.tagger?.date ?? target?.target?.committedDate ?? target?.committedDate);
}

function isActive(repo) {
  return [repo.lastRelease, repo.lastCommit].some((date) => date && date >= cutoff);
}

// Unparseable dates are skipped so that one of them cannot hide the others.
function latest(values) {
  const dates = values
    .filter(Boolean)
    .map((value) => new Date(value))
    .filter((date) => !Number.isNaN(date.getTime()));
  return dates.length > 0 ? new Date(Math.max(...dates)) : null;
}

// A heading is empty when no entry appears before the next heading of the same
// or a higher level, so a parent heading with filled subsections still counts.
function findEmptySections(readmeLines) {
  const empty = [];
  readmeLines.forEach((line, index) => {
    const heading = line.match(/^(#{2,3}) (.+)$/);
    if (!heading || heading[2] === 'Contents') return;
    let hasEntries = false;
    for (const next of readmeLines.slice(index + 1)) {
      const nextHeading = next.match(/^(#{2,3}) /);
      if (nextHeading && nextHeading[1].length <= heading[1].length) break;
      if (/^- \[[^\]]+\]\(https?:\/\//.test(next)) {
        hasEntries = true;
        break;
      }
    }
    if (!hasEntries) empty.push(heading[2]);
  });
  return empty;
}

function formatDate(date) {
  return date ? day(date) : 'none';
}

function buildReport() {
  const out = [`## Activity check, ${day(today)}`, ''];
  out.push(
    `A project stays on the list when it is not archived and has a release (a GitHub release or a tag) or a commit on its default branch since ${day(cutoff)}.`,
    '',
  );
  if (removed.length > 0) {
    out.push(`### Removed (${removed.length})`, '');
    out.push('| Project | Section | Reason | Last release | Last commit |', '|---|---|---|---|---|');
    for (const entry of removed) {
      out.push(
        `| [${entry.name}](${entry.link}) | ${entry.section} | ${entry.reason} | ${formatDate(entry.lastRelease)} | ${formatDate(entry.lastCommit)} |`,
      );
    }
    out.push('');
  } else {
    out.push('### Removed', '', 'Nothing. Every checked entry passes.', '');
  }

  const manual = [];
  for (const entry of notFound) {
    manual.push(`- Repository not found: [${entry.name}](${entry.link}) (${entry.repo}). It may have been deleted or made private.`);
  }
  for (const entry of moved) {
    manual.push(`- Repository moved: [${entry.name}](${entry.link}) now resolves to ${entry.movedTo}. Update the link; the entry is not checked until then.`);
  }
  for (const entry of incomplete) {
    manual.push(
      `- Too many releases or tags to read in full: [${entry.name}](${entry.link}). The first ${MAX_PAGES * PAGE_SIZE} of each show no recent activity, so check it by hand.`,
    );
  }
  for (const entry of restricted) {
    manual.push(
      entry.lastCommit
        ? `- Not fully checked: [${entry.name}](${entry.link}). Its organization blocks the API token, and without it only the default branch could be read, last commit ${day(entry.lastCommit)}. Check its releases and tags by hand.`
        : `- Not checked: [${entry.name}](${entry.link}). Its organization blocks the API token, and its page or commit feed on GitHub could not be read either.`,
    );
  }
  for (const section of emptySections) {
    manual.push(`- Section "${section}" has no entries left. Remove its heading and its Contents link.`);
  }
  if (unchecked.length > 0) {
    manual.push(`- No repository to check (${unchecked.length}): ${unchecked.map((entry) => entry.name).join(', ')}.`);
  }
  if (manual.length > 0) {
    out.push('### Needs a manual check', '', ...manual, '');
  }

  const restrictedRepos = [...status.values()].filter((repo) => repo.restricted).length;
  out.push(
    `Checked ${entries.length} entries against ${repos.length} repositories` +
      (restrictedRepos > 0 ? `, ${restrictedRepos} of them without the API token because their organization blocks it.` : '.'),
  );
  if (removed.length > 0) {
    out.push('', 'The weekly check rewrites this branch on every run, so make other edits on the default branch.');
  }
  return `${out.join('\n')}\n`;
}

function buildCommitMessage() {
  return [
    'Remove projects that fail the activity rule',
    '',
    'The weekly activity check found these projects archived, or without',
    `a release or a commit since ${day(cutoff)}:`,
    '',
    ...removed.map((entry) => `- ${entry.name}`),
    '',
  ].join('\n');
}
