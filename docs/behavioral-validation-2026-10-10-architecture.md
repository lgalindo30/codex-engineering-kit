# Architecture Evaluation — 2026-10-10

This bounded evaluation covers backend module boundaries, frontend feature organization and state
ownership. It evaluates the pending shared-reference changes on base `30e8d21`; dependency versions
in disposable fixtures are observed test inputs, not permanent project defaults.

## Method and independence

Three fresh agents were dispatched with requested model `gpt-6-luna`, reasoning `high`, without
inherited conversation. Each received a read-only plugin snapshot, its own temporary directory and
a realistic task. Initial prompts did not disclose suspected defects or sibling results. Dispatch
settings are not independently verified model metadata. Automatic native skill discovery was not
evaluated.

The parent inspected actual sources and tests, retained first-pass artifacts before targeted feedback,
and repeated final executable checks. Corrections following that review are assisted results, not
fresh independent passes. Existing explicit rules were not duplicated to compensate for omissions
in generated fixtures. No skill entrypoint changed; the three shared references remain small.

## Backend implementation

The independent first pass implemented a standalone Bun/strict TypeScript/Hono catalog and quotation
application. Its quote operation depends on a catalog read interface, with no HTTP/framework, database
driver or provider SDK imports. The in-memory catalog implements that public interface. The HTTP
adapter receives its dependency explicitly and maps validated input and domain failures. Another
caller exercises the same quote operation without an HTTP request or storage-specific dependency.
No feature reaches into another feature's private persistence implementation.

The first pass passed nine tests after agent-local fixes for cache test discovery and error-response
headers. Parent inspection found an ancillary omission: the adapter generated a new identifier even
when the client supplied a valid `X-Request-ID`. The assisted follow-up applied the existing correlation
policy and tested successful and failed requests with supplied IDs, plus regeneration for absent,
invalid and overlength IDs.

The parent repeated frozen installation and `bun run check`: strict TypeScript and **10 tests,
43 assertions**, all passing. Coverage includes HTTP/catalog responses, quote totals, invalid
quantities, unknown SKUs, integer overflow, malformed JSON, unsupported media types, Problem Details
media type and identifier correlation. Fixture versions included Bun `1.4.2`, Hono `4.13.13`,
Zod `4.6.5` and TypeScript `7.0.2`.

The disposable in-memory adapter and Hono `app.request()` calls verify dependency direction and
behavior, not durable storage, transactions, network serving or deployment. No database,
authentication, infrastructure or live listener was installed.

## Frontend implementation

The independent first pass built a React/Vite inventory SPA for Cloudflare static assets with a
separate HTTP API. TanStack Router owns validated filter/page parameters, TanStack Query owns remote
list results, React Hook Form owns the editable draft, and local tagged step state owns details/review
navigation. Refresh detects a changed remote baseline and warns while preserving edited form values.
Save failure and retry retain the draft. No duplicate global store or state-machine library was added.

The first pass passed three component behavior tests and a production build after agent-local
TypeScript and test-fixture corrections. Parent review found that shared transport also contained
inventory schemas and endpoint operations, contrary to the feature-organization rule. The assisted
follow-up moved resource contracts/operations into the inventory feature and kept generic HTTP,
validation plumbing, correlation and common errors in the shared client. Parent inspection verified
that production shared utilities do not import the feature. Review also requested retention of sent
and returned identifiers in failure diagnostics, including network failure.

The parent repeated frozen installation, `bun run typecheck`, `bun run test` and `bun run build`:
**six tests across two files** and the production build passed. Tests exercise selected API slices,
history-back restoration, invalid URL search fallback, refresh/draft conflict, failure/retry with the
same payload, and sent/returned request identifiers on HTTP and no-response failures. Vite transformed
252 modules and emitted 458.52 kB JavaScript (143.23 kB gzip). The fixture contains one inventory route;
this build does not establish lazy loading across multiple feature routes. Styling-system compliance
was not evaluated; the fixture used handwritten CSS rather than the kit's Tailwind preference.

Fixture pins included React `19.3.0`, Vite `8.3.4`, TanStack Router `1.170.42`, TanStack Query
`5.104.1`, React Hook Form `7.89.0`, Zod `4.6.5`, Vitest `5.0.3` and TypeScript `7.0.2`.

The tests simulate HTTP at `fetch`, use jsdom and an in-memory router history, and stub native dialog
methods. These are component behavior checks, not real-browser navigation, visual/accessibility
verification, real API integration, CORS enforcement or Cloudflare deployment. Draft persistence
across reloads and multi-user write consistency were not part of this fixture.

## Planning cases

The third agent produced independent proposals for five existing-project cases. Parent review found
the intended proportional choices:

- An integrated Next.js/Prisma summary keeps server-side data access without adding a separate API,
  repository framework or client query library solely for the new page.
- An existing React/Vite application preserves Redux, React Router and TanStack Query while assigning
  shareable filters to the URL, remote data to the query cache and editable values to the draft.
- A small static Astro site extracts a twice-used static component without hydration or a backend.
- An existing NestJS application preserves classes and dependency injection while validating quantity
  at its public application operation, so non-HTTP callers receive the same rule.
- A substantial modular Node application extends existing lint/build tooling for concrete allowed
  and forbidden imports, including aliases, rather than installing another architecture tool.

These are inspected planning responses, not executed implementations of those frameworks or lint
restrictions. Browser draft persistence and the exact import-rule recipe require project-specific
decisions; the plugin intentionally supplies no universal storage or ESLint configuration for them.

## Repository checks and cleanup

Repository `bun run check` passed formatting, lint, strict types, **33 tests with 80 assertions**,
plugin metadata/reference validation and maintained-source limits. `bun run security:check` passed
with no vulnerabilities found across 98 packages. The changed shared references have 77, 73 and
137 lines; all skill entrypoints remain unchanged.

After agents and executable checks completed, the parent verified that the two owned HTTP ports had
no listeners and removed the temporary snapshot, fixtures, first-pass copies, dependencies and caches.
Removal was checked; this report retains inspected findings rather than executable fixture projects.
No deployment, telemetry backend, real database, automatic skill selection or native Codex session
loading was tested. These
results support the evaluated architectural choices and corrected implementations, not guaranteed
adherence in every future generated project.
