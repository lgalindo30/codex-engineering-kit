# Bun integration

Use the selected Bun version for development, tests, and production where applicable. Keep the HTTP
application separate from its listener. Verify Node-oriented libraries, native database drivers,
and requested telemetry on Bun; compatibility claims require execution on each promised runtime.

## Server boundaries

Apply [feature architecture](../../../references/architecture.md),
[call reliability](../../../references/reliability.md), and [persistence](../../../references/persistence.md)
when those boundaries change. Validate environment configuration at startup. For an unselected new
persistence stack, Drizzle/PostgreSQL is a default, with SQLite for simple local use; verify Bun drivers.

For public APIs, apply [API contracts](../../../references/api-contracts.md). Hono's Zod/OpenAPI
integration is a compatible option. With uploads, apply [file policy](../../../references/files.md)
and verify Bun's body ceiling with the selected multipart parser.

For session work, apply [authentication policy](../../../references/authentication.md) and verify
hashing, token, cookie, and database libraries on Bun. Application-owned rotating refresh sessions
need atomic consumption in the real database; in-memory tests cannot prove concurrency safety.
Exercise the actual middleware chain and browser origin/cookie behavior. For changed HTTP middleware,
verify security headers, proxy trust, and body-size enforcement through the serving boundary.

## Diagnostics

Apply [logging policy](../../../references/logging.md). Preserve the logger; Pino console output is a
new-service default. Verify Bun transports and, for requested telemetry, propagation and bounded
shutdown. Keep health endpoints separate from versioned business APIs when appropriate.

Sources: [Bun](https://bun.com/docs), [Hono Bun](https://hono.dev/docs/getting-started/bun).
