# React and Vite applications

Use a client SPA when it fits the requested product. For new SPAs needing navigation, use TanStack Router
(@tanstack/react-router). Preserve a requested or established router unless migration is authorized. Vite development middleware is not a production backend.
For new framework/host decisions, use [architecture selection](../../../references/frontend-architecture.md).

- Keep secrets, authorization, persistence, and privileged integrations in the selected server.
  Browser-exposed environment variables are public configuration, not secret storage.
- Keep shareable state in routes/search parameters and transient state local. Use TanStack Query for
  remote state when useful without duplicating the same cache in component effects.
- Preserve accessible UI primitives and the existing design system. Do not add a component library
  or another state manager for a feature that existing tools handle well.
- Use Vitest and React Testing Library for meaningful component behavior when no runner is established.
  Distinguish mocked API tests from integration against the actual backend.
- Validate types independently from bundling. Build and verify deep-link fallback, base paths, assets,
  and critical browser journeys against production-like serving when changing deployment or routing.
- Follow the selected package manager; Node and Bun tooling are both possible subject to compatibility.

## TanStack routing and remote state

Use TanStack Router for typed routes, navigation, validated search parameters, and route-level loading
and error boundaries. Give primary navigable views stable pathnames; use search parameters for filters,
pagination, and other shareable state. Preserve browser back/forward, refresh, and direct-link behavior.
A simple screen without navigation does not need a router merely to satisfy a dependency checklist.
Provide a router Not Found view for unknown paths. Apply
[URL/data-view policy](../../../references/interface.md#navigation-and-data-views) to filters, sorting and pagination.

Use TanStack Query (@tanstack/react-query) for remote server state: useQuery for reads, useMutation for
writes, and a shared QueryClient/provider for cache ownership. Keep transient UI state local. Do not
rebuild the same remote cache with useEffect/useState or store route state in a competing router.

When route loading needs remote data, integrate the router with the same QueryClient and reusable query
keys/options. Use the installed versions' supported preloading/loading APIs so navigation and components
share data rather than making independent caches. Make freshness, cancellation, error handling, and
post-mutation invalidation deliberate. Verify integration signatures against compatible official docs.
Keep session-scoped data isolated and clear it on session changes. Router guards do not replace server
authorization. Next.js and Astro keep their native routing; this default belongs to the React/Vite SPA.

Official references: [Vite](https://vite.dev/guide/), [React](https://react.dev/learn),
[TanStack Router integration](https://tanstack.com/router/latest/docs/guide/external-data-loading),
[TanStack Query APIs](https://tanstack.com/query/latest/docs/framework/react/reference/index).

## Code loading

For substantial SPAs, split navigable feature routes and expensive optional dependencies rather than
shipping all views/editors/charts in the initial bundle. Use the chosen router's supported route code
splitting, or module-scope `React.lazy(() => import(...))` with appropriately placed `Suspense` and
error boundaries. Keep the shell and common lightweight controls available; do not lazily split every
primitive. Preload likely navigation selectively without eagerly downloading all features.

Inspect production chunks and browser requests: dynamic imports in source alone do not prove deferred
loading if eager imports/barrel exports also reach the module. Provide recovery for rejected imports
or stale asset URLs after deployment. Use the installed Vite/router APIs, bounded reload/retry behavior
and appropriate HTML/hashed-asset caching; preserve meaningful unsaved work and avoid reload loops.
Apply this across SPA hosts, not only Cloudflare. Verify initial/deferred requests, navigation fallbacks
and import failure recovery in production-like serving when these boundaries change.

Sources: [React lazy](https://react.dev/reference/react/lazy),
[TanStack splitting](https://tanstack.com/router/latest/docs/guide/code-splitting),
[Vite load errors](https://vite.dev/guide/build.html#load-error-handling).

## API contracts and interaction

Apply the consumer responsibilities in the [shared API contract policy](../../../references/api-contracts.md).
Handle actual status/error shapes, cancellation, and bounded retries in the API/query layer. Mocked
fixtures do not establish backend compatibility.

Reuse accessible components and preserve loading, empty, error, and retry states. Retain useful cached
content during refresh. Keep form validation local for usability while the server owns authorization
and persistence. Avoid unsafe HTML and exposing secrets in public environment variables or bundles.
For existing authentication, preserve its supported session design; never introduce browser localStorage
as a secret token store. Authentication and remote services are added only within task scope.

For public submission forms, follow the [shared anti-bot policy](../../../references/public-forms.md)
to recommend protection appropriate to the selected cloud/services and record pending implementation
or configuration. When implemented, coordinate the browser control lifecycle with the actual protected
endpoint. Reuse button loading/disabled styles, handle retries, and ignore stale callbacks on unmount.

## Diagnostics

Reproduce browser failures with console/network evidence and safe correlation IDs from the server.
Distinguish rendering, cache, transport, and backend failures before changing code. Redact tokens and
sensitive responses from logs, traces, and screenshots. Verify the original interaction after the fix.
Do not send user data to analytics or a telemetry service merely to add diagnostics; an explicit
integration must define its privacy boundaries, destination, and failure behavior.
