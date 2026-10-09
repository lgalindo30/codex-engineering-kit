# Workers Tooling and Deployment Checks

Apply the [common quality policy](../../../references/quality.md). Use strict TypeScript/ESM for new
application code and TypeScript for supported tool configuration; `wrangler.jsonc` describes platform
configuration. Preserve the project's package manager and lockfile. For a new Bun-managed project,
pin Bun, use its maturity controls and frozen installs, and keep Node.js available for tools that
require it. Bun package management does not imply Bun runtime compatibility for Workers or Wrangler.

## Wrangler and Vite

Install a compatible stable Wrangler locally and invoke that pinned executable through project scripts.
Wrangler runs on its supported Node.js releases; Workers run in workerd. Avoid CLI invocations that
silently download an unpinned latest version. Pin compatible Hono, Zod, OpenAPI integration, TypeScript,
Vite, Cloudflare plugins, and Drizzle packages only when the application needs them.

Use Vite with `@cloudflare/vite-plugin` for new Workers development/builds, especially combined browser
assets and APIs. Verify official framework support and preserve a requested or established Wrangler
dev/build flow. Keep one authoritative production build path and validate bindings in local workerd;
Vite's ordinary Node dev server alone does not simulate Workers. Browser and Worker TypeScript configs
must have appropriate environments so Bun/Node globals and privileged modules do not enter browser code.

Configure the actual TypeScript entrypoint, environments, compatibility date/flags, bindings, assets,
rate limits, and warning/error logging policy in Wrangler. Use a current deliberate compatibility date
for a new project; review/test changes on existing projects. Enable `nodejs_compat` for supported
dependencies that need it without assuming the full Node runtime becomes available.

Generate binding/runtime types using `wrangler types` from the actual configuration. Use those types
for Hono bindings and platform handlers instead of a drifting handwritten Env interface. Regenerate
after binding/configuration changes and check supported environment-specific generation in CI. Typed
bindings do not validate secret values; validate required runtime configuration at its usage boundary.
Keep local secret files ignored and provide non-secret configuration examples.

## Quality and testing

Use the shared quality command criteria with the actual Vite/Wrangler production build.
Use Vitest's current official Workers integration, presently `@cloudflare/vitest-plugin`,
after verifying compatible versions and
configuration. Existing `@cloudflare/vitest-pool-workers` setups need the documented compatibility or
migration path rather than copied obsolete setup. See [testing](testing.md) for execution boundaries.

The optional kit [templates](../../../templates/README.md) are Bun-specific quality assets, not a
Workers scaffold. Adapt only compatible assets; do not copy Bun Test, Node-listener assumptions, or
container checks into a workerd application. Record verified scripts and real package boundaries in
project instructions. Project-wide quality audits remain separate tasks.

## Deployment

Apply [shared deployment controls](../../../references/deployment.md) for the selected Cloudflare target.
Verify built deployment configuration and binding names/targets using the selected Vite/Wrangler
pipeline and an available deploy dry-run.
Keep secrets, domains, database IDs, migrations, and internal-service exposure explicit per environment.

Use the shared rollout/pending-work criteria for live actions. Verify remote bindings, D1 storage,
rate-limit distribution, and runtime behavior separately from local builds. Updating a guide does
not authorize installation of application dependencies here.

Sources to verify when implementing:
[Wrangler requirements](https://developers.cloudflare.com/workers/wrangler/install-and-update/),
[Wrangler configuration](https://developers.cloudflare.com/workers/wrangler/configuration/),
[TypeScript](https://developers.cloudflare.com/workers/languages/typescript/),
[Vite plugin](https://developers.cloudflare.com/workers/vite-plugin/),
[Vitest integration](https://developers.cloudflare.com/workers/testing/vitest-integration/).
