# Behavioral Validation

These scenarios are acceptance rubrics for future isolated agent evaluations. Their presence does
not mean the evaluations have run. Record actual results, model/runtime versions, commands,
artifacts, and failures separately. Structural validation of the kit cannot establish whether an
agent follows its policies during real work.

Use a disposable workspace with the kit installed into an isolated Codex home. Do not alter the
operator's global configuration or create live external resources. Inspect the generated result
and executed checks; do not pass a run solely because its final message claims compliance.

## Initial implementation probes — 2026-09-14

Kit source: initial 0.1.0 working tree, before its first commit. Host: macOS, Bun 1.3.14.
Two bounded workers received explicit skill paths in fresh temporary application directories. These
were narrower probes than the full scenarios below and did not validate fresh-session automatic
skill discovery, global role loading, or autonomous model selection. No production resources were used.

| Probe                                                     | Observed model        | Result                                                                           |
| --------------------------------------------------------- | --------------------- | -------------------------------------------------------------------------------- |
| A tiny note-validation API, no database or authentication | GPT 5.6 Terra, high   | Functional checks passed; full engineering-default compliance failed             |
| A static public note-app landing page, no API or accounts | GPT 5.6 Terra, medium | Passed the bounded page/build probe; production-origin SEO configuration pending |

Backend artifacts included a Hono app factory, Bun startup, `/api/v1/notes`, Zod schemas, a runtime
OpenAPI document, Problem Details, six request tests, and Docker/Compose files. The parent reran
strict type checking and `bun test`: six passed, zero failed, 25 assertions. The worker also exercised
live HTTP requests and `docker compose config`. Docker image build/run was blocked by the unavailable
daemon. The generated project omitted Pino and complete lint/format tooling, so this was not a pass
of all backend defaults. The skill now links repository-quality and its bootstrap assets explicitly;
that refinement has not yet had a separate complete agent rerun. The contract reference also clarifies
runtime versus exported artifacts and framework parsing failures outside schema hooks.

Frontend artifacts included an Astro 7.3.2 static page, separate layout/copy/styles, local AGENTS.md,
and Bun, strict TypeScript, EditorConfig, ESLint and Prettier configuration. The worker's check command
passed formatting, lint, Astro checks and a production build. The parent reran that command and
inspected the generated metadata and pricing anchor. Browser evidence reported by the worker included
a working pricing link, no console warnings/errors and no horizontal overflow at 390px. No real public
origin was supplied, so canonical URL and sitemap setup were documented rather than fabricated.

Probe projects are disposable local artifacts outside this repository and are not release fixtures.
No containers or services were deployed; temporary projects can be removed after inspection. The full
database backend, administration frontend, monorepo and small-change scenarios below remain **not run**.

## Standalone backend

Prompt:

> Create a standalone inventory API in this repository with item creation and retrieval. Items have
> a bounded name, integer stock, and optional expiry date. Use PostgreSQL. Prepare local Docker
> execution. Authentication is not required. Implement and verify the API.

Accept when the result:

- Uses Bun, strict TypeScript, Hono, Zod, Drizzle, and versioned OpenAPI routes.
- Places accurate instructions in the repository root without inventing a backend subdirectory.
- Keeps schema validation and persistence distinct, handles errors with Problem Details, and emits
  structured console logs without secrets or an installed telemetry backend.
- Handles expiry as a civil date rather than silently treating it as a UTC instant.
- Includes reviewed migration files, safe environment examples, persistent Docker storage, and
  meaningful route/database tests with isolated dependencies.
- Does not add login, roles, multitenancy, queues, Kubernetes, or external logging infrastructure.

## Standalone frontend

Prompt:

> Build a responsive inventory administration frontend consuming the supplied versioned OpenAPI
> contract. Include a list, creation form, and useful empty/error states. The API runs separately.

Supply an actual small contract fixture and a disposable API or declared mock before execution.

Accept when the result:

- Uses React/Next.js as appropriate to the administration scope and keeps business persistence out
  of Next.js. Uses Ant Design where its forms and tables add value.
