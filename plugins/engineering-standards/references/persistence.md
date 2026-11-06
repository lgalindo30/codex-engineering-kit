# Persistence and Schema Changes

Use for persisted data and schema changes. Engine/driver setup belongs to the technology guide.

## Queries and ownership

Keep queries/mappings in cohesive adapters with explicit dependencies. Parameterize queries, use
constraints, bound results/pagination and justify indexes by access patterns. Map records into
[consumer contracts](api-contracts.md) without private storage fields.

Respect [service ownership](architecture.md#separate-services). Verify connection limits and resource
lifetime for the runtime; process pools and request bindings differ. Keep environments explicit,
credentials outside source and reset/seed commands away from production.

## Consistency and concurrency

Use supported transactions/atomic batches for coupled writes. Verify actual isolation, rollback and
concurrency behavior. Protect read-then-write operations with constraints, conditional updates or
supported coordination. Make replica/read-consistency decisions explicit and apply [idempotency](reliability.md#retries-and-idempotency)
where operations repeat.

### Leases and fencing

Use leases only when concurrent ownership/recovery requires them. Define owner, expiry and generation;
claim/renew/release through conditional state changes. A resumed or slow worker must not complete a
write after ownership moved: enforce the current fencing token at the protected write/effect, using
a monotonic generation or equivalent target-enforced mechanism. Check token/owner and relevant
business versions together. Expiry alone does not prove a prior call stopped. Restoration must not
silently reuse fencing/idempotency generations. External targets without fencing/deduplication retain
the [unknown-outcome reconciliation](reliability.md#retries-and-idempotency) requirement.

### Coverage and complete scans

When a decision depends on exhaustive evidence, preserve scope, revision/snapshot, archived coverage
and cursor continuity across pages. Distinguish complete, partial and unknown coverage. A page limit,
capacity rejection, interrupted scan or stale revision cannot establish absence or a successful global
validation. Return the incomplete state or fail closed for decisions that require completeness; do not
silently trim evidence. Follow [resource budgets](resource-budgets.md) when replacing materialized reads
with streaming or partitioned work.

## Migrations and recovery

Keep reviewed versioned migrations and one coordinator per schema/target. Review generated SQL; apply
production migrations as compatible deployment steps, outside request handling and every-process startup.

Assess existing data, backfills, destructive changes and rollout/recovery compatibility. Code rollback
does not undo migrations. Document required backup/restore before authorized production changes using
[deployment controls](deployment.md).

## Verification

Use disposable data and the actual engine/migration history. Exercise existing-data compatibility,
constraints, conflicts, partial/coupled-write failures and relevant recovery paths. Remove only owned
fixtures from identified targets. Apply [shared testing criteria](testing.md).
For replay/ownership changes, exercise duplicate and mismatched requests, concurrent claim/replay,
expired owners attempting late writes, restoration assumptions and uncertain external outcomes. For
exhaustive scans, verify interrupted pages and stale cursors never produce a negative complete verdict.

Sources: [SQLite transactions](https://www.sqlite.org/lang_transaction.html),
[PostgreSQL schema changes](https://www.postgresql.org/docs/current/ddl-alter.html).
