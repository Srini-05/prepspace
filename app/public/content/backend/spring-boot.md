# Backend - Spring Boot

> **Note:** Interview Tips are highlighted in <span style="color: #007acc;">blue</span> for easy identification.
> **Accordion Feature:** Each question can be made collapsible by wrapping in `<details><summary>Question Title</summary> content </details>`.

<details><summary style="font-size: 1.3em; font-weight: bold;">🚀 Spring Boot Interview Preparation Guide</summary>

## Spring Boot Interview Questions

<details><summary style="font-size: 1.3em; font-weight: bold;">1. What is Dependency Injection in Spring Boot?</summary>

Dependency Injection (DI) in Spring Boot is a design pattern where the framework provides the required objects (dependencies) to a class instead of the class creating them itself. This helps make the code loosely coupled, easier to test, and easier to maintain. ⚙️

### 1️⃣ What is a Dependency?

A dependency is an object that another object needs to work.

Example:

```java
class Car {
    Engine engine = new Engine();
}
```

Here:

Car depends on Engine.

Car itself creates the Engine, which creates tight coupling.

### 2️⃣ With Dependency Injection

Instead of creating the object inside the class, Spring injects it.

```java
class Car {
    private Engine engine;

    public Car(Engine engine) {
        this.engine = engine;
    }
}
```

Now:

Car does not create Engine.

Spring provides it automatically.

### 3️⃣ How Spring Boot Performs DI

In Spring Boot, the IoC Container (Inversion of Control Container) manages objects called Beans.

Spring:

Creates the objects

Manages their lifecycle

Injects dependencies where required

### 4️⃣ Types of Dependency Injection in Spring
#### 1. Constructor Injection (Recommended) ✅
```java
@Service
public class OrderService {

    private final PaymentService paymentService;

    public OrderService(PaymentService paymentService) {
        this.paymentService = paymentService;
    }
}
```

Spring automatically injects PaymentService.

#### 2. Field Injection
```java
@Service
public class OrderService {

    @Autowired
    private PaymentService paymentService;

}
```

Here:

@Autowired tells Spring to inject the dependency.

⚠️ Not recommended for large projects because it's harder to test.

#### 3. Setter Injection
```java
@Service
public class OrderService {

    private PaymentService paymentService;

    @Autowired
    public void setPaymentService(PaymentService paymentService) {
        this.paymentService = paymentService;
    }
}
```

### 5️⃣ Common Annotations Used in DI
| Annotation | Purpose |
|------------|---------|
| @Component | Generic Spring bean |
| @Service | Service layer bean |
| @Repository | DAO layer bean |
| @Controller | Web controller |
| @Autowired | Inject dependency |

Example:

```java
@Service
public class PaymentService {
}
```

Spring automatically registers it as a bean.

### 6️⃣ Simple Flow Example
```java
@Repository
class UserRepository {}

@Service
class UserService {

    private final UserRepository repo;

    public UserService(UserRepository repo) {
        this.repo = repo;
    }
}
```

Flow:

Spring Container
      ↓
Creates UserRepository Bean
      ↓
Creates UserService Bean
      ↓
Injects UserRepository into UserService

### 7️⃣ Why Dependency Injection is Important 🚀

Benefits:

✔ Loose coupling  
✔ Easier unit testing  
✔ Better code maintainability  
✔ Object lifecycle managed by Spring  
✔ Cleaner architecture  

### Interview Explanation:
"When I explain Dependency Injection in interviews, I compare it to how we get food delivered instead of growing our own vegetables. In software, instead of a class creating its dependencies (like new UserRepository()), the dependencies are 'injected' from outside by the framework. This makes the code more modular, easier to test (you can inject mocks), and follows the Single Responsibility Principle. Spring Boot makes this even easier with auto-configuration and component scanning."

**Interview Tip:** DI promotes loose coupling. Constructor injection is preferred over field injection because it makes dependencies explicit and prevents null pointer exceptions.

✅ In one line:

Dependency Injection in Spring Boot means Spring automatically provides required objects (beans) to classes instead of the classes creating them manually.
</details>

<details><summary style="font-size: 1.3em; font-weight: bold;">2. What is Auto-Configuration in Spring Boot?</summary>

Spring Boot automatically configures beans based on the dependencies present in the classpath. This eliminates the need for manual bean configuration and reduces boilerplate code.

### How It Works Internally?
1. **@SpringBootApplication** combines three annotations:
   - **@Configuration**: Marks the class as a source of bean definitions
   - **@EnableAutoConfiguration**: Enables auto-configuration
   - **@ComponentScan**: Scans for Spring components

2. **Auto-Configuration Process**:
   - Scans classpath for JAR files and classes
   - Loads auto-configuration classes from `META-INF/spring.factories`
   - Applies conditional configurations based on classpath and existing beans

3. **Conditional Annotations**:
   - `@ConditionalOnClass`: Only if class is present
   - `@ConditionalOnMissingBean`: Only if bean doesn't exist
   - `@ConditionalOnProperty`: Based on property values

Example: Adding `spring-boot-starter-data-jpa` automatically configures:
- DataSource bean
- EntityManagerFactory
- TransactionManager
- JPA repositories

### Real-World Example:
```java
@SpringBootApplication  // This enables auto-configuration
public class MyApplication {
    public static void main(String[] args) {
        SpringApplication.run(MyApplication.class, args);
    }
}

// With spring-boot-starter-web, you get:
// - Embedded Tomcat server
// - DispatcherServlet
// - JSON converters (Jackson)
// - Error pages
// - And much more...
```

### Interview Explanation:
"Auto-configuration is Spring Boot's magic that automatically sets up your application based on what dependencies you add. For example, when you add spring-boot-starter-data-jpa, Spring Boot automatically creates DataSource, EntityManager, and repository beans without you writing any configuration. It works by scanning the classpath and applying conditional configurations. This reduces development time from days to minutes, but you can always override the defaults when needed."

**Interview Tip:** Auto-configuration reduces boilerplate. Use @ConditionalOnProperty for custom configs. Mention that you can exclude specific auto-configurations with @SpringBootApplication(exclude = {...}).

</details>

