# Ruby on Rails: Interview Questions and Answers

**A practical Rails guide for Java/Spring Boot and React developers.**

Rails is easier to understand when you connect its conventions to tools you already know. This guide compares Ruby and Rails concepts with Java, Spring Boot, common persistence patterns, and React. Expand each question to review its answer, then try the examples in a Rails practice application.

> **Mental model:** Ruby is the language; Rails is a web framework written in Ruby. Spring Boot relates to Java in a similar way: Java is the language, and Spring Boot is a framework built on it. React is usually the browser-side UI; Rails commonly handles routing, server-side logic, persistence, and HTML or JSON responses.

## Contents

| Level | Focus |
|---|---|
| [1. Ruby and Rails Basics](#level-1-ruby-and-rails-basics) | Language, framework, conventions, and project structure |
| [2. Request Lifecycle and MVC](#level-2-request-lifecycle-and-mvc) | Routes, controllers, models, views, and JSON APIs |
| [3. Active Record and Databases](#level-3-active-record-and-databases) | Models, queries, associations, migrations, and transactions |
| [4. Forms, Validation, and Security](#level-4-forms-validation-and-security) | Params, validation, authentication, and web security |
| [5. Testing and Maintainability](#level-5-testing-and-maintainability) | Tests, jobs, caching, and application design |
| [6. Production and Advanced Rails](#level-6-production-and-advanced-rails) | Environments, deployment, performance, and operations |
| [Comparison and Command Tables](#comparison-reference) | Rails to Spring/Java/React mappings and common commands |
| [Practice Project](#practice-project) | A small Rails API connected to a React client |

## Level 1: Ruby and Rails Basics

<details>
<summary>1. What is Ruby?</summary>

**Answer:** Ruby is a high-level, dynamically typed, object-oriented programming language. Its syntax is designed to be expressive and readable. Compared with Java, Ruby usually does not require explicit type declarations or a compile step for ordinary application development.

</details>

<details>
<summary>2. What is Ruby on Rails?</summary>

**Answer:** Ruby on Rails, usually called Rails, is a web application framework written in Ruby. It provides conventions and tools for routing, controllers, models, database access, views, testing, and application configuration. Spring Boot plays a similar framework role in a Java application.

</details>

<details>
<summary>3. How are Ruby, Rails, Java, and Spring Boot related?</summary>

**Answer:** Ruby is a programming language and Rails is a framework built with Ruby. Java is a programming language and Spring Boot is a framework built for Java. Rails and Spring Boot both help implement web applications, but their APIs, defaults, and conventions differ.

</details>

<details>
<summary>4. What does convention over configuration mean in Rails?</summary>

**Answer:** Rails uses common naming and directory conventions to infer behavior, reducing repetitive setup. For example, a `Book` model conventionally maps to a `books` table. Spring Boot also uses conventions and auto-configuration, though the specific conventions and extension points differ.

</details>

<details>
<summary>5. What is the Rails principle of DRY?</summary>

**Answer:** DRY means “Don't Repeat Yourself”: represent each piece of knowledge in one authoritative place when practical. Rails generators, shared validations, and layouts can reduce duplication, but excessive abstraction can make code harder to follow.

</details>

<details>
<summary>6. What is the difference between Ruby and Java typing?</summary>

**Answer:** Ruby is dynamically typed: values have types at runtime, and variables can refer to values of different types over time. Java is statically typed and checks declared types during compilation. Ruby offers flexibility; Java's compiler can catch many type errors earlier.

</details>

<details>
<summary>7. What is a Ruby gem?</summary>

**Answer:** A gem is a packaged Ruby library or application. Gems are declared in a `Gemfile` and resolved by Bundler. This is comparable to adding dependencies in Maven's `pom.xml` or Gradle build files.

</details>

<details>
<summary>8. What are Bundler, the Gemfile, and Gemfile.lock?</summary>

**Answer:** Bundler manages Ruby application dependencies. `Gemfile` declares dependencies and sources; `Gemfile.lock` records the resolved versions so developers and deployment systems use a consistent dependency set. The pairing is similar in purpose to a Maven/Gradle dependency declaration plus a resolved dependency lock or version catalog, though the exact mechanisms differ.

</details>

<details>
<summary>9. What does <code>bundle exec</code> do?</summary>

**Answer:** `bundle exec` runs a command using the gem versions resolved for the current application. For example, `bundle exec rails server` avoids accidentally running a Rails or gem version outside the project's bundle.

</details>

<details>
<summary>10. What is a Rails application structure?</summary>

**Answer:** Rails separates common responsibilities into directories. `app/models` holds domain and persistence logic, `app/controllers` handles web requests, `app/views` contains server-rendered templates, `config` stores application configuration and routes, `db` contains migrations and schema, and `test` contains tests. This resembles a Spring project organized into controllers, services, repositories/entities, resources, and tests, but Rails follows its own conventions.

</details>

<details>
<summary>11. How do you start and inspect a Rails application?</summary>

**Answer:** Common commands include `bin/rails server` to start the development server, `bin/rails routes` to list routes, and `bin/rails console` to open an interactive application console. Prefer the project's `bin/rails` so it uses the application's installed Rails version.

```bash
bin/rails server
bin/rails routes
bin/rails console
```

</details>

## Level 2: Request Lifecycle and MVC

<details>
<summary>12. What is MVC in Rails?</summary>

**Answer:** MVC separates an application into Model, View, and Controller. Models represent domain and persistence behavior, controllers coordinate a request, and views format the response. React can serve as a separate client UI; a Rails API may return JSON instead of rendering an HTML view.

</details>

<details>
<summary>13. What happens when a request reaches a Rails application?</summary>

**Answer:** The request enters the Rack/Rails middleware stack, Rails matches it to a route, invokes a controller action, and the action may call models or other services. Rails then renders a template or another response and sends it back through middleware to the client. In a React + Rails app, React sends the HTTP request and renders the returned data.

</details>

<details>
<summary>14. What is Rack in Ruby web applications?</summary>

**Answer:** Rack is a Ruby interface between web servers and web applications. Rails applications run through Rack-compatible servers and middleware. It is broadly comparable to the Java Servlet container and filter pipeline, although the APIs and runtime behavior are different.

</details>

<details>
<summary>15. What is a Rails route?</summary>

**Answer:** A route maps an HTTP method and URL pattern to a controller action or another endpoint. It is similar to a Spring MVC mapping such as `@GetMapping("/books")`.

```ruby
# config/routes.rb
Rails.application.routes.draw do
  get "/books", to: "books#index"
end
```

</details>

<details>
<summary>16. What does <code>resources :books</code> create in Rails?</summary>

**Answer:** It declares conventional RESTful routes for the `books` resource, such as listing, showing, creating, updating, and deleting records. Use `bin/rails routes` to inspect the exact routes and actions generated.

</details>

<details>
<summary>17. What is a Rails controller action?</summary>

**Answer:** A controller action is a public controller method that handles a routed request. For example, `BooksController#index` might load books and render a response. In Spring MVC terms, it is similar to a request-handler method in a `@RestController` or `@Controller`.

</details>

<details>
<summary>18. How does a Rails controller return JSON?</summary>

**Answer:** A controller can call `render json:` with a data object and an HTTP status. For a public API, explicitly choose which fields to expose rather than serializing database records blindly.

```ruby
class BooksController < ApplicationController
  def index
    books = Book.order(:title)
    render json: books.as_json(only: %i[id title author])
  end
end
```

</details>

<details>
<summary>19. How do you define a JSON API-only Rails application?</summary>

**Answer:** Rails can be created in API mode with `rails new my_api --api`. API mode omits or reduces browser-oriented components that a JSON-only service may not need. It is comparable to creating a Spring Boot REST service without server-rendered pages.

</details>

<details>
<summary>20. How do Rails views compare with React components?</summary>

**Answer:** Rails views, often using ERB templates, render HTML on the server. React components render UI in the browser or through React's rendering infrastructure. A Rails application can serve HTML directly, expose JSON to a separate React frontend, or use an integration approach; choose based on product and deployment needs.

</details>

<details>
<summary>21. What is a Rails layout?</summary>

**Answer:** A layout is a shared outer template for rendered pages, such as a common HTML document shell. It is similar to a shared page template or application shell, whereas React often provides shared layout components on the client.

</details>

<details>
<summary>22. What is REST, and how does Rails support it?</summary>

**Answer:** REST is an architectural style that models resources and uses standard HTTP methods and status codes. Rails supports RESTful routing through resource declarations and conventional controller actions, but the application still needs correct authorization, validation, and response design.

</details>

## Level 3: Active Record and Databases

<details>
<summary>23. What is Active Record in Rails?</summary>

**Answer:** Active Record is Rails' object-relational mapping layer. A model class maps to a database table and provides query, persistence, validation, and association APIs. It is comparable to JPA/Hibernate plus repository-style operations in a Spring application, though Rails combines these roles in a different convention-based API.

</details>

<details>
<summary>24. How does a Rails model map to a database table?</summary>

**Answer:** By convention, a singular CamelCase model maps to a plural snake_case table: `Book` maps to `books`, and `BlogPost` maps to `blog_posts`. Rails also infers primary key and timestamp conventions unless configured otherwise.

</details>

<details>
<summary>25. How do you query records with Active Record?</summary>

**Answer:** Use relation methods such as `where`, `order`, `limit`, and `find`. These methods compose database queries and are generally evaluated when results are needed.

```ruby
Book.where(published: true).order(:title).limit(20)
Book.find(42)
```

</details>

<details>
<summary>26. How does Active Record compare with JPA/Hibernate?</summary>

**Answer:** Both map objects to relational tables and support associations and persistence. JPA commonly separates entity mappings from repository interfaces, while Rails models typically combine table mapping, query methods, validations, and associations in one model class.

</details>

<details>
<summary>27. What are Rails migrations?</summary>

**Answer:** Migrations are version-controlled Ruby files that describe database schema changes. They are similar in purpose to Flyway or Liquibase migrations often used with Spring Boot. Run them with `bin/rails db:migrate`, and review migration compatibility and rollout risk before production deployment.

</details>

<details>
<summary>28. What is <code>schema.rb</code>?</summary>

**Answer:** `schema.rb` is a Rails-generated representation of the current database schema. Rails can also use `structure.sql` when database-specific features are not represented adequately in the Ruby schema format.

</details>

<details>
<summary>29. What are Active Record associations?</summary>

**Answer:** Associations describe relationships between models, such as `belongs_to`, `has_many`, and `has_one`. They are conceptually similar to entity relationships in JPA, with Rails-specific macros and conventions.

```ruby
class Book < ApplicationRecord
  belongs_to :author
end

class Author < ApplicationRecord
  has_many :books
end
```

</details>

<details>
<summary>30. What is the N+1 query problem in Rails?</summary>

**Answer:** The N+1 problem occurs when an application runs one query to load a collection and then an additional query for each record's association. Use eager loading, such as `includes`, when appropriate, and inspect query logs or profiling output to verify the improvement.

</details>

<details>
<summary>31. What are database transactions?</summary>

**Answer:** A transaction groups database operations so they commit together or roll back together, subject to the database's transaction semantics. Active Record provides `transaction` blocks. Transactions do not automatically roll back external side effects such as sending an email.

</details>

<details>
<summary>32. What is the difference between Rails validations and database constraints?</summary>

**Answer:** Rails validations provide application-level feedback before saving through Active Record. Database constraints enforce integrity at the database boundary, including writes from other applications or concurrent requests. Use both for important invariants, such as a unique email address.

</details>

<details>
<summary>33. What is the difference between <code>find</code>, <code>find_by</code>, and <code>where</code>?</summary>

**Answer:** `find` looks up records by primary key and raises when none is found. `find_by` returns the first matching record or `nil`. `where` returns a relation that can represent zero or more records and can be composed with other query methods.

</details>

## Level 4: Forms, Validation, and Security

<details>
<summary>34. What are Rails strong parameters?</summary>

**Answer:** Strong parameters require controllers to explicitly permit request fields before using them for mass assignment. This helps prevent clients from setting protected attributes such as administrative flags. It serves a purpose similar to explicitly binding an allowlisted request DTO in a Java API.

```ruby
  def book_params
    params.require(:book).permit(:title, :author_id)
  end
```

</details>

<details>
<summary>35. What are Rails validations?</summary>

**Answer:** Validations check model data before persistence and provide errors that the application can return to the user or API client. They are similar to Bean Validation annotations such as `@NotBlank`, but Rails declares many validations in the model.

```ruby
class Book < ApplicationRecord
  validates :title, presence: true
end
```

</details>

<details>
<summary>36. What is the difference between authentication and authorization in a Rails application?</summary>

**Answer:** Authentication establishes who the requester is. Authorization decides whether that identity may perform a particular action on a resource. A Rails controller should enforce authorization for each protected action; hiding a button in React is not a security boundary.

</details>

<details>
<summary>37. How does Rails help protect against CSRF?</summary>

**Answer:** Rails includes cross-site request forgery protections for browser-based sessions, including authenticity tokens in form submissions. Applications should retain the appropriate protections for their architecture and handle API authentication deliberately.

</details>

<details>
<summary>38. How do you avoid SQL injection with Active Record?</summary>

**Answer:** Use parameterized Active Record methods and avoid building SQL by concatenating untrusted input. For example, use `Book.where("title = ?", user_input)` instead of interpolating `user_input` into SQL text.

</details>

<details>
<summary>39. What is mass assignment, and how do Rails strong parameters address it?</summary>

**Answer:** Mass assignment sets multiple model attributes from a hash of input. If untrusted input can set sensitive attributes, users may modify fields they should not control. Strong parameters allowlist accepted fields before assignment.

</details>

<details>
<summary>40. How should a Rails application manage secrets?</summary>

**Answer:** Do not commit production credentials or API keys to source control. Use Rails credentials or an approved secret manager and inject secrets through the deployment environment. Limit access, rotate exposed secrets, and avoid printing secrets in logs.

</details>

<details>
<summary>41. Why should a Rails API not render every model attribute as JSON?</summary>

**Answer:** A model can contain internal or sensitive fields such as password digests, tokens, or administrative metadata. Define an explicit response shape or serializer and return only fields the client is authorized to see.

</details>

## Level 5: Testing and Maintainability

<details>
<summary>42. What testing options are common in Rails?</summary>

**Answer:** Rails includes Minitest support by default; many teams use RSpec. Tests may cover models, controllers or requests, integration behavior, and system/browser workflows. This is comparable to using JUnit and Spring test support, with different conventions and helpers.

</details>

<details>
<summary>43. What is a Rails request test?</summary>

**Answer:** A request test sends an HTTP request through the Rails application and checks the response, status, and relevant side effects. It tests more of the request path than a direct unit test of a controller method and is useful for API behavior.

</details>

<details>
<summary>44. What are fixtures and factories?</summary>

**Answer:** Fixtures are predefined test data supported by Rails. Factories are a common library-based approach for constructing test records. Use the project's existing convention and keep test data explicit enough to understand.

</details>

<details>
<summary>45. What is a background job in Rails?</summary>

**Answer:** A background job performs work outside the immediate web request, such as sending email or processing a file. Rails provides Active Job as a common interface to queue backends. It is conceptually similar to Spring's asynchronous or message-driven job processing, but queue delivery and reliability depend on the configured backend.

</details>

<details>
<summary>46. What is caching in Rails?</summary>

**Answer:** Caching reuses computed or fetched data to reduce work and latency. Rails supports multiple cache strategies, including fragment and low-level caching. Cache keys, invalidation, consistency, and sensitive-data handling need deliberate design.

</details>

<details>
<summary>47. What are callbacks in Active Record, and what is a risk of overusing them?</summary>

**Answer:** Callbacks run code at points in an object's lifecycle, such as before validation or after commit. Overuse can hide important side effects and make persistence behavior difficult to reason about. Keep business workflows explicit when callbacks would obscure control flow.

</details>

<details>
<summary>48. How should a Rails application handle errors in an API?</summary>

**Answer:** Return an appropriate HTTP status and a consistent, documented error body without exposing stack traces or secrets. Log useful diagnostic context server-side, and ensure error responses do not reveal data the requester is not authorized to see.

</details>

## Level 6: Production and Advanced Rails

<details>
<summary>49. What are Rails environments?</summary>

**Answer:** Rails commonly has `development`, `test`, and `production` environments, each with different settings and behavior. The environment controls configuration, logging, caching, and other choices; it should be set deliberately by the runtime or deployment platform.

</details>

<details>
<summary>50. What is Puma?</summary>

**Answer:** Puma is a concurrent Ruby web server commonly used to run Rails applications. In production it is often placed behind a reverse proxy or platform load balancer, with worker and thread settings chosen for the app and available resources.

</details>

<details>
<summary>51. What is the difference between Rails development and production mode?</summary>

**Answer:** Development mode favors rapid iteration and detailed diagnostics. Production mode is configured for deployed workloads, with production logging, caching, asset handling, and stricter error presentation. Never expose detailed development errors to public users.

</details>

<details>
<summary>52. How do you investigate a slow Rails endpoint?</summary>

**Answer:** Measure the request first, then inspect application logs, database query count and duration, N+1 behavior, external service calls, and resource use. Optimize the actual bottleneck and compare measurements after the change rather than guessing.

</details>

<details>
<summary>53. How do you deploy database migrations safely?</summary>

**Answer:** Review the migration's locking and compatibility impact, back up or verify recovery procedures, and plan the deployment order for application code and schema changes. Prefer changes that remain compatible with old and new application versions during a rolling deployment.

</details>

<details>
<summary>54. What does <code>bin/rails credentials:edit</code> do?</summary>

**Answer:** It opens the encrypted Rails credentials file for editing, using the configured master key. Protect the key outside source control and ensure the deployment environment can access it without exposing it in logs or repositories.

</details>

<details>
<summary>55. How can React and Rails work together?</summary>

**Answer:** React can be a separate frontend that calls a Rails JSON API, or the two can be integrated into a single application build. Define API contracts, authentication, CORS policy when cross-origin, and deployment responsibilities clearly. React owns browser UI state; Rails remains responsible for server-side authorization and data integrity.

</details>

<details>
<summary>56. What is CORS, and when does a React frontend need it with Rails?</summary>

**Answer:** Cross-Origin Resource Sharing is a browser policy that controls whether JavaScript from one origin may read responses from another. If React and Rails use different origins, configure Rails to allow only the required origins, methods, and headers. CORS is not authentication and does not block non-browser clients.

</details>

<details>
<summary>57. How do you keep Rails dependencies reproducible?</summary>

**Answer:** Commit the `Gemfile.lock` for an application, review dependency changes, use the project's Bundler version and deployment settings, and test updates. In Java, this is analogous to controlling dependency versions through Maven or Gradle build configuration and CI.

</details>

## Comparison Reference

### Rails and Java/Spring Boot

| Rails / Ruby | Similar Java / Spring Boot concept | Important difference |
|---|---|---|
| Ruby | Java | Ruby is dynamically typed; Java is statically typed and compiled |
| Rails | Spring Boot | Both are web frameworks; Rails relies more heavily on conventions and integrated defaults |
| `Gemfile` / Bundler | `pom.xml` / Maven or Gradle files | Both declare and resolve dependencies; tooling and lock behavior differ |
| Rails route | `@RequestMapping`, `@GetMapping` | Rails routes usually point to controller actions by naming convention |
| Controller action | Spring controller handler | Both handle requests; APIs and parameter binding differ |
| Active Record model | JPA entity plus repository behavior | Rails commonly combines mapping, querying, and validation in the model |
| Rails migration | Flyway/Liquibase migration | Both version schema changes; Rails migrations are Ruby code |
| Active Job | Spring task/queue integrations | Active Job abstracts queue adapters; delivery guarantees depend on backend |
| Rack middleware | Servlet filters/interceptors | Both provide request pipeline hooks, but use different runtime interfaces |
| Minitest / RSpec | JUnit / Spring Test | Similar testing goals, different libraries and conventions |

### Rails and React

| Concern | Rails | React |
|---|---|---|
| Main role | Server-side web app or API | Browser UI library |
| Routing | Rails routes map HTTP requests to server actions | React Router maps browser paths to client views |
| Data access | Models and server-side services access databases | Components call APIs; they should not connect directly to a protected server database |
| Validation | Validate on the server and enforce data rules | Client validation improves UX but can be bypassed |
| Authorization | Enforce access on every protected server operation | UI can hide unavailable actions but cannot enforce security |
| Rendering | Can render HTML or JSON on the server | Renders interactive UI in the browser or supported rendering environment |

## Common Rails Commands

| Goal | Command |
|---|---|
| Check Ruby version | `ruby --version` |
| Check Bundler | `bundle --version` |
| Install project dependencies | `bundle install` |
| Start Rails development server | `bin/rails server` |
| List routes | `bin/rails routes` |
| Open application console | `bin/rails console` |
| Generate model | `bin/rails generate model Book title:string` |
| Run database migrations | `bin/rails db:migrate` |
| Roll back the last migration | `bin/rails db:rollback` |
| Run tests | `bin/rails test` |
| Run a project command with locked gems | `bundle exec <command>` |

## Practice Project: Books API with React

Build a small Rails API for a React client. Keep this project in a local development environment and use non-sensitive sample data.

### Suggested Rails endpoints

| Method | Path | Purpose |
|---|---|---|
| `GET` | `/api/books` | List books |
| `GET` | `/api/books/:id` | Show one book |
| `POST` | `/api/books` | Create a book |
| `PATCH` | `/api/books/:id` | Update a book |
| `DELETE` | `/api/books/:id` | Delete a book |

### Example Rails route and controller

```ruby
# config/routes.rb
Rails.application.routes.draw do
  namespace :api do
    resources :books, only: %i[index show create update destroy]
  end
end
```

```ruby
# app/controllers/api/books_controller.rb
module Api
  class BooksController < ApplicationController
    def index
      render json: Book.order(:title).as_json(only: %i[id title author])
    end

    def create
      book = Book.new(book_params)

      if book.save
        render json: book.as_json(only: %i[id title author]), status: :created
      else
        render json: { errors: book.errors.full_messages }, status: :unprocessable_entity
      end
    end

    private

    def book_params
      params.require(:book).permit(:title, :author)
    end
  end
end
```

### Example React request

```javascript
async function loadBooks() {
  const response = await fetch("http://localhost:3000/api/books");

  if (!response.ok) {
    throw new Error(`Request failed: ${response.status}`);
  }

  return response.json();
}
```

The React client handles display and interaction. Rails validates and authorizes requests, applies business rules, and reads or writes the database. Add authentication, authorization, and cross-origin configuration before exposing the API beyond a local practice environment.

### Project exercises

1. Generate a `Book` model and add a migration.
2. Add a presence validation and a database constraint for any important uniqueness rule.
3. Implement list, show, create, update, and delete endpoints.
4. Add request tests for success, validation failure, missing records, and unauthorized access.
5. Connect a React page and display loading, empty, success, and error states.
6. Add pagination and avoid N+1 queries when associations are included.
7. Write down how each Rails responsibility maps to a Java/Spring component and where the mapping is not exact.

## Interview Answer Framework

For a Ruby or Rails interview question:

1. Explain the Ruby or Rails concept in plain language.
2. Relate it to Java/Spring Boot or React when that comparison helps.
3. Give a small code or command example.
4. Mention a tradeoff or common failure mode.
5. Explain how you would test or secure the behavior.
