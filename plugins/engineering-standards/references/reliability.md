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

For durable mutations, bind replay identity to its actor/tenant, operation and stable request content.
Compare the stored canonical request or a versioned content fingerprint/hash; reject reuse of the key
with different content. Define canonicalization before hashing and preserve exact original bytes where
the contract requires them. Neither a hash nor a request ID grants permission. Store the receipt with
the effect atomically where supported, recheck authorization on replay, and test concurrent same-key
requests, changed bodies, retention/expiry and recovery. Never claim atomicity across an external
provider unless its actual protocol provides it.

For changes to stored request representations, parsers or identity algorithms, apply
[persisted identity compatibility](persisted-identity.md) before changing replay behavior.

Represent unknown effect outcomes explicitly after disconnects, timeout or a crash between dispatch
and receipt. Preserve the durable attempt identity and reconcile provider receipts/state before retrying;
do not turn a missing response into a known-unapplied result. Define who resolves unprovable outcomes.
Use [fencing](persistence.md#leases-and-fencing) when workers can outlive ownership.

## Durable background work

Use a durable mechanism when work needs persistence/recovery after the request/process ends. Define
acknowledgement, retry exhaustion, duplicate delivery and failure recovery; make repeatable consumers
idempotent. Follow [safe errors](api-contracts.md#errors), [logging](logging.md) and [service security](security.md#service-boundaries).

## Verification

Exercise relevant timeouts, exhausted retries, duplicates/concurrency and recovery. Check retries do not
duplicate effects or leave indefinite loading/hidden work. Apply [shared testing criteria](testing.md).

Primary reference: [RFC 9110 Idempotent Methods](https://www.rfc-editor.org/rfc/rfc9110.html#section-9.2.2).
