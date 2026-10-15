# Astro tooling and deployment

Apply [quality policy](../../../references/quality.md). Preserve compatible framework configuration,
package manager, Astro-aware type checking, and production builds. Configure formatter/linter support
for .astro and the chosen island framework rather than assuming plain TypeScript tooling covers them.

Apply [deployment controls](../../../references/deployment.md). Static output needs no application
server. For on-demand routes, verify the selected adapter's runtime features and persistent-storage
assumptions. Check built routes, metadata, assets, hydration, and real host 404 behavior as affected.
Do not install another runtime merely for kit helpers.

For chosen containers, apply [Docker controls](../../../references/docker-deployment.md) and exercise
the actual Astro adapter or built static-server output in the image.
