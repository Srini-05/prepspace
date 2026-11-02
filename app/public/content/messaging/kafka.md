# Kafka Interview Preparation

Questions on event logs, ordering, delivery guarantees, and operational tradeoffs. Configuration names and defaults depend on the Kafka and client versions; verify the deployed versions rather than memorizing historical defaults.

## Level 1: Log and Consumer Fundamentals

<details>
<summary>1. What is Kafka, and how is it different from a traditional queue?</summary>

**Answer:** Kafka stores records in partitioned, replicated append-only logs. Consumers track their positions independently, so multiple consumer groups can process or replay the same retained records. Reading normally does not delete a record. Retention and compaction policies control how long records or key histories remain available.

</details>

<details>
<summary>2. What are topics, partitions, offsets, and keys?</summary>

**Answer:** A topic groups records; partitions are its ordered logs; offsets identify positions within one partition. A record key commonly determines partition selection. Ordering exists within a partition, not across a whole multi-partition topic. Changing partition counts can alter key placement, so reassess per-key ordering during repartitioning.

</details>

<details>
<summary>3. How do consumer groups provide parallelism?</summary>

**Answer:** Within a conventional consumer group, each partition is assigned to at most one consumer at a time. More consumers than partitions do not increase that group's partition-processing parallelism. Independent groups receive independent views of the log. Rebalances change assignments, so consumers must handle revocation and outstanding work carefully.

</details>

<details>
<summary>4. What do retention and log compaction mean?</summary>

**Answer:** Time or size retention removes eligible old log segments. Compaction eventually retains a recent value for each key while removing superseded values, subject to cleaner behavior and configuration. It does not immediately produce exactly one record per key. Tombstones represent deletion and have their own retention considerations.

</details>

## Level 2: Delivery and Correctness

<details>
<summary>5. How do at-most-once and at-least-once processing arise?</summary>

**Answer:** Committing a consumer position before processing can skip work after a crash. Processing before committing can repeat work after a crash. The second pattern supports at-least-once processing when combined with correct retry and commit handling. Design side effects to tolerate duplicates rather than assuming a record is delivered exactly once to application code.

</details>

<details>
<summary>6. What do acknowledgments and replication guarantee?</summary>

**Answer:** Producer acknowledgments control when a send is considered successful. `acks=all` waits for the required in-sync replica behavior, with `min.insync.replicas` constraining acceptance. Durability also depends on replication factor, leader election, storage, and failure scenarios. Acknowledgment does not mean every replica is caught up or every consumer has processed the record.

</details>

<details>
<summary>7. What does an idempotent producer solve?</summary>

**Answer:** Producer idempotence prevents certain duplicate log appends caused by producer retries through producer identity and sequence tracking. It does not deduplicate semantically duplicated business requests, arbitrary new producer sessions, or external database updates. Use stable event identities and application-level invariants for those cases.

</details>

<details>
<summary>8. What is the scope of Kafka's exactly-once support?</summary>

**Answer:** Transactions can coordinate Kafka writes and consumed offsets, and Kafka Streams can provide exactly-once processing within its supported scope. Consumers need appropriate isolation to exclude aborted transaction data. An external HTTP call or database write is not automatically part of the Kafka transaction; use idempotent sinks, an outbox, or another explicit coordination design.

```text
Database transaction: update order + insert outbox event
Outbox publisher:      publish event with stable event ID
Consumer transaction:  record processed ID + apply local effect
```

Publication may repeat, so the consumer's deduplication and side effect must be coordinated at its authoritative data boundary.

</details>

## Level 3: Schemas and Operations

<details>
<summary>9. How do you evolve event schemas?</summary>

**Answer:** Define event meaning, versioning, required fields, defaults, and compatibility expectations. Use schema tooling where useful, but verify compatibility against actual consumers and serializers. Avoid changing the meaning of an existing field. Keep sensitive data and deletion obligations in mind because retained events may outlive the source record.

</details>

<details>
<summary>10. How should retries and poison records be handled?</summary>

**Answer:** Distinguish transient failures from invalid records, bound retries with backoff, and define an owned dead-letter and replay process. Moving failed events to another topic can break per-key ordering. Pausing a partition preserves ordering more directly but blocks later records. Choose based on business semantics and prevent a single record from causing endless unobserved retries.

</details>

<details>
<summary>11. What does consumer lag tell you?</summary>

**Answer:** Offset lag measures how far a consumer group trails the log, but not the complete business-processing latency. Track event age, processing duration, rebalance frequency, failures, and throughput as well. A consumer that commits before finishing side effects can show low lag while business work is incomplete. Hot partitions can bottleneck a group even when other consumers are idle.

</details>

<details>
<summary>12. How should Kafka be secured and operated?</summary>

**Answer:** Use encrypted transport, supported authentication, and least-privilege topic and group authorization. Monitor replication health, disk usage, controller health, request latency, and consumer behavior. Modern Kafka uses KRaft for metadata management; do not assume ZooKeeper-based operational advice applies. Rehearse broker loss, capacity changes, and recovery with a version-specific runbook.

</details>

## Practice Lab

1. In a local Kafka environment, create a multi-partition topic and publish records with stable keys.
2. Run two consumers in one group and another consumer in a separate group; observe assignments.
3. Simulate a crash after a local side effect but before offset commit, then demonstrate safe duplicate handling.
4. Introduce an incompatible event and explain the retry, isolation, investigation, and replay decision.

**Completion check:** Demonstrate per-partition ordering, independent consumer groups, and a duplicate-safe business outcome rather than only successful message delivery.

## Quick Revision

- Ordering is per partition, not globally per topic.
- Consumers track positions; reads do not delete records.
- Producer idempotence does not deduplicate arbitrary business operations.
- Kafka transactions do not automatically include external side effects.
- Lag is only one part of end-to-end processing health.

## References

- [Apache Kafka Documentation](https://kafka.apache.org/documentation/)
- [Kafka Design](https://kafka.apache.org/documentation/#design)
