# Persistence and Schema Changes

Use when requested functionality needs persistence or changes existing data. Preserve the selected
database, ORM, cloud/services, and ownership; do not add a database or migrate engines solely to
follow a guide. Driver setup, engine defaults, and provider operations belong to technology guides.

## Queries and ownership

Keep queries and database mappings in cohesive adapters with explicit dependencies. Use parameterized
queries and database constraints; bound pagination and returned data. Add indexes justified by actual
access patterns. Map records into validated consumer contracts instead of exposing private storage
fields. Apply [API contracts](api-contracts.md) and [security](security.md).

Respect [service ownership](architecture.md#separate-services). Verify driver/runtime behavior,
connection limits, and resource lifetime for the chosen deployment; process pools and request bindings
are different models. Keep local, test, preview, and production targets explicit, with credentials
outside source and reset/seed commands away from production.

## Consistency and concurrency

Use supported transactions or atomic batches for coupled writes. Verify the actual engine/adapter's
atomicity, isolation, concurrency, and rollback behavior instead of assuming another database's
semantics. Protect reads followed by writes with constraints, conditional updates, or other supported
coordination. Exercise conflicts and partial failure at the actual database boundary.

Make replica/read-consistency decisions explicit where the selected service requires them. Apply
[idempotency](reliability.md#retries-and-idempotency) when operations can repeat. A mock, local database,
or passing type check does not establish remote consistency or concurrency guarantees.

## Migrations and recovery

Keep a versioned, reviewed migration history and one authoritative coordinator for each schema/target.
Review generated SQL; avoid competing runners independently applying the same changes. Apply production
migrations as a deliberate compatible deployment step, outside ordinary request handling and automatic
startup of every process. Code preparation or local application does not authorize remote changes.

For existing schemas, assess rollout/recovery compatibility, backfills, and destructive changes where
applicable. Reverting application code does not reverse a data migration. Document required backup,
restore, and recovery steps before an authorized production change; use [deployment controls](deployment.md)
for environment and rollout verification.

## Verification

Test the selected adapter against the actual engine with disposable data and the same migration
history. For schema changes, exercise representative existing data, constraints, coupled-write
failures, and recovery/compatibility paths relevant to the change. Identify targets before cleanup
and remove only owned fixtures. Report unexecuted remote, backup, or recovery checks accurately.

Sources to verify for the selected engine:
[SQLite transactions](https://www.sqlite.org/lang_transaction.html),
[PostgreSQL schema changes](https://www.postgresql.org/docs/current/ddl-alter.html).
