# Security at Application Boundaries

Use the relevant current OWASP guidance for sensitive boundaries; a checklist does not establish general
OWASP compliance.

- Validate untrusted data with bounded schemas, parameterize queries and avoid shell interpolation.
  Encode output for its context; TypeScript types do not sanitize runtime values.
- Render untrusted text safely; sanitize product-required rich HTML with a maintained solution.
- Enforce backend permissions and record ownership before returning/modifying protected data.
- Constrain URL fetches and redirects against SSRF. Treat redirects, paths and provider data as their own
  trust boundaries.
- Keep secrets out of source, templates, browser bundles, public errors and logs. Use non-secret
  environment placeholders and minimum runtime/CI permissions.
- Configure precise CORS, proxy trust and content/security headers. CORS does not replace authentication
  or CSRF defenses.
- Bound costly requests, pagination, uploads, network operations and retries. Follow [rate-limit guidance](rate-limiting.md)
  for abuse-sensitive endpoints and [anti-bot guidance](public-forms.md) for public submissions.
- Use [authentication](authentication.md) and [file handling](files.md) controls when applicable.
  Use maintained cryptographic implementations.
- Review new dependencies for maintenance, provenance, compatibility and known vulnerabilities.
  Preserve release-age protections.

Exercise relevant denial paths: missing permission, boundary violations, malicious paths, leakage and
unsafe cross-origin mutations. A vulnerability report needs a plausible execution path; routine
implementation does not require a full security audit. Apply [shared testing criteria](testing.md).

## Service boundaries

Restrict private entrypoints/permissions, validate delegated input/output, and propagate only trusted,
bounded authorization context. A service transport does not transfer caller identity or grant resource
access. Align exposure with [service ownership](architecture.md#separate-services) and apply
[reliability](reliability.md) to upstream work.

## Primary references by boundary

- [Input validation](https://cheatsheetseries.owasp.org/cheatsheets/Input_Validation_Cheat_Sheet.html)
- [REST security](https://cheatsheetseries.owasp.org/cheatsheets/REST_Security_Cheat_Sheet.html)
- [Authorization](https://cheatsheetseries.owasp.org/cheatsheets/Authorization_Cheat_Sheet.html)
- [SQL injection](https://cheatsheetseries.owasp.org/cheatsheets/SQL_Injection_Prevention_Cheat_Sheet.html)
- [SSRF](https://cheatsheetseries.owasp.org/cheatsheets/Server_Side_Request_Forgery_Prevention_Cheat_Sheet.html)
- [XSS](https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html)
- [Secrets](https://cheatsheetseries.owasp.org/cheatsheets/Secrets_Management_Cheat_Sheet.html)
