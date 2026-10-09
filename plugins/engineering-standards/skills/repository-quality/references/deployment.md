# Deployment pipeline verification

Apply [shared deployment controls](../../../references/deployment.md) when assessing the actual
pipeline and [Docker controls](../../../references/docker-deployment.md) only for selected containers.
Use [persistence policy](../../../references/persistence.md) when the pipeline coordinates migrations.

Verify that CI invokes the real build and target-specific checks with isolated credentials/resources.
Check static-host base paths, asset caching, deep links, and public configuration where applicable.
For framework adapters, verify supported server features and storage assumptions on the chosen host.
Report which pipeline and deployment checks ran, including unavailable container or remote checks.
