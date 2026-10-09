# Docker Deployment

Apply when containers are the selected deployment model. Follow [shared deployment controls](deployment.md)
for target selection, secrets, rollout scope, and handoff. Preserve existing hosting and container
conventions. Do not create speculative Kubernetes, clustering, or replica manifests.

## Reproducible container

- Use a pinned supported base image and frozen lockfile install, with separate build/runtime stages
  where helpful. Keep build tools out of the runtime image where practical.
- Supply a `.dockerignore`; exclude secrets, local databases/uploads, caches, and Git data.
- Run as an unprivileged user with runtime configuration. Never bake credentials into image layers,
  build arguments, or committed Compose.
- Listen on the documented interface/port, handle SIGTERM with a bounded drain, and close database
  connections/resources. Send structured logs to stdout/stderr.
- Include meaningful liveness/readiness and bounded upstream timeouts. Readiness may check required
  dependencies without exposing credentials or detailed infrastructure.

## Local operation and persistent data

Provide Compose for the selected container application and requested local dependencies, with
documented build/start/stop commands. Do not provision a VPS, registry, TLS service, or remote database
merely to complete container files. Explain external requirements for the selected host.

Mount persistent volumes for local uploads and SQLite; document permissions and backups. PostgreSQL
may be a selected managed endpoint or Compose service; do not expose its port publicly by default.
Container replacement must not discard persistent data. Apply [persistence policy](persistence.md)
for migrations and recovery rather than making every container startup a migration coordinator.

## Verification

Build the image, start it with non-secret configuration, and check health/API behavior or static
serving as appropriate. Verify production startup, native drivers, shutdown, and persistence across
replacement when applicable. Use isolated data and containers. If Docker is unavailable, report
unexecuted checks; inspecting the Dockerfile does not establish a working deployment.

## Primary references

- [Docker build best practices](https://docs.docker.com/build/building/best-practices/)
- [Docker Compose](https://docs.docker.com/compose/)
- [Docker volumes](https://docs.docker.com/engine/storage/volumes/)
