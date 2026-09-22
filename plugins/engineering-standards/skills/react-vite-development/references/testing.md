# React/Vite testing strategy

## Select the test boundary

Preserve the existing runner. Vitest with React Testing Library is a useful new-project default for
component behavior; Playwright can cover critical browser journeys without replacing focused tests.

- Unit-test pure logic and transformations with deterministic inputs and explicit external dependencies.
- Exercise component interaction through accessible roles and labels: validation, submission, pending
  states, errors, empty data, retries, and keyboard/focus behavior. Avoid internal state assertions.
- Test client cache invalidation and API error handling when changed. Keep network mocks at the HTTP
  boundary and cover realistic response shapes; do not mock the implementation under test.
- For TanStack integrations, verify validated search parameters, browser back/forward, route loading
  and error states, mutation invalidation, and session cache clearing. Use isolated router/query
  instances per test; confirm route loading and components use the same cache.
- Verify critical navigation, refresh/deep links, and shareable URL state in a browser. Use production-
  like serving when routing fallback, base paths, bundles, or assets change.
- Distinguish mocked API journeys from end-to-end tests against the real backend. Client-side validation
  tests cannot establish server authorization or data integrity.

## Isolation and regressions

Reset test caches and handlers between tests. Use disposable app instances, accounts, and backend
resources; never production. Give concurrent runs separate resources and avoid live messages or payment
side effects. Control clocks where relevant and await observable conditions rather than sleeping.

For a defect, show its expected failure before fixing it when practical, then rerun that scenario.
Reuse an existing protective test. Favor behavior assertions over broad snapshots, CSS class details,
or private implementation. Complement automated accessibility checks with keyboard/focus inspection
for changed interactions. Do not impose a universal coverage percentage.

## Execution and reporting

Run focused tests and the project's format, lint, type, and relevant build checks. Vite bundling does
not replace type checking, and a build alone does not prove browser behavior. Report commands, results,
mocked versus real dependencies, skipped checks, and missing prerequisites. Retain redacted failure
traces/screenshots when useful; retries are diagnostic evidence, not a substitute for resolving flakes.
