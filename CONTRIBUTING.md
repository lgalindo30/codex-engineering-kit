# Contributing

Use English for public content. Keep changes focused and preserve the distinction between policy,
agent responsibility, reusable workflow, and executable enforcement. Avoid adding every preference to
every skill; link focused references instead.

Install the pinned toolchain/dependencies, run `bun run format`, then `bun run check`. Run
`bun run security:check` when changing dependencies. Add behavioral tests for installer or hook changes
that could damage user files, misreport validation, or bypass a quality gate. Test changes to skills
against realistic tasks when appropriate and record what was actually executed.

Do not add real identity defaults, personal paths, credentials, telemetry destinations, or model keys.
Use repository-local Git identity configured by each contributor. Use scoped Conventional Commits when
creating commits. A successful implementation or review does not authorize a push or release.

Increment the plugin version before every push that advances an existing remote branch, including
documentation-only changes. Use `bun run release:bump patch` (or `minor`/`major`) before committing;
this keeps the root package version aligned. Enable `.githooks` to check outgoing committed versions.
See [the release workflow](docs/releasing.md) for initial branches, tags, and enforcement limits.
Validate installation from the repository marketplace before publishing. Document breaking policy changes and project migration
guidance; never rewrite previously generated projects implicitly.
