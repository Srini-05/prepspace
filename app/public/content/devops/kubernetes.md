# Kubernetes Interview Preparation

Interview questions on Kubernetes primitives and production tradeoffs. Run exercises in a disposable local cluster and use APIs supported by your cluster version.

## Level 1: Workload Primitives

<details>
<summary>1. What does Kubernetes reconcile?</summary>

**Answer:** Controllers compare desired state stored through the API with observed state and act to reduce differences. The scheduler places eligible Pods onto nodes, and kubelets run their containers. Reconciliation is asynchronous; an accepted manifest does not prove a workload is ready. Kubernetes automates recovery actions, not application correctness.

</details>

<details>
<summary>2. How do a Pod, Deployment, and StatefulSet differ?</summary>

**Answer:** A Pod is a scheduling unit containing closely related containers with shared networking and attached storage. A Deployment manages interchangeable Pods through ReplicaSets. A StatefulSet provides stable identities and ordered lifecycle behavior for stateful workloads. StatefulSet alone does not provide replication, quorum, database backup, or correct failover.

</details>

<details>
<summary>3. What do Services and ingress routing provide?</summary>

**Answer:** A Service provides a stable endpoint and discovery for selected backends. ClusterIP is typically internal; LoadBalancer requests external load balancing through the environment's integration. Ingress resources require a controller, and Gateway API resources require a supporting implementation. TLS, authentication, and authorization still need explicit configuration.

</details>

<details>
<summary>4. How do ConfigMaps and Secrets differ?</summary>

**Answer:** ConfigMaps hold non-secret configuration; Secrets are intended for sensitive values. Base64 encoding is not encryption. Configure encryption at rest, restrictive RBAC, and an appropriate secret delivery mechanism. Mounted files and environment variables have different update behavior; plan application reloads or rollouts rather than assuming all updates apply immediately.

</details>

## Level 2: Availability and Scheduling

<details>
<summary>5. How do startup, readiness, and liveness probes differ?</summary>

**Answer:** Startup probes allow slow initialization before liveness and readiness probing begins. Readiness determines whether a Pod should receive normal Service traffic. Liveness can trigger a container restart after its configured failures. Do not make liveness depend on every remote dependency, or a database outage can cause a restart storm.

</details>

<details>
<summary>6. How do requests and limits affect workloads?</summary>

**Answer:** Requests influence scheduling and resource allocation. CPU limits can cause throttling; memory limit breaches can lead to out-of-memory termination. Resource requests do not reserve unlimited burst capacity. Tune with measured usage and latency, leaving headroom for startup and traffic variation. Resource pressure can also cause node-level eviction.

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: interview-web
spec:
  replicas: 2
  selector:
    matchLabels:
      app: interview-web
  template:
    metadata:
      labels:
        app: interview-web
    spec:
      containers:
        - name: web
          image: nginx:stable-alpine
          ports:
            - containerPort: 80
          resources:
            requests:
              cpu: 100m
              memory: 64Mi
            limits:
              cpu: 500m
              memory: 128Mi
          readinessProbe:
            httpGet:
              path: /
              port: 80
            initialDelaySeconds: 2
            periodSeconds: 5
```

This local teaching example is not a hardened production manifest. Production should use approved immutable image digests, security contexts, placement rules, and deliberate probe settings.

</details>

<details>
<summary>7. How do rolling updates avoid downtime?</summary>

**Answer:** A Deployment controls old and new replica counts using `maxSurge` and `maxUnavailable`. Real availability also depends on readiness, spare capacity, graceful termination, connection draining, and compatibility between application versions. A rollout can stall when resources are insufficient or new Pods never become ready. A successful rollout does not prove database compatibility.

</details>

<details>
<summary>8. What does a PodDisruptionBudget guarantee?</summary>

**Answer:** A PDB constrains supported voluntary disruptions through the eviction API. It does not prevent all outages, node failures, or every form of Pod deletion, and it does not itself control Deployment rolling-update behavior. Combine replica spread across failure domains, sufficient capacity, and application-level fault tolerance.

</details>

## Level 3: Scaling, Storage, and Security

<details>
<summary>9. How do HPA and node autoscaling differ?</summary>

**Answer:** The Horizontal Pod Autoscaler adjusts workload replica counts from configured metrics. Node autoscaling adjusts cluster node capacity. CPU utilization targets depend on appropriate CPU requests and available metrics. Scaling can be delayed by image pulls, startup, quotas, or unavailable nodes; include queueing and load shedding in overload design.

</details>

<details>
<summary>10. What are PersistentVolumes, claims, and storage classes?</summary>

**Answer:** A PersistentVolumeClaim requests storage; a PersistentVolume represents provisioned capacity; a StorageClass describes provisioning behavior. Access modes and topology affect where workloads can run. Reclaim policies determine what happens after a claim is released. Durable storage is not automatically replicated across zones or backed up consistently.

</details>

<details>
<summary>11. How should a namespace be secured?</summary>

**Answer:** Apply least-privilege RBAC and service accounts, restrict privilege and host access, enforce appropriate Pod Security controls, and limit resource usage. NetworkPolicies require an enforcing network plugin and explicit ingress and egress design. Namespaces organize resources but are not a complete hostile multi-tenant isolation boundary.

</details>

<details>
<summary>12. How do you debug Pending or CrashLoopBackOff Pods?</summary>

**Answer:** For Pending, inspect scheduling events, requests, affinity, taints, quotas, and storage binding. For repeated crashes, inspect current and previous logs, exit codes, probes, configuration, and memory events. CrashLoopBackOff describes restart backoff, not a root cause. Confirm selectors and EndpointSlices when a healthy Pod receives no Service traffic.

```sh
kubectl get pods
kubectl describe pod POD_NAME
kubectl logs POD_NAME --previous
kubectl get events --sort-by=.metadata.creationTimestamp
```

Replace the placeholder with a Pod you are authorized to inspect; diagnostic output can contain sensitive configuration.

</details>

## Practice Lab

1. Deploy two replicas to a disposable local cluster and expose them with a ClusterIP Service.
2. Introduce a failing readiness probe and explain why traffic stops without assuming a restart.
3. Perform an image rollout and observe old and new replicas and rollout status.
4. Create an intentionally oversized resource request and use events to explain a Pending Pod.

**Completion check:** Distinguish probe failures from scheduling failures and show a rolling update with ready backends throughout.

## Quick Revision

- Controllers reconcile; accepted configuration is not readiness.
- Readiness changes traffic eligibility; liveness can restart.
- Requests drive scheduling; limits constrain runtime usage.
- PDBs address certain voluntary disruptions, not all failures.
- StatefulSet identity is not database replication or backup.

## References

- [Kubernetes Concepts](https://kubernetes.io/docs/concepts/)
- [Kubernetes Troubleshooting](https://kubernetes.io/docs/tasks/debug/)