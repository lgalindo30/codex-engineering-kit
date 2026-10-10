# Frontend Policy Evaluation — 2026-10-10

This bounded evaluation accompanies the Tailwind/shadcn frontend policy revision. It distinguishes
repository validation, agent planning decisions and generated application behavior. No live deployment,
operator configuration change, plugin installation, release bump, commit or push was performed.

## Source and execution

- Base: repository HEAD `d578513`, plugin version `2.0.0`, with uncommitted frontend policy changes.
- Initial snapshot: 101 plugin files, SHA-256
  `327cb135a1ca120daaddc2318e0aca06cc140b790a55b485c2c8baf517efed48`.
  Hash sorted relative paths followed by NUL, file bytes and NUL.
- Revised snapshot after the form-library clarification: 101 files, SHA-256
  `37ecf39950740b3f60a2d09c0707bd666489fd69fa125ec77c3ead20e0b37c3e`.
  The parent verified it matched the final repository plugin tree. The implementation probe used
  the initial snapshot; the planning follow-up used the revised snapshot.
- Three fresh subagents requested `gpt-6-luna`, reasoning `high`, without inherited conversation.
  The parent can verify the requested dispatch profile; the agents did not expose actual backend
  metadata, so the requested profile is not independent runtime identification.
- Each agent owned a separate temporary directory and received the plugin snapshot plus realistic
  tasks/raw fixtures. Neither received expected answers, prior evaluation reports or sibling results
  in the initial pass. Parent review feedback is identified separately below.
- Skills were selected from an explicitly supplied snapshot. Automatic native skill discovery,
  runtime model selection and production readiness were not evaluated.

## Independent planning pass

The parent inspected the actual saved case responses, not just the agent's completion claim.
These were simulated planning responses; no real user supplied the missing decisions and no project
was scaffolded. They establish bounded reasoning evidence, not an executed deployment workflow.

| Case | Fixture                                              | Observed decision                                                                                          |
| ---- | ---------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| A    | New CRM, no framework/host                           | Asked for host and backend boundary; did not begin implementation; suggested a SPA conditionally.          |
| B    | React/Next.js, missing host                          | Kept Next.js and asked for runtime/hosting and data boundary before scaffolding.                           |
| C    | Workers assets CRM, separate API                     | Selected React/Vite, TanStack Router/Query, Tailwind/shadcn and React Hook Form/Zod; kept API separate.    |
| D    | Complex inventory, existing Node host                | Recommended Next.js; requested runtime support/data-boundary confirmation before dependent implementation. |
| E    | Articles/simple landing, static host                 | Selected Astro static output with Tailwind and selective islands; no component system/backend implied.     |
| F    | Explicit Astro admin, Workers static assets, API     | Kept Astro, discussed island/shared-state costs, retained static routes and separate API.                  |
| G    | Explicit Next.js SSR on Workers, no adapter decision | Kept requested framework/host, left adapter choice pending instead of migrating or adding Containers.      |
| H    | Existing Ant Design/Form, React Router, SWR, Azure   | Preserved the stack, but made the new shareable filter's URL persistence conditional: partial adherence.   |
| I    | New React/Vite, explicit Ant Design, Workers assets  | Preserved Ant Design, but inferred Ant Design Form without a form-library choice: failed that criterion.   |

The first pass did not pass every criterion. H's conditional URL decision contradicted the existing
explicit URL policy; no additional global URL rule was added. I exposed a real ambiguity between a UI
system and a form-state library. The parent added one sentence clarifying that these are separate
choices in shared interface policy and the distributed frontend template.

## Parent-assisted planning follow-up

The original responses were retained unchanged. Using a revised snapshot and explicit review feedback,
Luna reevaluated H/I: H put the filter in URL parameters while preserving Ant Design Form, router and
cache; I retained Ant Design without inferring its Form integration. It left form-state selection
conditional on whether forms are implemented. New React forms follow the revised policy's React Hook
Form/Zod preference unless a supported alternative has actually been selected or established.
This is assisted correction, not a fresh independent pass of the revised snapshot.

## Independent revised planning pass

A third fresh agent read only the revised snapshot and four realistic planning requests. It did not
receive expected answers, initial results or parent review feedback. The parent inspected its saved
responses and source-read list before deleting the temporary artifacts.

- New React/Vite inventory admin with explicit Ant Design and Workers assets: retained Ant Design,
  used React Hook Form/Zod for new creation forms, proposed URL state and kept the separate API.
- Existing Ant Design/Form, React Router and SWR on Azure: retained all four choices and placed the
  shareable status filter in URL parameters instead of introducing another router/form/cache.
