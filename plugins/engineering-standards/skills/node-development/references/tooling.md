# Node.js tooling and deployment

Apply [quality policy](../../../references/quality.md). Use strict TypeScript/ESM for new code, a pinned
supported Node release, and the selected package manager/lockfile. Use reproducible CI installation
and preserve configured release-age/install-script controls, checking their version-specific units.

For new compatible projects, use EditorConfig and [Vite+](../../../references/vite-plus.md)
for formatting, lint and type checks; preserve established tooling. Compile TypeScript or
choose a supported execution path; runtime type stripping does not check types. Use native package
commands and the project's hook manager. Do not copy Bun executable scaffolds/hooks into Node-only
projects; compatible static formatting assets may be adapted.

For deployment, apply [deployment controls](../../../references/deployment.md). Verify the compiled
entrypoint, native drivers, startup/shutdown, and cleanup on the selected host. For chosen containers,
apply [Docker controls](../../../references/docker-deployment.md) and exercise these in the built image.
Document changed connection limits, persistent paths, backups, and migration recovery.
