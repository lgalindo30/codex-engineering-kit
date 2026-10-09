# Node.js runtime

Use the requested or existing Node.js framework and package manager. For a new standalone backend,
Hono is a lightweight default, not a requirement for Express, Fastify, NestJS, or integrated Next.js.
Choose a supported Node release compatible with the framework and pin it in the project's tooling.
Use one package manager and its lockfile; npm or pnpm are valid choices. Preserve existing dependency
maturity and install-script protections, verifying their units and options for the selected version.

- With Hono, use its Node adapter for server startup; keep application creation separate from listening.
- Do not import `Bun`, `bun:test`, or Bun-specific database drivers. Select database drivers that support
  Node and the actual deployment. Verify native dependencies in the target environment.
- Configure TypeScript execution deliberately: compile before production, or use a supported execution
  tool when needed. Do not assume runtime type stripping performs type checking or supports all syntax.
- Use an existing test runner, Node's test runner, or Vitest according to the module/build setup.
  Type checking remains a separate check. See [testing](testing.md).
- Use the package manager's native run, frozen-install, and audit commands. Do not copy the Bun quality
  scaffolder or Bun hooks into a Node-only project; adapt the static formatting assets if useful.
- Verify startup, shutdown, and environment validation on Node itself; check container behavior when
  containers are the selected deployment.

Sources to verify when implementing:
[Node TypeScript](https://nodejs.org/api/typescript.html),
[Node test runner](https://nodejs.org/api/test.html),
[Hono Node adapter](https://hono.dev/docs/getting-started/nodejs).

## Architecture and persistence

Apply [feature architecture](../../../references/architecture.md),
[call reliability](../../../references/reliability.md), and [persistence](../../../references/persistence.md)
when those boundaries change. Validate environment configuration once at Node startup. For a new
service without a selected database/ORM, Drizzle with PostgreSQL is a useful default, with SQLite for
simple local use; verify Node driver compatibility. Preserve explicit choices and existing persistence.

## HTTP contracts and trust boundaries

Apply the [shared API contract policy](../../../references/api-contracts.md) for public HTTP APIs;
Hono's Zod/OpenAPI integration is a useful Node-compatible option.

Validate path/query/body inputs and relevant upstream responses. Bound payloads; for uploads, apply
the [common file policy](../../../references/files.md) and verify the Node adapter's stream handling
with the selected multipart parser. Check malformed JSON and media types. Enforce authorization at the resource
boundary when applicable; input validation does not grant access. Keep instant serialization timezone-
explicit and distinguish civil dates from instants. Introduce authentication only within task scope.

Map errors centrally to safe RFC 9457 Problem Details, preserving real HTTP status and relevant headers.
Never expose stack traces, SQL, credentials, or private response fields. Test actual serialized responses
and affected consumers; include migration guidance for incompatible public behavior.

## Logging and debugging

Apply the [shared logging policy](../../../references/logging.md). Preserve the existing logger;
Pino console output is a useful new-service default. Verify its Node integration and transports;
for explicitly requested telemetry, verify runtime compatibility, propagation, redaction, and bounded
shutdown behavior.

For changed HTTP middleware, verify credentialed origin restrictions, precise proxy trust, security
headers, and actual request-size enforcement rather than inferring protection from middleware presence.
Document database connection limits, persistent paths, backups, and migration recovery when those
boundaries change. Keep health endpoints separate from versioned business APIs when appropriate.