<details><summary style="font-size: 1.3em; font-weight: bold;">3. Global Exception Handling</summary>

Instead of writing try-catch blocks in every controller method, Spring Boot allows centralized exception handling using @ControllerAdvice. This provides consistent error responses and better maintainability.

### Key Annotations:
- **@ControllerAdvice**: Global exception handler for controllers
- **@RestControllerAdvice**: Same as @ControllerAdvice + @ResponseBody
- **@ExceptionHandler**: Handles specific exception types

### Benefits:
- **Centralized Error Handling**: All exceptions handled in one place
- **Consistent API Responses**: Uniform error format across the application
- **Separation of Concerns**: Business logic separated from error handling
- **Better User Experience**: Meaningful error messages

### Complete Implementation:
```java
@RestControllerAdvice
public class GlobalExceptionHandler {

    // Handle specific exceptions
    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<ErrorResponse> handleNotFound(ResourceNotFoundException e) {
        ErrorResponse error = new ErrorResponse(
            HttpStatus.NOT_FOUND.value(),
            "Resource not found",
            e.getMessage(),
            LocalDateTime.now()
        );
        return new ResponseEntity<>(error, HttpStatus.NOT_FOUND);
    }

    // Handle validation errors
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ErrorResponse> handleValidation(MethodArgumentNotValidException e) {
        Map<String, String> errors = new HashMap<>();
        e.getBindingResult().getFieldErrors().forEach(error ->
            errors.put(error.getField(), error.getDefaultMessage())
        );

        ErrorResponse error = new ErrorResponse(
            HttpStatus.BAD_REQUEST.value(),
            "Validation failed",
            errors.toString(),
            LocalDateTime.now()
        );
        return new ResponseEntity<>(error, HttpStatus.BAD_REQUEST);
    }

    // Handle generic exceptions
    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorResponse> handleGeneric(Exception e) {
        ErrorResponse error = new ErrorResponse(
            HttpStatus.INTERNAL_SERVER_ERROR.value(),
            "Internal server error",
            "An unexpected error occurred",
            LocalDateTime.now()
        );
        return new ResponseEntity<>(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
}

// Error response DTO
public class ErrorResponse {
    private int statusCode;
    private String title;
    private String message;
    private LocalDateTime timestamp;

    // constructors, getters, setters
}
```

### Custom Exceptions:
```java
// Custom exception
public class ResourceNotFoundException extends RuntimeException {
    public ResourceNotFoundException(String message) {
        super(message);
    }
}

// Usage in service
@Service
public class UserService {
    public User getUser(Long id) {
        return userRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + id));
    }
}
```

### Interview Explanation:
"In a real-world application, you don't want try-catch blocks scattered throughout your controllers. Global exception handling with @ControllerAdvice allows you to centralize error handling, ensuring consistent error responses. For example, instead of returning different error formats from different controllers, you can have a single place that converts all exceptions to a standard JSON error response. This is especially important for REST APIs where clients expect consistent error formats."

**Interview Tip:** Centralizes error handling, improves maintainability. Always return meaningful error messages, not stack traces in production.

</details>

<details><summary style="font-size: 1.3em; font-weight: bold;">4. How do you validate request body in Spring Boot?</summary>

Spring Boot uses Bean Validation (JSR-380) with Hibernate Validator to validate request data. Validation ensures data integrity and provides meaningful error messages to clients.

### Key Annotations:
- **@Valid**: Triggers validation on the annotated object
- **@NotNull**: Field cannot be null
- **@NotEmpty**: Collection/string cannot be null or empty
- **@NotBlank**: String cannot be null, empty, or whitespace
- **@Size(min, max)**: Size constraints for strings, collections, arrays
- **@Email**: Valid email format
- **@Min/@Max**: Numeric constraints
- **@Pattern**: Regex validation

### Complete Implementation:
```java
// DTO with validation annotations
public class UserDTO {
    @NotNull(message = "Name cannot be null")
    @Size(min = 2, max = 50, message = "Name must be between 2 and 50 characters")
    private String name;

    @NotBlank(message = "Email is required")
    @Email(message = "Email should be valid")
    private String email;

    @NotNull(message = "Age cannot be null")
    @Min(value = 18, message = "Age must be at least 18")
    @Max(value = 100, message = "Age cannot exceed 100")
    private Integer age;

    @Pattern(regexp = "^\\+?[1-9]\\d{1,14}$", message = "Invalid phone number")
    private String phoneNumber;

    // Nested validation
    @Valid
    @NotNull(message = "Address is required")
    private AddressDTO address;

    // getters, setters
}

public class AddressDTO {
    @NotBlank(message = "Street is required")
    private String street;

    @NotBlank(message = "City is required")
    private String city;

    @Pattern(regexp = "\\d{5}", message = "ZIP code must be 5 digits")
    private String zipCode;
}

// Controller usage
@RestController
@RequestMapping("/api/users")
@Validated  // For method-level validation
public class UserController {

    @PostMapping
    public ResponseEntity<User> createUser(@Valid @RequestBody UserDTO userDTO) {
        User user = userService.createUser(userDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(user);
    }

    // Method-level validation
    @GetMapping("/search")
    public ResponseEntity<List<User>> searchUsers(
            @RequestParam @NotBlank @Size(min = 2) String name) {
        List<User> users = userService.findByName(name);
        return ResponseEntity.ok(users);
    }
}
```

### Custom Validation:
```java
// Custom annotation
@Target({ElementType.FIELD})
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = StrongPasswordValidator.class)
public @interface StrongPassword {
    String message() default "Password must contain at least 8 characters, one uppercase, one lowercase, and one digit";
    Class<?>[] groups() default {};
    Class<? extends Payload>[] payload() default {};
}

// Validator implementation
public class StrongPasswordValidator implements ConstraintValidator<StrongPassword, String> {
    @Override
    public boolean isValid(String password, ConstraintValidatorContext context) {
        if (password == null) return false;
        return password.length() >= 8 &&
               password.matches(".*[A-Z].*") &&
               password.matches(".*[a-z].*") &&
               password.matches(".*\\d.*");
    }
}
```

