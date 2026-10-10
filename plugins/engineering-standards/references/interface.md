# Interface behavior and content

## Components, style, and state

- Respect explicit or established design systems, including Ant Design. For new projects without
  a selected system, prefer Tailwind and add shadcn/ui for complex React controls. Read
  [styling integration](frontend-styling.md) only when setting up or changing styling/components.
- Resolve identity and tokens per project. Reuse shared components in `components/` or its established
  equivalent; keep single-view components near their view/feature and extract only real reuse.
- Keep transient UI state local. Use TanStack Query when client-side remote data caching, mutations,
  or synchronization justify it; apply [state ownership](#state-ownership) rather than maintaining
  competing copies.
- Provide loading, empty, failure, retry, and success behavior where each state is possible. Prevent
  accidental repeated mutations and invalidate relevant cached data after successful changes.
- Use semantic controls, associated labels, keyboard access, visible focus, adequate contrast, and
  accessible error messages. Treat automated accessibility checks as one input, not complete proof.
- Keep default user-facing strings in a focused copy module or the existing localization system.
  Use English unless another language is requested; do not add an i18n library without a use case.

## State ownership

| State                                     | Owner                                            |
| ----------------------------------------- | ------------------------------------------------ |
| Shareable filters, sorting and pagination | Validated URL parameters in the selected router  |
| Remote data and mutation results          | Selected query cache or framework data mechanism |
| Form values, validation and submission    | Selected form integration                        |
| Temporary interaction state               | Local component or owning feature                |

Derive values from the authoritative state instead of synchronizing duplicate copies through effects.
Do not mirror URL filters or query results in a global store. A form may own an intentional editable
draft of remote data; define how refresh/conflicts affect it instead of overwriting unsaved values.
Introduce shared client state only for a real cross-component need, preserving an established manager
and using the smallest sufficient mechanism. Do not add a state library as an architecture checklist.

For complex flows such as multi-step forms, represent mutually exclusive states and allowed transitions
explicitly instead of combining contradictory booleans. Use the existing form/framework mechanism,
a reducer or a tagged state model when useful; do not install a state-machine library by default.
Exercise relevant transitions, failure/retry paths and preservation of unsaved state.

## Loading placeholders

Use Skeleton for an initial asynchronous wait when the eventual content structure is known. Match
its dimensions to the final cards, text, or list to reduce layout shifts. Keep useful existing data
visible during background refresh; use a modest progress indicator for refresh or submission rather
than replacing the whole page. Handle empty and failed responses explicitly so placeholders end.

- Reuse the chosen component system's Skeleton, or a small Tailwind/custom-style placeholder in the
  selected framework. Share dimensions, radius and colors through tokens. Do not install a UI system
  solely for a placeholder. Use accessible button progress for submissions.
- Content already available at render time needs no artificial loading delay or skeleton.
- Hide decorative shapes from assistive technology, expose a concise loading status and `aria-busy`
  on the actual content region, and respect `prefers-reduced-motion`. Avoid announcing every shape.
- Verify loading-to-content, loading-to-error, cached refresh and reduced-motion behavior where used.

## Forms, errors and mutations

For new React forms, use React Hook Form with local Zod schemas and compatible resolvers. Preserve
an explicitly chosen or established supported form integration rather than silently replacing it.
Selecting a UI component system alone does not select its form-state/validation library.
Non-React forms retain their framework's appropriate controls; do not add React solely for this policy.

- Prefer validation on blur or submit, then revalidate invalid fields as they are corrected. Associate
  errors with fields, focus the first invalid control, and preserve values on failure. Deliberately
  handle empty numeric values, optional fields, dates and server validation errors rather than coercing
  empty input into a valid value. The server independently validates and authorizes mutations.
- Prevent duplicate pending actions and expose accessible loading/disabled feedback. Reset or navigate
  only after confirmed success. Keep recoverable operation errors visible near the action; toasts may
  supplement feedback but must not be the only field/error record. Warn about losing unsaved changes
  when meaningful; do not prompt for every untouched form or ordinary navigation.
- Separate field, HTTP/domain, connection and render/load failures. Map the producer's contract to
  actionable messages without exposing private diagnostics. Use appropriate error boundaries for
  rendering/module failures; they do not replace handling rejected network/form operations.
- Apply [call reliability](reliability.md) for bounded retries and mutations. Do not automatically
  replay a write after an uncertain result without supported idempotency/reconciliation. Invalidate
  or update affected caches on success; use optimistic updates only with deliberate rollback/error
  behavior, and retain useful data when background refresh fails.

## Navigation and data views

Give each navigable page/view a stable path such as `/dashboard` or `/profiles`, using the framework's
router. Put shareable filters, sorting and pagination in validated URL search parameters; define
defaults/bounds and reset pagination when filters change. Preserve unrelated parameters and browser
back/forward, refresh and direct links. Keep transient inputs local and sensitive data out of URLs.

Include a useful Not Found page for unknown routes, with navigation back to valid content. Verify it
through the actual framework and host; a generic SPA fallback must not disguise missing API/assets.
Native server/static routing should return the appropriate HTTP status where supported.

For large data sets, use supported server-side pagination/filtering/sorting rather than downloading
everything. Virtualize long lists when measured needs warrant it. Distinguish an empty data set from
no filter matches; define an accessible small-screen presentation for tables and dense dashboards.
Verify history restoration, errors/retry, empty states and cache consistency after changes.

## Client boundaries

- Keep form schemas local to the frontend. Zod form validation serves user experience; the backend
  independently validates and authorizes all input. Do not imply client validation provides security.
- When consuming a public HTTP API, use its supported contract and generated types when useful.
  Static content and internal server calls do not require creating an API or OpenAPI artifact. Keep generated files identifiable and out of manual editing and source-line limits.
- Centralize API origin and version, such as `/api/v1`, in the client layer rather than components.
  Support compatible upgrades deliberately; do not silently consume an unpinned latest contract.
- Apply [request correlation](logging.md#request-correlation) in the shared API client, including
  `X-Request-ID` creation, response diagnostics and cross-origin header access when applicable.
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
- For public unauthenticated submission forms, follow [anti-bot guidance](public-forms.md) for the
  selected cloud/services and record pending setup. When implemented, keep automatic verification and
  success hidden, reveal required interaction, and show loading feedback on disabled pending actions.

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
