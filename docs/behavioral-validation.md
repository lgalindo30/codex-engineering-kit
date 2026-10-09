# Behavioral Validation

These scenarios are acceptance rubrics for future isolated agent evaluations. Their presence does
not mean the evaluations have run. Record actual results, model/runtime versions, commands,
artifacts, and failures separately. Structural validation of the kit cannot establish whether an
agent follows its policies during real work.

Use a disposable workspace with the kit installed into an isolated Codex home. Do not alter the
operator's global configuration or create live external resources. Inspect the generated result
and executed checks; do not pass a run solely because its final message claims compliance.

## Historical implementation probes — 2026-09-14

Kit source: initial 0.1.0 working tree, before its first commit. Host: macOS, Bun 1.3.14.
Two bounded workers received explicit skill paths in fresh temporary application directories. These
were narrower probes than the full scenarios below and did not validate fresh-session automatic
skill discovery or autonomous model selection. No production resources were used.

| Probe                                                     | Observed model        | Result                                                                           |
| --------------------------------------------------------- | --------------------- | -------------------------------------------------------------------------------- |
| A tiny note-validation API, no database or authentication | GPT 5.6 Terra, high   | Functional checks passed; full engineering-default compliance failed             |
| A static public note-app landing page, no API or accounts | GPT 5.6 Terra, medium | Passed the bounded page/build probe; production-origin SEO configuration pending |

Backend artifacts included a Hono app factory, Bun startup, `/api/v1/notes`, Zod schemas, a runtime
OpenAPI document, Problem Details, six request tests, and Docker/Compose files. The parent reran
strict type checking and `bun test`: six passed, zero failed, 25 assertions. The worker also exercised
live HTTP requests and `docker compose config`. Docker image build/run was blocked by the unavailable
daemon. The generated project omitted Pino and complete lint/format tooling, so this was not a pass
of all backend defaults. At the time, the skill was updated to link repository-quality and its bootstrap
assets explicitly; that refinement did not receive a separate complete agent rerun. The contract
reference was also clarified for runtime versus exported artifacts and framework parsing failures
outside schema hooks. These observations describe the historical kit, not the current skill layout.

Frontend artifacts included an Astro 7.3.2 static page, separate layout/copy/styles, local AGENTS.md,
and Bun, strict TypeScript, EditorConfig, ESLint and Prettier configuration. The worker's check command
passed formatting, lint, Astro checks and a production build. The parent reran that command and
inspected the generated metadata and pricing anchor. Browser evidence reported by the worker included
a working pricing link, no console warnings/errors and no horizontal overflow at 390px. No real public
origin was supplied, so canonical URL and sitemap setup were documented rather than fabricated.

Probe projects are disposable local artifacts outside this repository and are not release fixtures.
No containers or services were deployed; temporary projects can be removed after inspection. Every
future scenario below is **not run**. Static checks of the revised references and validator do not
execute these scenarios or establish agent behavior.

## Standalone backend — not run

Prompt:

> Create a standalone inventory API in this repository with item creation and retrieval. Items have
> a bounded name, integer stock, and optional expiry date. Use PostgreSQL. Prepare local Docker
> execution. Authentication is not required. Implement and verify the API.

Run against an empty fixture and fixtures with an established Bun or Node.js toolchain. Record the
selected runtime and its justification. The runtime-unspecified prompt does not require choosing Bun.

Accept when the result:

- Preserves the fixture's runtime/package manager or selects a compatible runtime when none exists.
  Uses strict TypeScript and appropriate HTTP/schema/database integrations; Hono, Zod, and Drizzle are
  defaults for a new service when applicable. Node uses its adapter/drivers without Bun-only imports.
- Provides versioned public API routes and a reproducible OpenAPI contract for consumers.
- Places accurate instructions in the repository root without inventing a backend subdirectory.
- Keeps schema validation and persistence distinct, handles errors with Problem Details, and emits
  structured console logs without secrets or an installed telemetry backend.
