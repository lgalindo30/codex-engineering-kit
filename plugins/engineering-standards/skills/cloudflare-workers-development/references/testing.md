# Workers Verification

Choose the smallest meaningful test boundary for the changed behavior. Preserve the project's runner
and compatible integration; for new Workers tests use Vitest with Cloudflare's official Workers
integration, running in workerd through local Miniflare. Confirm installed versions and the current
plugin/config API from official docs. Node/Bun-only passing tests do not establish platform compatibility.

- Test pure business rules with explicit fake dependencies when no platform behavior is involved.
  Keep fakes narrow and avoid mocking the whole Hono context or retesting library internals.
- Exercise Hono requests through the real Worker/application boundary with configured local bindings:
  input limits, malformed JSON, wrong/missing content types, safe errors, authorization if present,
  exact serialized output schemas, and OpenAPI inclusion for all mounted features.
- Verify actual Drizzle queries and reviewed migrations against disposable local D1. Use the installed
  test integration's storage isolation and supported migration helpers; do not copy assumptions from
  an older integration. Include conflicts, coupled-write failure, and deduplication where relevant.
- For Service Bindings, run disposable local Workers together to verify HTTP/RPC serialization,
  expected failures, authorization context, and handler dispatch. A mock of a binding cannot establish
  real RPC or inter-Worker compatibility. Keep remote bindings and production resources out of tests.
- Apply [shared rate-limit verification](../../../references/rate-limiting.md#verification) through
  Hono and configured local rate-limit bindings. Distinguish simulated rejection from exercised
  binding behavior; local tests do not establish global quotas or distributed accuracy.
- Use Turnstile test keys and controlled Siteverify responses for accepted/rejected/provider-failure
  cases when Turnstile is the selected integration. Browser/component checks follow
  [Turnstile verification](turnstile.md#verification) and the
  [shared form criteria](../../../references/public-forms.md#verification).
  Never send production secrets or tokens to fixtures. Verify no side effects after rejection.
- Check warning/error levels, safe request correlation and redaction through actual failed requests.
  Successful requests should emit no routine production application/access logs. Static Wrangler
  configuration checks alone do not prove remotely stored log behavior.
- Exercise changed `scheduled`/`queue` handlers with the integration's supported event helpers,
  including retry/idempotency behavior when applicable. Do not add background handlers for a test rubric.

For a bug fix, demonstrate the original trigger fails before and passes after the correction when
practical; reuse an existing regression test. Apply [quality handoff](../../../references/quality.md)
with affected Workers tests and the real Vite/Wrangler production build. Report mocks versus exercised
bindings and local versus live behavior. Do not use no-test success flags, coverage quotas, or prompt
wording snapshots as evidence. Frontend rendering/tests remain owned by the frontend's actual framework.

Sources to verify when implementing:
[Workers Vitest integration](https://developers.cloudflare.com/workers/testing/vitest-integration/),
[Configuration](https://developers.cloudflare.com/workers/testing/vitest-integration/configuration/),
[Test APIs](https://developers.cloudflare.com/workers/testing/vitest-integration/test-apis/).
