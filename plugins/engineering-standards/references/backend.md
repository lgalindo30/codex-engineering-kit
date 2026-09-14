# Backend Architecture

## Defaults and boundaries

Use Bun, strict TypeScript, ESM, Hono, Zod, and OpenAPI for a new backend. Follow
[engineering defaults](engineering.md) for reproducibility and dependency selection. Verify stable
compatibility before pinning versions; do not copy preview or RC versions from documentation by habit.

Prefer functional composition, pure domain functions, and explicit parameters or small factories for
external dependencies. Keep HTTP parsing, business rules, persistence, and external adapters distinct
where complexity warrants it. Avoid ceremony, class hierarchies, and empty service/repository layers.
Group by feature using the project's structure. Keep handlers thin and manually maintained source
below 400 lines; function size is a signal to reconsider responsibility, not a reason for mechanical splits.

Build a testable app factory separately from process startup. Inject clocks, randomness, persistence,
and network clients where deterministic behavior matters. Keep Bun APIs out of browser imports.
Next.js normally consumes this backend and does not duplicate its persistence or business rules.

## HTTP and validation

Follow [API contracts](api-contracts.md): start new public API routes at `/api/v1`, validate with Zod,
and serialize explicitly. Validate environment variables once at startup and fail with actionable,
redacted configuration errors. Normalize third-party data at adapter boundaries. Give network calls
explicit timeouts and cancellation; retry only when safe for the operation, with bounded attempts.

Use maintained framework middleware for request limits, request IDs, CORS, and security headers.
Configure middleware deliberately; existence of middleware is not proof of correct policy. Restrict
credentialed origins explicitly and trust forwarded headers only from the configured proxy boundary.
Apply [security](security.md), [files](files.md), and [dates](dates.md) to the actual feature.

## Persistence and migrations

Use PostgreSQL for typical multiuser applications, SQLite for simpler/local applications, and
Drizzle ORM with Drizzle Kit by default. Choose a stable driver that supports the selected Bun,
Drizzle, database, and deployment versions. Do not switch databases merely to satisfy this default.

- Keep schema definitions in TypeScript and reviewed generated SQL migrations in version control.
- Parameterize SQL; enforce uniqueness and integrity at database level as well as in application code.
- Use transactions for coupled writes. Test conflicts and races when they affect correctness.
- Run migrations as an explicit deployment step. Do not let every application process modify schema
  on startup or use schema push as the production migration policy.
- Test upgrades from a representative previous schema with data, not only creation of an empty DB.
- Describe destructive changes, rollback/recovery, and backup needs before authorized deployment.
- Keep test databases isolated. Never fall back to a production URL when test configuration is absent.
- Document PostgreSQL connection limits/timeouts; for SQLite document its persistent file, concurrency
  assumptions, and backup procedure. Do not introduce replica architecture or Kubernetes by default.

## Errors, logging, and verification

Map domain failures to [Problem Details](api-contracts.md#errors) centrally. Log unexpected failures
once with Pino using [observability guidance](observability.md). Preserve causes internally without
returning stack traces, SQL, secrets, or upstream credentials to callers.

Use `bun test` for meaningful business logic and regression coverage. Exercise Hono request handling
with correct content types, boundary failures, response contracts, and database integration when
relevant. Add [Docker readiness](deployment.md) for a new server application. Run the project's
quality command; do not claim database or container tests ran when their prerequisites were missing.

## Primary references

- [Hono on Bun](https://hono.dev/docs/getting-started/bun)
- [Hono validation](https://hono.dev/docs/guides/validation)
- [Drizzle with Bun SQL](https://orm.drizzle.team/docs/get-started/bun-sql-new)
- [Drizzle migrations](https://orm.drizzle.team/docs/migrations)
- [Bun Test](https://bun.com/docs/test)
