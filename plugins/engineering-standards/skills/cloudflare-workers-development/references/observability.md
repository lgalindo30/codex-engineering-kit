# Workers and D1 operational evidence

Apply the shared [operation contract](../../../references/operation-observability.md) and
[resource budgets](../../../references/resource-budgets.md) only to the Workers/bindings in scope.
Preserve the selected console/logger, sampling, privacy and deployment configuration unless the task
requires a change. Do not add a telemetry service or database merely to collect diagnostic events.

## Requests, bindings and database work

Keep collectors request/operation scoped and propagate explicit context through Service Bindings,
queues and any hosted execution callback. Distinguish an outer request/execution from each native
operation; document overlapping scopes rather than double-counting them. Construct adapters from the
current environment. Reuse the same adapter coverage for HTTP, RPC, MCP and background entrypoints
when they actually call the same operation.

Instrument actual D1 submissions, including the supported `first`, `all`, `run`, `raw`, `batch`, `exec`
and session paths in the installed API. Preserve receivers, bind chaining, session/bookmark semantics,
batch atomicity, result shapes and original failures. Do not stack wrappers or bypass authorization to
get a measurement. Keep prepared-statement counts separate from executed submissions and provider
attempts. A batch is one binding call with multiple statements; metadata availability differs by API.

Record adapter wall time separately from available SQL duration, rows read/written and attempts.
Include sample counts and missing metadata; never manufacture SQL timing for `first`/`raw` by changing
the query method. Keep query text, bound parameters, rows and arbitrary provider errors out of logs.
Use stable caller-owned operation names or ordinals rather than extracting labels from SQL.

## Termination and bounded output

At observable request closure, capture bounded started/completed/in-flight observations synchronously;
do not await unfinished callbacks just to finish telemetry. Keep phase/ordinal for incomplete native
reads and their guard-before/call/guard-after boundaries where that layering exists. Completed and
active snapshots must not both count the same call as completed. The absence of SQL metadata or a
final event is not zero work or success.

CPU/resource termination may prevent application finalization. Verify the configured provider outcome,
CPU/wall-time source and correlation path; if invocation logs are disabled, identify an available
alternative or report the blind spot. Add bounded progress checkpoints only when their cost and privacy
fit the operation. Do not claim that console error handling catches an isolate termination.

Apply event-byte and per-invocation volume budgets before emission, allowing for the platform envelope
and other logs. Preserve bounded slow/failed details, omission counts and saturation; test overflow
instead of assuming that an array-length limit prevents log truncation. Verify application-level and
provider-level sampling independently, retention and access. A sampled sink is not a complete ledger.

## Runtime verification

Use disposable D1/bindings and the compiled workerd target for adapter parity, concurrent correlation,
native severity, early failures and observable timeouts. Include batch/session behavior and paths with
no SQL metadata. Inject private fields, overflowing observations and a throwing sink; verify unchanged
results, errors and effects. Confirm that the chosen emission profile can actually emit the required
events; configuration presence or a unit logger test is insufficient.

Measure representative [workloads](../../../references/resource-budgets.md#representative-fixtures)
with the same guards and evidence. Node `process.cpuUsage()`, process RSS and local SQL timing do not
establish Worker CPU/memory compliance or production billing. Verify configured parent/child limits
separately if hosted execution exists. State what was local, simulated, remotely observed or unverified.

Sources: [D1 return metadata](https://developers.cloudflare.com/d1/worker-api/return-object/),
[Workers limits and CPU](https://developers.cloudflare.com/workers/platform/limits/),
[Workers Logs and sampling](https://developers.cloudflare.com/workers/observability/logs/workers-logs/).
