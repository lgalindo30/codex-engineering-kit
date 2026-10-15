# Workers tooling and deployment

Apply [quality policy](../../../references/quality.md). Use strict TypeScript/ESM and supported TypeScript
tool configuration; `wrangler.jsonc` owns platform settings. Preserve the package manager/lockfile.
Bun-managed projects keep pinned Bun, maturity controls, and frozen installs plus supported Node for
Wrangler. Neither Bun package management nor `nodejs_compat` makes workerd a full Node/Bun runtime.

## Wrangler/Vite

Use pinned local stable Wrangler through project scripts, avoiding implicit latest downloads. Pin
compatible Hono/Zod/OpenAPI, Vite/Cloudflare, and Drizzle dependencies only as needed. New Worker builds
prefer `@cloudflare/vite-plugin`, especially browser assets plus APIs; preserve supported existing flows.
Keep one production build path. Ordinary Vite Node serving does not simulate Workers.

Configure entrypoint, environments, compatibility date/flags, bindings, assets, rate limits, and logging
against the installed schema. New compatibility dates are deliberate; test updates to existing ones.
Use `nodejs_compat` only for dependencies requiring supported APIs. Separate browser/Worker TypeScript
environments to keep privileged modules and runtime globals out of browser code.

Generate runtime/binding types with `wrangler types` from actual config; regenerate after changes and
verify environment-specific CI generation. Avoid drifting handwritten `Env` interfaces. Validate runtime
configuration values where used; keep local secrets ignored and examples non-secret.

## Quality and deployment

Use the actual Vite/Wrangler build in the quality command. Verify the current official Vitest integration
(presently `@cloudflare/vitest-plugin`); existing `@cloudflare/vitest-pool-workers` setups need a supported
compatibility/migration path. See [testing](testing.md) for runtime execution.

Kit [templates](../../../templates/README.md) are optional Bun quality assets, not Worker scaffolds.
Adapt compatible assets without Bun Test, Node listeners, or container assumptions.

Apply [deployment controls](../../../references/deployment.md). Check built configuration/binding targets
with the selected pipeline and available deploy dry-run. Keep secrets, domains, database IDs, migrations,
and private-service exposure explicit per environment. Verify remote D1, bindings, distributed limits,
and runtime behavior separately from local builds.

Sources: [Wrangler requirements](https://developers.cloudflare.com/workers/wrangler/install-and-update/),
[configuration](https://developers.cloudflare.com/workers/wrangler/configuration/),
[types](https://developers.cloudflare.com/workers/languages/typescript/),
[Vite](https://developers.cloudflare.com/workers/vite-plugin/),
[Vitest](https://developers.cloudflare.com/workers/testing/vitest-integration/).
