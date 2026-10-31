# Database

> **Note:** Interview Tips are highlighted in <span style="color: #007acc;">blue</span> for easy identification.
> **Accordion Feature:** Each question can be made collapsible by wrapping in `<details><summary>Question Title</summary> content </details>`.

<details><summary>🗄️ Database Interview Preparation Guide</summary>

<details><summary style="font-size: 1.3em; font-weight: bold;">Normalization</summary>

Normalization is the process of organizing data in a database to reduce redundancy and improve data integrity by dividing data into related tables. It follows normal forms (1NF, 2NF, 3NF, BCNF, 4NF, 5NF) to eliminate data anomalies.

### Normal Forms Explained:

#### 1NF (First Normal Form)
- **Rule**: Eliminate repeating groups and ensure atomic values
- **Problem Solved**: Repeating columns or multi-valued attributes
- **Example**: Instead of `phone_numbers: "123-456,789-012"` → Separate Phone table

#### 2NF (Second Normal Form)
- **Rule**: Remove partial dependencies (non-key attributes depend on part of composite key)
- **Problem Solved**: Partial dependencies
- **Example**: In `OrderDetails(order_id, product_id, order_date, product_name)` → `order_date` depends only on `order_id`, so move to Orders table

#### 3NF (Third Normal Form)
- **Rule**: Remove transitive dependencies (non-key depends on another non-key)
- **Problem Solved**: Transitive dependencies
- **Example**: In `Employee(emp_id, dept_id, dept_name, location)` → `dept_name` depends on `dept_id`, not directly on `emp_id`

### Practical Example:
**Unnormalized Table:**
```
Students: student_id, name, courses (Math, Science, History), teacher_names (John, Mary, Bob)
```

**After Normalization:**
- **Students**: student_id (PK), name
- **Courses**: course_id (PK), course_name, teacher_id (FK)
- **Enrollments**: student_id (FK), course_id (FK), enrollment_date

### Interview Explanation:
"Normalization is about organizing data to eliminate redundancy and anomalies. I follow the normal forms progressively: 1NF for atomic values, 2NF to remove partial dependencies, 3NF for transitive dependencies. In practice, I balance normalization with performance - sometimes denormalization is needed for read-heavy systems. For example, in an e-commerce system, I normalize customer and order data but might denormalize product categories for faster queries."

**Interview Tip:** Normalization reduces data duplication and anomalies. Balance with performance - denormalize for read-heavy systems.

</details>

<details><summary style="font-size: 1.3em; font-weight: bold;">Primary key vs Foreign key</summary>

A primary key uniquely identifies a record in a table, while a foreign key establishes a relationship by referencing the primary key of another table.

### Primary key
Key points:
- Must be unique
- Cannot be NULL
- Only one primary key per table
- Ensures entity integrity

Example:
```sql
CREATE TABLE Users (
    user_id INT PRIMARY KEY,
    name VARCHAR(50)
);
```

### Foreign Key
A Foreign Key is a column that refers to the primary key of another table.
Key points:
- Can have duplicate values
- Can be NULL (unless restricted)
- A table can have multiple foreign keys
- Ensures referential integrity

Example:
```sql
CREATE TABLE Orders (
    order_id INT PRIMARY KEY,
    user_id INT,
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
);
```

**Interview Tip:** Primary key unique per table, foreign key links tables.

</details>

<details><summary style="font-size: 1.3em; font-weight: bold;">SQL Commands: DDL, DML, DCL, TCL</summary>

SQL commands are categorized based on their functionality:

### DDL (Data Definition Language)
Used to define/modify database structure. Auto-committed, can't be rolled back.

```sql
-- Create table
CREATE TABLE Users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Alter table
ALTER TABLE Users ADD COLUMN phone VARCHAR(20);
ALTER TABLE Users DROP COLUMN phone;
ALTER TABLE Users MODIFY COLUMN name VARCHAR(150);

-- Drop table
DROP TABLE Users;

-- Create index
CREATE INDEX idx_user_email ON Users(email);

-- Create view
CREATE VIEW ActiveUsers AS
SELECT * FROM Users WHERE status = 'ACTIVE';
```

### DML (Data Manipulation Language)
Used to manipulate data. Can be rolled back.

```sql
-- Insert data
INSERT INTO Users (name, email) VALUES ('John Doe', 'john@example.com');
INSERT INTO Users (name, email) VALUES
('Jane Smith', 'jane@example.com'),
('Bob Wilson', 'bob@example.com');

-- Update data
UPDATE Users SET name = 'John Smith' WHERE id = 1;

-- Delete data
DELETE FROM Users WHERE id = 1;

-- Select data
SELECT * FROM Users;
SELECT name, email FROM Users WHERE id = 1;
```

### DCL (Data Control Language)
Controls access to data.

```sql
-- Grant permissions
GRANT SELECT, INSERT ON Users TO 'app_user'@'localhost';
GRANT ALL PRIVILEGES ON mydb.* TO 'admin'@'%';

-- Revoke permissions
REVOKE INSERT ON Users FROM 'app_user'@'localhost';
```

### TCL (Transaction Control Language)
Manages transactions.

```sql
-- Start transaction
START TRANSACTION;

-- Commit changes
COMMIT;

-- Rollback changes
ROLLBACK;

-- Savepoint
SAVEPOINT sp1;
ROLLBACK TO sp1;
```

### Interview Explanation:
"SQL commands are divided into four categories: DDL for structure (CREATE, ALTER, DROP), DML for data manipulation (SELECT, INSERT, UPDATE, DELETE), DCL for permissions (GRANT, REVOKE), and TCL for transactions (COMMIT, ROLLBACK). DDL commands are auto-committed and define the schema, while DML operations can be rolled back. In interviews, I emphasize that DDL changes structure permanently, while DML changes can be undone."

**Interview Tip:** DDL defines structure (auto-committed), DML manipulates data (rollback possible), DCL controls access, TCL manages transactions.

</details>

<details><summary style="font-size: 1.3em; font-weight: bold;">Aggregate Functions & GROUP BY</summary>

Aggregate functions perform calculations on groups of rows and return single values.

### Common Aggregate Functions:
```sql
-- Count rows
SELECT COUNT(*) FROM Users;
SELECT COUNT(DISTINCT department) FROM Employees;

-- Sum values
SELECT SUM(salary) FROM Employees;
SELECT SUM(salary) FROM Employees WHERE department = 'IT';

-- Average
SELECT AVG(salary) FROM Employees;

-- Minimum/Maximum
SELECT MIN(salary), MAX(salary) FROM Employees;

-- Grouped aggregates
SELECT department, COUNT(*), AVG(salary), SUM(salary)
FROM Employees
GROUP BY department;

-- With HAVING (filter groups)
SELECT department, AVG(salary), COUNT(*)
FROM Employees
GROUP BY department
HAVING AVG(salary) > 50000
ORDER BY AVG(salary) DESC;
```

### GROUP BY with ROLLUP/CUBE:
```sql
-- ROLLUP: Hierarchical subtotals
SELECT department, job_title, SUM(salary)
FROM Employees
GROUP BY ROLLUP(department, job_title);

-- CUBE: All possible combinations
SELECT department, job_title, SUM(salary)
FROM Employees
GROUP BY CUBE(department, job_title);
```

