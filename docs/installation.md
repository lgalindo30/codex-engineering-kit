# Installation, Updates, and Restoration

## Two independent installation surfaces

Run `bun run setup:plugin` before `bun run setup:global`. Plugin setup uses the Codex CLI to register
this repository's marketplace and cache its plugin. Global setup then captures the current config,
including any plugin registration, before changing only its agent settings. Neither command publishes
the repository or configures Git identity. Keep the checkout available while using a local marketplace.

`CODEX_BIN` selects the Codex executable for plugin commands. `CODEX_HOME` selects its configuration
home and is inherited by the CLI. Global setup also accepts `--codex-home PATH`; this argument belongs
only to global setup, so use CODEX_HOME for isolated plugin tests.

## Global file behavior

- AGENTS.md: adds or updates a marked kit block, preserving surrounding user instructions. Review
  conflicting old preferences manually. A nonempty AGENTS.override.md shadows it and is flagged by doctor.
- agents/*.toml: installs exactly five profiles. Differing existing profiles cause a preflight error.
  Review the diff before explicitly using `bun run setup:global --replace-existing`.
- config.toml: patches four scalar keys under [agents], preserving other settings and tables. Replaces
  the legacy max_threads alias with the current concurrency key. Unusual inline/dotted agents tables
  require manual normalization; malformed TOML is rejected before any managed file is written.
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
additions; that snapshot can also contain previous kit settings or its instruction block. Earlier
snapshots remain in private backups for manual recovery. Unmodified updates retain the first snapshot.
Restore leaves unrelated files and backups intact. It refuses to overwrite later local changes,
including unrelated edits to config.toml; reconcile those edits manually first. An empty directory
or backup directory may remain. The plugin is separate and remains installed after global restore.

To remove the plugin, use Codex's plugin removal UI or CLI. Remove its marketplace only when no other
plugins depend on it. Prefer global restore before plugin removal so the captured config still matches.

## Updates

Pull an intentionally selected release and run frozen install plus `bun run check`. Review changes,
then rerun both setup commands (plugin first). Every push advancing an existing branch must carry a
higher plugin release version than its remote destination, including documentation-only changes.
Prepare the version change before committing; the pre-push gate checks committed content and never
creates a commit or edits versions. See [release workflow](releasing.md). A same-version reinstall is
not proof that cached resources changed. Never edit Codex cache contents as the source.

If plugin setup changes config.toml after global installation, global setup may report a local edit.
Review that diff and use the backed replacement option only when intended. Global restore remains
conservative rather than merging arbitrary later configuration changes.

Start a new session after installing or updating. Confirm role names, skills and model selections in
that session. Full-history forks can constrain explicit model overrides in some clients; the parent
should provide a bounded prompt/context when selecting another model. Model availability and effective
concurrency are environment capabilities, not promises made by TOML files.

## Project hook trust

Git hooks require local activation. Codex hooks require explicit review/trust through the client's
hook mechanism. The plugin itself installs no global hooks. This repository provides a project Stop
configuration pointing to the tested template; it is skipped until trusted. Run `bun run check`
manually when hook execution is unavailable. The installer never bypasses hook trust.
