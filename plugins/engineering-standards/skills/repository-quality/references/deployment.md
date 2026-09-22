# Deployment pipeline verification

Keep the selected platform and runtime. Verify pinned compatible build/runtime environments, reproducible
installs, secret exclusion, minimum runtime permissions, and intentional build outputs. Do not provision
infrastructure or publish simply because pipeline configuration is complete.

For containers, check unprivileged execution, ignored secrets/data, startup validation, bounded SIGTERM
cleanup, readiness, and persistent volumes where files must survive replacement. Run database migrations
as an explicit compatible rollout step with recovery instructions rather than at every process startup.
Keep test and production credentials separate; do not expose database ports publicly by default.

For static hosting, check base paths, asset caching, deep-link behavior, and public runtime configuration.
For framework adapters, verify actual supported server features and filesystem persistence. Run builds
and representative startup/health checks in disposable environments. Report unexecuted container or
remote checks rather than implying syntactic validation proves deployment readiness.

- [Docker build practices](https://docs.docker.com/build/building/best-practices/)