### Interview Explanation:
"Aggregate functions like COUNT, SUM, AVG, MIN, MAX operate on groups of rows. GROUP BY creates these groups, and HAVING filters the groups (like WHERE for aggregates). For example, to find average salary by department, I use `SELECT department, AVG(salary) FROM Employees GROUP BY department`. I always mention that GROUP BY columns must appear in SELECT or be aggregated."

**Interview Tip:** GROUP BY creates groups, aggregate functions calculate per group. Use HAVING to filter groups, WHERE to filter rows.

</details>

<details><summary style="font-size: 1.3em; font-weight: bold;">Subqueries & Common Table Expressions (CTEs)</summary>

Subqueries are queries nested inside other queries. CTEs provide readable way to write complex queries.

### Subqueries:
```sql
-- Scalar subquery (returns single value)
SELECT name FROM Users
WHERE department_id = (SELECT id FROM Departments WHERE name = 'IT');

-- IN subquery (returns multiple values)
SELECT name FROM Users
WHERE id IN (SELECT user_id FROM Orders WHERE total > 1000);

-- EXISTS subquery (checks existence)
SELECT name FROM Users u
WHERE EXISTS (SELECT 1 FROM Orders o WHERE o.user_id = u.id);

-- Correlated subquery
SELECT name, (
    SELECT COUNT(*) FROM Orders
    WHERE Orders.user_id = Users.id
) as order_count
FROM Users;
```

### Common Table Expressions (CTEs):
```sql
-- Simple CTE
WITH HighValueOrders AS (
    SELECT * FROM Orders WHERE total > 1000
)
SELECT u.name, hvo.total
FROM Users u
JOIN HighValueOrders hvo ON u.id = hvo.user_id;

-- Recursive CTE (for hierarchical data)
WITH RECURSIVE EmployeeHierarchy AS (
    -- Base case
    SELECT id, name, manager_id, 0 as level
    FROM Employees
    WHERE manager_id IS NULL

    UNION ALL

    -- Recursive case
    SELECT e.id, e.name, e.manager_id, eh.level + 1
    FROM Employees e
    JOIN EmployeeHierarchy eh ON e.manager_id = eh.id
)
SELECT * FROM EmployeeHierarchy;
```

### Interview Explanation:
"Subqueries nest queries inside other queries - scalar for single values, IN for multiple values, EXISTS for existence checks. CTEs (WITH clauses) make complex queries readable by breaking them into logical parts. For example, I use CTEs for recursive queries like organizational hierarchies or complex aggregations. CTEs are more readable than subqueries and can be referenced multiple times."

**Interview Tip:** Use CTEs for complex queries, subqueries for simple cases. CTEs are more readable and can be recursive.

</details>

<details><summary style="font-size: 1.3em; font-weight: bold;">Views, Stored Procedures & Triggers</summary>

### Views:
Virtual tables based on SELECT queries. Simplify complex queries and provide security.

```sql
-- Create view
CREATE VIEW UserOrderSummary AS
SELECT
    u.name,
    u.email,
    COUNT(o.id) as total_orders,
    SUM(o.total) as total_spent,
    AVG(o.total) as avg_order_value
FROM Users u
LEFT JOIN Orders o ON u.id = o.user_id
GROUP BY u.id, u.name, u.email;

-- Use view
SELECT * FROM UserOrderSummary WHERE total_spent > 1000;

-- Updateable view (simple cases)
UPDATE UserOrderSummary SET name = 'John Smith' WHERE name = 'John Doe';
```

### Stored Procedures:
Precompiled SQL code stored in database. Improve performance and security.

```sql
DELIMITER //

CREATE PROCEDURE CreateUser(
    IN p_name VARCHAR(100),
    IN p_email VARCHAR(100),
    OUT p_user_id INT
)
BEGIN
    INSERT INTO Users (name, email, created_at)
    VALUES (p_name, p_email, NOW());

    SET p_user_id = LAST_INSERT_ID();
END //

DELIMITER ;

-- Call procedure
CALL CreateUser('Alice Johnson', 'alice@example.com', @user_id);
SELECT @user_id;
```

### Triggers:
Automatically execute when specific events occur (INSERT, UPDATE, DELETE).

```sql
-- Audit trigger
CREATE TRIGGER audit_user_changes
AFTER UPDATE ON Users
FOR EACH ROW
BEGIN
    INSERT INTO UserAudit (user_id, old_name, new_name, changed_at)
    VALUES (OLD.id, OLD.name, NEW.name, NOW());
END;

-- Prevent negative balance
CREATE TRIGGER check_balance
BEFORE UPDATE ON Accounts
FOR EACH ROW
BEGIN
    IF NEW.balance < 0 THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Balance cannot be negative';
    END IF;
END;
```

### Interview Explanation:
"Views are virtual tables for simplifying queries and security. Stored procedures encapsulate business logic in the database, improving performance through precompilation and reducing network traffic. Triggers automatically enforce business rules or audit changes. I use views for complex joins, procedures for multi-step operations, and triggers for automatic auditing or constraint enforcement."

**Interview Tip:** Views for query simplification, procedures for business logic, triggers for automatic actions. Use carefully to avoid performance issues.

</details>

<details><summary style="font-size: 1.3em; font-weight: bold;">Database Constraints</summary>

Constraints enforce data integrity rules at database level.

### Types of Constraints:

#### Primary Key Constraint:
```sql
-- Single column
CREATE TABLE Users (
    id INT PRIMARY KEY,
    name VARCHAR(100)
);

-- Composite primary key
CREATE TABLE OrderItems (
    order_id INT,
    product_id INT,
    quantity INT,
    PRIMARY KEY (order_id, product_id)
);
```

#### Foreign Key Constraint:
```sql
CREATE TABLE Orders (
    id INT PRIMARY KEY,
    user_id INT,
    FOREIGN KEY (user_id) REFERENCES Users(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);
```

#### Unique Constraint:
```sql
CREATE TABLE Users (
    id INT PRIMARY KEY,
    email VARCHAR(100) UNIQUE,
    phone VARCHAR(20)
);

-- Named constraint
ALTER TABLE Users ADD CONSTRAINT uk_user_phone UNIQUE (phone);
```

#### Check Constraint:
```sql
CREATE TABLE Products (
    id INT PRIMARY KEY,
    name VARCHAR(100),
    price DECIMAL(10,2) CHECK (price > 0),
    stock INT CHECK (stock >= 0)
);

-- Age constraint
CREATE TABLE Users (
    id INT PRIMARY KEY,
    name VARCHAR(100),
    age INT CHECK (age >= 18 AND age <= 120)
);
```

#### Not Null Constraint:
```sql
CREATE TABLE Users (
    id INT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL
);
```

### Interview Explanation:
"Constraints enforce data integrity: PRIMARY KEY for uniqueness and not null, FOREIGN KEY for relationships, UNIQUE for non-primary uniqueness, CHECK for business rules, NOT NULL for required fields. For example, I use CHECK constraints to ensure positive prices or valid age ranges. Foreign key constraints with CASCADE options automatically handle related data when parent records change."