### Interview Explanation:
"Request validation is crucial for API security and data integrity. In Spring Boot, I use JSR-380 annotations like @NotNull, @Size, @Email on DTOs, and @Valid in controllers to trigger validation. When validation fails, Spring throws MethodArgumentNotValidException, which I handle in @ControllerAdvice to return meaningful error messages. For complex business rules, I create custom validation annotations. This prevents invalid data from entering the system and provides clear feedback to API consumers."

**Interview Tip:** Validation happens before controller logic. Handle validation errors in @ControllerAdvice. Use @Validated for method-level validation.

</details>

<details><summary style="font-size: 1.3em; font-weight: bold;">5. JPA (Java Persistence API)</summary>

JPA is a specification for Object-Relational Mapping (ORM) that allows Java objects to be mapped to database tables. It provides a standard way to perform database operations without writing SQL.

### Key Concepts:
- **Entity**: Java class mapped to database table
- **EntityManager**: Interface for CRUD operations
- **JPQL**: Java Persistence Query Language (object-oriented SQL)
- **Criteria API**: Type-safe query construction
- **Persistence Context**: Cache of entity instances

### Entity Mapping:
```java
@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "first_name", nullable = false, length = 50)
    private String firstName;

    @Column(name = "last_name", nullable = false, length = 50)
    private String lastName;

    @Column(unique = true, nullable = false)
    private String email;

    @Enumerated(EnumType.STRING)
    private UserStatus status;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "created_at")
    private Date createdAt;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Order> orders = new ArrayList<>();

    // Relationships
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "department_id")
    private Department department;

    // Lifecycle callbacks
    @PrePersist
    public void prePersist() {
        createdAt = new Date();
    }

    // constructors, getters, setters
}
```

### Repository Layer:
```java
@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    // Derived queries
    List<User> findByLastName(String lastName);
    List<User> findByEmailContaining(String email);
    List<User> findByStatusAndDepartment(UserStatus status, Department department);

    // Custom queries with JPQL
    @Query("SELECT u FROM User u WHERE u.createdAt > :date")
    List<User> findUsersCreatedAfter(@Param("date") Date date);

    // Native SQL queries
    @Query(value = "SELECT * FROM users WHERE email LIKE %:email%", nativeQuery = true)
    List<User> findByEmailNative(@Param("email") String email);

    // Custom methods with @Query
    @Query("SELECT u FROM User u LEFT JOIN FETCH u.orders WHERE u.id = :id")
    Optional<User> findByIdWithOrders(@Param("id") Long id);

    // Modifying queries
    @Modifying
    @Query("UPDATE User u SET u.status = :status WHERE u.id = :id")
    int updateUserStatus(@Param("id") Long id, @Param("status") UserStatus status);
}
```

### Service Layer with Transactions:
```java
@Service
@Transactional(readOnly = true)
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @Transactional
    public User createUser(UserDTO userDTO) {
        User user = new User();
        user.setFirstName(userDTO.getFirstName());
        user.setLastName(userDTO.getLastName());
        user.setEmail(userDTO.getEmail());
        return userRepository.save(user);
    }

    @Transactional
    public User updateUser(Long id, UserDTO userDTO) {
        User user = userRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        user.setFirstName(userDTO.getFirstName());
        user.setLastName(userDTO.getLastName());
        return userRepository.save(user);
    }
}
```

### Interview Explanation:
"JPA is the standard for ORM in Java. It maps Java objects to database tables, eliminating the need to write raw SQL for basic CRUD operations. I use entities with annotations like @Entity, @Table, @Column to define mappings. For complex queries, I use JPQL which is object-oriented. Spring Data JPA provides JpaRepository which gives me findBy, save, delete methods out of the box. The key is understanding lazy vs eager loading, and when to use @Transactional for data consistency."

**Interview Tip:** JPA abstracts database operations. Use @Query for custom queries. Be aware of N+1 query problem with lazy loading.

</details>

<details><summary style="font-size: 1.3em; font-weight: bold;">6. ResponseEntity</summary>

ResponseEntity is a powerful class in Spring that allows complete control over HTTP responses, including status codes, headers, and body. It's essential for building robust REST APIs.

### Why Use ResponseEntity?
- **Full HTTP Control**: Set status codes, headers, and body
- **Type Safety**: Generic type for response body
- **Flexibility**: Handle different response scenarios
- **REST Compliance**: Proper HTTP semantics

### Common Usage Patterns:
```java
@RestController
@RequestMapping("/api/users")
public class UserController {

    @GetMapping("/{id}")
    public ResponseEntity<User> getUser(@PathVariable Long id) {
        Optional<User> user = userService.findById(id);

        if (user.isPresent()) {
            return ResponseEntity.ok(user.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping
    public ResponseEntity<User> createUser(@Valid @RequestBody UserDTO userDTO) {
        User createdUser = userService.createUser(userDTO);

        // Return 201 Created with Location header
        URI location = ServletUriComponentsBuilder
            .fromCurrentRequest()
            .path("/{id}")
            .buildAndExpand(createdUser.getId())
            .toUri();

        return ResponseEntity.created(location).body(createdUser);
    }

    @PutMapping("/{id}")
    public ResponseEntity<User> updateUser(@PathVariable Long id, @Valid @RequestBody UserDTO userDTO) {
        try {
            User updatedUser = userService.updateUser(id, userDTO);
            return ResponseEntity.ok(updatedUser);
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
        try {
            userService.deleteUser(id);
            return ResponseEntity.noContent().build(); // 204 No Content
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping
    public ResponseEntity<List<User>> getUsers(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {

        Page<User> userPage = userService.getUsers(PageRequest.of(page, size));

        return ResponseEntity.ok()
            .header("X-Total-Count", String.valueOf(userPage.getTotalElements()))
            .header("X-Total-Pages", String.valueOf(userPage.getTotalPages()))
            .body(userPage.getContent());
    }
}
```

