# AWS Interview Preparation

Questions on cloud architecture, security, resilience, and cost. Exercises should use a sandbox account with budgets and explicit cleanup; managed services and stopped resources can still incur charges.

## Level 1: Cloud Foundations

<details>
<summary>1. How do Regions and Availability Zones differ?</summary>

**Answer:** A Region is a geographic area containing multiple Availability Zones. An AZ is a distinct fault-isolation location within a Region. Multi-AZ design addresses many local infrastructure failures; multi-Region design addresses broader outages and data locality but adds replication, routing, consistency, and operational complexity. Check service-specific resilience guarantees.

</details>

<details>
<summary>2. What is the shared responsibility model?</summary>

**Answer:** AWS secures its underlying cloud infrastructure; customers remain responsible for their data, identities, configuration, and application behavior. The boundary changes by service: EC2 customers manage guest operating-system patching, while managed services take on more platform work. A managed database does not automatically make application queries, permissions, or backup retention correct.

</details>

<details>
<summary>3. How do IAM users, roles, and policies relate?</summary>

**Answer:** Identities receive permissions through policies and other applicable controls. Roles are assumed to obtain temporary credentials and are generally preferred for workloads and federation. Applicable explicit denies override allows. Use least privilege, constrained trust policies, MFA where appropriate, and short-lived credentials instead of embedding access keys in source or build artifacts.

</details>

<details>
<summary>4. What makes a subnet public or private?</summary>

**Answer:** A public subnet has a route to an internet gateway; an instance also needs suitable addressing and security rules for direct internet communication. A private subnet lacks that direct route. A NAT gateway can support outbound IPv4 connectivity but is not an inbound application gateway. Route tables, security groups, network ACLs, DNS, and endpoints all affect reachability.

</details>

## Level 2: Choosing Services

<details>
<summary>5. When would you choose EC2, ECS, EKS, or Lambda?</summary>

**Answer:** EC2 offers virtual-machine control with more host operations. ECS orchestrates containers with AWS integration; EKS supplies managed Kubernetes control-plane capabilities with Kubernetes complexity. Lambda fits event-driven execution within its runtime limits. Fargate provides serverless container capacity for supported ECS and EKS workloads. Choose based on runtime, scaling profile, skills, isolation, and total operating cost.

</details>

<details>
<summary>6. How do S3, EBS, and EFS differ?</summary>

**Answer:** S3 is object storage, EBS provides block volumes for supported compute attachments, and EFS provides a managed shared filesystem. They have different access semantics, latency, throughput, and availability characteristics. S3 provides strong consistency for object operations, but does not behave like a transactional POSIX filesystem. Design lifecycle and recovery policies explicitly.

</details>

<details>
<summary>7. How do RDS and DynamoDB compare?</summary>

**Answer:** RDS manages relational engines suitable for SQL, joins, and transactional relational models. DynamoDB is a managed key-value and document database designed around access patterns and partition keys. Avoid hot keys, model indexes deliberately, and understand per-operation consistency choices. A managed service still needs capacity, cost, recovery, and application-level data modeling decisions.

</details>

<details>
<summary>8. When should you use SQS, SNS, or EventBridge?</summary>

**Answer:** SQS buffers work for consumers; SNS supports publish/subscribe fan-out; EventBridge routes events based on rules and integration capabilities. Delivery, ordering, retry, and retention guarantees vary by service and configuration. Design consumers for duplicates where delivery can be at least once, and use dead-letter handling with an owned investigation and replay process.

</details>

## Level 3: Reliable and Secure Architecture

<details>
<summary>9. How would you design a highly available web application?</summary>

**Answer:** Place stateless application capacity across AZs behind an appropriate load balancer, store shared state in resilient services, and use a suitable database failover setup. Design bounded timeouts, retries with jitter, health checks, and graceful degradation. A diagram with two AZs is incomplete without testing dependency failures and confirming sufficient surviving capacity.

```text
Clients -> DNS -> CDN / edge protections -> Load balancer
                                          |           |
                                     App in AZ-A  App in AZ-B
                                          |           |
                                     Database and queue services
```

The exact topology depends on public/private endpoint requirements and the selected AWS services.

</details>

<details>
<summary>10. What are RPO and RTO, and how do you prove them?</summary>

**Answer:** Recovery Point Objective limits acceptable data loss; Recovery Time Objective limits restoration time. Select backups, replication, and failover procedures to meet them. Prove the targets with restoration and recovery drills, including credentials, networking, DNS, and application consistency checks. Multi-AZ failover is not a substitute for backups against logical deletion.

</details>

<details>
<summary>11. How should credentials, encryption, and observability be designed?</summary>

**Answer:** Use workload roles, a secrets manager where appropriate, encrypted transport, and deliberate KMS key policies and lifecycle controls. CloudTrail records supported API activity; CloudWatch provides metrics, logs, and alarms. Enable the required event categories and retention rather than assuming every data event is recorded. Keep sensitive payloads out of logs and audit who can read them.

</details>

<details>
<summary>12. How do you control cost without undermining reliability?</summary>

**Answer:** Tag and attribute usage, right-size from measurements, set budgets and anomaly alerts, and evaluate storage lifecycle and transfer costs. Commitment discounts suit stable workloads; interruptible capacity suits interruption-tolerant work. NAT, logging, idle load balancers, snapshots, and cross-zone or cross-Region traffic can be material. Budget alerts are not a guaranteed spending cap.

</details>

## Practice Lab

1. Draw a two-AZ application with explicit traffic paths and trust boundaries before provisioning anything.
2. Define a least-privilege workload role and explain which resources it can access.
3. In an approved sandbox, test a small deployment and a backup restore with budget alerts enabled.
4. Remove all lab resources, including billable dependencies, and review the billing dashboard afterward.

**Completion check:** Justify each service, demonstrate recovery evidence, and identify the remaining charges and shared responsibilities.

## Quick Revision

- Multi-AZ and multi-Region solve different failure scopes.
- Prefer temporary workload credentials to embedded keys.
- Private subnet placement is not a complete authorization policy.
- Managed databases still need tested backups and application invariants.
- Measure total cost, including networking and operations.

## References

- [AWS Well-Architected Framework](https://docs.aws.amazon.com/wellarchitected/latest/framework/welcome.html)
- [AWS IAM Best Practices](https://docs.aws.amazon.com/IAM/latest/UserGuide/best-practices.html)
- [AWS Shared Responsibility Model](https://aws.amazon.com/compliance/shared-responsibility-model/)