**Interview Tip:** Use constraints for data integrity. Primary keys ensure uniqueness, foreign keys maintain relationships, check constraints enforce business rules.

</details>

<details><summary style="font-size: 1.3em; font-weight: bold;">Transactions & Isolation Levels</summary>

Transactions group multiple operations into single unit that either succeeds or fails completely.

### ACID Properties:
- **Atomicity**: All or nothing
- **Consistency**: Valid state transitions
- **Isolation**: Concurrent transactions don't interfere
- **Durability**: Changes persist after commit

### Transaction Commands:
```sql
-- Start transaction
START TRANSACTION;

-- Execute operations
UPDATE Accounts SET balance = balance - 100 WHERE id = 1;
UPDATE Accounts SET balance = balance + 100 WHERE id = 2;

-- Commit or rollback
COMMIT;    -- Save changes
ROLLBACK;  -- Undo changes
```

### Isolation Levels (SQL Standard):
```sql
-- Set isolation level
SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED;
SET TRANSACTION ISOLATION LEVEL READ COMMITTED;
SET TRANSACTION ISOLATION LEVEL REPEATABLE READ;
SET TRANSACTION ISOLATION LEVEL SERIALIZABLE;
```

#### Isolation Level Comparison:
| Level | Dirty Read | Non-repeatable Read | Phantom Read | Performance |
|-------|------------|---------------------|--------------|-------------|
| Read Uncommitted | ✅ Possible | ✅ Possible | ✅ Possible | Fastest |
| Read Committed | ❌ Prevented | ✅ Possible | ✅ Possible | Fast |
| Repeatable Read | ❌ Prevented | ❌ Prevented | ✅ Possible | Medium |
| Serializable | ❌ Prevented | ❌ Prevented | ❌ Prevented | Slowest |

### Concurrency Problems:
- **Dirty Read**: Reading uncommitted changes
- **Non-repeatable Read**: Same row returns different values
- **Phantom Read**: New rows appear in subsequent reads

### Interview Explanation:
"Transactions ensure data consistency with ACID properties. Isolation levels control concurrency: Read Committed prevents dirty reads (most common), Repeatable Read prevents non-repeatable reads, Serializable prevents all anomalies but slowest. In banking, I use Serializable for transfers. In e-commerce, Read Committed balances consistency and performance."

**Interview Tip:** Use appropriate isolation levels. Read Committed is most common. Serializable prevents all anomalies but impacts performance.

</details>

<details><summary style="font-size: 1.3em; font-weight: bold;">Database Performance Tuning</summary>

Performance tuning involves optimizing queries, indexes, and database configuration for better speed.

### Query Optimization:
```sql
-- Bad: Full table scan
SELECT * FROM Users WHERE YEAR(created_at) = 2023;

-- Good: SARGable query
SELECT * FROM Users WHERE created_at >= '2023-01-01' AND created_at < '2024-01-01';

-- Use EXPLAIN to analyze
EXPLAIN SELECT * FROM Users WHERE email = 'john@example.com';
```

### Index Strategies:
```sql
-- Single column index
CREATE INDEX idx_users_email ON Users(email);

-- Composite index (order matters)
CREATE INDEX idx_orders_user_date ON Orders(user_id, order_date);

-- Partial index
CREATE INDEX idx_active_users ON Users(email) WHERE active = true;

-- Index for LIKE queries
CREATE INDEX idx_users_name ON Users(name varchar_pattern_ops);
```

### Query Optimization Techniques:
```sql
-- Use EXISTS instead of IN for large datasets
SELECT * FROM Users u
WHERE EXISTS (SELECT 1 FROM Orders o WHERE o.user_id = u.id);

-- Avoid SELECT *
SELECT id, name FROM Users WHERE active = true;

-- Use UNION ALL instead of UNION if duplicates not possible
SELECT name FROM Customers UNION ALL SELECT name FROM Suppliers;

-- Optimize JOINs
SELECT u.name, COUNT(o.id)
FROM Users u
LEFT JOIN Orders o ON u.id = o.user_id
WHERE u.created_at > '2023-01-01'
GROUP BY u.id, u.name;
```

### Database Configuration:
- **Connection Pooling**: Reuse connections (HikariCP)
- **Query Caching**: Cache frequent queries
- **Partitioning**: Split large tables
- **Replication**: Read replicas for scaling

### Interview Explanation:
"Performance tuning starts with EXPLAIN plans to identify slow queries. I add indexes on WHERE and JOIN columns, avoid full table scans, and use appropriate data types. For example, I replace `LIKE '%text%'` with full-text search, and use composite indexes for multi-column WHERE clauses. I also consider partitioning for large tables and read replicas for high-traffic applications."

**Interview Tip:** Use EXPLAIN to analyze queries. Index WHERE/JOIN columns. Avoid SELECT *, use appropriate data types, consider partitioning.

</details>

<details><summary style="font-size: 1.3em; font-weight: bold;">Database Design Patterns</summary>

Common patterns for scalable, maintainable database design.

### 1. Audit Trail Pattern:
Track all changes to data for compliance and debugging.

```sql
-- Audit table
CREATE TABLE UserAudit (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    action VARCHAR(10), -- INSERT, UPDATE, DELETE
    old_values JSON,
    new_values JSON,
    changed_by INT,
    changed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Trigger to populate audit
CREATE TRIGGER audit_users AFTER UPDATE ON Users
FOR EACH ROW
INSERT INTO UserAudit (user_id, action, old_values, new_values)
VALUES (NEW.id, 'UPDATE', JSON_OBJECT('name', OLD.name), JSON_OBJECT('name', NEW.name));
```

### 2. Soft Delete Pattern:
Mark records as deleted instead of physically removing them.

```sql
ALTER TABLE Users ADD COLUMN deleted_at TIMESTAMP NULL;
CREATE INDEX idx_users_deleted ON Users(deleted_at);

-- Soft delete
UPDATE Users SET deleted_at = NOW() WHERE id = 1;

-- Query active records
SELECT * FROM Users WHERE deleted_at IS NULL;
```

### 3. Polymorphic Associations:
Single table references multiple parent tables.

```sql
-- Comments table for multiple entities
CREATE TABLE Comments (
    id INT PRIMARY KEY,
    content TEXT,
    entity_type VARCHAR(50), -- 'post', 'product', 'user'
    entity_id INT,          -- ID in respective table
    user_id INT,
    created_at TIMESTAMP
);

-- Query comments for a post
SELECT * FROM Comments
WHERE entity_type = 'post' AND entity_id = 123;
```

### 4. Data Warehousing (Star Schema):
Optimized for analytics and reporting.

```sql
-- Fact table
CREATE TABLE SalesFacts (
    id INT PRIMARY KEY,
    product_id INT,
    customer_id INT,
    store_id INT,
    sale_date DATE,
    quantity INT,
    amount DECIMAL(10,2)
);

-- Dimension tables
CREATE TABLE DimProducts (id INT PRIMARY KEY, name VARCHAR(100), category VARCHAR(50));
CREATE TABLE DimCustomers (id INT PRIMARY KEY, name VARCHAR(100), region VARCHAR(50));
CREATE TABLE DimStores (id INT PRIMARY KEY, name VARCHAR(100), location VARCHAR(100));
```

