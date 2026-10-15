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

Sources: [SQLite transactions](https://www.sqlite.org/lang_transaction.html),
[PostgreSQL schema changes](https://www.postgresql.org/docs/current/ddl-alter.html).
