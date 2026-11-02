# CI/CD Interview Preparation

Questions on validating, packaging, releasing, and recovering software. A pipeline should produce trustworthy evidence and a traceable artifact, not just a sequence of green steps.

## Level 1: Delivery Foundations

<details>
<summary>1. How do continuous integration, delivery, and deployment differ?</summary>

**Answer:** Continuous integration merges and validates changes frequently. Continuous delivery keeps validated changes releasable, often with a manual production decision. Continuous deployment automatically releases qualifying changes to production. Teams use the terms differently, so clarify the actual release gates and who authorizes production changes.

</details>

<details>
<summary>2. What stages belong in a pipeline?</summary>

**Answer:** A typical flow checks out a specific revision, installs locked dependencies, runs static checks and tests, builds an artifact, evaluates relevant security policies, and deploys with verification. Order fast discriminating checks early. Separate untrusted pull-request validation from privileged publishing, and define cleanup, timeout, and failure behavior for every stage.

</details>

<details>
<summary>3. Why build once and promote the same artifact?</summary>

**Answer:** Rebuilding separately for each environment can produce different bytes even from the same commit because dependencies, build inputs, or tools can vary. Promote an immutable, identified artifact when possible and supply environment configuration at runtime. Some static apps embed build-time configuration; document those exceptions and verify each resulting artifact deliberately.

</details>

<details>
<summary>4. What makes a build reproducible?</summary>

**Answer:** Control source revision, dependency versions and integrity, toolchain versions, base images, and relevant environment inputs. A lockfile improves repeatability but is not a complete guarantee of byte-identical output. Record build metadata and provenance. Do not fetch mutable remote scripts without a deliberate trust and verification policy.

</details>

## Level 2: Artifacts and Deployment

<details>
<summary>5. How do caches and artifacts differ?</summary>

**Answer:** A cache accelerates work and may be missing, stale, or untrusted. An artifact is an output deliberately retained and consumed, such as a package, image, report, or static-site build. Correctness must not depend on a cache hit. Scope cache keys to relevant inputs and prevent untrusted contributors from poisoning privileged build inputs.

</details>

<details>
<summary>6. How do rolling, blue-green, and canary deployments compare?</summary>

**Answer:** Rolling deployments gradually replace instances. Blue-green maintains separate old and new environments and switches traffic. Canary sends a controlled portion of traffic to the new version and evaluates outcomes. Each needs compatibility, capacity, routing, observability, and an abort procedure. Percentage rollout is not useful without meaningful success criteria.

</details>

<details>
<summary>7. How do you deploy database changes safely?</summary>

**Answer:** Use expand-and-contract: add compatible structures, deploy code able to coexist with old and new forms, migrate data, then remove obsolete structures after all consumers migrate. Evaluate locks and migration duration against production-sized data. Application rollback may fail after irreversible schema or data changes, so plan restoration or forward repair separately.

</details>

<details>
<summary>8. What should deployment verification check?</summary>

**Answer:** Confirm artifact identity, rollout health, critical smoke workflows, error rates, latency, and business signals over a suitable window. A process being alive does not prove customer requests work. Define rollback thresholds before the release, and avoid automatically rolling back into an incompatible schema or an already-known-bad dependency state.

```text
Pull request -> Fast checks -> Focused tests -> Build
Protected main -> Verified artifact -> Staging -> Smoke checks
              -> Production authorization -> Rollout -> Outcome monitoring
```

</details>

## Level 3: Security and Operational Control

<details>
<summary>9. How should pipeline credentials be handled?</summary>

**Answer:** Prefer short-lived identity federation, such as OIDC, to long-lived cloud keys. Restrict token permissions, role trust conditions, repository and branch claims, and production environment access. Do not expose secrets to untrusted pull-request code or print them in logs. Masking helps presentation but does not make arbitrary secret handling safe.

</details>

<details>
<summary>10. Why pin actions and verify provenance?</summary>

**Answer:** Third-party actions and build dependencies execute code in the pipeline's trust boundary. Immutable revision pinning reduces unexpected upstream changes, while a maintained update process supplies fixes. Provenance and signatures can establish origin and build context when verified against a policy; they do not prove the software is free of vulnerabilities.

</details>

<details>
<summary>11. How do concurrency and retries affect deployments?</summary>

**Answer:** Concurrent releases can overwrite one another or race migrations. Serialize deployments or use an explicit concurrency policy, and make deployment operations safe to retry. Cancelling an in-flight workflow does not automatically undo external changes already made. Decide whether cancellation is safe during migration, traffic switching, and artifact publication.

</details>

<details>
<summary>12. Which delivery metrics are useful?</summary>

**Answer:** Measure change lead time, deployment frequency, failure and recovery outcomes, and customer impact using clear operational definitions. Also inspect queue time, flaky-check cost, and rollback reliability. Use trends to improve the system rather than incentivizing teams to maximize deployment counts or conceal failed releases.

</details>

## Practice Lab

1. Define a pipeline for a frontend with locked installation, linting, tests, content validation, and a production build.
2. Store the built output as an artifact and deploy that output rather than the repository root.
3. Introduce a failing test and verify that no deployment takes place.
4. Rehearse a release abort and explain what happens to any external changes already applied.

**Completion check:** Every deployed artifact traces to a tested revision, untrusted code has no deployment credentials, and recovery has been rehearsed.

## Quick Revision

- Delivery can have a manual release decision; deployment automates it.
- Caches accelerate; artifacts carry verified outputs.
- Promote immutable artifacts rather than silently rebuilding.
- Schema rollback and application rollback are different problems.
- Cancellation is not automatic compensation for external side effects.

## References

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [GitHub Actions Security](https://docs.github.com/en/actions/security-for-github-actions)
- [SLSA Supply-Chain Framework](https://slsa.dev/)