### Interview Explanation:
"Database design patterns solve common problems: Audit trails for tracking changes, soft deletes for data recovery, polymorphic associations for flexible relationships, and star schemas for analytics. I choose patterns based on requirements - audit trails for compliance, soft deletes for user-facing apps, star schemas for reporting systems."

**Interview Tip:** Use audit trails for compliance, soft deletes for user data, star schema for analytics. Choose patterns based on specific requirements.

</details>

<details><summary style="font-size: 1.3em; font-weight: bold;">Indexing</summary>

Indexing improves database query performance by creating a fast lookup structure that allows the database to find rows efficiently without scanning the entire table.

Types: B-Tree, Hash, Bitmap.

Example:
```sql
CREATE INDEX idx_user_name ON Users(name);
```

**Interview Tip:** Index speeds SELECT, slows INSERT/UPDATE. Use for frequently queried columns.

</details>

<details><summary style="font-size: 1.3em; font-weight: bold;">Joins: INNER, LEFT, RIGHT</summary>

SQL JOINs are used to combine rows from two or more tables based on a related column.

### INNER JOIN
Returns only matching records from both tables.

Example:
```sql
SELECT u.name, o.amount
FROM Users u
INNER JOIN Orders o ON u.user_id = o.user_id;
```

### LEFT JOIN (LEFT OUTER JOIN)
Returns all records from the left table and matching records from the right table. If no match → NULL.

Example:
```sql
SELECT u.name, o.amount
FROM Users u
LEFT JOIN Orders o ON u.user_id = o.user_id;
```

### RIGHT JOIN (RIGHT OUTER JOIN)
Returns all records from the right table and matching records from the left table. If no match → NULL.

Example:
```sql
SELECT u.name, o.amount
FROM Users u
RIGHT JOIN Orders o ON u.user_id = o.user_id;
```

**Interview Tip:** INNER for matching rows, LEFT for all left + matching right.

</details>

<details><summary style="font-size: 1.3em; font-weight: bold;">ACID Properties</summary>

ACID properties ensure reliable database transactions by guaranteeing atomicity, consistency, isolation, and durability.

| Property    | Meaning |
|-------------|---------|
| Atomicity  | All or nothing |
| Consistency | Valid state before & after |
| Isolation  | Transactions run independently |
| Durability | Data persists after commit |

### Atomicity
All or nothing
- Either the whole transaction completes
- Or the database rolls back completely
Example: If money is deducted but not credited → rollback ❌

### Consistency
Database moves from one valid state to another
- Rules, constraints, keys must be preserved
- No data corruption
Example: Balance can't go negative if constraint exists.

### Isolation
Transactions don't interfere with each other
- Concurrent transactions behave as if executed one by one
Isolation problems:
- Dirty Read
- Non-repeatable Read
- Phantom Read
Isolation levels control this.

### Durability
Once committed, data stays committed
- Even if system crashes
- Data is safely stored on disk/logs

**Interview Tip:** ACID ensures data reliability. NoSQL sacrifices some for scalability.

</details>

<details><summary style="font-size: 1.3em; font-weight: bold;">Optimizing Slow Queries</summary>

Slow queries are optimized by analyzing execution plans, using proper indexes, minimizing data retrieval, optimizing joins, and applying caching where appropriate.

Identify slow query: Run EXPLAIN ANALYZE, Add/fix indexes, Rewrite query, Cache if needed.

Example EXPLAIN:
```sql
EXPLAIN SELECT * FROM Users WHERE name = 'John';
```

**Interview Tip:** Use EXPLAIN to analyze query plans. Index WHERE clauses.

</details>

## REST API Design

<details><summary style="font-size: 1.3em; font-weight: bold;">Idempotency</summary>

Idempotency ensures that repeated execution of an operation produces the same result as a single execution, preventing duplicate side effects in distributed systems.

Idempotent operation = safe to repeat without side effects.

Example: PUT request - updating a resource multiple times gives same result.

**Interview Tip:** Use idempotency keys for payments, updates.

</details>

<details><summary style="font-size: 1.3em; font-weight: bold;">Pagination</summary>

Pagination means fetching data in chunks (pages) instead of loading everything at once.
- Improve performance
- Reduce memory usage
- Handle large datasets

Pagination in Java is implemented using Pageable to fetch data in chunks, while sorting is applied using Sort to order results based on specified fields.

Example Spring Data:
```java
Page<User> users = userRepository.findAll(PageRequest.of(0, 10, Sort.by("name")));
```

**Interview Tip:** Use offset/limit or cursor-based pagination.

</details>

<details><summary style="font-size: 1.3em; font-weight: bold;">API Versioning</summary>

API versioning is the practice of managing API changes by maintaining multiple versions to ensure backward compatibility for existing clients.

Methods: URI versioning (v1/users), Header versioning, Query param versioning.

Real-World Example:
- v1 → returns name
- v2 → returns firstName, lastName
Old clients still work using v1.

Example:
```java
@GetMapping("/v1/users")
public List<UserV1> getUsersV1() { ... }

@GetMapping("/v2/users")
public List<UserV2> getUsersV2() { ... }
```

**Interview Tip:** Version APIs to avoid breaking changes.

</details>

<details><summary style="font-size: 1.3em; font-weight: bold;">Request/Response DTOs</summary>

Request/Response DTOs (Data Transfer Objects) are simple objects used to carry data between the client and server, without exposing internal domain models.

Request and Response DTOs are used to transfer data between the client and server while keeping APIs decoupled from internal domain models.

Example Request DTO:
```java
class CreateUserRequest {
    @NotNull
    private String name;
    @Email
    private String email;
}
```

Example Response DTO:
```java
class UserResponse {
    private Long id;
    private String name;
    private String email;
}
```

**Interview Tip:** DTOs hide internal models, add validation, and control data exposure.

</details>

<details><summary style="font-size: 1.3em; font-weight: bold;">🚀 Advanced Database Concepts</summary>

<details><summary>🔹 1. What is a Window Function?</summary>

**📝 Easy Answer:**
> "A window function performs calculations across a set of rows related to the current row without grouping them. Unlike GROUP BY, it doesn't collapse rows."

**Example:**
```sql
SELECT name, salary,
       RANK() OVER (ORDER BY salary DESC) AS rank
FROM Employees;
```

**Use cases:**
- Ranking (top N)
- Running totals
- Comparing previous rows

### Interview Explanation:
"Window functions are powerful analytics functions that let you perform calculations across a set of rows without collapsing them like GROUP BY does. For example, when I need to rank employees by salary within each department while still showing all employee details, I use RANK() OVER (PARTITION BY department ORDER BY salary DESC). In my experience with sales analytics, I've used window functions to calculate running totals, moving averages, and to compare each month's sales with the previous month using LAG() function. The key advantage is that you maintain the granularity of individual rows while getting aggregate insights."

