# Frontend Architecture Selection

Use when starting a frontend or changing its framework, rendering mode, or deployment. Inspect the
prompt, project instructions, code and selected hosting first. Explicit user choices take precedence;
otherwise preserve the established supported architecture. Do not migrate a framework or design system
merely because another option is preferred here.

## Resolve decisions before scaffolding

Establish the product's interaction/content needs, selected framework, rendering requirements and actual
deployment service/runtime. A cloud name alone may not identify the serving service. Ask concise
questions for missing decisions that materially affect implementation before scaffolding or configuring
the dependent stack. Do not ask again for information already supplied or block an unrelated small edit.

When no framework has been chosen, discuss these preferences against the actual host:

- For dynamic administrative applications on an edge/serverless asset host, prefer a React/Vite SPA
  with its selected backend. On Cloudflare Workers/Pages this is the preferred dashboard/CRM shape.
- For complex applications on a host selected for a supported Next.js runtime, prefer Next.js and
  decide static, server and client rendering per feature. Having a server does not require every route
  to use SSR; serverless deployment does not inherently exclude SSR.
- For articles, landing pages and mostly static content, prefer Astro with selective islands.
  Build-time output can be served by the chosen static host or server without a rendering process.

These are project preferences, not universal framework/platform compatibility claims. Verify the
selected runtime, adapter and framework features before claiming support. Do not silently introduce
an edge adapter, container, another hosting service or a different framework to reconcile conflicting
choices. Explain the tradeoff and ask for the consequential decision. Cloudflare Next.js adapters are
an explicit option to discuss, not the default workaround for this kit's SPA preference.

If Astro or another supported framework is explicitly selected for a complex application, respect it.
Explain the costs of numerous interactive islands or shared client state and suggest alternatives
when useful; proceed with the user's choice once required hosting/rendering decisions are resolved.

## Feature organization

Keep a feature's views, specific components, API operations, query options and local form schemas
together when their size warrants separation. Routes compose views; the shared API client owns common
transport, correlation and error handling, while feature API operations map their own resource contracts.
Shared UI primitives and transport utilities must not depend on feature implementations. Integrate
features through deliberate public operations/components instead of reaching into another feature's
private files. Apply [module boundaries](architecture.md#module-dependencies) where relevant.

A larger React SPA may use this layout; the names and files are illustrative, not a scaffold mandate:

```text
src/
  features/
    orders/
      components/
      api.ts
      queries.ts
      schemas.ts
      OrdersView.tsx
  components/
    ui/
  lib/
    api-client.ts
```

Only add `queries.ts` when a client query/cache integration is used. Extract shared code after real
reuse; do not create empty directories for a small page. Preserve framework-native route files such
as Next.js `app/` or Astro `pages/`, and keep server-only services/adapters outside client dependency
graphs. Sharing a feature directory does not authorize importing server code into a browser bundle.
Public exports must preserve intended route splitting rather than eagerly importing every feature.
Use [state ownership](interface.md#state-ownership) to choose where behavior belongs.

## Record and verify

Record the agreed framework, rendering mode, host/service, backend boundary and real commands in the
project instructions. Apply [deployment controls](deployment.md) and [interface policy](interface.md)
only to the relevant scope. Resolve visual identity per project; no fixed palette, font, theme or
administrative layout is imposed by selecting a framework or component system.
