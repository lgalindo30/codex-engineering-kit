# Contributing

Write public content in English. Preserve unrelated user configuration and working-tree changes.
Keep identity, credentials, personal paths, and telemetry destinations out of distributed files.

## Verify changes

Install the pinned dependencies, run `bun run format`, then `bun run check`.
Run `bun run security:check` for dependency changes. Add behavioral tests for tooling changes that
could damage files, misreport validation, or bypass a gate. Evaluate changed skill behavior with
bounded tasks when needed and record actual results in [behavioral validation](docs/behavioral-validation.md).

Commits and pushes require explicit authorization. Use scoped Conventional Commits. Before an
authorized push, prepare and commit a higher synchronized plugin/package version through the
[release workflow](docs/releasing.md). Document breaking changes and migration guidance; updates
must not silently rewrite previously generated projects.

## Adding technology skills

Each skill has a focused `SKILL.md`, `agents/openai.yaml`, and only the resources its workflow needs.
The validator discovers skills automatically. Describe when to use it, the decisions it owns, and
the expected result; omit generic instructions already covered by shared policy.

| Location                 | Owns                                                          |
| ------------------------ | ------------------------------------------------------------- |
| `skills/*/SKILL.md`      | Trigger, short workflow, and conditional resource links       |
| `skills/*/references/`   | Stack-specific integration and verification                   |
| `references/`            | Reusable workflow, testing principles, and engineering policy |
| `templates/`, `scripts/` | Optional assets and deterministic operations                  |

Link shared policy instead of copying it or adding a wrapper with no integration detail.
Load references only when relevant. Technology skills remain directly usable; transversal skills
provide independent assessments. `engineering-workflow` coordinates cross-stack work when useful.

The validator follows inline Markdown links from each `SKILL.md`. Local references must be reachable
from their skill; shared references must be reachable from at least one skill. Only skill entrypoints
may route to another skill's `SKILL.md`; private documents stay isolated. Shared policy cannot route
back into skills. Broken links and orphan references fail validation; optional shared assets are allowed.

External links are sources to verify during implementation. Structural checks validate packaging,
not the current content of external documentation or an agent's runtime behavior.
