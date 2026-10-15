# Plugin Installation and Updates

## Install and inspect

Run `bun run setup:plugin --dry-run` to preview the supported Codex CLI commands, then run
`bun run setup:plugin` to register this repository's marketplace and cache its plugin. Check the result
with `bun run setup:plugin --check`. Setup refuses a marketplace already pointing at another checkout;
reconcile that registration deliberately before continuing. Keep the checkout available while using
a local marketplace. Setup does not publish the repository or configure Git identity.

`CODEX_BIN` selects the Codex executable. `CODEX_HOME` selects its configuration home and is inherited
by the CLI; use an isolated home when testing installation. The CLI owns plugin registration and
cache state. Global instructions, user agents, model preferences, and unrelated plugins are preserved.

Start a new session after installation. Confirm that the expected skills are discoverable; files on
disk and successful cache ingestion do not prove that a running session loaded the new instructions.

## Updates and removal

Pull an intentionally selected release, run `bun install --frozen-lockfile` and `bun run check`, then
rerun plugin setup and its check command. Authors preparing an update must follow the
[release workflow](releasing.md) before an authorized push.

A same-version reinstall is not proof that cached resources changed. Never edit Codex cache contents
as the source. Updating this plugin does not migrate applications previously generated from its
instructions or change their chosen runtime and tooling.

To remove the plugin, use Codex's plugin removal UI or CLI. Remove its marketplace only when no other
plugins depend on it. Preserve unrelated user configuration and plugins.

## Project hook trust

Git hooks require local activation. Codex hooks require review/trust through the client's hook
mechanism. The plugin itself installs no global hooks. This repository provides a project Stop
configuration pointing to the tested template; it is skipped until trusted. Run `bun run check`
manually when hook execution is unavailable. Setup never bypasses hook trust.
