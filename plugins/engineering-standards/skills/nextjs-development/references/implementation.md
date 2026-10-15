# Next.js integration

Preserve the router and supported framework setup. Node.js is a normal host; Bun is optional when
compatible. A Node.js/Next.js application can own its backend; avoid extra HTTP hops or a second API
unless an existing/requested service owns that data.

## Server and client boundaries

In App Router, keep server data/secrets server-side and add client boundaries only for browser APIs
or interaction. Validate/authorize Route Handlers and server mutations, including ownership and
applicable origin/CSRF defenses. UI invocation does not make input trusted. Apply
[feature architecture](../../../references/architecture.md), [reliability](../../../references/reliability.md),
and [persistence](../../../references/persistence.md) to changed server boundaries.

Apply [API contracts](../../../references/api-contracts.md) to public Route Handlers; internal component
calls need neither HTTP nor OpenAPI. Preserve native Server Action/rendering error semantics while
mapping public HTTP errors centrally. Keep private data out of responses, client props, and markup.

Apply [authentication policy](../../../references/authentication.md) to session work. Verify library
support on the actual server/edge runtime and prevent cached rendering from leaking session data.
An integrated session needs no separate Bearer-token service. For uploads, apply
[file policy](../../../references/files.md), checking adapter parsing/body ceilings before buffering.
Use local storage only with persistent writable hosting; static exports use the selected server API.

## Rendering and interaction

Verify installed-version caching, invalidation, loading, and error semantics. Do not add duplicate
client caches for framework-owned data without a concrete need. Use native routes, loading/error
boundaries, and Not Found conventions, verifying status semantics including streamed responses.
Apply [interface policy](../../../references/interface.md) for accessible controls, forms, shareable
URL state, and mutation feedback. Split expensive client features without disabling SSR broadly.

Apply [public-form policy](../../../references/public-forms.md) at the real Route Handler/server
mutation; keep credentials server-side and exercise client pending/retry behavior there.

## Diagnostics

Apply [logging policy](../../../references/logging.md). Preserve the logger; new Node integrated
backends can use server-only Pino console output and request-scoped loggers. Verify transport support
on the selected runtime; Edge may need native console. Keep logging imports out of client bundles.
Where supported, use `instrumentation.ts/onRequestError` for framework-captured failures, coordinating
with handled-error logging to avoid duplicates. Development output is separate from production logs.
For changed HTTP middleware, verify origin restrictions, proxy trust, headers, and body-size enforcement.

Sources: [Server/client components](https://nextjs.org/docs/app/getting-started/server-and-client-components),
[Backend for Frontend](https://nextjs.org/docs/app/guides/backend-for-frontend),
[instrumentation](https://nextjs.org/docs/app/api-reference/file-conventions/instrumentation),
[server packages](https://nextjs.org/docs/app/api-reference/config/next-config-js/serverExternalPackages).
