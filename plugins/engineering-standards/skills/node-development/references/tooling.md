# Node.js tooling

For tooling changes or implementation handoff, apply the
[common quality policy](../../../references/quality.md) alongside the integration details below.

Use strict TypeScript and ESM for new code. Pin a supported Node version compatible with the framework.
Keep the selected package manager and lockfile; use its reproducible installation mode in CI. Preserve
release-age and install-script protections where configured, checking version-specific options and units.

Use EditorConfig, ESLint, Prettier, and strict type checks where compatible. Configure TypeScript
compilation/execution deliberately; runtime type stripping is not type checking.

Use Node-native commands and the project's hook manager. Do not copy Bun executable scaffolds or hooks
into a Node-only project. For Hono use the Node adapter; Zod/OpenAPI integration and Pino are useful
new-service defaults, not reasons to replace an existing framework, validator, or logger.

Select drivers and instrumentation supported on Node, and test the production entrypoint on Node.
Use the selected Node runtime in deployment images and verify startup, shutdown, and resource cleanup.
