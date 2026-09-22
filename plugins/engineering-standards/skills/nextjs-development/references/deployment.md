# Next.js deployment

Verify the selected framework output and production start path. Static export cannot serve runtime
mutations; an integrated server application does not imply a separate backend.
For a server/container deployment, apply the [common deployment controls](../../../references/deployment.md)
for reproducible images, permissions, shutdown, readiness, storage, migrations, and verification.
Preserve an established deployment target; do not introduce containers for a purely static artifact.