**Real-time Example:** In an e-commerce dashboard, use window functions to show each product with its sales rank within its category, total sales, and percentage of category sales - all in one query without complex joins.

**Interview Tip:** Unlike GROUP BY, window functions do not collapse rows.

</details>

<details><summary>🔹 2. Difference between RANK(), DENSE_RANK(), ROW_NUMBER()</summary>

**📝 Easy Answer:**
> "ROW_NUMBER() gives unique numbers, RANK() skips ranks on ties, DENSE_RANK() has no gaps in ranking."

| Function | Behavior |
|----------|----------|
| ROW_NUMBER() | Unique numbers (no duplicates) |
| RANK() | Skips ranks on ties |
| DENSE_RANK() | No gaps in ranking |

**Example:**
Salary: 100, 100, 90
- ROW_NUMBER → 1,2,3  
- RANK → 1,1,3  
- DENSE_RANK → 1,1,2

### Interview Explanation:
"These ranking functions handle ties differently, which is crucial for business requirements. ROW_NUMBER() assigns unique sequential numbers regardless of ties - useful for pagination where you need exact row limits. RANK() reflects actual competition ranking where tied values get the same rank but subsequent ranks are skipped - perfect for sports leaderboards. DENSE_RANK() gives consecutive ranks without gaps - ideal for performance tiers like 'Grade A, Grade B, Grade C' employees. I choose based on business needs: ROW_NUMBER() for technical pagination, RANK() for competition scenarios, DENSE_RANK() for categorization systems."

**Real-time Example:** In a student grading system, DENSE_RANK() ensures students with same GPA get same grade tier (A, B, C) without skipping grades, while RANK() would be used in scholarship allocation where tied students share a position but subsequent positions are skipped.

</details>

<details><summary>🔹 3. What is a Self Join?</summary>

**📝 Easy Answer:**
> "A self join joins a table with itself, commonly used for hierarchical data like employee-manager relationships."

**Example:**
```sql
SELECT e.name, m.name AS manager
FROM Employees e
JOIN Employees m ON e.manager_id = m.id;
```

**Use case:** Hierarchical data (employee-manager)

### Interview Explanation:
"Self joins are essential for hierarchical data where relationships exist within the same table. The key is using table aliases to treat the same table as two separate entities. In employee management systems, I use self joins to build organization charts, find all employees under a manager, or identify peers at the same level. The pattern is always: join the table to itself on a relationship column like manager_id = employee_id. I've also used self joins to find duplicate records, compare consecutive records in time series data, and build recommendation systems."

**Real-time Example:** In a company directory system, use self join to find all direct reports: `SELECT e.name as employee, m.name as manager FROM employees e JOIN employees m ON e.manager_id = m.id WHERE m.name = 'John Smith'`. Also useful in social networks to find mutual friends.

</details>

<details><summary>🔹 4. What is the SQL Query Execution Order?</summary>

**📝 Easy Answer:**
> "SQL executes in this order: FROM → JOIN → WHERE → GROUP BY → HAVING → SELECT → ORDER BY → LIMIT"

**Interview Trick:**
Alias cannot be used in WHERE because SELECT runs later.

```sql
-- This won't work
SELECT name AS employee_name 
FROM Employees 
WHERE employee_name = 'John'; -- Error: column doesn't exist yet
```

### Interview Explanation:
"Understanding SQL execution order is crucial for writing correct queries and debugging errors. The database first identifies tables (FROM), then applies joins (JOIN), filters rows (WHERE), groups data (GROUP BY), filters groups (HAVING), selects columns (SELECT), sorts results (ORDER BY), and finally limits output (LIMIT). This is why you can't use column aliases in WHERE clauses - the alias isn't created until SELECT executes. However, you can use aliases in ORDER BY because it runs after SELECT. This knowledge helps me optimize queries by understanding when indexes are used and why certain operations might be expensive."

**Real-time Example:** In reporting queries, I first filter data in WHERE (uses indexes), then group by department, filter groups with HAVING (departments with >10 employees), and finally select calculated metrics. Understanding this order helps me place expensive operations efficiently.

</details>

<details><summary>🔹 5. What is Index Scan vs Index Seek?</summary>

**📝 Easy Answer:**
> "Index Seek is fast lookup using index (good), Index Scan scans entire index (slower fallback)."

- **Index Seek**: Fast lookup using index (good)
- **Index Scan**: Scans entire index (slower)

### Interview Explanation:
"Index seek and scan are different execution strategies. Seek is the gold standard - it uses the index structure (usually B-tree) to jump directly to the relevant rows, like using a book's index to find a specific topic. Scan means reading through the entire index sequentially, which is better than a table scan but still not optimal. I see seeks when using exact matches, range queries on indexed columns, and proper WHERE clauses. Scans happen with LIKE patterns, functions on indexed columns, or when the optimizer determines the result set is too large for seeks to be beneficial."

**Real-time Example:** In a user lookup system, `WHERE email = 'john@email.com'` triggers an index seek (milliseconds), but `WHERE UPPER(email) = 'JOHN@EMAIL.COM'` causes an index scan (seconds) because the function prevents index usage.

**Interview Tip:** Seek = efficient, Scan = fallback

</details>

<details><summary>🔹 6. What is a Covering Index?</summary>

**📝 Easy Answer:**
> "A covering index contains all columns needed by a query, so it doesn't need to access the table → faster performance."

**Example:**
```sql
CREATE INDEX idx_user_email_name ON Users(email, name);
```

👉 Query doesn't need to access table → faster

### Interview Explanation:
"A covering index contains all the columns needed by a query, eliminating the need for key lookups to the actual table. This dramatically improves performance because the database can satisfy the entire query using just the index. I design covering indexes by analyzing query patterns - if a query frequently selects email and name where email='something', I create an index on (email, name). The order matters: filter columns first, then select columns. This technique is especially powerful for read-heavy applications where the same columns are repeatedly queried together."

**Real-time Example:** In an e-commerce product search where users filter by category and view name, price, and rating, create index `(category, name, price, rating)` so search results load instantly without touching the main product table.

</details>

<details><summary>🔹 7. When Index is NOT used?</summary>

**📝 Easy Answer:**
> "Indexes aren't used with functions on columns, leading wildcards, type mismatches, or low selectivity columns."

**Examples:**
- Using functions: `WHERE YEAR(created_at) = 2023` ❌
- Leading wildcard: `WHERE name LIKE '%john%'` ❌
- Type mismatch
- Low selectivity columns

### Interview Explanation:
"Indexes become useless in several scenarios, and recognizing these is crucial for query optimization. Functions on indexed columns prevent index usage because the database can't predict function results - instead of `YEAR(created_at) = 2023`, I use `created_at >= '2023-01-01' AND created_at < '2024-01-01'`. Leading wildcards can't use regular indexes because B-trees are sorted by prefix. Type mismatches force conversions that bypass indexes. Low selectivity means too many rows match, making index scans inefficient. I always check execution plans to verify index usage and rewrite queries when needed."

