# Workers API Protection

Apply the [shared security policy](../../../references/security.md). Keep secrets in Wrangler/platform
secret storage and validate the actual Hono/Workers serving boundary. Binding types do not establish
secret validity or permission enforcement; follow the shared validation and authorization criteria.

## Rate limiting

Apply the [shared rate-limiting policy](../../../references/rate-limiting.md) for endpoint selection,
thresholds, trusted identity keys, enforcement order, responses, failure behavior, and pending work.
Use this adapter for a selected or established Cloudflare Workers deployment; preserve an explicitly
chosen compatible limiter. Other deployments use their selected services rather than acquiring a
Cloudflare dependency from this guide.

For the native Workers integration, configure the stable `ratelimits` binding in Wrangler and invoke
its `limit({ key })` method from Hono middleware on the protected routes. Generate binding types and
verify the installed Wrangler schema and supported windows. Check the returned `success` before
continuing route execution and map rejection through the application's contract/error handling.
Keep shared policy enforcement in middleware rather than counters in isolate memory.

Native counters are per Cloudflare location, permissive, and eventually consistent. Bindings sharing
the same account-level `namespace_id` share counters for a given key, including across Workers;
choose namespace ownership deliberately. The binding does not provide an exact reset timestamp,
so any retry guidance must come from the documented policy. Exact global quotas require a separate
design, potentially using Durable Objects, rather than a guarantee from this binding.

## Public forms and service boundaries

For a selected or established Cloudflare deployment, use [Turnstile](turnstile.md) for public forms,
using its local integration guide and the [shared form policy](../../../references/public-forms.md).
Respect an explicitly selected alternative service. If Cloudflare is not the deployment target and
Turnstile was not chosen, follow the [generic recommendation](../../../references/public-forms.md)
for the project's cloud/services rather than adding a Cloudflare dependency.

Apply [service-boundary security](../../../references/security.md#service-boundaries) to private
Service Binding entrypoints. Cloudflare Access/session context is not automatically transferred;
verify route exposure and binding permissions with the selected account/environment configuration.

Follow [shared rate-limit verification](../../../references/rate-limiting.md#verification) through
the actual Hono middleware and binding boundary. Verify private binding permissions and delegated
failures where changed; distinguish local tests and mocks from global/distributed behavior.

Sources to verify when implementing:
[Rate Limiting](https://developers.cloudflare.com/workers/runtime-apis/bindings/rate-limit/),
[Secrets](https://developers.cloudflare.com/workers/configuration/secrets/),
[Service Bindings](https://developers.cloudflare.com/workers/runtime-apis/bindings/service-bindings/).
