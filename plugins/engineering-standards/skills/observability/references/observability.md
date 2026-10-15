# Diagnostics and telemetry

For application logging, apply [logging policy](../../../references/logging.md) and the selected runtime's
integration/production levels. Routine logging setup does not require this project-level workflow.

## Investigation

Record the trigger, expected/actual result, versions, and safe reproducible conditions. Collect relevant
logs, request IDs, traces, or database evidence and narrow the failure boundary. State a hypothesis and
what observation would support/disprove it; run a minimal experiment before changing unrelated variables.
Correct the cause, verify the original trigger using [testing policy](../../../references/testing.md),
and remove temporary diagnostics. Escalate cross-ownership findings with evidence when needed.

## Requested telemetry

Consult current official SDK/runtime docs. Verify exact instrumentation versions on the actual runtime;
another runtime's support is insufficient. Use supported manual instrumentation when patching is
unreliable rather than silently changing runtimes.

Define signals, topology, destination, retention, sampling, privacy, and cost. Exporting data, choosing
a paid backend, collectors, analytics, or session recording needs that task's authorization. Keep exporter
configuration/credentials in runtime configuration.

Initialize instrumentation before instrumented libraries where required, propagate context through
actual async/network boundaries, correlate logs, and flush with bounded shutdown. Use low-cardinality
labels, bounded queues/retries, and non-fatal exporter failures. Verify one meaningful end-to-end
trace/metric path and outage behavior. Report tested runtime/integration versions; an unused exporter
is not configured monitoring.

Source: [OpenTelemetry](https://opentelemetry.io/docs/).
