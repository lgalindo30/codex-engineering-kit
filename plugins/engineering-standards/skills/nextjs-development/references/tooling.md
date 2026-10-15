# Next.js tooling and deployment

Apply [quality policy](../../../references/quality.md). Preserve framework TypeScript configuration,
type generation, and compatible package manager/runtime. Configure framework-aware lint/format using
actual commands; verify current support instead of assuming historical Next.js wrappers still exist.
Keep type, lint, tests, and production build separate. Use framework setup rather than Bun backend
scaffolds; retain an existing Bun toolchain when compatible without making it a prerequisite.

Apply [deployment controls](../../../references/deployment.md). Verify framework output, host adapter,
production start path, and supported server/edge libraries. Static exports cannot execute mutations.
Keep server integrations out of browser bundles; document changed connection limits, persistent paths,
backups, and migration recovery.

For chosen containers, apply [Docker controls](../../../references/docker-deployment.md) and exercise
the actual built server output, startup/shutdown, native dependencies, and asset serving in that image.
