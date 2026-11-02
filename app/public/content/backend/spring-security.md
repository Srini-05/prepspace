# Spring Security Interview Preparation

Questions and exercises for securing Spring applications. Examples use the bean-based configuration style of modern Spring Security; confirm APIs against the version managed by your Spring Boot release.

## Level 1: Security Fundamentals

<details>
<summary>1. How do authentication and authorization differ?</summary>

**Answer:** Authentication establishes who the caller is. Authorization decides whether that caller may perform a particular action on a particular resource. A valid login does not imply access to another customer's order. Enforce object ownership and tenant boundaries on the server, not just role checks in the UI.

</details>

<details>
<summary>2. What is a SecurityFilterChain?</summary>

**Answer:** Servlet security runs through filters that handle concerns such as security context loading, authentication, exception translation, and access decisions. A `SecurityFilterChain` bean configures the rules for matching requests. When multiple chains exist, the first matching chain is used; ordering and matchers must leave no unintended gaps.

</details>

<details>
<summary>3. What belongs in the SecurityContext?</summary>

**Answer:** The security context holds the current `Authentication`, including the principal and authorities. In servlet applications it is commonly associated with the current thread during request processing. Do not assume it automatically follows arbitrary asynchronous work; use supported context propagation and clear contexts correctly to avoid identity leakage.

</details>

<details>
<summary>4. How should passwords be stored?</summary>

**Answer:** Use a supported adaptive, salted password encoder such as Argon2 or bcrypt, configured for an appropriate work factor. `PasswordEncoder.matches` verifies a candidate against its stored hash. Never store plaintext, use reversible encryption as password storage, or log credentials. Plan hash upgrades and rate-limit authentication attempts.

</details>

## Level 2: Request and Method Protection

<details>
<summary>5. How do you express default-deny request rules?</summary>

**Answer:** Permit only explicit public endpoints, restrict sensitive operations, and require authentication elsewhere. This illustrative configuration retains default CSRF protection and uses HTTP Basic; production traffic must use HTTPS and a suitable identity mechanism.

```java
@Configuration
@EnableWebSecurity
class SecurityConfiguration {
    @Bean
    SecurityFilterChain applicationSecurity(HttpSecurity http) throws Exception {
        return http
            .authorizeHttpRequests(rules -> rules
                .requestMatchers("/health").permitAll()
                .requestMatchers("/admin/**").hasRole("ADMIN")
                .anyRequest().authenticated())
            .httpBasic(Customizer.withDefaults())
            .build();
    }
}
```

The snippet requires the corresponding Spring imports and an authentication provider. Do not expose detailed health or management data through the public health endpoint.

</details>

<details>
<summary>6. Why use method security in addition to URL rules?</summary>

**Answer:** Service methods can be invoked from jobs, messaging, or multiple controllers. With method security enabled, annotations such as `@PreAuthorize` guard those entry points. Proxy-based interception has limitations, including self-invocation. Resource ownership should be checked against trusted persisted data within an appropriate transaction.

</details>

<details>
<summary>7. When is CSRF protection necessary?</summary>

**Answer:** CSRF matters when browsers automatically attach credentials, such as session cookies, to requests. Statelessness alone does not remove this risk. Disable CSRF only after establishing that the API exclusively uses credentials not automatically attached by the browser and does not also accept cookie-based authentication. SameSite cookies help but do not replace a complete design.

</details>

<details>
<summary>8. Is CORS an authorization mechanism?</summary>

**Answer:** No. CORS controls which browser origins may read responses or make certain cross-origin requests. Non-browser callers are not constrained by it. Use explicit allowed origins, methods, and headers, and handle preflight requests appropriately. Credentialed requests must not use a wildcard allowed origin.

</details>

## Level 3: Tokens, Failures, and Tests

<details>
<summary>9. How are OAuth2, OpenID Connect, and JWT related?</summary>

**Answer:** OAuth2 delegates access; OpenID Connect adds an identity layer; JWT is a token representation. A resource server validates access tokens, not arbitrary ID tokens. For JWT access tokens, validate the signature, allowed algorithms, issuer, expiration, and expected audience. Map scopes or claims to authorities explicitly.

</details>

<details>
<summary>10. What are the tradeoffs between sessions and bearer tokens?</summary>

**Answer:** Server-side sessions support central revocation but need session storage or routing design. Self-contained access tokens reduce per-request identity lookups but complicate immediate revocation. Keep tokens short-lived, protect refresh tokens, and define logout behavior. Browser token storage must consider both XSS and CSRF rather than assuming one storage location is universally safe.

</details>

<details>
<summary>11. When should an API return 401 or 403?</summary>

**Answer:** Return 401 when authentication is required or credentials are invalid, with the appropriate authentication challenge. Return 403 when the identified caller lacks permission. Some systems return 404 for inaccessible objects to limit enumeration, applied consistently. Do not expose token parsing details, stack traces, or account existence in error messages.

</details>

<details>
<summary>12. What security cases should automated tests cover?</summary>

**Answer:** Test anonymous, authenticated, unauthorized-role, cross-user, and cross-tenant access. Include CSRF behavior for cookie-based flows, token expiry and audience validation, public endpoint boundaries, and method-security interception. Mock users test authorization rules, but do not prove real token verification or the production identity-provider integration works.

</details>

## Practice Lab

1. Protect an order service with public health, authenticated order reads, and admin-only maintenance.
2. Verify that one user cannot read another user's order even when both share the same role.
3. Add tests for missing credentials, insufficient authority, expired tokens, and invalid CSRF tokens where applicable.
4. Document session or token revocation and inspect logs for accidental credential exposure.

**Completion check:** Access is denied by default, object ownership is enforced, and authentication failures reveal no secrets.

## Quick Revision

- Authentication identifies; authorization permits a specific action.
- The first matching filter chain wins.
- CORS does not protect against non-browser clients.
- Cookie authentication can require CSRF protection even without server sessions.
- Token validation includes intended issuer and audience, not only a valid signature.

## References

- [Spring Security Reference](https://docs.spring.io/spring-security/reference/)
- [Spring Security Test Support](https://docs.spring.io/spring-security/reference/servlet/test/index.html)