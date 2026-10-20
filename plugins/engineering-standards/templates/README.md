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
`packageManager`. It does not download dependencies. New scaffolds use a shared `vite.config.ts`
with Vite+ formatting, lint and enabled type checks; no ESLint, Prettier or Turborepo config is generated.
Legacy ESLint/Prettier assets remain available only for established compatible projects.

Resolve compatible stable versions of `vite-plus`, `@types/bun` and `typescript` using
[dependency selection](../references/quality.md#dependency-selection), then install reviewed versions
with `bun add --dev --exact`. Follow [Vite+ setup](../references/vite-plus.md) for supported Node,
Vite/Vitest overrides and framework integration. Review the manifest and commit `bun.lock`; CI uses
`bun install --frozen-lockfile`. The 24-hour release-age control remains enabled.
`bun run security:check` is a separate network audit. No global Vite+ installation is required.

Initial static checks are `bun run format:check`, `bun run lint` and `bun run typecheck`.
`bun run check` aggregates `vp check` with tests, plus the frontend production build.
Frontend scripts use `vp dev`, `vp build`, `vp preview` and `vp test run`; supply the actual application,
framework plugin and behavioral tests before acceptance. Prefer `bun create vite-plus` for a complete
new React/Vite app and review compatible kit assets afterward instead of overlaying initializers.

Backend and monorepo test placeholders deliberately fail until behavioral tests exist. Backend tests
can use `bun test`; React tests use Vite+'s Vitest with Testing Library and Playwright for critical
browser journeys. Adapt frontend JSX, browser/server types and framework lint. Monorepos need real
workspaces and Vite Task aggregation. Do not bypass missing tests with unconditional success or
`--pass-with-no-tests`. Bare `vp check` runs static checks, not the aggregate package script.

## Optional Git hooks

The supplied staged hook targets legacy ESLint/Prettier projects. Do not copy it into a Vite+ project;
hook migration is outside this setup.

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
