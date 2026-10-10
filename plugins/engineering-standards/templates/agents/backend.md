# Backend Project Instructions

- Use English for code, comments, documentation, and generated content unless explicitly requested otherwise.
- This is a quality scaffold, not a complete backend. Document installed application commands as implementation proceeds.
- Prefer Bun, strict TypeScript, Hono, Zod, OpenAPI, Pino, and RFC 9457 Problem Details.
- Keep public schemas local to this application. Publish versioned OpenAPI for consumers; do not create a shared contracts package by default.
- Version HTTP routes from the start, normally `/api/v1`. Validate payloads, query parameters, path parameters, configuration, and relevant external data.
- Prefer PostgreSQL with Drizzle ORM and Drizzle Kit; use SQLite for simple local applications. Commit reviewed migrations.
- Do not add authentication, roles, queues, or telemetry until requested. Follow explicit authentication requirements; otherwise preserve the selected provider and session design. Email/password does not itself require JWT. Apply token rotation and CSRF controls when relevant to the chosen flow.
- Follow explicit storage requirements; otherwise preserve the project's selected storage. If none is selected, recommend a deployment-compatible option and record pending setup. Use local files only with selected persistent writable storage. Limit each file to 10,000,000 bytes unless explicitly overridden; enforce independent request and file-count limits and verify actual content.
- Log structured events to the console and redact secrets. Avoid logging complete request bodies by default.
- Prefer functional composition and explicit dependencies. Keep manually maintained source files below 400 lines and responsibilities cohesive.
- The current quality commands are `bun run format:check`, `bun run lint`, `bun run typecheck`, `bun run test`, and `bun run check` after dependency installation. The initial test command deliberately fails until behavioral tests are configured. Replace it with `bun test` after adding application tests.
- Follow applicable OWASP guidance for the functionality being implemented. Record deployment-specific decisions in this file.
