# OWASP Top 10 Interview Preparation

This guide uses the **OWASP Top 10:2025** web application edition. Category names and ordering differ from 2021. The explanations below focus on defensive engineering and verification in applications you own or are authorized to test.

## Level 1: Purpose and Scope

<details>
<summary>1. What is the OWASP Top 10, and what is it not?</summary>

**Answer:** It is an awareness document describing major web application security risks. It helps organize conversations, training, and prioritization, but is not an exhaustive security requirements list or a certification that an application is secure. Use threat modeling and a verification standard such as OWASP ASVS for concrete requirements and checks.

</details>

<details>
<summary>2. How should the Top 10 be applied during development?</summary>

**Answer:** Map each relevant risk to actual assets, trust boundaries, abuse cases, controls, and verification evidence. Assign owners and severity based on your system's exposure and impact. Keep prevention, detection, and recovery in scope. A scanner result alone cannot establish that business authorization or recovery behavior is correct.

</details>

## Level 2: The 2025 Risk Categories

<details>
<summary>3. A01:2025 - What is Broken Access Control?</summary>

**Answer:** The application fails to enforce who may access or change a resource. Enforce server-side ownership, role, and tenant checks with default-deny policies. Never trust a client-supplied user ID as proof of ownership. Review server-side outbound request restrictions as well; SSRF-related risks are incorporated into this category in the 2025 edition.

**Verification:** With two authorized test accounts, prove that one cannot read or modify the other's resources, including by direct API calls.

</details>

<details>
<summary>4. A02:2025 - What is Security Misconfiguration?</summary>

**Answer:** Unsafe defaults, exposed management interfaces, unnecessary features, permissive permissions, and inconsistent environment configuration can undermine intended protections. Use reviewed configuration baselines, least privilege, minimal public exposure, and automated drift checks. Disable detailed production error output.

**Verification:** Inspect deployed configuration, security headers, public endpoints, and infrastructure policies, not only source defaults.

</details>

<details>
<summary>5. A03:2025 - What are Software Supply Chain Failures?</summary>

**Answer:** Risks arise across dependency selection, acquisition, build tooling, distribution, and maintenance. Inventory components, use trusted registries, lock and verify inputs, review build permissions, and maintain patch and incident-response processes. An SBOM improves visibility but does not itself block malicious or vulnerable software.

**Verification:** Trace a release to its source and build inputs, review dependency updates, and test that untrusted contributions cannot publish production artifacts.

</details>

<details>
<summary>6. A04:2025 - What are Cryptographic Failures?</summary>

**Answer:** Sensitive data is exposed because encryption, key management, password storage, or transport protection is missing or unsuitable. Use maintained cryptographic libraries, modern transport configuration, adaptive password hashing, and managed key lifecycles. Avoid inventing cryptographic schemes and avoid collecting sensitive data unnecessarily.

**Verification:** Review where sensitive data exists, how keys are accessed and rotated, and whether logs, backups, or exports bypass the intended protection.

</details>

<details>
<summary>7. A05:2025 - What is Injection?</summary>

**Answer:** Untrusted input is interpreted as instructions rather than data, for example in SQL, command execution, or browser output. Use parameterized database APIs, structured process invocation, constrained dynamic identifiers, and context-appropriate output encoding. Input validation is useful but does not replace safe sinks.

```java
PreparedStatement statement = connection.prepareStatement(
    "SELECT id, display_name FROM users WHERE id = ?"
);
statement.setLong(1, requestedUserId);
```

Parameterization separates the SQL value from SQL syntax. The application must still authorize access to the selected user and manage resource cleanup.

**Verification:** Inspect data-to-interpreter boundaries and test that unexpected input remains data in an isolated test environment.

</details>

<details>
<summary>8. A06:2025 - What is Insecure Design?</summary>

**Answer:** A system can faithfully implement a design that lacks necessary controls, such as purchase limits, approval boundaries, or recovery verification. Fixing syntax or adding a scanner cannot repair a missing business invariant. Threat model critical workflows and design abuse-resistant transitions, limits, and independent verification where appropriate.

**Verification:** Walk through business abuse cases with product and security owners, and create tests for the agreed invariants.

</details>

<details>
<summary>9. A07:2025 - What are Authentication Failures?</summary>

**Answer:** Weak credential handling, insecure account recovery, poor session lifecycle management, and missing abuse controls can let callers impersonate users. Use suitable MFA, secure session settings, rate limits, and carefully designed recovery flows. Avoid account enumeration and invalidate or rotate credentials and sessions according to the threat model.

**Verification:** Test session expiry, logout, recovery, token validation, and bounded login-abuse defenses using approved test identities.

</details>

<details>
<summary>10. A08:2025 - What are Software or Data Integrity Failures?</summary>

**Answer:** Software or data is trusted without sufficient integrity assurance at the point it is consumed. Examples include unverified updates and unsafe deserialization. Verify signatures and provenance against an actual trust policy, restrict accepted data formats, and avoid executing or deserializing untrusted content into powerful objects.

**Verification:** Demonstrate that altered artifacts or unauthorized data changes are rejected, and inspect what identity is trusted to approve them. This overlaps with supply-chain risk but focuses on integrity assumptions at consumption boundaries.

</details>

<details>
<summary>11. A09:2025 - What are Security Logging and Alerting Failures?</summary>

**Answer:** Important security events are missing, unusable, or never acted upon. Record authentication anomalies, access denials, sensitive administrative changes, and relevant integrity failures with safe context. Protect logs from tampering and unnecessary sensitive data. Define alert ownership, retention, investigation steps, and response time expectations.

**Verification:** Generate an approved synthetic security event and confirm that it reaches the intended alert and response workflow, not merely a local log file.

</details>

<details>
<summary>12. A10:2025 - What is Mishandling of Exceptional Conditions?</summary>

**Answer:** Unexpected failures, exhausted resources, and abnormal conditions can lead to unsafe state, bypassed controls, or uncontrolled service disruption. Fail closed for authorization decisions, preserve transactional consistency, bound resource consumption, and design cleanup and recovery. Catching every exception and reporting success hides failures rather than handling them.

**Verification:** In a controlled environment, simulate dependency timeouts, malformed input, and exhausted quotas. Check that the system neither grants unintended access nor leaves a falsely completed business operation.

</details>

## Level 3: Turning Awareness into Evidence

Use this review sequence for a new feature:

1. Identify sensitive data, privileged operations, external dependencies, and trust boundaries.
2. Map applicable Top 10 risks to concrete failure scenarios.
3. Choose preventive controls and explicit observable failure behavior.
4. Add focused tests and configuration checks, then record remaining risks and owners.

## Practice Lab

Review a small order API you own. Create an access-control matrix, inspect parameterized data access, inventory dependencies, verify secret handling, and test a simulated dependency timeout. Record one piece of evidence per applicable category without probing third-party systems.

**Completion check:** Findings identify a specific boundary, impact, corrective control, and repeatable verification step rather than only naming an OWASP category.

## Quick Revision

- Always name the edition; the 2025 order differs from 2021.
- Authorization must include object ownership and tenant isolation.
- Parameterized values and context-aware encoding prevent interpreter confusion.
- Supply-chain inventories and signatures need enforcement and trusted policies.
- Error handling must preserve security and business invariants.

## References

- [OWASP Top 10:2025](https://top10.owasp.org/2025/)
- [OWASP ASVS](https://owasp.org/www-project-application-security-verification-standard/)
- [OWASP Cheat Sheet Series](https://cheatsheetseries.owasp.org/)