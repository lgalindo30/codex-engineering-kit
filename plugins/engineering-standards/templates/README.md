# Bun project templates

These assets require Bun, including the scaffolder and hook scripts. Use them only for a project
that selected Bun. For Node.js, configure the selected package manager, runner, and framework directly;
static formatting assets may be adapted without copying Bun execution commands.

These assets provide a conservative quality scaffold, not an application generator. They do not install Hono, React, Next.js, Astro, Docker, authentication, or observability. A profile selects scoped project instructions; it does not invent application directories.

## Apply a scaffold

From a checkout of this kit, run:

```sh
bun plugins/engineering-standards/scripts/apply-project.ts --target /path/to/project --profile backend --dry-run
bun plugins/engineering-standards/scripts/apply-project.ts --target /path/to/project --profile backend
```

Profiles are `backend`, `frontend`, and `monorepo`. Use the actual project root. The command reports a full preflight plan, creates absent files, and leaves identical files unchanged. Any differing managed file, directory in place of a file, or file symlink aborts before writes. There is no force or merge option. Unrelated files are preserved. A concurrent process creating a destination file causes an exclusive-write error; files created by that run are rolled back without deleting a concurrent replacement. Empty directories may remain. Do not run concurrent initializers against the same directory.

An existing configured repository will commonly conflict. In that case, scaffold a temporary directory and review individual changes rather than overwriting the project. Keep a clean Git checkpoint before manually adopting templates; no existing file is overwritten by the initializer, so it does not create backups. The global installer has its own separate backup/restore mechanism.

In the generated project:

```sh
bun install
bun run format:check
bun run lint
bun run typecheck
```

The initializer pins the tested Bun baseline (1.3.14) in `packageManager` and exact tested quality-tool versions. Review dependency resolution and commit `bun.lock`; use `bun install --frozen-lockfile` in CI and containers. The 24-hour minimum release age applies to new resolutions. No dependencies are downloaded by the initializer itself. Run `bun run security:check` to audit the resolved dependencies; this network-dependent check is separate from local quality checks.

The scaffold includes ESLint flat configuration, Prettier, EditorConfig, and strict TypeScript. The initial `test` command intentionally fails with an actionable message: there is no application to test yet. Configure behavioral tests before replacing this placeholder. Backend tests use `bun test`; React tests use Vitest with React Testing Library, and browser journeys use Playwright. Only then run `bun run check` as the acceptance gate. Never bypass missing tests with an unconditional success or `--pass-with-no-tests`. Frontend setup must adapt JSX, browser/server TypeScript boundaries, framework lint rules, and Vitest/Testing Library commands. A monorepo must add real workspaces and aggregate their checks. Never claim the root scaffold checks packages that have not been wired into it.

## Optional Git hooks

These hooks are inert assets. Review them, copy `pre-commit`, `commit-msg`, `pre-push`, `check-staged.ts`, and `commit-message.ts` from `hooks/` into the target's `.githooks/`, then make the three shell files executable. Check `git config --local --get core.hooksPath` first. If already configured, integrate with that hook manager instead of replacing it. Otherwise activate with:

```sh
chmod +x .githooks/pre-commit .githooks/commit-msg .githooks/pre-push
git config --local core.hooksPath .githooks
```

The pre-commit checks a temporary snapshot of the Git index, using locally installed tools. It never formats or stages files, and correctly checks the staged version of partially staged files. The configuration and lockfile should be staged along with their setup. Conventional Commits are required; packages with a `workspaces` definition also require a scope. The pre-push runs types and tests across the configured project; specialize affected-package selection only when the repository has a trustworthy dependency graph. Hooks are not a substitute for CI.

## Optional Codex Stop hook

Review `hooks/check-stop.ts` and `hooks/hooks.json`, copy them into the project's `.codex/`, and merge the Stop entry if `hooks.json` already exists. A Codex project hook requires user trust; copying it does not imply that Codex has trusted or executed it. See the [Codex hooks documentation](https://learn.chatgpt.com/docs/hooks).

The hook resolves the Git root from the hook input's working directory and runs `bun run check` there in check-only mode when staged, unstaged, or untracked application/tooling files exist. Documentation-only changes are skipped. Every successful hook invocation emits JSON, including `{}` for skipped or passing checks. Existing unrelated source changes may also trigger it because a Stop event does not provide an authoritative task diff. The script cannot determine whether a change belongs to the current task.

Failed checks block the initial stop and provide diagnostics. A repeated unchanged failure is reported through `systemMessage` without another repair loop; changed failures have a three-attempt limit. Failed or unavailable checks must be disclosed, never described as passing. Failure fingerprints are stored in an untracked Git-internal state file. Run checks manually if hooks are unavailable. Malformed hook input is an execution failure, not a successful quality check.

## Deployment assets

This scaffold deliberately does not generate a pretend Docker build for an application that does not yet exist. The backend/frontend skills guide creating Dockerfile and Compose after the runtime entrypoint, build output, health route, persistence paths, and production commands are known. Kubernetes is outside the default scope.
