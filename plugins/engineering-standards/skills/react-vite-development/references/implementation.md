# React/Vite integration

Keep secrets, authorization, persistence, and privileged integrations in the selected server.
Browser environment values are public. Reuse the design system and accessible components; apply
[interface policy](../../../references/interface.md) without adding competing component/state libraries.

## Routes and remote state

For new routed SPAs, use TanStack Router with typed routes, validated search parameters, loading/error
boundaries, and a Not Found view. Keep shareable state in URLs and transient state local. Preserve
back/forward, refresh, and direct links. A screen without navigation needs no router. Apply
[URL/data-view policy](../../../references/interface.md#navigation-and-data-views).

Use TanStack Query for remote reads/mutations and one shared QueryClient/cache. Integrate route loaders
with reusable query keys/options and that same client. Choose supported loading/preload APIs for the
installed versions; make freshness, cancellation, retries, and mutation invalidation deliberate.
Do not duplicate this cache in effects or add TanStack Start merely to obtain TanStack Router.

Follow [API consumer contracts](../../../references/api-contracts.md). Handle actual status/error shapes
in the query/API layer. Mocked fixtures cannot establish backend compatibility.

## Sessions, forms, and files

Apply [authentication policy](../../../references/authentication.md) to existing/requested sessions.
The server/provider owns credentials and session lifecycle; route guards control navigation only.
Clear private query data on session loss and prevent stale requests from repopulating a new session.
Coordinate refresh across concurrent failures when the client owns it; verify browser origin/cookies.

Keep usability validation local and authorization server-side. Apply
[public-form policy](../../../references/public-forms.md) for submission protection and pending setup.
Coordinate widget callbacks with the real endpoint, pending/disabled controls, retries, and unmount.

For files, apply [file policy](../../../references/files.md) using the producer's documented limits.
Handle progress, cancellation, 413/type/access errors, and retry without duplicate uploads. Render names
as text; revoke preview object URLs on replacement/unmount. Invalidate affected queries after mutations
and clear private previews on session changes. Test server rejection with small local fixtures.

## Code loading and diagnostics

For substantial SPAs, split feature routes and expensive optional dependencies using supported router
splitting or module-scope React.lazy/Suspense. Keep the shell available and preload selectively.
Inspect production chunks/network requests: eager imports or barrels can defeat dynamic imports.
Handle stale/failed chunks with bounded recovery, appropriate HTML/hashed-asset caching, and preserved
unsaved work. Verify deferred requests and recovery through production-like serving on any host.

Diagnose rendering, cache, transport, and backend failures with redacted browser console/network evidence
and server correlation IDs. Verify the original interaction after fixing it.

Sources: [Vite](https://vite.dev/guide/),
[TanStack external data](https://tanstack.com/router/latest/docs/guide/external-data-loading),
[Query](https://tanstack.com/query/latest/docs/framework/react/reference/index),
[React lazy](https://react.dev/reference/react/lazy),
[Router splitting](https://tanstack.com/router/latest/docs/guide/code-splitting),
[Vite load errors](https://vite.dev/guide/build.html#load-error-handling).
