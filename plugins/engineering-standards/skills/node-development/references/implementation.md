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
- Verify production startup, shutdown, environment validation, and container behavior on Node itself.

Sources to verify when implementing:
[Node TypeScript](https://nodejs.org/api/typescript.html),
[Node test runner](https://nodejs.org/api/test.html),
[Hono Node adapter](https://hono.dev/docs/getting-started/nodejs).

## Architecture and persistence

Keep HTTP parsing and response mapping separate from business rules and external adapters when
complexity warrants it. Prefer explicit dependencies and cohesive modules over empty abstraction layers.
Validate environment configuration once at startup and give upstream calls bounded timeouts; retry only
when safe for the operation. Preserve the database and ORM. For a new service, Drizzle with PostgreSQL
is a useful default, with SQLite for simple local use; verify driver compatibility on this runtime.
Use parameterized queries and database constraints. Run coupled writes in transactions and version
reviewed migrations. Apply production migrations as an explicit deployment step, not every startup.

## HTTP contracts and trust boundaries

Preserve existing API versioning; use /api/v1 for new public business APIs. Define runtime input and
response schemas together using the selected framework; Hono's Zod/OpenAPI integration is a useful
option. Export a reproducible versioned OpenAPI artifact when public consumers need one. Keep private
server imports out of clients; generated types do not validate incoming data.

Validate path/query/body inputs and relevant upstream responses. Bound payloads; for uploads, apply
the [common file policy](../../../references/files.md) and verify the Node adapter's stream handling
with the selected multipart parser. Check malformed JSON and media types. Enforce authorization at the resource
boundary when applicable; input validation does not grant access. Keep instant serialization timezone-
explicit and distinguish civil dates from instants. Introduce authentication only within task scope.

Map errors centrally to safe RFC 9457 Problem Details, preserving real HTTP status and relevant headers.
Never expose stack traces, SQL, credentials, or private response fields. Test actual serialized responses
and affected consumers; include migration guidance for incompatible public behavior.

## Logging and debugging

Preserve the existing logger; Pino console output is a useful new-service default. Include bounded
request IDs, normalized routes, status, duration, and safe error context. Redact credentials, cookies,
tokens, and sensitive payloads, including nested error data. Log unexpected failures once at the
handling boundary. Reproduce failures with redacted evidence, test a concrete hypothesis, then verify
the original trigger after correcting it. Do not add telemetry SDKs or external exporters by default;
when requested, verify runtime compatibility, propagation, redaction, and bounded shutdown behavior.

For changed HTTP middleware, verify credentialed origin restrictions, precise proxy trust, security
headers, and actual request-size enforcement rather than inferring protection from middleware presence.
Document database connection limits, persistent paths, backups, and migration recovery when those
boundaries change. Keep health endpoints separate from versioned business APIs when appropriate.
