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

## Stack selection and shared guidance

Five implementation skills cover bun-development, node-development, astro-development, nextjs-development, and
react-vite-development. Their names and descriptions identify the selected runtime/framework; they own
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
This applies to authentication, date semantics, server uploads, security, server deployment, and interface
criteria. A shared document is not a separate skill and does not require a second workflow invocation.

For new React/Vite SPAs requiring navigation, TanStack Router is the default; TanStack Query owns remote
server state. Their integration shares query identity and cache ownership between route loading and
components. Explicitly selected or established alternatives are preserved. Astro and Next.js retain
native routing; a routing preference does not introduce TanStack Start or replace the framework.

The validator discovers skills rather than enforcing a fixed catalog. Adding a technology requires its
local skill and resources; it need not alter unrelated skills or transversal procedures. The executable
scaffold and hook assets remain Bun-specific and are optional for compatible projects.

## Knowledge ownership

- Technology skills own implementation, testing, tooling, and runtime/framework integration details.
- Shared references own reusable policy. Authentication rules have one source; stack adapters explain
  middleware, rendering, session-cache, and runtime differences without maintaining parallel policies.
- Transversal skills own project-wide testing, quality, compatibility, observability, and instruction
  assessments. They are not prerequisites for routine implementation.
- The reviewer profile owns read-only review boundaries, evidence, severity, and closure checks.

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

Use exact stable tool versions, lockfiles, frozen CI installs, and 24-hour maturity for new Bun
dependency resolutions. Check advisories separately; retain relevant OWASP guidance and realistic
tests. Hooks provide local feedback, while CI remains authoritative. A bounded hook failure is still
a reported failure, not successful verification.

Public artifacts contain no personal Git identity or machine-specific configuration. Install/restore
never configures Git identity. macOS and Linux are supported targets; Windows is not currently tested.
The kit uses MIT. Updating the kit does not silently migrate generated projects or alter their license.
