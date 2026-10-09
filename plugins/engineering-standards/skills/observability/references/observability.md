# Logging, Debugging, and Optional Telemetry

## Initial application baseline

Apply the [shared logging policy](../../../references/logging.md) with the selected runtime's level
and integration settings. Support configurable levels (`debug`, `info`, `warn`, `error`) where the
application needs them; runtime-specific production restrictions take precedence. The investigation
and explicit telemetry workflows below remain separate from routine logging setup.

## Debugging workflow

1. Record the failing input, expected/actual behavior, runtime/tool versions, and reproducible conditions
   without copying secrets. Reproduce safely in a local or explicitly authorized environment.
2. Inspect logs, request IDs, stack traces, database state, or browser traces relevant to the failure.
   Separate observed evidence from hypotheses. Narrow the failing boundary before changing code.
3. State what observation would support or disprove the hypothesis. Record the experiment and its
   outcome briefly, revise the hypothesis when evidence contradicts it, and avoid changing several
   unrelated variables at once. Test the most plausible hypothesis with a minimal experiment and bounded diagnostics. Do not leave
   verbose sensitive logs or disabled checks as the permanent fix.
4. Correct the cause, add or reuse a meaningful regression test, verify it, and remove temporary diagnostics.
   Confirm failure for the expected defect before the correction when practical, and success after it;
   disclose when that comparison could not be performed.
   For browser failures, use existing browser traces/screenshots when useful and redact artifacts.

## OpenTelemetry only when requested

Do not install SDKs, exporters, collectors, dashboards, or analytics in the default application.
When asked to add telemetry, consult current official OpenTelemetry and runtime/framework docs first.
Check the exact SDK/instrumentation versions on the target runtime; support in another runtime
does not prove compatibility. Consult the technology skill's integration guidance where available.
Prefer supported manual instrumentation when automatic patching is unreliable, and test trace context
across actual asynchronous and network boundaries. Do not silently migrate runtimes.

Determine required signals, deployment topology, exporter/backend destination (such as a chosen Grafana
service), retention, sampling, privacy, and operational cost at that time. Keep exporter endpoints and
credentials in runtime configuration; do not pick a paid service or export data without authorization.
Initialize instrumentation before instrumented libraries when required, propagate context through
supported boundaries, correlate logs with trace IDs, and flush with a bounded shutdown deadline.

Use low-cardinality metric labels; avoid user IDs and raw URLs. Bound queues/retries and make exporter
outages non-fatal to ordinary request handling. Verify one meaningful end-to-end trace/metric path and
failure behavior before declaring integration working. Browser analytics and session recording are
separate opt-in requirements, not implied by operational telemetry.

## Verification and primary references

Test correlation through a failed request and ensure secrets are absent from output. Exercise missing
configuration and logging failure behavior proportionately. Report which runtime/integration versions
were actually tested; do not describe an unused exporter as a configured monitoring service.

- [OWASP Logging](https://cheatsheetseries.owasp.org/cheatsheets/Logging_Cheat_Sheet.html)
