---
name: repository-quality
description: Audit repository-wide quality commands, CI/hooks, reproducibility, and dependencies. Routine stack setup belongs to its technology skill.
---

# Repository Quality

Read [the shared workflow](../../references/workflow.md) and [quality policy](../../references/quality.md).
Inspect actual package boundaries, manifests/lockfiles, runtime requirements, commands, hooks, and CI.

For new setup, use the selected technology's tooling reference and compatible assets directly. Without
a matching skill, follow existing commands and current ecosystem docs. Preserve existing hook managers;
a bug fix does not imply a tooling migration or permission to overwrite configuration.

Provide one check-only entrypoint for applicable formatting, lint, types, meaningful tests, and build;
keep autofixes separate. Verify hook activation, permissions, the staged snapshot, relevant pre-push
packages, and complete CI coverage. Explain Codex hook trust and skipped execution; file existence is
not evidence of enforcement. Do not add a runtime just for helpers or loop on unchanged failures.

Use reproducible installs and [dependency selection](../../references/quality.md#dependency-selection).
For changed dependencies, audit advisories and distinguish findings from connectivity errors; fix
compatible vulnerabilities or document concrete risk rather than blind upgrades/suppression.

For pipeline changes, apply [deployment controls](../../references/deployment.md), selected
[Docker controls](../../references/docker-deployment.md), and migration
[persistence policy](../../references/persistence.md). Verify real builds/target checks with isolated
resources, including host routing/assets or framework-adapter support as relevant. Do not initialize
nested Git repositories or configure global identity.