**Real-time Example:** In a logging system, searching logs with `WHERE message LIKE '%error%'` is slow. Instead, I use full-text search or extract error types into separate indexed columns for fast filtering.

</details>

<details><summary>🔹 8. What is Denormalization?</summary>

**📝 Easy Answer:**
> "Denormalization adds redundancy to improve read performance at the cost of potential data inconsistency."

**Example:** Store total order amount instead of calculating

**Trade-off:**
- Faster reads ✅
- Data inconsistency risk ❌

### Interview Explanation:
"Denormalization is a calculated trade-off where I intentionally introduce redundancy to improve read performance. After fully normalizing a database, I analyze query patterns and performance bottlenecks. If joins are expensive and reads far exceed writes, I denormalize by storing calculated values or duplicating frequently accessed data. For example, storing order totals instead of calculating from line items, or copying customer names into order records to avoid joins. The key is maintaining consistency through triggers, stored procedures, or application logic. I use denormalization strategically in reporting tables, caching layers, and read replicas."

**Real-time Example:** In an analytics dashboard showing monthly sales by region, instead of joining 4 tables (orders, customers, products, regions) every time, I maintain a denormalized `monthly_sales_summary` table updated nightly, improving dashboard load times from 30 seconds to 2 seconds.

</details>

<details><summary>🔹 9. What is Partitioning?</summary>

**📝 Easy Answer:**
> "Partitioning splits a table into smaller parts within the same database for better performance and management."

**Types:**
- Range
- List  
- Hash

**Example:** Orders split by year

### Interview Explanation:
"Partitioning divides large tables into smaller, manageable pieces while maintaining the logical appearance of a single table. Range partitioning splits by value ranges (dates, IDs), list partitioning by specific values (regions, categories), and hash partitioning distributes evenly across partitions. I use partitioning for tables exceeding millions of rows where queries typically filter by the partition key. Benefits include improved query performance (partition elimination), easier maintenance (drop old partitions), and parallel processing. The partition key should align with query patterns - if most queries filter by date, partition by date ranges."

**Real-time Example:** In a transaction logging system, I partition the transactions table by month. When querying last month's data, the database only scans one partition instead of the entire 50GB table, reducing query time from minutes to seconds. Old partitions can be archived or dropped efficiently.

</details>

<details><summary>🔹 10. What is Sharding?</summary>

**📝 Easy Answer:**
> "Sharding splits data across multiple databases for massive scale systems."

**Example:**
- Users 1–1M → DB1
- Users 1M–2M → DB2

**Use case:** Massive scale systems

### Interview Explanation:
"Sharding distributes data across multiple databases, typically by a shard key like user ID or geographic region. Unlike partitioning (same database), sharding uses separate database instances, enabling horizontal scaling beyond single-server limits. I implement sharding when vertical scaling hits limits and the application can tolerate eventual consistency. Challenges include cross-shard queries, rebalancing, and maintaining referential integrity. The shard key choice is critical - it should distribute data evenly and align with query patterns. I've used sharding in social media platforms where user data is sharded by user ID, enabling millions of concurrent users."

**Real-time Example:** Instagram shards user data by user ID ranges across thousands of database servers. When you view a profile, the application routes the request to the specific shard containing that user's data, enabling billion-user scale while maintaining fast response times.

</details>

<details><summary>🔹 11. What is CAP Theorem?</summary>

**📝 Easy Answer:**
> "CAP Theorem states a distributed system can guarantee only 2 of: Consistency, Availability, Partition Tolerance."

**Example:**
- SQL → CP (Consistency + Partition tolerance)
- NoSQL → AP (Availability + Partition tolerance)

### Interview Explanation:
"CAP theorem states that in distributed systems with network partitions, you can only guarantee 2 out of 3: Consistency (all nodes see the same data), Availability (system remains operational), and Partition tolerance (works despite network failures). This forces architectural decisions: traditional SQL databases choose CP - they maintain consistency but may become unavailable during partitions. NoSQL systems like Cassandra choose AP - they remain available but may serve stale data. Understanding CAP helps me choose appropriate technologies: banks need consistency (CP), social media prioritizes availability (AP). Modern systems use techniques like eventual consistency to balance all three."

**Real-time Example:** During a network split, Amazon's DynamoDB (AP) continues serving read/write requests but may return slightly stale data, ensuring shopping cart functionality never stops. PostgreSQL (CP) would block writes to maintain consistency, potentially making checkout unavailable but guaranteeing data accuracy.

</details>

<details><summary>🔹 12. What is N+1 Query Problem?</summary>

**📝 Easy Answer:**
> "N+1 problem occurs when fetching related data in multiple queries instead of one efficient query."

**Bad:**
```sql
SELECT * FROM Users;
SELECT * FROM Orders WHERE user_id = 1;
SELECT * FROM Orders WHERE user_id = 2;
```

**Solution:**
```sql
SELECT * FROM Users u
JOIN Orders o ON u.id = o.user_id;
```

### Interview Explanation:
"N+1 queries are a common performance killer in ORM frameworks where you fetch N parent records, then execute 1 additional query for each parent to get related data, resulting in N+1 total queries. This turns into a major bottleneck when N is large. I prevent this using eager loading, joins, or batch fetching. In Spring JPA, I use @EntityGraph or JOIN FETCH. In raw SQL, I use appropriate joins. The key is identifying when you're fetching related data in loops and replacing it with single efficient queries. Monitoring tools help detect N+1 patterns by showing query counts vs result counts."

**Real-time Example:** In a blog application, loading a page with 100 posts where each shows author name: bad approach executes 101 queries (1 for posts + 100 for authors), while good approach uses single JOIN query. This improves page load from 5 seconds to 50ms in high-traffic scenarios.

</details>

<details><summary>🔹 13. What is Materialized View?</summary>

**📝 Easy Answer:**
> "A materialized view stores actual data physically, making it faster than normal views but requiring periodic refresh."

**Characteristics:**
- Faster than normal views
- Needs refresh
- Takes storage space

### Interview Explanation:
"Materialized views store query results as physical data, trading storage space for query speed. Unlike regular views (virtual tables), materialized views contain actual data that must be refreshed when underlying tables change. I use them for expensive analytical queries, complex aggregations, and reporting scenarios where query time matters more than real-time accuracy. Refresh strategies include on-demand, scheduled, or incremental updates. The decision depends on data volatility and freshness requirements. In data warehouses, materialized views are essential for sub-second dashboard performance over massive datasets."

**Real-time Example:** In a financial reporting system, a daily P&L materialized view aggregates millions of transactions overnight. Dashboard users see instant reports instead of waiting 10 minutes for the same calculation from raw transaction data. The view refreshes once daily since financial reports don't need real-time updates.

</details>

<details><summary>🔹 14. What is Deadlock?</summary>

**📝 Easy Answer:**
> "Deadlock occurs when two transactions wait for each other forever, creating a circular dependency."

**Example:**
- T1 locks row A, waits for B
- T2 locks row B, waits for A

**Solution:**
- Use consistent locking order
- Timeout handling

