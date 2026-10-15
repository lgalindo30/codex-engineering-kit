# React/Vite browser security

Apply [security policy](../../../references/security.md); session/file integration follows
[implementation](implementation.md#sessions-forms-and-files).

Check generated bundles, source maps, and browser diagnostics when changing environment exposure.
Vite public values are public; client imports or substitutions must not expose server-only values.

Preserve React text escaping and isolate sanitized rich HTML at its renderer. Validate route/search-derived
navigation destinations before browser navigation calls. Exercise server denials through the API client
and clear stale private views/cache after session loss; route guards control navigation only.

Configure CSP/headers in the actual static host/server and verify production-built assets/direct routes.
Vite development configuration cannot establish production headers.
