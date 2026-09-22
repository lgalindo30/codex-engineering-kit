# Astro file integration

Apply the [shared upload rules](../../../references/files.md) for limits, validation, safe storage,
retrieval, and verification. Verify the selected framework adapter's request parsing and body ceiling.
Local storage is appropriate only when the deployment provides persistent writable storage; an ephemeral
filesystem is not durable upload storage. Use a separately authorized provider when persistence needs it.
For static output, perform upload work through the selected server API rather than a nonexistent runtime.
