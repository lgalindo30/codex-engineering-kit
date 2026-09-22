# Server Deployment with Docker

For a new server application, prepare Docker deployment by default. Existing deployments remain in
place unless migration is requested. Serverless is an explicit alternative. Kubernetes, clustering,
and replica architecture are outside the initial default; do not create speculative manifests.

## Reproducible container

- Use a pinned supported base image for the selected runtime and frozen lockfile install, with separate build and runtime
  stages where helpful. Keep build tools out of the runtime image where practical.
- Supply a `.dockerignore`; exclude secrets, local databases/uploads, development caches, and Git data.
- Run as an unprivileged user and use runtime environment configuration with startup validation.
  Never bake credentials into layers, build arguments, public frontend variables, or committed Compose.
- Listen on the documented container interface/port, handle SIGTERM gracefully with a bounded drain,
  and close database connections/resources. Send structured logs to stdout/stderr.
- Include meaningful liveness and readiness behavior and bounded request/upstream timeouts. Readiness
  may check required dependencies; avoid exposing credentials or detailed infrastructure in responses.

## Local operation and VPS handoff

Provide Compose for the application and requested local dependencies, plus documented build/start/stop,
configuration, migration, backup, restore, and upgrade commands. Do not automatically provision a VPS,
registry, TLS service, or remote database. Explain external requirements for the chosen deployment.

Mount persistent volumes for local uploads and SQLite; document permissions and backups. PostgreSQL
may be a managed endpoint or a Compose service according to the project. Do not expose its port publicly
by default. Container replacement must not discard persistent data. Keep sample secrets as placeholders.

Run reviewed database migrations as a separate deployment command before the compatible application
rollout. Do not use every container startup as the migration coordinator. For destructive migrations,
document recovery and compatibility requirements before an authorized production change.

## Verification

Build the image, start it with representative non-secret configuration, check health and the relevant
API behavior, verify shutdown, and confirm persistence across container replacement when applicable.
Use isolated data and containers. If Docker is unavailable, report the unexecuted checks; syntactic
inspection alone does not establish a working deployment.

Verify production startup and native driver compatibility on the selected runtime in the built image.

## Primary references

- [Docker build best practices](https://docs.docker.com/build/building/best-practices/)
- [Docker Compose](https://docs.docker.com/compose/)
- [Docker volumes](https://docs.docker.com/engine/storage/volumes/)
