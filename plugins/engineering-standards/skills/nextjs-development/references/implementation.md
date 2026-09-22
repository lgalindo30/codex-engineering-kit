# Next.js applications

Preserve the existing router. For a new project, follow the supported framework setup and confirm
runtime/package-manager compatibility. Node.js is a normal deployment choice; Bun is optional.

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

Keep server business rules independent enough to test without browser rendering. Validate and authorize
all server mutation entrypoints, including ownership checks and relevant origin/CSRF defenses. Client
form validation does not replace these controls. Use transactions and database constraints for coupled
writes; keep reviewed migrations outside ordinary request handling and automatic process startup.

For public Route Handlers, document runtime request/response schemas and supported versions. Use a
reproducible OpenAPI artifact when external consumers need one, preserving existing conventions.
Internal server calls do not require an HTTP layer. Map public errors consistently, preserving status
and safe headers; use RFC 9457 where adopted. Avoid leaking stack traces, SQL, tokens, or private fields
into responses, client props, or rendered markup. Validate external data at consequential boundaries.
Bound request and upload sizes before buffering; enforce file count and content limits if uploads exist.

## Diagnostics and user-visible behavior

Reuse accessible components and meaningful loading, empty, failure, and retry states. Preserve useful
content during refresh. Keep transient state local and shareable navigation state in the URL; do not
introduce a duplicate client cache for framework-owned server data without a concrete need.

Preserve the server logger and correlate safe request/mutation errors using bounded identifiers.
Redact cookies, authorization, personal payloads, and error details. Browser diagnostics must not reveal
server secrets or private rendered data. Diagnose the failing boundary with redacted evidence and verify
the original trigger after fixing it. Introduce external telemetry only for an explicit integration,
checking support for the selected server or edge runtime and keeping SDKs out of unrelated client code.

For changed HTTP middleware, verify credentialed origin restrictions, precise proxy trust, security
headers, and actual request-size enforcement rather than inferring protection from middleware presence.
Document database connection limits, persistent paths, backups, and migration recovery when those
boundaries change. Keep health endpoints separate from versioned business APIs when appropriate.
