# Architecture

The kit distributes an installable Codex plugin and optional project assets. Supported Codex CLI
operations own registration and cache state; setup preserves global instructions, user agents,
preferences, and unrelated plugins. Model and concurrency choices remain with Codex and the user.

## Knowledge flow

1. Use the relevant technology or assessment skill directly.
2. For work spanning skills, `engineering-workflow` selects the required entrypoints and coordinates
   their boundaries. It is optional for focused work.
3. Each skill loads only the shared policies and stack references needed for the task.
4. Templates and scripts perform deterministic operations when explicitly applicable.

Runtime/framework integration belongs to technology skills. Reusable rules have one source in
`references/`; local guides explain integration differences. The common workflow and testing
references remove repeated process instructions without replacing runtime-specific verification.
The shared operation-observability and resource-budget policies define generic evidence; Workers/D1
and MCP details stay in their optional skill-local profiles. Adoption records link requirements to
actual implementation, executed checks and observed coverage rather than relying on declared skill use.
`change-verification` closes one fix or feature through behavioral evidence, applicable standards
inspection and in-scope repairs. It reuses the selected stack guides; `testing-strategy` retains
project-wide coverage assessment. Read-only inspection remains read-only, and unexecuted checks remain
explicit gaps rather than passing verdicts.
The shared verification policy owns consequence-based selection; its adversarial-review reference
owns independent roles and artifact-bound evidence, and its retirement reference owns per-guarantee
traceability, review-recipe activation and comparable detection/total-cost decisions. Technology
guides retain actual runtime boundaries. Review-only retirement explicitly reduces continuous
regression detection and requires project-owned acceptance; documentation installs no review runner.
The conditional generated-verification reference owns invariant families, mandatory/causal witnesses,
generator reachability and harness profiles without prescribing one test per generated input.
See [contributing](../CONTRIBUTING.md#adding-technology-skills) for ownership and link constraints.

## Project boundaries

Preserve explicit and established choices. Runtime, framework, package manager, and deployment target
are separate decisions. Multiple technologies do not by themselves require separate applications or
services. Generate a project's `AGENTS.md` at its real boundaries with its actual architecture and commands.

Optional quality scaffolds and hooks require Bun. They provide assets for compatible projects;
they do not install frameworks, authentication, infrastructure, or telemetry. Project hooks require
local activation or client trust. See [project assets](../plugins/engineering-standards/templates/README.md).

## Verification and distribution

`bun run check` validates packaging and executable tooling. Bounded [agent evaluations](behavioral-validation.md)
validate selected behaviors separately. Neither substitutes for the other's evidence.

The plugin and root package share one version. Every authorized push advancing repository content
follows the [release workflow](releasing.md); setup does not publish, commit, or push. Updating the kit
does not migrate generated applications or change their licenses.
