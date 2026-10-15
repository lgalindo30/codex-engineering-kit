# Drizzle/D1

For selected D1, use Drizzle's D1 adapter, SQLite schema tools, and Drizzle Kit with verified stable
versions. Apply [persistence policy](../../../references/persistence.md), excluding PostgreSQL-specific
defaults. Initialize the typed D1 adapter from the current request's environment; feature repositories
own queries/mappings. Cross-Worker data access follows its Service Binding contract.

Generate SQL with Drizzle Kit, keep one Wrangler migration directory, and apply that history through
Wrangler D1 commands under the shared rollout/coordinator policy. Keep database IDs and local/remote
targets explicit per environment.

Verify installed adapter transaction/batch semantics; do not assume PostgreSQL-style transaction
callbacks. Use supported atomic batches for coupled writes and shared concurrency criteria for
read-then-write operations. Sessions/read replication need an explicit consistency decision;
local databases/mocks cannot prove remote parity.

Verify queries and migrations against disposable local D1 with the same adapter/history. External
PostgreSQL/MySQL uses a separately selected platform-supported approach (possibly Hyperdrive), without
automatically creating D1.

Sources: [Drizzle D1](https://orm.drizzle.team/docs/connect-cloudflare-d1),
[migrations](https://developers.cloudflare.com/d1/reference/migrations/),
[D1 API](https://developers.cloudflare.com/d1/worker-api/d1-database/).
