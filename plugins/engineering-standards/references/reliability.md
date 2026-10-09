# Reliable Calls and Background Work

Apply only to requested network calls, delegated operations, or background tasks. Preserve the
selected cloud/services and existing integration. Runtime cancellation APIs, queue guarantees, and
event handlers belong to the technology guide; this policy does not require adding a queue or SDK.

## Bounded calls and cancellation

Set deliberate request/upstream deadlines and response-size limits at the actual runtime boundary.
Share an overall budget across attempts so nested calls cannot extend work indefinitely. Pass supported
cancellation signals through adapters and clean up timers/resources. A raced timeout or disconnected
client does not establish that a remote mutation stopped or rolled back; report an uncertain outcome
and use reconciliation or deduplication when the operation requires it.

Keep critical work within the operation's acknowledged success boundary. Do not return success before
required writes or provider effects have a defined outcome. Optional post-response work must use the
runtime's supported lifecycle mechanism; promises or timers alone do not establish durable delivery.

## Retries and idempotency

Retry only selected transient failures when the operation is idempotent, reliably deduplicated, or
known not to have been applied. Do not infer mutation safety from a timeout. Bound attempts and total
duration, respect defensible provider retry guidance, and use capped backoff with jitter when repeated
calls could overload a dependency. Avoid stacked retries across layers and retry storms.

For deduplicated mutations, define key scope, request matching, concurrent-attempt behavior, result
reuse, and retention. Coordinate stored deduplication state with the effect where supported; an
in-memory flag or disabled button does not establish server-side replay protection. Use
[database concurrency controls](persistence.md#consistency-and-concurrency) when applicable.
Do not promise exactly-once external effects without an explicit supported design.

## Durable background work

Use a supported durable mechanism when the task requires persistence, retries, or recovery after the
request/process ends. Define acknowledgement, retry exhaustion, duplicate delivery, and failure
recovery for that mechanism. Keep consumers idempotent where delivery can repeat. Do not add queues,
schedulers, or workflows to features that only require ordinary synchronous work.

Follow [safe errors](api-contracts.md#errors), [logging](logging.md), and [security](security.md) for
failure reporting and trusted delegated context.

## Verification

Exercise timeout, transient failure, exhausted retries, duplicate/concurrent attempts, and recovery
where they affect the changed operation. Verify retries do not duplicate effects and failure does not
leave indefinite loading or hidden work. Distinguish simulations from observed provider cancellation,
durability, and delivery guarantees; document uncertain remote outcomes.

Primary reference: [RFC 9110: Idempotent Methods](https://www.rfc-editor.org/rfc/rfc9110.html#section-9.2.2).
