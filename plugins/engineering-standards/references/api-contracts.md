# API Contracts

## Ownership and versioning

The backend owns runtime request/response schemas and OpenAPI. Consumers own local consumption and form
validation. Do not create `packages/contracts` by default; shared schemas need compatible runtimes,
ownership and a version/release policy.

For new APIs, use `/api/v1` resource routes, separating health endpoints when useful. Centralize consumer
base URL/version. New major routes represent incompatible public behavior. Review changes to required
fields, enums, semantics, ordering and errors as well as removed endpoints.

Prefer generated local clients/types for substantial consumers, with a pinned generator and reproducible
check command. Keep server/private dependencies out of browsers. Generated types need runtime validation
where the trust boundary requires it.

A small standalone API may serve generated OpenAPI at runtime. When client generation or compatibility
checks depend on it, provide a reproducible export and versioned artifact in the repository or pipeline.
Do not maintain a hand-edited duplicate.

Internal RPC/delegated operations need validated input/output, serialization and safe failure contracts;
they do not require public HTTP/OpenAPI endpoints.

## Schema behavior

Use the framework's maintained integration. Define request/response schemas, status and content types
together. Map responses explicitly to exclude private fields and validate serialized output at trust
boundaries, including transformed dates. Output-validation failures are internal errors.

Validate bodies, path/query parameters and relevant headers with concrete length/count/range/pagination
limits. Reject or deliberately strip unknown fields. Avoid coercion that changes meaning. Handle malformed
JSON, unsupported content types and parsing exceptions centrally without turning server bugs into client
errors. Schema hooks may not cover framework parsing failures.

Validate external responses and environment values where they become trusted. Apply [files](files.md)
and [dates](dates.md) when relevant. Frontend validation does not replace server checks or authorization.

## Errors

Use RFC 9457 `application/problem+json` with stable `type`, human-readable `title`, safe `detail` and
extensions such as `code`, `requestId` or field errors. HTTP status and any `status` member agree.
Do not expose exceptions, stacks or sensitive URL/query values through `instance`.

Centralize validation/parsing, authentication, authorization, missing-resource, conflict, rate-limit and
unexpected-error mapping. Keep machine codes independent of translated text; choose consistent 400/422
semantics and preserve headers such as `WWW-Authenticate`/`Retry-After`. Apply
[request correlation](logging.md#request-correlation) even without a new logger: preserve valid supplied
IDs, generate IDs for absent/invalid values, return `X-Request-ID` on application responses and the
matching `requestId` in public problems.

## Verification

Test serialized success/error shapes, invalid and boundary inputs, malformed payloads, authorization,
known domain failures and unexpected errors. Compare changed OpenAPI against the supported artifact and
exercise affected consumers; document breaking changes/migrations. Schema snapshots do not establish
semantic compatibility. Apply [shared testing criteria](testing.md).

## Primary references

- [OpenAPI specification](https://spec.openapis.org/oas/latest.html)
- [RFC 9457 Problem Details](https://www.rfc-editor.org/rfc/rfc9457.html)
