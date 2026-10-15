# Reliable Calls and Background Work

Use for network/delegated calls and background work. Technology guides own runtime cancellation APIs,
queue guarantees and event handling.

## Bounded calls and cancellation

Set request/upstream deadlines and response-size limits. Share an overall attempt budget, propagate
supported cancellation and clean resources. A timeout/disconnect does not prove remote rollback;
reconcile or deduplicate uncertain mutations.

Acknowledge success only when required writes/effects have a defined outcome. Optional post-response
work uses the runtime's supported lifecycle; ordinary promises/timers do not provide durable delivery.

## Retries and idempotency

Retry selected transient failures only for idempotent, deduplicated or known-unapplied operations.
Bound attempts/total duration, respect provider guidance and use capped backoff/jitter where needed.
Avoid stacked retries and retry storms.

Define deduplication key scope, request matching, concurrency, result reuse and retention. Coordinate
stored deduplication with the effect where supported, using [database controls](persistence.md#consistency-and-concurrency).
Client flags do not provide server replay protection. Claim exactly-once external effects only with a
supported explicit design.

## Durable background work

Use a durable mechanism when work needs persistence/recovery after the request/process ends. Define
acknowledgement, retry exhaustion, duplicate delivery and failure recovery; make repeatable consumers
idempotent. Follow [safe errors](api-contracts.md#errors), [logging](logging.md) and [service security](security.md#service-boundaries).

## Verification

Exercise relevant timeouts, exhausted retries, duplicates/concurrency and recovery. Check retries do not
duplicate effects or leave indefinite loading/hidden work. Apply [shared testing criteria](testing.md).

Primary reference: [RFC 9110 Idempotent Methods](https://www.rfc-editor.org/rfc/rfc9110.html#section-9.2.2).
