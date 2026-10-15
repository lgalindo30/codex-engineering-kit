# Docker Deployment

Apply to selected container deployments alongside [deployment controls](deployment.md).

## Reproducible container

- Pin a supported base image, use frozen installs and separate build/runtime stages where useful.
- Supply `.dockerignore` excluding secrets, local data/uploads, caches and Git data.
- Run unprivileged with runtime configuration; never put credentials in layers, build args or Compose.
- Document interface/port, handle SIGTERM with bounded drain and resource cleanup, and log to stdout/stderr.
- Provide meaningful liveness/readiness and bounded upstream timeouts without leaking infrastructure.

## Local operation and persistent data

Provide Compose and build/start/stop commands for the application and requested local dependencies.
Document external host requirements without provisioning unrelated services or speculative Kubernetes,
clustering or replica manifests.

Use persistent volumes for local uploads/SQLite and document permissions/backups. PostgreSQL may be a
selected managed endpoint or Compose service; do not expose its port publicly by default. Verify data
survives replacement. Follow [migration ownership](persistence.md#migrations-and-recovery), rather than
running migrations on every container startup.

## Verification

Build/start with non-secret configuration and isolated data. Check production serving, native drivers,
shutdown and persistence across replacement where applicable. Apply [shared testing criteria](testing.md).

## Primary references

- [Build practices](https://docs.docker.com/build/building/best-practices/)
- [Compose](https://docs.docker.com/compose/)
- [Volumes](https://docs.docker.com/engine/storage/volumes/)
