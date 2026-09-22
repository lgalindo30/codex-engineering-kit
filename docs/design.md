# Design and Decision Record

## Layers

The kit does not distribute global AGENTS.md instructions. Role TOMLs describe responsibilities and boundaries, without model/effort pins. Skills hold reusable
workflows; linked references load only when relevant. Templates and scripts implement deterministic
checks. A generated project's AGENTS.md describes its actual architecture and commands in English.

The repository contains the installable plugin and separate global files. Installing a plugin does
not automatically register global role TOMLs or replace global instructions. The two setup commands
make this distinction explicit and use supported Codex CLI operations for plugin registration.

## Skills and independent review

The main session applies engineering skills directly. The only distributed agent profile is
code_reviewer, with a read-only sandbox and an independent evidence-based review workflow.
The installer does not modify config.toml. Model, reasoning, concurrency, and agent enablement
remain controlled by Codex and the user. The kit contains no model recommendation matrix.

The global installer manages only agents/code_reviewer.toml, plus private state and
backups for reversible installation. It does not migrate older multi-profile installations.

## Application defaults

- Bun, strict TypeScript, ESM; allow pinned Node for actual compatibility constraints. Python tools
  use uv/uvx when a better fit. Respect established projects and explicit migrations.
- Bun/Hono with Zod and OpenAPI; new business APIs start at /api/v1. Each application owns its schemas.
  Consumers use a versioned OpenAPI contract; packages/contracts is not created by default.
- When unspecified: React + Vite SPA for simple interactive apps, Astro for static SEO-sensitive
  content, and Next.js for complex applications;
  business backend stays in Hono unless the prompt explicitly asks for integrated Next.js backend.
- Ant Design when CRUD complexity warrants it; otherwise CSS/CSS Modules. Native framework routers,
  TanStack Query where client remote state needs it, minimal local state and accessible reusable UI.
- Drizzle ORM + Drizzle Kit. PostgreSQL normally; SQLite for simpler local use. Review migrations and
  execute them once as an explicit deployment step, not on every application startup.
- Pino console logs and RFC 9457 Problem Details; structured request correlation with redaction.
  OpenTelemetry and centralized destinations are introduced only for an explicit integration task.
- Authentication only on request: email/password, brief memory-only access JWT as Bearer, protected
  refresh cookie, rotation/revocation and CSRF controls. Google login, roles and multitenancy are later
  explicit work. Ownership checks still apply whenever resources belong to individual users.
- Files start local on persistent storage. Maximum per file is 10,000,000 bytes unless overridden
  explicitly; content validation, count and total/streamed request limits remain required.
- Normal server deployment with Docker by default. Serverless is an explicit alternative. No default
  queues, background jobs, Kubernetes or replica architecture.

## Quality and distribution

Use EditorConfig, ESLint, Prettier, strict types, Bun Test, Vitest/React Testing Library and Playwright
as appropriate. Formatting: two spaces, single JS/TS quotes, semicolons, 100 columns, UTF-8, LF, final
newline; four spaces for Python. Manually maintained source stays under 400 lines with documented
exceptions; function size around 50 lines is a review signal. No universal coverage quota.

Use exact stable tool versions, lockfiles, frozen CI installs, and 24-hour maturity for new Bun
dependency resolutions. Check advisories separately; retain relevant OWASP guidance and realistic
tests. Hooks provide local feedback, while CI remains authoritative. A bounded hook failure is still
a reported failure, not successful verification.

Public artifacts contain no personal Git identity or machine-specific configuration. Install/restore
never configures Git identity. macOS and Linux are supported targets; Windows is not currently tested.
The kit uses MIT. Updating the kit does not silently migrate generated projects or alter their license.
