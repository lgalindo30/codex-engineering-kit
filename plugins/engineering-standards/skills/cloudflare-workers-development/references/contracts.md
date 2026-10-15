# Hono/Zod contracts

Apply [API contract policy](../../../references/api-contracts.md). HTTP and RPC boundaries use runtime
Zod input/output validation; declarations and Hono inference alone do not execute response validation.
Parse mapped DTOs before returning JSON/RPC results; avoid unchecked records and double casts.

Use compatible pinned Hono/Zod/@hono/zod-openapi versions and the integration's supported `z` export.
Define bounded schemas, metadata, content types, and success/error statuses together with `createRoute`
on `OpenAPIHono`. Read validated values through `c.req.valid()` instead of parsing bodies twice.

Mount feature apps with `app.route()` into one OpenAPI document. Configure validation hooks consistently:
parent defaults need not propagate to children. Document middleware rejections (including 429/Turnstile)
and map parsing/validation exceptions through [shared errors](../../../references/api-contracts.md#errors).
Verify malformed JSON, wrong/missing content types, and body limits before buffering on workerd.

Generate/export OpenAPI through the installed integration API and verify every mounted feature appears.
Use Scalar/Swagger UI only when requested; keep internal RPC private. Exercise contracts through real
Worker requests, including rejection from middleware.

Sources: [Hono Zod/OpenAPI](https://hono.dev/examples/zod-openapi),
[integration](https://github.com/honojs/middleware/tree/main/packages/zod-openapi),
[Zod](https://zod.dev/), [OpenAPI](https://spec.openapis.org/oas/latest.html).
