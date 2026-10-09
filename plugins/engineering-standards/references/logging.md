# Structured Application Logging

Use the project's structured logger with machine-readable console output in production and readable
console output in development. Keep level configuration at the application boundary; inject a small
logger dependency or use request-scoped child loggers. Verify runtime support for the chosen library
and transport rather than building a logging framework. Each runtime guide defines its default level.

Include UTC time, service/environment, level, bounded request ID, method, normalized route, status,
and duration where useful. Validate accepted upstream identifiers or generate a new one. Return safe
correlation identifiers in errors or response headers. Prefer route templates over raw URLs containing
identifiers or query strings.

Redact authorization, cookies, passwords, secrets, token material, and sensitive nested fields,
including error objects. Do not log full payloads by default. Log unexpected failures once at the
handling boundary; return safe public errors with the real status and no stack traces or internal
details. Use [API contract errors](api-contracts.md#errors) for public APIs. Avoid duplicate access logs
from stacked middleware. Routine client rejections should not produce an unbounded stream of warnings.

Keep console output as the initial destination. Do not install telemetry SDKs, exporters, collectors,
analytics, or centralized services by default. Explicit integrations must define runtime support,
privacy, destination, sampling, retention, and bounded non-fatal behavior when delivery fails.
Choose sampling deliberately; sampled output does not guarantee that every failure is retained.

Verify request correlation through a failed request and ensure credentials and sensitive error data
are absent from output. Report which runtime/integration was actually exercised. Diagnose failures
with redacted evidence, a concrete hypothesis, and verification of the original trigger after a fix.

Primary reference: [OWASP Logging](https://cheatsheetseries.owasp.org/cheatsheets/Logging_Cheat_Sheet.html).
