---
name: cloudflare-workers-development
description: Implement TypeScript Cloudflare Workers with modular Hono APIs, Zod/OpenAPI, bindings, D1, and development/testing tools. Use for Workers code/configuration or public-form protection on an explicitly selected Cloudflare deployment.
---

# Cloudflare Workers

Use strict TypeScript and Hono for Workers HTTP APIs, with Zod validation of input/output and generated
OpenAPI documentation. Keep platform handlers outside HTTP routing. Respect the requested scope and
existing applications; do not migrate unrelated code or provision infrastructure merely to follow a guide.

Read only the guidance relevant to the request:

- [Implementation](references/implementation.md): Hono feature adapters, platform handlers, Service Bindings,
  dependency boundaries, and Workers logging.
- [Contracts](references/contracts.md): Hono/Zod integration, runtime output validation, and OpenAPI.
- [Persistence](references/persistence.md): Drizzle with D1, migrations, and database ownership.
- [Security](references/security.md): Cloudflare rate-limit bindings, service boundaries, and public-form protection.
- [Turnstile](references/turnstile.md): public forms when deployment selects Cloudflare or the service
  is explicitly chosen. Use this reference directly for a form-only task without scaffolding a Worker.
- [Tooling](references/tooling.md): Wrangler, Vite, generated types, quality gates, and deployment checks.
- [Testing](references/testing.md): Vitest in the Workers runtime, bindings, isolation, and failure paths.

Use conditional shared policy for [authentication](../../references/authentication.md),
[files](../../references/files.md), [dates](../../references/dates.md), and
[public submission forms](../../references/public-forms.md) when those features exist.

For public forms on a selected or established Cloudflare deployment, use Turnstile directly while
respecting an explicitly chosen alternative. If keys or account setup are missing, record that concrete
pending configuration. Other clouds follow their selected services and the generic anti-bot
recommendation; merely mentioning Cloudflare tooling is not a deployment choice.

1. Inspect actual Worker/frontend boundaries, instructions, entrypoints, bindings, configuration,
   dependency versions, and runnable commands. Verify relevant current official documentation and
   the installed Wrangler schema; existing version/configuration decisions are not evidence of parity.
2. Identify changed routes or platform events, affected consumers, and observable acceptance criteria.
   Implement cohesive features with explicit dependencies and platform-supported bindings.
3. Verify changed behavior in the Workers runtime and run the project's documented quality command.
   Report unavailable prerequisites and distinguish mocks, local runtime tests, and live observations.
4. Update project AGENTS.md only with durable architecture, verified commands, and real package
   boundaries when these change. Report contracts, compatibility, checks, and material limits.

For testing-only or tooling-only work, use that reference directly. Shared references provide policy;
project-wide testing, quality, contracts, observability, and instruction assessments remain independent
workflows rather than prerequisites for routine implementation. Bun may manage dependencies/scripts;
Wrangler retains its supported Node.js requirement, and application execution uses workerd.

Write repository content in English and honor requested product locales. Implementation does not
authorize commits, live deployment, production migrations, or unrelated external resources.