### Interview Explanation:
"Deadlocks occur when transactions create circular wait conditions - each transaction holds resources the other needs. I prevent deadlocks by establishing consistent locking orders (always lock tables/rows in the same sequence), keeping transactions short, and using appropriate isolation levels. When deadlocks occur, databases typically abort one transaction and retry. I handle this in application code with retry logic and exponential backoff. Monitoring deadlock graphs helps identify problematic transaction patterns. In high-concurrency systems, I sometimes redesign data access patterns to minimize lock contention."

**Real-time Example:** In an inventory management system, two transactions simultaneously trying to reserve items from inventory can deadlock if one locks Product A then B, while another locks Product B then A. Solution: always lock products in ID order, or use optimistic locking with version numbers to avoid locks entirely.

</details>

<details><summary>🔹 15. Optimistic vs Pessimistic Locking</summary>

**📝 Easy Answer:**
> "Optimistic locking assumes no conflict and checks later, Pessimistic locking prevents conflicts by locking immediately."

| Type | Description |
|------|-------------|
| Optimistic | Assume no conflict, check later |
| Pessimistic | Lock data immediately |

### Interview Explanation:
"These are two strategies for handling concurrent data access. Pessimistic locking assumes conflicts will occur, so it locks data immediately when read, preventing other transactions from modifying it. This guarantees consistency but can reduce concurrency and cause deadlocks. Optimistic locking assumes conflicts are rare - it checks for conflicts only at update time using version numbers or timestamps. If conflict detected, the transaction retries. I choose based on conflict probability: pessimistic for high-contention scenarios (bank account balances), optimistic for low-contention scenarios (user profile updates). Modern applications often prefer optimistic for better scalability."

**Real-time Example:** In a ticket booking system, pessimistic locking reserves seats immediately when users start checkout, preventing overselling but blocking seats from other users. Optimistic locking lets multiple users select the same seat but only first to complete payment succeeds - others get notified to choose different seats.

</details>

<details><summary>🔹 16. What is Full Text Search?</summary>

**📝 Easy Answer:**
> "Full text search efficiently searches text content using specialized indexes, much faster than LIKE operations."

**Example:**
```sql
SELECT * FROM Articles
WHERE MATCH(content) AGAINST('database');
```

Better than: `LIKE '%database%'` ❌

### Interview Explanation:
"Full-text search uses specialized indexes and algorithms designed for text search, far more efficient than pattern matching with LIKE. It supports features like stemming (finding 'run', 'running', 'ran' from single term), relevance scoring, and Boolean operators. Most databases provide built-in full-text search (MySQL has MATCH...AGAINST, PostgreSQL has tsvector), while dedicated solutions like Elasticsearch offer advanced features. I implement full-text search for content-heavy applications, product catalogs, and document management systems. The key advantage is performance - LIKE '%term%' requires full table scans, while full-text indexes provide sub-second search across millions of documents."

**Real-time Example:** In a knowledge base with 100,000 articles, searching for 'database optimization' with LIKE takes 30 seconds scanning all content. With full-text search index, the same query returns ranked results in 50ms, plus features like highlighting matches and suggesting related terms.

</details>

<details><summary>🔹 17. What is Connection Pooling?</summary>

**📝 Easy Answer:**
> "Connection pooling reuses database connections instead of creating new ones, improving performance and reducing overhead."

**Benefits:**
- Faster
- Less overhead
- Better resource management

### Interview Explanation:
"Connection pooling maintains a cache of database connections that applications can reuse, avoiding the expensive overhead of creating new connections for each request. Each connection establishment involves TCP handshakes, authentication, and session setup - costs that add up quickly under load. I configure pools with min/max connections, idle timeouts, and validation queries. Popular libraries include HikariCP (Java), pgBouncer (PostgreSQL). Pool sizing depends on database capacity and application concurrency. Under-sized pools create bottlenecks; over-sized pools waste memory and database resources. Monitoring connection usage helps optimize pool configuration."

**Real-time Example:** In a web application handling 1000 requests/second, without pooling, each request takes 50ms just to establish database connection. With a properly configured connection pool, requests reuse existing connections, reducing database interaction time to 5ms and supporting 10x higher throughput with same hardware.

</details>

<details><summary>🔹 18. What is Clustered vs Non-Clustered Index?</summary>

**📝 Easy Answer:**
> "Clustered index stores data physically in order (one per table), Non-clustered index is separate structure with pointers."

| Type | Description |
|------|-------------|
| Clustered | Data stored physically in order |
| Non-clustered | Separate structure with pointers |

👉 One clustered index per table

### Interview Explanation:
"Clustered indexes determine the physical storage order of data - the table data is literally sorted by the clustered index key. This makes range queries extremely fast because related data is stored contiguously. Non-clustered indexes are separate structures pointing to table rows. In SQL Server, the primary key automatically becomes the clustered index unless specified otherwise. I choose clustered index keys carefully - they should support the most common query patterns and have low fragmentation (avoid frequently updated columns). Non-clustered indexes can cover specific query patterns without affecting physical storage order. The choice impacts performance significantly."

**Real-time Example:** In a time-series data table storing sensor readings, clustering by timestamp makes queries like 'last 24 hours of data' extremely fast as all relevant records are stored together. A non-clustered index on sensor_id enables fast filtering by specific sensors without changing the time-based physical ordering.

</details>

<details><summary>🔹 19. What is Composite Key?</summary>

**📝 Easy Answer:**
> "A composite key is a primary key made up of multiple columns, used when single column can't uniquely identify rows."

**Example:**
```sql
PRIMARY KEY (order_id, product_id)
```

### Interview Explanation:
"Composite keys use multiple columns to uniquely identify rows when no single column is sufficient. This is common in many-to-many relationship tables, junction tables, or when business rules require compound uniqueness. For example, in order line items, the combination of order_id and product_id is unique, but neither alone is unique within the table. I use composite keys when the business domain naturally has compound identifiers, but I'm careful about key length and query patterns - longer keys impact index performance. Sometimes I add a surrogate auto-increment primary key for simplicity while maintaining the business composite key as a unique constraint."

**Real-time Example:** In a student course enrollment system, neither student_id nor course_id alone is unique in the enrollment table (students take multiple courses, courses have multiple students), but the combination (student_id, course_id) uniquely identifies each enrollment record.

</details>

<details><summary>🔹 20. What is Data Integrity?</summary>

**📝 Easy Answer:**
> "Data integrity ensures accuracy and consistency of data through various constraints and rules."

**Types:**
- Entity integrity (PK)
- Referential integrity (FK)  
- Domain integrity (constraints)

### Interview Explanation:
"Data integrity ensures data accuracy, consistency, and reliability through various mechanisms. Entity integrity guarantees each table has unique, non-null primary keys identifying rows. Referential integrity ensures foreign keys reference valid primary keys, preventing orphaned records. Domain integrity enforces valid data ranges and formats through constraints, data types, and check conditions. I implement integrity at database level (constraints, triggers) rather than just application level because databases are the ultimate guardians of data consistency. Multiple applications may access the same database, so integrity rules must be enforced centrally. This prevents data corruption even if application bugs exist."

