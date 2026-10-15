# Bun tooling and deployment

Apply [quality policy](../../../references/quality.md). Use strict TypeScript/ESM for new code, pin Bun
and dependencies, commit `bun.lock`, and use frozen CI installs. `install.minimumReleaseAge = 86400`
filters new resolutions by age in seconds; advisory review still applies to existing lockfiles.

The optional [quality scaffold and hooks](../../../templates/README.md) execute with Bun. Use preflight
and dry-run on an empty target, or review compatible assets after framework initialization. They are
quality helpers, not application generators; keep hook trust/activation explicit. Configure compatible
EditorConfig, ESLint, Prettier, type checks, and meaningful tests before accepting the quality command.

For deployment, apply [deployment controls](../../../references/deployment.md). Verify the actual Bun
entrypoint, drivers, shutdown, persistence, and cleanup on the selected host. For chosen containers,
apply [Docker controls](../../../references/docker-deployment.md) with a pinned Bun image and exercise
native dependencies in that image. Document changed connection limits, backups, and migration recovery.
