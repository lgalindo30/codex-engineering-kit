# Testing Decisions

## Scope and tools

Choose the smallest layer that demonstrates the behavior: isolated logic, component interaction,
service integration, public contract, or end-user journey. Preserve a suitable existing runner.
Use the selected technology skill's testing reference for execution details, without loading unrelated
implementation procedures. When none exists, use project evidence and official ecosystem guidance.
Do not add a runtime solely to satisfy a generic testing preference.

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
- Keep diagnostic traces, screenshots, and logs on useful failures; redact secrets and sensitive
  fixtures. Treat retries as diagnostic evidence, not a reason to ignore flaky tests.
- Report exact commands and outcomes, unavailable prerequisites, and skipped scope. A test plan is
  not an executed test. Static skill validation is not an observed autonomous-agent evaluation.

## Regression evidence and optional mutation exercises

For a defect correction, reproduce the failure with a focused behavioral test when feasible. Confirm
that the pre-fix failure is the expected assertion or behavior, not a missing dependency, setup error
or unrelated crash. Verify the corrected behavior with the same test and relevant integration checks.
If an existing test already protects the defect, reuse or strengthen it instead of adding a duplicate.
When safely reproducing the old behavior is impractical, explain which evidence is missing.

Deliberately changing a boundary, removing validation or altering a default is an optional test-quality
evaluation, not a routine implementation step. Run such exercises only when requested, in disposable
copies or isolated checkouts. Do not introduce deliberate defects into the user's active work or
production. A surviving mutation indicates a behavior to investigate, not an automatic requirement
for another test. Restore the exercise fixture and verify cleanup. Never impose test-count quotas.

## Debugging failures

Reproduce the smallest relevant failure, collect its error and context, state a falsifiable
hypothesis, and change the responsible behavior. Verify the regression and affected integration.
Avoid deleting assertions or adding retries merely to turn a failure green. Escalate to the parent
with evidence when the cause crosses ownership boundaries or repeated attempts add no information.

## Sources to check when implementing

- [OWASP Web Security Testing Guide](https://owasp.org/www-project-web-security-testing-guide/)