### Static Factory Methods:
```java
// Success responses
ResponseEntity.ok()                    // 200 OK
ResponseEntity.ok(body)               // 200 OK with body
ResponseEntity.created(uri)           // 201 Created
ResponseEntity.accepted()             // 202 Accepted
ResponseEntity.noContent()            // 204 No Content

// Error responses
ResponseEntity.badRequest()           // 400 Bad Request
ResponseEntity.notFound()             // 404 Not Found
ResponseEntity.status(409).build()    // 409 Conflict

// Custom responses
ResponseEntity.status(HttpStatus.TOO_MANY_REQUESTS)
    .header("Retry-After", "60")
    .body("Rate limit exceeded");
```

### Advanced Usage with Headers:
```java
@GetMapping("/download/{fileId}")
public ResponseEntity<byte[]> downloadFile(@PathVariable String fileId) {
    byte[] fileContent = fileService.getFileContent(fileId);
    String fileName = fileService.getFileName(fileId);

    HttpHeaders headers = new HttpHeaders();
    headers.setContentType(MediaType.APPLICATION_OCTET_STREAM);
    headers.setContentDispositionFormData("attachment", fileName);
    headers.setContentLength(fileContent.length);

    return ResponseEntity.ok()
        .headers(headers)
        .body(fileContent);
}
```

### Interview Explanation:
"ResponseEntity gives you complete control over HTTP responses. Instead of just returning objects (which Spring converts to JSON with 200 OK), you can set specific status codes, add headers, and handle different scenarios properly. For example, when creating a resource, you return 201 Created with a Location header pointing to the new resource. When deleting, you return 204 No Content. This is crucial for REST API design and proper HTTP semantics."

**Interview Tip:** Use for custom responses, not just returning objects. Always use appropriate HTTP status codes and headers.

</details>

<details><summary style="font-size: 1.3em; font-weight: bold;">7. Types of Exceptions (from GlobalExceptionHandler)</summary>

- 403 Forbidden: AccessDeniedException
- 404 Not Found: UsernameNotFoundException, ResourceNotFoundException
- 400 Bad Request: ExecutionException, InterruptedException, MethodArgumentNotValidException, etc.
- 405 Method Not Allowed: HttpRequestMethodNotSupportedException
- 500 Internal Server Error: Exception (generic)

**Interview Tip:** Map exceptions to appropriate HTTP status codes for REST APIs.

</details>

<details><summary style="font-size: 1.3em; font-weight: bold;">8. Spring Boot Topics</summary>

### Core Concepts
- @SpringBootApplication
- Auto-configuration
- Application properties/YAML
- Profiles
- Actuator

### REST APIs
- @RestController, @RequestMapping
- @RequestParam, @PathVariable, @RequestBody
- ResponseEntity

### Data Persistence
- Spring Data JPA
- Entities, Repositories
- @Transactional

### Security
- Spring Security
- Authentication/Authorization
- JWT/OAuth2

### Testing
- @SpringBootTest, @WebMvcTest
- JUnit, Mockito

### Advanced
- Caching, Messaging, Scheduling, Async

**Interview Tip:** Master auto-configuration and profiles for environment-specific configs.

</details>

<details><summary style="font-size: 1.3em; font-weight: bold;">9. Spring Boot Annotations</summary>

### Stereotype
- @Component, @Service, @Repository, @Controller, @RestController

### Configuration
- @Configuration, @Bean, @ComponentScan

### Web
- @RequestMapping, @GetMapping, @PostMapping, @RequestParam, @PathVariable, @RequestBody, @ResponseBody

### DI
- @Autowired, @Qualifier, @Value

### Data
- @Entity, @Table, @Transactional

### Validation
- @Valid, @NotNull, @Size

### Testing
- @SpringBootTest, @MockBean

**Interview Tip:** @RestController = @Controller + @ResponseBody.

</details>

<details><summary style="font-size: 1.3em; font-weight: bold;">10. RequestParam, PathVariable, RequestBody, ResponseBody</summary>

| Annotation     | Used For              | Example URL          | Example Usage |
|----------------|-----------------------|----------------------|---------------|
| @RequestParam | Query parameters     | /greet?name=Srini   | @GetMapping("/greet") public String greet(@RequestParam String name) |
| @PathVariable | URL path variables    | /users/101          | @GetMapping("/users/{id}") public String getUser(@PathVariable int id) |
| @RequestBody  | JSON body to object   | /createUser (POST)  | @PostMapping("/createUser") public String createUser(@RequestBody User user) |
| @ResponseBody | Return value as response | /welcome           | @GetMapping("/welcome") @ResponseBody public String welcome() |

**Interview Tip:** @RequestParam for optional params, @PathVariable for required path parts.

</details>

<details><summary style="font-size: 1.3em; font-weight: bold;">11. @Autowired vs Constructor Injection</summary>

@Autowired is an annotation used to inject dependencies. It can be used in field, setter, or constructor injection. Constructor injection is recommended because it makes dependencies mandatory, supports immutability, improves testability, and follows good design principles.

Example:
```java
@Service
class Service {
    private final Repo repo;

    Service(Repo repo) { // no @Autowired needed in Spring 4.3+
        this.repo = repo;
    }
}
```

**Interview Tip:** Constructor injection prevents null dependencies and is testable.

</details>

<details><summary style="font-size: 1.3em; font-weight: bold;">12. Spring Profiles</summary>

Spring Profiles allow you to have different configurations for different environments (dev, test, prod).

Use @Profile annotation on beans or @ConditionalOnProperty.

Example:
```java
@Configuration
@Profile("dev")
class DevConfig {
    @Bean
    DataSource dataSource() {
        return new H2DataSource(); // in-memory DB for dev
    }
}

@Configuration
@Profile("prod")
class ProdConfig {
    @Bean
    DataSource dataSource() {
        return new MySQLDataSource(); // production DB
    }
}
```

**Interview Tip:** Use profiles to manage environment-specific configurations. Activate with spring.profiles.active=dev.

</details>

<details><summary style="font-size: 1.3em; font-weight: bold;">13. Spring Boot Actuator</summary>

Spring Boot Actuator provides production-ready features like health checks, metrics, and monitoring.

Key endpoints:
- /actuator/health - Application health status
- /actuator/info - Application info
- /actuator/metrics - Application metrics
- /actuator/env - Environment properties

Enable in application.properties:
```properties
management.endpoints.web.exposure.include=health,info,metrics
```

**Interview Tip:** Actuator helps monitor application health and performance in production.

