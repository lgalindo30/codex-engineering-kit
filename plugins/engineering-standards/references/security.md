# Security at Application Boundaries

Apply these controls to the requested functionality; do not install authentication, roles, or security
infrastructure for features that do not require them. Preserve [engineering defaults](engineering.md).
Consult the relevant current OWASP cheat sheet when implementing a sensitive boundary, rather than
claiming general OWASP compliance from a checklist.

- Validate untrusted data with bounded schemas; parameterize database queries and safely invoke tools
  without interpolating input into shell commands. Validation does not replace contextual output encoding.
- Perform permission and ownership checks in the backend before returning or modifying protected data.
  Absence of a role system does not mean all authenticated users may access each other's records.
- Treat URLs, redirects, file paths, and third-party data as independent trust boundaries. For URL-fetching
  features constrain destinations and redirects against SSRF; do not invent URL-fetching features.
- Keep secrets out of source, templates, browser bundles, error bodies, and logs. Document environment
  variable names with non-secret placeholders. Limit access granted to the runtime and CI.
- Configure precise CORS and proxy trust; CORS alone is not authentication or CSRF prevention. Set headers
  and content policies appropriate to the app without breaking required functionality silently.
- Bound expensive requests, uploads, pagination, network operations, and security-sensitive retries.
  Introduce rate limits for requested authentication/public abuse-sensitive endpoints with documented scope.
- Use [authentication](authentication.md) and [file handling](files.md) guidance when applicable.
  Do not implement custom cryptographic primitives or rely on TypeScript types to sanitize runtime input.
- Review newly added dependencies for maintenance, provenance, compatibility, and known vulnerabilities.
  Preserve release-age controls; report advisory lookup failures instead of declaring a clean audit.

Test realistic denial cases and failure paths: missing permission, boundary violations, malicious paths,
sensitive-data leakage, and unsafe cross-origin state changes when relevant. Report a vulnerability
only when supported by a plausible execution path; delegate a requested exhaustive audit to an available
specialized security workflow rather than expanding every routine implementation into an audit.

## Primary references by boundary

- [OWASP Input Validation](https://cheatsheetseries.owasp.org/cheatsheets/Input_Validation_Cheat_Sheet.html)
- [OWASP REST Security](https://cheatsheetseries.owasp.org/cheatsheets/REST_Security_Cheat_Sheet.html)
- [OWASP Authorization](https://cheatsheetseries.owasp.org/cheatsheets/Authorization_Cheat_Sheet.html)
- [OWASP SQL Injection Prevention](https://cheatsheetseries.owasp.org/cheatsheets/SQL_Injection_Prevention_Cheat_Sheet.html)
- [OWASP SSRF Prevention](https://cheatsheetseries.owasp.org/cheatsheets/Server_Side_Request_Forgery_Prevention_Cheat_Sheet.html)
- [OWASP XSS Prevention](https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html)
- [OWASP Secrets Management](https://cheatsheetseries.owasp.org/cheatsheets/Secrets_Management_Cheat_Sheet.html)
