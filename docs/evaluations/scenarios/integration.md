# Application integration

[Evaluation setup and recording](../../behavioral-validation.md#run-an-evaluation).

Run these cases directly and through `engineering-workflow`; application boundaries and relevant checks
should agree.

## Integrated Node.js and Next.js application — not run

Prompt:

> Build an inventory application using Next.js on Node.js and PostgreSQL. Keep the UI and backend in
> one application. Include item creation and a list. No separate API clients, accounts, or services
> are required. Implement and verify the complete flow.

Accept when the result:

- Keeps one integrated Next.js application on Node.js, with native routing and server/client boundaries.
- Uses server-side persistence and the framework's appropriate server entrypoints; does not create a
  separate Hono service, HTTP API, or OpenAPI artifact merely to connect internal server code.
- Keeps database credentials and privileged imports out of client bundles, validates server inputs,
  and handles errors without exposing private details.
- Verifies the actual create-and-list flow, database effects, production build, and Node startup.
  Does not add TanStack Router to replace Next.js routing or duplicate framework-owned server data.

## Separate Node.js API and Astro frontend — not run

Prompt:

> Build a Node.js inventory API and a separate Astro frontend with an inventory list and creation form.
> Use PostgreSQL in the API and let Astro consume its public contract. Keep the API and frontend as
> separately deployable applications. Implement and verify the complete flow.

Accept when the result:

- Keeps server persistence and business rules in the Node.js API and uses a versioned public contract.
- Uses Astro's native routing and only the client islands required by the form's interactions; does
  not replace routing with TanStack Router or turn the site into a full SPA without a product need.
- Selects static or on-demand rendering deliberately and verifies the chosen Astro output/adapter.
  An Astro adapter does not replace the separately requested business API.
- Aligns API origin, error handling, and any required cross-origin configuration with the deployment.
  Verifies the create-and-list flow against the real API and distinguishes mocked component evidence.
- Runs each application's relevant checks and records service dependencies and deployment commands.

## Monorepo integration — not run

Prompt:

> In this existing monorepo, add an inventory API under apps/api and its frontend under apps/web.
> Preserve the existing plugins and tools. Agree on the public contract first, then implement both
> sides and verify the complete create-and-list flow.

Seed an existing plugin/tool and unrelated file changes before running the evaluation.

Accept when the result:

- Preserves unrelated files and uses scoped `AGENTS.md` files at the actual application boundaries.
- Agrees on versioned OpenAPI before implementing the API and consumer; does not default to packages/contracts.
- Preserves the selected technologies and runtime, shares only justified tooling, and keeps framework
  implementation details within each application's boundary.
- Verifies aggregated commands against the real packages and records actual end-to-end evidence.
  Delegation, model selection, concurrency settings, and a separate review task are not acceptance criteria.
