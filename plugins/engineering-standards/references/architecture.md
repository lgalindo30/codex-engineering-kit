# Feature and Service Boundaries

Use when changing module boundaries or deciding whether a feature needs a separate service.

## Cohesive modules

Organize by feature. Separate transport, business operations and external adapters when responsibilities
warrant it; keep small features together. Entrypoints compose handlers and dependencies.

Prefer functions/factories with validated values and explicit dependencies. Use classes or framework
injection for established conventions or lifecycle needs, without adding decorators or containers merely
for organization. Apply [module sizing](quality.md).

## Module dependencies

- Business rules do not import HTTP handlers, framework contexts, database drivers or provider clients.
  Inject integration operations; keep ORM records and transport types in their adapters.
- Expose narrow feature operations. Callers do not import private repositories or mutate another
  feature's tables. Shared read models need ownership; cross-feature writes need an application-level
  coordinator and [consistency controls](persistence.md).
- Create interfaces, packages and public exports for real boundaries. An explicit module surface does
  not require an `index.ts` barrel, shared schema package or HTTP endpoint.

A larger backend feature may separate `routes.ts`, `schemas.ts`, `service.ts` and `repository.ts`.
Use fewer files for small CRUD features; avoid generic base repositories and empty layers. See
[frontend feature organization](frontend-architecture.md#feature-organization) for client boundaries.

## Separate services

Keep features together while deployment, permissions, ownership and operational needs align. Split for
independent releases, restricted privileges, existing consumers or distinct resource/lifecycle needs.
The data-owning service owns its business operations; access it through an intentional contract rather
than shared database credentials. Shared storage requires explicit ownership and consistency.

For delegated work, apply [contracts](api-contracts.md), [service security](security.md#service-boundaries),
[correlation](logging.md#request-correlation) and [reliability](reliability.md). Runtime transport details
belong to the technology guide.

## Verification

Exercise changed adapters and contracts, including authorization and ownership across service boundaries.
For substantial module boundaries, existing lint/build tooling may restrict concrete forbidden imports;
check aliases and allowed/forbidden examples. Do not add an architecture tool for an unrelated edit.
Use the [shared testing criteria](testing.md).
