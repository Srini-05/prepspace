# Low-Level Design Interview Preparation

Questions on translating requirements into classes, interfaces, state transitions, and tests. Low-level design complements system design: focus on behavior and invariants inside components rather than service topology alone.

## Level 1: Modeling Behavior

<details>
<summary>1. How do you begin a low-level design interview?</summary>

**Answer:** Clarify use cases, actors, boundaries, and constraints before naming classes. Work through a normal scenario and a failure scenario. Identify state that must remain valid, operations that change it, and ownership of those operations. State assumptions explicitly and keep optional features outside the initial design.

</details>

<details>
<summary>2. What is an invariant, and why should an object protect it?</summary>

**Answer:** An invariant is a condition that must hold at defined boundaries, such as a reservation having a positive quantity or a closed ticket never accepting another payment. Constructors, factories, and behavioral methods can enforce these conditions. Exposing mutable fields lets callers bypass the rules and creates scattered validation.

</details>

<details>
<summary>3. How do entities and value objects differ?</summary>

**Answer:** An entity has identity that persists as its attributes change. A value object is defined by its values and is often immutable, such as a date range or monetary amount. Define equality deliberately. Represent money using exact decimal or integer minor units with currency and explicit rounding rules, not binary floating-point arithmetic by default.

</details>

<details>
<summary>4. When is composition preferable to inheritance?</summary>

**Answer:** Composition delegates behavior to collaborators and avoids binding unrelated variations into a hierarchy. Inheritance is appropriate when a subtype genuinely satisfies the parent's behavioral contract. Reusing implementation alone is a weak reason to introduce inheritance. Test substitutability, especially around exceptions, mutability, and preconditions.

</details>

## Level 2: Principles and Patterns

<details>
<summary>5. What does SOLID mean in practical design?</summary>

**Answer:** Separate reasons to change, extend stable behavior through suitable interfaces, preserve substitutability, avoid forcing clients to depend on unrelated operations, and depend on useful abstractions rather than volatile details. SOLID is a set of design heuristics, not a requirement to create an interface for every class or a factory for every constructor.

</details>

<details>
<summary>6. When would you use Strategy, Factory, or Observer?</summary>

**Answer:** Strategy selects among interchangeable policies, such as pricing rules. A factory centralizes meaningful construction choices and validation. Observer distributes notifications to subscribers, introducing ordering, failure, and lifecycle questions. Use a pattern when it resolves a concrete variation or coupling problem, not to maximize pattern count.

</details>

<details>
<summary>7. How can a state machine simplify behavior?</summary>

**Answer:** Explicit states and allowed transitions replace scattered boolean combinations. An order might move from CREATED to PAID to SHIPPED, with cancellation permitted only from defined states. Keep transition validation close to state mutation, and define duplicate-event behavior. A state diagram should specify failure and terminal states as well as the happy path.

```text
CREATED --payment accepted--> PAID --dispatch--> SHIPPED
   |                           |
   +--cancel--> CANCELLED      +--refund policy--> REFUNDED
```

Real refund and shipment rules may require additional states; clarify them before implementation.

</details>

<details>
<summary>8. What is dependency inversion in a testable design?</summary>

**Answer:** Domain behavior depends on a narrow capability, such as a clock or payment gateway, rather than constructing infrastructure clients itself. Inject concrete implementations at a composition boundary. Avoid interfaces that simply mirror an entire vendor SDK; define operations in terms of the application's needs and failure model.

```java
interface FeePolicy {
    long feeInCents(int parkedMinutes);
}

final class ParkingQuote {
    private final FeePolicy fees;

    ParkingQuote(FeePolicy fees) {
        this.fees = fees;
    }

    long quote(int parkedMinutes) {
        if (parkedMinutes < 0) {
            throw new IllegalArgumentException("Duration must not be negative");
        }
        return fees.feeInCents(parkedMinutes);
    }
}
```

The policy contract must also define rounding, maximum durations, and valid return values.

</details>

## Level 3: Correctness Under Real Conditions

<details>
<summary>9. How do you prevent double booking?</summary>

**Answer:** Define the invariant and enforce it at the authoritative state boundary, often with a unique database constraint, conditional write, or locked transaction. An in-memory synchronized method protects only callers sharing that instance, not multiple processes. Treat hold expiry, payment completion, cancellation, and retries as explicit transitions.

</details>

<details>
<summary>10. How should errors and side effects be modeled?</summary>

**Answer:** Distinguish expected domain outcomes, such as no available slot, from infrastructure failures, such as a database timeout. Do not claim a completed operation until its required state is committed. A database write and remote message send are not automatically atomic; use an outbox or another deliberate coordination mechanism when needed.

</details>

<details>
<summary>11. What should a class diagram communicate?</summary>

**Answer:** Show responsibilities, important relationships, multiplicity, ownership, and the methods that enforce behavior. Complement it with a sequence diagram or walkthrough for a key use case. A diagram with many nouns but no allocation, concurrency, or failure behavior is not a complete design. Keep data-access and presentation concerns outside the core model where practical.

</details>

<details>
<summary>12. How do you test a design rather than implementation details?</summary>

**Answer:** Test observable contracts, invariant violations, state transitions, and boundary conditions. Inject a controllable clock for expiry, fake external ports for domain tests, and use integration tests for persistence guarantees. Include concurrent duplicate operations when exclusivity matters. Avoid tests that only assert private method calls or freeze a class's internal structure.

</details>

## Practice Lab

1. Design a parking lot with vehicle categories, slot allocation, tickets, fees, and payment outcomes.
2. Write invariants before drawing classes: one active ticket per occupied slot, valid exit state, and nonnegative duration.
3. Walk through simultaneous arrivals, duplicate payment callbacks, and a failed persistence operation.
4. Add a new fee policy without modifying allocation behavior and demonstrate it with contract tests.

**Completion check:** Explain every abstraction's purpose and show how the design protects its invariants under concurrent requests and failures.

## Quick Revision

- Begin with use cases and invariants, not pattern names.
- Entities have identity; value objects have value equality.
- Composition isolates independent variations.
- Local locks do not coordinate multiple application instances.
- Test behavioral contracts and authoritative persistence guarantees.

## References

- [Refactoring Catalog](https://refactoring.com/catalog/)
- [Patterns of Enterprise Application Architecture](https://martinfowler.com/eaaCatalog/)