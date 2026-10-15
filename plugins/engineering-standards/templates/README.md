# Bun Project Templates

Use these assets only for a selected Bun project. They create quality configuration and scoped project
instructions, without installing application frameworks or choosing application directories. For Node.js,
configure its selected tooling directly; static formatting assets may be adapted.

## Apply a scaffold

From a kit checkout, use the actual project root and a `backend`, `frontend` or `monorepo` profile:

```sh
bun plugins/engineering-standards/scripts/apply-project.ts --target /path/to/project --profile backend --dry-run
bun plugins/engineering-standards/scripts/apply-project.ts --target /path/to/project --profile backend
```

The command preflights all files, creates absent files and skips identical files. A different managed
file, directory or file symlink aborts before writes; unrelated files remain untouched. There is no
force/merge mode. For configured projects, scaffold a temporary directory and review individual changes.

Do not run concurrent initializers. Exclusive writes reject concurrent file creation; rollback removes
only unchanged files created by that run, preserving concurrent replacements. Empty directories may
remain. Keep a Git checkpoint before manually adopting changes.

## Install and verify

Choose a compatible stable Bun runtime first; the initializer records its actual version in
`packageManager`. It does not download dependencies. Resolve compatible stable versions of `@eslint/js`,
`@types/bun`, `eslint`, `prettier`, `typescript` and `typescript-eslint` using
[dependency selection](../references/quality.md#dependency-selection), then install reviewed versions
with `bun add --dev --exact`. Review the manifest and commit `bun.lock`; CI uses `bun install --frozen-lockfile`.
The 24-hour release-age control remains enabled. `bun run security:check` is a separate network audit.

Initial checks:

```sh
bun run format:check
bun run lint
bun run typecheck
```

The `test` placeholder deliberately fails until behavioral tests exist. Backend tests use `bun test`;
React tests use Vitest/Testing Library, with Playwright for critical browser journeys. Adapt frontend JSX,
browser/server types and framework lint. Monorepos need real workspaces and aggregate checks.
Then use `bun run check` as the acceptance gate; do not bypass missing tests with unconditional success
or `--pass-with-no-tests`.

## Optional Git hooks

Review and copy `pre-commit`, `commit-msg`, `pre-push`, `check-staged.ts` and `commit-message.ts` from
`hooks/` into `.githooks/`. Inspect `git config --local --get core.hooksPath`; integrate an existing manager.
Otherwise activate:

```sh
chmod +x .githooks/pre-commit .githooks/commit-msg .githooks/pre-push
git config --local core.hooksPath .githooks
```

Pre-commit checks an index snapshot with local tools, including partially staged files; it never formats
or stages. Stage configuration/lockfile changes together. Commit messages require Conventional Commits,
with scopes for workspaces. Pre-push runs types/tests across configured packages. Hooks supplement CI.

## Optional Codex Stop hook

Review `hooks/check-stop.ts`/`hooks/hooks.json`, copy into `.codex/`, and merge existing hook configuration.
Project hooks require [Codex client trust](https://learn.chatgpt.com/docs/hooks).

The hook runs root `bun run check` for staged/unstaged/untracked application or tooling changes, skipping
docs-only changes. It cannot identify task-owned changes, so unrelated source edits can trigger checks.
Successful invocations emit JSON, including `{}` for skipped/passing checks; malformed input fails.

Failures block the initial stop. Repeated unchanged failures emit `systemMessage` without another loop;
changed failures allow three attempts. Fingerprints live in untracked Git-internal state. Disclose failed
or unavailable checks and run manually when hooks cannot execute.

## Deployment assets

Create Dockerfile/Compose after the runtime entrypoint, output, health behavior, persistence paths and
production commands exist. No placeholder deployment or Kubernetes setup is generated.
