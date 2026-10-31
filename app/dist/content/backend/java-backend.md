# Java Backend Interview Questions

> 80 questions rewritten in a more interview-ready style. Each answer is short, direct, and supported with only simple sample code where it helps.

---

## Table of Contents

- [Java Basics](#java-basics)
- [OOP Concepts](#oop-concepts)
- [Java Keywords](#java-keywords)
- [Strings in Java](#strings-in-java)
- [Java Collections](#java-collections)
- [Java Advanced Concepts](#java-advanced-concepts)
- [Exception Handling](#exception-handling)
- [Multi-threading & Concurrency](#multi-threading--concurrency)
- [Spring Framework](#spring-framework)
- [Bonus Questions](#bonus-questions)
- [Java Internals & Deep Concepts](#java-internals--deep-concepts)
- [Advanced Multi-threading](#advanced-multi-threading)
- [Java Data Structures & Algorithms](#java-data-structures--algorithms)
- [Java 8+ Modern Features](#java-8-modern-features)
- [Java Versions Comparison](#java-versions-comparison)
- [Java Design & Patterns](#java-design--patterns)
- [Java Memory & Performance](#java-memory--performance)
- [Spring Boot & Backend](#spring-boot--backend)
- [Java Best Practices & Miscellaneous](#java-best-practices--miscellaneous)

---

## Java Basics

<details>
<summary><b>Q1. What is Java?</b></summary>

**Interview answer:** Java is a high-level, object-oriented, platform-independent programming language. The main point is that Java code is compiled into bytecode, and that bytecode runs on the JVM, so the same program can run on different operating systems.

**What to say in interview:** Java is popular in backend systems because it is stable, strongly typed, has good memory management, and has a strong ecosystem like Spring.

**Simple sample:**
```java
class Hello {
    public static void main(String[] args) {
        System.out.println("Hello Java");
    }
}
```

</details>

<details>
<summary><b>Q2. What are the main features of Java?</b></summary>

**Interview answer:** The main features are platform independence, object-oriented design, strong type checking, automatic garbage collection, security, multithreading support, and a rich standard library.

**Good interview line:** Java is used heavily in enterprise systems because it gives portability, maintainability, and predictable behavior.

</details>

<details>
<summary><b>Q3. What is the difference between JVM, JRE, and JDK?</b></summary>

**Interview answer:** JVM executes Java bytecode. JRE is the JVM plus runtime libraries required to run Java applications. JDK is the JRE plus development tools like `javac`, `jar`, and `javadoc`.

**Short way to remember:** JDK is for development, JRE is for running, and JVM is the engine that executes bytecode.

</details>

<details>
<summary><b>Q4. What are the data types in Java?</b></summary>

**Interview answer:** Java has 8 primitive data types: `byte`, `short`, `int`, `long`, `float`, `double`, `char`, and `boolean`. It also has reference types like classes, interfaces, arrays, and strings.

**Interview note:** Primitive types store actual values, while reference types store references to objects.

**Simple sample:**
```java
int age = 25;
double salary = 50000.0;
String name = "Alex";
```

</details>

<details>
<summary><b>Q5. What are access modifiers in Java?</b></summary>

**Interview answer:** Access modifiers control visibility. `public` means accessible everywhere, `protected` means same package plus subclasses, default means same package only, and `private` means only inside the same class.

**Good interview point:** We usually keep fields `private` and expose behavior through methods.

</details>

<details>
<summary><b>Q6. What is the difference between == and equals()?</b></summary>

**Interview answer:** `==` compares primitive values directly, but for objects it compares references. `equals()` compares logical content if the class overrides it.

**Simple sample:**
```java
String a = new String("java");
String b = new String("java");

System.out.println(a == b);        // false
System.out.println(a.equals(b));   // true
```

**Important interview point:** If you override `equals()`, you should also override `hashCode()`.

</details>

---

## OOP Concepts

<details>
<summary><b>Q7. What is Inheritance?</b></summary>

**Interview answer:** Inheritance allows one class to acquire properties and behavior from another class using `extends`. It represents an IS-A relationship and helps with code reuse.

**Simple sample:**
```java
class Animal {
    void eat() {}
}

class Dog extends Animal {
    void bark() {}
}
```

**Interview point:** Java supports single inheritance for classes and multiple inheritance through interfaces.

</details>

<details>
<summary><b>Q8. What is Polymorphism?</b></summary>

**Interview answer:** Polymorphism means the same method name can behave differently based on context. In Java, this happens through method overloading at compile time and method overriding at runtime.

**Simple sample:**
```java
class Animal {
    void sound() { System.out.println("Animal sound"); }
}

class Dog extends Animal {
    @Override
    void sound() { System.out.println("Bark"); }
}
```

**Interview point:** Runtime polymorphism is one of the biggest advantages of interface-based design.

</details>

<details>
<summary><b>Q9. What is Abstraction?</b></summary>

**Interview answer:** Abstraction means hiding internal implementation and showing only essential behavior. In Java, we achieve it using abstract classes and interfaces.

**Interview point:** Abstract classes are useful when classes share state or partial implementation. Interfaces are better when you want to define a contract.

</details>

<details>
<summary><b>Q10. What is Encapsulation?</b></summary>

**Interview answer:** Encapsulation means combining data and methods inside a class and restricting direct access to internal state. We normally keep fields `private` and expose public methods for controlled access.

**Simple sample:**
```java
class Account {
    private double balance;

    public void deposit(double amount) {
        if (amount > 0) balance += amount;
    }
}
```

</details>

<details>
<summary><b>Q11. What is the difference between Method Overloading and Method Overriding?</b></summary>

**Interview answer:** Overloading means same method name with different parameter lists in the same class. Overriding means a subclass provides a new implementation of a parent class method with the same signature.

**Interview shortcut:** Overloading is compile-time polymorphism, overriding is runtime polymorphism.

</details>

<details>
<summary><b>Q12. What is a Constructor? What are its types?</b></summary>

**Interview answer:** A constructor initializes an object when it is created. It has the same name as the class and no return type. Common types are default constructor, parameterized constructor, and copy constructor style.

**Simple sample:**
```java
class Person {
    String name;

    Person() {}

    Person(String name) {
        this.name = name;
    }
}
```

**Interview point:** Constructors can be overloaded, but they cannot be overridden.

</details>

---

## Java Keywords

<details>
<summary><b>Q13. What is the this keyword in Java?</b></summary>

**Interview answer:** `this` refers to the current object. It is used to access current object fields, call another constructor in the same class, or return the current object.

**Simple sample:**
```java
class User {
    String name;

    User(String name) {
        this.name = name;
    }
}
```

</details>

<details>
<summary><b>Q14. What is the super keyword in Java?</b></summary>

**Interview answer:** `super` refers to the parent class. It is used to call the parent constructor, parent methods, or parent fields.

**Interview point:** `super()` must be the first statement inside a constructor.

</details>

<details>
<summary><b>Q15. What is the static keyword in Java?</b></summary>

**Interview answer:** `static` means the member belongs to the class, not to an object instance. Static members are shared across all objects.

**Simple sample:**
```java
class Counter {
    static int count = 0;
}
```

**Interview point:** Static methods cannot directly access non-static members.

</details>

<details>
<summary><b>Q16. What is the final keyword in Java?</b></summary>

**Interview answer:** `final` restricts modification. A final variable cannot be reassigned, a final method cannot be overridden, and a final class cannot be extended.

**Interview point:** A final reference cannot point to a new object, but the object itself may still be mutable.

</details>

---

## Strings in Java

<details>
<summary><b>Q17. Why is String immutable in Java?</b></summary>

**Interview answer:** String is immutable for security, thread safety, string pool optimization, and stable hashcode behavior. Once a String object is created, its value cannot change.

**Interview point:** This is why String is safe for keys in `HashMap` and safe to share across threads.

</details>

<details>
<summary><b>Q18. What is the difference between String, StringBuffer, and StringBuilder?</b></summary>

**Interview answer:** `String` is immutable. `StringBuffer` is mutable and thread-safe. `StringBuilder` is mutable and faster but not thread-safe.

**Short interview rule:** Use `String` for fixed text, `StringBuilder` in normal concatenation loops, and `StringBuffer` only when synchronization is required.

**Simple sample:**
```java
StringBuilder sb = new StringBuilder();
sb.append("Java").append(" Backend");
```

</details>

---

## Java Collections

<details>
<summary><b>Q19. What is the difference between List, Set, and Map?</b></summary>

**Interview answer:** `List` stores ordered elements and allows duplicates. `Set` stores unique elements. `Map` stores key-value pairs with unique keys.

**Interview point:** Pick the collection based on behavior, not habit.

</details>

<details>
<summary><b>Q20. What is the difference between ArrayList and LinkedList?</b></summary>

**Interview answer:** `ArrayList` is backed by a dynamic array, so random access is fast. `LinkedList` is backed by nodes, so insertions and deletions at ends are efficient.

**Practical answer:** In real projects, `ArrayList` is used much more often.

</details>

<details>
<summary><b>Q21. What is the difference between HashMap and Hashtable?</b></summary>

**Interview answer:** `HashMap` is not synchronized and allows one null key and multiple null values. `Hashtable` is synchronized, does not allow nulls, and is considered legacy.

**Interview point:** In modern code, use `HashMap` or `ConcurrentHashMap`, not `Hashtable`.

</details>

<details>
<summary><b>Q22. What is the difference between HashMap and HashSet?</b></summary>

**Interview answer:** `HashMap` stores key-value pairs, while `HashSet` stores only unique values. Internally, `HashSet` uses a `HashMap` and stores elements as keys.

**Good interview line:** In `HashSet`, the value part is just a dummy object.

</details>

<details>
<summary><b>Q23. What is the difference between HashSet and TreeSet?</b></summary>

**Interview answer:** `HashSet` gives fast operations and does not maintain order. `TreeSet` keeps elements sorted and uses a tree structure, so operations are slower than `HashSet`.

**Interview point:** Use `TreeSet` only when sorted unique data is required.

</details>

<details>
<summary><b>Q24. What is the difference between Comparable and Comparator?</b></summary>

**Interview answer:** `Comparable` defines the natural ordering inside the class using `compareTo()`. `Comparator` defines custom sorting outside the class using `compare()`.

**Simple sample:**
```java
Collections.sort(list, Comparator.comparing(User::getName));
```

**Interview point:** Use `Comparator` when you need multiple sorting rules.

</details>

<details>
<summary><b>Q25. What is Optional in Java? Why use it?</b></summary>

**Interview answer:** `Optional` is a container that may or may not contain a value. It makes null handling explicit and reduces accidental `NullPointerException`.

**Simple sample:**
```java
Optional<String> name = Optional.ofNullable(getName());
String value = name.orElse("Guest");
```

**Interview point:** `Optional` is best used as a return type, not as a field or method parameter.

</details>

---

## Java Advanced Concepts

<details>
<summary><b>Q26. How does Java work internally? (Compilation to Execution)</b></summary>

**Interview answer:** Java source code is compiled by `javac` into bytecode. The JVM loads that bytecode, verifies it, and executes it. Frequently used code can be optimized by the JIT compiler into native machine code.

**Interview point:** This is the reason Java is called platform independent.

</details>

<details>
<summary><b>Q27. What are the memory areas in JVM?</b></summary>

**Interview answer:** The major JVM memory areas are heap, stack, metaspace, PC register, and native method stack. Heap stores objects, stack stores method frames and local variables, and metaspace stores class metadata.

**Interview point:** `OutOfMemoryError` usually relates to heap, and `StackOverflowError` usually relates to deep or infinite recursion.

</details>

<details>
<summary><b>Q28. What is Garbage Collection? How does it work?</b></summary>

**Interview answer:** Garbage collection automatically removes objects from heap memory when they are no longer reachable. This reduces manual memory management and memory-related bugs.

**Interview point:** GC manages memory, but it does not prevent memory leaks caused by unwanted references.

</details>

<details>
<summary><b>Q29. What are Java 8 features? (Must Know)</b></summary>

**Interview answer:** Major Java 8 features include lambda expressions, Stream API, functional interfaces, `Optional`, method references, default methods in interfaces, and the new Date and Time API.

**Interview point:** For backend interviews, lambda, stream, and `Optional` are the most commonly asked.

</details>

<details>
<summary><b>Q30. What is try-with-resources?</b></summary>

**Interview answer:** Try-with-resources automatically closes resources like files, streams, and database connections after use. It works with classes that implement `AutoCloseable`.

**Simple sample:**
```java
try (BufferedReader br = new BufferedReader(new FileReader("a.txt"))) {
    System.out.println(br.readLine());
}
```

**Interview point:** It is cleaner and safer than manual closing in `finally`.

</details>

---

## Exception Handling

<details>
<summary><b>Q31. What is Exception Handling in Java?</b></summary>

**Interview answer:** Exception handling is a way to handle runtime problems without crashing the application unexpectedly. Java uses `try`, `catch`, `finally`, `throw`, and `throws` for this.

**Interview point:** Checked exceptions must be handled or declared. Unchecked exceptions usually represent programming mistakes.

**Exception handling keywords:**

| Keyword | Purpose | Description |
|---------|---------|-------------|
| `try` | Define risky code | Block that contains code which may cause an exception |
| `catch` | Handle exception | Catches and handles the exception from the `try` block |
| `finally` | Cleanup code | Always executes and is commonly used for cleanup or closing resources |
| `throw` | Manually throw exception | Used to explicitly throw an exception |
| `throws` | Declare exception | Declares exceptions in the method signature |

**Exception types:**

| Type | When Checked | Handling Required | Examples |
|------|--------------|-------------------|----------|
| Checked (Compile-time) | At compile time | Yes (mandatory) | `IOException`, `SQLException` |
| Unchecked (Runtime) | At runtime | No (optional) | `NullPointerException`, `ArithmeticException` |

</details>

---

## Multi-threading & Concurrency

<details>
<summary><b>Q32. What is Multi-threading in Java?</b></summary>

**Interview answer:** Multithreading means running multiple threads within the same process. It improves responsiveness and can improve throughput when tasks can run concurrently.

**Interview point:** Threads share process memory, so synchronization becomes important.

</details>

<details>
<summary><b>Q33. How to create threads in Java? What are the ways?</b></summary>

**Interview answer:** Threads can be created by extending `Thread`, implementing `Runnable`, using lambda expressions, or by submitting tasks to an `ExecutorService`. In production, `ExecutorService` is preferred.

**Simple sample:**
```java
new Thread(() -> System.out.println("Task running")).start();
```

</details>

<details>
<summary><b>Q34. What is the difference between Thread and Process?</b></summary>

**Interview answer:** A process has its own memory space and is heavier. A thread is a lightweight unit inside a process and shares the same memory with other threads in that process.

**Interview point:** Threads are cheaper, but shared memory introduces thread-safety issues.

</details>

<details>
<summary><b>Q35. What is Synchronization? What are thread safety issues?</b></summary>

**Interview answer:** Synchronization controls access to shared resources so that only one thread can enter a critical section at a time. Common thread-safety issues are race conditions, deadlocks, starvation, and visibility problems.

**Simple sample:**
```java
synchronized void increment() {
    count++;
}
```

**Interview point:** For simple counters, `AtomicInteger` is often better than using `synchronized`.

</details>

<details>
<summary><b>Q35A. What is the difference between Concurrency and Parallelism?</b></summary>

**Interview answer:** Concurrency means multiple tasks are in progress at the same time, but not necessarily running simultaneously. Parallelism means multiple tasks are actually executed at the same time, usually on multiple CPU cores.

**One-line answer:** Concurrency is about managing multiple tasks together. Parallelism is about executing multiple tasks simultaneously.

**Simple analogy:** Concurrency is one person handling multiple tasks by switching between them. Parallelism is multiple people doing different tasks at the same time.

**Real-time examples:**
- **Concurrency:** In a mobile app or web app, one request is loading data while another is fetching notifications. The system keeps multiple tasks in progress by switching between them.
- **Practical example:** Typing in WhatsApp while new messages are being received.
- **Parallelism:** In video rendering or heavy data processing, different parts of the workload are processed at the same time on different CPU cores.
- **Practical example:** Downloading multiple large files simultaneously on a machine that can process them in parallel.

**Interview point:** Concurrency improves responsiveness and task coordination. Parallelism improves raw execution speed when hardware can run work side by side.

</details>

---

## Spring Framework

<details>
<summary><b>Q36. What is the difference between RestTemplate and WebClient?</b></summary>

**Interview answer:** `RestTemplate` is the older blocking HTTP client. `WebClient` is the newer non-blocking client introduced with Spring WebFlux and is the preferred choice for modern applications.

**Interview point:** For new development, choose `WebClient`.

</details>

---

## Bonus Questions

<details>
<summary><b>Q37. What is the difference between interface and abstract class?</b></summary>

**Interview answer:** An abstract class can have state, constructors, and both abstract and concrete methods. An interface mainly defines a contract and supports multiple inheritance.

**Interview point:** Use interface for capability and abstract class for shared base behavior.

</details>

<details>
<summary><b>Q38. What is a Functional Interface in Java?</b></summary>

**Interview answer:** A functional interface has exactly one abstract method. It can be implemented using lambda expressions.

**Examples:** `Runnable`, `Comparator`, `Predicate`, `Function`, `Consumer`.

</details>

<details>
<summary><b>Q39. What is the Stream API in Java?</b></summary>

**Interview answer:** Stream API provides a declarative way to process collections. It supports operations like `filter`, `map`, `sorted`, and `collect`.

**Simple sample:**
```java
List<String> result = names.stream()
    .filter(n -> n.startsWith("A"))
    .toList();
```

**Interview point:** Streams do not store data; they process data from a source.

</details>

<details>
<summary><b>Q40. What are all 4 OOP pillars? (Quick Reference)</b></summary>

**Interview answer:** The four pillars are encapsulation, inheritance, polymorphism, and abstraction. Together they help in building modular, reusable, and maintainable systems.

</details>

<details>
<summary><b>Q41. What is a deadlock? How do you prevent it?</b></summary>

**Interview answer:** Deadlock happens when two or more threads wait forever for each other’s locks. Prevention methods include consistent lock ordering, minimizing nested locks, and using `tryLock()` with timeout.

**Interview point:** Deadlock is a design problem, not just a syntax problem.

</details>

<details>
<summary><b>Q42. What are wrapper classes in Java?</b></summary>

**Interview answer:** Wrapper classes convert primitive types into objects, for example `int` to `Integer` and `double` to `Double`. They are needed for collections and generic APIs.

**Interview point:** Java supports autoboxing and unboxing automatically.

</details>

<details>
<summary><b>Q43. What is the volatile keyword in Java?</b></summary>

**Interview answer:** `volatile` ensures that a variable is read from and written to main memory, so changes made by one thread are visible to other threads.

**Interview point:** `volatile` gives visibility, not atomicity.

</details>

<details>
<summary><b>Q44. What is Dependency Injection? How does Spring use it?</b></summary>

**Interview answer:** Dependency Injection means an object receives its dependencies from outside instead of creating them itself. Spring manages this through its IoC container.

**Simple sample:**
```java
@Service
class OrderService {
    private final PaymentService paymentService;

    OrderService(PaymentService paymentService) {
        this.paymentService = paymentService;
    }
}
```

**Interview point:** Constructor injection is the preferred approach.

</details>

<details>
<summary><b>Q45. What is the difference between @Component, @Service, @Repository, @Controller?</b></summary>

**Interview answer:** All are Spring stereotype annotations. `@Component` is generic, `@Service` is for business logic, `@Repository` is for persistence and supports exception translation, and `@Controller` is for web request handling.

**Interview point:** They behave similarly for component scanning, but each one communicates layer intent clearly.

</details>

<details>
<summary><b>Q46. What is the difference between @RequestParam and @PathVariable?</b></summary>

**Interview answer:** `@PathVariable` reads values from the URL path, while `@RequestParam` reads values from query parameters.

**Simple sample:**
```java
@GetMapping("/users/{id}")
User get(@PathVariable Long id) { return null; }
```

</details>

<details>
<summary><b>Q47. What is the difference between HashMap, LinkedHashMap, and TreeMap?</b></summary>

**Interview answer:** `HashMap` does not maintain order, `LinkedHashMap` preserves insertion order, and `TreeMap` keeps keys sorted.

**Interview point:** Choose based on lookup needs and ordering requirements.

</details>

<details>
<summary><b>Q48. What are design patterns? Name the most common ones.</b></summary>

**Interview answer:** Design patterns are proven reusable solutions to common design problems. Common examples are Singleton, Factory, Builder, Strategy, Observer, Adapter, and Decorator.

**Interview point:** In interviews, it is better to explain when to use a pattern than to just list names.

</details>

<details>
<summary><b>Q49. What is the difference between fail-fast and fail-safe iterators?</b></summary>

**Interview answer:** Fail-fast iterators throw `ConcurrentModificationException` if the collection changes during iteration. Fail-safe iterators work on a safe copy or concurrent structure and do not fail immediately.

**Interview examples:** `ArrayList` iterator is fail-fast, `CopyOnWriteArrayList` iterator is fail-safe style.

</details>

<details>
<summary><b>Q50. What is the difference between Stack and Heap memory?</b></summary>

**Interview answer:** Stack memory stores method calls and local variables and is managed per thread. Heap stores objects and is shared across threads and managed by garbage collection.

**Interview point:** Stack is faster and smaller; heap is larger and stores actual objects.

</details>

---

## Java Internals & Deep Concepts

<details>
<summary><b>Q51. What is the difference between shallow copy and deep copy?</b></summary>

**Interview answer:** A shallow copy copies object references, so nested mutable objects are still shared. A deep copy creates new copies of nested objects too.

**Interview point:** Deep copy is needed when complete independence between objects is required.

</details>

<details>
<summary><b>Q52. What is the difference between instance initializer block, static initializer block, and constructor?</b></summary>

**Interview answer:** A static block runs once when the class is loaded. An instance initializer block runs each time an object is created, before the constructor. The constructor then performs object-specific initialization.

**Interview point:** Static block is for class-level setup, constructor is for instance-level setup.

</details>

<details>
<summary><b>Q53. What is covariant return type in Java?</b></summary>

**Interview answer:** Covariant return type means an overriding method can return a more specific type than the method in the parent class.

**Simple sample:**
```java
class Animal {}
class Dog extends Animal {}
```

**Interview point:** It makes APIs cleaner and reduces casting.

</details>

<details>
<summary><b>Q54. What is the difference between abstract class and interface with default methods (Java 8+)?</b></summary>

**Interview answer:** Even after default methods, interfaces still cannot hold normal instance state like abstract classes can. Abstract classes also support constructors and richer shared implementation.

**Interview point:** Default methods were introduced mainly for backward compatibility.

</details>

<details>
<summary><b>Q55. What is method hiding in Java?</b></summary>

**Interview answer:** Method hiding happens when a subclass defines a static method with the same signature as a static method in the parent class. Static methods are resolved by reference type, not actual object type.

**Interview point:** Static methods are hidden, not overridden.

</details>

<details>
<summary><b>Q56. What is the instanceof operator?</b></summary>

**Interview answer:** `instanceof` checks whether an object belongs to a class or interface type. It is commonly used before casting.

**Simple sample:**
```java
if (obj instanceof String s) {
    System.out.println(s.length());
}
```

**Interview point:** Pattern matching with `instanceof` reduces explicit casting.

</details>

<details>
<summary><b>Q57. What is var (local variable type inference) in Java 10+?</b></summary>

**Interview answer:** `var` lets the compiler infer the type of a local variable. It reduces boilerplate but does not make Java dynamically typed.

**Interview point:** Use it where the type is obvious; avoid it where readability gets worse.

</details>

---

## Advanced Multi-threading

<details>
<summary><b>Q58. What is the difference between synchronized and ReentrantLock?</b></summary>

**Interview answer:** `synchronized` is simpler and handled by the JVM. `ReentrantLock` is more flexible and supports features like `tryLock`, fairness policy, and interruptible locking.

**Interview point:** Use `ReentrantLock` when advanced lock control is needed.

</details>

<details>
<summary><b>Q59. What is ExecutorService and thread pool?</b></summary>

**Interview answer:** `ExecutorService` manages a pool of worker threads and runs tasks without creating a new thread for every task. This improves performance and resource management.

**Simple sample:**
```java
ExecutorService pool = Executors.newFixedThreadPool(4);
pool.submit(() -> System.out.println("run"));
pool.shutdown();
```

**Interview point:** Always shut down the executor.

</details>

<details>
<summary><b>Q60. What is the difference between Callable and Runnable?</b></summary>

**Interview answer:** `Runnable` does not return a value and cannot throw checked exceptions. `Callable` returns a value and can throw checked exceptions.

**Interview point:** `Callable` is used with `Future` when you need a result.

</details>

<details>
<summary><b>Q61. What is CompletableFuture in Java?</b></summary>

**Interview answer:** `CompletableFuture` is a modern async API for running tasks, chaining operations, combining results, and handling errors without blocking in a simple way.

**Simple sample:**
```java
CompletableFuture.supplyAsync(() -> "Java")
    .thenApply(v -> v + " Backend");
```

**Interview point:** It is more powerful than `Future` because it supports chaining and composition.

</details>

---

## Java Data Structures & Algorithms

<details>
<summary><b>Q62. What is a Stack in Java? How to implement it?</b></summary>

**Interview answer:** A stack follows LIFO, which means last in, first out. In modern Java, `ArrayDeque` is usually preferred over the old `Stack` class.

**Simple sample:**
```java
Deque<Integer> stack = new ArrayDeque<>();
stack.push(10);
stack.pop();
```

</details>

<details>
<summary><b>Q63. What is a Queue in Java? What are its implementations?</b></summary>

**Interview answer:** A queue follows FIFO, which means first in, first out. Common implementations are `LinkedList`, `ArrayDeque`, `PriorityQueue`, and blocking queues for concurrent use.

**Interview point:** Use `PriorityQueue` when order should depend on priority rather than insertion.

</details>

<details>
<summary><b>Q64. What is the difference between Iterator and ListIterator?</b></summary>

**Interview answer:** `Iterator` moves only forward and works with most collections. `ListIterator` works only with lists and can move both forward and backward, and can also update elements.

**Interview point:** Use `Iterator.remove()` when removing safely during iteration.

</details>

<details>
<summary><b>What is DSA?</b></summary>

**Data Structures** = How data is stored  
**Algorithms** = How data is processed

**Interview line:** "Data Structures organize data efficiently, and Algorithms define how to process it. In Java, we commonly use arrays, lists, sets, maps, and trees along with algorithms like searching, sorting, and recursion."

</details>

<details>
<summary><b>Data Structures Overview</b></summary>

| Structure | Key Point | Use Case |
|-----------|-----------|----------|
| Array | Fixed size, fast access O(1) | Simple storage |
| ArrayList | Fast read, slow insert/delete | Dynamic list |
| LinkedList | Fast insert/delete, slow access | Frequent modifications |
| Stack | LIFO (Last In First Out) | Undo, recursion |
| Queue | FIFO (First In First Out) | Scheduling, BFS |
| HashSet | No duplicates, fastest | Unique elements |
| TreeSet | No duplicates, sorted | Sorted unique elements |
| HashMap | Key-value, fast O(1) | Data mapping |
| TreeMap | Key-value, sorted | Sorted key-value |
| Tree | Hierarchical structure | Binary Tree, BST |
| Graph | Nodes + edges | Routing, social networks |

</details>

<details>
<summary><b>Common Algorithms</b></summary>

#### Searching Algorithms

| Algorithm | How it works | Complexity |
|-----------|--------------|------------|
| Linear Search | Check one by one | O(n) |
| Binary Search | Sorted array, divide in half | O(log n) |

#### Sorting Algorithms

| Algorithm | Complexity | Notes |
|-----------|------------|-------|
| Bubble Sort | O(n²) | Simple but slow |
| Selection Sort | O(n²) | Simple but slow |
| Insertion Sort | O(n²) | Good for small data |
| Merge Sort | O(n log n) | Stable, divide & conquer |
| Quick Sort | O(n log n) | Fast, in-place |

#### Key Techniques

| Technique | Use Case |
|-----------|----------|
| Recursion | Function calling itself (factorial, fibonacci) |
| Sliding Window | Subarray/substring problems |
| Two Pointer | Sorted array problems |
| Hashing | Fast lookup with HashMap |

**Recursion sample:**
```java
int factorial(int n) {
    if (n == 1) return 1;
    return n * factorial(n - 1);
}
```

</details>

<details>
<summary><b>Time Complexity (Must Know)</b></summary>

| Operation | Complexity |
|-----------|------------|
| Array access | O(1) |
| Array search | O(n) |
| Binary search | O(log n) |
| HashMap get/put | O(1) |
| TreeMap get/put | O(log n) |
| ArrayList add | O(1) amortized |
| LinkedList add | O(1) |

</details>

<details>
<summary><b>Important Problems (Must Prepare)</b></summary>

- Reverse string
- Find duplicates
- 2nd largest number
- Two sum
- Palindrome check
- Merge two arrays
- Remove duplicates

</details>

<details>
<summary><b>Quick DSA Revision</b></summary>

| Structure | One-liner |
|-----------|-----------|
| Array | Fast access, fixed size |
| List | Dynamic, ordered |
| Set | Unique elements |
| Map | Key-value pairs |
| Stack | LIFO |
| Queue | FIFO |

</details>

---

## Java 8+ Modern Features

<details>
<summary><b>Q65. What are Method References in Java 8?</b></summary>

**Interview answer:** Method references are a shorter way to write lambdas when the lambda only calls an existing method.

**Simple sample:**
```java
names.forEach(System.out::println);
```

**Interview point:** They improve readability when used in the right place.

</details>

<details>
<summary><b>Q66. What are default and static methods in Java 8 interfaces?</b></summary>

**Interview answer:** Default methods let interfaces include method implementations. Static methods in interfaces are utility methods that are called on the interface itself.

**Interview point:** Default methods were added to evolve interfaces without breaking old implementations.

</details>

<details>
<summary><b>Q67. What is the new Date and Time API in Java 8?</b></summary>

**Interview answer:** Java 8 introduced the `java.time` API, including classes like `LocalDate`, `LocalTime`, `LocalDateTime`, and `ZonedDateTime`. These classes are immutable and thread-safe.

**Interview point:** Prefer `java.time` over old `Date` and `Calendar` APIs.

</details>

<details>
<summary><b>Q68. What are Streams — parallel streams vs sequential streams?</b></summary>

**Interview answer:** Sequential streams process data in a single thread. Parallel streams split work across multiple threads. Parallel streams can improve performance for large CPU-bound tasks, but they add overhead and need thread-safe operations.

**Interview point:** Do not use parallel streams blindly. Benchmark and verify the workload first.

</details>

---

## Java Versions Comparison

<details>
<summary><b>📊 Java 8 vs 17 vs 21 Comparison</b></summary>

**🎤 Interview Explanation (Best Answer)**

"Java has evolved significantly across versions.

In Java 8, the focus was on introducing functional programming features like lambda expressions and the Stream API, which made code more concise and easier to process collections.

In Java 17, the focus shifted to improving code readability and maintainability. Features like records reduced boilerplate code, sealed classes controlled inheritance, and pattern matching made type checking cleaner.

In Java 21, the main focus is on performance and scalability, especially with concurrency improvements like virtual threads, which allow handling a large number of tasks efficiently.

So overall, Java 8 introduced modern coding style, Java 17 improved developer productivity, and Java 21 enhances performance for scalable applications."

**📊 Quick Backup Table (if they ask more)**

| Version | What to Say in One Line |
|---------|-------------------------|
| Java 8  | Introduced lambdas & streams |
| Java 17 | Cleaner code (records, pattern matching) |
| Java 21 | Better concurrency (virtual threads) |

**💡 Pro Tips (important)**  
- Don't list 10 features ❌  
- Focus on "purpose of each version" ✅  
- Speak like a story (evolution)

Understanding different Java versions is crucial for backend development, as newer versions offer better performance, cleaner code, and modern features. Here's a quick comparison of major LTS versions:

📊 Java 8 vs 17 vs 21 (Easy Version)

| Category       | Java 8                     | Java 17                    | Java 21                          |
|----------------|----------------------------|----------------------------|----------------------------------|
| Main Focus     | Functional programming     | Modern Java features       | High performance & concurrency   |
| Key Feature 1  | Lambda (→)                 | Records (data class)       | Virtual Threads 🚀               |
| Key Feature 2  | Streams (filter/map)       | Sealed Classes             | Structured Concurrency          |
| Key Feature 3  | Functional Interfaces      | Pattern Matching           | Scoped Values                    |
| Code Style     | More boilerplate           | Cleaner code               | More scalable                    |
| Performance    | Normal                     | Better                     | Very High                        |
| Use Case       | Old/legacy apps            | Most current projects      | Future / high-scale apps         |

**Interview tip:** Java 17 is the current LTS for most production systems. Java 21 introduces virtual threads for better concurrency, making it ideal for high-throughput backend services.

</details>

---

## Java Design & Patterns

<details>
<summary><b>Q69. What is the Builder Pattern? When to use it?</b></summary>

**Interview answer:** Builder Pattern is used to create complex objects step by step, especially when there are many optional fields. It improves readability and avoids long constructors.

**Interview point:** It is common in DTOs, config objects, and immutable objects.

</details>

<details>
<summary><b>Q70. What is the Singleton Pattern? How to make it thread-safe?</b></summary>

**Interview answer:** Singleton ensures only one instance of a class exists. A thread-safe implementation can be done using eager initialization, double-checked locking with `volatile`, or an enum singleton.

**Interview point:** In Java, enum-based singleton is often considered the safest and cleanest approach.

</details>

<details>
<summary><b>Q71. What is the Observer Pattern in Java?</b></summary>

**Interview answer:** Observer Pattern allows one object to notify multiple dependent objects automatically when its state changes.

**Interview point:** In Spring, event publishing and listeners are common practical examples.

</details>

---

## Java Memory & Performance

<details>
<summary><b>Q72. What is memory leak in Java? How to prevent it?</b></summary>

**Interview answer:** A memory leak in Java happens when objects are no longer needed but are still referenced, so garbage collection cannot remove them.

**Interview point:** Common causes are static collections, unclosed resources, listeners not removed, and improper `ThreadLocal` usage.

</details>

<details>
<summary><b>Q73. What is String interning in Java?</b></summary>

**Interview answer:** String interning stores one shared copy of identical strings in the string pool. Calling `intern()` returns the pooled string reference.

**Interview point:** It can save memory when many identical strings exist, but it should be used carefully.

</details>

---

## Spring Boot & Backend

<details>
<summary><b>Q74. What is Spring Boot Auto-configuration?</b></summary>

**Interview answer:** Auto-configuration means Spring Boot automatically configures beans based on the dependencies present on the classpath. It reduces manual configuration and helps applications start quickly.

**Interview point:** It follows convention over configuration.

</details>

<details>
<summary><b>Q75. What are Spring Boot Actuator endpoints?</b></summary>

**Interview answer:** Actuator endpoints expose operational information such as health, metrics, beans, mappings, and environment properties. They are useful for monitoring and production support.

**Interview point:** Expose only needed endpoints in production and secure sensitive ones.

</details>

<details>
<summary><b>Q76. What is the difference between @Bean and @Component?</b></summary>

**Interview answer:** `@Component` is placed on a class and discovered by component scanning. `@Bean` is placed on a method in a configuration class and is used when you want explicit control over bean creation.

**Interview point:** Use `@Bean` often for third-party classes you cannot annotate directly.

</details>

<details>
<summary><b>Q77. What is Spring Bean Scope?</b></summary>

**Interview answer:** Bean scope defines how many instances Spring creates and how long they live. Common scopes are singleton, prototype, request, and session.

**Interview point:** Singleton is the default scope in Spring.

</details>

---

## Java Best Practices & Miscellaneous

<details>
<summary><b>Q78. What is the difference between checked and runtime exceptions? When to use which?</b></summary>

**Interview answer:** Checked exceptions represent recoverable conditions and must be handled or declared. Runtime exceptions usually represent programming mistakes and do not need explicit handling.

**Interview point:** Use checked exceptions when the caller can realistically recover.

</details>

<details>
<summary><b>Q79. What is the difference between mutable and immutable objects? How to create an immutable class?</b></summary>

**Interview answer:** Mutable objects can change after creation. Immutable objects cannot. To create an immutable class, make the class final, fields private and final, initialize them through the constructor, avoid setters, and return defensive copies for mutable fields.

**Interview point:** Immutable classes are naturally thread-safe.

</details>

<details>
<summary><b>Q80. What is the difference between transient, volatile, and synchronized?</b></summary>

**Interview answer:** `transient` skips a field during serialization, `volatile` ensures visibility of a variable across threads, and `synchronized` controls access to a block or method to ensure thread safety.

**Interview point:** They solve completely different problems, so they should not be confused.

</details>

---

## Quick Interview Revision

### Collections summary

| Topic | Short answer |
|------|--------------|
| List | Ordered, duplicates allowed |
| Set | Unique values only |
| Map | Key-value pairs |
| HashMap | Fast lookup, no order |
| LinkedHashMap | Insertion order |
| TreeMap | Sorted by key |

### String summary

| Type | Key point |
|------|-----------|
| String | Immutable |
| StringBuilder | Mutable, fast, not thread-safe |
| StringBuffer | Mutable, thread-safe |

### OOP summary

| Pillar | Meaning |
|-------|---------|
| Encapsulation | Hide internal state |
| Inheritance | Reuse parent behavior |
| Polymorphism | One interface, many forms |
| Abstraction | Hide implementation details |

### Concurrency summary

| Topic | Key point |
|------|-----------|
| synchronized | Mutual exclusion |
| volatile | Visibility only |
| AtomicInteger | Lock-free atomic updates |
| ExecutorService | Manages thread pools |
| CompletableFuture | Async task composition |

### Spring summary

| Topic | Key point |
|------|-----------|
| DI | Objects receive dependencies from outside |
| @Component | Generic bean |
| @Service | Business layer bean |
| @Repository | Persistence layer bean |
| @Controller | Web layer bean |
| WebClient | Modern HTTP client |

---

Use these answers as spoken interview answers first. If the interviewer asks for more detail, then add one example or one real-world use case.

<details>
<summary><b>ArrayList vs LinkedList summary</b></summary>

| Feature        | ArrayList               | LinkedList            |
| -------------- | ----------------------- | --------------------- |
| Data Structure | Dynamic Array           | Doubly Linked List    |
| Access (get)   | Fast ⚡ O(1)             | Slow ❌ O(n)           |
| Insertion      | Slow (shift elements) ❌ | Fast (no shifting) ✅  |
| Deletion       | Slow ❌                  | Fast ✅                |
| Memory         | Less                    | More (extra pointers) |
| Traversal      | Faster                  | Slower                |

</details>

<details>
<summary><b>HashMap vs HashSet summary</b></summary>

| Feature        | HashMap                            | HashSet              |
| -------------- | ---------------------------------- | -------------------- |
| Structure      | Key-Value pairs                    | Only values          |
| Duplicate      | No duplicate keys                  | No duplicate values  |
| Storage        | Stores pairs (key → value)         | Stores only elements |
| Null allowed   | 1 null key + multiple null values  | 1 null value         |
| Use case       | Data mapping                       | Unique elements      |

</details>

<details>
<summary><b>ArrayList vs Vector summary</b></summary>

| Feature         | ArrayList          | Vector                 |
| --------------- | ------------------ | ---------------------- |
| Thread-safe     | ❌ No              | ✅ Yes (synchronized)  |
| Performance     | Fast ⚡            | Slower ❌              |
| Synchronization | Not synchronized   | Fully synchronized     |
| Usage           | Modern apps        | Legacy                 |

**Interview line:** "ArrayList is not synchronized and faster, whereas Vector is synchronized and thread-safe but slower. Vector is mostly considered legacy."

</details>

<details>
<summary><b>HashSet vs LinkedHashSet vs TreeSet summary</b></summary>

| Feature     | HashSet       | LinkedHashSet      | TreeSet             |
| ----------- | ------------- | ------------------ | ------------------- |
| Order       | No order      | Insertion order    | Sorted order        |
| Performance | Fastest ⚡    | Slightly slower    | Slowest             |
| Null        | Allows 1 null | Allows 1 null      | ❌ No null          |
| Structure   | Hash table    | Hash + Linked list | Tree (Red-Black)    |

**Interview line:** "HashSet stores unique elements without order, LinkedHashSet maintains insertion order, and TreeSet stores elements in sorted order."

</details>

<details>
<summary><b>HashMap vs TreeMap summary</b></summary>

| Feature     | HashMap        | TreeMap            |
| ----------- | -------------- | ------------------ |
| Order       | No order       | Sorted by key      |
| Performance | Faster ⚡ O(1) | Slower O(log n)    |
| Null Key    | 1 null allowed | ❌ No null key     |
| Structure   | Hash table     | Red-Black Tree     |

**Interview line:** "HashMap is faster and does not maintain order, while TreeMap stores keys in sorted order but is slower."

</details>

<details>
<summary><b>HashMap vs LinkedHashMap summary</b></summary>

| Feature     | HashMap    | LinkedHashMap      |
| ----------- | ---------- | ------------------ |
| Order       | No order   | Insertion order    |
| Performance | Faster ⚡  | Slightly slower    |
| Structure   | Hash table | Hash + Linked list |

**Interview line:** "HashMap does not maintain order, whereas LinkedHashMap maintains insertion order using a linked list."

</details>
