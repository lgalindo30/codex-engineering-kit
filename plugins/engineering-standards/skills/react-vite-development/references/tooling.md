# React/Vite tooling and deployment

Apply [quality policy](../../../references/quality.md). Preserve Vite/JSX setup and browser/server
TypeScript boundaries. Use the selected compatible package manager/runtime, React-aware lint/format,
and independent type checks; do not install another runtime for kit helpers.

For new routed SPAs, configure compatible TanStack Router/Query versions. Choose file-based or
code-based routes; add Vite route generation only for file-based routing. Preserve established choices.

Apply [deployment controls](../../../references/deployment.md) to generated assets on the selected
static host. Vite's development server/proxy is not a production API. Verify base paths, hashed assets,
HTML/asset caching, deep-link fallback, refresh, API origin, cross-origin behavior, and host security
headers. Keep public configuration intentional and secrets out of browser values/bundles.

For selected containers, apply [Docker controls](../../../references/docker-deployment.md) with a
maintained static server and actual built assets. Exercise production-like serving and document
configuration/rollback, coordinating obsolete-chunk recovery with active browsers.
