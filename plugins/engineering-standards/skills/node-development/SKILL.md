---
name: node-development
description: Build or change standalone Node.js/TypeScript backends. Use nextjs-development for integrated Next.js applications.
---

# Node.js Backend

Read [the shared workflow](../../references/workflow.md).

Use the selected framework and package manager; Hono is a default for a new standalone API.
Node.js plus Next.js may be one application and does not require a separate backend.

Read only the references needed for the task:

- [Implementation](references/implementation.md): runtime boundaries and framework integration.
- [Testing](references/testing.md): stack-specific test execution.
- [Tooling](references/tooling.md): setup, quality commands, and deployment.
- [Security](../../references/security.md) and [authentication](../../references/authentication.md): changed trust or session boundaries.
- [Files](../../references/files.md) and [dates](../../references/dates.md): uploads, retrieval, or date semantics.

For testing-only or tooling-only work, use that reference directly. Cross-project audits remain
independent workflows; routine development does not require invoking them.
