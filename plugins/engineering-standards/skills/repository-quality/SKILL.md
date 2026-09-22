---
name: repository-quality
description: Audit or coordinate repository-wide quality gates, CI, hooks, reproducibility, and dependency controls across packages. Routine technology setup belongs to its development skill.
---

# Repository Quality

This is an independent project-level workflow, not a prerequisite for development skills. Use local
technology references only when their execution detail helps the assigned analysis; do not route
ordinary implementation work through this skill.

Preserve the project's conventions and explicit task scope. Inspect manifests, lockfiles, existing hooks,
CI and applicable AGENTS files. Follow the assigned scope: a bug fix is not a tooling migration.

1. Identify the repository root, package boundaries, runtime requirements and existing commands.
2. For a new project, consult the selected technology skill's tooling reference and compatible assets.
   Load only that guidance for tooling-only work; do not start an application implementation workflow.
   If no matching skill exists, use the project's commands and current official ecosystem guidance.
   Never overwrite established configuration with a scaffold.
3. Pin compatible stable dependencies/toolchains and use reproducible CI installation. Preserve
   ecosystem-specific dependency protections and inspect advisories; avoid unrequested preview releases.
4. Provide check-only format, lint, types, meaningful tests, and build when relevant through one
   reliable check entrypoint. Keep autofixes separate and avoid duplicate competing tools.
5. Verify hook activation, executable permissions and the actual staged snapshot. Preserve existing
   hook managers. Configure pre-push to check relevant packages and CI to cover the complete project.
6. Adapt optional hooks to the project's execution environment and scope. Explain required Codex
   trust; a skipped untrusted hook is not enforcement. Repeated unchanged failures must not create
   endless continuations or be reported as success. Do not add a runtime merely to execute kit helpers.
7. For changed dependencies run the available advisory audit; distinguish findings from connectivity
   failures. Fix compatible vulnerabilities or document concrete unresolved risk rather than broad
   blind upgrades or suppression. Use specialized security tooling for requested deeper audits.
8. Run the commands and inspect their exit codes. Return changed configuration, successful checks,
   unresolved failures, and setup/trust requirements. Do not claim file existence proves enforcement.

Document verified commands and real package boundaries in the project instructions, preserving existing rules.
For deployment pipeline changes, use [deployment checks](references/deployment.md). Do not initialize Git inside
an existing repository or set global identity. Do not commit, publish or deploy without task scope.
