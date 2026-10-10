# Behavioral Validation — 2026-10-09, Round 2

This bounded follow-up evaluates generated implementation, not universal plugin correctness.
The user requested continued GPT-6 Luna testing before a separate frontend-design discussion.
No live deployment, global plugin update, release bump, commit, or push was performed.

## Source and execution

- Source: repository HEAD `8e1aaa1b53379e2d456fae3c5a27d29b9ba4d09b`, version `2.0.0`, with
  the preceding uncommitted authentication and storage policy revisions.
- Plugin snapshot: 98 files; SHA-256
  `0c16b2b5e36f87ef157e3895af417ad810e0e1ba93c21a8a49bf544f998fd545`.
  Hash sorted relative paths followed by NUL, file bytes, and NUL. The parent verified that
  the snapshot and repository plugin directory matched.
- Two fresh subagents requested `gpt-6-luna`, reasoning `high`, with no inherited conversation.
  Each received only a realistic task, owned temporary directory, applicable fixture context,
  and the plugin snapshot for skill selection. Neither received the preceding report or its findings.
- Parent tools: Bun `1.4.2`, Codex CLI `0.154.0`. Agent runtime observations are recorded below.
- Each agent owned a separate temporary directory. Dependency installations and local listeners
  were scoped to those fixtures; no credentials or live cloud resources were provided.
- Skills were available by explicit snapshot path. These tests do not establish native automatic
  skill discovery, autonomous model selection, or production readiness.

## Isolated native installation — passed

The parent copied the marketplace and plugin into a disposable directory and used a fresh
`CODEX_HOME` beneath it. That profile did not load the operator's configured marketplaces, although
the CLI still exposed its built-in `workspace-local` marketplace. No action targeted that marketplace.

Executed native commands with the isolated profile:

1. `codex plugin marketplace add <owned-marketplace> --json`: exit 0, registered the copied marketplace.
2. `codex plugin list --marketplace codex-engineering-kit --json`: exit 0, initially empty.
3. `codex plugin add engineering-standards@codex-engineering-kit --json`: exit 0, installed version
   `2.0.0` into the temporary profile's cache.
4. `codex plugin list --marketplace codex-engineering-kit --json`: exit 0, installed and enabled.
5. `codex plugin remove engineering-standards@codex-engineering-kit --json`: exit 0.
6. The final scoped list returned no installed plugin.

The initial empty available list did not prevent installation by the exact plugin selector.
This validates the bounded native packaging/install/remove path, not skill activation in a new
authenticated agent session. The operator's existing installation was not updated.

## Existing React/Vite frontend

Fixture: React 18, React Router, SWR, native semantic controls, an existing stylesheet, a supplied
OpenAPI contract, and a separate Azure API. Task: add creation and shareable list filtering, useful
loading/empty/error/retry states, validation and cache consistency, while preserving the existing
visual design. Local HTTP simulation was explicitly permitted; no authentication was requested.

The first saved implementation preserved React Router, SWR and the stylesheet. Its build failed
because `tsc --noEmit` was declared without a `tsconfig.json`. It used wildcard tooling dependencies
and lacked complete check-only lint/format tooling. The parent inspected this saved first pass before
asking for additional boundary checks: blank stock, malformed successful API payloads, duplicate
submission, and post-create navigation/cache consistency. Those checks are assisted review, not
independent first-pass success.

After capture, Luna added strict TypeScript configuration, replaced full-page navigation with
React Router navigation, rejected blank stock, validated successful response shapes and guarded
submission synchronously. These are corrected results, not an independent first-pass pass.
The parent inspected final source and independently repeated `bun run build`: strict types and
Vite production bundling passed. No automated component suite, lint or formatting checks were added;
wildcard tooling declarations remained. Full engineering-default compliance therefore failed.

Luna exercised Edge against an explicitly enabled local HTTP mock: direct creation links, a 503
load error/retry, URL filtering with back/forward, empty and filtered-empty states, blank-stock
rejection, double-click submission producing one item, failed creation/retry, malformed 200/201
responses with recovery, and creation from an uncached direct route returning the complete list.
These are agent-observed browser checks; the parent inspected source and the report but did not
independently repeat each interaction. The mock does not establish Azure CORS, persistence or
server-side validation. No authentication, backend migration or visual redesign was added.

Observed versions: Bun `1.4.2`, Node `24.21.0`, npm `12.0.2`, Vite `8.3.4`, React plugin `6.1.2`,
TypeScript `7.0.2`. The browser CLI daemon separately reported Node `23.6.1`.

## Existing static Astro site

