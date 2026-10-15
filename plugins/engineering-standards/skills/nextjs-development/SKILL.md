---
name: nextjs-development
description: Build or change Next.js applications, including integrated server behavior, without assuming a separate backend.
---

# Next.js Application

Read [the shared workflow](../../references/workflow.md).

Preserve the router and selected runtime. Keep integrated server behavior in this application
unless an existing boundary or the request calls for a separate backend.

Read only the references needed for the task:

- [Implementation](references/implementation.md): runtime boundaries and framework integration.
- [Testing](references/testing.md): stack-specific test execution.
- [Tooling](references/tooling.md): setup, quality commands, and deployment.
- [Interface](../../references/interface.md): components, forms, state, and accessibility.
- [Architecture selection](../../references/frontend-architecture.md): new framework/host decisions.
- [Public forms](../../references/public-forms.md): public submission endpoints.
- [Security](../../references/security.md) and [authentication](../../references/authentication.md): changed trust or session boundaries.
- [Files](../../references/files.md) and [dates](../../references/dates.md): uploads, retrieval, or date semantics.

For testing-only or tooling-only work, use that reference directly. Cross-project audits remain
independent workflows; routine development does not require invoking them.
