# Observability by design

Apply when creating a backend operation/background job, changing a costly dependency or resource limit,
or implementing requested telemetry. Define the evidence before implementation, rather than waiting
for an incident. Small local edits reuse the established baseline; static pages do not need database
instrumentation. Use the existing logger/runtime and explicit dependencies; do not install a collector,
paid service, analytics or a custom telemetry framework by default.

## Operation contract

Identify the entrypoint, important outcomes, resource budgets and likely failure boundaries. Record
which bounded signals will distinguish validation/authentication, business work, serialization and
external calls when those phases are meaningful. Prefer one integration at the actual adapter boundary
over manually added timers at every caller. Cover alternative transports and background entrypoints.

Apply [request correlation](logging.md#request-correlation). Keep request, logical operation, execution,
trace/span and retry-attempt identities distinct, linked only through explicit validated context.
Propagate across real async/RPC/job boundaries without mutable global state. Correlation is not proof
of identity, authorization, idempotency or causation. Include service, environment and release when
available so measurements remain attributable across code changes.

Define outcomes such as success, rejection, failure and incomplete observation. Observe actual database
execution, not statement preparation; distinguish binding calls, submitted statements, retries and
batch entries. Preserve adapter semantics, errors, results and transaction/consistency behavior. Never
change a query method or add provider calls solely to obtain metadata without assessing that change.

## Measurement meaning and coverage

Name units, scope, clock and availability for every measure. Distinguish client elapsed time, request
wall time, phase time, adapter await time, provider SQL time and CPU. Use a monotonic duration clock
where supported. An adapter await includes more than SQL; its residual is not proof of network latency.
CPU is not elapsed time. Do not sum nested or concurrent intervals as exclusive end-to-end latency.

Count started, completed, failed and in-flight work, metadata samples, dropped entries and saturation.
Retain invocation order separately from completion order. Report absent/unsupported measurements as
unknown, never zero, including APIs that return no SQL metadata. A sample of three of four statements
does not describe all four; record both the denominator and the observed subset.

Test early rejection, thrown/synchronous failures, rejected awaits, timeout, cancellation and overlapping
work. Snapshot bounded active phases when the application can observe closure without awaiting them.
An unfinished await is not a completed failure. A hard process/isolate termination may bypass catch,
finally and final export: choose and verify a provider outcome source or bounded progress checkpoints
when required by the operation's risk. State the remaining blind spot; do not promise a final event.

## Privacy, volume and delivery

Use an allowlist of event fields and stable operation/phase names. Exclude raw SQL, parameters, request
and response bodies, user code, document text, credentials, arbitrary errors and sensitive identifiers.
Derive safe errors through [the public error contract](api-contracts.md#errors). Hashing private content
does not automatically make it safe to export. Test nested/unknown fields and malicious inputs.

Keep dimensions bounded. Request/execution IDs may be diagnostic fields, not metric label dimensions;
avoid dynamic URLs, record IDs, query text and user-provided operation names as labels. Record the
cardinality rationale for additional dimensions, plus destination, retention, access and cost ownership.

Set concrete per-operation limits for event bytes/count, retained entries, active observations,
queues and retries. Count omissions and preserve useful slow/failed entries rather than only the first
entries. Check actual serialized UTF-8 size with headroom for the destination's envelope; an array cap
alone is insufficient. A truncated summary must not claim complete coverage. Sampling and provider
truncation can lose errors; document which populations the retained data represents.

Observers must not change business results, errors or effects. Keep sink failures non-fatal and bounded;
measure CPU/latency/memory and log-volume overhead on representative work with observation on/off.
Use runtime-supported flush/lifecycle handling; diagnostics are not an audit ledger or durable receipt.
Keep required business audit/receipts transactional through [persistence controls](persistence.md).

## Acceptance and adoption evidence

Exercise a successful operation through its real entrypoint and correlate its meaningful phases and
dependencies. Also exercise a failure/early closure, overlapping requests, incomplete metadata, volume
overflow, redaction and a broken observer/sink. Verify unchanged results/effects under observation
failure. Use [the shared testing policy](testing.md); disclose mocked providers and unavailable runtime
failure injection. Verify a provider-only outcome separately from an application exception.

For requested telemetry or a new operational baseline, provide a compact mapping from requirement to
implementation location, exercised check and observed signal/coverage. Record the adopted standard
revision/source, runtime/configuration and applicable exceptions. Declaring a skill was used, loading
its instructions, or passing a build does not prove adoption. Missing production/exporter evidence
stays unverified; do not claim stages or queries are covered without inspecting the emitted evidence.
Use the optional [acceptance record](../templates/operational-acceptance.md) for substantive work;
an existing project evidence format can carry the same information without another document.

Source: [OpenTelemetry signals](https://opentelemetry.io/docs/concepts/signals/).
