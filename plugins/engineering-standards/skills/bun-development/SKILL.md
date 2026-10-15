---
name: bun-development
description: Build or change Bun/TypeScript backends when Bun is the selected runtime.
---

# Bun Backend

Read [the shared workflow](../../references/workflow.md).

Use the selected framework; Hono and Zod are defaults for a new standalone API.
Keep Bun-only APIs out of browser code and packages promising Node compatibility.

Read only the references needed for the task:

- [Implementation](references/implementation.md): runtime boundaries and framework integration.
- [Testing](references/testing.md): stack-specific test execution.
- [Tooling](references/tooling.md): setup, quality commands, and deployment.
- [Security](../../references/security.md) and [authentication](../../references/authentication.md): changed trust or session boundaries.
- [Files](../../references/files.md) and [dates](../../references/dates.md): uploads, retrieval, or date semantics.

For testing-only or tooling-only work, use that reference directly. Cross-project audits remain
independent workflows; routine development does not require invoking them.
