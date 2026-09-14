---
name: api-contracts
description: Define and evolve versioned HTTP API contracts with Hono, Zod, OpenAPI, and local consumer types. Use when endpoints, clients, schema validation, or API compatibility change.
---

# API Contracts

Follow [engineering defaults](../../references/engineering.md) and
[the API contract policy](../../references/api-contracts.md).

1. Inspect producers and consumers, the supported API versions, and the project's generated-code
   convention. Identify whether the proposed change is compatible before implementation.
2. Define backend Zod request and response schemas and OpenAPI documentation together. Include
   validation failures and [Problem Details errors](../../references/api-contracts.md#errors).
3. Keep frontend form schemas and consumer contracts local. Generate client types from a pinned
   OpenAPI artifact when useful; do not introduce `packages/contracts` or Hono server-type imports
   across applications by default.
4. Verify runtime boundary validation separately from TypeScript inference. Apply
   [file limits](../../references/files.md) and [date semantics](../../references/dates.md) when relevant.
5. Test changed success and failure responses, consumer behavior, and version compatibility. Update
   generated artifacts reproducibly and explain any required consumer migration.

The parent owns agreement on contracts before assigning independent producer and consumer work.
Existing applications keep their established versioning unless the task calls for migration.
