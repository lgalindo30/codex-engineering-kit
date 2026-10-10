# Structured Application Logging

Use the project's structured logger with machine-readable console output in production and readable
console output in development. Keep level configuration at the application boundary; inject a small
logger dependency or use request-scoped child loggers. Verify runtime support for the chosen library
and transport rather than building a logging framework. Each runtime guide defines its default level.

Include UTC time, service/environment, level, method, normalized route, status and duration where
useful. Prefer route templates over raw URLs containing identifiers or query strings.

## Request correlation

For application HTTP requests, use `X-Request-ID` as the shared correlation header and `requestId`
as the structured log field. Web, mobile and desktop clients generate an opaque random identifier
(such as a UUID) for each outgoing request in their shared API client. Do not derive it from personal
data or reuse a user/session identifier. Framework-managed requests that cannot set custom headers
still receive server-generated correlation; do not replace native navigation just to inject a header.

At the earliest application request boundary, accept a single identifier only after validating a
documented bounded ASCII format (for example, 1–128 letters, digits, dots, underscores or hyphens).
Generate a new identifier when absent or invalid, without logging the rejected raw value. Treat it as
untrusted correlation data, never as identity, authorization or an idempotency key.

Keep the accepted identifier in request-scoped context and attach it automatically to every associated
application log at every enabled level, including `debug` and `info`. Never store mutable per-request
context in a global logger. Propagate it to controlled downstream HTTP services through `X-Request-ID`,
or explicit bounded context for internal RPC/background work. This does not enable additional log
levels or routine access logs; runtime/project logging choices still apply. Preserve tracing context
separately when tracing exists; a request identifier does not replace trace/span identifiers.

Return the accepted identifier in `X-Request-ID` on successful and failed application responses and
as `requestId` in public Problem Details errors. Clients record the sent identifier and use the
returned value to correlate response diagnostics, including when the server replaced invalid input.
For a network failure with no response, the sent identifier remains available locally. Cross-origin
web APIs must allow the request header and expose the response header through the selected CORS policy.
Attach response identifiers per request, outside shared cached payloads, to avoid replaying another
request's identifier. Verify proxy/provider-generated rejections separately from application responses.

## Safe output

Redact authorization, cookies, passwords, secrets, token material, and sensitive nested fields,
including error objects. Do not log full payloads by default. Log unexpected failures once at the
handling boundary; return safe public errors with the real status and no stack traces or internal
details. Use [API contract errors](api-contracts.md#errors) for public APIs. Avoid duplicate access logs
from stacked middleware. Routine client rejections should not produce an unbounded stream of warnings.

Keep console output as the initial destination. Do not install telemetry SDKs, exporters, collectors,
analytics, or centralized services by default. Explicit integrations must define runtime support,
privacy, destination, sampling, retention, and bounded non-fatal behavior when delivery fails.
Choose sampling deliberately; sampled output does not guarantee that every failure is retained.

## Verification

Exercise accepted, missing and invalid identifiers, success and early failure responses, downstream
propagation and overlapping requests. Check every enabled log level, redaction and browser CORS header
access where applicable. Verify a client-side failure can be matched to the backend by identifier;
report simulations separately from real transport/runtime checks. Report which runtime/integration was
actually exercised. Diagnose failures with redacted evidence and verify the original trigger after a fix.

Primary reference: [OWASP Logging](https://cheatsheetseries.owasp.org/cheatsheets/Logging_Cheat_Sheet.html).
