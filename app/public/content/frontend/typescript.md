# TypeScript Interview Preparation

Interview questions, worked examples, and exercises progressing from everyday types to API design. Examples assume strict type checking, including `strictNullChecks`.

## Level 1: Type-System Fundamentals

<details>
<summary>1. What does TypeScript add to JavaScript?</summary>

**Answer:** TypeScript statically checks JavaScript programs and erases most type syntax when producing JavaScript. Types catch mistakes before execution but do not validate incoming JSON or change JavaScript's runtime behavior. A type assertion is not a conversion or a runtime check.

**Interview tip:** Separate compile-time guarantees from runtime validation. Network responses, environment variables, and user input still need validation.

</details>

<details>
<summary>2. How do any, unknown, and never differ?</summary>

**Answer:** `any` opts out of most checking and can spread unsafety through a program. `unknown` can hold any value, but must be narrowed before use. `never` represents a value that cannot occur, such as the result of a function that always throws or an exhausted union.

```typescript
function messageFrom(value: unknown): string {
  return typeof value === 'string' ? value : 'Unknown error';
}
```

Prefer `unknown` at untrusted boundaries and narrow deliberately.

</details>

<details>
<summary>3. When would you use an interface or a type alias?</summary>

**Answer:** Both describe object shapes and support generic parameters. Interfaces can be reopened through declaration merging and extended. Type aliases can also represent unions, tuples, primitives, and mapped types. Use the project's conventions; neither gives runtime validation or nominal identity by default.

</details>

<details>
<summary>4. What is structural typing?</summary>

**Answer:** Compatibility depends primarily on a value's shape, not its declared name. An object with the required members can satisfy an interface. Fresh object literals receive excess-property checks, but this does not make object types exact. Private or protected class members introduce additional compatibility restrictions.

</details>

## Level 2: Narrowing and Generic APIs

<details>
<summary>5. Why use a discriminated union?</summary>

**Answer:** A shared literal property lets control-flow analysis identify which fields exist in each state. This prevents impossible combinations such as a successful response without data.

```typescript
type Result<Value> =
  | { kind: 'success'; value: Value }
  | { kind: 'failure'; message: string };

function render(result: Result<string>): string {
  switch (result.kind) {
    case 'success': return result.value;
    case 'failure': return result.message;
    default: {
      const unreachable: never = result;
      return unreachable;
    }
  }
}
```

Adding a new variant makes the exhaustiveness check fail until the handler is updated.

</details>

<details>
<summary>6. How do generic constraints preserve useful information?</summary>

**Answer:** Generics express relationships between inputs and outputs. A constraint limits acceptable arguments without discarding their specific types.

```typescript
function property<Value, Key extends keyof Value>(value: Value, key: Key): Value[Key] {
  return value[key];
}

const count = property({ count: 3, label: 'Tasks' }, 'count');
```

Here `count` is inferred as `number`. Returning `unknown` or using `any` would lose that relationship.

</details>

<details>
<summary>7. What do Partial, Pick, Omit, and Record do?</summary>

**Answer:** `Partial<Value>` makes properties optional; `Pick<Value, Keys>` selects properties; `Omit<Value, Keys>` excludes them; `Record<Keys, Value>` maps a key set to a value type. They transform types only. Do not treat `Omit<User, 'password'>` as runtime removal of the password field before serialization.

</details>

<details>
<summary>8. How do satisfies, as const, and readonly differ?</summary>

**Answer:** `satisfies` checks compatibility without replacing the expression's inferred type with the target type. `as const` preserves literal types and gives object properties and tuple elements readonly types. `readonly` restricts mutation through that typed reference. None deep-freezes an object at runtime; aliases can still expose mutable state.

</details>

## Level 3: Production Boundaries

<details>
<summary>9. How should an API response be typed safely?</summary>

**Answer:** Receive external data as `unknown`, validate its runtime structure with a schema library or deliberate checks, and only then return a domain type. Writing `response.json() as User` merely asks the compiler to trust the programmer. Handle non-success HTTP statuses, missing fields, and version changes separately.

</details>

<details>
<summary>10. What are common asynchronous typing mistakes?</summary>

**Answer:** An `async` function returns a `Promise`, even when it returns a plain value. `Array.map` with an async callback produces an array of promises; use `Promise.all` when concurrent completion is intended. Rejections are not encoded in `Promise<Value>`'s value parameter, so handle failures explicitly. Limit concurrency for large collections.

</details>

<details>
<summary>11. How should nullability and indexed access be handled?</summary>

**Answer:** With strict null checks, narrow nullable values before access instead of adding non-null assertions. Consider `noUncheckedIndexedAccess` to expose possibly absent array and dictionary entries, and `exactOptionalPropertyTypes` to distinguish an omitted property from an explicitly assigned `undefined` where relevant. These options require deliberate handling, not blanket assertions.

</details>

<details>
<summary>12. What belongs in TypeScript testing?</summary>

**Answer:** Run a compiler check such as `tsc --noEmit` alongside runtime tests. Test parsing, business logic, and failure handling at runtime; test public type contracts with type assertions or a dedicated type-testing tool. A transpiler that strips type syntax is not necessarily a type checker.

</details>

## Practice Lab

1. Model a request as idle, loading, success, and failure states using a discriminated union.
2. Write a parser from `unknown` to a user with a nonempty ID and display name. Reject malformed input.
3. Implement a typed property selector without `any` or unchecked assertions.
4. Add a new request state and demonstrate the compiler detecting an unhandled branch.

**Completion check:** Invalid JSON fails at runtime, missing union cases fail compilation, and async failures have a tested UI or service outcome.

## Quick Revision

- Types are erased; assertions do not validate data.
- Prefer `unknown` to `any` at external boundaries.
- Generics preserve relationships; constraints describe required capabilities.
- Discriminated unions model mutually exclusive states.
- Runtime tests and compiler checks answer different questions.

## References

- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)
- [TSConfig Reference](https://www.typescriptlang.org/tsconfig/)