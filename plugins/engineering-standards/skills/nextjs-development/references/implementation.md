# Next.js applications

Preserve the existing router. For a new project, follow the supported framework setup and confirm
runtime/package-manager compatibility. Node.js is a normal deployment choice; Bun is optional.
For new framework/host decisions, use [architecture selection](../../../references/frontend-architecture.md).

A request for Node.js plus Next.js can describe one integrated application. Do not create a second
backend, Hono dependency, or extra repository just because Node is mentioned. Where a separate API
already exists or is requested, preserve its ownership and avoid duplicating business rules.

- In App Router, keep server data access and secrets server-side. Add client boundaries only where
  browser APIs or interaction require them; avoid making the entire tree client-rendered for one control.
- Validate and authorize integrated Route Handlers and server mutations. Treat them as server entrypoints,
  not trusted calls merely because the UI invokes them. Do not require OpenAPI for internal component
  calls; use explicit contracts for public HTTP consumers.
- Fetch server-owned data directly from its server layer when appropriate rather than adding a needless
  HTTP round trip through the same application. Reuse the selected external API when it owns the data.
- Verify caching, invalidation, loading, and error semantics against the installed Next.js version.
  Do not copy stale cache defaults or duplicate framework fetching with a client cache without a need.
- Configure framework-aware types and lint. Verify production build and the selected runtime start path.
  Browser or integration tests must cover server rendering and server mutations; component mocks alone
  cannot establish them. See [testing](testing.md).

Official references:
[Server and Client Components](https://nextjs.org/docs/app/getting-started/server-and-client-components),
[Backend for Frontend](https://nextjs.org/docs/app/guides/backend-for-frontend).

## Contracts, persistence, and safe errors

Apply [feature architecture](../../../references/architecture.md),
[call reliability](../../../references/reliability.md), and [persistence](../../../references/persistence.md)
to changed server boundaries. Keep business rules testable without browser rendering. Validate and authorize
all server mutation entrypoints, including ownership checks and relevant origin/CSRF defenses. Client
form validation does not replace these controls. Apply the shared consistency and migration criteria
with the database adapter supported by the selected Next.js server or edge runtime.

For public Route Handlers, apply the [shared API contract policy](../../../references/api-contracts.md),
preserving established conventions. Internal server calls do not require an HTTP layer. Avoid leaking
stack traces, SQL, tokens, or private fields into responses, client props, or rendered markup.
Validate external data at consequential boundaries.
Bound request and upload sizes before buffering; enforce file count and content limits if uploads exist.

## Diagnostics and user-visible behavior

Give navigable views native file-system routes and implement the chosen router's Not Found convention
(App Router `not-found.tsx`, or the Pages Router equivalent). Apply
[URL/data-view policy](../../../references/interface.md#navigation-and-data-views) to filters, sorting
and pagination. Keep Next.js routing; do not add a SPA router to satisfy this policy. Verify actual
not-found response semantics, including streaming, with the installed framework and host.

Use native route loading/error boundaries and split expensive optional client features when useful.
Do not wrap the entire application in a client boundary or disable SSR indiscriminately for UI
primitives. Apply [interface policy](../../../references/interface.md) to React Hook Form/Zod,
mutation feedback and accessible component behavior with the selected server entrypoints.

Reuse accessible components and meaningful loading, empty, failure, and retry states. Preserve useful
content during refresh. Keep transient state local and shareable navigation state in the URL; do not
introduce a duplicate client cache for framework-owned server data without a concrete need.

Apply [shared logging and request correlation](../../../references/logging.md) to server diagnostics.
Preserve the established logger; for new integrated backends on Node.js, prefer server-only Pino with
structured console output and request-scoped child loggers. Verify the installed Next.js/runtime and
transport support, especially when Bun is selected; do not impose Node-specific transports on Edge.
Use a compatible native console adapter for Edge when needed and keep server logging out of client bundles.
Map public Route Handler errors centrally to the shared Problem Details contract; preserve native
Server Action/rendering error semantics. Where supported, use `instrumentation.ts`/`onRequestError`
for framework-captured failures, coordinating with handled-error logging to avoid duplicate records.
The framework's development logging is separate from structured production application logs.
Browser diagnostics must not reveal server secrets or private rendered data. Diagnose failures with
redacted evidence and verify the original trigger after fixing it. Introduce external telemetry only
for an explicit integration, checking support for the selected runtime.

Integration references: [Pino](https://github.com/pinojs/pino),
[Next.js instrumentation](https://nextjs.org/docs/app/api-reference/file-conventions/instrumentation),
[server packages](https://nextjs.org/docs/app/api-reference/config/next-config-js/serverExternalPackages).

For public submission forms, follow the [shared anti-bot policy](../../../references/public-forms.md)
to recommend protection appropriate to the selected cloud/services and record pending implementation
or configuration. When implemented, protect the actual Route Handler or server mutation, keep
provider credentials server-side, and verify client pending/retry states at the real serving boundary.

For changed HTTP middleware, verify credentialed origin restrictions, precise proxy trust, security
headers, and actual request-size enforcement rather than inferring protection from middleware presence.
Document database connection limits, persistent paths, backups, and migration recovery when those
boundaries change. Keep health endpoints separate from versioned business APIs when appropriate.
