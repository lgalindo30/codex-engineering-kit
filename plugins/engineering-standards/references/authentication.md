# Authentication When Requested

Preserve the selected provider/session design. For a new login without a selection, recommend a
compatible option and record pending selection/setup. Email/password specifies a sign-in method, not a
JWT architecture or provider migration. Use maintained integrations and cryptography.

## Browser/API token flow

Apply these controls only to selected application-managed browser/API tokens; JWT rules apply when JWT
is selected. Use bounded rotating refresh sessions.

- Keep short-lived access tokens in browser memory and send Bearer credentials only to the intended
  API origin. Never put access/refresh tokens in browser storage, URLs or logs.
- Send refresh tokens through host-only `HttpOnly`, `Secure` cookies with deliberate Path/SameSite.
  Prefer Lax/Strict when topology permits; cross-site cookies require `SameSite=None; Secure` and CSRF
  protection. Document development HTTPS behavior.
- Store a high-entropy refresh token's digest, session/family identity, expiry, rotation and revocation
  state. Refresh tokens need not be JWTs.
- Validate JWT signature with an explicit algorithm allowlist and keys, issuer, audience, expiry and
  applicable claims. Define access/refresh lifetimes, key rotation and clock skew; payloads are not secret storage.
- For application-owned passwords, use maintained Argon2id with current OWASP parameters checked against
  runtime performance. Use generic login errors and [rate limiting](rate-limiting.md); never truncate.

## CSRF, rotation, and logout

Protect cookie-authenticated refresh/logout and applicable login flows before effects. Prefer maintained
synchronizer tokens or session-bound signed double-submit protection, with origin/content-type checks
as additional defenses. Verify actual JSON endpoints; SameSite or middleware presence alone is insufficient.

Atomically consume/replace refresh tokens. Detect consumed-token reuse and revoke the family. Define
concurrent refresh behavior, coordinate one client refresh across tabs where practical, and bound retries.
Uncoordinated replay may require reauthentication; any idempotent retry exception needs narrowly bounded
reuse and a reviewed replay design.

On refresh failure, clear client auth state and stop retries. Logout revokes the server session and
clears matching cookie attributes. Issued access tokens remain valid until expiry unless server-side
revocation exists. Password resets/security events revoke relevant sessions when implemented.

## Integrated sessions

Use the framework's maintained session integration with expiry, revocation, secure cookies,
authorization and mutation CSRF defenses. Keep session secrets/private user data out of rendered props,
static output, browser logs and client storage.

## Managed identity

Use the provider's maintained integration and server verification. Enforce application authorization and
session lifecycle without duplicating provider-owned passwords, token issuance or refresh. Record missing
registration, callbacks and credentials as pending setup.

## Tests and source guidance

Test invalid/expired sessions, denied ownership, logout/revocation and leakage. For the selected design,
cover claims/signatures, real cookie/origin behavior, CSRF, rotation, concurrency, replay and bounded
retries. Apply [shared testing criteria](testing.md).

- [Session management](https://cheatsheetseries.owasp.org/cheatsheets/Session_Management_Cheat_Sheet.html)
- [Password storage](https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html)
- [CSRF](https://cheatsheetseries.owasp.org/cheatsheets/Cross-Site_Request_Forgery_Prevention_Cheat_Sheet.html)
- [HTML5 security](https://cheatsheetseries.owasp.org/cheatsheets/HTML5_Security_Cheat_Sheet.html)
- [RFC 8725 JWT](https://www.rfc-editor.org/rfc/rfc8725.html)
- [RFC 9700 refresh protection](https://www.rfc-editor.org/rfc/rfc9700.html#section-4.14): OAuth guidance
  informing replay defenses, not a requirement to build an OAuth server.
