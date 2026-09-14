---
name: backend-development
description: Implement or change Bun and TypeScript backends using Hono, Zod, Drizzle, and versioned OpenAPI contracts. Use for backend features, persistence, integrations, and container readiness.
---

# Backend Development

Apply [engineering defaults](../../references/engineering.md) and the existing project's instructions.
Use these defaults for new work; preserve established stacks unless migration is requested.

1. Identify the actual project boundary, required behavior, consumers, and existing components. Do not
   create an extra backend directory or nested repository merely because this is a backend task.
2. Read [backend architecture](../../references/backend.md). For an endpoint or consumer change, also
   read [API contracts](../../references/api-contracts.md), or use `api-contracts` for substantial work.
3. Establish the smallest useful contract and acceptance criteria before parallel implementation.
   Keep business logic in Hono/Bun when the frontend uses Next.js, unless explicitly asked otherwise.
4. Implement bounded behavior with explicit dependencies, request validation, safe response mapping,
   centralized errors, Pino console logging with redaction, and meaningful tests. Read
   [security](../../references/security.md) for relevant
   trust boundaries; validation does not grant authorization.
5. For a new application, use [repository-quality](../repository-quality/SKILL.md) to establish
   EditorConfig, formatting, lint, strict types, and meaningful tests in its `check` command. The
   [quality scaffolder](../../templates/README.md) is a starting point for empty targets; merge
   deliberately after framework creation. Type checking alone is not the complete quality gate.
6. Update or create the project's `AGENTS.md` with actual architecture, commands, contracts, and
   deviations. Reuse `project-instructions` when available. Run the relevant quality command and
   report checks and limitations accurately.

Read conditional references only when relevant:

- [Authentication](../../references/authentication.md): login or session management is requested.
- [Files](../../references/files.md): accepting, storing, or serving uploads.
- [Dates](../../references/dates.md): timestamps, civil dates, or scheduling.
- [Deployment](../../references/deployment.md): creating a server project or changing its deployment.
- [Observability](../../references/observability.md): logging and debugging; OpenTelemetry only on request.

Do not add login, role systems, multitenancy, queues, remote storage, or telemetry infrastructure solely
because the references describe them. Deliver the change, contract implications, migration steps when
needed, and verification evidence. Do not deploy or modify production data without task authorization.
