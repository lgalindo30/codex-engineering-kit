# Node.js integration

Use a supported Node release compatible with the selected framework. With Hono, use its Node adapter
and keep application creation separate from listener startup. Keep Bun imports and Bun-only drivers
out of Node packages. Verify native dependencies in the deployment environment.

Compile TypeScript for production or select a supported execution tool deliberately. Runtime type
stripping neither type-checks nor supports every TypeScript feature.

## Server boundaries

Apply [feature architecture](../../../references/architecture.md),
[call reliability](../../../references/reliability.md), and [persistence](../../../references/persistence.md)
when those boundaries change. Validate environment configuration at startup. For an unselected new
persistence stack, Drizzle/PostgreSQL is a default, with SQLite for simple local use; verify Node drivers.

For public APIs, apply [API contracts](../../../references/api-contracts.md). Hono's Zod/OpenAPI
integration is a compatible option. With uploads, apply [file policy](../../../references/files.md)
and verify adapter streaming/body limits with the selected multipart parser.

For session work, apply [authentication policy](../../../references/authentication.md). Keep session
operations testable without starting a listener. Verify middleware order, proxy trust, database
atomicity, and actual browser origin/cookie behavior. For changed HTTP middleware, exercise origin
restrictions, security headers, and request-size enforcement through the serving boundary.

## Diagnostics

Apply [logging policy](../../../references/logging.md). Preserve the logger; Pino console output is a
new-service default. Verify Node transports and, for requested telemetry, propagation and bounded
shutdown. Keep health endpoints separate from versioned business APIs when appropriate.

Sources: [Node TypeScript](https://nodejs.org/api/typescript.html),
[Hono Node adapter](https://hono.dev/docs/getting-started/nodejs).
