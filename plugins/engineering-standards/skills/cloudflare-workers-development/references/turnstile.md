# Turnstile integration

Apply [public-form policy](../../../references/public-forms.md). Use Turnstile for public submissions
on selected Cloudflare deployments, respecting an explicit alternative, or when explicitly chosen for
another host. Missing keys/account setup are pending configuration. Protect the existing endpoint
without automatically creating Workers, databases, or sessions.

## Browser lifecycle

Use a Managed widget with `appearance: 'interaction-only'` and `execution: 'execute'`. Render explicitly
and execute a fresh challenge for a valid submission. Let Turnstile hide automatic/success states and
reveal required interaction; do not CSS-hide/remove its container or block focus. Invisible widgets
cannot provide that fallback, and network/configuration failures need not produce manual challenges.
Set a form-specific action for server verification.

Apply [pending/recovery behavior](../../../references/public-forms.md#interaction-and-enforcement-when-implemented)
through execution, token submission, Siteverify, and mutation. Keep controls pending until the server
finishes. Clear tokens after expiration, failure, reset, and use. Handle error/expired/timeout/unsupported
callbacks with bounded recovery and fresh challenges on deliberate retries. Clean up on unmount and
ignore stale callbacks. Follow current script/CSP rules; mount only after browser APIs exist in SSR/islands,
avoiding duplicate instances. Static sites need a real protected endpoint.

## Server enforcement

Validate form/bounded token, then call Siteverify with the server-only secret. Require success plus
expected hostname/action before side effects. Tokens expire after five minutes and are single-use.
Bound Siteverify calls and reject network/malformed/verification failures with safe recovery. Client
callbacks are insufficient. Apply shared rate-limit, safe-error, and redaction controls to tokens/secrets.

## Verification

Use test keys in disposable environments; use the forced-interaction key for fallback. Follow
[form verification](../../../references/public-forms.md#verification). Simulate callbacks for states
keys cannot reproduce and label simulations separately from observed challenges. Verify server rejection
of missing/invalid/reused/expired/wrong-host/wrong-action tokens before effects, duplicate attempts,
and provider-outage recovery.

Sources: [Appearance/execution](https://developers.cloudflare.com/turnstile/concepts/appearance-modes/),
[Siteverify](https://developers.cloudflare.com/turnstile/get-started/server-side-validation/),
[test keys](https://developers.cloudflare.com/turnstile/troubleshooting/testing/).
