# Contributing

Thanks for helping keep this list useful. Please read this page before opening a pull request.

## What belongs here

Software whose main purpose is working with Apache Kafka: clients, GUIs, CLIs, connectors, registries, monitoring, operations, and testing tools. Open-source and commercial projects follow the same rules. New projects are welcome.

## Requirements

A project must:

- Have a release (a GitHub release or a version tag) or a commit in the last 12 months.
- Not be archived or marked as deprecated.
- Be installable and usable today, through a release, a package, a container image, or clear installation steps.
- Have documentation in English.

Kafka connectors must also be maintained by a company or a foundation.

## Not included

- Articles, books, courses, talks, case studies, KIPs, conferences, newsletters, and other lists.
- Kafka-compatible brokers and managed Kafka services.
- Streaming databases that are not built on Kafka.
- General-purpose tools that support Kafka among many other systems. Stream processing frameworks are the exception: they are included if they maintain their own Kafka source and sink.
- Applications built on top of Kafka.

## Adding a project

- Add one project per pull request.
- Put it in the matching section, in alphabetical order.
- Link open-source projects to their source repository, such as on GitHub, not to a website. If the project is part of a larger repository, link to its documentation instead.
- Use this format: `- [Name](link) ![Open source][] ![Free][] ![Paid][] - Description.`, keeping only the icons that apply.
  - ![Open source][] means an OSI-approved open-source license. Source-available licenses do not count.
  - ![Free][] means the project has a free version or a free tier but is not open source. Open-source projects carry only the open-source icon.
  - ![Paid][] means there are paid plans.
- Write the description as a plain fact about what the project does. It starts with a capital letter and ends with a period. Leave out words like "best", "fastest", or "powerful".
- Base the description on the project's own documentation and name one or two of its notable features. It doesn't need to compare the project with others, but leave out features that most tools in the same section share.
- In the pull request, explain why the project belongs here, link to its latest release or commit, and list its main limitations.

## Updates and removals

The list is checked regularly. Projects that stop meeting the requirements are removed. A removed project can come back through a pull request once it meets them again.

## License

By submitting a pull request, you agree to dedicate your contribution under [CC0](https://creativecommons.org/publicdomain/zero/1.0/).

[open source]: icons/open-source.svg 'Open source'
[free]: icons/free.svg 'Free version or free tier, not open source'
[paid]: icons/paid.svg 'Paid plans'
