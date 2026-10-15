# Deployment Controls

Use for deployment preparation, pipeline changes or authorized rollout. Runtime/provider commands belong
to the technology guide.

## Build and configuration

Use one production build path with compatible pinned tools and reproducible installs. Verify actual
output/runtime requirements using [quality controls](quality.md).

Keep local/test/preview/production targets explicit. Validate configuration at the supported lifecycle
boundary; use host-managed secrets and non-secret examples. Apply minimum permissions and deliberate
origins, domains, service exposure and storage targets.

Match lifecycle, health, scaling and storage assumptions to the platform. Apply [Docker controls](docker-deployment.md)
only for selected containers.

## Data and rollout

Use [persistence controls](persistence.md#migrations-and-recovery) for compatible rollout, migrations and
recovery. Verify data survives replacement and explain rollback limits for data/external effects.
Prepare reviewed output/configuration and recovery steps before authorized live actions; follow
[workflow scope](workflow.md).

## Verification and handoff

Use supported dry-run/preview and exercise startup/event dispatch, health, served output, dependencies
and persistence relevant to the change. Apply [shared testing criteria](testing.md); record target,
commands, environment requirements and recovery steps.