</details>

<details><summary style="font-size: 1.3em; font-weight: bold;">14. Spring Security Basics</summary>

Spring Security provides comprehensive security services for Java applications, including authentication, authorization, and protection against common attacks. It's the de facto standard for securing Spring applications.

### Core Concepts:
- **Authentication**: Verifying user identity (who you are)
- **Authorization**: Checking permissions (what you can do)
- **Principal**: Currently authenticated user
- **GrantedAuthority**: Permissions/roles assigned to user
- **SecurityContext**: Holds authentication information

### Basic Configuration:
```java
@Configuration
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    @Autowired
    private UserDetailsService userDetailsService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(userDetailsService)
            .passwordEncoder(passwordEncoder);
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.csrf().disable()
            .authorizeRequests()

            // Public endpoints
            .antMatchers("/api/auth/**").permitAll()
            .antMatchers("/h2-console/**").permitAll()

            // Role-based access
            .antMatchers("/api/admin/**").hasRole("ADMIN")
            .antMatchers("/api/user/**").hasAnyRole("USER", "ADMIN")
            .antMatchers(HttpMethod.GET, "/api/products/**").permitAll()
            .antMatchers(HttpMethod.POST, "/api/products/**").hasRole("ADMIN")

            // All other requests need authentication
            .anyRequest().authenticated()

            .and()
            .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
            .and()
            .addFilterBefore(jwtAuthenticationFilter(), UsernamePasswordAuthenticationFilter.class);
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
```

### JWT Authentication Implementation:
```java
@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private UserDetailsService userDetailsService;

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain) throws ServletException, IOException {

        final String authHeader = request.getHeader("Authorization");
        final String jwt;
        final String userEmail;

        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            filterChain.doFilter(request, response);
            return;
        }

        jwt = authHeader.substring(7);
        userEmail = jwtUtil.extractUsername(jwt);

        if (userEmail != null && SecurityContextHolder.getContext().getAuthentication() == null) {
            UserDetails userDetails = userDetailsService.loadUserByUsername(userEmail);

            if (jwtUtil.isTokenValid(jwt, userDetails)) {
                UsernamePasswordAuthenticationToken authToken =
                    new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
                authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                SecurityContextHolder.getContext().setAuthentication(authToken);
            }
        }

        filterChain.doFilter(request, response);
    }
}
```

### UserDetails and UserDetailsService:
```java
@Entity
public class User implements UserDetails {
    @Id
    @GeneratedValue
    private Long id;

    @Column(unique = true)
    private String email;

    private String password;

    @Enumerated(EnumType.STRING)
    private Role role;

    private boolean enabled = true;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority("ROLE_" + role.name()));
    }

    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return enabled;
    }
}

@Service
public class UserDetailsServiceImpl implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        User user = userRepository.findByEmail(email)
            .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        return user;
    }
}
```

### Method-Level Security:
```java
@Service
public class ProductService {

    @PreAuthorize("hasRole('ADMIN')")
    public Product createProduct(ProductDTO productDTO) {
        // Only admins can create products
        return productRepository.save(new Product(productDTO));
    }

    @PostAuthorize("returnObject.owner == authentication.name or hasRole('ADMIN')")
    public Product getProduct(Long id) {
        // Users can see their own products or admins can see all
        return productRepository.findById(id).orElse(null);
    }

    @PreFilter("filterObject.owner == authentication.name")
    public List<Product> getMyProducts(List<Product> products) {
        // Filter the input list to only user's products
        return products;
    }
}
```

### Interview Explanation:
"Spring Security handles authentication and authorization in Spring applications. I configure it by extending WebSecurityConfigurerAdapter and overriding configure methods. For JWT authentication, I create a filter that extracts the token from Authorization header, validates it, and sets the authentication in SecurityContext. I use @PreAuthorize for method-level security and configure URL-based security in the HttpSecurity config. The key is understanding the difference between authentication (who you are) and authorization (what you can do)."

**Interview Tip:** Spring Security secures applications with minimal configuration. Use @PreAuthorize for method-level security. Always use BCrypt for password encoding.

</details>

<details><summary style="font-size: 1.3em; font-weight: bold;">15. REST API Design Best Practices</summary>

### HTTP Methods
- GET: Retrieve data
- POST: Create new resource
- PUT: Update existing resource
- DELETE: Remove resource
- PATCH: Partial update

### Status Codes
- 200 OK: Success
- 201 Created: Resource created
- 400 Bad Request: Invalid input
- 401 Unauthorized: Authentication required
- 403 Forbidden: Access denied
- 404 Not Found: Resource not found
- 500 Internal Server Error: Server error

### Best Practices
- Use nouns for endpoints (/users, /orders)
- Use plural nouns
- Use HTTP status codes properly
- Version your APIs (/v1/users)
- Use HATEOAS for discoverability

**Interview Tip:** Follow REST conventions for maintainable APIs. Use proper HTTP methods and status codes.

</details>

<details><summary style="font-size: 1.3em; font-weight: bold;">16. Spring Boot Testing</summary>

Spring Boot provides comprehensive testing support with various testing slices and utilities. Testing is crucial for maintaining code quality and preventing regressions.

### Testing Pyramid:
1. **Unit Tests** (Bottom layer - most numerous)
2. **Integration Tests** (Middle layer)
3. **End-to-End Tests** (Top layer - fewest)

### Unit Testing:
```java
@SpringBootTest
class UserServiceTest {

    @Autowired
    private UserService userService;

    @MockBean
    private UserRepository userRepository;

    @Test
    void createUser_ShouldReturnSavedUser() {
        // Arrange
        UserDTO userDTO = new UserDTO("John", "Doe", "john@example.com");
        User savedUser = new User(1L, "John", "Doe", "john@example.com");

        when(userRepository.save(any(User.class))).thenReturn(savedUser);

        // Act
        User result = userService.createUser(userDTO);

        // Assert
        assertNotNull(result);
        assertEquals("John", result.getFirstName());
        assertEquals("Doe", result.getLastName());
        verify(userRepository).save(any(User.class));
    }

    @Test
    void getUserById_UserExists_ShouldReturnUser() {
        // Arrange
        User user = new User(1L, "John", "Doe", "john@example.com");
        when(userRepository.findById(1L)).thenReturn(Optional.of(user));

        // Act
        Optional<User> result = userService.getUserById(1L);

        // Assert
        assertTrue(result.isPresent());
        assertEquals("John", result.get().getFirstName());
    }

    @Test
    void getUserById_UserNotFound_ShouldThrowException() {
        // Arrange
        when(userRepository.findById(1L)).thenReturn(Optional.empty());

        // Act & Assert
        assertThrows(ResourceNotFoundException.class, () -> {
            userService.getUserById(1L);
        });
    }
}
```

