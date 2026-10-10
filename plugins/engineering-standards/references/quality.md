# Quality checks and delivery

Use this policy when changing project tooling or preparing implementation handoff. Execution details
belong to the selected technology's tooling guide; this policy does not invoke another skill.

Preserve the existing package manager, hook manager, and project layout. Pin compatible stable tools,
commit the lockfile, and use reproducible dependency installation in CI. Keep dependency maturity and
install-script protections supported by that ecosystem; review advisories separately. Do not install
or change global Git identity. Merge framework configuration deliberately instead of overwriting it.
For new JS/TS formatting, use two spaces, single quotes, semicolons, and 100 columns when compatible.

## Dependency selection

When installing a new dependency or starting a project, resolve the latest stable release available
from its official registry at that time; do not reuse a version number from this kit, an example or
an older project. Verify runtime, framework and peer compatibility before installation. If the latest
stable release is incompatible, explain the constraint and choose the newest supported stable release
rather than forcing it. Preserve explicit user version choices and existing dependencies unless an
update is requested or needed for the assigned change. Exclude preview/RC releases unless requested.

After resolution, record exact adopted versions and commit the lockfile; use frozen installs in CI.
This pins the project's chosen result, not a permanent version prescribed by the plugin. Do not leave
floating `latest` in maintained manifests or resolve new versions on every build. Keep configured
release-age protections; if they block the desired release, disclose it rather than disabling them.

## Checks and handoff

Provide a check-only command for relevant formatting, lint, types, meaningful tests, and builds, with
fix commands kept separate. Reuse it in CI. Optional Git hooks must check the staged content and keep
user edits intact; Codex hooks require client trust and bounded failure behavior. Do not install an
extra runtime solely to execute a kit hook. Scope checks to real packages and verify aggregation.

Run the commands and inspect exit codes. Record actual commands, architecture, environment requirements,
and deployment assumptions in the project's AGENTS.md; preserve valid existing instructions and avoid
copying this manual. Report missing services or skipped builds accurately. A template or config file
existing on disk is not evidence that the configured checks execute successfully.

Keep cohesive manually maintained modules normally below 400 lines, with justified exceptions rather
than mechanical splits. Use [architecture guidance](architecture.md) when changing module boundaries.
Keep personal identity and machine paths out of generated assets.
When commits are requested, use Conventional Commits and meaningful scopes for monorepos.
