# Drizzle and D1

For applications requiring Cloudflare D1, use Drizzle ORM with `drizzle-orm/d1`, its SQLite schema
tools, and Drizzle Kit. Apply [shared persistence policy](../../../references/persistence.md) for
database/ORM selection, queries, ownership, concurrency, migrations, and recovery. Do not apply PostgreSQL
defaults to D1. Verify the selected stable versions' D1 support; do not adopt documentation RC tags
without an explicit preview requirement.

Access D1 through its typed binding and initialize the adapter from the current request's environment.
Keep Drizzle queries and mappings in feature repository adapters. A D1 binding follows the owning
Worker's data boundary; cross-Worker operations use the selected Service Binding contract.

Generate SQL migrations with Drizzle Kit and configure one migrations directory in Wrangler. Use
Wrangler's D1 migration commands to apply that history, following the shared coordinator/rollout policy.
Keep D1 database identifiers and the selected local/remote command target explicit per environment.

Verify actual D1 transaction/batch semantics for the installed adapter. Do not assume PostgreSQL
transaction callbacks are supported. Use a supported atomic batch for coupled writes when appropriate,
with the shared concurrency criteria for reads followed by writes. D1 sessions/read replication
require an explicit consistency decision if used; a mock or local database cannot prove remote parity.

Apply [persistence verification](../../../references/persistence.md#verification) against disposable
local D1 with the same Drizzle adapter and Wrangler migration history.
For external PostgreSQL/MySQL, verify the platform-supported connection approach, including Hyperdrive,
within that database task instead of creating D1 automatically.

Sources to verify when implementing:
[Drizzle D1](https://orm.drizzle.team/docs/connect-cloudflare-d1),
[D1 migrations](https://developers.cloudflare.com/d1/reference/migrations/),
[D1 database API](https://developers.cloudflare.com/d1/worker-api/d1-database/).
