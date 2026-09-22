# Bun tooling

For tooling changes or implementation handoff, apply the
[common quality policy](../../../references/quality.md) alongside the integration details below.

Use strict TypeScript and ESM for new application code. Pin Bun and intentional dependency versions,
commit bun.lock, and use frozen installation in CI. Bun's install.minimumReleaseAge = 86400 filters
new resolutions by age in seconds; it does not re-audit an existing lockfile. Review advisories separately.

The optional [quality scaffold and hooks](../../../templates/README.md) execute with Bun. Use their
preflight and dry-run on an empty target, or review individual assets after framework initialization.
They are quality helpers, not application generators. Keep hook trust and activation explicit.

Use EditorConfig, ESLint, Prettier, and strict type checks where compatible. Configure meaningful Bun
tests before accepting the scaffold's check command; its initial test placeholder intentionally fails.

For a new server, Pino console logging and Hono's Zod/OpenAPI integration are useful defaults. Verify
library, database driver, and telemetry compatibility on Bun itself. Use a pinned Bun container image
for Bun production services and verify the actual entrypoint, shutdown, and persistence.
