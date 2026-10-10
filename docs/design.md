# Design and Decision Record

## Layers

The kit does not distribute global AGENTS.md instructions. Skills hold reusable
workflows; linked references load only when relevant. Templates and scripts implement deterministic
checks. A generated project's AGENTS.md describes its actual architecture and commands in English.

The repository contains the installable plugin and optional project assets. Setup uses supported
Codex CLI operations for plugin registration without replacing global instructions or user agents.

## Skills and client configuration

The main session applies engineering skills directly. Model, reasoning, concurrency, and agent
enablement remain controlled by Codex and the user. The kit contains no model recommendation matrix.

## Stack selection and shared guidance

Six implementation skills cover bun-development, node-development, cloudflare-workers-development,
astro-development, nextjs-development, and react-vite-development. Their names and descriptions identify
the selected runtime/framework; they own
the ordinary implementation, testing, contracts, diagnostics, and tooling guidance they need.

Node.js and Bun are first-class options. Runtime, framework, and package manager are separate choices.
A request for Node.js and Next.js may describe one integrated application. A standalone backend is
created only when the scope or existing architecture calls for it. Explicit choices and established
project conventions take precedence over defaults.

Testing, repository quality, API contracts, observability, and project instructions remain independent
project-level workflows for assessments and coordination. They are not prerequisites for technology
skills. Each technology skill's local references contain the relevant strategy and operational criteria,
including isolation, regression evidence, safe boundaries, quality checks, and reporting.

Testing strategies remain local: the relevant test boundaries, tools, and execution modes differ by
technology. General policies with multiple consumers live once in the plugin's references directory.
Local guides explain integration differences and link to the shared rule instead of copying it.
This applies to architecture, call/background-work reliability, persistence, API contracts, logging,
authentication, date semantics, server uploads, security, deployment, rate limiting, public-form
protection, and interface criteria. A shared document is not a separate skill and does not require
a second workflow invocation.

Architecture owns feature/service separation criteria; persistence owns query, concurrency, migration,
and recovery policy. Reliability owns bounded calls, safe retries, idempotency, and durable-work
decisions. Technology guides keep framework composition, database drivers, provider guarantees, and
runtime execution details. Deployment controls respect the chosen host; Docker instructions are a
separate conditional reference and do not select containers for static or serverless projects.

New Workers HTTP APIs use strict TypeScript, modular Hono routes, Zod input/output contracts, and
generated OpenAPI documentation. D1-backed applications use Drizzle. Bun is a package/tooling option;
Wrangler retains its supported Node.js requirement and application execution uses workerd. Features
stay cohesive within a Worker until deployment, permissions, ownership, or operational requirements
justify Service Bindings to another Worker. Production application logs emit only warnings and errors.

Public unauthenticated submission forms receive a provider-neutral anti-bot recommendation aligned
with their selected cloud/services. Unrequested implementation and missing configuration remain
explicit pending work. For a selected Cloudflare deployment, Turnstile is the direct choice unless
another service is explicitly selected; its details belong to the Cloudflare guide. Other clouds
prefer suitable native tools without silently introducing Cloudflare. A mention of Cloudflare tooling
alone does not establish its deployment scope.

When implemented, automatic verification and success stay hidden, required interaction remains
accessible, and submission actions show disabled/loading state with bounded recovery. Protection is
enforced at the real server or trusted edge boundary before side effects, not just in browser callbacks.

Rate limiting follows shared security policy for service selection, endpoint scope, trusted keys,
responses, failure handling, and verification. Respect the selected cloud/services and prefer a
suitable existing or native control. Unrequested implementation, unspecified service selection, and
missing configuration remain explicit pending work. Technology guides own provider adapters;
Cloudflare's guide owns Workers rate-limit bindings and their distributed limitations.

For new React/Vite SPAs requiring navigation, TanStack Router is the default; TanStack Query owns remote
server state. Their integration shares query identity and cache ownership between route loading and
components. Explicitly selected or established alternatives are preserved. Astro and Next.js retain
native routing; a routing preference does not introduce TanStack Start or replace the framework.

Frontend architecture selection is shared guidance: inspect explicit/existing framework and deployment
choices, ask only for missing consequential decisions, and avoid scaffolding the dependent stack until
they are resolved. Dynamic administrative frontends on edge asset hosts prefer React/Vite SPAs;
compatible selected Next.js hosts prefer Next.js for complex applications, with rendering chosen per
feature. Content sites prefer Astro with selective islands. These are preferences, not universal
serverless/SSR compatibility claims; explicit Astro and other framework choices remain valid.

New unselected styling prefers Tailwind, with shadcn/ui for complex React controls. Ant Design and
other explicit/established design systems remain supported without a second default guide. Styling
integration details are conditional; visual identity belongs to each project. Shared interface policy
owns component placement, React Hook Form/Zod defaults, form/error behavior, URL state, Not Found and
data-view criteria. Framework guides own routing, islands/client boundaries, lazy loading and host
verification. Cloudflare's frontend reference owns Workers/Pages asset routing and API/static boundaries.

The validator discovers skills rather than enforcing a fixed catalog. Adding a technology requires its
local skill and resources; it need not alter unrelated skills or transversal procedures. The executable
scaffold and hook assets remain Bun-specific and are optional for compatible projects.

## Knowledge ownership

- Technology skills own implementation, testing, tooling, and runtime/framework integration details.
- Shared references own reusable policy. Authentication rules have one source; stack adapters explain
  middleware, rendering, session-cache, and runtime differences without maintaining parallel policies.
- Transversal skills own project-wide testing, quality, compatibility, observability, and instruction
  assessments. They are not prerequisites for routine implementation.

Local references must be reachable from their owning SKILL.md. Shared references must be reachable
from at least one skill. The validator checks both graphs, including broken links and orphan cycles.
Shared policy may link to other shared policy but cannot send readers back into a technology skill.
Knowledge links between separate skills remain disallowed; shared executable/template assets remain
available without becoming mandatory policy. References load only when relevant to the requested work.

## Quality and distribution

Use EditorConfig, ESLint, Prettier, strict types, Bun Test, Vitest/React Testing Library and Playwright
as appropriate. Formatting: two spaces, single JS/TS quotes, semicolons, 100 columns, UTF-8, LF, final
newline; four spaces for Python. Manually maintained source stays under 400 lines with documented
exceptions; function size around 50 lines is a review signal. No universal coverage quota.

Resolve new dependencies from current stable registry releases, verify compatibility, then record
exact adopted versions with lockfiles and frozen CI installs. Bun quality scaffolds leave reviewed
dependency selection to installation instead of copying kit baselines; existing projects keep their choices.
Keep 24-hour maturity for new Bun
dependency resolutions. Check advisories separately; retain relevant OWASP guidance and realistic
tests. Hooks provide local feedback, while CI remains authoritative. A bounded hook failure is still
a reported failure, not successful verification.

Public artifacts contain no personal Git identity or machine-specific configuration. Install/restore
never configures Git identity. macOS and Linux are supported targets; Windows is not currently tested.
The kit uses MIT. Updating the kit does not silently migrate generated projects or alter their license.
