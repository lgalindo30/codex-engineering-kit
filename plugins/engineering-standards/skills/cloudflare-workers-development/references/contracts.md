# Hono and Zod Contracts

Apply the [shared API contract policy](../../../references/api-contracts.md) for versioning, mapped
output, safe errors, and artifact ownership. Hono HTTP contracts and Worker RPC methods use runtime
Zod validation at their input and output boundaries.

Use `@hono/zod-openapi` with compatible pinned Hono/Zod versions. Define bounded schemas, route
metadata, content types, and supported success/error statuses together using `createRoute`; register
routes on `OpenAPIHono`. Import the integration's supported `z` export and verify the current Zod
compatibility rather than assuming all major releases interoperate. Read validated request values
through `c.req.valid()`; do not parse a raw body again after validation or duplicate middleware.

Mount feature subapplications with `app.route()` and keep one application-wide OpenAPI document that
includes them. Configure each feature's validation hook consistently: do not assume parent default
hooks are inherited by every child application. Include middleware failures such as 429 or failed
Turnstile verification in the documented contract. Configure central Hono exception/validation mapping
according to [shared errors](../../../references/api-contracts.md#errors); test real parsing failures.

Enforce [runtime schema behavior](../../../references/api-contracts.md#schema-behavior) by parsing the
mapped DTO with its Zod schema before returning Hono JSON or RPC results. Response declarations and
Hono inference alone do not run that validation. Avoid double casts and returning unchecked records.

Check malformed bodies and missing/wrong content types through Hono requests in addition to schema
tests. Verify request-size enforcement before buffering; multipart parsing needs workerd's actual limits.

Generate OpenAPI from the registered route schemas using the integration's supported document API;
follow shared export/versioning criteria. Use a compatible UI such as Scalar or Swagger UI only when
interactive documentation is requested. Keep document exposure deliberate and internal RPC private.

Apply [contract verification](../../../references/api-contracts.md#verification) through real Worker
requests, including middleware rejection. Check all mounted Hono features appear in exported OpenAPI.

Sources to verify when implementing:
[Zod OpenAPI](https://hono.dev/examples/zod-openapi),
[Integration package](https://github.com/honojs/middleware/tree/main/packages/zod-openapi),
[Zod](https://zod.dev/), [OpenAPI](https://spec.openapis.org/oas/latest.html).
