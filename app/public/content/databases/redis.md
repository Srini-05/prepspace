# Redis Interview Preparation

Questions on data structures, caches, durability, and distributed coordination. Choose guarantees from the actual deployment and configuration rather than assuming an in-memory service has no persistence or that persistence prevents all loss.

## Level 1: Data Structures and Commands

<details>
<summary>1. What is Redis used for?</summary>

**Answer:** Redis is a data-structure server often used for caching, counters, rate limiting, sessions, and stream processing. Most working data is served from memory, making capacity and eviction decisions important. Redis can be authoritative for selected workloads when its durability and failure model meet the requirements, but a cache deployment should normally tolerate data loss.

</details>

<details>
<summary>2. Which data structures should you know?</summary>

**Answer:** Strings hold values and counters; hashes model field-value records; lists support ordered sequences; sets support uniqueness and membership; sorted sets associate members with scores; streams support retained event records and consumer workflows. Select operations by access pattern and complexity. Large structures and unbounded result sets can still cause latency spikes.

</details>

<details>
<summary>3. Is Redis single-threaded?</summary>

**Answer:** Many core command executions are serialized on a main execution thread, while networking and background tasks can use other threads depending on version and configuration. This simplifies atomic command behavior but does not make a sequence of separate client commands atomic. A slow command or large script can block other work.

</details>

<details>
<summary>4. How do expiration and eviction differ?</summary>

**Answer:** Expiration removes keys whose TTL has elapsed through lazy and active mechanisms. Eviction removes keys under memory pressure according to the configured policy. Expiration does not promise deletion at an exact wall-clock instant. Decide whether eviction is acceptable for every stored data class; an evicted lock or session can have different consequences from an evicted cache entry.

</details>

## Level 2: Caching Patterns

<details>
<summary>5. How does cache-aside work?</summary>

**Answer:** Read the cache first; on a miss, read the authoritative store and populate a bounded-lifetime entry. After successful writes, invalidate or refresh affected keys according to a consistency policy. Races between a reader filling the cache and a writer invalidating it can still produce stale data. Define acceptable staleness and avoid treating the cache as an authorization authority.

```text
Read:  cache hit -> return cached representation
       cache miss -> read database -> populate cache -> return
Write: commit authoritative change -> invalidate affected entries
```

If invalidation cannot be delivered reliably, consider versioned keys, durable change events, or another design suited to the required consistency.

</details>

<details>
<summary>6. What are cache penetration, stampede, and avalanche?</summary>

**Answer:** Repeated absent-key requests can bypass the cache, many concurrent misses for one hot key can stampede the database, and synchronized expirations can cause a broad load surge. Possible mitigations include bounded negative caching, request coalescing, TTL jitter, and controlled stale serving. Preserve tenant scoping and ensure fallback load is bounded when Redis is unavailable.

</details>

<details>
<summary>7. When are pipelining, transactions, and scripts useful?</summary>

**Answer:** Pipelining reduces round trips but is not atomic. MULTI/EXEC groups command execution; WATCH supports optimistic conflict detection before execution. Redis transactions do not offer ordinary database-style rollback for runtime command errors. Scripts and functions can coordinate bounded server-side operations atomically relative to other commands, but must be short and respect cluster key restrictions.

</details>

<details>
<summary>8. How do you implement an expiring rate-limit counter?</summary>

**Answer:** Coordinate increment and expiry atomically so a crash cannot leave a permanent counter. A fixed-window limiter is simple but permits bursts at window boundaries; token-bucket or sliding-window approaches offer different behavior. The following teaching script uses one key per caller and fixed time bucket, with a positive window duration supplied in milliseconds.

```lua
local count = redis.call('INCR', KEYS[1])
if count == 1 then
  redis.call('PEXPIRE', KEYS[1], ARGV[1])
end
return count
```

Validate key construction and arguments, compare the result to the configured limit, and define behavior if Redis fails. Do not silently fail open on high-risk operations without an explicit decision.

</details>

## Level 3: Durability and Coordination

<details>
<summary>9. How do RDB and AOF persistence compare?</summary>

**Answer:** RDB creates point-in-time snapshots; data changed after the last recoverable snapshot can be lost. AOF records write operations, with durability dependent on synchronization and rewrite configuration. Either mode needs monitoring, disk capacity, and tested recovery. Replication and persistence are not substitutes for independent backups against application mistakes.

</details>

<details>
<summary>10. How do Sentinel and Redis Cluster differ?</summary>

**Answer:** Sentinel monitors and coordinates failover for non-sharded primary-replica deployments. Redis Cluster partitions keys across hash slots and supports distributed operation with its own failover model. Multi-key operations often require keys in the same slot. Asynchronous replication means failover can lose acknowledged writes; evaluate that risk for the workload.

</details>

<details>
<summary>11. Why is distributed locking difficult?</summary>

**Answer:** A lease can expire while its original holder continues working because of a pause or network delay. `SET` with NX and expiry plus owner-token-checked release avoids some elementary bugs, but does not by itself ensure a stale holder cannot affect an external resource. For critical correctness, enforce fencing or authoritative conditional updates at the protected resource; assess failover and timing assumptions explicitly.

</details>

<details>
<summary>12. How should Redis be secured and monitored?</summary>

**Answer:** Keep it off the public internet unless deliberately protected by an appropriate service boundary. Use authentication, ACLs, encrypted transport where supported, and restricted network access. Monitor memory, evictions, hit rate, command latency, slow commands, persistence health, and replication lag. Avoid blocking production scans such as indiscriminate KEYS usage; incremental SCAN still needs bounded operational use.

</details>

## Practice Lab

1. In a disposable local instance, cache a product lookup with TTL and measure hits and misses.
2. Simulate concurrent misses and compare database load before and after request coalescing.
3. Implement an atomic expiring rate-limit counter and test concurrent callers and window boundaries.
4. Restart the instance under a chosen persistence policy and measure actual recoverable data rather than assuming zero loss.

**Completion check:** Explain stale-data windows, bounded fallback behavior, eviction consequences, and the observed durability guarantees.

## Quick Revision

- Atomic commands do not make a client-side sequence atomic.
- Pipelining saves round trips; it does not create a transaction.
- Expiration and memory-pressure eviction are separate mechanisms.
- Redis transactions do not provide general rollback semantics.
- Critical locking needs protection against stale holders, not just a TTL.

## References

- [Redis Documentation](https://redis.io/docs/latest/)
- [Redis Persistence](https://redis.io/docs/latest/operate/oss_and_stack/management/persistence/)
- [Redis Distributed Locks](https://redis.io/docs/latest/develop/clients/patterns/distributed-locks/)