### Integration Testing:
```java
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
class UserControllerIntegrationTest {

    @Autowired
    private TestRestTemplate restTemplate;

    @Autowired
    private UserRepository userRepository;

    @BeforeEach
    void setUp() {
        userRepository.deleteAll();
    }

    @Test
    void createUser_ShouldReturnCreatedUser() {
        // Arrange
        UserDTO userDTO = new UserDTO("Jane", "Smith", "jane@example.com");

        // Act
        ResponseEntity<User> response = restTemplate.postForEntity("/api/users", userDTO, User.class);

        // Assert
        assertEquals(HttpStatus.CREATED, response.getStatus());
        assertNotNull(response.getBody());
        assertEquals("Jane", response.getBody().getFirstName());
        assertNotNull(response.getBody().getId());
    }

    @Test
    void getUser_UserExists_ShouldReturnUser() {
        // Arrange
        User savedUser = userRepository.save(new User(null, "Bob", "Wilson", "bob@example.com"));

        // Act
        ResponseEntity<User> response = restTemplate.getForEntity("/api/users/" + savedUser.getId(), User.class);

        // Assert
        assertEquals(HttpStatus.OK, response.getStatus());
        assertNotNull(response.getBody());
        assertEquals("Bob", response.getBody().getFirstName());
    }

    @Test
    void getUser_UserNotFound_ShouldReturn404() {
        // Act
        ResponseEntity<String> response = restTemplate.getForEntity("/api/users/999", String.class);

        // Assert
        assertEquals(HttpStatus.NOT_FOUND, response.getStatus());
    }
}
```

### Testing Slices (Focused Testing):
```java
// Test only web layer
@WebMvcTest(UserController.class)
class UserControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private UserService userService;

    @Test
    void getUser_ShouldReturnUser() throws Exception {
        User user = new User(1L, "John", "Doe", "john@example.com");
        when(userService.getUserById(1L)).thenReturn(Optional.of(user));

        mockMvc.perform(get("/api/users/1"))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.firstName").value("John"))
            .andExpect(jsonPath("$.email").value("john@example.com"));
    }
}

// Test only data layer
@DataJpaTest
class UserRepositoryTest {

    @Autowired
    private UserRepository userRepository;

    @Test
    void saveUser_ShouldPersistUser() {
        User user = new User(null, "Alice", "Brown", "alice@example.com");
        User savedUser = userRepository.save(user);

        assertNotNull(savedUser.getId());
        assertEquals("Alice", savedUser.getFirstName());
    }

    @Test
    void findByEmail_ShouldReturnUser() {
        User user = userRepository.save(new User(null, "Charlie", "Davis", "charlie@example.com"));
        Optional<User> found = userRepository.findByEmail("charlie@example.com");

        assertTrue(found.isPresent());
        assertEquals("Charlie", found.get().getFirstName());
    }
}
```

### Mocking with Mockito:
```java
@ExtendWith(MockitoExtension.class)
class UserServiceUnitTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private EmailService emailService;

    @InjectMocks
    private UserService userService;

    @Test
    void createUser_ShouldSendWelcomeEmail() {
        // Arrange
        UserDTO userDTO = new UserDTO("Test", "User", "test@example.com");
        User savedUser = new User(1L, "Test", "User", "test@example.com");

        when(userRepository.save(any(User.class))).thenReturn(savedUser);
        doNothing().when(emailService).sendWelcomeEmail(anyString());

        // Act
        User result = userService.createUser(userDTO);

        // Assert
        assertNotNull(result);
        verify(userRepository).save(any(User.class));
        verify(emailService).sendWelcomeEmail("test@example.com");
    }
}
```

### Interview Explanation:
"Testing in Spring Boot follows the testing pyramid with unit tests at the base, integration tests in the middle, and e2e tests at the top. I use @SpringBootTest for full integration tests, @WebMvcTest for controller testing, and @DataJpaTest for repository testing. For unit tests, I mock dependencies with @MockBean or Mockito. The key is testing behavior, not implementation, and maintaining fast, reliable tests that give confidence in code changes."

**Interview Tip:** Use @SpringBootTest for integration tests, @WebMvcTest for controller tests, @DataJpaTest for repository tests. Focus on testing behavior over implementation.

</details>

<details><summary style="font-size: 1.3em; font-weight: bold;">17. Caching in Spring Boot</summary>

Spring Boot supports caching with annotations.

Enable caching:
```java
@SpringBootApplication
@EnableCaching
class Application { }
```

Cache methods:
```java
@Service
class UserService {
    @Cacheable("users")
    public User getUser(Long id) {
        return repository.findById(id).orElse(null);
    }

    @CacheEvict(value = "users", key = "#user.id")
    public User updateUser(User user) {
        return repository.save(user);
    }
}
```

Supported cache providers: EhCache, Redis, Caffeine, etc.

**Interview Tip:** Caching improves performance. Use @Cacheable for read operations, @CacheEvict for updates.

</details>

<details><summary style="font-size: 1.3em; font-weight: bold;">18. Spring Boot with Docker</summary>

Dockerize Spring Boot application with multi-stage build.

Dockerfile:
```dockerfile
# Build stage
FROM maven:3.8-openjdk-17 AS build
WORKDIR /app
COPY pom.xml .
COPY src ./src
RUN mvn clean package -DskipTests

# Runtime stage
FROM openjdk:17-jre-slim
WORKDIR /app
COPY --from=build /app/target/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
```

**Interview Tip:** Multi-stage builds reduce image size. Use JRE instead of JDK for runtime.