- Handles expiry as a civil date rather than silently treating it as a UTC instant.
- Includes reviewed migration files, safe environment examples, persistent Docker storage, and
  meaningful route/database tests with isolated dependencies.
- Does not add login, roles, multitenancy, queues, Kubernetes, or external logging infrastructure.

## React/Vite administration frontend — not run

Prompt:

> Build a responsive inventory administration SPA with React and Vite consuming the supplied versioned
> OpenAPI contract. Include list and creation routes, shareable list filters, and useful empty/error
> states. The API runs separately.

Supply an actual small contract fixture and a disposable API or declared mock before execution.

Accept when the result:

- Uses React/Vite with business persistence in the supplied API. Uses Ant Design where its forms and
  tables add value.
- Centralizes API origin/version, uses local Zod form schemas, and does not create shared contracts.
- Distinguishes generated compile-time types from any required runtime response validation.
- For the new routed SPA, uses TanStack Router and TanStack Query with one QueryClient and reusable
  query keys/options. Route loading and component reads share the same remote cache.
- Verifies back/forward, refresh, direct links, validated filters, mutation invalidation, loading/error
  states, and accessible labels/focus. Does not replace Vite with TanStack Start.
- Includes meaningful Vitest/Testing Library coverage and browser evidence for critical behavior.
- Keeps default copy and instructions in English and accurately states whether API tests were mocked.

Repeat with an established or explicitly requested alternative router/data library. Accept preservation
of that choice unless migration is requested; record this as a separate run.

## Integrated Node.js and Next.js application — not run

Prompt:

> Build an inventory application using Next.js on Node.js and PostgreSQL. Keep the UI and backend in
> one application. Include item creation and a list. No separate API clients, accounts, or services
> are required. Implement and verify the complete flow.

Accept when the result:

- Keeps one integrated Next.js application on Node.js, with native routing and server/client boundaries.
- Uses server-side persistence and the framework's appropriate server entrypoints; does not create a
  separate Hono service, HTTP API, or OpenAPI artifact merely to connect internal server code.
- Keeps database credentials and privileged imports out of client bundles, validates server inputs,
  and handles errors without exposing private details.
- Verifies the actual create-and-list flow, database effects, production build, and Node startup.
  Does not add TanStack Router to replace Next.js routing or duplicate framework-owned server data.

## Separate Node.js API and Astro frontend — not run

Prompt:

> Build a Node.js inventory API and a separate Astro frontend with an inventory list and creation form.
> Use PostgreSQL in the API and let Astro consume its public contract. Keep the API and frontend as
> separately deployable applications. Implement and verify the complete flow.

Accept when the result:

- Keeps server persistence and business rules in the Node.js API and uses a versioned public contract.
- Uses Astro's native routing and only the client islands required by the form's interactions; does
  not replace routing with TanStack Router or turn the site into a full SPA without a product need.
- Selects static or on-demand rendering deliberately and verifies the chosen Astro output/adapter.
  An Astro adapter does not replace the separately requested business API.
- Aligns API origin, error handling, and any required cross-origin configuration with the deployment.
  Verifies the create-and-list flow against the real API and distinguishes mocked component evidence.
- Runs each application's relevant checks and records service dependencies and deployment commands.

## Monorepo integration — not run

Prompt:

> In this existing monorepo, add an inventory API under apps/api and its frontend under apps/web.
> Preserve the existing plugins and tools. Agree on the public contract first, then implement both
> sides and verify the complete create-and-list flow.

Seed an existing plugin/tool and unrelated file changes before running the evaluation.

Accept when the result:

- Preserves unrelated files and uses scoped `AGENTS.md` files at the actual application boundaries.
- Agrees on versioned OpenAPI before implementing the API and consumer; does not default to packages/contracts.
- Preserves the selected technologies and runtime, shares only justified tooling, and keeps framework
  implementation details within each application's boundary.
