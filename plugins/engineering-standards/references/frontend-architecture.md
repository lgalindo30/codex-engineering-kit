# Frontend Architecture Selection

Use when starting a frontend or changing its framework, rendering mode or deployment.

## Resolve decisions before scaffolding

Resolve product needs, framework, rendering mode and actual hosting service/runtime before dependent
setup. A cloud name alone may not identify the serving service. Ask only for missing consequential
choices; preserve supported explicit or established choices.

For an unselected stack, discuss these preferences against the actual host:

| Product and host                                                                       | Preference                                                   |
| -------------------------------------------------------------------------------------- | ------------------------------------------------------------ |
| Dynamic admin app on an edge/serverless asset host, including Cloudflare Workers/Pages | React/Vite SPA with the selected backend                     |
| Complex app on a host with a supported Next.js runtime                                 | Next.js, choosing static/server/client rendering per feature |
| Articles, landing pages and mostly static content                                      | Astro with selective islands                                 |

Verify runtime, adapter and feature compatibility. Serverless can support SSR; a server does not require
SSR everywhere. Cloudflare Next.js adapters are an explicit option, not an automatic workaround for the
kit's SPA preference. Explain consequential conflicts before changing the framework, adapter or host.
Respect an explicitly chosen framework, discussing interactive-island/shared-state costs when relevant.

## Feature organization

Keep feature views, components, API operations, query options and form schemas together when useful.
Routes compose views. A shared API client owns transport, correlation and error handling; feature API
operations map resource contracts. Shared UI/transport code does not depend on feature implementations.
Use deliberate public operations/components and [module boundaries](architecture.md#module-dependencies).

A larger SPA feature may contain `components/`, `api.ts`, `queries.ts`, `schemas.ts` and its view.
Add query files only for a selected query/cache integration; extract shared code after real reuse.
Preserve framework-native routes such as Next.js `app/` or Astro `pages/`, server-only dependency
boundaries and route splitting through public exports. See [state ownership](interface.md#state-ownership).

## Record and verify

Record framework, rendering mode, host/service, backend boundary and actual commands in project
instructions. Apply [deployment](deployment.md) and [interface](interface.md) criteria to the changed
scope. Visual identity remains a project decision, independent of framework or component system.