</details>

<details><summary style="font-size: 1.3em; font-weight: bold;">19. JWT Authentication in Spring Boot</summary>

JSON Web Tokens for stateless authentication.

Add dependency:
```xml
<dependency>
    <groupId>io.jsonwebtoken</groupId>
    <artifactId>jjwt</artifactId>
    <version>0.9.1</version>
</dependency>
```

Generate JWT:
```java
@Component
class JwtUtil {
    public String generateToken(String username) {
        return Jwts.builder()
            .setSubject(username)
            .setIssuedAt(new Date())
            .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 10))
            .signWith(SignatureAlgorithm.HS256, secret)
            .compact();
    }

    public String extractUsername(String token) {
        return Jwts.parser().setSigningKey(secret).parseClaimsJws(token).getBody().getSubject();
    }
}
```

**Interview Tip:** JWT enables stateless authentication. Store secret securely, set reasonable expiration.

</details>

<details><summary style="font-size: 1.3em; font-weight: bold;">20. Spring Boot Microservices</summary>

Spring Boot with Spring Cloud for microservices.

Key components:
- Spring Cloud Config: Centralized configuration
- Spring Cloud Gateway: API Gateway
- Eureka: Service Discovery
- Spring Cloud Sleuth: Distributed tracing
- Resilience4j: Circuit breaker

Example service registration:
```java
@SpringBootApplication
@EnableEurekaClient
class UserServiceApplication {
    public static void main(String[] args) {
        SpringApplication.run(UserServiceApplication.class, args);
    }
}
```

**Interview Tip:** Microservices with Spring Boot enable scalable, maintainable systems. Use service discovery for inter-service communication.

</details>

<details><summary style="font-size: 1.3em; font-weight: bold;">21. API Gateway in Spring Boot</summary>

An API Gateway is a single entry point for all client requests in a microservices architecture. Instead of clients calling multiple services directly, they send requests to the gateway, which then routes them to the appropriate service.

### 🧠 Simple Definition

API Gateway = Front door for your backend services

### 📊 Why We Need API Gateway

**Without API Gateway:**
- Client calls multiple services ❌
- Complex logic on frontend ❌
- Security handled everywhere ❌

**With API Gateway:**
- One endpoint ✅
- Centralized logic ✅
- Easier management ✅

### 🔄 How It Works
```
Client (Mobile/Web)
        ↓
   API Gateway
   ↓    ↓    ↓
User  Order  Payment Services
```

### ⚙️ Key Responsibilities
#### 1. Routing
Sends request to correct microservice

**Example:** /users → User Service

#### 2. Authentication & Authorization
Validates tokens (JWT, OAuth2)

#### 3. Load Balancing
Distributes traffic across instances

#### 4. Rate Limiting
Prevents too many requests (protects backend)

#### 5. Logging & Monitoring
Tracks requests and responses

#### 6. Request/Response Transformation
Modify headers, format, etc.

### 🔧 API Gateway in Spring Boot

In Spring Cloud Gateway:

**Example Config (application.yml):**
```yaml
spring:
  cloud:
    gateway:
      routes:
        - id: user-service
          uri: http://localhost:8081
          predicates:
            - Path=/users/**
```

