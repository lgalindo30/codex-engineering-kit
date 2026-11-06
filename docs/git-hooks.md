# Git hooks across worktrees

Run from the checkout where the work will be committed or pushed:

```sh
bun run setup:hooks --dry-run
bun run setup:hooks --activate
bun run setup:hooks --check
```

Activation is explicit and repeatable. The helper preflights every registered worktree, requires
executable `pre-commit`, `commit-msg` and `pre-push` files, and refuses custom effective hook paths,
active default hooks or unavailable worktrees. It sets only repository-local `core.hooksPath` to the
relative `.githooks` directory, then checks the actual Git-resolved directory in each worktree.
It does not install files, change global configuration, overwrite managers, or enable
`extensions.worktreeConfig`. Do not run concurrent setup commands.

Repository-local configuration is shared by default. Worktree-specific configuration can override it;
an absolute hooks path can also select another checkout's scripts. Inspect effective configuration,
not only `.git/config`. A linked worktree's `.git` is normally a file: use `git rev-parse --git-path`
for internal paths, and keep the hook commands relative to that worktree's root. Older branches need
compatible hook files before activation can cover them. Resolve conflicts deliberately with their owner.

`--check` is read-only and fails for inactive or conflicting setup. Passing confirms path resolution
and executable files, not their behavior. After changing hooks, exercise an invalid staged commit,
an invalid message, and a rejected pre-push from a linked worktree. Use a disposable local bare remote;
verify its ref stays unchanged after rejection and advances after the corrected case. Never use the
project's real remote for these tests. Preserve partially staged working files.

The kit tests exercise actual Git dispatch, version rejection, quality rejection, corrected acceptance,
default-manager conflicts and worktree overrides. The staged hook remains for the kit's established
ESLint/Prettier toolchain. It is not a Vite+ hook implementation. Other projects retain their selected
hook manager and need the same negative evidence through their actual check commands.

Hooks can be bypassed and are absent on new clones until activated. CI runs the aggregate independently;
the release CI job also checks committed version advancement. Required status checks and branch
protection are host settings and must be verified separately; a workflow file does not activate them.

Sources: [Git hooks](https://git-scm.com/docs/githooks),
[hooks path](https://git-scm.com/docs/git-config#Documentation/git-config.txt-corehooksPath),
[worktree configuration](https://git-scm.com/docs/git-worktree#_configuration_file).
