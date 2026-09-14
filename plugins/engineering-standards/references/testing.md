# Testing Decisions

## Tools and scope

| Scope                      | New-project default                                       | What to prove                                                |
| -------------------------- | --------------------------------------------------------- | ------------------------------------------------------------ |
| Backend and Bun utilities  | Bun Test                                                  | Business rules, boundaries, errors, and regressions          |
| React components and hooks | Vitest + React Testing Library                            | User-observable state and interaction                        |
| Backend integration        | Bun Test with disposable dependencies                     | Routing, validation, persistence, and serialization together |
| API contract               | Versioned OpenAPI validation and relevant consumer checks | Actual requests/responses match the public contract          |
| Browser journeys           | Playwright                                                | Critical cross-page flows and actual browser integration     |

Do not install Jest by default. Bun's Jest-style API does not imply installing Jest. Preserve an
existing runner when it fits the request. Permit Node for tooling compatibility and document why.
An implementer remains responsible for verifying its work even when no testing specialist is used.

## Choose meaningful evidence

- Cover successful behavior, relevant invalid inputs, and failures at changed boundaries. Add a
  regression that demonstrates the bug before the fix when practical.
- Test behavior rather than private function structure, exact incidental wording, or component
  internals. Prefer roles, labels, and visible results over fragile selectors and broad snapshots.
- Keep deterministic units around pure logic; use real database behavior for constraints,
  transactions, query semantics, or migrations. SQLite is not a substitute for PostgreSQL tests
  when PostgreSQL-specific behavior is relevant.
- Use mocks at external boundaries, not to simulate the implementation under test. Distinguish
  mocked frontend journeys from end-to-end journeys that exercise the actual backend.
- Test form-specific validation separately from server validation. Generated client compilation
  alone does not prove runtime contract compatibility or detect every breaking API change.
- Check API versioning, unknown fields, limits, status codes, public error shapes, and disclosure
  boundaries when those behaviors change. Cover file size/content checks when uploads are added.
- For requested authentication, cover token expiry and refresh, cookie attributes, CSRF rejection,
  logout/revocation, and unauthorized requests as appropriate to the implemented session design.
- Use an injectable clock or controlled time for expiry and date boundaries. Avoid arbitrary sleeps;
  prefer deterministic events and browser assertions that wait for observable state.
- Add automated accessibility checks when useful and complement them with keyboard and focus
  inspection for changed interactions. Run browser checks across engines when compatibility matters.
- No universal coverage percentage is required. Use coverage to identify untested important behavior,
  not as a replacement for acceptance criteria. Reversible low-impact changes may need only checks.

## Isolation and execution

- Use disposable databases, schemas, directories, accounts, and ports. Make integration resource
  ownership explicit, and confirm targets before reset/drop/cleanup operations. Never use production.
- Seed deterministic minimal fixtures and clean up only resources created by the test run. Support
  parallel runs without shared mutable fixtures, fixed colliding identifiers, or order dependencies.
- External payments, messages, email, and storage use local doubles or sandbox integrations explicitly
  selected for testing. Never send real notifications or incur live charges as a test default.
- Pin relevant tool/browser versions in the lockfile and CI configuration. Do not silently skip a
  dependency-dependent suite and then report the entire verification as passed.
- Start with affected tests. Run the repository's required quality command before completion and
  production build checks when bundling or rendering changed. Broaden only for unresolved risk.
- Keep Playwright traces, screenshots, and logs on useful failures; redact secrets and sensitive
  fixtures. Treat retries as diagnostic evidence, not a reason to ignore flaky tests.
- Report exact commands and outcomes, unavailable prerequisites, and skipped scope. A test plan is
  not an executed test. Static skill validation is not an observed autonomous-agent evaluation.

## Debugging failures

Reproduce the smallest relevant failure, collect its error and context, state a falsifiable
hypothesis, and change the responsible behavior. Verify the regression and affected integration.
Avoid deleting assertions or adding retries merely to turn a failure green. Escalate to the parent
with evidence when the cause crosses ownership boundaries or repeated attempts add no information.

## Sources to check when implementing

- [Bun Test](https://bun.com/docs/test)
- [Vitest](https://vitest.dev/guide/)
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- [Testing Library principles](https://testing-library.com/docs/guiding-principles/)
- [Playwright best practices](https://playwright.dev/docs/best-practices)
- [OWASP Web Security Testing Guide](https://owasp.org/www-project-web-security-testing-guide/)
