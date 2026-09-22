# Quality checks and delivery

Use this policy when changing project tooling or preparing implementation handoff. Execution details
belong to the selected technology's tooling guide; this policy does not invoke another skill.

Preserve the existing package manager, hook manager, and project layout. Pin compatible stable tools,
commit the lockfile, and use reproducible dependency installation in CI. Keep dependency maturity and
install-script protections supported by that ecosystem; review advisories separately. Do not install
or change global Git identity. Merge framework configuration deliberately instead of overwriting it.
For new JS/TS formatting, use two spaces, single quotes, semicolons, and 100 columns when compatible.

Provide a check-only command for relevant formatting, lint, types, meaningful tests, and builds, with
fix commands kept separate. Reuse it in CI. Optional Git hooks must check the staged content and keep
user edits intact; Codex hooks require client trust and bounded failure behavior. Do not install an
extra runtime solely to execute a kit hook. Scope checks to real packages and verify aggregation.

Run the commands and inspect exit codes. Record actual commands, architecture, environment requirements,
and deployment assumptions in the project's AGENTS.md; preserve valid existing instructions and avoid
copying this manual. Report missing services or skipped builds accurately. A template or config file
existing on disk is not evidence that the configured checks execute successfully.

Keep cohesive manually maintained modules normally below 400 lines, with justified exceptions rather
than mechanical splits. Prefer explicit dependencies and functional composition; classes may fit real
framework or lifecycle requirements. Keep personal identity and machine paths out of generated assets.
When commits are requested, use Conventional Commits and meaningful scopes for monorepos.
