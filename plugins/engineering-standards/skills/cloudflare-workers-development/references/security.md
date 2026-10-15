# Workers protection

Apply [security policy](../../../references/security.md). Store secrets in Wrangler/platform secret
storage; generated binding types do not validate values or prove authorization.

## Rate limiting

Apply [rate-limit policy](../../../references/rate-limiting.md). For the native integration, configure
the stable `ratelimits` binding, regenerate types, and verify installed Wrangler options/windows.
Invoke `limit({ key })` in Hono middleware, check `success` before continuing, and map rejection through
the application's error contract. Keep counters out of isolate memory. Preserve an explicitly selected
compatible limiter; do not introduce Cloudflare infrastructure for another deployment.

Counters are per Cloudflare location, permissive, and eventually consistent. Bindings sharing the same
account-level `namespace_id` share counters for a key across Workers; choose ownership deliberately.
The binding gives no exact reset timestamp. Exact global quotas require a separate design, potentially
Durable Objects, rather than a guarantee from this binding.

## Forms and private services

For selected Cloudflare forms, follow [Turnstile](turnstile.md) and
[public-form policy](../../../references/public-forms.md). Apply
[service-boundary security](../../../references/security.md#service-boundaries) to private bindings:
verify route exposure, account/environment permissions, and explicit authorization context.

Exercise [rate-limit verification](../../../references/rate-limiting.md#verification) through actual
Hono middleware/bindings and changed private-service failures. Distinguish simulated rejection from
binding execution, and local results from distributed guarantees.

Sources: [Rate limits](https://developers.cloudflare.com/workers/runtime-apis/bindings/rate-limit/),
[secrets](https://developers.cloudflare.com/workers/configuration/secrets/),
[Service Bindings](https://developers.cloudflare.com/workers/runtime-apis/bindings/service-bindings/).
