# REST API Design Interview Preparation

Questions and exercises for designing predictable HTTP APIs. Focus on resource semantics, client-visible contracts, failures, and evolution rather than URL naming alone.

## Level 1: Resources and HTTP

<details>
<summary>1. What makes an API RESTful?</summary>

**Answer:** REST is an architectural style with constraints including client-server separation, stateless interactions, cacheability, a uniform interface, and layered systems. HTTP plus JSON is not sufficient by itself. In practical API interviews, explain which constraints you follow and why; avoid claiming full REST compliance solely because URLs use nouns.

</details>

<details>
<summary>2. How do you model resources and relationships?</summary>

**Answer:** Give resources stable identities such as `/orders/{orderId}`. Use collections for discovery and creation, and nest relationships only when ownership or scoping is meaningful. Avoid deeply nested paths that make independent resources difficult to address. Domain commands such as cancellation may reasonably be represented as a new cancellation resource.

</details>

<details>
<summary>3. What are safe and idempotent methods?</summary>

**Answer:** Safe methods, including GET and HEAD, should not request state changes. Idempotency means repeating the same request has the same intended effect as doing it once, not necessarily the same response. PUT and DELETE are idempotent by semantics; POST and PATCH are not guaranteed to be. Incidental logging does not make a safe read unsafe.

</details>

<details>
<summary>4. When should you choose PUT, PATCH, or POST?</summary>

**Answer:** PUT creates or replaces state at a known target URI. PATCH applies partial changes according to a documented patch format and may require concurrency protection. POST commonly creates a server-identified resource or initiates processing. Define missing-field, explicit-null, validation, and retry behavior rather than letting framework defaults become an accidental contract.

</details>

## Level 2: Reliable Contracts

<details>
<summary>5. Which status codes should an API use?</summary>

**Answer:** Typical choices include 200 for a representation, 201 with a Location header for creation, 202 for accepted asynchronous work, and 204 for success without a body. Use 400 for malformed requests, 401 for missing or invalid authentication, 403 for denied access, 404 for absent resources, 409 for state conflicts, and 429 for rate limiting. Document whether semantic validation uses 400 or 422.

</details>

<details>
<summary>6. How should errors be represented?</summary>

**Answer:** Use a stable, machine-readable schema, such as RFC 9457 Problem Details. Include a safe human-readable explanation and a correlation identifier when useful. Clients should branch on documented codes or problem types, not parse changing prose. Avoid returning internal stack traces, SQL, tokens, or sensitive identifiers.

```json
{
  "type": "https://api.example.com/problems/order-state-conflict",
  "title": "Order cannot be cancelled",
  "status": 409,
  "detail": "The order has already shipped.",
  "instance": "/orders/order-123"
}
```

</details>

<details>
<summary>7. How do you prevent duplicate operations during retries?</summary>

**Answer:** For operations such as payment creation, support an idempotency key scoped to the caller and operation. Persist a request fingerprint and outcome atomically with the operation or use an equivalent durable coordination design. Reject reuse with different input and document retention and in-progress behavior. A cache entry written after the operation is not sufficient to close crash windows.

</details>

<details>
<summary>8. How do ETags prevent lost updates?</summary>

**Answer:** Return a representation validator and require a matching `If-Match` value for updates. Check the version and apply the update atomically. If the validator is stale, return 412 Precondition Failed. A preliminary read followed by an unconditional write still allows a race. `If-None-Match` can also enable conditional reads and 304 responses.

</details>

## Level 3: Scale and Evolution

<details>
<summary>9. How do offset and cursor pagination compare?</summary>

**Answer:** Offset pagination is simple and supports page numbers but can be costly at large offsets and shift under concurrent changes. Cursor pagination resumes from a stable sort position. Include a unique tie-breaker, validate cursor scope, and document consistency expectations. A cursor is not automatically a snapshot of the dataset.

```http
GET /orders?limit=25&after=opaque-cursor HTTP/1.1
Accept: application/json
```

</details>

<details>
<summary>10. How should long-running work be exposed?</summary>

**Answer:** Return 202 only after accepting the work durably, and provide an operation resource with pending, running, succeeded, and failed states. Define polling limits, cancellation semantics, retention, and terminal results. Acceptance is not completion; clients need a way to discover later failures and safely retry submissions.

</details>

<details>
<summary>11. How do you evolve an API without breaking clients?</summary>

**Answer:** Prefer additive compatible changes, but remember that new enum values or fields can still break strict clients. Publish an OpenAPI contract, test representative consumers, and document deprecation timelines. Use an explicit versioning strategy for incompatible changes. Versioning does not remove the need for migration support and observability of old-client usage.

</details>

<details>
<summary>12. What belongs in API security and operational design?</summary>

**Answer:** Enforce authentication, object-level authorization, tenant isolation, payload limits, timeouts, rate limits, and safe logging. Bound filtering and sorting complexity. Use explicit cache controls for personalized data so shared caches cannot leak it. Measure latency, error rates, saturation, and client-visible success rather than only server uptime.

</details>

## Practice Lab

1. Design create, read, list, update, and cancellation contracts for orders.
2. Document validation errors, authorization, pagination, and concurrency preconditions in OpenAPI.
3. Simulate a timed-out create followed by a retry with the same idempotency key.
4. Have two clients update one version and verify that only one conditional update succeeds.

**Completion check:** Retries do not duplicate orders, stale updates fail predictably, and error responses match the published contract.

## Quick Revision

- Idempotency concerns intended effects, not identical status codes.
- Resource ownership checks belong on every relevant operation.
- Cursor pagination needs a stable order and unique tie-breaker.
- Conditional writes must check and update atomically.
- Accepted asynchronous work still needs a durable status and failure contract.

## References

- [HTTP Semantics, RFC 9110](https://www.rfc-editor.org/rfc/rfc9110)
- [Problem Details, RFC 9457](https://www.rfc-editor.org/rfc/rfc9457)
- [OpenAPI Specification](https://spec.openapis.org/oas/latest.html)