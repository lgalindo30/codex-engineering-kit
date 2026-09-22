# Node.js testing strategy

## Select the test boundary

Preserve a suitable existing runner. For new code choose Node's test runner or Vitest according to the
module/build setup; configure TypeScript execution deliberately and keep type checking separate.
Execute runtime-sensitive tests on Node, including native drivers and production startup.

- Test business rules as isolated functions with explicit clocks and external dependencies.
- Exercise handlers with valid input, malformed JSON, missing fields, unsupported content types,
  authorization failures, and safe error responses. Add real listener/adapter tests for transport,
  streaming limits, shutdown, or connection behavior; an in-process request helper cannot prove these.
- Test persistence with the actual database engine when constraints, transactions, query semantics,
  concurrency, or migrations matter. Test migrations from representative existing data.
- Verify serialized public responses and changed consumers. Generated client compilation alone does
  not demonstrate runtime compatibility. Mock external services at their boundary, not internal logic.

## Isolation and regression evidence

Use disposable databases, schemas, files, ports, and sandbox integrations. Confirm their ownership
before destructive setup or cleanup; never fall back to production configuration. Make fixtures
minimal and deterministic, with independent resources for concurrent tests.

For a bug, reproduce its expected failure before the correction when practical, then run the same
case after the fix. Reuse an existing protective test. Inject clocks and randomness where needed;
avoid sleeps and assertion removal or retries that conceal failures. Test observable behavior rather
than private function structure, incidental wording, or arbitrary coverage percentages.

## Execution and reporting

Run focused cases first, then the project's quality command and relevant integration checks. Verify
production compilation/startup separately when changed. Record commands and outcomes, distinguishing
mocked boundaries from real services, and implemented tests from executed tests. Report missing
services or prerequisites explicitly. Keep useful failure logs redacted; do not treat skipped checks
as passing or a green unit suite as proof of deployment correctness.
