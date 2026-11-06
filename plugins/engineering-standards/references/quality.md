# Quality Checks and Delivery

Use when changing tooling or preparing handoff; execution details belong to the selected technology guide.

Preserve package/hook managers and framework configuration. Use compatible stable tools, a committed
lockfile and reproducible CI installs. Keep supported install-script and dependency-maturity protections;
review advisories separately. Never change global Git identity.

For new JS/TS formatting, prefer two spaces, single quotes, semicolons and 100 columns when compatible.
Keep cohesive maintained modules normally below 400 lines, allowing justified exceptions rather than
mechanical splits. See [architecture](architecture.md) for boundaries. Keep personal identity and machine
paths out of generated assets. When commits are requested, use Conventional Commits and meaningful
monorepo scopes.

Keep configuration minimal. Omit options equal to the adopted tool version's defaults, empty sections,
and settings already supplied by inherited configuration. Verify defaults before removing an option;
preserve deliberate deviations and required framework or runtime settings. Keep rationale in documentation.

## New-project toolchain

Use [Vite+](vite-plus.md) for new compatible JS/TS projects instead of assembling separate Vite,
Vitest, ESLint, Prettier and Turborepo configuration. Preserve Bun where selected and framework-owned
commands and checks. Existing projects retain their toolchain unless migration is requested.

## Dependency selection

Resolve new dependencies from their official registry at setup time. Choose the latest stable release
compatible with runtime/framework/peers; explain constraints requiring an older release. Preserve explicit
version choices and existing versions unless the change needs an update. Use previews/RCs only on request.

Record exact adopted versions and the lockfile. Avoid floating `latest` in maintained manifests and
re-resolution during builds. Preserve release-age controls; disclose blocked resolutions rather than
bypassing them.

## Checks and handoff

Provide one check-only command aggregating relevant formatting, lint, types, meaningful tests and builds;
keep fix commands separate and reuse the check in CI. Scope checks to real packages and verify aggregation.

Optional Git hooks check staged content without modifying user edits. Codex hooks require client trust
and bounded failures; do not add another runtime merely for a kit hook. Apply [testing](testing.md) and
[workflow handoff](workflow.md) criteria rather than copying the manual into project instructions.

For hook setup or changes, inspect effective configuration and executable permissions from each actual
checkout, including linked worktrees and worktree-specific overrides. Preserve existing hook managers;
do not assume `.git` is a directory. Use Git-resolved internal paths and a worktree-compatible hook path.
Compatible Bun projects can adapt the optional [activation helper](../scripts/git-hooks.ts) after their
reviewed `.githooks` files exist; it is not a hook-manager migration or proof of Vite+ integration.
Exercise real Git rejection of an invalid staged commit and pre-push in disposable worktrees/local bare
remotes, preserve unstaged edits, and verify corrected acceptance and unchanged refs after rejection.
Run the aggregate independently in CI; required checks/branch protection need separate host evidence.
