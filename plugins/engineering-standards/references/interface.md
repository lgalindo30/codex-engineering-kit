# Interface behavior and content

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
  solely to obtain a placeholder.
- Content already available at render time needs no artificial loading delay or skeleton.
- Hide decorative shapes from assistive technology, expose a concise loading status and `aria-busy`
  on the actual content region, and respect `prefers-reduced-motion`. Avoid announcing every shape.
- Verify loading-to-content, loading-to-error, cached refresh and reduced-motion behavior where used.

## Client boundaries

- Keep form schemas local to the frontend. Zod form validation serves user experience; the backend
  independently validates and authorizes all input. Do not imply client validation provides security.
- When consuming a public HTTP API, use its supported contract and generated types when useful.
  Static content and internal server calls do not require creating an API or OpenAPI artifact. Keep generated files identifiable and out of manual editing and source-line limits.
- Centralize API origin and version, such as `/api/v1`, in the client layer rather than components.
  Support compatible upgrades deliberately; do not silently consume an unpinned latest contract.
- Do not create `packages/contracts` by default, including in a monorepo. Shared public schema
  packages require an explicit project justification and compatibility with every consumer.
- TypeScript types do not validate network data at runtime. Validate untrusted responses where a
  malformed value can break a trust boundary or consequential operation; document the boundary.
- Render untrusted text safely. Avoid raw HTML; sanitize it with a maintained solution only when
  the product requires rich HTML. Keep secrets out of browser bundles and public environment values.
- For login, follow the selected session design and [authentication guidance](authentication.md).
  Do not persist tokens in browser storage or logs. Coordinate credentialed requests and cross-origin
  defenses with the actual deployment; do not replace supported framework sessions with a token flow.
- Treat date-only values as dates, instants as timezone-explicit values, and recurring local schedules
  as time plus an IANA zone. Format for display without silently changing their meaning.
- For uploads, use the [file policy](files.md) and the producer's public contract to show client limits
  and useful rejection feedback.

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

- [OWASP HTML5 security](https://cheatsheetseries.owasp.org/cheatsheets/HTML5_Security_Cheat_Sheet.html)
- [OWASP XSS prevention](https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html)
