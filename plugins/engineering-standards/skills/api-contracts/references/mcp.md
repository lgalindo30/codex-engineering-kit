# MCP compatibility and operational evidence

Use only for an MCP integration or its consumers. Follow the negotiated protocol revision, installed
SDK and selected client; MCP does not require adding another HTTP API or hosted execution service.
Apply shared [contracts](../../../references/api-contracts.md),
[operational evidence](../../../references/operation-observability.md) and
[reliability](../../../references/reliability.md) at the actual transport boundaries.

## Schema and consumer portability

Identify producer, schema dialect, SDK validators, Inspector and intended client versions. Exercise
the actual advertised input/output schemas, serialized results and tool-error/protocol-error envelopes.
Treat text and structured content according to the negotiated contract; neither a TypeScript type nor
a schema snapshot proves the client can call the tool or consume its complete result.

Review regex dialect/features, anchors, Unicode, escaping, formats, bounds, refs and unions for every
promised consumer. Test representative positive and negative values through the server and actual
client validation path. Acceptance by AJV or Inspector alone is insufficient evidence for another
engine/client. Detect unsupported regex features with the selected compatibility tooling or an
explicit target-engine check; do not silently weaken validation to satisfy a validator.

Verify discovery, pagination and the client's loaded catalog after schema/profile changes. A server
listing is not proof that a running client refreshed its cached descriptors. Report the exact observed
tool/schema version; fresh installation and runtime discovery are separate adoption checks.

## Bounded calls and optional hosted execution

Measure encoded input/result budgets including transport framing and duplicated content where the
protocol/client carries it. Distinguish character count from UTF-8 bytes. Reject explicit overflow
without silently trimming required evidence or returning success for an incomplete validation. Preserve
scope/revision cursors and [complete-scan semantics](../../../references/persistence.md#coverage-and-complete-scans).

If the product implements code/hosted execution, separately bound code/data size, child/parent CPU,
overall deadline, subrequests, native calls, output, concurrency and creation/spend budgets. Preserve
native authorization, owner/scope checks and full error/result semantics on every callback. The executor
must not broaden writes, network or arbitrary database access. Keep a deliberate bounded native path
for essential operations whose valid inputs cannot fit the executor; do not assume every tool belongs
inside code execution. Test the actual discovery and invocation of that path.

Link request, execution and native-operation context explicitly. Observe discovery/catalog, reservation,
dispatch, pre/post guards and finalization only where those phases exist; record incomplete callbacks
and metadata coverage under the shared contract. Client/model/network elapsed time cannot be inferred
from server measurements alone. A grouped call saves client invocations, not necessarily backend work;
parallel durations overlap. A timeout does not prove rollback or completeness of sibling results.

## Acceptance

Use disposable local server/client fixtures and synthetic data, with external effects disabled. Exercise
discovery and a real client call, accepted/rejected Unicode/boundary inputs, protocol and business
errors, output validation, byte overflow, stale pagination and interrupted work. For hosted execution,
include call/deadline/resource limits, denied capabilities and native fallback with full evidence.
Use stable error codes and redacted diagnostics rather than arbitrary provider exceptions.

Record each validator/client/runtime version and distinguish unit schema checks, Inspector checks,
local protocol round trips and actual target-client behavior. If a client or credentials are unavailable,
mark that layer unverified. Document breaking changes and refresh/recovery instructions without
claiming that updating server code automatically updates an installed client.

Sources: [MCP tool contracts](https://modelcontextprotocol.io/specification/2025-11-25/server/tools),
[JSON Schema regular-expression portability](https://json-schema.org/understanding-json-schema/reference/regular_expressions).
