# Backend Project Instructions

- Use English for code, comments, documentation, and generated content unless explicitly requested otherwise.
- This is a quality scaffold, not a complete backend. Document installed application commands as implementation proceeds.
- Prefer Bun, strict TypeScript, Hono, Zod, OpenAPI, Pino, and RFC 9457 Problem Details.
- Keep public schemas local to this application. Publish versioned OpenAPI for consumers; do not create a shared contracts package by default.
- Version HTTP routes from the start, normally `/api/v1`. Validate payloads, query parameters, path parameters, configuration, and relevant external data.
- Prefer PostgreSQL with Drizzle ORM and Drizzle Kit; use SQLite for simple local applications. Commit reviewed migrations.
- Do not add authentication, roles, queues, or telemetry until requested. When authentication is requested, use short-lived Bearer access tokens and rotating refresh cookies with appropriate CSRF protection.
- Keep uploads local initially. Limit each file to 10,000,000 bytes unless explicitly overridden; enforce independent request and file-count limits and verify actual content.
- Log structured events to the console and redact secrets. Avoid logging complete request bodies by default.
- Prefer functional composition and explicit dependencies. Keep manually maintained source files below 400 lines and responsibilities cohesive.
- The current quality commands are `bun run format:check`, `bun run lint`, `bun run typecheck`, `bun run test`, and `bun run check` after dependency installation. The initial test command deliberately fails until behavioral tests are configured. Replace it with `bun test` after adding application tests.
- Follow applicable OWASP guidance for the functionality being implemented. Record deployment-specific decisions in this file.
