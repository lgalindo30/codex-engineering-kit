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
- Verify the real production entrypoint and resource cleanup on Bun; check container readiness when
  containers are the selected deployment.

Sources to verify when implementing:
[Bun tests](https://bun.com/docs/test), [Hono Bun](https://hono.dev/docs/getting-started/bun).

## Architecture and persistence

Apply [feature architecture](../../../references/architecture.md),
[call reliability](../../../references/reliability.md), and [persistence](../../../references/persistence.md)
when those boundaries change. Validate environment configuration once at Bun startup. For a new
service without a selected database/ORM, Drizzle with PostgreSQL is a useful default, with SQLite for
simple local use; verify Bun driver compatibility. Preserve explicit choices and existing persistence.

## HTTP contracts and trust boundaries

Apply the [shared API contract policy](../../../references/api-contracts.md) for public HTTP APIs;
Hono's Zod/OpenAPI integration is a useful Bun-compatible option.

Validate path/query/body inputs and relevant upstream responses. Bound payloads; for uploads, apply
the [common file policy](../../../references/files.md) and verify Bun's configured body ceiling with
the selected multipart parser. Check malformed JSON and media types. Enforce authorization at the resource
boundary when applicable; input validation does not grant access. Keep instant serialization timezone-
explicit and distinguish civil dates from instants. Introduce authentication only within task scope.

Map errors centrally to safe RFC 9457 Problem Details, preserving real HTTP status and relevant headers.
Never expose stack traces, SQL, credentials, or private response fields. Test actual serialized responses
and affected consumers; include migration guidance for incompatible public behavior.

## Logging and debugging

Apply the [shared logging policy](../../../references/logging.md). Preserve the existing logger;
Pino console output is a useful new-service default. Verify its Bun integration and transports;
for explicitly requested telemetry, verify runtime compatibility, propagation, redaction, and bounded
shutdown behavior.

For changed HTTP middleware, verify credentialed origin restrictions, precise proxy trust, security
headers, and actual request-size enforcement rather than inferring protection from middleware presence.
Document database connection limits, persistent paths, backups, and migration recovery when those
boundaries change. Keep health endpoints separate from versioned business APIs when appropriate.
