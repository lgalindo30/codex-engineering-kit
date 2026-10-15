# Structured Application Logging

Use the existing structured logger with machine-readable production and readable development console
output. Configure levels at the application boundary; use explicit logger dependencies or request-scoped
children. Runtime guides define default levels and supported transports.

Include UTC time, service/environment, level, method, normalized route, status and duration when useful.
Prefer route templates to raw URLs containing identifiers/queries.

## Request correlation

- Use `X-Request-ID` and structured `requestId` for application HTTP requests. Shared clients create
  an opaque random ID per request, independent of user/session data. Server-generate IDs for native
  framework requests that cannot set headers.
- At the earliest request boundary, accept one ID in a documented bounded ASCII format, for example
  1–128 letters/digits/dots/underscores/hyphens. Replace absent/invalid IDs without logging rejected raw
  values. IDs are untrusted correlation data, never identity, authorization or idempotency keys.
- Keep IDs request-scoped and attach them automatically to associated logs at every enabled level,
  including debug/info; never store mutable request context globally. Propagate them to controlled HTTP
  services or bounded RPC/background context.
  Keep trace/span context separate; correlation adds neither log levels nor routine access logs.
- Return the accepted ID on success/error response headers and public Problem Details `requestId`.
  Clients retain sent IDs for network failures and use returned IDs for response diagnostics. Cross-origin
  APIs allow/expose the header through the selected CORS policy.
- Attach IDs outside shared cached payloads to avoid cross-request reuse. Verify provider/proxy-generated
  rejections separately.

## Safe output

Redact authorization, cookies, passwords, tokens, secrets and sensitive nested/error fields. Avoid full
payload logging. Log unexpected failures once at the handling boundary and return [safe errors](api-contracts.md#errors).
Avoid duplicate access logs and unbounded warnings for routine client rejection.

Console is the initial destination. Explicit telemetry integrations require runtime support, privacy,
destination, sampling, retention and bounded non-fatal delivery failure. Sampling does not guarantee
retention of every failure.

## Verification

Exercise missing/invalid/accepted IDs, overlapping requests, success/early failure, downstream propagation,
all enabled levels, redaction and browser CORS access. Match client diagnostics to backend IDs and verify
the original trigger after a fix. Apply [shared testing criteria](testing.md).

Primary reference: [OWASP Logging](https://cheatsheetseries.owasp.org/cheatsheets/Logging_Cheat_Sheet.html).