👉 This means: Request /users/** → forwarded to user service

### 🚀 Popular API Gateways
- Spring Cloud Gateway
- Netflix Zuul
- Kong Gateway
- Amazon API Gateway

### ⚠️ Disadvantages
- Single point of failure (if not handled properly)
- Adds slight latency
- Extra component to manage

### 🧠 Interview One-Liner

"API Gateway is a centralized entry point that handles routing, security, and cross-cutting concerns for microservices."

**Interview Tip:** API Gateway simplifies client interactions with microservices. Use Spring Cloud Gateway for Spring Boot applications. Always implement proper security and monitoring.
</details>

<details><summary style="font-size: 1.3em; font-weight: bold;">22. Spring Boot Features (Common Interview Mistake)</summary>

Ahh — this is a very common mistake 👍
You answered with annotations, but the question was about features of Spring Boot, not just annotations.

Let's fix this so you can answer perfectly in interview 👇

🧠 What they EXPECT when they ask

👉 "What are Spring Boot features?"

They want:

Advantages
Capabilities
Why we use it
✅ Best Interview Answer (Short & Strong)

"Spring Boot simplifies application development by providing auto-configuration, embedded servers, and production-ready features. It reduces boilerplate code and allows rapid development using minimal configuration."

🔥 Key Spring Boot Features (Explain These)
1. ✅ Auto Configuration

👉 Automatically configures based on dependencies

Example:

Add dependency → Spring configures automatically
2. ✅ Embedded Server

👉 No need external server like Tomcat

Runs with:
java -jar app.jar
3. ✅ Starter Dependencies

👉 Predefined dependency sets

Examples:

spring-boot-starter-web
spring-boot-starter-data-jpa
4. ✅ Minimal Configuration

👉 No XML needed

✔️ Uses annotations + properties

5. ✅ Production Ready Features (Actuator)

👉 Monitoring & health check

/actuator/health
/actuator/metrics
6. ✅ Spring Boot CLI (Optional)

👉 Quick prototyping

7. ✅ Externalized Configuration

👉 Use:

application.properties
application.yml
8. ✅ DevTools

👉 Auto restart, live reload

⚠️ Where YOU went wrong

You said:
👉 "Annotations"

❌ That's part of Spring, not the main feature of Spring Boot

🎯 Correct vs Wrong
| Your Answer | Better Answer |
|-------------|---------------|
| Annotations | Auto-config, embedded server, starters |
| @RestController | Production-ready features |
| @Autowired | External configuration |

💬 Perfect Interview Answer (Final Version)

Say this confidently:

"Spring Boot provides features like auto-configuration, embedded servers, and starter dependencies which simplify development. It also offers production-ready features like actuator, externalized configuration, and minimal setup, allowing faster development without boilerplate code."

🚀 Pro Tip (Impress Interviewer)

Add this line:

"Spring Boot follows convention over configuration, which reduces manual setup."

⚡ One-Line Backup Answer

If you forget everything:

👉

"Spring Boot reduces configuration effort and helps build production-ready applications quickly."
</details>

## Interview Questions

<details><summary style="font-size: 1.3em; font-weight: bold;">What is Spring Boot and why use it?</summary>

**Explanation:** Spring Boot is a framework that simplifies Spring application development by providing auto-configuration, embedded servers, and production-ready features.

**Example:** With Spring Boot, you can create a web application with just a main class and controller, no XML configuration needed.

**Real-time Example:** In a microservices architecture, Spring Boot allows each service to be independently deployable with embedded Tomcat and minimal configuration.

</details>

<details><summary style="font-size: 1.3em; font-weight: bold;">Explain dependency injection in Spring Boot.</summary>

**Explanation:** Dependency injection is a design pattern where Spring manages object creation and injection of dependencies, promoting loose coupling.

**Example:** Instead of `new UserService()`, Spring injects the service using @Autowired.

**Real-time Example:** In an e-commerce app, OrderService gets injected with PaymentService and InventoryService automatically.

</details>

<details><summary style="font-size: 1.3em; font-weight: bold;">What is auto-configuration in Spring Boot?</summary>

**Explanation:** Auto-configuration automatically configures beans based on classpath dependencies, reducing manual configuration.

**Example:** Adding spring-boot-starter-data-jpa automatically configures DataSource, EntityManager, and repositories.

**Real-time Example:** When building a REST API, adding the web starter automatically configures DispatcherServlet and JSON converters.

</details>

<details><summary style="font-size: 1.3em; font-weight: bold;">How does Spring Boot handle exception handling?</summary>

**Explanation:** Spring Boot uses @ControllerAdvice for global exception handling, providing consistent error responses.

**Example:** @ExceptionHandler methods in a @ControllerAdvice class handle specific exceptions and return appropriate HTTP status codes.

**Real-time Example:** In a user management system, ResourceNotFoundException returns 404, while ValidationException returns 400 with field errors.

</details>

<details><summary style="font-size: 1.3em; font-weight: bold;">Explain Spring Data JPA and its benefits.</summary>

**Explanation:** Spring Data JPA simplifies database operations by providing repository interfaces that auto-generate queries.

**Example:** Extending JpaRepository gives you CRUD operations without implementation.

**Real-time Example:** In a blog application, PostRepository extends JpaRepository to get findByTitle(), save(), delete() methods automatically.

</details>

<details><summary style="font-size: 1.3em; font-weight: bold;">What is the difference between @RestController and @Controller?</summary>

**Explanation:** @RestController combines @Controller and @ResponseBody, automatically serializing return values to JSON.

**Example:** @RestController methods return objects, @Controller methods return view names.

**Real-time Example:** In a REST API, @RestController returns User objects as JSON, while @Controller returns HTML views for web pages.

</details>

<details><summary style="font-size: 1.3em; font-weight: bold;">How do you secure a Spring Boot application?</summary>

**Explanation:** Spring Security provides authentication and authorization. Configure with WebSecurityConfigurerAdapter.

**Example:** Override configure(HttpSecurity) to define URL patterns and their access requirements.

**Real-time Example:** In a banking app, secure /api/accounts/** with ROLE_USER and /api/admin/** with ROLE_ADMIN.

</details>

<details><summary style="font-size: 1.3em; font-weight: bold;">Explain Spring Boot profiles and their usage.</summary>

**Explanation:** Profiles allow different configurations for different environments like dev, test, prod.

**Example:** @Profile("dev") beans are only created when dev profile is active.

**Real-time Example:** Use dev profile for H2 database and logging, prod profile for PostgreSQL and minimal logging.

</details>

<details><summary style="font-size: 1.3em; font-weight: bold;">What is caching in Spring Boot and how to implement it?</summary>

**Explanation:** Caching stores method results to avoid repeated expensive operations.

**Example:** @Cacheable on a method caches its result, @CacheEvict clears cache on updates.

**Real-time Example:** Cache user details in a social media app to avoid database hits for frequently accessed profiles.

</details>

<details><summary style="font-size: 1.3em; font-weight: bold;">How do you test Spring Boot applications?</summary>

**Explanation:** Spring Boot provides @SpringBootTest for integration tests, @WebMvcTest for controllers, @DataJpaTest for repositories.

**Example:** @SpringBootTest loads the full application context, while @WebMvcTest tests only the web layer.

**Real-time Example:** Use @DataJpaTest to test repository methods with an embedded database, ensuring data access logic works correctly.

</details>

<details><summary style="font-size: 1.3em; font-weight: bold;">What is Spring Boot Actuator and its uses?</summary>

**Explanation:** Spring Boot Actuator provides production-ready features like health checks, metrics, and monitoring endpoints.

**Example:** /actuator/health shows application health, /actuator/metrics shows JVM metrics.

**Real-time Example:** In a deployed application, monitoring tools poll actuator endpoints to check service health and trigger alerts.

</details>

<details><summary style="font-size: 1.3em; font-weight: bold;">Explain Spring Boot configuration properties.</summary>

**Explanation:** @ConfigurationProperties binds external configuration (properties/yaml) to Java objects.

**Example:** @ConfigurationProperties(prefix = "app") binds app.name, app.version to a config class.

**Real-time Example:** In a multi-tenant app, different profiles load different database configs from application.yml.

</details>

<details><summary style="font-size: 1.3em; font-weight: bold;">What is the difference between @Component, @Service, @Repository?</summary>

**Explanation:** All are stereotypes for dependency injection, but @Repository adds exception translation, @Service indicates business logic.

**Example:** @Repository for DAOs (translates SQLExceptions), @Service for business logic, @Component for generic beans.

**Real-time Example:** In a layered architecture, @Repository in data layer, @Service in business layer, @Component in infrastructure layer.

</details>

<details><summary style="font-size: 1.3em; font-weight: bold;">How do you handle validation in Spring Boot?</summary>

**Explanation:** Use Bean Validation with @Valid and annotations like @NotNull, @Email on DTOs.

**Example:** @PostMapping public User create(@Valid @RequestBody UserDTO dto) validates input.

**Real-time Example:** In a registration form, @Email ensures valid email format, @NotBlank prevents empty names.

</details>

</details>

</details>
