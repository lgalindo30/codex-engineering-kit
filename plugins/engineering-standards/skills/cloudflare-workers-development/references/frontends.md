# Cloudflare Frontends

Use for a selected Workers/Pages frontend deployment. Apply
[architecture selection](../../../references/frontend-architecture.md) before new stack decisions.
Prefer React/Vite SPAs for dynamic administrative apps and Astro static output with selective islands
for content sites. Preserve explicit frameworks and existing services. A Next.js edge adapter requires
an explicit discussed choice and verified feature/runtime support; do not default to Containers or
change the host merely because a frontend needs interactivity.

## Assets and routing

On Workers, use the selected static-assets pipeline; for a SPA configure the actual build directory
and `assets.not_found_handling: "single-page-application"` using the installed Wrangler/Vite schema.
Send protected/API paths to their intended Worker handlers, using appropriate `assets.run_worker_first`
patterns when assets and API share that Worker. Verify that API errors and missing JS/CSS assets remain
their real responses rather than becoming SPA HTML. A browser route guard does not secure the API or
private assets; apply the chosen server access boundary if those assets are restricted.

For Astro static output, use static not-found serving rather than a SPA fallback. On Pages, verify the
selected Pages routing/functions configuration; do not copy Workers asset options into a Pages config.
Tailwind/shadcn decisions follow [interface policy](../../../references/interface.md), independent of host.
Do not add an API, Hono, D1, or authentication merely to deploy frontend assets.

Exercise production-like assets, deep links/refresh, the app's Not Found page, API paths, base paths,
hashed-asset caching and lazy-chunk failure recovery. Local Vite middleware/proxies are not the deployed
API. Keep public configuration and API origin intentional, and coordinate rollback/cache behavior so
active browsers can recover from obsolete chunk URLs. Report local checks separately from live serving.

Sources to verify when implementing:
[Workers SPA routing](https://developers.cloudflare.com/workers/static-assets/routing/single-page-application/),
[Vite assets](https://developers.cloudflare.com/workers/vite-plugin/reference/static-assets/),
[Pages serving](https://developers.cloudflare.com/pages/configuration/serving-pages/),
[Next.js on Workers](https://developers.cloudflare.com/workers/framework-guides/web-apps/nextjs/).