- Verifies aggregated commands against the real packages and records actual end-to-end evidence.
  Delegation, model selection, concurrency settings, and a separate review task are not acceptance criteria.

## Small direct change — not run

Prompt:

> Correct the item-name maximum in the existing creation form from 120 to 100 characters and update
> the existing regression test. Do not otherwise change the application.

Accept when the agent makes the narrow change, runs relevant checks, and avoids new dependencies,
broad refactors, or new project folders. No additional transversal workflow is required.

## Modular Cloudflare Workers API — not run

Prompt:

> Create a TypeScript Cloudflare Worker with Hono inventory and contact features. Use Zod for request
> and response contracts, generate OpenAPI, persist inventory in D1 through Drizzle, and protect public
> routes with rate limits. Prepare local development and verification without deploying live resources.

Accept when the result:

- Uses feature subapplications with inferred route types and explicit business dependencies, keeping
  the Worker entrypoint separate from route implementation. Does not add a DI framework or separate
  services merely because there are two features.
- Distinguishes Bun package management, Wrangler's supported Node.js execution, and workerd runtime.
  Uses pinned compatible Wrangler/Vite/Vitest integrations and generated binding types.
- Validates runtime inputs and mapped outputs, documents mounted routes and middleware errors, and
  verifies malformed payloads, serialized contracts, and unexpected failures in the Workers runtime.
- Applies reviewed Drizzle migrations to disposable local D1 with a single migration history and
  tests actual adapter behavior. Does not assume PostgreSQL transaction semantics or use production.
- Exercises rate-limit rejection and safe key selection without claiming strict global quotas.
  Produces safe warning/error application logs and disables automatic invocation logs.

Repeat with an explicitly requested separately deployable notification Worker. Accept a narrow private
Service Binding API, validated delegated contracts, authorization/correlation context, and actual
local inter-Worker verification. Record mocks separately from exercised HTTP/RPC bindings.

## Cloudflare public form with interaction-only Turnstile — not run

Prompt:

> Add a public contact form to this landing page using its current design system. The deployment target
> is Cloudflare. Keep automatic verification and success invisible, show the widget only when manual
> interaction is required, and show loading on disabled submission actions while verification runs.

Run with disposable frontend/server fixtures and Cloudflare test keys. Repeat across selected frontend
frameworks when evaluating their specific lifecycle integration.

Accept when the result:

- Uses Managed interaction-only appearance with submit-triggered execution and a form-specific action.
  Keeps the interactive widget accessible instead of hiding it with CSS or choosing Invisible mode.
- Selects Turnstile directly from the Cloudflare deployment context. With missing keys/account setup,
  records specific pending configuration and distinguishes prepared code from active protection.
- Prevents duplicate submissions, keeps data on failure, shows accessible pending/error status, and
  permits bounded retry after expiration, timeout, unsupported browser, or provider failure.
- Calls server Siteverify and checks success, hostname, and action before side effects; rejects missing,
  invalid, expired, or reused tokens. Keeps secrets server-only and tokens absent from diagnostics.
- Tests hidden automatic/success states, interaction visibility, loading/disabled controls, and
  failure recovery, distinguishing simulated callbacks from a live interactive challenge.

These scenarios have not been executed; kit formatting, type checks, reference validation, and tooling
tests do not establish generated-application or provider behavior.

## Public form on another cloud — not run

Prompt:

> Plan a public contact form for this application using the selected cloud and services. Recommend
> anti-bot protection and identify the configuration/implementation still needed. Do not configure a
> protection service or provision infrastructure yet.

Repeat with AWS, Azure, and GCP deployment fixtures and a fixture with no selected cloud. Include an
established protection service in one fixture and an unrelated mention of Cloudflare in another.

Accept when the result:

- Recommends an appropriate native option for the selected cloud using current official capabilities
  and the actual form/endpoint architecture; preserves an explicitly selected protection service.
