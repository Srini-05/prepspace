# Docker Interview Preparation

Questions and local exercises on packaging and operating containers. Examples are for development; production images need an explicit patching, provenance, and configuration policy.

## Level 1: Images and Containers

<details>
<summary>1. How does a container differ from a virtual machine?</summary>

**Answer:** A container is an isolated process environment sharing a host kernel; a virtual machine has its own guest kernel. Linux containers on macOS typically run inside a Linux VM managed by Docker Desktop. Containers are not a complete security boundary against a hostile workload and do not package the host kernel.

</details>

<details>
<summary>2. What is the difference between an image and a container?</summary>

**Answer:** An image is a packaged filesystem and execution configuration built from layers. A container is a runtime instance with its own writable layer and process state. Multiple containers can use the same image. Durable business data should not depend on a container's writable layer surviving replacement.

</details>

<details>
<summary>3. Why do Dockerfile instruction ordering and build context matter?</summary>

**Answer:** Cache reuse depends on instructions and their inputs. Copy stable dependency manifests before frequently changing source so dependency installation can be reused. `.dockerignore` keeps unnecessary files and secrets out of the build context. Removing a secret in a later layer does not erase it from earlier layers.

</details>

<details>
<summary>4. How do CMD and ENTRYPOINT differ?</summary>

**Answer:** ENTRYPOINT defines the main executable; CMD provides a default command or arguments, depending on configuration. Exec-form instructions avoid an unnecessary shell and help the application receive signals as PID 1. If a shell wrapper is required, use correct signal forwarding and `exec` the main process.

</details>

## Level 2: Building and Connecting Services

<details>
<summary>5. What is a multi-stage build?</summary>

**Answer:** Separate stages can compile or bundle an application and copy only runtime artifacts into the final image. This reduces unnecessary tooling and attack surface, but does not automatically make dependencies safe. This example assumes a Node server with a committed lockfile and `server.js`.

```dockerfile
FROM node:22-bookworm-slim AS dependencies
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --omit=dev

FROM node:22-bookworm-slim
ENV NODE_ENV=production
WORKDIR /app
COPY --from=dependencies --chown=node:node /app/node_modules ./node_modules
COPY --chown=node:node package.json server.js ./
USER node
EXPOSE 3000
CMD ["node", "server.js"]
```

Add a build stage when source needs compilation. For repeatability, pin approved image digests and update them through a maintained patch process.

</details>

<details>
<summary>6. Does EXPOSE publish a port?</summary>

**Answer:** No. EXPOSE documents an intended container port. Publishing maps a host port to a container port. Bind published development ports to localhost when remote access is unnecessary. The application must listen on an appropriate container interface, not only container-local loopback, to receive forwarded traffic.

```sh
docker run --rm -p 127.0.0.1:3000:3000 example-api:dev
```

The example assumes the image has already been built.

</details>

<details>
<summary>7. How do containers communicate?</summary>

**Answer:** Containers on a user-defined network can discover one another by supported names and connect to container ports. `localhost` inside a container means that container's network namespace, not another service or the host. Compose provides service-name discovery on its default project network. Publish only ports that need host access.

</details>

<details>
<summary>8. How do volumes and bind mounts compare?</summary>

**Answer:** Docker manages named volumes independently of container writable layers. Bind mounts map host paths and are useful for development but couple behavior to the host filesystem and permissions. Neither automatically provides a consistent database backup. Use database-aware backup procedures and test restore workflows.

</details>

## Level 3: Runtime Reliability and Security

<details>
<summary>9. What does Compose provide, and what does it not guarantee?</summary>

**Answer:** Compose declares services, networks, volumes, and local configuration for a multi-container application. Creation ordering does not by itself prove a dependency is ready. Supported health conditions can help startup ordering, but applications still need bounded retries and recovery when dependencies fail later. Compose is not equivalent to a multi-node production scheduler.

</details>

<details>
<summary>10. How do you harden a container?</summary>

**Answer:** Run as a non-root user, drop unnecessary capabilities, avoid privileged mode and Docker socket mounts, use a read-only root filesystem where practical, and set resource limits. Inject secrets through an appropriate runtime mechanism rather than image layers or build arguments. Scan dependencies and images, verify provenance, and patch regularly.

</details>

<details>
<summary>11. How should shutdown and health checks work?</summary>

**Answer:** Handle termination signals, stop accepting new requests, drain in-flight work, and exit within the orchestrator's grace period. A health check should test a meaningful, bounded condition. Docker health status alone does not automatically restart an unhealthy container; restart behavior depends on the runtime or orchestrator configuration.

</details>

<details>
<summary>12. How do you troubleshoot a failing container?</summary>

**Answer:** Inspect logs, exit codes, image configuration, mounts, network reachability, and resource limits. Confirm the application architecture matches the image and host platform. Exit code 137 can indicate SIGKILL, including an out-of-memory kill, but inspect runtime evidence rather than assuming a cause. Keep secrets out of shared logs and diagnostic output.

</details>

## Practice Lab

1. Build a small API image using dependency caching and a non-root user.
2. Run an API and database on a Compose network without publishing the database publicly.
3. Replace the database container and verify persisted development data survives in its volume.
4. Stop the API during a request and inspect shutdown behavior; do not delete volumes containing needed data.

**Completion check:** The image contains no credentials, the API resolves its database by service name, and replacement does not lose durable data.

## Quick Revision

- Images package applications; containers run processes.
- EXPOSE is metadata, not port publishing.
- Container loopback is not the host or another service.
- Health status and restart policy are separate concerns.
- Volumes provide persistence, not automatic backups.

## References

- [Docker Build Best Practices](https://docs.docker.com/build/building/best-practices/)
- [Docker Compose Documentation](https://docs.docker.com/compose/)