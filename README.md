# Awesome Kafka [![Awesome](https://awesome.re/badge.svg)](https://awesome.re)

> [Apache Kafka](https://kafka.apache.org/) is an open-source distributed event streaming platform.

Kafka tools and client libraries that are still maintained, from desktop GUIs and CLIs to connectors, stream processing, and monitoring.

Open-source and commercial projects are listed under the same rules, in alphabetical order. A project needs a release or a commit in the last 12 months to stay on the list; archived and deprecated projects are removed rather than flagged. New projects are welcome.

Know a project that belongs here, or spot an outdated entry? Read the [contribution guidelines](contributing.md) and open a pull request.

Icons: ![Open source][] open source, ![Free][] free version or free tier (not open source), ![Paid][] paid plans.

## Contents

- [Desktop GUI](#desktop-gui)
- [Web UI](#web-ui)
- [CLI and TUI](#cli-and-tui)
- [IDE Plugins](#ide-plugins)
- [Client Libraries](#client-libraries)
  - [C and C++](#c-and-c)
  - [Clojure](#clojure)
  - [Elixir and Erlang](#elixir-and-erlang)
  - [Go](#go)
  - [Java](#java)
  - [JavaScript](#javascript)
  - [Kotlin](#kotlin)
  - [.NET](#net)
  - [PHP](#php)
  - [Python](#python)
  - [Ruby](#ruby)
  - [Rust](#rust)
  - [Scala](#scala)
  - [Swift](#swift)
- [Local Development and Testing](#local-development-and-testing)
- [Stream Processing](#stream-processing)
- [Change Data Capture](#change-data-capture)
- [Kafka Connect](#kafka-connect)
- [Schema Registry](#schema-registry)
- [Monitoring](#monitoring)
- [Operations](#operations)
- [Replication and Migration](#replication-and-migration)
- [REST Proxy](#rest-proxy)
- [Security and Proxies](#security-and-proxies)
- [MCP Servers](#mcp-servers)

## Desktop GUI

- [Franz](https://github.com/Bogdanp/Franz) ![Open source][] - Native desktop client with a built-in Lua environment for filtering, processing, and visualizing topic data.
- [KaDeck](https://www.kadeck.com/) ![Free][] ![Paid][] - Desktop client with a data catalog that organizes topics by labels and data owners.
- [Kafka-King](https://github.com/Bronya0/Kafka-King) ![Open source][] - Desktop client for Kafka 0.8.0 to 3.8+ with topic and partition health checks, offset inspection reports, and partition replica reassignment.
- [KafkIO](https://www.kafkio.com/) ![Free][] - Self-contained, portable desktop client with ACL management and live statistics such as partition skew, out-of-sync replicas, and consumer lag.
- [Kafma](https://kafma.app/) ![Free][] ![Paid][] - Desktop Kafka GUI client that keeps the consume–inspect–produce loop in one workspace and clones remote topics and their schemas to a local cluster for testing.
- [Offset Explorer](https://www.kafkatool.com/) ![Free][] ![Paid][] - Desktop client, formerly Kafka Tool, with plugins for custom data formats, a test data generator, and a bundled command-line tool.
- [Swifka](https://github.com/Ender-Wang/Swifka) ![Open source][] - Read-only native macOS client for monitoring consumer lag, throughput, and ISR health, with alert rules and desktop notifications.

## Web UI

- [AKHQ](https://github.com/tchiotludo/akhq) ![Open source][] - Web UI, previously known as KafkaHQ, with live tail of topic data, LDAP login, and role-based access control.
- [Conduktor Console](https://www.conduktor.io/console/) ![Free][] ![Paid][] - Web UI and control plane for platform teams, with self-service access, data masking, audit trails, and GitOps.
- [Confluent Control Center](https://docs.confluent.io/platform/current/control-center/index.html) ![Paid][] - Web-based tool for managing and monitoring Kafka in Confluent Platform, with cluster health overviews and alerts.
- [Kafbat UI](https://github.com/kafbat/kafka-ui) ![Open source][] - Web UI that continues Provectus' UI for Apache Kafka, with CEL message filters and OAuth 2.0, LDAP, or basic authentication.
- [Kafdrop](https://github.com/obsidiandynamics/kafdrop) ![Open source][] - Lightweight Spring Boot web UI for viewing topics and browsing consumer groups, with Protobuf decoding and Azure Event Hubs support.
- [Kpow](https://factorhouse.io/kpow/) ![Free][] ![Paid][] - Web UI that runs as a single container, with automated health scoring for brokers, topics, and consumer groups, and an OpenAPI REST API.
- [Lenses](https://lenses.io/) ![Free][] ![Paid][] - Developer experience and governance platform for engineers and AI agents, with SQL data exploration and access via UI, IDE, API, or MCP.
- [Redpanda Console](https://github.com/redpanda-data/console) ![Free][] ![Paid][] - Web UI, previously known as Kowl, that filters messages with JavaScript functions and manages ACLs and SASL-SCRAM users.

## CLI and TUI

- [Apache Kafka command-line tools](https://kafka.apache.org/documentation/#basic_ops) ![Open source][] - Scripts shipped in the Kafka distribution's bin directory, such as kafka-topics.sh, kafka-configs.sh, and kafka-consumer-groups.sh.
- [Confluent CLI](https://github.com/confluentinc/cli) ![Free][] - CLI for managing Confluent Cloud and Confluent Platform deployments, also available as a FIPS 140 compatible build.
- [kaf](https://github.com/birdayz/kaf) ![Open source][] - CLI inspired by kubectl and Docker, with named cluster configs and an interactive cluster selector.
- [kafkactl](https://github.com/deviceinsight/kafkactl) ![Open source][] - CLI with shell completion for topics and consumer groups, Protobuf support, and direct access to clusters running inside Kubernetes.
- [kaskade](https://github.com/sauljabin/kaskade) ![Open source][] - Terminal UI that decodes JSON, Avro, and Protobuf records with Confluent Schema Registry or Apicurio Registry, with Vim-style navigation.
- [kcl](https://github.com/twmb/kcl) ![Open source][] - Pure Go command-line client that also covers transactions, ACLs, and share groups.
- [ktea](https://github.com/jonas-grgt/ktea) ![Open source][] - Terminal client with vi-style table navigation, Schema Registry browsing, and Kafka Connect integration.
- [Yozefu](https://github.com/MAIF/yozefu) ![Open source][] - Read-only terminal UI with a SQL-inspired query language for searching records across multiple topics.

## IDE Plugins

- [Confluent for JetBrains IDEs](https://github.com/confluentinc/intellij) ![Open source][] - Plugin for IntelliJ-based IDEs with SSH tunneling, Spring Boot integration, and support for Confluent and AWS Glue schema registries.
- [Confluent for VS Code](https://github.com/confluentinc/vscode) ![Open source][] - VS Code extension that bootstraps streaming projects from Confluent templates and works with Confluent Cloud resources.
- [Tools for Apache Kafka](https://github.com/jlandersen/vscode-kafka) ![Open source][] - VS Code extension that defines producers in .kafka files, with Faker.js test data templates and scheduled sends.

## Client Libraries

### C and C++

- [librdkafka](https://github.com/confluentinc/librdkafka) ![Open source][] - C library with producer, consumer, and admin clients, full exactly-once semantics, and guaranteed C and C++ API stability.

### Clojure

- [Jackdaw](https://github.com/FundingCircle/jackdaw) ![Open source][] - Clojure library over the Admin, Producer, Consumer, and Streams APIs, with JSON, EDN, and Avro serdes and test helpers.

### Elixir and Erlang

- [Broadway Kafka](https://github.com/elixir-broadway/broadway_kafka) ![Open source][] - Connector for consuming Kafka topics with Broadway, the Elixir library for concurrent, multi-stage data pipelines.
- [brod](https://github.com/kafka4beam/brod) ![Open source][] - Erlang implementation of the Kafka protocol, with consumer groups that store offsets in Kafka or in a custom store.
- [Kaffe](https://github.com/spreedly/kaffe) ![Open source][] - Elixir wrapper around brod with a subscriber per partition and built-in support for encrypted Heroku Kafka connections.
- [KafkaEx](https://github.com/kafkaex/kafka_ex) ![Open source][] - Elixir client built on Kayrock, with automatic API version negotiation, AWS MSK IAM authentication, and telemetry events.

### Go

- [confluent-kafka-go](https://github.com/confluentinc/confluent-kafka-go) ![Open source][] - Confluent's Go client, a wrapper around librdkafka with commercial support from Confluent.
- [franz-go](https://github.com/twmb/franz-go) ![Open source][] - Pure Go client for Kafka 0.8.0 onward, with transactions and share group consumers, that aims to support every client KIP.
- [kafka-go](https://github.com/segmentio/kafka-go) ![Open source][] - Go library with low-level and high-level APIs that mirror Go standard library concepts and interfaces.
- [Sarama](https://github.com/IBM/sarama) ![Open source][] - MIT-licensed Go client with mocks for testing and a "2 releases + 2 months" compatibility guarantee.

### Java

- [Apache Kafka client](https://kafka.apache.org/documentation/#api) ![Open source][] - Official Java producer, consumer, share consumer, and admin clients, the only clients maintained in the main Kafka project.
- [Spring for Apache Kafka](https://github.com/spring-projects/spring-kafka) ![Open source][] - Spring abstractions for Kafka, including KafkaTemplate for sending and @KafkaListener for message-driven POJOs.
- [Vert.x Kafka Client](https://github.com/vert-x3/vertx-kafka-client) ![Open source][] - Reactive client for Vert.x that reads topic partitions as pausable streams and supports topic management.

### JavaScript

- [confluent-kafka-javascript](https://github.com/confluentinc/confluent-kafka-javascript) ![Open source][] - Confluent's JavaScript client based on node-rdkafka, with an API compatible with KafkaJS for easier migration.
- [node-rdkafka](https://github.com/Blizzard/node-rdkafka) ![Open source][] - Node.js wrapper for librdkafka with a standard API and a stream API for producing and consuming.
- [Platformatic Kafka](https://github.com/platformatic/kafka) ![Open source][] - Pure TypeScript client with no native addon, stream or event-based consumers, and experimental Schema Registry support.

### Kotlin

- [kotlin-kafka](https://github.com/nomisRev/kotlin-kafka) ![Open source][] - Kafka bindings for Kotlin suspend functions, with streaming operators for KotlinX Flow.

### .NET

- [Confluent.Kafka](https://github.com/confluentinc/confluent-kafka-dotnet) ![Open source][] - Confluent's .NET client, a wrapper around librdkafka with commercial support from Confluent.
- [Dekaf](https://github.com/thomhurst/Dekaf) ![Open source][] - Pure C# client without librdkafka, with a hosted consumer base class that includes retry topics and dead letter queues.
- [KafkaFlow](https://github.com/Farfetch/kafkaflow) ![Open source][] - Framework for .NET apps with multi-threaded consumers that keep message order, producer and consumer middleware, and an admin dashboard.

### PHP

- [Laravel Kafka](https://github.com/mateusjunges/laravel-kafka) ![Open source][] - Laravel package with chainable producer and consumer builders, plus Kafka::fake() for asserting published messages in tests.
- [php-rdkafka](https://github.com/php-rdkafka/php-rdkafka) ![Open source][] - Low-level, unopinionated PHP extension binding librdkafka, focused on production use and long-term support.

### Python

- [aiokafka](https://github.com/aio-libs/aiokafka) ![Open source][] - Client for Python asyncio with high-level asynchronous producer and consumer classes.
- [confluent-kafka-python](https://github.com/confluentinc/confluent-kafka-python) ![Open source][] - Confluent's client based on librdkafka, with native async/await support and built-in Avro, Protobuf, and JSON Schema serializers.
- [kafka-python](https://github.com/dpkp/kafka-python) ![Open source][] - Pure Python client with no external dependencies, plus CLI scripts that work as an alternative to Kafka's bin scripts without a JVM.

### Ruby

- [Karafka](https://github.com/karafka/karafka) ![Open source][] ![Paid][] - Multi-threaded processing framework for Ruby and Rails, with a Web UI for monitoring and managing Karafka applications.
- [rdkafka-ruby](https://github.com/karafka/rdkafka-ruby) ![Open source][] - Ruby wrapper around librdkafka maintained by the Karafka team, which stays close to librdkafka's own functionality.

### Rust

- [kafka-rust](https://github.com/kafka-rust/kafka-rust) ![Open source][] - Rust client that uses rustls for TLS by default, with no native dependencies.
- [krafka](https://github.com/hupe1980/krafka) ![Open source][] - Pure Rust async client on Tokio with transactions, share groups, and a full admin client, without librdkafka.
- [RSKafka](https://github.com/influxdata/rskafka) ![Open source][] - Minimal Rust client for simple workloads, without consumer groups, offset tracking, or transactions.
- [rust-rdkafka](https://github.com/fede1024/rust-rdkafka) ![Open source][] - Fully asynchronous, futures-based Rust client built on librdkafka, with exactly-once semantics.

### Scala

- [Alpakka Kafka](https://github.com/akka/alpakka-kafka) ![Free][] ![Paid][] - Akka Streams connector for Kafka, part of the Alpakka reactive integration library for Java and Scala.
- [FS2 Kafka](https://github.com/typelevel/fs2-kafka) ![Open source][] - Functional streaming client for Scala, built on FS2 and the official Kafka Java client.
- [ZIO Kafka](https://github.com/zio/zio-kafka) ![Open source][] - ZIO client with a streaming API over the Java client that can process each partition in parallel.

### Swift

- [swift-kafka-client](https://github.com/swift-server/swift-kafka-client) ![Open source][] - Swift wrapper around librdkafka with async/await APIs and fully static Linux builds.

## Local Development and Testing

- [cp-all-in-one](https://github.com/confluentinc/cp-all-in-one) ![Free][] - Docker Compose files that run Confluent Platform locally, in Enterprise or Community license versions, or against Confluent Cloud.
- [Datagen Connector](https://github.com/confluentinc/kafka-connect-datagen) ![Open source][] - Source connector that generates mock data from bundled quickstart schemas or your own Avro schemas, for demos and testing.
- [Embedded Kafka](https://github.com/embeddedkafka/embedded-kafka) ![Open source][] - Scala library that starts an in-memory Kafka server for tests, with releases versioned to match Kafka.
- [kafka-junit](https://github.com/salesforce/kafka-junit) ![Open source][] - JUnit 4 and 5 library that runs single-broker or multi-broker clusters inside tests, for Kafka 0.11 through 3.4.
- [kafka-stack-docker-compose](https://github.com/conduktor/kafka-stack-docker-compose) ![Open source][] - Docker Compose files for local stacks, from a single KRaft broker to multi-broker clusters with Schema Registry, Kafka Connect, and ksqlDB.
- [Testcontainers Kafka Module](https://testcontainers.com/modules/kafka/) ![Open source][] - Testcontainers module that starts a Kafka container for tests in Java, Go, .NET, Node.js, Python, and Rust.

## Stream Processing

- [Apache Flink](https://github.com/apache/flink) ![Open source][] - Stream and batch processing framework with event-time windowing, natural back-pressure, and a Complex Event Processing library.
- [Apache Spark](https://github.com/apache/spark) ![Open source][] - Unified analytics engine for large-scale data processing, with Structured Streaming for stream processing alongside Spark SQL and MLlib.
- [Arroyo](https://github.com/ArroyoSystems/arroyo) ![Open source][] - Distributed stream processing engine in Rust that runs SQL pipelines with windows, joins, and state checkpointing.
- [Bytewax](https://github.com/bytewax/bytewax) ![Open source][] - Python framework on a Rust-based distributed engine for stateful stream processing, now community-maintained.
- [Faust](https://github.com/faust-streaming/faust) ![Open source][] - Community fork of Faust, a Python library that ports the ideas of Kafka Streams to Python, with Kafka transactions support.
- [go-streams](https://github.com/reugn/go-streams) ![Open source][] - Lightweight Go library with a DSL for pipelines built from composable sources, flows, and sinks.
- [Goka](https://github.com/lovoo/goka) ![Open source][] - Go library that binds a state table to each consumer group and persists it in Kafka.
- [Kafka Streams](https://kafka.apache.org/documentation/streams/) ![Open source][] - Java library for applications whose input and output data live in Kafka, with exactly-once processing and no separate processing cluster.
- [ksqlDB](https://github.com/confluentinc/ksql) ![Free][] - Database for stream processing on Kafka, with incrementally updated materialized views and push queries written in SQL.
- [kstreams](https://github.com/kpn/kstreams) ![Open source][] - Python micro framework for streaming apps, with OpenTelemetry instrumentation, lifecycle hooks, and a Kafka Streams-style store.
- [Quix Streams](https://github.com/quixio/quix-streams) ![Open source][] - Pure Python library with a Streaming DataFrame API and fault-tolerant stateful operations, without server-side clusters to manage.
- [Redpanda Connect](https://github.com/redpanda-data/connect) ![Open source][] ![Paid][] - Single-binary stream processor with YAML-defined pipelines, the Bloblang mapping language, and CDC connectors for PostgreSQL, MySQL, and MongoDB.
- [Streamiz](https://github.com/LGouellec/streamiz) ![Open source][] - Stream processing library for .NET that aims to provide the same functionality as Kafka Streams.

## Change Data Capture

- [Debezium](https://github.com/debezium/debezium) ![Open source][] - Change data capture platform that runs as Kafka Connect connectors, with an embedded engine for running connectors inside an application.
- [Maxwell](https://github.com/zendesk/maxwell) ![Open source][] - Daemon that reads MySQL binlogs and writes row changes as JSON to Kafka, Kinesis, and other streaming platforms.

## Kafka Connect

- [Aiven Cloud Storage Connectors](https://github.com/Aiven-Open/cloud-storage-connectors-for-apache-kafka) ![Open source][] - Aiven's sink connectors for Amazon S3, Google Cloud Storage, and Azure Blob Storage, plus an S3 source connector.
- [Aiven JDBC Connector](https://github.com/Aiven-Open/jdbc-connector-for-apache-kafka) ![Open source][] - JDBC source and sink connectors forked from Confluent's before its license change, maintained by Aiven.
- [Aiven Transforms](https://github.com/Aiven-Open/transforms-for-apache-kafka-connect) ![Open source][] - Single Message Transforms such as ExtractTimestamp, ExtractTopic, ConcatFields, and Hash.
- [Apache Camel Kafka Connector](https://github.com/apache/camel-kafka-connector) ![Open source][] - Adapter that runs Apache Camel components as Kafka Connect connectors, based on the Kamelets catalog.
- [Apache Iceberg Sink](https://iceberg.apache.org/docs/latest/kafka-connect/) ![Open source][] - Sink connector that writes Kafka data into Iceberg tables, with centralized commit coordination, exactly-once delivery, and multi-table fan-out.
- [BigQuery Sink](https://github.com/confluentinc/kafka-connect-bigquery) ![Open source][] - Sink connector for Google BigQuery, originally developed by WePay and now maintained together with Confluent.
- [ClickHouse Kafka Connect](https://github.com/ClickHouse/clickhouse-kafka-connect) ![Open source][] - Official ClickHouse sink connector with exactly-once delivery and a KeyToValue transform for storing message keys.
- [Elasticsearch Sink](https://github.com/confluentinc/kafka-connect-elasticsearch) ![Free][] - Confluent sink connector for copying data from Kafka into Elasticsearch.
- [Google Cloud Pub/Sub Group Kafka Connector](https://github.com/googleapis/java-pubsub-group-kafka-connector) ![Open source][] - Google's source and sink connectors for Cloud Pub/Sub.
- [HDFS Sink](https://github.com/confluentinc/kafka-connect-hdfs) ![Free][] - Confluent sink connector for copying data from Kafka into Hadoop HDFS.
- [IBM MQ Sink](https://github.com/ibm-messaging/kafka-connect-mq-sink) ![Open source][] - IBM's sink connector for copying data from Kafka into IBM MQ, with exactly-once delivery.
- [IBM MQ Source](https://github.com/ibm-messaging/kafka-connect-mq-source) ![Open source][] - IBM's source connector for copying data from IBM MQ into Kafka, with exactly-once delivery.
- [JDBC Connector](https://github.com/confluentinc/kafka-connect-jdbc) ![Free][] - Confluent source and sink connector for any JDBC-compatible database.
- [Lenses Stream Reactor](https://github.com/lensesio/stream-reactor) ![Open source][] - Apache-2.0 source and sink connectors from Lenses for systems such as Amazon S3, Azure Data Lake, Cassandra, MQTT, and JMS.
- [MongoDB Kafka Connector](https://github.com/mongodb/mongo-kafka) ![Open source][] - Official MongoDB connector that works as a sink into MongoDB and as a source of MongoDB changes.
- [Neo4j Connector for Kafka](https://github.com/neo4j/neo4j-kafka-connector) ![Open source][] - Neo4j's source and sink connectors for Kafka Connect.
- [Redis Kafka Connect](https://github.com/redis-field-engineering/redis-kafka-connect) ![Open source][] - Redis source and sink connectors, supported by Redis for enterprise-tier customers.
- [S3 Sink](https://github.com/confluentinc/kafka-connect-storage-cloud) ![Free][] - Confluent sink connector for copying data from Kafka into Amazon S3.
- [Snowflake Connector](https://github.com/snowflakedb/snowflake-kafka-connector) ![Open source][] - Sink connector from Snowflake that ingests Kafka topics into Snowflake tables.
- [Splunk Connect for Kafka](https://github.com/splunk/kafka-connect-splunk) ![Open source][] - Sink connector that sends Kafka records to Splunk through the HTTP Event Collector, with in-flight transformation and enrichment.

## Schema Registry

- [Apicurio Registry](https://github.com/Apicurio/apicurio-registry) ![Open source][] - Registry for API designs such as OpenAPI and AsyncAPI files as well as schemas, with storage in Kafka, PostgreSQL, or SQL Server.
- [AWS Glue Schema Registry](https://github.com/awslabs/aws-glue-schema-registry) ![Open source][] - Avro, JSON, and Protobuf serializers and deserializers that connect Kafka clients to the AWS Glue Schema Registry service.
- [AxonOps Schema Registry](https://github.com/axonops/axonops-schema-registry) ![Open source][] - Confluent-compatible registry that stores schemas in PostgreSQL, MySQL, or Cassandra instead of Kafka, with built-in RBAC and an MCP server.
- [Confluent Schema Registry](https://github.com/confluentinc/schema-registry) ![Free][] - REST serving layer for Avro, JSON Schema, and Protobuf schemas, with a versioned history per subject and multiple compatibility settings.
- [Karapace](https://github.com/Aiven-Open/karapace) ![Open source][] - Drop-in replacement for both Confluent Schema Registry and REST Proxy, with a leader and replica architecture for high availability.

## Monitoring

- [AxonOps](https://axonops.com/) ![Free][] ![Paid][] - Operations platform for Kafka and Cassandra with metrics, logs, alerts, and AI-assisted root cause analysis.
- [Burrow](https://github.com/linkedin/Burrow) ![Open source][] - Consumer lag checking service that evaluates groups over a sliding window without thresholds and reports status over HTTP.
- [Kafka Exporter](https://github.com/danielqsj/kafka_exporter) ![Open source][] - Prometheus exporter for broker, topic, and consumer group metrics, with SASL support including AWS IAM and OAUTHBEARER.
- [klag](https://github.com/themoah/klag) ![Open source][] - Consumer lag exporter built with Vert.x and Micrometer that monitors thousands of consumer groups in about 50 MB of heap.
- [klag-exporter](https://github.com/softwaremill/klag-exporter) ![Open source][] - Rust lag exporter that reads message timestamps to calculate time lag, with Prometheus and OpenTelemetry output.
- [KMinion](https://github.com/redpanda-data/kminion) ![Open source][] - Prometheus exporter that measures end-to-end latency by producing to and consuming from its own topic, alongside lag and log dir sizes.

## Operations

- [Confluent for Kubernetes](https://docs.confluent.io/operator/current/overview.html) ![Paid][] - Control plane for deploying and managing Confluent Platform on Kubernetes through a declarative API and custom resources.
- [Confluent Terraform Provider](https://github.com/confluentinc/terraform-provider-confluent) ![Open source][] - Terraform provider maintained by Confluent for managing the lifecycle of Confluent resources.
- [Cruise Control](https://github.com/cruise-control-for-kafka/cruise-control) ![Open source][] - Automated workload rebalancing and self-healing for large clusters, with multi-goal rebalance proposals.
- [Jikkou](https://github.com/streamthoughts/jikkou) ![Open source][] - Resource as Code framework that reconciles topics, ACLs, quotas, schemas, and connectors declared as YAML in Git against real clusters.
- [Klaw](https://github.com/Aiven-Open/klaw) ![Open source][] - Self-service governance portal for topics, ACLs, schemas, and connectors, with roles and authorizations for teams.
- [Strimzi](https://github.com/strimzi/strimzi-kafka-operator) ![Open source][] - Operator for running Kafka on Kubernetes and OpenShift in various deployment configurations.
- [Strimzi Kafka CLI](https://github.com/systemcraftsman/strimzi-kafka-cli) ![Open source][] - CLI for the Strimzi operator with commands modeled on the Kafka scripts, backup and restore of Strimzi resources, and an MCP server.
- [Terraform Provider for Kafka](https://github.com/Mongey/terraform-provider-kafka) ![Open source][] - Terraform provider for managing topics and ACLs, with TLS, SASL, and AWS IAM authentication.
- [topicctl](https://github.com/segmentio/topicctl) ![Open source][] - Declarative topic management that applies changes from YAML, with a REPL for exploring brokers, topics, and consumer groups.

## Replication and Migration

- [Cluster Linking](https://docs.confluent.io/platform/current/multi-dc-deployments/cluster-linking/index.html) ![Paid][] - Byte-for-byte topic mirroring built into Confluent Server and Confluent Cloud, with consistent offsets and no Kafka Connect needed.
- [Confluent Replicator](https://docs.confluent.io/platform/current/multi-dc-deployments/replicator/index.html) ![Paid][] - Kafka Connect-based replicator that creates destination topics with matching configuration and uses provenance headers to prevent cycles.
- [kafka-backup](https://github.com/osodevops/kafka-backup) ![Open source][] - Rust backup and restore tool with millisecond point-in-time recovery to S3, Azure Blob, GCS, or local files.
- [kcp](https://github.com/confluentinc/kcp) ![Open source][] - Confluent CLI for planning and executing migrations from Amazon MSK or Apache Kafka to Confluent Cloud, with cost reports and infrastructure-as-code.
- [MirrorMaker 2](https://kafka.apache.org/documentation/#georeplication) ![Open source][] - Kafka Connect-based tool in Apache Kafka that replicates topics, configurations, consumer group offsets, and ACLs between clusters.
- [Mirus](https://github.com/salesforce/mirus) ![Open source][] - Kafka Connect-based replication tool that serves multiple source clusters from one worker and can auto-restart failed tasks.

## REST Proxy

- [Confluent REST Proxy](https://github.com/confluentinc/kafka-rest) ![Free][] - REST interface for producing, consuming, viewing cluster state, and running admin actions without the native Kafka protocol.
- [Strimzi Kafka Bridge](https://github.com/strimzi/strimzi-kafka-bridge) ![Open source][] - HTTP 1.1 bridge for sending and receiving messages, deployable on Kubernetes and OpenShift through the Strimzi operator.
- [Zilla](https://github.com/aklivity/zilla) ![Free][] ![Paid][] - Multi-protocol gateway that exposes Kafka over HTTP, SSE, gRPC, MQTT, or WebSocket, and gives AI agents one governed MCP endpoint.

## Security and Proxies

- [Conduktor Gateway](https://www.conduktor.io/gateway/) ![Free][] ![Paid][] - Proxy between clients and brokers that adds field-level encryption, virtual clusters, SQL-based topic views, and chaos testing without code changes.
- [Kafka Security Manager](https://github.com/conduktor/kafka-security-manager) ![Open source][] - ACL synchronization tool that applies a CSV or YAML policy from a local file, GitHub, GitLab, Bitbucket, HTTP, or S3.
- [Kroxylicious](https://github.com/kroxylicious/kroxylicious) ![Open source][] - Kafka protocol proxy for encryption, multi-tenancy, and schema validation, extensible with custom filters.
- [Strimzi OAuth](https://github.com/strimzi/strimzi-kafka-oauth) ![Open source][] - OAuth 2.0 and OIDC authentication for clients and brokers, with opaque and JWT tokens and Keycloak-based authorization.

## MCP Servers

- [Conduktor MCP Server](https://github.com/conduktor/kafka-mcp) ![Open source][] - Launcher that connects MCP clients to the MCP server running inside Conduktor Console, which is required.
- [Confluent MCP Server](https://github.com/confluentinc/mcp-confluent) ![Open source][] - MCP server with 50+ tools for Kafka, Flink SQL, Schema Registry, connectors, and Tableflow on Confluent Cloud, Confluent Platform, or self-managed Kafka.
- [kafka-mcp-server](https://github.com/tuannvm/kafka-mcp-server) ![Open source][] - Go MCP server built on franz-go and mcp-go, with stdio and HTTP transports.
- [Lenses MCP Server](https://github.com/lensesio/lenses-mcp) ![Open source][] - MCP server that gives AI agents access to Lenses data exploration, transformation, and replication, with OAuth 2.1 authentication.
- [StreamNative MCP Server](https://github.com/streamnative/streamnative-mcp-server) ![Open source][] - MCP server for StreamNative Cloud, Apache Kafka, and Apache Pulsar, covering admin and client operations.

[open source]: icons/open-source.svg 'Open source'
[free]: icons/free.svg 'Free version or free tier, not open source'
[paid]: icons/paid.svg 'Paid plans'
