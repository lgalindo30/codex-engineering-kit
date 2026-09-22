# Monorepo Instructions

- Use English for repository content and generated project defaults unless explicitly requested otherwise.
- This is a root quality scaffold. It does not create applications or choose their directories. Add Bun workspaces only for real packages.
- For delegated work, assign responsibility boundaries and acceptance criteria; workers investigate and design their own solution. One owner must coordinate root configuration and lockfile changes.
- Add scoped AGENTS.md files at actual application or package boundaries; inspect existing instructions before changing a subproject. Do not create a file in every technical directory.
- Prefer Bun and strict TypeScript. Backend applications use Hono, Zod, OpenAPI, and console Pino logging; frontend applications use React, Astro, or Next.js according to product needs.
- Keep API contracts local to the backend and generate consumers from versioned OpenAPI. Do not create packages/contracts unless explicitly justified for this project.
- Do not add authentication, roles, remote storage, queues, telemetry, or deployment infrastructure merely because a skill describes them.
- Prefer functional composition and explicit dependencies. Keep manually maintained source files below 400 lines and responsibilities cohesive.
- The current root commands are `bun run format:check`, `bun run lint`, `bun run typecheck`, `bun run test`, and `bun run check` after dependency installation. The test placeholder deliberately fails until behavioral tests are configured. Initially the other checks cover the root scaffold only; update root aggregation and scoped configurations as packages are added.
- Keep one root lockfile when adopting Bun workspaces. Configure package-specific checks and explicit cross-package integration tests; do not assume a passing root TypeScript check verifies every framework.
