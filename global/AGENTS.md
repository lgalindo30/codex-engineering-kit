# Engineering defaults

Apply these defaults to new projects and substantial new code. Explicit task requirements and established repository conventions take precedence. Do not migrate an existing project merely to match a preference.

## Language and scope

- Write code, identifiers, comments, documentation, AGENTS.md files, and generated project defaults in English. Honor explicitly requested product locales. Match the user's language in conversation.
- Prefer Bun, strict TypeScript, and ESM for new JavaScript/TypeScript applications. Allow Node for demonstrated tool or deployment compatibility. Do not mix package managers without a concrete reason.
- For standalone Python tools, prefer uv/uvx, modern supported Python, type annotations, and reproducible lockfiles.
- Keep personal Git identity in local configuration. Never distribute a user's name, email, credentials, or absolute machine paths in templates.
- Respect the requested repository layout. Never create nested Git repositories or an extra backend/frontend directory just because a role has that name.

## Delegation

- Delegate bounded tasks to backend, frontend, testing, repo_maintainer, or code_reviewer when independent progress, substantial investigation, or useful independent review justifies the coordination cost. Handle small or tightly coupled tasks directly with the relevant skills.
- Before delegation, specify expected outcomes, owned files, dependencies, and acceptance criteria. Establish API contracts before parallel producer/consumer implementation. Assign one owner to shared configuration and lockfiles.
- The parent owns integration, conflict resolution, and final verification. Workers must preserve others' changes and must not delegate further unless explicitly assigned that responsibility.
- Normally use two or three concurrent workers. Respect the effective environment limit; five available roles do not require five simultaneous sessions. Reuse agents and close finished sessions where supported before requesting more slots.
- Select a model and effort at spawn time when supported: GPT-5.6 Luna medium for clear repetitive work; GPT-5.6 Terra medium/high for ordinary implementation; Terra high/xhigh for complex bounded work; Sol or Astra high/xhigh for high-impact or ambiguous reasoning. Use Terra high for ordinary independent review. Escalate on evidence of insufficient capability rather than repeated ineffective retries.
- Leave model selection out of role TOMLs so explicit spawn choices can take effect. Do not override the user's chosen parent model. If the interface cannot select a model, use the configured fallback and report material limitations accurately.
- Give workers only the context needed for their task. If explicit model selection is incompatible with a full-history fork, use a bounded task prompt instead.

## Skills and project instructions

- Use installed engineering-standards skills by capability: backend-development, frontend-development, api-contracts, testing-strategy, repository-quality, project-instructions, and observability. Read only relevant linked references. The parent can use them without delegation.
- If this plugin is missing, report that its detailed procedures are unavailable; do not claim it was applied. Follow these defaults and the actual project's instructions.
- Read applicable AGENTS.md and AGENTS.override.md files before changing a subtree, even when starting from the repository root.
- Create or update a project AGENTS.md at each real application/package boundary. Document actual commands, architecture, contracts, and exceptions. Preserve existing valid instructions; avoid duplicating the full global manual.

## Implementation defaults

- Backend: Bun + Hono + Zod + OpenAPI, versioned business API routes starting at /api/v1. Keep transport, validation, business logic, and persistence appropriately separated; favor pure functions, composition, and explicit dependencies.
- Frontend: when unspecified, choose React + Vite SPA for simple interactive applications, Astro for static landing pages/blogs/documentation with SEO/performance needs, and Next.js for complex applications. Preserve an explicitly selected stack. Next.js consumes the separate Hono backend unless an integrated backend is explicitly requested. Use native framework routing, not competing routers.
- Prefer Ant Design for CRUD-heavy products when useful; otherwise native CSS/CSS Modules. Reuse existing components, preserve accessibility and visual consistency, and centralize user-facing text.
- Use Ant Design Skeleton for suitable initial loading states when Ant Design is present, including SPAs. Otherwise build a reusable CSS Skeleton when needed. Preserve cached content during refresh, respect reduced motion, and never add artificial loading to static Astro content.
- Use TanStack Query for client remote-state needs, local state for transient UI, and URL parameters for shareable state. Do not duplicate server-state caches or force client fetching where server rendering is appropriate.
- Keep schemas local to each application. Backend OpenAPI defines public transport contracts; consumers use a pinned contract/client. Do not introduce packages/contracts by default. TypeScript types alone do not validate runtime input.
- Prefer Drizzle ORM + Drizzle Kit, PostgreSQL normally, SQLite for simple local applications. Version and review migrations; run production migrations as an explicit deployment step.
- Validate untrusted input and relevant external data. Enforce file content/type, count and streamed request limits; default maximum per file is 10,000,000 bytes unless the task explicitly changes it. Keep files local on persistent storage initially.
- Use explicit timezone/offset for instants, UTC serialization, date-only values for civil dates, and IANA zones for recurring local schedules.
- Use Pino console logging and RFC 9457 Problem Details. Do not log secrets or full sensitive payloads. Add OpenTelemetry, external log services, queues, Google login, roles, or multitenancy only when requested or explicitly required by the task.
- Add authentication only when requested: email/password, short-lived Bearer access token in memory, rotated refresh token in HttpOnly/Secure cookie with appropriate SameSite, CSRF protection, expiration and revocation. Never store tokens in browser localStorage.
- Default production deployment to a normal server with Docker and persistent volumes. Serverless is explicit; Kubernetes and replica adaptations are later, requested work.

## Quality and completion

- For substantial changes, identify acceptance criteria, dependencies and exclusions; implement and verify small behavioral slices before accumulating dependent work. Scale planning to the task and commit only when authorized.
- Ground relevant project conventions in existing code/tests. Explain necessary new patterns; keep durable decisions in local instructions and temporary task notes outside AGENTS.md. Do not copy unsafe behavior for consistency.
- For defect fixes, demonstrate the expected regression before the fix when feasible and success afterward, reusing existing tests when sufficient. Distinguish hypotheses from evidence and proposed fixes from verified resolutions.

- Keep manually maintained source modules under 400 lines; split by responsibility. Use roughly 50 lines as a function-review signal, not a mechanical extraction rule. Document justified exceptions for generated or unusual files.
- Use EditorConfig, ESLint, Prettier and strict TypeScript. Defaults: two spaces, single JS/TS quotes, semicolons, 100 columns, UTF-8, LF, final newline; four spaces for Python.
- Use Bun Test for backend, Vitest + React Testing Library for React behavior, and Playwright for critical browser journeys. Cover meaningful behavior, failures and regressions; avoid implementation-mirroring tests and arbitrary universal coverage quotas.
- Pin toolchains and intentional dependency versions, commit lockfiles, and use frozen installs in CI. Enforce a 24-hour release age for new Bun dependency resolutions, with narrow documented exceptions for justified fixes. Review advisories rather than blindly upgrading.
- Prefer a check-only quality command reused by local workflows and CI. Keep fixes separate. Configure useful Git hooks; Codex completion hooks must be scoped, trusted, and avoid repeated unchanged-failure loops. Never claim skipped or blocked checks passed.
- Apply relevant OWASP guidance with concrete controls and tests; an audit command alone is not a security review.
- Use Conventional Commits when commits are requested; require meaningful scopes in monorepos. Do not commit, push, deploy, or publish solely because implementation finished.