Fixture: a small static publication with an existing plain stylesheet and Topics anchor, no forms,
accounts or API, and no selected deployment host/public origin. Task: improve description and semantic
accessibility where needed, preserve content and visual direction, verify a static production build,
the anchor and mobile layout.

The initial static production build passed. No new backend, authentication or cloud selection was
requested. A successful build alone does not establish complete Astro quality-default compliance.

The final page added a meta description, named navigation/section and keyboard focus styling.
The parent inspected the source and independently repeated the static production build: passed.
Luna observed the Topics anchor updating the URL and used Playwright CLI `0.1.22` with Edge at
390 × 844: document and viewport widths were both 390 px, with the anchor present. An occupied
preview port was left untouched; the fixture used the next reported port. No public origin or
canonical URL was fabricated, and no backend, authentication or component library was installed.

Astro `7.3.8` was lockfile-resolved from a wildcard declaration. No independent Astro check,
formatting, lint or automated browser suite was configured. The bounded static behavior/build
probe passed; full quality-default compliance was not established.

## Cloudflare Worker

Task: create a small TypeScript Worker for inventory and public contact requests using D1/Drizzle,
Hono, Zod input/output contracts, generated OpenAPI and rate limiting. Prepare local development,
tests and a production build. No live deployment, accounts, email delivery or separate services.

The agent's initial check command generated Wrangler types, ran workerd tests and built with Vite.
It did not include a standalone TypeScript check, formatting or linting. A snapshot was requested
before parent review; this snapshot follows the agent's own implementation/test iterations, rather
than representing an untouched first generation.

Independent completion did not satisfy every engineering default. The saved snapshot already
included a strict type-check script and 8 passing workerd tests after self-corrections, but lacked
a body cap, expected Turnstile action matching and separate feature services/repositories.
The parent had read an earlier in-progress catch-all database classifier; Luna independently
narrowed it before snapshot capture. A real duplicate regression later revealed Drizzle's nested
error cause, requiring a further classifier correction.

After parent review, Luna added a 16 KiB pre-parser body limit, action/hostname checks, feature
services/repositories, expanded failure coverage and documented error statuses. It also detected
that Vite copied ignored `.dev.vars` into the build. The final build wrapper removes that output;
the parent independently verified its absence after building.

Observed agent runtime: Bun `1.4.2`, Node `23.6.1`, npm `10.9.2`; Wrangler `4.135.0`, Vite `8.0.5`,
Vitest `4.1.0`, TypeScript `5.9.3`, Hono `4.13.7`, Zod `4.2.1`, Drizzle ORM `0.45.3`.
The installed workerd rejected the initial current-date compatibility date; the fixture selected
its supported `2026-09-18` date instead. This is a local toolchain observation, not a global default.

Final `bun run check` ran binding generation, strict `tsc --noEmit`, 10 workerd tests and the production
Vite build. Luna and the parent both observed exit 0. The parent's default-sandbox attempt failed
before executing tests with loopback-listener `EPERM`; the authorized scoped retry passed.
Both runs disabled Wrangler telemetry and redirected local logs/cache into the owned fixture.
Formatting and linting remained absent: the generated command did not cover all shared quality defaults.

Luna also applied local D1 migrations and exercised the workerd-backed development server: health
and OpenAPI returned 200, inventory creation returned 201 with a D1 row, and an oversized request
returned 413. The parent inspected the source/tests and repeated the final checks, rather than
independently repeating every HTTP smoke request. Tests exercised local native limiter exhaustion;
Siteverify responses and limiter/D1 failure injections were simulated. No live Turnstile, remote D1,
distributed rate limiting, frontend widget or deployment was verified. The owned dev session stopped.

## Cleanup and repository verification

The parent inspected both reports, preserved first-pass artifacts and final relevant source/tests.
Luna closed its CUA tabs and reported stopped React sessions. Browser CLI cleanup commands hung;
their clients were interrupted, and the reported daemon PID was already absent. The parent confirmed
that Worker and React ports refused connections, but discovered Astro's preview still serving on its
evaluation port after the agent's attempted stop command. That cleanup claim required correction.

The owned Astro process was then stopped; Luna and the parent independently verified connection
refusal. The pre-existing service on the adjacent port was left untouched. The parent removed the
entire owned evaluation root, including dependencies, caches, databases, profiles, builds and snapshots,
and verified `lstat` returned `ENOENT`. This document retains the observations; disposable code was
not added to the repository.

Final `bun run check` passed formatting, lint, strict types, 32 repository tests with 76 assertions,
and plugin metadata, local links and source-limit validation. `git diff --check` passed. Previously
uncommitted policy changes were preserved; this round added only evaluation documentation.
Repository quality checks do not substitute for the application behavior checks above.
