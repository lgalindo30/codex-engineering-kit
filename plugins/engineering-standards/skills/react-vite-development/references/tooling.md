# React/Vite tooling

For tooling changes or implementation handoff, apply the
[common quality policy](../../../references/quality.md) alongside the integration details below.

Preserve Vite's framework setup, JSX configuration, and browser/server TypeScript boundaries. Use the
selected package manager and compatible runtime without installing a second runtime for kit helpers.
Configure React-aware lint rules, formatting, and independent type checks; bundling alone is not a
complete type check.

Use production builds to verify assets, base paths, and the selected static hosting strategy. Test
navigation fallback when client routes are added. Keep server credentials out of browser environment
variables. Vitest/React Testing Library and Playwright are useful test defaults; configure them only
for behavior that needs those layers, as described in the local testing reference.

For new routed SPAs, configure compatible @tanstack/react-router and @tanstack/react-query versions.
Select file-based or code-based routes for the project; configure the supported Vite route-generation
integration only when using file-based routing. Do not add TanStack Start or replace Vite to obtain
TanStack Router. Preserve explicitly chosen or established alternatives unless migration is requested.
