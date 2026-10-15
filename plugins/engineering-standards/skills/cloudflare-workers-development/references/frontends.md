# Workers/Pages frontends

For a selected Cloudflare frontend, apply [architecture selection](../../../references/frontend-architecture.md).
Prefer React/Vite for dynamic administrative SPAs and Astro with islands for content sites, preserving
explicit/existing choices. A Next.js edge adapter needs an explicit choice and verified feature/runtime
support. Interactivity alone requires neither Containers nor a host change.

Use the selected Workers assets pipeline. For SPAs configure the actual build directory and
`assets.not_found_handling: "single-page-application"` against the installed Wrangler/Vite schema.
Use `assets.run_worker_first` patterns when needed to route API/protected paths to handlers. Verify
API errors and missing JS/CSS remain actual responses instead of SPA HTML. Browser guards cannot
protect APIs/private assets; use the chosen server access boundary.

Astro static output uses host 404 serving rather than SPA fallback. Pages uses its own routing/functions
configuration, not Workers asset options. [Interface policy](../../../references/interface.md) applies
independently of host. Deploying assets needs no automatic API/Hono/D1/authentication setup.

Exercise production-like assets, deep links/refresh, Not Found, API paths, base paths, cache behavior,
and lazy-chunk failure recovery. Vite middleware/proxies are not deployed APIs. Coordinate rollback/cache
behavior so active browsers recover obsolete chunks; distinguish local checks from live serving.

Sources: [SPA routing](https://developers.cloudflare.com/workers/static-assets/routing/single-page-application/),
[Vite assets](https://developers.cloudflare.com/workers/vite-plugin/reference/static-assets/),
[Pages](https://developers.cloudflare.com/pages/configuration/serving-pages/),
[Next.js](https://developers.cloudflare.com/workers/framework-guides/web-apps/nextjs/).
