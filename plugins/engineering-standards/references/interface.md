# Interface Behavior and Content

## Components, style, and state

- Follow [styling integration](frontend-styling.md) when changing components or styles.
- Provide applicable loading, empty, failure, retry and success states. Prevent duplicate pending
  mutations and refresh affected data after success.
- Use semantic controls, associated labels, keyboard access, visible focus, adequate contrast and
  accessible errors. Automated checks supplement interaction review.
- Keep user-facing strings in a focused copy module or existing localization system; add an i18n
  library only for a product need.

## State ownership

| State                                     | Owner                                            |
| ----------------------------------------- | ------------------------------------------------ |
| Shareable filters, sorting and pagination | Validated URL parameters in the selected router  |
| Remote data and mutation results          | Selected query cache or framework data mechanism |
| Form values, validation and submission    | Selected form integration                        |
| Temporary interaction state               | Local component or owning feature                |

Use TanStack Query when client remote-data caching/synchronization warrants it. Derive values from their
owner instead of mirroring URL/query state in effects or a global store. Editable drafts need deliberate
refresh/conflict handling. Introduce shared client state for actual cross-component needs.

Represent complex mutually exclusive states and transitions explicitly using the existing framework,
form integration, a reducer or tagged model. A state-machine library is optional.

## Loading placeholders

Use the selected system's Skeleton, or a small styled placeholder, for initial async loading when the
content structure is known. Match final dimensions to reduce layout shifts. Keep cached content visible
during refresh and use button progress for submission; avoid artificial waits for available content.

Hide decorative shapes from assistive technology, expose concise loading status/`aria-busy` on the
content region and respect reduced motion. Check loading-to-content/error and cached refresh behavior.

## Forms, errors and mutations

For new React forms, prefer React Hook Form with local Zod schemas and compatible resolvers. Preserve
selected supported alternatives; a UI system does not select the form-state library. Other frameworks
use their own appropriate controls.

- Validate on blur or submit, then revalidate invalid fields as corrected. Handle empty numeric values,
  optional fields, dates and server errors deliberately. Associate errors, focus the first invalid
  control and preserve values on failure.
- Show accessible pending feedback, prevent duplicate actions, and reset/navigate after confirmed
  success. Keep actionable errors near their field/action; toasts are supplementary. Warn about losing
  meaningful unsaved changes.
- Separate field, HTTP/domain, network and render/load failures. Use error boundaries for rendering
  failures and explicit handling for rejected operations; keep private diagnostics out of public copy.
- Apply [retry/idempotency controls](reliability.md#retries-and-idempotency). Update/invalidate affected
  caches after success. Optimistic updates need rollback/error behavior; preserve useful data on refresh
  failure.

## Navigation and data views

Give navigable views stable framework-router paths. Keep shareable filters/sorting/pagination in
validated URL parameters with defaults and bounds; reset pagination when filters change. Preserve
unrelated parameters, history, refresh and deep links. Keep sensitive data out of URLs.

Provide a useful Not Found page with the correct status where supported. Verify deployed routing so a
SPA fallback does not hide missing API/assets. For large datasets, use server pagination/filtering/sorting;
virtualize when measured needs warrant it. Distinguish empty data from no matches and provide an
accessible small-screen presentation for dense tables.

## Client boundaries

Apply these references only when their boundary exists:

- [API contracts](api-contracts.md): supported versioned consumption, local form schemas, generated
  clients and consequential runtime response validation.
- [Security](security.md): safe text/rich HTML rendering, secret exclusion, server validation and
  authorization. Client validation serves usability.
- [Request correlation](logging.md#request-correlation): create an ID per API request and retain sent
  and returned IDs for failure diagnostics; expose the response header across origins when applicable.
- [Authentication](authentication.md): selected sessions, token storage and cross-origin defenses.
- [Dates](dates.md), [files](files.md) and [public forms](public-forms.md): their respective contracts,
  limits and protection.

## Public content and performance

For public blogs and landing pages, provide crawlable content, unique titles, metadata, canonical URLs,
social previews and appropriate sitemap/robots behavior. Use the real deployment origin. Structured data
must describe visible content; robots directives do not authorize access to private pages.

Size/compress media, reserve layout space, lazy-load below-the-fold media, control fonts and limit shipped
JavaScript. Check responsive layouts, keyboard journeys and agreed budgets against production output;
report measured results using the [shared testing criteria](testing.md).
