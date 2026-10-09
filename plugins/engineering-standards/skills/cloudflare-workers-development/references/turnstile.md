# Turnstile on Cloudflare Deployments

Apply the [shared public-form policy](../../../references/public-forms.md). When the project's selected
or established deployment target is Cloudflare, use Turnstile for public unauthenticated contact, lead,
newsletter, and similar submission forms. Respect an explicitly selected alternative service. A mention
of Cloudflare tooling alone does not establish its deployment scope. Turnstile may also be used on
another host when explicitly chosen; do not introduce it as a default for other clouds.

For an authorized form implementation on Cloudflare, integrate Turnstile directly instead of leaving
the provider choice open. If site/secret keys or account configuration are unavailable, record the
specific pending setup and distinguish prepared integration from active protection. Deployment choice
does not authorize live provisioning or secret writes. Do not create a Worker, database, authentication
flow, or unrelated infrastructure merely to protect an existing form endpoint.

## Browser interaction

Use a **Managed** widget with `appearance: 'interaction-only'` and `execution: 'execute'`. Render it
explicitly and execute a fresh challenge on a valid submission attempt. Keep the widget visually
hidden during automatic verification and after success; let Turnstile reveal it only when visitor
interaction is required. An Invisible widget cannot provide this interactive fallback. Do not hide
the challenge container with CSS, remove it during verification, or block its focus when interaction
is needed. A network or configuration error does not necessarily create a manual challenge.
Set a stable form-specific action and verify it against the server's expected hostname/action.

Apply [shared pending/recovery behavior](../../../references/public-forms.md#interaction-and-enforcement-when-implemented)
across Turnstile execution, token submission, Siteverify, and the server mutation. On token success,
include the token with the form and keep controls pending until the server completes that flow.
Clear tokens after expiration, failure, reset, and successful use. Wire Turnstile's error, expired,
timeout, and unsupported-browser callbacks into bounded recovery; a deliberate retry must execute
a fresh challenge. Clean up the widget and ignore stale callbacks after unmount.

Follow current Turnstile script/CSP requirements. The site key is public; the secret key belongs only
to the server. In SSR or hydrated islands, render the widget only after the browser API is available
and avoid duplicate instances. Static sites require a real protected submission endpoint.

## Server enforcement

Validate the form and bound the token before calling Siteverify with the server secret. Require a
successful result and the expected hostname and action for that form before sending mail, persisting
data, or producing another side effect. Tokens expire after five minutes and are single-use. Keep
Siteverify requests bounded and treat network, malformed-response, and verification failures as
rejections with safe retry behavior. Never trust a client success callback as authorization.

Apply the shared form policy's complementary security, rate-limiting, redaction, and safe-error
criteria to this integration; keep Siteverify credentials and tokens out of diagnostics.

## Verification

Use Cloudflare's test keys in disposable local/test environments, never production credentials. Use
the forced-interaction test key for interactive fallback and follow
[shared form verification](../../../references/public-forms.md#verification). Simulate provider
callbacks for UI states that test keys do not reproduce; distinguish those simulations from an
observed interactive challenge.
Verify direct server rejection of missing, invalid, reused, expired, wrong-hostname, and wrong-action
tokens without producing side effects. Test duplicate attempts and recovery after a provider outage.

Sources to verify when implementing:
[Appearance and execution](https://developers.cloudflare.com/turnstile/concepts/appearance-modes/),
[Siteverify](https://developers.cloudflare.com/turnstile/get-started/server-side-validation/),
[Testing keys](https://developers.cloudflare.com/turnstile/troubleshooting/testing/).
