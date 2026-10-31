# System Design: Interview Questions and Answers

**A practical guide to designing systems from requirements through production operation.**

System design is the process of translating user and business needs into a system that can be built, operated, secured, and evolved. A strong design explains not only which components exist, but why they are needed, how they interact, and what happens when they fail.

Try answering each question before expanding it. In an interview, clarify requirements first, state assumptions, sketch the major components, and explain tradeoffs rather than presenting one design as universally correct.

## Contents

| Level | Focus |
|---|---|
| [1. Design Foundations](#level-1-system-design-foundations) | Requirements, HLD, LLD, estimates, and tradeoffs |
| [2. API and Database Design](#level-2-api-and-database-design) | Contracts, data models, indexes, and persistence |
| [3. Authentication Architecture](#level-3-authentication-and-identity-architecture) | Sessions, tokens, OAuth/OIDC, and service identity |
| [4. Application Architecture](#level-4-application-architecture) | Monoliths, microservices, and event-driven systems |
| [5. Data and Traffic Patterns](#level-5-caching-queues-and-load-balancing) | Caching, queues, load balancing, and scaling |
| [6. Reliability and Operations](#level-6-fault-tolerance-and-observability) | Resilience, recovery, and observability |
| [7. Security and Cloud Architecture](#level-7-security-and-cloud-architecture) | Security architecture and cloud deployment |
| [Reference](#system-design-reference) | Interview framework, checklists, and example |

## Level 1: System Design Foundations

<details>
<summary>1. What is system design?</summary>

**Answer:** System design defines the components, data, interfaces, and operational behavior needed to satisfy a set of requirements. It covers choices such as storage, APIs, communication patterns, scaling, reliability, and security.

</details>

<details>
<summary>2. What is the difference between functional and non-functional requirements?</summary>

**Answer:** Functional requirements describe what the system does, such as creating an order. Non-functional requirements describe qualities or constraints, such as latency, availability, security, scale, accessibility, and cost. Both shape architecture.

</details>

<details>
<summary>3. What is HLD?</summary>

**Answer:** High-Level Design (HLD) describes the system's major components, their responsibilities, communication paths, data stores, and external dependencies. It is useful for discussing architecture and tradeoffs before implementation details are fixed.

</details>

<details>
<summary>4. What is LLD?</summary>

**Answer:** Low-Level Design (LLD) describes how a component will be implemented, including classes or modules, interfaces, schemas, algorithms, validation, and error handling. HLD answers “what are the main parts and how do they connect?”; LLD answers “how does this part work internally?”

</details>

<details>
<summary>5. How do HLD and LLD work together?</summary>

**Answer:** HLD sets boundaries and system-wide decisions. LLD elaborates selected components within those boundaries. LLD can reveal constraints that require revisiting the HLD, so design is iterative rather than a strict one-way handoff.

</details>

<details>
<summary>6. How should you start a system design interview?</summary>

**Answer:** Clarify users, core workflows, scale, latency, availability, consistency, security, retention, and constraints. Identify what is in scope and state assumptions when information is missing. This prevents designing the wrong system in impressive detail.

</details>

<details>
<summary>7. Why should you distinguish must-have requirements from nice-to-have requirements?</summary>

**Answer:** Must-have requirements define whether the design solves the problem. Nice-to-have requirements help prioritize future capabilities. Separating them prevents overengineering and makes tradeoffs visible.

</details>

<details>
<summary>8. What is a capacity estimate, and why make one?</summary>

**Answer:** A capacity estimate approximates request volume, storage, bandwidth, or compute using explicit assumptions. It helps identify likely bottlenecks and choose an initial design. Estimates are directional; validate them with measurements and revise them as usage data arrives.

</details>

<details>
<summary>9. How do you estimate storage at a high level?</summary>

**Answer:** Estimate records created per time period multiplied by average stored size and retention duration, then account for indexes, replicas, metadata, growth, and backups. State assumptions and avoid false precision.

</details>

<details>
<summary>10. What makes a design tradeoff good?</summary>

**Answer:** A good tradeoff connects a decision to a requirement and acknowledges its costs. For example, adding replicas may improve read capacity and resilience but introduces lag, storage cost, and failover complexity.

</details>

## Level 2: API and Database Design

<details>
<summary>11. What is API design?</summary>

**Answer:** API design defines how clients and services interact: operations, resource names, request and response formats, validation, errors, authentication, authorization, versioning, and performance expectations. A good API is consistent and documents behavior clients need to rely on.

</details>

<details>
<summary>12. What makes an API contract useful?</summary>

**Answer:** A useful contract specifies inputs, outputs, status or error behavior, authentication requirements, authorization rules, limits, and compatibility expectations. It lets clients and servers evolve independently and can be documented with a schema such as OpenAPI.

</details>

<details>
<summary>13. How do you design pagination for a large API result?</summary>

**Answer:** Avoid returning an unbounded result set. Offset pagination is simple but can become slow or inconsistent as data changes. Cursor pagination uses a stable ordering key and is often better for large or changing datasets. Include clear limits and continuation behavior.

</details>

<details>
<summary>14. How should an API design errors?</summary>

**Answer:** Use a consistent response structure, appropriate status codes, stable machine-readable error identifiers, and useful but non-sensitive messages. Do not expose stack traces, secrets, or internal implementation details to clients.

</details>

<details>
<summary>15. What is database design?</summary>

**Answer:** Database design organizes data, relationships, constraints, and access patterns so the system can preserve correctness and serve queries efficiently. Start from domain requirements and read/write patterns, then choose schemas, indexes, and transaction boundaries.

</details>

<details>
<summary>16. When would you choose a relational database?</summary>

**Answer:** A relational database is a strong fit when data has clear relationships, constraints, and transactions, and when flexible querying is valuable. It is commonly used for financial, order, and account data, though workload and operational requirements should guide the choice.

</details>

<details>
<summary>17. When might a NoSQL database be appropriate?</summary>

**Answer:** A NoSQL database may fit access patterns requiring flexible document shapes, high-throughput key lookups, wide-column storage, or specialized graph queries. “NoSQL” covers different data models; select a specific database based on query needs, consistency, scale, and operational expertise.

</details>

<details>
<summary>18. What is normalization?</summary>

**Answer:** Normalization structures relational data to reduce unnecessary duplication and update anomalies. It supports consistency but may require joins. Denormalization duplicates or precomputes data for read performance, at the cost of additional update and consistency work.

</details>

<details>
<summary>19. What is a database index?</summary>

**Answer:** An index is an auxiliary data structure that helps the database locate rows efficiently for selected queries. Indexes can improve reads but consume storage and add work to writes. Create them based on observed query patterns and verify with query plans.

</details>

<details>
<summary>20. How should you choose a database key?</summary>

**Answer:** Choose a key that is unique, stable, and suitable for the system's access and distribution patterns. Consider whether it reveals sensitive business information, creates hot partitions, or complicates merges and references.

</details>

<details>
<summary>21. What are database constraints, and why use them?</summary>

**Answer:** Constraints enforce data rules at the storage boundary, such as uniqueness, non-null values, and valid references. They protect integrity even when data is written by multiple application paths or concurrent requests.

</details>

## Level 3: Authentication and Identity Architecture

<details>
<summary>22. What should an authentication architecture define?</summary>

**Answer:** It should define how identities are established, authenticated, recovered, and revoked; how sessions or tokens are issued and validated; how MFA is applied; and how identity events are monitored. Authorization remains a separate decision about allowed actions.

</details>

<details>
<summary>23. What is the difference between session-based and token-based authentication?</summary>

**Answer:** In session-based authentication, the server typically stores session state and the client presents a session identifier. In token-based approaches, the client presents a token that a service validates. Tokens can simplify distributed validation but require careful expiry, revocation, audience, and storage decisions.

</details>

<details>
<summary>24. What is OAuth 2.0?</summary>

**Answer:** OAuth 2.0 is an authorization framework for delegated access. It allows a client to obtain limited access to a resource on behalf of a user or service. It is not, by itself, an authentication protocol.

</details>

<details>
<summary>25. What is OpenID Connect?</summary>

**Answer:** OpenID Connect (OIDC) is an identity layer built on OAuth 2.0. It defines how a client can authenticate a user and receive identity information. Use established libraries and validate issuer, audience, signature, expiry, and protocol flow requirements.

</details>

<details>
<summary>26. How should services authenticate to each other?</summary>

**Answer:** Use managed service identities, short-lived credentials, or mutually authenticated channels where appropriate. Scope permissions narrowly, rotate credentials, protect secrets, validate the peer, and monitor service identity use. Avoid embedding long-lived shared credentials in code.

</details>

<details>
<summary>27. Where should authorization be enforced?</summary>

**Answer:** Enforce it at the trusted server or service boundary for every protected operation and resource. A gateway can provide useful coarse-grained controls, but downstream services may still need resource-specific checks. Client-side UI checks are not security controls.

</details>

## Level 4: Application Architecture

<details>
<summary>28. What is a monolithic architecture?</summary>

**Answer:** A monolith packages multiple application capabilities into one deployable unit. It can simplify local development, transactions, and deployment for a small team. As the system grows, code boundaries, deployment coordination, or scaling needs may justify extracting components.

</details>

<details>
<summary>29. What is microservices architecture?</summary>

**Answer:** Microservices organize an application as independently deployable services around business capabilities, each with explicit interfaces and operational ownership. This can enable independent scaling and releases, but adds network failures, distributed data, observability, deployment, and coordination complexity.

</details>

<details>
<summary>30. When should a team use microservices?</summary>

**Answer:** Use them when independent ownership, scaling, release cadence, or fault isolation provides enough value to justify the operational cost. A modular monolith is often a simpler starting point when boundaries and workloads are still changing.

</details>

<details>
<summary>31. What is a service boundary?</summary>

**Answer:** A service boundary defines which capability, data, and decisions belong to a component and how others interact with it. Good boundaries align with cohesive business responsibilities and reduce the need for frequent cross-service coordination.

</details>

<details>
<summary>32. What is event-driven architecture?</summary>

**Answer:** Event-driven architecture communicates changes or facts through events. Producers and consumers can evolve independently and process work asynchronously, but the design must address event schemas, duplicate delivery, ordering, observability, and eventual consistency.

</details>

<details>
<summary>33. When should you use synchronous communication versus asynchronous messaging?</summary>

**Answer:** Use synchronous calls when the caller needs an immediate result and the dependency's latency and availability are acceptable. Use asynchronous messaging when work can happen later, bursts need smoothing, or components should be decoupled. Messaging adds delivery, replay, and operational concerns.

</details>

<details>
<summary>34. How do you design a service API to remain compatible?</summary>

**Answer:** Prefer additive changes, define clear ownership and schemas, tolerate unknown optional fields where appropriate, and avoid changing existing field meaning. Use explicit versioning when compatibility cannot be preserved, and monitor client adoption before removing old behavior.

</details>

## Level 5: Caching, Queues, and Load Balancing

<details>
<summary>35. What is caching, and when should you use it?</summary>

**Answer:** A cache stores reusable results closer to the consumer to reduce latency or load on a source. Use it for measured hot or expensive reads when the freshness policy is acceptable. Define cache keys, TTL, invalidation, miss behavior, and what happens if the cache is unavailable.

</details>

<details>
<summary>36. What is cache-aside?</summary>

**Answer:** In cache-aside, the application checks the cache, reads from the source on a miss, and then populates the cache. It is simple and widely used, but invalidation and stale data must be managed explicitly.

</details>

<details>
<summary>37. What is a message queue, and when should you use one?</summary>

**Answer:** A message queue stores work for consumers to process asynchronously. It helps decouple services and absorb bursts. Define delivery semantics, acknowledgment, retries, dead-letter handling, ordering needs, and queue-age alerts.

</details>

<details>
<summary>38. What is a dead-letter queue?</summary>

**Answer:** A dead-letter queue holds messages that cannot be processed successfully after defined attempts or policy checks. It helps prevent poison messages from blocking normal work, but requires monitoring, inspection, and a safe replay or resolution process.

</details>

<details>
<summary>39. What is load balancing?</summary>

**Answer:** Load balancing distributes requests or connections across service instances. It can improve capacity and availability. A design should include health checks, timeouts, connection draining, capacity-aware routing, and a plan for when no backend is healthy.

</details>

<details>
<summary>40. What is the difference between Layer 4 and Layer 7 load balancing?</summary>

**Answer:** Layer 4 balancing routes using transport-level information such as IP addresses and ports. Layer 7 balancing can use application details such as HTTP host, path, or headers. Layer 7 enables richer routing but requires more protocol processing and configuration.

</details>

<details>
<summary>41. How do you scale a stateless application horizontally?</summary>

**Answer:** Run multiple instances behind a load balancer, store shared state in appropriate external services, make startup and shutdown predictable, and monitor saturation. Ensure session state, files, and background work are not unintentionally tied to one instance.

</details>

<details>
<summary>42. What is a hot partition or hot key?</summary>

**Answer:** A hot partition receives disproportionate traffic or data compared with others, limiting the throughput of the whole system. Choose distribution keys carefully, measure skew, and consider bucketing or workload-specific partition strategies.

</details>

## Level 6: Fault Tolerance and Observability

<details>
<summary>43. What is fault tolerance?</summary>

**Answer:** Fault tolerance is the ability to continue providing acceptable service when components fail. It can use redundancy, failover, isolation, graceful degradation, and recovery procedures. It does not mean every component must be duplicated regardless of cost or risk.

</details>

<details>
<summary>44. What is high availability?</summary>

**Answer:** High availability aims to reduce service downtime through design and operational measures such as redundancy, health checks, failover, and tested recovery. Availability targets should define user-visible success and measurement windows.

</details>

<details>
<summary>45. How do timeouts, retries, and circuit breakers work together?</summary>

**Answer:** Timeouts bound waiting, retries repeat selected transient failures within a budget, and circuit breakers reduce calls to a dependency that is persistently failing. Use them together carefully: retries need idempotent operations, backoff, jitter, and an overall deadline.

</details>

<details>
<summary>46. What is graceful degradation?</summary>

**Answer:** Graceful degradation preserves core functionality when an optional component is unavailable. For example, a product page might still render if recommendations are down. Define which features can degrade and avoid presenting incomplete results as correct.

</details>

<details>
<summary>47. What is disaster recovery?</summary>

**Answer:** Disaster recovery restores systems and data after a severe outage. Define recovery time and recovery point objectives, backup scope, restoration dependencies, ownership, and test frequency. A backup is useful only if it can be restored within acceptable goals.

</details>

<details>
<summary>48. What is observability?</summary>

**Answer:** Observability is the ability to infer a system's internal state from its outputs. Metrics show numerical trends, logs record discrete events, and traces connect work across components. Together they help operators understand behavior and investigate failures.

</details>

<details>
<summary>49. What is the difference between monitoring and observability?</summary>

**Answer:** Monitoring checks known conditions and alerts when expected signals cross thresholds. Observability supports investigation of system behavior, including questions not anticipated when dashboards were created. Both are needed for reliable operations.

</details>

<details>
<summary>50. What should a distributed trace include?</summary>

**Answer:** A trace should connect spans across a request path and include useful timing, service, and outcome context. Avoid recording secrets or sensitive personal data. Consistent trace propagation and sampling choices are important at scale.

</details>

<details>
<summary>51. What are golden signals?</summary>

**Answer:** A common operational model tracks latency, traffic, errors, and saturation. These signals help identify user-visible degradation and resource pressure, but should be paired with service-specific indicators and objectives.

</details>

## Level 7: Security and Cloud Architecture

<details>
<summary>52. What is security architecture?</summary>

**Answer:** Security architecture places security requirements and controls across identities, applications, data, infrastructure, and operations. It maps trust boundaries and threats to safeguards, owners, and evidence rather than relying on one perimeter control.

</details>

<details>
<summary>53. What security concerns should be considered in a system design?</summary>

**Answer:** Identify data sensitivity, identity and authorization, secrets, encryption, input validation, logging, dependencies, abuse and rate limits, network boundaries, backup protection, and incident response. Apply controls proportionately to risk and verify them through review and testing.

</details>

<details>
<summary>54. What is cloud architecture?</summary>

**Answer:** Cloud architecture organizes compute, storage, networking, identity, managed services, and operations on a cloud platform. It should meet workload requirements while addressing reliability, security, cost, deployment, and provider-specific responsibilities.

</details>

<details>
<summary>55. How do you design for cloud availability zones?</summary>

**Answer:** Distribute suitable components across independent availability zones, avoid single-zone dependencies, and verify that data replication and failover meet consistency and recovery needs. Test failover behavior and account for the cost and capacity needed during a zone outage.

</details>

<details>
<summary>56. What is the cloud shared responsibility model?</summary>

**Answer:** The cloud provider and customer have different security responsibilities. The provider secures parts of the underlying platform; customers remain responsible for areas such as identity, data, configuration, and workloads according to the service. The exact boundary varies by service.

</details>

<details>
<summary>57. How should system design account for cost?</summary>

**Answer:** Estimate costs for compute, storage, network transfer, managed services, observability, and redundancy. Compare cost against reliability and performance requirements, identify major cost drivers, and design measurement and scaling policies rather than optimizing only for peak theoretical load.

</details>

<details>
<summary>58. How do you choose between building a component and using a managed service?</summary>

**Answer:** Compare functional fit, reliability, security, data control, operational skills, integration, portability, cost, and failure modes. Managed services reduce some operational work but do not remove configuration, access-control, availability, or vendor-dependency responsibilities.

</details>

## System Design Reference

### Interview Flow

| Step | What to do |
|---:|---|
| 1 | Clarify users, core use cases, and scope |
| 2 | Establish scale, latency, availability, security, and cost goals |
| 3 | Define APIs, data ownership, and consistency requirements |
| 4 | Sketch HLD components and main request/data flows |
| 5 | Deep-dive into LLD for the most important component |
| 6 | Identify bottlenecks, partial failures, and abuse cases |
| 7 | Add scaling, fault tolerance, and observability |
| 8 | Explain tradeoffs, rollout, and what you would measure next |

### Design Review Checklist

| Area | Questions |
|---|---|
| Requirements | Which user outcomes and service objectives are mandatory? |
| Data | Who owns each record? What consistency and retention are required? |
| API | Are contracts bounded, versionable, authorized, and safe to retry? |
| Scaling | What is the bottleneck, and how does capacity grow? |
| Resilience | What happens when a dependency is slow, unavailable, or returns errors? |
| Security | Where are identities checked, secrets stored, and sensitive events logged? |
| Operations | Can operators detect, diagnose, deploy, roll back, and recover safely? |
| Cost | Which choices drive cost, and how will usage be measured? |

### Example: Online Order Service

```text
Web / Mobile Client
        |
   API Gateway
        |
   Order Service ------ Relational Database
        |
   Message Broker
      /       \
Inventory   Notification
 Service      Service
```

The API validates and authorizes the request. The Order Service records the order and publishes work asynchronously when the user does not need every downstream action to finish within the initial request. Inventory owns inventory data; Notification owns delivery attempts. The design needs idempotent order creation, bounded retries, queue monitoring, and a recovery process for failed messages. Exact choices depend on consistency, latency, and business requirements.

## Final Reminder

A good system design is not the one with the most components. It is the simplest design that meets explicit requirements, handles realistic failures, protects its data, and can be operated by the team responsible for it.
