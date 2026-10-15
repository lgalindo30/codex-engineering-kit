# Backend behavior

[Evaluation setup and recording](../../behavioral-validation.md#run-an-evaluation).

## Standalone backend — not run

Prompt:

> Create a standalone inventory API in this repository with item creation and retrieval. Items have
> a bounded name, integer stock, and optional expiry date. Use PostgreSQL. Prepare local Docker
> execution. Authentication is not required. Implement and verify the API.

Run against an empty fixture and fixtures with an established Bun or Node.js toolchain. Record the
selected runtime and its justification. The runtime-unspecified prompt does not require choosing Bun.

Accept when the result:

- Preserves the fixture's runtime/package manager or selects a compatible runtime when none exists.
  Uses strict TypeScript and appropriate HTTP/schema/database integrations; Hono, Zod, and Drizzle are
  defaults for a new service when applicable. Node uses its adapter/drivers without Bun-only imports.
- Provides versioned public API routes and a reproducible OpenAPI contract for consumers.
- Places accurate instructions in the repository root without inventing a backend subdirectory.
- Keeps schema validation and persistence distinct, handles errors with Problem Details, and emits
  structured console logs without secrets or an installed telemetry backend.
- Handles expiry as a civil date rather than silently treating it as a UTC instant.
- Includes reviewed migration files, safe environment examples, persistent Docker storage, and
  meaningful route/database tests with isolated dependencies.
- Does not add login, roles, multitenancy, queues, Kubernetes, or external logging infrastructure.

## Shared architecture, persistence, and deployment policy — not run

Prompt:

> Add a small feature to this existing service using its selected framework, database, and deployment.
> It performs a coupled write and calls an external service. Assess whether it needs a separate
> service, implement within the agreed scope, and prepare verification without live deployment.

Repeat with Node, Bun, Next.js, and Cloudflare Workers fixtures, preserving an existing ORM/service
choice. Include selected container, static/serverless, and unspecified deployment variants where
compatible with the task; static fixtures delegate the operation to their existing server endpoint.

Accept when the result:

- Keeps cohesive feature boundaries and explicit dependencies; separates services only for a concrete
  deployment, permission, ownership, or operational need. Uses the selected framework/transport.
- Checks the actual engine/adapter's concurrency behavior and reviewed migration history, retaining
  data ownership and avoiding competing migration runners or migrations at every process startup.
- Bounds calls and retries without duplicating effects or claiming a timeout cancels remote mutations.
  Adds durable background infrastructure only when the requested operation requires it.
- Preserves the deployment/cloud/services; applies Docker checks only to chosen container deployments.
  Leaves unspecified target decisions and missing setup explicit rather than silently selecting a host.
- Exercises actual runtime/adapter boundaries with disposable data and distinguishes mocks/local checks
  from remote behavior. Reports pending rollout/recovery checks without claiming a live deployment.

These evaluations have not been executed; reference validation does not establish agent behavior.
