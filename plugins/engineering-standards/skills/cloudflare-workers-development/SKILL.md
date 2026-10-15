---
name: cloudflare-workers-development
description: Build or change TypeScript Cloudflare Workers, bindings, and configuration. Use for public-form protection on a selected Cloudflare deployment.
---

# Cloudflare Workers

Read [the shared workflow](../../references/workflow.md).

For Workers HTTP APIs, use strict TypeScript, Hono, Zod input/output validation, and generated OpenAPI.
Keep platform handlers separate from HTTP routing. Verify changed integrations against current official
docs and the installed Wrangler schema. Workers execute in workerd; Wrangler requires supported Node.js,
even when Bun manages packages/scripts.

Read only the relevant guidance:

- [Implementation](references/implementation.md): feature boundaries, platform handlers, Service Bindings, logging.
- [Contracts](references/contracts.md): Hono/Zod and runtime schemas.
- [Persistence](references/persistence.md): Drizzle/D1 and migrations.
- [Security](references/security.md): rate-limit bindings and private services.
- [Turnstile](references/turnstile.md): public forms on Cloudflare or explicit Turnstile integration.
- [Frontends](references/frontends.md): selected Workers/Pages assets and routing.
- [Tooling](references/tooling.md): Wrangler/Vite, types, quality, and deployment.
- [Testing](references/testing.md): workerd, bindings, and failure paths.
- Shared [authentication](../../references/authentication.md), [files](../../references/files.md),
  [dates](../../references/dates.md), and [public forms](../../references/public-forms.md) when those features exist.

Use Turnstile for public forms on a selected Cloudflare deployment, respecting an explicit alternative.
Missing keys/account setup are concrete pending configuration. Other hosts use their selected services;
mentioning Cloudflare tooling alone does not choose deployment. For form-only, testing-only, or
tooling-only work, use that reference directly without scaffolding an application.
