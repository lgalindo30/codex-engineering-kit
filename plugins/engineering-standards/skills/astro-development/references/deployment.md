# Astro deployment

Static output needs its selected static host, not a speculative API container. For on-demand rendering,
verify the selected adapter, supported runtime features, and persistent-storage assumptions.
For a server/container deployment, apply the [common deployment controls](../../../references/deployment.md)
for reproducible images, permissions, shutdown, readiness, storage, migrations, and verification.
Preserve an established deployment target; do not introduce containers for a purely static artifact.
