# Feature and Service Boundaries

Use when changing application structure or deciding whether a feature needs a separate service.
Preserve the project's framework, deployment, selected services, and established boundaries.
A feature request does not authorize a framework migration or additional infrastructure.

## Cohesive modules

Organize related behavior by feature. Separate transport parsing/response mapping, business rules,
and external adapters when responsibilities warrant it; small features may keep related code together.
Avoid empty layers or splitting files merely to imitate another framework's structure. Entrypoints
compose applications and runtime handlers rather than accumulating business operations.

Pass validated values and explicit dependencies into business functions instead of whole framework
contexts. Prefer function/factory composition; use classes or framework dependency injection when an
existing framework or real lifecycle requirement warrants it. Do not introduce decorators, reflection,
or a container solely to organize modules. Apply [module sizing and quality](quality.md).

Keep transport contracts and adapter types at their boundaries. Follow [API contracts](api-contracts.md)
for public HTTP and internal RPC, using the selected framework's integration. A reusable business
function does not require a new HTTP endpoint or schema package.

## Separate services

Keep features together while deployment, permissions, ownership, and operational needs align. Split
when independent releases, restricted privileges, reuse by existing callers, or distinct lifecycle
and resource requirements justify the cost. A source folder alone does not justify another service.
Respect the cloud and supported communication mechanisms chosen for the project.

The service owning data also owns its business operations and persistence rules. Callers delegate
operations through an intentional contract instead of accessing another service's database merely
because credentials can be shared. Shared storage needs an explicit ownership and consistency design.
Follow [persistence](persistence.md) when those boundaries change.

Keep internal operations narrow and exposure deliberate. Apply [service security](security.md#service-boundaries),
bounded correlation context from [logging](logging.md), and [call reliability](reliability.md) to
delegated work. Local calls, HTTP, RPC, and durable messaging have different contracts and guarantees;
their implementation belongs to the technology guide.

## Verification

Test business behavior with explicit dependencies and exercise changed adapters/contracts at the real
boundary. Verify authorization, failure behavior, and ownership across new service boundaries. Report
mocked communication separately from exercised integration. Do not create a service for a test layout.
