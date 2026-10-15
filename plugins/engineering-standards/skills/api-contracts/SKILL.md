---
name: api-contracts
description: Review public API compatibility and coordinate consumer migrations across applications. Routine endpoint validation belongs to the technology skill.
---

# API Contracts

Read [the shared workflow](../../references/workflow.md) and [API policy](../../references/api-contracts.md).
Use this independent workflow for contract evolution; ordinary endpoint implementation stays in its
technology skill.

Identify producers, consumers, supported versions, and generated-artifact ownership. Classify
compatibility before changing independently deployed applications; preserve existing versioning unless
migration is requested.

Define runtime request/response schemas and public errors with OpenAPI. Keep form/consumer schemas
local; generated clients come from a pinned artifact when useful, without introducing shared private
server packages by default. Verify actual serialized boundaries and consumers separately from types.

For [file APIs](../../references/files.md), expose actual size/count/type limits and rejection errors;
version incompatible changes and keep safe retrieval/ownership behavior explicit. Apply
[date semantics](../../references/dates.md) when relevant. Reproduce generated artifacts and document
required consumer migration with success/failure and compatibility evidence.
