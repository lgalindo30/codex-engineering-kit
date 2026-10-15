# Frontend behavior

[Evaluation setup and recording](../../behavioral-validation.md#run-an-evaluation).

## React/Vite administration frontend — not run

Prompt:

> Build a responsive inventory administration SPA with React and Vite consuming the supplied versioned
> OpenAPI contract. Include list and creation routes, shareable list filters, and useful empty/error
> states. The API runs separately.

Supply an actual small contract fixture and a disposable API or declared mock before execution.

Accept when the result:

- Uses React/Vite with business persistence in the supplied API. For a new unselected design system,
  uses Tailwind and relevant shadcn components with React Hook Form/Zod; preserves selected alternatives.
- Centralizes API origin/version, uses local Zod form schemas, and does not create shared contracts.
- Distinguishes generated compile-time types from any required runtime response validation.
- For the new routed SPA, uses TanStack Router and TanStack Query with one QueryClient and reusable
  query keys/options. Route loading and component reads share the same remote cache.
- Verifies back/forward, refresh, direct links, validated filters, mutation invalidation, loading/error
  states, and accessible labels/focus. Does not replace Vite with TanStack Start.
- Includes meaningful Vitest/Testing Library coverage and browser evidence for critical behavior.
- Includes Not Found, URL sorting/pagination, guarded pending forms with retained values/field focus,
  and actual production route splitting/failure recovery for substantial SPA features.
- Keeps default copy and instructions in English and accurately states whether API tests were mocked.

Repeat with an established or explicitly requested alternative router/data library. Accept preservation
of that choice unless migration is requested; record this as a separate run.

## Static public site — not run

Prompt:

> Build a mostly static product landing page and blog. Search discoverability and fast loading are
> important. No accounts, database, or API are needed.

Accept when the result chooses Astro with limited islands only if needed; includes meaningful SEO
metadata, crawlable content, responsive assets, and measured production-build checks; and avoids
unneeded component systems, authentication, telemetry, queues, database, or a separate backend.

## Frontend architecture and existing design systems — not run

Prompt:

> Plan this frontend against the supplied project context. Identify consequential missing decisions
> before scaffolding. Keep explicit framework, host and design-system choices; explain tradeoffs and
> outline implementation/verification without installing dependencies or deploying services.

Use distinct fixtures: an unspecified CRM host; React with a missing hosting service; Cloudflare
Workers administrative frontend; a supported Next.js Node host; mostly static content; explicitly
selected Astro with interactive forms; selected Next.js on Workers without an adapter decision; and
an existing Ant Design/router/form stack receiving a small feature. Do not disclose expected selections
to the evaluating agent. Record actual results separately from this rubric.

Accept when consequential missing choices produce focused questions before dependent scaffolding,
known choices are not asked again, explicit Astro/Ant Design survive, and new-stack preferences fit
the selected host without declaring SSR universally incompatible with serverless. Existing projects
do not acquire Tailwind, shadcn, another router/form system or a framework migration automatically.
