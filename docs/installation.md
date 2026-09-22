# Installation, Updates, and Restoration

## Two independent installation surfaces

Run `bun run setup:plugin` before `bun run setup:global`. Plugin setup uses the Codex CLI to register
this repository's marketplace and cache its plugin. Global setup installs only
the reviewer profile, with backups for restoration. It does not change config.toml. Neither command
publishes the repository or configures Git identity. Keep the checkout available while using a local marketplace.

`CODEX_BIN` selects the Codex executable for plugin commands. `CODEX_HOME` selects its configuration
home and is inherited by the CLI. Global setup also accepts `--codex-home PATH`; this argument belongs
only to global setup, so use CODEX_HOME for isolated plugin tests.

## Global file behavior

- AGENTS.md and AGENTS.override.md: never created, modified, or restored by the installer.
  Engineering workflows belong to the plugin skills; project instructions remain project-specific.
- agents/*.toml: installs only code_reviewer. Differing existing profiles cause a preflight error.
  Review the diff before explicitly using `bun run setup:global --replace-existing`.
- config.toml: never created, modified, or restored by the installer. Existing preferences remain intact.
- `.engineering-kit/state.json`: stores original file snapshots and installed hashes with private
  permissions. Backups of replaced files live under `.engineering-kit/backups/`, also privately.

Backups may contain private configuration. They stay inside CODEX_HOME and must not be published.
The installer does not claim transaction durability across abrupt process/OS termination. Ordinary
write failures roll back; a surviving `.engineering-kit.lock` after a crash requires checking that no
setup process is running before removing it. Backups allow manual recovery after interruption.

Dry-run never creates a missing target. Repeat installation with unchanged sources is a no-op.
Symlinked managed paths are refused. Locally edited managed files stop updates and restoration.
`--replace-existing` is an explicit replacement for reviewed conflicts, not an automatic repair step.

## Diagnose and restore

```sh
bun run setup:doctor
bun run setup:plugin --check
bun run setup:restore --dry-run
bun run setup:restore
```

Restore returns managed files to their state before the first installation and removes newly created
ones, except for files explicitly reconciled with `--replace-existing`: a detected local edit makes
the exact pre-replacement file the new restore point for that file. This preserves accepted user
customizations. Earlier
snapshots remain in private backups for manual recovery. Unmodified updates retain the first snapshot.
Restore leaves unrelated files and backups intact. It refuses to overwrite later local changes,
in managed profiles; config.toml is left untouched. An empty directory
or backup directory may remain. The plugin is separate and remains installed after global restore.

To remove the plugin, use Codex's plugin removal UI or CLI. Remove its marketplace only when no other
plugins depend on it. Plugin removal and global restoration are independent.

## Updates

Pull an intentionally selected release and run frozen install plus `bun run check`. Review changes,
then rerun both setup commands (plugin first). Every push advancing an existing branch must carry a
higher plugin release version than its remote destination, including documentation-only changes.
Prepare the version change before committing; the pre-push gate checks committed content and never
creates a commit or edits versions. See [release workflow](releasing.md). A same-version reinstall is
not proof that cached resources changed. Never edit Codex cache contents as the source.

Global setup does not manage plugin registration or any other config.toml settings.

Start a new session after installing or updating. Confirm role names, skills and model selections in
that session. Full-history forks can constrain explicit model overrides in some clients; the parent
should provide a bounded prompt/context when selecting another model. Model availability and effective
concurrency are environment capabilities, not promises made by TOML files.

## Project hook trust

Git hooks require local activation. Codex hooks require explicit review/trust through the client's
hook mechanism. The plugin itself installs no global hooks. This repository provides a project Stop
configuration pointing to the tested template; it is skipped until trusted. Run `bun run check`
manually when hook execution is unavailable. The installer never bypasses hook trust.

## Installation scope

Global setup manages only agents/code_reviewer.toml. Private state,
backups, and a transient lock support repeatable installation and restoration. It does not migrate
legacy multi-profile or global-instruction installation state; that state must already be reconciled before using this
installer. Unknown managed paths are rejected rather than silently modified.
