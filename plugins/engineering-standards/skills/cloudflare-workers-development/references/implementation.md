# Workers integration

Use TypeScript ESM and a typed Worker entrypoint. Workers execute in workerd: no Bun APIs, Node
listeners, mutable global request state, or process-lifecycle assumptions. Reuse immutable schemas/routes
at module scope; create request-dependent services from the current bindings.

## Features and handlers

Apply [feature architecture](../../../references/architecture.md#cohesive-modules). Larger Hono features
can separate routes/schemas/service/repository; small ones can keep route/schema declarations together.
Compose `OpenAPIHono` features with `app.route()`. Keep typed route handlers and inference instead of
generic `Context` controllers/casts. Business services receive validated values and explicit dependencies,
not the entire context; repository adapters own D1 access.

Hono owns `fetch` routing. Add `scheduled`/`queue`/platform handlers only when required. Apply
[background reliability](../../../references/reliability.md): `waitUntil()` supports appropriate post-response
work but is not a durable queue. Choose Queues/Workflows when required durability or retries justify them.
Stream large responses and bound buffered input/upstream responses using [file policy](../../../references/files.md).

## Separate Workers

Apply [service-boundary criteria](../../../references/architecture.md#separate-services) before splitting.
Each Worker's bindings/persistence follow ownership. Prefer Service Binding RPC via `WorkerEntrypoint` for
internal operations; use HTTP bindings for existing Request/Response boundaries. Hono's typed HTTP
client and Cloudflare RPC differ. Validate narrow RPC inputs/outputs using
[contracts](../../../references/api-contracts.md) and [service security](../../../references/security.md#service-boundaries).

Bindings do not transfer Cloudflare Access context automatically. Keep internal entrypoints private
through routes/workers.dev configuration and permissions, with explicit per-environment targets.
Apply [call reliability](../../../references/reliability.md), verifying transport timeout/cancellation.
Use disposable local peers for integration tests.

## Logging

Apply [logging policy](../../../references/logging.md). Preserve a compatible logger; new Workers use
native structured console output. A small request adapter may attach/redact context and filter levels;
no Pino or custom framework is needed. Use `console.warn/error` so Cloudflare records correct severity.
Default production output to warnings/errors with `requestId`; omit routine success/access logs. Explicit
project requirements may enable other levels; development diagnostics may be temporarily more verbose.

Enable Workers Logs with `observability.logs.invocation_logs: false`. Verify the installed schema and
that success emits no routine logs while unexpected failure emits one safe correlated error.
Workers Logs stores output; it is not the application logger.

Sources: [Best practices](https://developers.cloudflare.com/workers/best-practices/workers-best-practices/),
[Hono](https://hono.dev/docs/guides/best-practices),
[Service Bindings](https://developers.cloudflare.com/workers/runtime-apis/bindings/service-bindings/),
[Workers Logs](https://developers.cloudflare.com/workers/observability/logs/workers-logs/).
