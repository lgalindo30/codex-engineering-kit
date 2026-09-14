---
name: repository-quality
description: Configure or review repository toolchains, formatting, linting, Git hooks, CI, and dependency checks for an engineering project. Apply existing tooling before introducing replacements.
---

# Repository Quality

Read [shared policy](../../references/engineering.md) and inspect manifests, lockfiles, existing hooks,
CI and applicable AGENTS files. Follow the assigned scope: a bug fix is not a tooling migration.

1. Identify the repository root, package boundaries, runtime requirements and existing commands.
2. For a new project, use [quality templates](../../templates/README.md). The conservative
   [scaffolder](../../scripts/apply-project.ts) supports an explicit target, profile and dry-run. It
   is a quality skeleton, not an application generator. Do not apply it over established configuration.
3. Pin compatible stable dependencies/toolchain; commit the resulting lockfile and frozen CI install.
   Keep the Bun 24-hour age filter and inspect advisories. Do not automatically accept RC releases.
4. Provide check-only format, lint, types, meaningful tests, and build when relevant through one
   reliable check entrypoint. Keep autofixes separate and avoid duplicate competing tools.
5. Verify hook activation, executable permissions and the actual staged snapshot. Preserve existing
   hook managers. Configure pre-push to check relevant packages and CI to cover the complete project.
6. Use the project Stop hook only after adapting its command and scope. Explain required Codex trust;
   a skipped untrusted hook is not enforcement. Repeated unchanged failures must not create endless
   continuations or be reported as success. Read [template notes](../../templates/README.md).
7. For changed dependencies run the available advisory audit; distinguish findings from connectivity
   failures. Fix compatible vulnerabilities or document concrete unresolved risk rather than broad
   blind upgrades or suppression. Use specialized security tooling for requested deeper audits.
8. Run the commands and inspect their exit codes. Return changed configuration, successful checks,
   unresolved failures, and setup/trust requirements. Do not claim file existence proves enforcement.

Use [project-instructions](../project-instructions/SKILL.md) when changing documented setup or layout.
For new servers, follow [Docker guidance](../../references/deployment.md). Do not initialize Git inside
an existing repository or set global identity. Do not commit, publish or deploy without task scope.
