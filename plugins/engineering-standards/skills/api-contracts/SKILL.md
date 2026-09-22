---
name: api-contracts
description: Coordinate public API evolution, compatibility reviews, and consumer migrations across applications. Routine endpoint validation belongs to the technology skill.
---

# API Contracts

This is an independent project-level workflow, not a prerequisite for development skills. Use local
technology references only when their execution detail helps the assigned analysis; do not route
ordinary implementation work through this skill.

Preserve the project's conventions and explicit task scope. Follow
[the API contract policy](references/api-contracts.md).

1. Inspect producers and consumers, the supported API versions, and the project's generated-code
   convention. Identify whether the proposed change is compatible before implementation.
2. Define runtime request and response schemas using the selected framework's validation tools and OpenAPI documentation together. Include
   validation failures and [Problem Details errors](references/api-contracts.md#errors).
3. Keep frontend form schemas and consumer contracts local. Generate client types from a pinned
   OpenAPI artifact when useful; do not introduce `packages/contracts` or private server implementation imports
   across applications by default.
4. Verify runtime boundary validation separately from compile-time type inference. Apply
   [file limits](references/files.md) and [date semantics](../../references/dates.md) when relevant.
5. Test changed success and failure responses, consumer behavior, and version compatibility. Update
   generated artifacts reproducibly and explain any required consumer migration.

Agree on contracts before changing independent producers and consumers.
Existing applications keep their established versioning unless the task calls for migration.