- Explicit Next.js articles/admin with undecided hosting: retained Next.js and requested the serving
  service/runtime before dependent adapter, authentication or data setup.
- Explicit complex Astro admin on Workers static assets: retained Astro and the separate API;
  discussed a client island and requested its integration choice instead of migrating the framework.

These responses corrected the earlier UI/form-library ambiguity independently. They also requested
API/authentication and configuration detail beyond the minimal fixture, sometimes withholding new
scaffolding until those details were known. The evaluation does not establish perfect question
selection or autonomous compliance with every rule.

## Generated React/Vite fixture

Task: implement a small inventory administration SPA for selected Cloudflare Workers static assets,
consuming a supplied OpenAPI contract from a separate business API. Include a list/table, creation,
shareable filter/sort/pagination, useful states, validation, build and meaningful local verification.
Local HTTP simulation was allowed; no authentication, live API or cloud resources were in scope.

The initial authored source/config snapshot was saved before dependency installation and completed
checks. It is a preserved first draft, not an independently verified application. Parent inspection
found React Hook Form/Zod, TanStack Router/Query, Tailwind configuration and a Not Found view, but no
shadcn components, eager route imports, broad custom styles, and replacement-only search navigation.
The latter could not preserve applied filter/page changes in browser history. The create API response
was only asserted as a TypeScript type, and pending submission needed behavioral verification.

The parent requested bounded corrections and actual checks for route loading, URL history, form
pending/error/focus behavior, malformed API responses and final component integration. The source
policy already contained these requirements; omission by the model did not trigger duplicated rules.

The parent inspected the final source/tests and independently reran the fixture's `bun run check`:
strict TypeScript, 11 Vitest tests across three files and the production build passed. Tests covered
search bounds/selection, malformed successful API payloads, contract error mapping, applied filter
history/page reset, Not Found, invalid-field focus, retained failed-form values and a duplicate pending
submission. The parent also inspected Button/Input/Table adapted from official shadcn sources under
`components/ui/`, shared component placement, runtime Zod response validation and dynamic page imports.
This was manual source integration, not an executed shadcn component-generation CLI.

Verified host/tools: Bun `1.4.2`, parent Node executable `v24.21.0`, React/React DOM `19.3.0`,
TypeScript `5.9.3`, Vite `7.3.7`, Vitest `3.2.7`, Tailwind `4.3.3`, TanStack Router `1.170.42`,
TanStack Query `5.104.1`, React Hook Form `7.89.0`, Zod `4.6.5` and Radix Slot `1.4.0`.
The agent reported Node `v23.6.1`; the parent's executable check did not reproduce that value, so it
is not treated as verified host Node metadata.

The parent build emitted separate `ItemsPage` and `NewItemPage` chunks (16.33/40.94 kB uncompressed),
with a 330.15 kB main chunk and shared input/schema code. This proves emitted chunk separation;
it does not prove deferred browser requests. Rollup emitted non-fatal warnings about removed Zod
pure-comment annotations. The agent reported local HTTP checks: a disposable Bun API returned list
200, create 201 and invalid-extra-field 400; Vite preview served `/` and `/items/new` as 200 HTML.
Those smoke checks were agent-run, not independently rerun by the parent or a Cloudflare runtime test.

Remaining fixture gaps: broad normal component CSS remained alongside utilities, tooling used semver
ranges with a lockfile, format/lint were not configured, and bounded stale-chunk recovery was not
implemented. Real-browser requests, rendered responsive/accessibility states, Cloudflare Wrangler/
workerd serving, provider configuration and live business API compatibility were not verified.
Passing application checks therefore establish selected behavior, not full policy adherence or
production readiness. Already-explicit policy was not duplicated to compensate for these omissions.

## Repository verification and cleanup

The first repository `bun run check` passed format, lint, strict types, 32 tests with 76 assertions,
and plugin metadata/local-link/source-limit validation. Four standalone `skill-creator` quick-validator
attempts could not start because the host Python lacked `PyYAML`; they are unavailable checks, not
passes. The repository's own validator passed and covers its skill metadata and reference graph.

After all agents completed, the parent confirmed no listeners through `lsof` and direct TCP
`ECONNREFUSED` on both owned ports (18787 and 4173). No browser tab was opened. Temporary plugin
snapshots, original/assisted responses, application source, dependencies, caches and generated output
were removed together; the removal was checked independently. Durable evidence is this inspected
summary rather than retained executable fixtures.

The final repository `bun run check` passed format, lint, strict types, 32 tests with 76 assertions
and plugin metadata/local-link/source-limit validation. All four affected skill entrypoints remain
50–52 lines; architecture/styling detail is conditional shared guidance, with Cloudflare asset details
in its provider reference. No release or global plugin update was performed.
