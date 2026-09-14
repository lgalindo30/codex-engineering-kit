# Frontend Decisions

## Framework and boundaries

When no frontend technology is specified, choose from the actual scope: React + Vite SPA for a
simple interactive application, Astro for static/content-led sites, and Next.js for complex
applications. Explain the choice briefly in the project AGENTS.md. Existing explicit choices prevail.

- Default to React and strict TypeScript. Prefer Bun for package management and tooling; allow Node
  when a required tool needs it and document the exception and supported version.
- Choose Astro for mostly static blogs, documentation, and landing pages. Add React islands only
  where interaction is needed. Do not ship an application-sized client runtime for static content.
- Choose Next.js for complex SaaS, ERP, and CRM frontends. Its rendering features remain available;
  the default business API and persistence live in the standalone Bun/Hono backend. Add business
  endpoints inside Next.js only when the user explicitly requests an integrated backend.
- For a smaller standalone React SPA, use a suitable lightweight build tool such as Vite.
- Use each framework's native routing. Consider TanStack Router for a React SPA that needs routing;
  do not add a competing router to Next.js or Astro by default.
- Select stable compatible versions from current official documentation and record the choices.

## Components, style, and state

- Use Ant Design when rich forms, tables, and CRUD workflows benefit from its component system.
  Prefer plain CSS or CSS Modules for bespoke marketing pages and other focused interfaces.
  Tailwind is not a default dependency. Respect an existing project's chosen design system.
- Reuse cohesive components and style tokens. Extract shared behavior when there are real consumers,
  while keeping feature-specific components close to their feature.
- Keep transient UI state local. Use TanStack Query when client-side remote data caching, mutations,
  or synchronization justify it; do not duplicate framework-managed server data without a reason.
- Provide loading, empty, failure, retry, and success behavior where each state is possible. Prevent
  accidental repeated mutations and invalidate relevant cached data after successful changes.
- Use semantic controls, associated labels, keyboard access, visible focus, adequate contrast, and
  accessible error messages. Treat automated accessibility checks as one input, not complete proof.
- Keep default user-facing strings in a focused copy module or the existing localization system.
  Use English unless another language is requested; do not add an i18n library without a use case.

## Loading placeholders

Use Skeleton for an initial asynchronous wait when the eventual content structure is known. Match
its dimensions to the final cards, text, or list to reduce layout shifts. Keep useful existing data
visible during background refresh; use a modest progress indicator for refresh or submission rather
than replacing the whole page. Handle empty and failed responses explicitly so placeholders end.

- With Ant Design, reuse its `Skeleton` and supported variants, including in a React SPA. Consult
  the installed version before using props or semantic style APIs. Use button loading for submissions.
- Without Ant Design, implement a reusable CSS/CSS Modules Skeleton component in the chosen framework;
  share dimensions, radius, colors and optional shimmer through tokens. Do not install a UI framework
  solely to obtain a placeholder. This also applies to dynamic Astro islands when appropriate.
- Static Astro content available at build/server render needs no artificial loading delay or skeleton.
- Hide decorative shapes from assistive technology, expose a concise loading status and `aria-busy`
  on the actual content region, and respect `prefers-reduced-motion`. Avoid announcing every shape.
- Verify loading-to-content, loading-to-error, cached refresh and reduced-motion behavior where used.

## Contracts and trust boundaries

- Keep form schemas local to the frontend. Zod form validation serves user experience; the backend
  independently validates and authorizes all input. Do not imply client validation provides security.
- Consume a pinned/versioned backend OpenAPI artifact and prefer a generated client or types when
  practical. Keep generated files identifiable and out of manual editing and source-line limits.
- Centralize API origin and version, such as `/api/v1`, in the client layer rather than components.
  Support compatible upgrades deliberately; do not silently consume an unpinned latest contract.
- Do not create `packages/contracts` by default, including in a monorepo. Shared public schema
  packages require an explicit project justification and compatibility with every consumer.
- TypeScript types do not validate network data at runtime. Validate untrusted responses where a
  malformed value can break a trust boundary or consequential operation; document the boundary.
- Render untrusted text safely. Avoid raw HTML; sanitize it with a maintained solution only when
  the product requires rich HTML. Keep secrets out of browser bundles and public environment values.
- For requested login, follow backend session policy: short-lived access tokens in memory and
  refresh tokens in protected cookies. Do not persist tokens in localStorage or log them. Coordinate
  credentialed requests, CORS, SameSite, and CSRF protection with the backend's actual topology.
- Treat date-only values as dates, instants as timezone-explicit values, and recurring local schedules
  as time plus an IANA zone. Format for display without silently changing their meaning.
- Show client upload limits for usability while the backend enforces them. The default ceiling is
  10,000,000 bytes per file unless the user specifies another limit.

## Public content and performance

- Treat SEO and performance as acceptance criteria for public blogs and landing pages. Deliver
  crawlable content, descriptive unique titles, metadata, canonical URLs, social previews, and
  sitemap/robots behavior appropriate to the actual deployment. Never invent a production origin.
- Use structured data only when it accurately describes visible content. Keep private application
  pages out of public indexing as appropriate; robots directives are not authorization controls.
- Size and compress images, reserve layout space, load below-the-fold media lazily, control font
  loading, and limit shipped JavaScript. Check production builds rather than inferring performance
  from a development server. Record measured results and environment instead of claiming guarantees.
- Verify responsive layouts and key keyboard interactions. Prioritize critical user paths and
  agreed performance budgets rather than imposing identical budgets on every product.

## Sources to check when implementing

- [React](https://react.dev/learn)
- [Astro](https://docs.astro.build/en/concepts/why-astro/)
- [Next.js](https://nextjs.org/docs)
- [TanStack Query](https://tanstack.com/query/latest/docs/framework/react/overview)
- [TanStack Router](https://tanstack.com/router/latest/docs/framework/react/overview)
- [Ant Design](https://ant.design/docs/react/introduce/)
- [OWASP HTML5 security](https://cheatsheetseries.owasp.org/cheatsheets/HTML5_Security_Cheat_Sheet.html)
- [OWASP XSS prevention](https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html)
