# Workers Architecture

Use TypeScript ESM source and a typed `src/worker.ts` entrypoint rather than handwritten `.mjs`
application files. Workers execute in workerd; Bun APIs, Node listeners, mutable global request state,
and process-lifecycle assumptions do not belong in Worker application code. Reuse immutable schemas
and route definitions at module scope; create request-dependent services from that request's bindings.

## Cohesive features

Apply [feature architecture](../../../references/architecture.md#cohesive-modules). In Hono, a larger
feature can contain `routes.ts`, `schemas.ts`, `service.ts`, and `repository.ts`; a small feature can
keep route/schema declarations together. A useful Workers layout is:

```text
src/
  worker.ts
  app.ts
  features/
    contacts/
      routes.ts
      schemas.ts
      service.ts
      repository.ts
  platform/
    database.ts
    logger.ts
```

Compose feature-level `OpenAPIHono` subapplications using `app.route()` under the supported API prefix.
Keep handlers thin and colocated with typed route definitions; preserve route inference rather than
using generic `Context` controllers and unsafe casts. For separated handlers use the installed
integration's route-handler types or supported Hono factories. Business services receive validated
values and explicit dependencies, not the whole Hono context. Repository adapters own D1 access.

Hono owns HTTP routing under `fetch`. Explicitly compose `fetch`, `scheduled`, `queue`, or other
platform handlers only when required. Apply [background-work reliability](../../../references/reliability.md)
with the real execution context's `waitUntil()` for appropriate post-response work; it is not a
durable queue. Use Queues or Workflows when durability/retries are required by the task.
Stream large responses and bound any
buffered request or external response; use [file limits](../../../references/files.md) for uploads.

## Separate Workers

Use [service-boundary criteria](../../../references/architecture.md#separate-services) to decide
whether a feature needs its own Worker. Each Worker's bindings and persistence follow its ownership.

Use Service Bindings for Worker-to-Worker calls. Prefer RPC via a platform `WorkerEntrypoint` for
internal operations; use HTTP bindings when the existing Request/Response boundary is useful. Hono's
typed HTTP client and Cloudflare RPC are different mechanisms. Keep RPC methods narrow, validate input
and output with Zod using [shared contracts](../../../references/api-contracts.md), and apply
[service security](../../../references/security.md#service-boundaries). A binding does not automatically
transfer the caller's Cloudflare Access context.

Apply [call reliability](../../../references/reliability.md), verifying timeout/cancellation support
for the chosen HTTP/RPC transport. Keep internal entrypoints private using appropriate routes/workers.dev
configuration and bindings rather than public fetch URLs. Configure each environment's target
explicitly; local tests must reach disposable local peers.

## Logging

Apply [structured logging](../../../references/logging.md) with a Workers-supported console logger.
Production application output is restricted to `warn` and `error`; default the level to `warn` and
do not add routine request/success logs or Hono access logging middleware. Development diagnostics may
be temporarily more verbose.

Enable Workers Logs while disabling automatic invocation logs through
`observability.logs.invocation_logs: false` in Wrangler configuration. Keep explicit warning/error
console methods so Cloudflare records their severity. Apply the shared sampling/redaction policy.
Verify config against the installed schema: successful requests produce no application/access logs,
while unexpected failures produce one safe correlated error.

Sources to verify when implementing:
[Workers best practices](https://developers.cloudflare.com/workers/best-practices/workers-best-practices/),
[Hono architecture](https://hono.dev/docs/guides/best-practices),
[Service Bindings](https://developers.cloudflare.com/workers/runtime-apis/bindings/service-bindings/),
[Workers Logs](https://developers.cloudflare.com/workers/observability/logs/workers-logs/).
