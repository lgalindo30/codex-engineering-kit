# API Contracts

## Ownership and versioning

The backend owns its request/response Zod schemas and the resulting OpenAPI contract. Each frontend,
plugin, or other application owns its local consumption layer and form validation. Do not create
`packages/contracts` by default, even in a monorepo. Shared schemas require an explicit project need,
compatible runtimes, clear ownership, and a version/release policy.

For new APIs, mount resource routes under `/api/v1`. Keep health endpoints separate when useful.
Keep the consumer's API base URL and version in one client configuration. Do not scatter versioned
URLs through components. Use a new major route version for incompatible public behavior, not internal
refactors. Assess response enum changes, required fields, semantics, ordering, and error changes as
well as removed endpoints. Do not promise compatibility based only on a successful TypeScript build.

Prefer a generated local client/types from a versioned OpenAPI artifact for substantial consumers.
Record generator version and a reproducible generation/check command. Avoid importing server runtime
or private schema dependencies into the browser. Generated TypeScript types do not validate network
data; add runtime response validation where the trust boundary requires it.

A small standalone API may expose its generated OpenAPI document at runtime. Once consumers generate
clients or compatibility checks depend on it, provide a reproducible export command and retain a
versioned artifact in the repository or release pipeline. Never maintain a separate hand-edited copy
that can drift from the implementation.

## Schema behavior

Use Hono's maintained Zod/OpenAPI integration compatible with the selected stable versions. Define
request schemas, response schemas, status codes, and content types together. Test that actual JSON
matches the documented schemas; explicit response mapping must prevent accidental private fields.

Validate bodies, path/query parameters, and relevant headers before use. Set concrete text lengths,
array counts, numeric ranges, pagination bounds, and accepted formats. Reject or deliberately strip
unknown input fields; document the choice. Avoid implicit coercion that changes meaning (such as
`"false"` becoming true). Check malformed JSON and incorrect content types consistently.

Schema-validation hooks alone do not cover every framework parsing failure. Exercise malformed JSON
and unsupported media types against actual requests, and map parsing/HTTP exceptions centrally while
preserving the chosen status semantics. Do not classify unrelated server errors as invalid input.

Validate external responses and environment inputs at the boundary where they become trusted. Apply
[file policy](files.md) for uploads and [date policy](dates.md) for temporal fields. Frontend validation
improves usability but does not replace server checks or authorization.

## Errors

Use `application/problem+json` according to RFC 9457. Keep stable `type` identifiers and human-readable
`title`; actual HTTP status and any `status` member must agree. Use safe `detail`, an opaque request or
occurrence identifier where useful, and stable extensions such as `code`, `requestId`, and field errors.
An error `instance` must not reveal a sensitive URL/query. Do not expose internal exceptions or stack traces.

Centralize mapping for validation, malformed input, authentication, authorization, missing resources,
conflicts, rate limits, and unexpected exceptions. Keep public machine-readable codes independent of
translated text. Choose and document 400/422 semantics consistently. Preserve relevant HTTP headers
such as `WWW-Authenticate` or `Retry-After`. Do not turn every exception into a 200 response or classify
an unknown server bug as a client validation error.

## Verification

Test invalid/missing fields, exact limits, malformed payloads, unauthorized access where applicable,
known domain failures, and unexpected failures. Test serialized success responses and documented error
shape. For an API change, compare the OpenAPI artifact with the previous supported version and test
relevant consumers; document breaking changes and migration requirements. A schema snapshot alone
cannot establish semantic compatibility.

## Primary references

- [Hono Zod OpenAPI](https://hono.dev/examples/zod-openapi)
- [Zod documentation](https://zod.dev/)
- [OpenAPI specification](https://spec.openapis.org/oas/latest.html)
- [RFC 9457 Problem Details](https://www.rfc-editor.org/rfc/rfc9457.html)
