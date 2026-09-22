# Next.js tooling

For tooling changes or implementation handoff, apply the
[common quality policy](../../../references/quality.md) alongside the integration details below.

Use the selected package manager and a runtime supported by the installed Next.js version. Preserve
framework-generated TypeScript configuration and type generation. Configure framework-aware ESLint
and formatting through the project's actual commands; verify supported commands against the installed
version instead of assuming historical framework wrappers exist.

Keep type, lint, test, and production build checks distinct. Validate the chosen production output and
start path. Static export, a Node server, and hosted adapters have different supported capabilities.

Preserve existing logging and server integrations. Choose server libraries for the actual runtime;
keep their imports out of client bundles. Use framework-native setup, not the Bun backend scaffold.
An existing Bun toolchain may be retained when compatibility is verified; it is not a prerequisite.
