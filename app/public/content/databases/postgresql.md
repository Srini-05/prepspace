# PostgreSQL Interview Preparation

PostgreSQL-specific questions covering correctness, query performance, concurrency, and recovery. Use an isolated development database for exercises and inspect the documentation for your server version.

## Level 1: Data and Transactions

<details>
<summary>1. What distinguishes PostgreSQL from a generic SQL database?</summary>

**Answer:** PostgreSQL is an extensible relational database with transactions, rich types, MVCC, several index methods, JSONB, and advanced SQL. Extensions add capabilities but also operational dependencies. Choose features against workload needs, team familiarity, and hosted-service support, not a checklist of capabilities.

</details>

<details>
<summary>2. Why enforce constraints in the database?</summary>

**Answer:** NOT NULL, CHECK, UNIQUE, primary keys, and foreign keys protect invariants across all writers. Application-only checks can race under concurrency. A UNIQUE constraint permits multiple nulls by default; supported versions offer `NULLS NOT DISTINCT` when nulls should compare as equal for uniqueness. Index foreign-key referencing columns when access and deletion patterns justify it.

</details>

<details>
<summary>3. How does MVCC work?</summary>

**Answer:** Multi-version concurrency control lets statements read a visible snapshot of row versions rather than blocking on every writer. Updates create new tuple versions. Old versions remain until no relevant snapshot needs them and vacuum can reclaim space for reuse. MVCC reduces read/write blocking but does not eliminate locks or write conflicts.

</details>

<details>
<summary>4. What do PostgreSQL isolation levels guarantee?</summary>

**Answer:** Read Committed, the default, gives each statement a fresh snapshot. Repeatable Read uses a transaction snapshot but can still permit serialization anomalies such as write skew. Serializable detects dangerous dependency patterns and may abort transactions, requiring whole-transaction retries. PostgreSQL treats Read Uncommitted as Read Committed.

</details>

## Level 2: Indexes and Plans

<details>
<summary>5. Which index types should you know?</summary>

**Answer:** B-tree suits equality, ranges, and compatible ordering. GIN supports indexed components such as JSONB or full-text search with appropriate operator classes. GiST supports operator-class-specific searches, including spatial use cases. BRIN can be compact for large tables whose values correlate with physical ordering. Indexes add write, storage, and maintenance costs.

</details>

<details>
<summary>6. How do composite, partial, and covering indexes differ?</summary>

**Answer:** Composite indexes combine key columns; column ordering and query predicates affect usefulness. A partial index includes rows matching a predicate that queries must imply. INCLUDE columns can enable index-only scans without being search keys, but heap visibility may still require heap visits. Verify behavior using actual plans rather than assuming an index will be selected.

```sql
CREATE INDEX orders_customer_created_idx
ON orders (customer_id, created_at DESC, id DESC)
INCLUDE (total_cents)
WHERE status = 'paid';
```

This example assumes an orders schema with these fields and a workload listing paid orders for one customer.

</details>

<details>
<summary>7. How do you investigate a slow query?</summary>

**Answer:** Start with measured latency and frequency, then inspect `EXPLAIN (ANALYZE, BUFFERS)` in a safe environment. Compare estimated and actual rows, loops, scan choices, sorting, spills, and buffer reads. ANALYZE executes the statement, so modifying queries can change data. Examine statistics, contention, and query shape before adding indexes.

</details>

<details>
<summary>8. When should JSONB be used?</summary>

**Answer:** JSONB fits flexible attributes and document-like data queried inside PostgreSQL. Frequently joined, constrained, or aggregated business fields usually benefit from normal columns. Choose index operator classes to match actual JSON operators. Large document updates can increase write amplification; JSONB does not remove schema design or validation responsibilities.

</details>

## Level 3: Concurrency and Operations

<details>
<summary>9. How can an inventory decrement be made concurrency-safe?</summary>

**Answer:** Express the invariant in a conditional update and inspect whether a row was returned. Concurrent updates to the same row are coordinated by PostgreSQL; the predicate prevents decrementing below zero for this operation. Keep a database constraint as a second line of defense.

```sql
UPDATE inventory
SET available = available - 1
WHERE product_id = 42 AND available > 0
RETURNING available;
```

For workflows spanning several rows, use a transaction and consistent locking order. Plan retries for deadlocks or serialization failures.

</details>

<details>
<summary>10. What do VACUUM and autovacuum do?</summary>

**Answer:** Vacuum makes dead-tuple space reusable, maintains visibility information, and helps prevent transaction ID wraparound. It normally does not return all freed space to the operating system. Autovacuum schedules maintenance; long transactions can prevent cleanup. VACUUM FULL rewrites a table and takes a strong lock, so it is not routine online maintenance.

</details>

<details>
<summary>11. What are WAL, replication, and point-in-time recovery?</summary>

**Answer:** Write-ahead logging records changes needed for crash recovery. Physical replication streams WAL to replicas; asynchronous replication can lag and can lose recent acknowledged transactions during failover. Point-in-time recovery requires a suitable base backup and a continuous usable WAL archive. Replication alone is not protection against accidental deletion replicated everywhere.

</details>

<details>
<summary>12. How do you operate PostgreSQL safely under load?</summary>

**Answer:** Bound connection pools, set appropriate statement and lock timeouts, monitor blocking and long transactions, and inspect slow-query statistics. Use expand-and-contract migrations and evaluate lock duration before production DDL. `CREATE INDEX CONCURRENTLY` reduces write blocking but has restrictions and can leave invalid indexes on failure. Rehearse restores and failovers against explicit RPO and RTO targets.

</details>

## Practice Lab

1. Create orders and inventory tables with explicit constraints in a disposable database.
2. Load representative data and compare a customer-order query before and after indexing.
3. Use two sessions to demonstrate a conditional inventory update and a blocked transaction.
4. Restore a backup into a separate instance and verify row counts and application invariants.

**Completion check:** Explain measured plan changes, show that stock cannot become negative, and demonstrate a restore rather than only a backup command.

## Quick Revision

- MVCC allows snapshots but does not remove locking.
- Serializable transactions may need complete retries.
- Index choice follows query operators and measured workload.
- Long transactions can hold back vacuum cleanup.
- Replicas and backups solve different failure scenarios.

## References

- [PostgreSQL Documentation](https://www.postgresql.org/docs/current/)
- [Using EXPLAIN](https://www.postgresql.org/docs/current/using-explain.html)
- [Concurrency Control](https://www.postgresql.org/docs/current/mvcc.html)