**Real-time Example:** In an e-commerce system, entity integrity ensures each order has unique order_id, referential integrity prevents orders from referencing non-existent customers, and domain integrity ensures order amounts are positive numbers and email addresses have valid format - protecting data quality across all applications accessing the database.

</details>

<details><summary>🔹 21. What are JPA Methods?</summary>

**📝 Easy Answer:**
> "JPA methods like save, findById, findAll, deleteById provide standard CRUD operations with different behaviors for performance and safety."

**📊 JPA Methods – Usage & Differences**
| Method | Usage | Return Type | When to Use | Difference / Notes |
|--------|-------|-------------|-------------|-------------------|
| save(entity) | Insert or update a record | Entity | When creating or updating data | Works for both insert & update based on ID |
| saveAll(list) | Save multiple entities | List<Entity> | Bulk insert/update | Faster than multiple save() calls |
| findById(id) | Get record by ID | Optional<Entity> | Fetch single record safely | Returns Optional (avoids null errors) |
| findAll() | Get all records | List<Entity> | Fetch entire table | Can be slow for large data |
| findAll(Pageable) | Get paginated data | Page<Entity> | Large datasets | Supports pagination |
| findAll(Sort) | Get sorted data | List<Entity> | Sorting results | Uses Sort object |
| existsById(id) | Check if record exists | boolean | Validation before operations | Faster than fetching full entity |
| count() | Count total records | long | Metrics / analytics | Lightweight query |
| deleteById(id) | Delete by ID | void | Remove specific record | No need to fetch entity first |
| delete(entity) | Delete using object | void | When entity already available | Requires entity instance |
| deleteAll() | Delete all records | void | Clear table | Dangerous in production ⚠️ |
| deleteAll(list) | Delete multiple | void | Bulk delete | Safer than deleteAll() |
| flush() | Sync with DB immediately | void | Force DB write | Used inside transactions |
| saveAndFlush(entity) | Save + immediate DB write | Entity | When instant persistence needed | Combines save + flush |
| getById(id) / getReferenceById(id) | Lazy fetch | Entity | When proxy is enough | Does NOT hit DB immediately |
| findOne(Example) | Query by example | Optional<Entity> | Dynamic search | Uses Example matcher |

**🔥 Key Differences (Interview Focus)**
1. **save() vs saveAndFlush()**
   - **save()**: Delayed DB write, Faster (batched)
   - **saveAndFlush()**: Immediate DB write, Slower (instant)

2. **findById() vs getById()**
   - **findById()**: Hits DB immediately, Returns Optional
   - **getById()**: Lazy loading (proxy), Returns entity directly

3. **deleteById() vs delete()**
   - **deleteById()**: Only ID needed, Direct delete
   - **delete()**: Full object needed, Requires fetch first

4. **findAll() vs findAll(Pageable)**
   - **findAll()**: Loads all data, Not scalable
   - **findAll(Pageable)**: Loads limited data, Scalable

**💬 Best Interview Summary Answer**

If they ask:
👉 "Explain JPA methods"

Say:

"JPA provides methods like save, findById, findAll, deleteById, existsById, and count for basic CRUD operations. For large datasets, I use pagination with findAll(Pageable). I also use custom query methods like findByName. Additionally, I understand differences like save vs saveAndFlush and findById vs lazy loading methods."

**⚡ Quick Tip**

👉 Mention this to stand out:

"I prefer pagination for large data"
"I use Optional properly to avoid null issues"

</details>

</details>

<details><summary style="font-size: 1.3em; font-weight: bold;">Interview Questions</summary>

<details><summary style="font-size: 1.3em; font-weight: bold;">What is database normalization and why is it important?</summary>

**Explanation:** Normalization organizes data to reduce redundancy and improve integrity by splitting tables based on dependencies.

**Example:** Separate Customer and Order tables instead of repeating customer info in every order.

**Real-time Example:** In an e-commerce database, normalization prevents updating customer address in multiple places when it changes.

</details>

<details><summary style="font-size: 1.3em; font-weight: bold;">Explain ACID properties with examples.</summary>

**Explanation:** ACID ensures reliable transactions: Atomicity (all or nothing), Consistency (valid states), Isolation (independent transactions), Durability (persists after commit).

**Example:** Bank transfer: Deduct from account A and add to B atomically; if failure, rollback both.

**Real-time Example:** Online banking ensures money transfers are durable even if server crashes after commit.

</details>

<details><summary style="font-size: 1.3em; font-weight: bold;">What are SQL JOINs and when to use each type?</summary>

**Explanation:** JOINs combine data from multiple tables. INNER returns matching rows, LEFT includes all left + matches, RIGHT all right + matches.

**Example:** INNER JOIN users and orders on user_id to get users with orders.

**Real-time Example:** In a blog, LEFT JOIN posts and comments to show posts even without comments.

</details>

<details><summary style="font-size: 1.3em; font-weight: bold;">How do you optimize slow database queries?</summary>

**Explanation:** Use indexes on WHERE columns, analyze EXPLAIN plans, avoid SELECT *, limit data with pagination.

**Example:** Add index on email column for fast user lookups.

**Real-time Example:** In a search engine, indexing keywords speeds up queries from seconds to milliseconds.

</details>

<details><summary style="font-size: 1.3em; font-weight: bold;">What is the difference between SQL and NoSQL databases?</summary>

**Explanation:** SQL is relational with fixed schema, NoSQL is flexible for unstructured data, better for scalability.

**Example:** SQL for banking (strict consistency), NoSQL for social media (flexible posts).

**Real-time Example:** MongoDB for storing varied product catalogs in e-commerce vs PostgreSQL for financial records.

</details>

<details><summary style="font-size: 1.3em; font-weight: bold;">Explain database normalization and its importance.</summary>

**Explanation:** Normalization organizes data to reduce redundancy and anomalies by splitting tables based on dependencies.

**Example:** Separate Customer and Order tables instead of repeating customer info in every order.

**Real-time Example:** In an e-commerce database, normalization prevents updating customer address in multiple places when it changes.

</details>

<details><summary style="font-size: 1.3em; font-weight: bold;">What are database transactions and why are they important?</summary>

**Explanation:** Transactions group operations that must succeed or fail together, ensuring data consistency.

**Example:** Bank transfer: deduct from account A and credit to B must both succeed or both rollback.

**Real-time Example:** In online shopping, order placement involves inventory reduction and payment processing as one transaction.

</details>

<details><summary style="font-size: 1.3em; font-weight: bold;">Explain the concept of database indexing.</summary>

**Explanation:** Indexes speed up data retrieval by creating sorted data structures, but slow down writes.

**Example:** B-tree index on email column allows fast user lookups by email.

**Real-time Example:** In a user login system, indexing email speeds up authentication from O(n) to O(log n).

</details>

<details><summary style="font-size: 1.3em; font-weight: bold;">What are the different types of database relationships?</summary>

**Explanation:** One-to-one, one-to-many, many-to-many relationships define how tables connect.

**Example:** User has one profile (one-to-one), user has many orders (one-to-many), students enroll in many courses (many-to-many).

**Real-time Example:** In a blog system, author has many posts (one-to-many), posts have many tags (many-to-many).

</details>

</details>

</details>
