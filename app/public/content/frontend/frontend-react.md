# ⚛️ Frontend React Interview Questions

> **80+ Questions** | Organized by topic | Open/Close Accordions | Comparison Tables | Clear Explanations

---

## 📋 Table of Contents

- [Short Forms & Glossary](#-short-forms--glossary)
- [JavaScript Fundamentals](#-javascript-fundamentals)
- [React Basics](#-react-basics)
- [React Hooks](#-react-hooks)
- [State & Props](#-state--props)
- [State Management](#-state-management)
- [Component Architecture](#-component-architecture)
- [React Router & Navigation](#-react-router--navigation)
- [API Integration](#-api-integration)
- [Form Handling](#-form-handling)
- [Performance Optimization](#-performance-optimization)
- [Authentication & Security](#-authentication--security)
- [Testing in React](#-testing-in-react)
- [Advanced React Concepts](#-advanced-react-concepts)
- [CSS & Styling](#-css--styling)
- [Bonus Questions](#-bonus-questions)
- [Quick Comparison Tables Reference](#-quick-comparison-tables-reference)

---

## 📖 Short Forms & Glossary

<details>
<summary><b>Common Frontend Short Forms & What They Mean</b></summary>

| Short Form | Full Form | What It Is |
|-----------|-----------|------------|
| **DOM** | Document Object Model | Tree representation of HTML elements in the browser |
| **BOM** | Browser Object Model | Browser APIs — window, navigator, location, history |
| **HTML** | HyperText Markup Language | Language to structure web content |
| **CSS** | Cascading Style Sheets | Language to style and layout web content |
| **JS** | JavaScript | Programming language of the web |
| **JSX** | JavaScript XML | React's syntax — write HTML inside JavaScript |
| **JSON** | JavaScript Object Notation | Lightweight data format for APIs |
| **AJAX** | Asynchronous JavaScript And XML | Fetch data without reloading page |
| **SPA** | Single Page Application | App that loads once, updates dynamically |
| **MPA** | Multi Page Application | Traditional app — full reload on each navigation |
| **UI** | User Interface | What the user sees and interacts with |
| **UX** | User Experience | How the user feels using the product |
| **SSR** | Server-Side Rendering | HTML rendered on server, sent to browser |
| **CSR** | Client-Side Rendering | HTML rendered in browser via JavaScript |
| **SSG** | Static Site Generation | HTML generated at build time |
| **API** | Application Programming Interface | Contract for how two apps communicate |
| **REST** | Representational State Transfer | API design style using HTTP methods |
| **JWT** | JSON Web Token | Token-based authentication format |
| **CDN** | Content Delivery Network | Servers distributed globally to serve assets faster |
| **HMR** | Hot Module Replacement | Live reload during development without full refresh |

</details>

---

## 🟨 JavaScript Fundamentals

<details>
<summary><b>Q1. What is the difference between var, let, and const?</b></summary>

> **One-Line Answer:** `var` is function-scoped and hoisted. `let` is block-scoped and reassignable. `const` is block-scoped and cannot be reassigned. Prefer `const` by default, `let` when you need to reassign.

### Comparison Table

| Feature | var | let | const |
|---------|-----|-----|-------|
| Scope | Function scope | Block scope | Block scope |
| Hoisting | ✅ Hoisted (undefined) | ✅ Hoisted (TDZ — can't use before declare) | ✅ Hoisted (TDZ) |
| Reassignable | ✅ Yes | ✅ Yes | ❌ No |
| Redeclarable | ✅ Yes | ❌ No | ❌ No |
| Global object property | ✅ Yes (window.x) | ❌ No | ❌ No |

### Code Example

```javascript
// var — function scoped (leaks out of blocks)
function test() {
  if (true) {
    var x = 10;
  }
  console.log(x);  // 10 — var leaks out of if block!
}

// let — block scoped
function test2() {
  if (true) {
    let y = 20;
  }
  console.log(y);  // ReferenceError — y is not accessible here
}

// const — block scoped, can't reassign reference
const user = { name: "Alice" };
user.name = "Bob";     // ✅ OK — modifying object property
user = { name: "Bob" }; // ❌ Error — can't reassign the reference
```

> 💡 **Interview Tip:** Use `const` by default. Switch to `let` only when you need to reassign. Never use `var` in modern code — its function scope causes bugs.

</details>

---

<details>
<summary><b>Q2. What is the difference between == and === in JavaScript?</b></summary>

> **One-Line Answer:** `==` checks value equality with type coercion (converts types). `===` checks both value AND type — no coercion. Always use `===`.

### Code Example

```javascript
// == (loose equality — coerces types)
console.log(0 == false);   // true  ← 0 converted to false
console.log("" == false);  // true  ← "" converted to false
console.log(null == undefined); // true ← special case
console.log(1 == "1");     // true  ← "1" converted to 1

// === (strict equality — no coercion)
console.log(0 === false);  // false ← different types
console.log(1 === "1");    // false ← number vs string
console.log(null === undefined); // false
console.log("abc" === "abc");    // true
```

> 💡 **Interview Tip:** Always use `===` in production code. The only exception: `null == undefined` is a common pattern to check for both null and undefined in one check.

</details>

---

<details>
<summary><b>Q3. What is hoisting in JavaScript?</b></summary>

> **One-Line Answer:** Hoisting moves variable and function declarations to the top of their scope during compilation — so you can use functions before declaring them, but variables declared with `var` are undefined until assigned.

### Code Example

```javascript
// Function hoisting — works!
greet();  // "Hello!" — function is hoisted fully
function greet() { console.log("Hello!"); }

// var hoisting — declaration hoisted, but NOT the value
console.log(name);  // undefined (not an error!)
var name = "Alice";
console.log(name);  // "Alice"

// let/const — hoisted but in Temporal Dead Zone (TDZ)
console.log(age);   // ReferenceError — can't access before initialization
let age = 25;

// Arrow functions — NOT hoisted (they're variables)
sayHi();            // TypeError — sayHi is not a function
const sayHi = () => console.log("Hi!");
```

### What Actually Happens (Behind the Scenes)

```javascript
// What you write:
console.log(x);
var x = 5;

// What JavaScript sees:
var x;           // declaration hoisted to top
console.log(x);  // undefined
x = 5;           // assignment stays here
```

> 💡 **Interview Tip:** Only `var` and `function` declarations are hoisted usefully. `let` and `const` are also hoisted but in the "Temporal Dead Zone" — accessing them before declaration throws ReferenceError.

</details>

---

<details>
<summary><b>Q4. What is closure in JavaScript?</b></summary>

> **One-Line Answer:** A closure in JavaScript is when a function remembers and can access variables from its outer scope even after the outer function has finished executing. It is mainly used to maintain state and achieve data encapsulation..

### Code Example

```javascript
// Simple closure
function createCounter() {
  let count = 0;  // this variable lives in the closure

  return function() {
    count++;
    return count;
  };
}

const counter = createCounter();
console.log(counter());  // 1
console.log(counter());  // 2
console.log(counter());  // 3
// count is NOT accessible from outside — it's private!

// Practical closure — factory function
function multiply(x) {
  return function(y) {
    return x * y;  // x is closed over from outer scope
  };
}

const double = multiply(2);
const triple = multiply(3);
console.log(double(5));  // 10
console.log(triple(5));  // 15
```

### Real-World Uses of Closures

| Use Case | Example |
|----------|---------|
| Data privacy | Private variables in modules |
| Memoization | Cache function results |
| Event handlers | Remember which item was clicked |
| Partial application | Factory functions like `multiply(2)` |

> 💡 **Interview Tip:** React hooks like `useState` and `useEffect` heavily rely on closures. The callback inside `useEffect` closes over the state variables at the time it was created — this causes the "stale closure" bug.

</details>

---

<details>
<summary><b>Q5. What is the difference between synchronous and asynchronous JavaScript?</b></summary>

> **One-Line Answer:** Synchronous code runs line-by-line, blocking the next line until current one finishes. Asynchronous code starts a task and moves on, handling the result later via callbacks, promises, or async/await.

### Code Example

```javascript
// Synchronous — blocks
console.log("1");
console.log("2");
console.log("3");
// Output: 1, 2, 3 (in order)

// Asynchronous — non-blocking
console.log("1");
setTimeout(() => console.log("2"), 1000);
console.log("3");
// Output: 1, 3, 2 (2 comes after 1 second!)

// Promise-based
fetch("/api/users")
  .then(res => res.json())
  .then(data => console.log(data))
  .catch(err => console.error(err));

// Async/Await (cleaner syntax for same thing)
async function getUsers() {
  try {
    const res  = await fetch("/api/users");
    const data = await res.json();
    console.log(data);
  } catch (err) {
    console.error(err);
  }
}
```

### Callback → Promise → Async/Await Evolution

```javascript
// 1. Callback (old way — leads to callback hell)
getUser(id, function(user) {
  getPosts(user.id, function(posts) {
    getComments(posts[0].id, function(comments) {
      // deeply nested — callback hell!
    });
  });
});

// 2. Promise (better — chainable)
getUser(id)
  .then(user => getPosts(user.id))
  .then(posts => getComments(posts[0].id))
  .then(comments => console.log(comments))
  .catch(err => console.error(err));

// 3. Async/Await (cleanest — reads like sync code)
async function loadData(id) {
  const user     = await getUser(id);
  const posts    = await getPosts(user.id);
  const comments = await getComments(posts[0].id);
  return comments;
}
```

> 💡 **Interview Tip:** JavaScript is single-threaded. Async operations are handled by the browser's Web APIs (fetch, setTimeout) and the Event Loop — which moves completed callbacks to the call stack when it's empty.

</details>

---

<details>
<summary><b>Q6. What is the difference between null and undefined?</b></summary>

> **One-Line Answer:** `undefined` means a variable was declared but not assigned a value. `null` is an intentional assignment meaning "no value" — you set it explicitly to signal emptiness.

### Comparison Table

| Feature | undefined | null |
|---------|-----------|------|
| Set by | JavaScript automatically | Developer intentionally |
| Type | `typeof undefined === "undefined"` | `typeof null === "object"` (JS bug!) |
| Loose equality | `null == undefined` is **true** | `null == undefined` is **true** |
| Strict equality | `null === undefined` is **false** | `null === undefined` is **false** |
| Use case | Uninitialized variable | Intentionally empty value |

```javascript
let x;           // undefined — declared but not assigned
let y = null;    // null — intentionally empty

function greet(name) {
  console.log(name);  // undefined if called as greet()
}

// Common pattern — check for both
if (value == null) { /* covers both null and undefined */ }
if (value === null) { /* only null */ }
if (value === undefined) { /* only undefined */ }
```

> 💡 **Interview Tip:** `typeof null === "object"` is a famous JavaScript bug that was never fixed to avoid breaking existing code. Always remember this quirk!

</details>

---

<details>
<summary><b>Q7. What are arrow functions? How are they different from regular functions?</b></summary>

> **One-Line Answer:** Arrow functions are a shorter syntax for functions. Key difference: they don't have their own `this` — they inherit `this` from the surrounding lexical scope.

### Comparison Table

| Feature | Regular Function | Arrow Function |
|---------|----------------|---------------|
| Syntax | `function fn() {}` | `const fn = () => {}` |
| `this` binding | Own `this` (dynamic) | Inherited from outer scope (lexical) |
| `arguments` object | ✅ Yes | ❌ No |
| Constructor | ✅ Can use `new` | ❌ Cannot use `new` |
| Hoisting | ✅ Yes (function declaration) | ❌ No |
| Best for | Methods, constructors | Callbacks, array methods |

### Code Example

```javascript
// Regular function — 'this' changes based on how it's called
const obj = {
  name: "Alice",
  greet: function() {
    console.log(this.name);  // "Alice" ✅
  },
  greetLater: function() {
    setTimeout(function() {
      console.log(this.name);  // undefined ❌ (this = window/global!)
    }, 1000);
  }
};

// Arrow function — 'this' from outer scope
const obj2 = {
  name: "Alice",
  greetLater: function() {
    setTimeout(() => {
      console.log(this.name);  // "Alice" ✅ (inherited from greetLater)
    }, 1000);
  }
};
```

> 💡 **Interview Tip:** Arrow functions are perfect for React event handlers and array methods (map, filter, reduce). But never use arrow functions as object methods or constructors — they'll break `this`.

</details>

---

## ⚛️ React Basics

<details>
<summary><b>Q8. What is React? Why use it?</b></summary>

> **One-Line Answer:** React is a JavaScript library by Meta for building interactive UIs using a component-based architecture and a virtual DOM — making UI updates fast and predictable.

### Key Concepts

| Concept | What It Means |
|---------|--------------|
| **Component-based** | UI split into reusable, independent pieces |
| **Virtual DOM** | In-memory copy of real DOM — React diffs changes and updates only what changed |
| **Declarative** | Describe WHAT the UI should look like, React handles HOW to update it |
| **Unidirectional data flow** | Data flows from parent → child (one direction) |

### Why React Over Plain JavaScript?

```javascript
// Plain JS — manually update the DOM
const count = 0;
document.getElementById("counter").innerText = count;
document.getElementById("btn").addEventListener("click", () => {
  count++;
  document.getElementById("counter").innerText = count;  // manual!
});

// React — describe the UI, React handles updates
function Counter() {
  const [count, setCount] = useState(0);
  return (
    <div>
      <p>{count}</p>
      <button onClick={() => setCount(count + 1)}>Add</button>
    </div>
  );
}
```

> 💡 **Interview Tip:** React is a **library**, not a framework. It only handles the View layer. For routing you need React Router, for state management you need Redux/Zustand, etc.

</details>

---

<details>
<summary><b>Q9. What is JSX?</b></summary>

> **One-Line Answer:** JSX (JavaScript XML) is React's syntax extension that lets you write HTML-like code inside JavaScript. The browser doesn't understand JSX — Babel compiles it to `React.createElement()` calls.

### JSX vs Plain JS

```javascript
// JSX (what you write)
const element = <h1 className="title">Hello, {name}!</h1>;

// What Babel compiles it to
const element = React.createElement(
  "h1",
  { className: "title" },
  "Hello, " + name + "!"
);
```

### JSX Rules

```javascript
// 1. Return ONE root element
// ❌ Wrong
return (
  <h1>Title</h1>
  <p>Paragraph</p>
);

// ✅ Correct — wrap in div or Fragment
return (
  <>
    <h1>Title</h1>
    <p>Paragraph</p>
  </>
);

// 2. Use className instead of class
<div className="card">  {/* not class="card" */}

// 3. Self-close empty elements
<input type="text" />  {/* not <input type="text"> */}
<br />

// 4. Expressions in curly braces
<p>{user.name}</p>
<p>{isLoggedIn ? "Welcome!" : "Please login"}</p>
<ul>{items.map(item => <li key={item.id}>{item.name}</li>)}</ul>
```

> 💡 **Interview Tip:** JSX is optional — you can write React without it. But JSX is far more readable and practically universal in React codebases. The `key` prop in lists is required for React to track which items changed.

</details>

---

<details>
<summary><b>Q10. What is the Virtual DOM? How does React use it?</b></summary>

> **One-Line Answer:** The Virtual DOM is a lightweight in-memory copy of the real DOM. When state changes, React compares the new Virtual DOM with the old one (diffing), and only updates the parts of the real DOM that actually changed (reconciliation).

### How It Works — Step by Step

```
1. Initial Render:
   State changes → React creates Virtual DOM tree

2. State Update:
   New state → React creates NEW Virtual DOM tree

3. Diffing:
   React compares old Virtual DOM vs new Virtual DOM

4. Reconciliation:
   React finds the MINIMUM changes needed

5. Real DOM Update:
   Only the changed elements are updated in the real browser DOM
```

### Virtual DOM vs Real DOM

| Feature | Real DOM | Virtual DOM |
|---------|---------|------------|
| Location | Browser | JavaScript memory |
| Speed | Slow to update | Fast to update |
| Direct manipulation | ✅ Possible | ❌ Not possible directly |
| Re-render | Updates entire tree | Only updates diff |
| Managed by | Browser | React |

> 💡 **Interview Tip:** The Virtual DOM is React's performance trick — updating real DOM is expensive. By batching changes and only updating what's necessary, React keeps UIs smooth.

</details>

---

<details>
<summary><b>Q11. What is a React component? What are the types?</b></summary>

> **One-Line Answer:** A React component is a reusable, independent piece of UI — it accepts inputs (props) and returns JSX. There are two types: Function Components (modern) and Class Components (legacy).

### Function Component (Modern — Preferred)

```javascript
// Simple function component
function Welcome({ name }) {
  return <h1>Hello, {name}!</h1>;
}

// Arrow function style
const Welcome = ({ name }) => <h1>Hello, {name}!</h1>;

// Usage
<Welcome name="Alice" />
```

### Class Component (Legacy)

```javascript
import { Component } from "react";

class Welcome extends Component {
  render() {
    return <h1>Hello, {this.props.name}!</h1>;
  }
}
```

### Function vs Class Components

| Feature | Function Component | Class Component |
|---------|-------------------|----------------|
| Syntax | Simple function | ES6 Class extending Component |
| State | `useState` hook | `this.state` |
| Lifecycle | `useEffect` hook | lifecycle methods |
| `this` keyword | ❌ Not needed | ✅ Required |
| Performance | Slightly better | Slightly heavier |
| Recommended? | ✅ Yes (modern) | ❌ Legacy (avoid for new code) |

> 💡 **Interview Tip:** In 2024+, always use function components with hooks. Class components still exist in old codebases — be ready to read them. React 16.8 introduced hooks which made function components equally powerful.

</details>

---

<details>
<summary><b>Q12. What is the React component lifecycle?</b></summary>

> **One-Line Answer:** Every React component goes through three phases: Mounting (created and inserted into DOM), Updating (re-renders when state/props change), and Unmounting (removed from DOM).

### Lifecycle Phases

| Phase | When | Function Component (hooks) | Class Component |
|-------|------|---------------------------|-----------------|
| **Mounting** | Component appears | `useEffect(() => {}, [])` | `componentDidMount()` |
| **Updating** | State/props change | `useEffect(() => {}, [dep])` | `componentDidUpdate()` |
| **Unmounting** | Component removed | `useEffect(() => { return cleanup }, [])` | `componentWillUnmount()` |

### useEffect covers all lifecycle phases

```javascript
function MyComponent() {
  useEffect(() => {
    // MOUNTING — runs once after first render
    console.log("Component mounted");
    const subscription = subscribe();

    // UNMOUNTING — cleanup function runs when component is removed
    return () => {
      console.log("Component unmounted");
      subscription.unsubscribe();
    };
  }, []);  // empty array = run only on mount/unmount

  useEffect(() => {
    // UPDATING — runs every time 'count' changes
    console.log("Count updated:", count);
  }, [count]);  // dependency array
}
```

> 💡 **Interview Tip:** The cleanup function returned from `useEffect` is crucial — forgetting it causes memory leaks (like forgotten event listeners, timers, subscriptions).

</details>

---

## 🪝 React Hooks

<details>
<summary><b>Q13. What is useState? How does it work?</b></summary>

> **One-Line Answer:** 'useState' is a React hook used to manage state in functional components. It returns the current state and a function to update it. Whenever the state is updated, the component re-renders to reflect the changes..

### Code Example

```javascript
import { useState } from "react";

function Counter() {
  const [count, setCount] = useState(0);  // initial value = 0

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <button onClick={() => setCount(0)}>Reset</button>
    </div>
  );
}
```

### Important Rules

```javascript
// 1. State updates are ASYNCHRONOUS
setCount(count + 1);
console.log(count);  // still old value!

// 2. For updates based on previous value, use functional form
setCount(prev => prev + 1);  // always safe — uses latest value

// 3. Objects and arrays — must create NEW references
const [user, setUser] = useState({ name: "Alice", age: 25 });

// ❌ Wrong — mutating directly won't trigger re-render
user.name = "Bob";
setUser(user);

// ✅ Correct — spread to create new object
setUser({ ...user, name: "Bob" });

// ✅ For arrays
const [items, setItems] = useState([]);
setItems([...items, newItem]);          // add item
setItems(items.filter(i => i.id !== id)); // remove item
```

> 💡 **Interview Tip:** React doesn't do a deep comparison — it uses `Object.is()`. If you pass the same reference, it won't re-render. Always return a NEW object/array from state updates.

</details>

---

<details>
<summary><b>Q14. What is useEffect? How and when does it run?</b></summary>

> **One-Line Answer:** useEffect is a React hook used to handle side effects like API calls, subscriptions, or DOM updates in functional components. It runs after the component renders.

### Dependency Array Controls Execution

```javascript
// 1. No dependency array — runs after EVERY render
useEffect(() => {
  console.log("Runs after every render");
});

// 2. Empty array — runs ONCE on mount only
useEffect(() => {
  console.log("Runs only on mount");
}, []);

// 3. With dependencies — runs when dependency changes
useEffect(() => {
  console.log("userId changed:", userId);
  fetchUser(userId);
}, [userId]);  // re-runs whenever userId changes

// 4. Cleanup — runs before next effect AND on unmount
useEffect(() => {
  const timer = setInterval(() => tick(), 1000);

  return () => {
    clearInterval(timer);  // cleanup — prevents memory leaks
  };
}, []);
```

### Common useEffect Patterns

```javascript
// Pattern 1: Fetch data on mount
useEffect(() => {
  async function load() {
    const data = await fetchData();
    setData(data);
  }
  load();
}, []);

// Pattern 2: Event listener
useEffect(() => {
  window.addEventListener("resize", handleResize);
  return () => window.removeEventListener("resize", handleResize);
}, []);

// Pattern 3: Sync with external store
useEffect(() => {
  const unsubscribe = store.subscribe(() => setState(store.getState()));
  return unsubscribe;
}, []);
```

> 💡 **Interview Tip:** Never make `useEffect` callback itself `async` — use an inner async function instead. Async functions return Promises, but useEffect expects either nothing or a cleanup function.

</details>

---

<details>
<summary><b>Q15. What is useContext? How does it solve prop drilling?</b></summary>

> **One-Line Answer:** useContext is a React hook used to access data from a context, allowing you to share state across components without passing props manually at every level.

### The Problem — Prop Drilling

```javascript
// Without Context — prop drilling nightmare
function App() {
  const [theme, setTheme] = useState("dark");
  return <Page theme={theme} setTheme={setTheme} />;
}
function Page({ theme, setTheme }) {
  return <Header theme={theme} setTheme={setTheme} />;  // just passing through!
}
function Header({ theme, setTheme }) {
  return <Button theme={theme} setTheme={setTheme} />;  // still passing through!
}
function Button({ theme, setTheme }) {
  return <button style={{ background: theme }}>Toggle</button>;  // finally used!
}
```

### The Solution — useContext

```javascript
import { createContext, useContext, useState } from "react";

// 1. Create the context
const ThemeContext = createContext("light");  // default value

// 2. Provide it at the top
function App() {
  const [theme, setTheme] = useState("dark");
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <Page />  {/* no props needed! */}
    </ThemeContext.Provider>
  );
}

// 3. Consume anywhere in the tree
function Button() {
  const { theme, setTheme } = useContext(ThemeContext);
  return (
    <button
      style={{ background: theme === "dark" ? "#333" : "#fff" }}
      onClick={() => setTheme(t => t === "dark" ? "light" : "dark")}
    >
      Toggle Theme
    </button>
  );
}
```

> 💡 **Interview Tip:** Context re-renders ALL consumers when value changes. For frequently changing data (like a counter), use Redux or Zustand instead. Context is best for slowly-changing global data like theme, locale, or auth user.

</details>

---

<details>
<summary><b>Q16. What is useRef? What are its uses?</b></summary>

> **One-Line Answer:** `useRef` returns a mutable ref object that persists across renders. Its `.current` value can hold a DOM element reference OR any mutable value — changing it does NOT trigger a re-render.

### Two Main Uses

```javascript
import { useRef, useEffect } from "react";

// USE 1: Access DOM elements directly
function InputFocus() {
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();  // focus input on mount
  }, []);

  return <input ref={inputRef} placeholder="Auto-focused!" />;
}

// USE 2: Store mutable value without re-rendering
function Timer() {
  const [count, setCount]  = useState(0);
  const intervalRef = useRef(null);  // holds timer ID — changes won't re-render

  function start() {
    intervalRef.current = setInterval(() => setCount(c => c + 1), 1000);
  }

  function stop() {
    clearInterval(intervalRef.current);  // clean up timer
  }

  return (
    <div>
      <p>{count}</p>
      <button onClick={start}>Start</button>
      <button onClick={stop}>Stop</button>
    </div>
  );
}
```

### useRef vs useState

| Feature | useRef | useState |
|---------|--------|---------|
| Triggers re-render | ❌ No | ✅ Yes |
| Persists across renders | ✅ Yes | ✅ Yes |
| Access DOM | ✅ Yes (primary use) | ❌ No |
| Mutable | ✅ Directly mutate .current | ❌ Must use setter |

> 💡 **Interview Tip:** Classic useRef uses: storing previous state value, managing focus/scroll, holding timers/intervals, and keeping track of whether component is mounted.

</details>

---

<details>
<summary><b>Q17. What is useMemo? When to use it?</b></summary>

> **One-Line Answer:** `useMemo` caches the result of an expensive calculation and only recalculates when its dependencies change — preventing unnecessary heavy computations on every render.

### Code Example

```javascript
import { useMemo, useState } from "react";

function ProductList({ products, filterText }) {
  // Without useMemo: filterProducts() runs on EVERY render — expensive!
  // const filtered = filterProducts(products, filterText);

  // With useMemo: only recalculates when products or filterText changes
  const filtered = useMemo(() => {
    console.log("Filtering products..."); // see when it runs
    return products.filter(p =>
      p.name.toLowerCase().includes(filterText.toLowerCase())
    );
  }, [products, filterText]);  // dependencies

  return <ul>{filtered.map(p => <li key={p.id}>{p.name}</li>)}</ul>;
}
```

### When to Use useMemo?

✅ Use useMemo when:
- Computation is genuinely expensive (sorting thousands of items, complex math)
- The same computation runs many times with the same input

❌ Don't use useMemo when:
- The computation is simple (adding two numbers)
- You're "premature optimizing" — measure first!

> 💡 **Interview Tip:** Don't overuse `useMemo`. It has its own overhead (memory + comparison on every render). Only use it when you've measured and confirmed a performance problem.

</details>

---

<details>
<summary><b>Q18. What is useCallback? How is it different from useMemo?</b></summary>

> **One-Line Answer:** `useCallback` caches a function itself between renders (not its result). Use it when passing functions to child components wrapped in `React.memo` to prevent unnecessary re-renders.

### useMemo vs useCallback

| | useMemo | useCallback |
|-|---------|------------|
| Caches | Return **value** of a function | The **function** itself |
| Returns | Any value | A function |
| Use when | Expensive computations | Stable function references for children |
| Equivalent | `useMemo(() => fn(), deps)` | `useCallback(fn, deps)` |

```javascript
// They're equivalent:
const fn = useCallback(() => doSomething(a, b), [a, b]);
const fn = useMemo(() => () => doSomething(a, b), [a, b]);
```

### Code Example

```javascript
import { useState, useCallback, memo } from "react";

// Child wrapped in React.memo — only re-renders if props change
const Button = memo(({ onClick, label }) => {
  console.log("Button rendered:", label);
  return <button onClick={onClick}>{label}</button>;
});

function Parent() {
  const [count, setCount] = useState(0);
  const [text, setText]   = useState("");

  // Without useCallback: new function reference every render → Button re-renders!
  // const handleClick = () => setCount(c => c + 1);

  // With useCallback: same reference unless deps change → Button stays stable
  const handleClick = useCallback(() => {
    setCount(c => c + 1);
  }, []);  // empty deps — function never changes

  return (
    <div>
      <input value={text} onChange={e => setText(e.target.value)} />
      <p>Count: {count}</p>
      <Button onClick={handleClick} label="Increment" />
    </div>
  );
}
```

> 💡 **Interview Tip:** `useCallback` is only useful when used together with `React.memo`. Without `React.memo` on the child, caching the function reference does nothing useful.

</details>

---

<details>
<summary><b>Q19. What is useReducer? When to use it over useState?</b></summary>

> **One-Line Answer:** `useReducer` manages complex state transitions using a reducer function (like Redux). Prefer it over `useState` when state logic is complex or the next state depends on the previous state in non-trivial ways.

### Code Example

```javascript
import { useReducer } from "react";

// 1. Define initial state
const initialState = { count: 0, step: 1 };

// 2. Define reducer — pure function (state, action) → newState
function reducer(state, action) {
  switch (action.type) {
    case "increment":
      return { ...state, count: state.count + state.step };
    case "decrement":
      return { ...state, count: state.count - state.step };
    case "reset":
      return initialState;
    case "setStep":
      return { ...state, step: action.payload };
    default:
      throw new Error("Unknown action: " + action.type);
  }
}

// 3. Use in component
function Counter() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div>
      <p>Count: {state.count} (step: {state.step})</p>
      <button onClick={() => dispatch({ type: "increment" })}>+</button>
      <button onClick={() => dispatch({ type: "decrement" })}>-</button>
      <button onClick={() => dispatch({ type: "reset" })}>Reset</button>
      <input
        type="number"
        value={state.step}
        onChange={e => dispatch({ type: "setStep", payload: Number(e.target.value) })}
      />
    </div>
  );
}
```

### useState vs useReducer

| Scenario | useState | useReducer |
|---------|---------|-----------|
| Simple values | ✅ Preferred | Overkill |
| Multiple related values | OK | ✅ Preferred |
| Complex transition logic | Gets messy | ✅ Preferred |
| Testing state logic | Harder | ✅ Easy (pure function) |

> 💡 **Interview Tip:** Think of `useReducer` as a built-in mini-Redux. When you find yourself writing many `useState` calls that change together, consolidate them into `useReducer`.

</details>

---

<details>
<summary><b>Q20. What are custom hooks? How do you create one?</b></summary>

> **One-Line Answer:** A custom hook is a reusable function starting with "use" that encapsulates stateful logic using other hooks — allowing you to extract and share logic between components.

### Code Example

```javascript
// Custom hook — useFetch
function useFetch(url) {
  const [data, setData]     = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError]   = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch(url)
      .then(res => {
        if (!res.ok) throw new Error("Network response was not ok");
        return res.json();
      })
      .then(data  => { setData(data); setLoading(false); })
      .catch(err  => { setError(err); setLoading(false); });
  }, [url]);

  return { data, loading, error };
}

// Using the custom hook — clean and reusable!
function UserProfile({ userId }) {
  const { data: user, loading, error } = useFetch(`/api/users/${userId}`);

  if (loading) return <p>Loading...</p>;
  if (error)   return <p>Error: {error.message}</p>;
  return <h1>Hello, {user.name}!</h1>;
}

// Reuse in another component
function PostList() {
  const { data: posts, loading } = useFetch("/api/posts");
  // same logic, zero duplication!
}
```

### Rules of Hooks (applies to custom hooks too)

| Rule | Correct | Wrong |
|------|---------|-------|
| Only call hooks at top level | ✅ `useState(0)` at top | ❌ Inside if/loop/nested function |
| Only call hooks from React functions | ✅ Components & custom hooks | ❌ Regular JS functions |
| Custom hooks must start with "use" | ✅ `useFetch` | ❌ `fetchData` |

> 💡 **Interview Tip:** Custom hooks are one of the most important React patterns. Common examples: `useLocalStorage`, `useDebounce`, `useWindowSize`, `useIntersectionObserver`, `useForm`.

</details>

---

## 📦 State & Props

<details>
<summary><b>Q21. What is the difference between State and Props?</b></summary>

> **One-Line Answer:** State is mutable internal data managed by the component itself. Props are read-only data passed FROM a parent component — a child cannot change its own props.

### Comparison Table

| Feature | State | Props |
|---------|-------|-------|
| Owned by | The component itself | Parent component |
| Mutable | ✅ Yes (via setter) | ❌ No (read-only) |
| Triggers re-render | ✅ Yes when changed | ✅ Yes when parent re-renders |
| Can be passed down | ✅ Yes (as props to children) | ✅ Yes (pass through) |
| Default value | Set in `useState(initial)` | Set in function params or `defaultProps` |
| Used for | Internal data that changes | Data flowing from parent to child |

### Code Example

```javascript
// Parent — owns state, passes as props
function Parent() {
  const [color, setColor] = useState("blue");  // STATE — owned here

  return (
    <div>
      <button onClick={() => setColor("red")}>Change Color</button>
      <Child color={color} />  {/* color passed as PROP */}
    </div>
  );
}

// Child — receives props, cannot change them
function Child({ color }) {   // color is a PROP — read-only!
  // color = "green";  ❌ Error — cannot modify props
  return <p style={{ color }}>I am {color}</p>;
}
```

### Real-World Analogy

- **Props** = Arguments passed to a function (come from outside)
- **State** = Local variables inside the function (managed inside)

> 💡 **Interview Tip:** "Lift state up" is a key React pattern — when two sibling components need to share data, move the state to their common parent and pass it down as props.

</details>

---

<details>
<summary><b>Q22. What is prop drilling? How to avoid it?</b></summary>

> **One-Line Answer:** Prop drilling is passing props through multiple intermediate components that don't need them — just to reach a deeply nested child. Avoid it with Context API, Redux, Zustand, or component composition.

### The Problem

```javascript
// User data needed by Avatar — passed through 3 components that don't use it!
<App user={user}>
  <Layout user={user}>       {/* doesn't use user */}
    <Sidebar user={user}>    {/* doesn't use user */}
      <Avatar user={user} /> {/* FINALLY uses it */}
    </Sidebar>
  </Layout>
</App>
```

### Solutions

| Solution | Best For |
|----------|---------|
| **React Context** | Semi-static data (theme, auth, locale) |
| **Redux / Zustand** | Complex, frequently changing global state |
| **Component Composition** | Pass components as props instead of data |
| **Custom Hook** | Shared logic without shared state tree |

```javascript
// Solution: Context API
const UserContext = createContext(null);

function App() {
  const [user] = useState({ name: "Alice" });
  return (
    <UserContext.Provider value={user}>
      <Layout />  {/* no user prop needed! */}
    </UserContext.Provider>
  );
}

function Avatar() {
  const user = useContext(UserContext);  // directly accessed anywhere!
  return <img alt={user.name} />;
}
```

> 💡 **Interview Tip:** Component composition (passing JSX as children or props) is an underused but elegant solution to prop drilling — no extra libraries needed.

</details>

---

## 🗄️ State Management

<details>
<summary><b>Q23. What is Redux? What are its core concepts?</b></summary>

> **One-Line Answer:** Redux is a predictable state management library — all app state lives in a single store, state is changed only via actions dispatched to reducers. Redux Toolkit is the modern way to use Redux.

### Core Concepts

| Concept | What It Is | Analogy |
|---------|-----------|---------|
| **Store** | Single source of truth — holds all state | The database |
| **Action** | Plain object describing what happened `{ type: "ADD_TODO" }` | An event |
| **Reducer** | Pure function `(state, action) → newState` | Event handler |
| **Dispatch** | Method to send an action to the store | Trigger event |
| **Selector** | Function that reads data from the store | DB query |

### Modern Redux Toolkit Example

```javascript
import { createSlice, configureStore } from "@reduxjs/toolkit";

// 1. Create a slice (state + reducers + actions together)
const counterSlice = createSlice({
  name: "counter",
  initialState: { value: 0 },
  reducers: {
    increment: state => { state.value += 1; },  // Immer handles immutability!
    decrement: state => { state.value -= 1; },
    addAmount: (state, action) => { state.value += action.payload; }
  }
});

// 2. Export actions
export const { increment, decrement, addAmount } = counterSlice.actions;

// 3. Configure store
const store = configureStore({
  reducer: { counter: counterSlice.reducer }
});

// 4. Use in component
import { useSelector, useDispatch } from "react-redux";

function Counter() {
  const count    = useSelector(state => state.counter.value);
  const dispatch = useDispatch();

  return (
    <div>
      <p>{count}</p>
      <button onClick={() => dispatch(increment())}>+</button>
      <button onClick={() => dispatch(decrement())}>-</button>
    </div>
  );
}
```

> 💡 **Interview Tip:** Always use Redux Toolkit (RTK) — not bare Redux. RTK removes 90% of boilerplate, includes Immer for immutable updates, and has RTK Query for API calls.

</details>

---

<details>
<summary><b>Q24. What is the difference between Redux, Zustand, and Context API?</b></summary>

> **One-Line Answer:** Context API is built-in and simple but causes full re-renders. Redux is powerful with DevTools but verbose. Zustand is minimal, fast, and easy — the modern sweet spot for most apps.

### Comparison Table

| Feature | Context API | Redux (RTK) | Zustand |
|---------|-------------|------------|---------|
| Bundle size | 0kb (built-in) | ~10kb | ~1kb |
| Setup complexity | Low | High | Very Low |
| Boilerplate | Low | High | Very Low |
| DevTools | ❌ No | ✅ Excellent | ✅ Good |
| Performance | ❌ Re-renders all consumers | ✅ Optimized | ✅ Optimized |
| Async support | Manual | RTK Query | Built-in |
| Best for | Theme, auth, locale | Large complex apps | Most modern apps |

### Zustand Example (minimal!)

```javascript
import { create } from "zustand";

// Create store — that's it!
const useStore = create((set) => ({
  count: 0,
  increment: () => set(state => ({ count: state.count + 1 })),
  decrement: () => set(state => ({ count: state.count - 1 })),
}));

// Use in any component — no Provider needed!
function Counter() {
  const { count, increment } = useStore();
  return <button onClick={increment}>{count}</button>;
}
```

> 💡 **Interview Tip:** For new projects, Zustand is often the best choice — simple API, no boilerplate, great performance. Use Redux only if the team is familiar or the app is very large.

</details>

---

## 🧩 Component Architecture

<details>
<summary><b>Q25. What is React.memo? When should you use it?</b></summary>

> **One-Line Answer:** `React.memo` is a HOC that wraps a component and memoizes it — preventing re-renders if its props haven't changed. Use it for expensive components that receive the same props often.

### Code Example

```javascript
import { memo, useState } from "react";

// Without memo — re-renders even when props don't change
function ExpensiveChart({ data }) {
  console.log("Chart rendered!");
  // expensive rendering work...
  return <div>{/* chart */}</div>;
}

// With memo — skips re-render if data prop is the same reference
const ExpensiveChart = memo(function Chart({ data }) {
  console.log("Chart rendered!");
  return <div>{/* chart */}</div>;
});

function Dashboard() {
  const [count, setCount] = useState(0);
  const chartData = useMemo(() => computeChartData(), []); // stable reference!

  return (
    <div>
      <button onClick={() => setCount(c => c + 1)}>Count: {count}</button>
      <ExpensiveChart data={chartData} />  {/* won't re-render on count change */}
    </div>
  );
}
```

### memo vs useMemo vs useCallback

| Tool | What It Memoizes | Applied To |
|------|-----------------|-----------|
| `React.memo` | Component output | Entire component |
| `useMemo` | Computed value | Value inside component |
| `useCallback` | Function reference | Callback inside component |

> 💡 **Interview Tip:** `React.memo` does a shallow comparison of props. For object/array props, you also need `useMemo`/`useCallback` in the parent to keep references stable — otherwise memo does nothing useful.

</details>

---

<details>
<summary><b>Q26. What are Higher-Order Components (HOC)?</b></summary>

> **One-Line Answer:** A HOC is a function that takes a component and returns a new, enhanced component — a pattern for reusing component logic (like adding auth checks, logging, or loading states).

### Code Example

```javascript
// HOC — adds loading and error handling to any component
function withDataFetching(WrappedComponent, dataUrl) {
  return function EnhancedComponent(props) {
    const [data, setData]       = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      fetch(dataUrl)
        .then(res => res.json())
        .then(data => { setData(data); setLoading(false); });
    }, []);

    if (loading) return <p>Loading...</p>;
    return <WrappedComponent data={data} {...props} />;
  };
}

// Plain component
function UserList({ data }) {
  return <ul>{data.map(u => <li key={u.id}>{u.name}</li>)}</ul>;
}

// Enhanced component
const UserListWithData = withDataFetching(UserList, "/api/users");

// Usage — no loading logic needed!
<UserListWithData />
```

### HOC vs Custom Hooks (modern)

| Feature | HOC | Custom Hook |
|---------|-----|------------|
| Reuses | Component logic | Stateful logic |
| Output | New component | Values/functions |
| Nesting issue | ❌ Wrapper hell | ✅ No extra components |
| Modern preference | Less common | ✅ Preferred now |

> 💡 **Interview Tip:** Custom Hooks have largely replaced HOCs in modern React. But HOCs still appear in popular libraries (Redux's `connect()`, React Router's `withRouter()`). Know both patterns.

</details>

---

<details>
<summary><b>Q27. What are Render Props?</b></summary>

> **One-Line Answer:** Render Props is a pattern where a component receives a function as a prop and calls it to render something — sharing stateful logic without HOCs or hooks.

### Code Example

```javascript
// Component that shares mouse position logic via render prop
function MouseTracker({ render }) {
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const handleMove = (e) => setPos({ x: e.clientX, y: e.clientY });

  return (
    <div onMouseMove={handleMove}>
      {render(pos)}  {/* call the render prop function */}
    </div>
  );
}

// Consumer — decides how to render
<MouseTracker render={({ x, y }) => (
  <p>Mouse is at: {x}, {y}</p>
)} />

// Or use children as a function
function MouseTracker({ children }) {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  return (
    <div onMouseMove={e => setPos({ x: e.clientX, y: e.clientY })}>
      {children(pos)}
    </div>
  );
}
<MouseTracker>{({ x, y }) => <p>Position: {x}, {y}</p>}</MouseTracker>
```

> 💡 **Interview Tip:** Like HOCs, Render Props have mostly been replaced by Custom Hooks. But the pattern is still seen in libraries like React Final Form and Downshift. Understanding it shows depth.

</details>

---

## 🗺️ React Router & Navigation

<details>
<summary><b>Q28. What is React Router? How do you set it up?</b></summary>

> **One-Line Answer:** React Router is the standard routing library for React — it maps URL paths to components, enabling navigation in SPAs without full page reloads.

### Setup Example

```javascript
import { BrowserRouter, Routes, Route, Link, useNavigate, useParams } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/users">Users</Link>
      </nav>

      <Routes>
        <Route path="/"         element={<Home />} />
        <Route path="/about"    element={<About />} />
        <Route path="/users"    element={<Users />} />
        <Route path="/users/:id" element={<UserDetail />} />  {/* dynamic */}
        <Route path="*"         element={<NotFound />} />     {/* 404 */}
      </Routes>
    </BrowserRouter>
  );
}

// Dynamic route — read URL param
function UserDetail() {
  const { id } = useParams();
  return <p>User ID: {id}</p>;
}

// Programmatic navigation
function LoginButton() {
  const navigate = useNavigate();
  return <button onClick={() => navigate("/dashboard")}>Login</button>;
}
```

### Router Types

| Router | URL Style | When to Use |
|--------|-----------|------------|
| `BrowserRouter` | `/users/1` (clean URLs) | Production apps with server config |
| `HashRouter` | `/#/users/1` (hash URLs) | Static hosting (GitHub Pages) |
| `MemoryRouter` | No URL | Testing, React Native |

> 💡 **Interview Tip:** Use `<Link>` instead of `<a href>` for internal navigation — `<a>` triggers a full page reload, `<Link>` does a client-side navigation.

</details>

---

<details>
<summary><b>Q29. What are protected routes? How to implement them?</b></summary>

> **One-Line Answer:** Protected routes check if the user is authenticated before allowing access — redirecting to login if not. Implemented by wrapping routes in an auth-checking component.

### Code Example

```javascript
import { Navigate, Outlet } from "react-router-dom";

// Auth check component
function ProtectedRoute() {
  const isAuthenticated = localStorage.getItem("token") !== null;

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;  // redirect to login
  }

  return <Outlet />;  // render the protected child route
}

// Route setup
<Routes>
  <Route path="/login"     element={<Login />} />
  <Route path="/register"  element={<Register />} />

  {/* All routes inside ProtectedRoute require auth */}
  <Route element={<ProtectedRoute />}>
    <Route path="/dashboard" element={<Dashboard />} />
    <Route path="/profile"   element={<Profile />} />
    <Route path="/settings"  element={<Settings />} />
  </Route>
</Routes>
```

> 💡 **Interview Tip:** Use `replace` in `<Navigate replace />` so the login page doesn't appear in the browser history — otherwise pressing "back" after login would go to login again.

</details>

---

## 🌐 API Integration

<details>
<summary><b>Q30. What is the difference between Axios and Fetch?</b></summary>

> **One-Line Answer:** Fetch is built into the browser — no install needed but more verbose. Axios is a third-party library with automatic JSON parsing, interceptors, better error handling, and simpler syntax.

### Comparison Table

| Feature | Fetch (built-in) | Axios (library) |
|---------|-----------------|----------------|
| Installation | ❌ None (browser built-in) | ✅ `npm install axios` |
| JSON parsing | Manual (`.then(res => res.json())`) | Automatic |
| Error handling | Only network errors throw | HTTP errors (4xx, 5xx) throw too |
| Request timeout | ❌ No built-in | ✅ Easy (`timeout: 5000`) |
| Interceptors | ❌ No | ✅ Yes (add headers, handle 401) |
| Cancel requests | AbortController (verbose) | Simple (`CancelToken`) |
| Older browser support | Modern only | ✅ Yes (polyfill included) |
| Bundle size | 0kb | ~14kb |

### Code Comparison

```javascript
// FETCH — manual JSON parsing, manual error handling
async function getUser(id) {
  const res = await fetch(`/api/users/${id}`);
  if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);  // manual!
  const data = await res.json();  // manual JSON parse!
  return data;
}

// AXIOS — automatic, cleaner
async function getUser(id) {
  const { data } = await axios.get(`/api/users/${id}`);  // JSON auto-parsed!
  return data;  // throws automatically for 4xx/5xx!
}

// AXIOS INTERCEPTOR — add auth token to every request
axios.interceptors.request.use(config => {
  config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
  return config;
});
```

> 💡 **Interview Tip:** Fetch is fine for simple use cases. Choose Axios when you need interceptors (auth tokens, logging), consistent error handling, or request cancellation.

</details>

---

<details>
<summary><b>Q31. How do you handle API calls in React? What are best practices?</b></summary>

> **One-Line Answer:** Fetch data inside `useEffect` for simple cases, use custom hooks to reuse loading/error logic, or use TanStack Query for caching, background refresh, and automatic re-fetching.

### Pattern 1 — Basic useEffect + fetch

```javascript
function Users() {
  const [users, setUsers]     = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(null);

  useEffect(() => {
    let isCancelled = false;  // prevent state update on unmounted component

    async function load() {
      try {
        const res  = await fetch("/api/users");
        const data = await res.json();
        if (!isCancelled) setUsers(data);
      } catch (err) {
        if (!isCancelled) setError(err.message);
      } finally {
        if (!isCancelled) setLoading(false);
      }
    }
    load();

    return () => { isCancelled = true; };  // cleanup!
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error)   return <p>Error: {error}</p>;
  return <ul>{users.map(u => <li key={u.id}>{u.name}</li>)}</ul>;
}
```

### Pattern 2 — TanStack Query (React Query)

```javascript
import { useQuery } from "@tanstack/react-query";

function Users() {
  const { data: users, isLoading, error } = useQuery({
    queryKey: ["users"],
    queryFn:  () => fetch("/api/users").then(r => r.json()),
    staleTime: 5 * 60 * 1000,  // cache for 5 minutes
  });

  if (isLoading) return <p>Loading...</p>;
  if (error)     return <p>Error!</p>;
  return <ul>{users.map(u => <li key={u.id}>{u.name}</li>)}</ul>;
}
// Handles caching, background refresh, deduplication automatically!
```

> 💡 **Interview Tip:** TanStack Query (React Query) is the industry standard for server state management. It eliminates 90% of API boilerplate and handles caching, loading, error, and refetching automatically.

</details>

---

## 📝 Form Handling

<details>
<summary><b>Q32. What are controlled vs uncontrolled components?</b></summary>

> **One-Line Answer:** Controlled components have their form values managed by React state — React is the single source of truth. Uncontrolled components store form values in the DOM — accessed via `useRef`.

### Controlled Component

```javascript
function ControlledForm() {
  const [name, setName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(name);  // always has latest value
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={name}                      // React controls the value
        onChange={e => setName(e.target.value)}  // update on every keystroke
      />
      <button type="submit">Submit</button>
    </form>
  );
}
```

### Uncontrolled Component

```javascript
function UncontrolledForm() {
  const nameRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(nameRef.current.value);  // read DOM directly on submit
  };

  return (
    <form onSubmit={handleSubmit}>
      <input ref={nameRef} defaultValue="" />  {/* DOM controls the value */}
      <button type="submit">Submit</button>
    </form>
  );
}
```

### Controlled vs Uncontrolled

| Feature | Controlled | Uncontrolled |
|---------|-----------|-------------|
| Source of truth | React state | DOM |
| Validation | On every keystroke | On submit only |
| Instant feedback | ✅ Yes | ❌ Hard |
| Re-renders | Every keystroke | Only on submit |
| Recommended | ✅ Yes (most cases) | For file inputs, large forms |

> 💡 **Interview Tip:** React recommends controlled components. But for large forms with many fields, all those re-renders add up — that's why React Hook Form (uncontrolled under the hood) is so popular.

</details>

---

<details>
<summary><b>Q33. What is React Hook Form? Why use it?</b></summary>

> **One-Line Answer:** React Hook Form is a library for handling forms with minimal re-renders — it uses uncontrolled inputs under the hood but provides a clean API for validation, error handling, and submission.

### Why React Hook Form?

| Problem With Plain Forms | React Hook Form Solution |
|------------------------|------------------------|
| Re-renders on every keystroke | Minimal re-renders (uncontrolled) |
| Manual validation boilerplate | Built-in validation rules |
| Complex error state management | Automatic error tracking |
| Integration with UI libraries | Works with any input component |

### Code Example

```javascript
import { useForm } from "react-hook-form";

function SignupForm() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);  // { name: "Alice", email: "alice@..." }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        {...register("name", {
          required: "Name is required",
          minLength: { value: 2, message: "Name too short" }
        })}
        placeholder="Name"
      />
      {errors.name && <p>{errors.name.message}</p>}

      <input
        {...register("email", {
          required: "Email is required",
          pattern: { value: /^\S+@\S+$/i, message: "Invalid email" }
        })}
        placeholder="Email"
      />
      {errors.email && <p>{errors.email.message}</p>}

      <button type="submit">Sign Up</button>
    </form>
  );
}
```

> 💡 **Interview Tip:** Combine React Hook Form with Zod or Yup for schema-based validation — much cleaner than scattered validation rules.

</details>

---

## ⚡ Performance Optimization

<details>
<summary><b>Q34. What is lazy loading in React?</b></summary>

> **One-Line Answer:** Lazy loading defers loading a component until it's actually needed — reducing the initial bundle size and speeding up the first page load. Done with `React.lazy()` and `Suspense`.

### Code Example

```javascript
import { lazy, Suspense } from "react";

// Instead of: import Dashboard from "./Dashboard"
// Lazy import — only loads when rendered for the first time!
const Dashboard = lazy(() => import("./Dashboard"));
const Settings  = lazy(() => import("./Settings"));
const Reports   = lazy(() => import("./Reports"));

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/settings"  element={<Settings />} />
        <Route path="/reports"   element={<Reports />} />
      </Routes>
    </Suspense>
  );
}
```

### Benefits

| Without Lazy Loading | With Lazy Loading |
|---------------------|------------------|
| All JS downloaded upfront | Only needed JS downloaded |
| Slow initial load | Fast initial load |
| User waits for unused pages | User gets what they need |

> 💡 **Interview Tip:** Route-based code splitting is the easiest and highest-impact lazy loading — each page loads its own chunk. For very large components (charts, editors), lazy load them individually.

</details>

---

<details>
<summary><b>Q35. What are the key performance optimization techniques in React?</b></summary>

> **One-Line Answer:** Key techniques: React.memo (skip re-renders), useMemo/useCallback (stable references), lazy loading (code splitting), virtualization (render only visible items), and avoiding unnecessary state.

### Performance Checklist

| Technique | What It Solves | Tool |
|-----------|---------------|------|
| **Memoize components** | Skip re-renders when props unchanged | `React.memo` |
| **Memoize values** | Skip expensive recalculations | `useMemo` |
| **Stable callbacks** | Prevent child re-renders | `useCallback` |
| **Code splitting** | Reduce initial bundle size | `React.lazy` + `Suspense` |
| **Virtualization** | Render only visible list items | `react-window`, `react-virtual` |
| **Avoid inline objects in JSX** | Prevent new references on every render | Move outside component |
| **Keys in lists** | Efficient DOM updates | Stable unique `key` prop |
| **Debounce/throttle** | Limit expensive updates (search) | `lodash.debounce` or custom hook |

### Common Mistakes That Hurt Performance

```javascript
// ❌ Bad — new object reference every render
<Component style={{ color: "red" }} />

// ✅ Good — stable reference
const style = { color: "red" };
<Component style={style} />

// ❌ Bad — new array every render
<List items={[1, 2, 3]} />

// ✅ Good — stable reference
const ITEMS = [1, 2, 3];
<List items={ITEMS} />

// ❌ Bad — inline function recreated every render
<Button onClick={() => doSomething(id)} />

// ✅ Good — memoized callback
const handleClick = useCallback(() => doSomething(id), [id]);
<Button onClick={handleClick} />
```

> 💡 **Interview Tip:** Don't optimize prematurely! Use React DevTools Profiler to identify which components re-render and why. Fix actual bottlenecks, not hypothetical ones.

</details>

---

## 🔐 Authentication & Security

<details>
<summary><b>Q36. How does authentication work in React? What is JWT?</b></summary>

> **One-Line Answer:** JWT (JSON Web Token) is a compact, self-contained token that proves identity. After login, the server sends a JWT — the client stores it and sends it with every API request in the Authorization header.

### Authentication Flow

```
1. User submits login form (email + password)
2. Server validates credentials
3. Server creates JWT token (signed with secret key)
4. Server sends JWT to client
5. Client stores JWT (localStorage or httpOnly cookie)
6. Client sends JWT in every API request: Authorization: Bearer <token>
7. Server verifies JWT on each request
8. Server returns protected data
```

### Code Example

```javascript
// Login — store token
async function login(email, password) {
  const res  = await axios.post("/api/login", { email, password });
  const { token } = res.data;
  localStorage.setItem("token", token);  // store token
}

// Axios interceptor — auto-attach token
axios.interceptors.request.use(config => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Logout — clear token
function logout() {
  localStorage.removeItem("token");
  navigate("/login");
}

// Auth context — share auth state app-wide
const AuthContext = createContext(null);

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) setUser(parseToken(token));  // decode JWT to get user info
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
```

### localStorage vs Cookie for Token Storage

| | localStorage | httpOnly Cookie |
|-|-------------|----------------|
| XSS attack risk | ❌ Vulnerable | ✅ Protected (JS can't access) |
| CSRF attack risk | ✅ Protected | ❌ Vulnerable (need CSRF token) |
| Ease of use | Simple | Requires server config |
| Recommended for | Simple apps | Production / sensitive apps |

> 💡 **Interview Tip:** `httpOnly` cookies are more secure than localStorage for storing tokens. JavaScript can't access httpOnly cookies — so even if your app has an XSS vulnerability, the token is safe.

</details>

---

## 🧪 Testing in React

<details>
<summary><b>Q37. What is Jest? What is React Testing Library?</b></summary>

> **One-Line Answer:** Jest is the test runner — it runs tests and checks assertions. React Testing Library (RTL) provides utilities to render components and interact with them the way a user would — not testing implementation details.

### Testing Philosophy

```
React Testing Library motto:
"The more your tests resemble the way your software is used,
the more confidence they give you."

— Test BEHAVIOR, not implementation
— Click buttons, type in inputs, read text
— Don't test state, internal methods, or component structure
```

### Code Example

```javascript
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Counter from "./Counter";

describe("Counter component", () => {
  test("renders initial count of 0", () => {
    render(<Counter />);
    expect(screen.getByText("Count: 0")).toBeInTheDocument();
  });

  test("increments count when button is clicked", async () => {
    render(<Counter />);
    const button = screen.getByRole("button", { name: /increment/i });
    await userEvent.click(button);
    expect(screen.getByText("Count: 1")).toBeInTheDocument();
  });

  test("fetches and displays users", async () => {
    // Mock the fetch call
    jest.spyOn(global, "fetch").mockResolvedValue({
      ok: true,
      json: async () => [{ id: 1, name: "Alice" }]
    });

    render(<Users />);
    expect(screen.getByText("Loading...")).toBeInTheDocument();
    expect(await screen.findByText("Alice")).toBeInTheDocument();  // async!
  });
});
```

### Types of Tests

| Type | What It Tests | Speed | Confidence |
|------|--------------|-------|-----------|
| **Unit** | Single function/component | Fast | Low |
| **Integration** | Multiple components together | Medium | Medium |
| **E2E** | Full user flow (Cypress, Playwright) | Slow | High |

> 💡 **Interview Tip:** Follow the testing trophy — mostly integration tests, some unit tests, few E2E tests. React Testing Library encourages integration-style testing by default.

</details>

---

## 🚀 Advanced React Concepts

<details>
<summary><b>Q38. What is React Suspense?</b></summary>

> **One-Line Answer:** Suspense lets you declaratively show a loading state while waiting for something to load — lazy-loaded components, or async data (in React 18+ with libraries like React Query or Relay).

### Code Example

```javascript
import { Suspense, lazy } from "react";

const HeavyComponent = lazy(() => import("./HeavyComponent"));

function App() {
  return (
    // Suspense catches the "loading" signal and shows fallback
    <Suspense fallback={<Spinner />}>
      <HeavyComponent />
    </Suspense>
  );
}

// Nested Suspense for granular loading
function Page() {
  return (
    <Suspense fallback={<PageSkeleton />}>
      <Header />
      <Suspense fallback={<ContentSkeleton />}>
        <Content />  {/* shows its own skeleton while loading */}
      </Suspense>
      <Footer />
    </Suspense>
  );
}
```

> 💡 **Interview Tip:** React 18+ expands Suspense to work with data fetching too (not just lazy loading). Libraries like TanStack Query and Relay integrate with Suspense for a cleaner loading UX.

</details>

---

<details>
<summary><b>Q39. What is React 18's Concurrent Mode?</b></summary>

> **One-Line Answer:** Concurrent Mode (React 18) allows React to work on multiple tasks simultaneously — it can pause, resume, or abandon rendering to keep the UI responsive. Enabled by `createRoot`.

### Key Features of React 18

| Feature | What It Does | Hook/API |
|---------|-------------|----------|
| **Automatic Batching** | Batches multiple `setState` calls in async code too | Default in React 18 |
| **Transitions** | Mark non-urgent updates — UI stays responsive | `useTransition`, `startTransition` |
| **Deferred Updates** | Defer updating a value until UI is idle | `useDeferredValue` |
| **Suspense for data** | Show loading state during data fetching | `<Suspense>` |

### useTransition Example

```javascript
import { useState, useTransition } from "react";

function SearchPage() {
  const [query, setQuery]   = useState("");
  const [results, setResults] = useState([]);
  const [isPending, startTransition] = useTransition();

  function handleChange(e) {
    setQuery(e.target.value);  // urgent — update input immediately

    startTransition(() => {
      // non-urgent — can be interrupted if user types again
      setResults(searchDatabase(e.target.value));
    });
  }

  return (
    <div>
      <input value={query} onChange={handleChange} />
      {isPending ? <Spinner /> : <ResultsList data={results} />}
    </div>
  );
}
```

> 💡 **Interview Tip:** React 18 setup: `ReactDOM.createRoot(document.getElementById("root")).render(<App />)` instead of `ReactDOM.render(<App />)`. This opts in to concurrent features.

</details>

---

<details>
<summary><b>Q40. What is Server-Side Rendering (SSR) vs Client-Side Rendering (CSR)?</b></summary>

> **One-Line Answer:** CSR loads a minimal HTML and renders everything in the browser via JavaScript. SSR renders the full HTML on the server and sends it to the browser — faster first load and better SEO.

### Comparison Table

| Feature | CSR (React default) | SSR (Next.js) | SSG (Next.js) |
|---------|-------------------|---------------|---------------|
| Rendering location | Browser | Server | Build time |
| First page load | Slow (blank until JS loads) | Fast (HTML ready) | Fastest (pre-built) |
| SEO | ❌ Poor (bots see empty page) | ✅ Great | ✅ Great |
| Data freshness | ✅ Always fresh | ✅ Fresh per request | ❌ At build time |
| Server cost | Low | Higher | Lowest (CDN) |
| Use case | Dashboards, internal apps | E-commerce, blogs, marketing | Docs, blogs with static data |

### Next.js Example

```javascript
// SSR — getServerSideProps runs on EVERY request
export async function getServerSideProps() {
  const data = await fetch("https://api.example.com/products");
  return { props: { products: await data.json() } };
}

// SSG — getStaticProps runs at BUILD time only
export async function getStaticProps() {
  const data = await fetch("https://api.example.com/products");
  return {
    props: { products: await data.json() },
    revalidate: 60  // ISR — re-build every 60 seconds
  };
}
```

> 💡 **Interview Tip:** Next.js is the go-to framework for React SSR/SSG. React Server Components (RSC) in Next.js 13+ App Router take this further — components render on the server by default, reducing JS sent to the browser.

</details>

---

## 🎨 CSS & Styling

<details>
<summary><b>Q41. What are the different ways to style React components?</b></summary>

> **One-Line Answer:** React supports inline styles, CSS Modules, styled-components (CSS-in-JS), Tailwind CSS (utility classes), and plain CSS/SCSS — each with different trade-offs.

### Styling Options Comparison

| Method | Scoping | Dynamic Styles | Bundle Size | DX |
|--------|---------|---------------|-------------|-----|
| **Plain CSS** | ❌ Global | Via className toggle | 0 | Familiar |
| **CSS Modules** | ✅ Local scoped | Via className toggle | 0 | Good |
| **Styled Components** | ✅ Local | ✅ Easy (props) | ~12kb | Excellent |
| **Tailwind CSS** | ✅ Utility | Via class toggle | ~10kb | Fast |
| **Inline styles** | ✅ Local | ✅ Easy | 0 | Limited (no :hover) |

### Code Examples

```javascript
// 1. CSS Modules
import styles from "./Button.module.css";
<button className={styles.primary}>Click me</button>

// 2. Styled Components
import styled from "styled-components";
const Button = styled.button`
  background: ${props => props.primary ? "#007bff" : "white"};
  color: ${props => props.primary ? "white" : "#007bff"};
  padding: 8px 16px;
`;
<Button primary>Click me</Button>

// 3. Tailwind CSS
<button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
  Click me
</button>

// 4. Inline styles (limited — no pseudo-classes)
<button style={{ backgroundColor: "blue", color: "white" }}>
  Click me
</button>
```

> 💡 **Interview Tip:** Tailwind CSS is extremely popular in 2024+ for its speed. CSS Modules are great for component-scoped styles without a library. Styled Components/Emotion for CSS-in-JS when dynamic styles based on props are needed.

</details>

---

## 🎯 Bonus Questions

<details>
<summary><b>Q42. What is the key prop in React? Why is it important?</b></summary>

> **One-Line Answer:** `key` is a special prop that helps React identify which items in a list have changed, been added, or removed — enabling efficient DOM updates instead of re-rendering the entire list.

### Code Example

```javascript
// ❌ Without key — React can't track items efficiently
const list = items.map(item => <li>{item.name}</li>);

// ❌ Using index as key — problematic when list order changes
const list = items.map((item, index) => <li key={index}>{item.name}</li>);

// ✅ Using stable unique ID as key
const list = items.map(item => <li key={item.id}>{item.name}</li>);
```

### Why Index as Key is Bad

```javascript
// Initial: [Alice(0), Bob(1), Charlie(2)]
// Remove Alice: [Bob(0), Charlie(1)]
// React sees: key=0 still exists — just "changed" to Bob
// React UPDATES Bob, UPDATES Charlie, REMOVES the last
// Instead of simply REMOVING Alice!
// This causes input state bugs with form elements in lists!
```

> 💡 **Interview Tip:** Use stable, unique IDs as keys — never array indices when the list can be reordered or filtered. Keys must be unique among siblings, but don't need to be globally unique.

</details>

---

<details>
<summary><b>Q43. What is the difference between useLayoutEffect and useEffect?</b></summary>

> **One-Line Answer:** `useEffect` runs asynchronously after the browser has painted. `useLayoutEffect` runs synchronously after DOM mutations but before the browser paints — use it to read/modify DOM measurements.

### Comparison Table

| Feature | useEffect | useLayoutEffect |
|---------|----------|----------------|
| Runs | After browser paint | After DOM update, before paint |
| Blocking? | ❌ Non-blocking | ✅ Blocking (synchronous) |
| Use for | API calls, subscriptions | DOM measurements, animations |
| SSR | ✅ Works | ⚠️ Warning on server |

```javascript
// useLayoutEffect — prevent visual flicker for DOM measurements
function Tooltip({ text, targetRef }) {
  const tooltipRef = useRef(null);

  useLayoutEffect(() => {
    // Measure DOM BEFORE paint — no flicker!
    const { top, left } = targetRef.current.getBoundingClientRect();
    tooltipRef.current.style.top  = `${top - 30}px`;
    tooltipRef.current.style.left = `${left}px`;
  }, [text]);

  return <div ref={tooltipRef} className="tooltip">{text}</div>;
}
```

> 💡 **Interview Tip:** 99% of the time, `useEffect` is the right choice. Only reach for `useLayoutEffect` when you see a visual flicker caused by a DOM measurement/update.

</details>

---

<details>
<summary><b>Q44. What is an Error Boundary?</b></summary>

> **One-Line Answer:** Error Boundaries are class components that catch JavaScript errors in their child component tree, log them, and display a fallback UI instead of crashing the whole app.

### Code Example

```javascript
import { Component } from "react";

class ErrorBoundary extends Component {
  state = { hasError: false, error: null };

  static getDerivedStateFromError(error) {
    return { hasError: true, error };  // update state to show fallback
  }

  componentDidCatch(error, errorInfo) {
    // Log to error tracking service (Sentry, etc.)
    console.error("Error caught:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div>
          <h2>Something went wrong.</h2>
          <button onClick={() => this.setState({ hasError: false })}>
            Try again
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

// Usage
<ErrorBoundary>
  <MyUnstableComponent />
</ErrorBoundary>
```

> 💡 **Interview Tip:** Error Boundaries only catch errors during rendering, lifecycle methods, and constructors. They do NOT catch errors in: event handlers, async code (use try/catch), or server-side rendering. The library `react-error-boundary` provides a modern hook-based alternative.

</details>

---

<details>
<summary><b>Q45. What is the difference between SPA and MPA?</b></summary>

> **One-Line Answer:** SPA loads once and dynamically updates content without full page reloads — fast UI, poor initial SEO. MPA loads a new HTML page on each navigation — slower transitions, better SEO, simpler.

### Comparison Table

| Feature | SPA (React default) | MPA (Traditional) |
|---------|-------------------|------------------|
| Page transition | No reload (instant) | Full reload |
| Initial load | Slow (download all JS) | Fast |
| SEO | ❌ Poor (needs SSR fix) | ✅ Good |
| User experience | Smooth, app-like | Traditional website feel |
| State persistence | ✅ Across navigation | Lost on reload |
| Examples | Gmail, Twitter, React apps | Wikipedia, news sites |
| Backend coupling | Decoupled (API-first) | Tightly coupled |

> 💡 **Interview Tip:** React Router turns React into an SPA. For apps needing both SPA feel AND SEO (like e-commerce), use Next.js which combines SSR with React's component model.

</details>

---

<details>
<summary><b>Q46. What is reconciliation in React?</b></summary>

> **One-Line Answer:** Reconciliation is React's process of comparing the previous Virtual DOM tree with the new one (diffing) and computing the minimal set of changes needed to update the real DOM.

### How React Diffs

```
Rules React uses during reconciliation:

1. Different element types → destroy old tree, build new one
   <div> → <p>: destroys div and all children, creates p

2. Same element type → update only changed attributes
   <div className="old"> → <div className="new">: only updates className

3. Lists with keys → use keys to match old and new items
   Without key: rebuilds entire list
   With key:    only adds/removes/moves changed items
```

### Optimization Tips Based on Reconciliation

```javascript
// 1. Don't change element type unnecessarily
// Bad — React unmounts/remounts on every condition change
return condition ? <div>...</div> : <span>...</span>;

// Better — same element type, just different content
return <div>{condition ? "Yes" : "No"}</div>;

// 2. Keys help reconciliation skip work
// Without key → React rebuilds entire list when one item is added
// With stable key → React only inserts the new item
```

> 💡 **Interview Tip:** Understanding reconciliation explains WHY keys matter, WHY you should avoid changing element types, and WHY component position in the tree matters for state preservation.

</details>

---

<details>
<summary><b>Q47. What is the Context API? What are its limitations?</b></summary>

> **One-Line Answer:** Context API provides a way to share values globally without prop drilling. Its main limitation: any context value change causes ALL consumers to re-render — making it slow for frequently updated data.

### Limitations of Context

```javascript
// PROBLEM — all consumers re-render when ANY value in context changes
const AppContext = createContext();

function App() {
  const [user, setUser]   = useState(null);
  const [theme, setTheme] = useState("dark");
  const [lang, setLang]   = useState("en");

  return (
    // When user changes → theme consumers also re-render!
    <AppContext.Provider value={{ user, theme, lang, setUser, setTheme, setLang }}>
      <App />
    </AppContext.Provider>
  );
}

// SOLUTION — split into multiple focused contexts
<UserContext.Provider value={{ user, setUser }}>
  <ThemeContext.Provider value={{ theme, setTheme }}>
    <LangContext.Provider value={{ lang, setLang }}>
      <App />
    </LangContext.Provider>
  </ThemeContext.Provider>
</UserContext.Provider>
```

### When to Use Context vs Redux/Zustand

| Situation | Use Context | Use Redux/Zustand |
|-----------|------------|------------------|
| Rarely changing data (auth, theme) | ✅ | ❌ Overkill |
| Frequently changing data | ❌ Performance | ✅ |
| Complex state with many transitions | ❌ Gets messy | ✅ |
| DevTools / time-travel debugging | ❌ | ✅ Redux DevTools |

> 💡 **Interview Tip:** Split contexts by concern — one for auth, one for theme, one for UI state. This way, changing the theme doesn't re-render auth consumers.

</details>

---

<details>
<summary><b>Q48. What is the difference between React and React Native?</b></summary>

> **One-Line Answer:** React is for building web UIs that run in browsers. React Native is for building native mobile apps for iOS and Android using React — same component model, different rendering layer.

### Comparison Table

| Feature | React | React Native |
|---------|-------|-------------|
| Platform | Web (Browser) | iOS & Android |
| Renders | HTML elements (div, p, button) | Native components (View, Text, Button) |
| Styling | CSS / CSS-in-JS | StyleSheet (CSS-like, no cascade) |
| Navigation | React Router | React Navigation |
| Access device features | Browser APIs | Native APIs (camera, GPS) |
| Code sharing | N/A | ~70% shared logic with React web |

```javascript
// React (web)
function App() {
  return (
    <div style={{ padding: 20 }}>
      <p>Hello Web!</p>
      <button onClick={doSomething}>Click</button>
    </div>
  );
}

// React Native (mobile)
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
function App() {
  return (
    <View style={styles.container}>
      <Text>Hello Mobile!</Text>
      <TouchableOpacity onPress={doSomething}>
        <Text>Press</Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({ container: { padding: 20 } });
```

> 💡 **Interview Tip:** React and React Native share the same mental model — components, hooks, state, props. The main difference is the host environment and its native elements.

</details>

---

## 📊 Quick Comparison Tables Reference

### All React Hooks at a Glance

| Hook | Purpose | Returns |
|------|---------|---------|
| `useState` | Local state | `[value, setter]` |
| `useEffect` | Side effects (mount, update, unmount) | Cleanup function |
| `useContext` | Read context value | Context value |
| `useRef` | DOM access or mutable value | `{ current: value }` |
| `useMemo` | Memoize expensive computation | Computed value |
| `useCallback` | Memoize function reference | Stable function |
| `useReducer` | Complex state transitions | `[state, dispatch]` |
| `useLayoutEffect` | DOM measurements before paint | Cleanup function |
| `useId` | Unique ID for accessibility | Unique string |
| `useTransition` | Mark non-urgent state updates | `[isPending, startTransition]` |
| `useDeferredValue` | Defer rendering of low-priority value | Deferred value |

---

### State Management Libraries Comparison

| Library | Size | Setup | Performance | Best For |
|---------|------|-------|-------------|---------|
| Context API | 0kb (built-in) | Low | Slow for frequent updates | Theme, auth, locale |
| Redux Toolkit | ~10kb | High | Optimized | Large enterprise apps |
| Zustand | ~1kb | Very Low | Optimized | Most modern apps |
| Recoil | ~21kb | Medium | Good (atomic) | Fine-grained subscriptions |
| Jotai | ~3kb | Low | Good (atomic) | Minimal atomic state |

---

### API Call Libraries Comparison

| Library | Features | Size | Best For |
|---------|---------|------|---------|
| Fetch (built-in) | Basic HTTP | 0kb | Simple requests |
| Axios | Auto JSON, interceptors, cancel | ~14kb | REST APIs |
| TanStack Query | Caching, background sync, devtools | ~13kb | Server state management |
| SWR | Caching, revalidation | ~4kb | Simple server state |

---

### CSS Approaches Comparison

| Approach | Scoping | Dynamic | Learning Curve | Bundle Size |
|---------|---------|---------|---------------|------------|
| Plain CSS | ❌ Global | Via class toggle | Easy | 0 |
| CSS Modules | ✅ Local | Via class toggle | Easy | 0 |
| Styled Components | ✅ Local | ✅ Props-based | Medium | ~12kb |
| Tailwind CSS | ✅ Utility | Via class toggle | Medium | ~10kb |
| Emotion | ✅ Local | ✅ Props-based | Medium | ~7kb |

---

### React Component Patterns

| Pattern | Use Case | Complexity |
|---------|---------|-----------|
| **Presentational Component** | Display-only, no logic | Low |
| **Container Component** | Manages logic, passes to presentational | Medium |
| **HOC (Higher-Order Component)** | Reusable component logic wrapper | Medium |
| **Render Props** | Share logic via function prop | Medium |
| **Custom Hook** | Reusable stateful logic (modern preferred) | Low-Medium |
| **Compound Component** | Flexible API (like `<Select><Option>`) | High |

---

### JavaScript Array Methods Used in React

| Method | What It Does | Returns | React Use |
|--------|-------------|---------|-----------|
| `.map()` | Transform each element | New array | Render lists |
| `.filter()` | Keep matching elements | New array | Filter data |
| `.reduce()` | Combine into single value | Any | Aggregate data |
| `.find()` | Find first match | Element or undefined | Find by ID |
| `.some()` | Check if any match | Boolean | Permission checks |
| `.every()` | Check if all match | Boolean | Validation |
| `.flat()` | Flatten nested arrays | New array | Normalize data |
| `.includes()` | Check if value exists | Boolean | Active state |

---

*Happy Interview Preparation! ⚛️ — Remember: React is all about thinking in components, managing state, and making the UI declarative.*
