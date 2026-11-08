# Workers testing

Apply the [shared testing policy](../../../references/testing.md).

Preserve compatible existing integration; new tests use Vitest's official Workers integration in
workerd/local Miniflare. Verify installed versions and current APIs. Node/Bun-only tests cannot prove
platform behavior. Select pure business properties/checks for distinct guarantees; avoid mocking the
entire Hono context. Generated state traces must observe real local bindings for D1/R2 guarantees;
control contested storage calls explicitly and isolate owned state between trials/shrinks under the
shared execution policy. They do not
replace compiled dispatch, socket or binding witnesses. Include migrations and binding configuration
when matching project review recipes.

- Exercise actual Worker/Hono requests with local bindings: parsing/media types, limits, authorization,
  safe serialized schemas/errors, and OpenAPI inclusion for all mounted features.
- Verify real Drizzle queries/migrations on disposable local D1 using the integration's supported storage
  isolation and migration helpers. Include changed conflicts, coupled-write failure, and deduplication.
- Run disposable peer Workers for changed HTTP/RPC serialization, failures, permissions, and dispatch.
  Mocks cannot establish inter-Worker compatibility; exclude production resources and remote bindings.
- Exercise [rate-limit checks](../../../references/rate-limiting.md#verification) through configured local
  bindings, distinguishing simulated rejection and distributed behavior. For chosen Turnstile, use
  [test-key/UI checks](turnstile.md#verification) and verify rejection precedes side effects.
- Exercise [logging checks](../../../references/logging.md#verification) through actual requests/native
  severity; default production success emits no routine logs. Config checks cannot prove remote storage.
- For operational instrumentation or changed capacity, exercise the [Workers evidence profile](observability.md#runtime-verification),
  including incomplete callbacks, missing SQL metadata, overflow and observer failure on the compiled target.
- Test changed scheduled/queue handlers with supported event helpers and relevant retry/idempotency cases.

Run affected runtime tests and the real Vite/Wrangler build. Frontend tests remain owned by their
framework. Report which bindings were exercised, local/live scope, and mocked boundaries.

Sources: [Workers Vitest](https://developers.cloudflare.com/workers/testing/vitest-integration/),
[configuration](https://developers.cloudflare.com/workers/testing/vitest-integration/configuration/),
[test APIs](https://developers.cloudflare.com/workers/testing/vitest-integration/test-apis/).
