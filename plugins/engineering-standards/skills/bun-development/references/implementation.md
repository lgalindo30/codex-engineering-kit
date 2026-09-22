# Bun runtime

Use the selected Bun version consistently for development, tests, and production where applicable.
Hono and Zod are defaults for a new standalone API; preserve a requested or established framework.

- Keep the HTTP application separate from the listener so requests can be tested without opening ports.
- Bun Test is the default runner for Bun-only backend code. Keep Bun imports out of browser modules
  and packages that promise Node compatibility. Test each claimed runtime rather than assuming parity.
- Verify database drivers and Node-oriented libraries on Bun, especially native modules and telemetry.
- Pin Bun, commit its lockfile, use frozen installs, and retain the documented dependency release-age
  filter. An existing lockfile still requires advisory review.
- The [quality scaffold and hooks](../../../templates/README.md) are optional Bun assets. They do not create
  an application, configure a frontend framework, or establish that tests pass.
- Verify the real production entrypoint, resource cleanup, and container readiness on Bun.

Sources to verify when implementing:
[Bun tests](https://bun.com/docs/test), [Hono Bun](https://hono.dev/docs/getting-started/bun).

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
the [common file policy](../../../references/files.md) and verify Bun's configured body ceiling with
the selected multipart parser. Check malformed JSON and media types. Enforce authorization at the resource
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
