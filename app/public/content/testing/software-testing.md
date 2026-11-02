# Software Testing Interview Preparation

Questions and exercises for choosing tests that expose meaningful risks. Use testing evidence to support release decisions rather than treating test counts or coverage percentages as a correctness certificate.

## Level 1: Testing Foundations

<details>
<summary>1. How do verification and validation differ?</summary>

**Answer:** Verification asks whether software meets its specified requirements; validation asks whether those requirements and the delivered behavior solve the user's actual problem. A perfectly implemented specification can still describe the wrong workflow. Combine automated checks with examples, exploratory testing, and feedback from realistic use.

</details>

<details>
<summary>2. How do unit, integration, and end-to-end tests differ?</summary>

**Answer:** Unit tests isolate a small behavioral boundary. Integration tests exercise real interactions such as database queries or HTTP serialization. End-to-end tests cover a user workflow across a deployed or representative application. Boundaries vary by project, so state what each test actually includes. More realistic tests tend to cost more to run and diagnose.

</details>

<details>
<summary>3. What makes a test useful?</summary>

**Answer:** A useful test has a clear behavior, realistic setup, and an assertion capable of failing when that behavior is wrong. Keep it deterministic, isolated, readable, and appropriately fast. A test that checks only that a method was called may miss an incorrect outcome. Ask what plausible regression would make the test fail.

</details>

<details>
<summary>4. How do boundary values and equivalence classes help?</summary>

**Answer:** Group inputs expected to behave similarly and select representative cases, then test transitions between groups. For an allowed quantity from 1 through 100, useful values include 0, 1, 100, and 101, plus invalid formats and nullability where relevant. Include combinations that threaten a domain invariant instead of generating arbitrary large case lists.

</details>

## Level 2: Test Design and Dependencies

<details>
<summary>5. How do mocks, stubs, and fakes differ?</summary>

**Answer:** A stub supplies predetermined responses; a fake is a simplified working implementation; a mock usually checks expected interactions. Terminology differs by framework. Use doubles at boundaries you intentionally exclude, but exercise real persistence or serialization when those behaviors are the risk. Over-mocking can make tests agree with the same incorrect assumptions as the implementation.

</details>

<details>
<summary>6. What should a database integration test verify?</summary>

**Answer:** Verify constraints, query semantics, transaction boundaries, migrations, and concurrency assumptions using a representative database engine. An in-memory substitute may differ in locking, types, SQL, and null behavior. Use isolated data and reliable cleanup. For race conditions, coordinate concurrent operations explicitly rather than relying on timing luck.

</details>

<details>
<summary>7. What do contract tests add?</summary>

**Answer:** Contract tests check agreement between service providers and consumers on requests, responses, and supported interactions. They can detect incompatible changes without deploying every service together. They do not prove all business behavior or network reliability. Define ownership of the contract and run provider verification against relevant consumer versions.

</details>

<details>
<summary>8. What are property-based and mutation testing?</summary>

**Answer:** Property-based testing generates inputs to check a general invariant, often shrinking failures to a smaller example. Mutation testing changes code in small ways to assess whether tests detect the change. Neither replaces well-chosen examples. A surviving mutation may indicate a weak assertion, unreachable code, or an equivalent behavior that needs interpretation.

```javascript
import test from 'node:test'
import assert from 'node:assert/strict'

function totalCents(unitCents, quantity) {
  if (!Number.isSafeInteger(unitCents) || unitCents < 0 ||
      !Number.isSafeInteger(quantity) || quantity < 1) {
    throw new RangeError('Invalid price or quantity')
  }
  const total = unitCents * quantity
  if (!Number.isSafeInteger(total)) throw new RangeError('Total exceeds supported range')
  return total
}

test('totals preserve integer cents and reject invalid quantities', () => {
  assert.equal(totalCents(125, 3), 375)
  assert.throws(() => totalCents(125, 0), RangeError)
  assert.throws(() => totalCents(Number.MAX_SAFE_INTEGER, 2), RangeError)
})
```

The example assumes nonnegative prices and positive integer quantities; tax, currencies, and discounts need additional explicit rules.

</details>

## Level 3: Reliability and Release Decisions

<details>
<summary>9. How do you handle flaky tests?</summary>

**Answer:** Reproduce with traces, logs, seeds, and environment details. Common causes include shared state, uncontrolled clocks, eventual consistency, unstable selectors, and fixed waits. Wait for observable conditions rather than arbitrary delays. Retries can collect evidence but should not hide persistent instability; quarantine needs an owner and a repair deadline.

</details>

<details>
<summary>10. What does coverage tell you?</summary>

**Answer:** Coverage indicates which code was exercised, not whether outputs were asserted correctly or requirements were complete. Branch coverage can expose untested decisions, but 100 percent coverage can coexist with serious bugs. Combine coverage with risk analysis, negative tests, mutation evidence where useful, and inspection of missing user scenarios.

</details>

<details>
<summary>11. How do performance and resilience tests differ?</summary>

**Answer:** Performance tests measure latency, throughput, and resource use under a defined workload. Resilience tests investigate dependency failures, overload, recovery, and degraded behavior. Use realistic data, arrival rates, warmup, and percentile metrics. Run disruptive tests only in approved environments with explicit limits and stop conditions.

</details>

<details>
<summary>12. How would you prioritize testing before a release?</summary>

**Answer:** Start with changed behavior, high-impact invariants, integration boundaries, and migration or rollback risks. Keep many fast tests near the logic and a smaller set of critical realistic workflows. Include authentication, accessibility, and failure handling when relevant. Report untested risks explicitly rather than treating a passing suite as universal proof.

</details>

## Practice Lab

1. Choose an order workflow and list its correctness, permission, and recovery risks.
2. Write boundary-value unit tests and a real-database test for a uniqueness invariant.
3. Add a browser workflow covering a visible failure and retry, not only success.
4. Introduce a deliberate defect, confirm the relevant test fails, then restore correct behavior.

**Completion check:** Every critical risk has an appropriate observable check, and the suite detects a realistic regression without depending on fixed sleeps.

## Quick Revision

- A useful assertion must discriminate correct from plausible incorrect behavior.
- Test doubles exclude dependencies; they do not prove those dependencies work.
- Contract tests complement, rather than replace, integration tests.
- Coverage measures execution, not correctness.
- Flakiness needs investigation, not unlimited retries.

## References

- [Node.js Test Runner](https://nodejs.org/api/test.html)
- [Playwright Best Practices](https://playwright.dev/docs/best-practices)
- [JUnit User Guide](https://junit.org/junit5/docs/current/user-guide/)
