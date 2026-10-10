# Authentication When Requested

Do not add login, identity providers, roles, or multitenancy until requested. Follow the task's explicit
authentication requirements; otherwise preserve the project's established supported provider and
session design. Change that design only within a requested migration or feature that requires it.
For a new login with no selected design, recommend a compatible option and record selection/setup as
pending rather than treating email/password or JWT as mandatory.

An email/password request specifies a sign-in method, not necessarily a JWT architecture or provider
migration. Use the selected provider's supported password flow when applicable. Apply the token rules
below only to a selected application-managed browser/API token flow; managed identity and integrated
framework sessions follow their actual contracts. Use maintained compatible libraries and established
password hashing when the application owns passwords; do not implement cryptography.

## Browser/API token flow

For a selected application-managed token flow, use short-lived access tokens and bounded rotating
refresh sessions. JWT-specific controls apply when the chosen access token is a JWT.

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
  guidance and runtime performance. Use generic login errors and [rate limiting](rate-limiting.md);
  never truncate passwords.

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

## Integrated sessions

Use a maintained session integration compatible with the server framework. Enforce expiry, revocation,
secure cookie attributes, authorization, and CSRF defenses at server mutation boundaries. Do not expose
session secrets or private user data in rendered props, static output, browser logs, or client storage.

## Managed identity

Use the chosen provider's maintained integration and server-side verification. Enforce the feature's
authorization and session lifecycle at the actual trust boundary. Do not duplicate provider-owned
password storage, token issuance, or refresh flows. Record missing application registration, callback
origins, and credentials as pending setup; never invent production values or claim inactive protection.

## Tests and source guidance

Cover missing/invalid/expired sessions, authorization denial, logout/revocation, and credential leakage
for the selected design. Add signature/claims, cookie/CSRF, rotation, concurrent refresh, replay, and
bounded retry checks where those mechanisms exist. Test actual browser origin/cookie behavior when
applicable; do not add a token or password flow solely to satisfy a test checklist.

- [OWASP Session Management](https://cheatsheetseries.owasp.org/cheatsheets/Session_Management_Cheat_Sheet.html)
- [OWASP Password Storage](https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html)
- [OWASP CSRF Prevention](https://cheatsheetseries.owasp.org/cheatsheets/Cross-Site_Request_Forgery_Prevention_Cheat_Sheet.html)
- [OWASP HTML5 Security](https://cheatsheetseries.owasp.org/cheatsheets/HTML5_Security_Cheat_Sheet.html)
- [RFC 8725 JWT Best Practices](https://www.rfc-editor.org/rfc/rfc8725.html)
- [RFC 9700 refresh token protection](https://www.rfc-editor.org/rfc/rfc9700.html#section-4.14)

RFC 9700 addresses OAuth; its refresh-token replay defenses are useful design guidance here without
turning an email/password login into an OAuth authorization server.
