# Authentication When Requested

Do not add login, Google sign-in, roles, or multitenancy until requested. Preserve an established supported session design. For a new separate browser/API login, prefer
email/password with short-lived JWT access tokens and rotating refresh sessions. Apply token-specific
rules only to that flow; integrated framework sessions need not adopt a separate token API. Use
maintained compatible libraries and established password hashing; do not implement cryptography.

## Browser/API token flow

- Keep the access token in browser memory and send it as `Authorization: Bearer ...` to the intended API
  origin only. Do not place access or refresh tokens in localStorage, sessionStorage, URLs, or logs.
- Send the refresh token only through a host-only `HttpOnly`, `Secure` cookie with a deliberate Path and
  SameSite setting. Prefer `Lax` or `Strict` when the actual topology permits; cross-site cookie needs
  require `SameSite=None; Secure` and explicit CSRF protection. Document development HTTPS behavior.
- The refresh token may be a high-entropy opaque token; it does not have to be a JWT. Store its digest,
  session/family identity, expiry, rotation state, and revocation metadata in the database.
- Validate JWT signature using an explicit algorithm allowlist and keys, plus issuer, audience, expiry,
  and applicable claims. Document short access lifetime, bounded refresh lifetime, key rotation, and
  clock skew. Decoding a token is not validation; JWT payloads are not encrypted secret storage.
- Hash passwords with a maintained Argon2id implementation and parameters checked against current OWASP
  guidance and runtime performance. Use generic login errors and bounded rate limits; never truncate passwords.

## CSRF, rotation, and logout

Protect cookie-authenticated refresh/logout and relevant login flows from CSRF. Prefer a maintained
synchronizer-token or session-bound signed double-submit solution. Validate allowed origins and content
types as additional defenses. SameSite alone is insufficient as a universal policy; protect refresh
before issuing a new token. Do not treat framework middleware presence as proof it covers JSON endpoints.

Consume and replace each refresh token atomically. Detect reuse of a consumed token and revoke the
associated family rather than silently issuing another valid session. Define concurrent refresh behavior:
coordinate a single refresh per browser session (including tabs where practical), bound client retries,
and document that an uncoordinated replay can require reauthentication. If a narrowly bounded idempotent
retry design is used instead, review its replay implications and never permit unbounded old-token reuse.

On refresh failure clear client authentication state and stop retry loops. Logout revokes the server
session and clears the cookie with matching attributes. Document that an already-issued access token
normally remains valid until expiry unless explicit server-side access revocation is implemented.
Password resets/security events must revoke the relevant sessions when those features are requested.
Keep third-party login as a later explicit task, not speculative scaffolding.

## Integrated sessions

Use a maintained session integration compatible with the server framework. Enforce expiry, revocation,
secure cookie attributes, authorization, and CSRF defenses at server mutation boundaries. Do not expose
session secrets or private user data in rendered props, static output, browser logs, or client storage.

## Tests and source guidance

Cover invalid signature/claims, expired tokens, cookie flags, CSRF rejection and valid flow, missing
session, rotation, concurrent refresh, replay detection, logout, bounded retry behavior, and accidental
credential leakage. Test with actual browser origin/cookie behavior as well as backend unit tests.

- [OWASP Session Management](https://cheatsheetseries.owasp.org/cheatsheets/Session_Management_Cheat_Sheet.html)
- [OWASP Password Storage](https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html)
- [OWASP CSRF Prevention](https://cheatsheetseries.owasp.org/cheatsheets/Cross-Site_Request_Forgery_Prevention_Cheat_Sheet.html)
- [OWASP HTML5 Security](https://cheatsheetseries.owasp.org/cheatsheets/HTML5_Security_Cheat_Sheet.html)
- [RFC 8725 JWT Best Practices](https://www.rfc-editor.org/rfc/rfc8725.html)
- [RFC 9700 refresh token protection](https://www.rfc-editor.org/rfc/rfc9700.html#section-4.14)

RFC 9700 addresses OAuth; its refresh-token replay defenses are useful design guidance here without
turning an email/password login into an OAuth authorization server.
