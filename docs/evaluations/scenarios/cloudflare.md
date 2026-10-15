# Cloudflare behavior

[Evaluation setup and recording](../../behavioral-validation.md#run-an-evaluation).

## Modular Cloudflare Workers API — not run

Prompt:

> Create a TypeScript Cloudflare Worker with Hono inventory and contact features. Use Zod for request
> and response contracts, generate OpenAPI, persist inventory in D1 through Drizzle, and protect public
> routes with rate limits. Prepare local development and verification without deploying live resources.

Accept when the result:

- Uses feature subapplications with inferred route types and explicit business dependencies, keeping
  the Worker entrypoint separate from route implementation. Does not add a DI framework or separate
  services merely because there are two features.
- Distinguishes Bun package management, Wrangler's supported Node.js execution, and workerd runtime.
  Uses pinned compatible Wrangler/Vite/Vitest integrations and generated binding types.
- Validates runtime inputs and mapped outputs, documents mounted routes and middleware errors, and
  verifies malformed payloads, serialized contracts, and unexpected failures in the Workers runtime.
- Applies reviewed Drizzle migrations to disposable local D1 with a single migration history and
  tests actual adapter behavior. Does not assume PostgreSQL transaction semantics or use production.
- Exercises rate-limit rejection and safe key selection without claiming strict global quotas.
  Produces safe warning/error application logs and disables automatic invocation logs.

Repeat with an explicitly requested separately deployable notification Worker. Accept a narrow private
Service Binding API, validated delegated contracts, authorization/correlation context, and actual
local inter-Worker verification. Record mocks separately from exercised HTTP/RPC bindings.

## Cloudflare public form with interaction-only Turnstile — not run

Prompt:

> Add a public contact form to this landing page using its current design system. The deployment target
> is Cloudflare. Keep automatic verification and success invisible, show the widget only when manual
> interaction is required, and show loading on disabled submission actions while verification runs.

Run with disposable frontend/server fixtures and Cloudflare test keys. Repeat across selected frontend
frameworks when evaluating their specific lifecycle integration.

Accept when the result:

- Uses Managed interaction-only appearance with submit-triggered execution and a form-specific action.
  Keeps the interactive widget accessible instead of hiding it with CSS or choosing Invisible mode.
- Selects Turnstile directly from the Cloudflare deployment context. With missing keys/account setup,
  records specific pending configuration and distinguishes prepared code from active protection.
- Prevents duplicate submissions, keeps data on failure, shows accessible pending/error status, and
  permits bounded retry after expiration, timeout, unsupported browser, or provider failure.
- Calls server Siteverify and checks success, hostname, and action before side effects; rejects missing,
  invalid, expired, or reused tokens. Keeps secrets server-only and tokens absent from diagnostics.
- Tests hidden automatic/success states, interaction visibility, loading/disabled controls, and
  failure recovery, distinguishing simulated callbacks from a live interactive challenge.

These scenarios have not been executed; kit formatting, type checks, reference validation, and tooling
tests do not establish generated-application or provider behavior.