- Centralizes API origin/version, uses local Zod form schemas, and does not create shared contracts.
- Distinguishes generated compile-time types from any required runtime response validation.
- Uses native framework routing, accessible labels/focus, and purposeful client data caching.
- Includes meaningful Vitest/Testing Library coverage and browser evidence for critical behavior.
- Keeps default copy and instructions in English and accurately states whether API tests were mocked.

## Monorepo coordination

Prompt:

> In this existing monorepo, add an inventory API under apps/api and its frontend under apps/web.
> Preserve the existing plugins and tools. Agree on the public contract first, then implement both
> sides and verify the complete create-and-list flow.

Seed an existing plugin/tool and unrelated file changes before running the evaluation.

Accept when the result:

- Preserves unrelated files and uses scoped `AGENTS.md` files at the actual application boundaries.
- Agrees on versioned OpenAPI before independent implementation; does not default to packages/contracts.
- Delegates bounded independent work with explicit ownership where it helps, including a single owner
  for shared root configuration and lockfile changes.
- Keeps the parent responsible for integration and records actual end-to-end evidence.
- Chooses model and reasoning effort according to task complexity and available controls; does not
  claim unavailable model overrides occurred or create all roles merely because they exist.
- Respects actual concurrency limits and does not require nested delegation or a separate review task.

## Small direct change

Prompt:

> Correct the item-name maximum in the existing creation form from 120 to 100 characters and update
> the existing regression test. Do not otherwise change the application.

Accept when the parent applies the appropriate skill directly, makes the narrow change, runs relevant
checks, and avoids unnecessary delegation, new dependencies, broad refactors, or new project folders.

## Static public site

Prompt:

> Build a mostly static product landing page and blog. Search discoverability and fast loading are
> important. No accounts, database, or API are needed.

Accept when the result chooses Astro with limited islands only if needed; includes meaningful SEO
metadata, crawlable content, responsive assets, and measured production-build checks; and avoids
unneeded Ant Design, authentication, telemetry, queues, database, or a separate backend.

## Recording a run

For each evaluation, record its date, kit revision, environment, prompt and provided fixtures,
observed delegation/models, files produced, checks actually run, failed rubric items, and cleanup.
Use `not run`, `passed`, `failed`, or `blocked` explicitly. Investigate observed failures before
changing a skill; avoid expanding every isolated failure into a global rule.

## Optional exercise-derived evaluations — not run

These are bounded agent evaluations, not mandatory production workflow steps. Use disposable fixtures,
record the exact prompt and starting revision, and keep temporary diagnoses out of project AGENTS.md.
No fixed number of tests, findings, slices or commits is an acceptance criterion.

- **Verified slices:** request a small CRUD feature with acceptance criteria. Observe whether the agent
  verifies a first complete behavior before accumulating dependent endpoints. Check startup and input
  safeguards when first needed. Commit evidence is relevant only when commits were authorized.
- **Existing conventions:** supply a repository with representative error handling and test fixtures.
  Check whether the agent identifies relevant patterns with file/symbol evidence, follows them, and
  explains any necessary new pattern. Include a known unrelated baseline failure to check attribution.
- **Test, break and repair:** start with a passing focused suite in a disposable copy, introduce a
  realistic boundary/validation defect, and record it separately. Give the diagnostic agent failing
  output without revealing the mutation. Record the root-cause accuracy, experiments and rounds, then
  verify the repair. Confirm the protective test catches the original defect for the expected reason;
  reuse it if sufficient. If the original tests survive, record the gap before investigating it.
- **Review and closure:** preserve a generated feature's baseline and review comprehension, boundary
  failures, security and operational behavior. Findings need concrete triggers and impact; zero real
  findings is allowed. Record each correction and evidence of resolution, with blocked checks explicit.

Do not turn exercise assumptions into engineering rules: generated code is not presumed defective,
edge cases are not automatically low severity, and a green build alone does not establish production
readiness. Clean up only evaluation-owned resources and record any checks that were not executed.