- Keeps protection implementation/configuration as a concrete pending item and reports that it is
  not active. Does not add credentials, infrastructure, widgets, or a third-party vendor automatically.
- Does not select Turnstile or change hosting because a public form exists or Cloudflare tooling was
  mentioned. When no cloud is selected, leaves provider selection pending with a generic recommendation.
- Evaluates whether the recommended control supports the requested hidden automatic verification,
  interactive fallback, and browser/API flow instead of promising equivalent behavior across providers.

Repeat with an explicit request to implement the chosen native integration in a disposable fixture.
Accept scoped code/configuration and meaningful provider-specific tests, respecting live-action scope.
These evaluations have not been executed.

## Provider-aware API rate limiting — not run

Prompt:

> Assess rate limiting for this application's public and expensive API endpoints. Respect its selected
> deployment and services. Recommend a policy and identify pending implementation/configuration;
> do not provision infrastructure or configure live services.

Repeat with selected AWS, Azure, GCP, Cloudflare Workers, self-hosted, and unspecified deployment
fixtures. Include an existing compatible limiter in one fixture and unrelated Cloudflare tooling
in another.

Accept when the result:

- Recommends a suitable existing or native control for the actual serving boundary without changing
  hosting or adding a vendor from an unrelated guide. Unspecified service selection remains pending.
- Identifies endpoint scope, justified thresholds, trusted keys, distributed guarantees, rejection
  semantics, and failure behavior. Distinguishes approximate protection from exact global accounting.
- Records concrete pending implementation/configuration and does not claim active protection.
- Uses the Cloudflare adapter only for the selected Workers deployment/native integration, preserving
  an explicitly chosen compatible service and avoiding Cloudflare bindings in other deployments.

Repeat with authorized implementation in a disposable fixture. Verify accepted, exceeded, and limiter
failure paths at the actual boundary without side effects after rejection; record mocked versus
observed provider behavior. These evaluations have not been executed.

## Shared architecture, persistence, and deployment policy — not run

Prompt:

> Add a small feature to this existing service using its selected framework, database, and deployment.
> It performs a coupled write and calls an external service. Assess whether it needs a separate
> service, implement within the agreed scope, and prepare verification without live deployment.

Repeat with Node, Bun, Next.js, and Cloudflare Workers fixtures, preserving an existing ORM/service
choice. Include selected container, static/serverless, and unspecified deployment variants where
compatible with the task; static fixtures delegate the operation to their existing server endpoint.

Accept when the result:

- Keeps cohesive feature boundaries and explicit dependencies; separates services only for a concrete
  deployment, permission, ownership, or operational need. Uses the selected framework/transport.
- Checks the actual engine/adapter's concurrency behavior and reviewed migration history, retaining
  data ownership and avoiding competing migration runners or migrations at every process startup.
- Bounds calls and retries without duplicating effects or claiming a timeout cancels remote mutations.
  Adds durable background infrastructure only when the requested operation requires it.
- Preserves the deployment/cloud/services; applies Docker checks only to chosen container deployments.
  Leaves unspecified target decisions and missing setup explicit rather than silently selecting a host.
- Exercises actual runtime/adapter boundaries with disposable data and distinguishes mocks/local checks
  from remote behavior. Reports pending rollout/recovery checks without claiming a live deployment.

These evaluations have not been executed; reference validation does not establish agent behavior.

## Static public site — not run

Prompt:

> Build a mostly static product landing page and blog. Search discoverability and fast loading are
> important. No accounts, database, or API are needed.

Accept when the result chooses Astro with limited islands only if needed; includes meaningful SEO
metadata, crawlable content, responsive assets, and measured production-build checks; and avoids
unneeded Ant Design, authentication, telemetry, queues, database, or a separate backend.

## Recording a run

For each evaluation, record its date, kit revision, model/runtime versions, environment, prompt and
provided fixtures, files produced, checks actually run, failed rubric items, and cleanup. Record any
observed delegation as execution context; neither delegation nor a particular model is a pass criterion.
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
