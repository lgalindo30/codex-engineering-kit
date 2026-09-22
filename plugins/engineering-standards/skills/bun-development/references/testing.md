# Bun testing strategy

## Select the test boundary

Use Bun Test for new Bun backend code, preserving a suitable existing suite. Run on the selected Bun
version. Its Jest-style API does not require installing Jest. Keep type checking separate from tests.

- Test business rules with explicit dependencies, deterministic clocks, and meaningful failure cases.
- Exercise Hono handlers through request helpers when applicable: valid payloads, malformed JSON,
  validation limits, status codes, authorization failures, and safe errors. Use a real Bun listener
  for streaming limits, adapter behavior, connection lifecycle, and graceful shutdown when changed.
- Test database constraints, transactions, concurrency, and migrations against the actual engine.
  Do not substitute SQLite for PostgreSQL-specific semantics. Verify Bun-specific drivers on Bun.
- Verify serialized responses and affected consumers against the public contract. Mock external
  integrations at their boundary; a mocked journey is not end-to-end backend verification.
- If a package promises Node compatibility as well, execute its relevant tests there too. Bun's
  compatibility layer does not establish behavior on another runtime.

## Isolation and regression evidence

Use disposable databases, files, ports, and sandbox integrations with deterministic fixtures. Confirm
resource ownership before resets and cleanup; never use production credentials or send live messages
as test defaults. Avoid shared mutable fixtures and fixed ports that break concurrent test runs.

For defects, demonstrate the expected failure before the fix when practical and the same case passing
afterward. Reuse existing regression coverage. Control time instead of sleeping; do not hide failures
with retries or weaker assertions. Assert observable behavior, not implementation structure or a
universal coverage quota.

## Execution and reporting

Run focused tests, the project quality command, and changed database/container paths when prerequisites
are available. A Bun scaffold's initial failing test placeholder must be replaced by meaningful tests,
not an unconditional success. Report commands, actual outcomes, skipped suites, and missing services.
Keep failure artifacts redacted. Distinguish tests written from tests run and passing unit tests from
production startup, driver, or container evidence.
