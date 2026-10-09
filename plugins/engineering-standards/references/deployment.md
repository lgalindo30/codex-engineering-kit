# Deployment Controls

Use for deployment preparation, pipeline changes, or an authorized rollout. Preserve the selected
cloud, hosting model, runtime, and services. If the target is unspecified, leave the decision explicit
rather than treating a guide as a choice of provider, container, or serverless host. Provider commands
and framework adapters belong to the relevant technology guide.

## Build and configuration

Use pinned compatible tools, reproducible installs, and one authoritative production build path.
Verify deployment output and runtime requirements; a development server or type check does not
establish a production runtime. Apply [quality controls](quality.md).

Keep local, test, preview, and production targets/commands explicit. Validate runtime configuration
at its supported lifecycle boundary. Keep secrets out of artifacts, logs, public frontend variables,
and committed examples; use placeholders and the chosen host's secret mechanism. Apply minimum
permissions and deliberate domains, origins, private-service exposure, and storage targets.

Match process lifecycle, health checks, scaling, and storage assumptions to the selected platform.
Do not apply persistent-process, container-filesystem, or replica assumptions to an unrelated host.
For chosen container deployments, read [Docker controls](docker-deployment.md); static and serverless
deployments do not acquire a container requirement from this policy.

## Data and rollout

Use [persistence controls](persistence.md#migrations-and-recovery) for schema changes, backup/recovery,
and compatible rollout order. Confirm persistent-data behavior for replaced instances or deploys.
State how application/configuration rollback interacts with irreversible data or external effects.
Do not introduce infrastructure or backup services outside the requested scope.

Prepare code, build output, reviewed configuration/migrations, and relevant recovery guidance before
any required live approval. Production deployment, provisioning, secret writes, and migrations must
be within the user's authorized scope. Existing authorization remains valid; preparation alone does
not authorize live actions. Missing access, configuration, or resources remain concrete pending work.

## Verification and handoff

Inspect built configuration and use the platform's supported dry-run/preview when available. Exercise
representative startup or event dispatch, applicable health behavior, API/static output, dependencies,
and persistence in disposable environments. Keep checks proportionate to the changed boundary, with
provider-specific execution in the technology guide.

Record verified commands, environment requirements, target, and recovery steps in existing project
documentation/instructions. Distinguish static inspection, local integration, preview, and observed
live behavior. Report unavailable services and unexecuted checks; local builds do not prove remote
configuration, distributed behavior, or deployment readiness.
