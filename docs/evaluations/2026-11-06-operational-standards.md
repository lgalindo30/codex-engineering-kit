# Operational standards implementation evidence — 2026-11-06

## Scope

The source changes extend shared observability, resource/recovery policy and optional Workers/D1 and
MCP profiles. The kit distributes instructions and optional assets; it does not instrument a client
application or install telemetry infrastructure. The original working changes were preserved in two
separate commits before adding the operational changes.
The proposed source version is 2.5.0, based on `be79593`. The 75 Markdown/YAML files under plugin
`skills/` and `references/` have SHA-256
`a1e54df27c6bbb38cb03fe5d84862eb75251209032f5607661e22d245ed99f18`.
The digest uses sorted repository-relative paths, NUL, file bytes, NUL. All nine original pending files
were checked byte-for-byte against their preserved state at `c164fc3`; later policy additions are separate.

## Executed local evidence

Bun 1.4.3, TypeScript 5.9.3 and Git 2.56.0 on macOS, using the existing development dependencies:

| Check                                                    | Result                                          | Scope                                                                  |
| -------------------------------------------------------- | ----------------------------------------------- | ---------------------------------------------------------------------- |
| Aggregate `bun run check`                                | Passed: 44 tests, 164 assertions                | Formatting, lint, strict types, tooling tests and reference validation |
| `bun test tests/git-hooks.test.ts`                       | Passed: 5 cases, 46 assertions                  | Actual Git dispatch in disposable linked worktrees                     |
| Invalid staged `debugger` with an unstaged correction    | Rejected; HEAD and working correction preserved | Real pre-commit, not direct helper invocation                          |
| Invalid commit message                                   | Rejected; HEAD preserved                        | Real commit-msg                                                        |
| Same-version push to a disposable local bare remote      | Rejected; remote ref unchanged                  | Real pre-push and committed version gate                               |
| Versioned change failing aggregate quality               | Rejected; remote ref unchanged                  | Real pre-push quality gate                                             |
| Corrected commit/push fixture and release-range CLI      | Accepted                                        | Local fixture only; no project remote used                             |
| Custom default hook and worktree-specific override       | Preserved; activation rejected                  | No partial shared configuration write                                  |
| Missing executable in another worktree                   | Activation rejected                             | Preflight before configuration write                                   |
| `bun run setup:hooks --check` in implementation worktree | Passed for primary and linked checkout          | Effective Git-resolved paths and executables, not hosted CI            |

Fixtures are test-owned, use synthetic identities and local paths, and are removed after each case.
Project commits use the activated hooks. No project push or deployment was performed.

## Limits and follow-through

The pinned Bun 1.3.14 could not be resolved by the local launcher because its registry request failed
with DNS resolution errors. The compatible locally available 1.4.3 runtime was used explicitly; this
does not establish a run on 1.3.14. No dependencies were changed or freshly installed.

The new GitHub release job was inspected locally; its range command has negative/positive executable
coverage. Hosted GitHub/Linux execution and branch protection remain unverified. Existing Vite+ 1.3.0
was exercised during the review in temporary fixtures: static checks rejected a type mismatch and
`debugger`, and accepted the corrected case. That does not establish a Vite+ Git-hook implementation;
the supplied staged hook remains for ESLint/Prettier projects.

The [new agent scenarios](scenarios/operations.md) were not run. No generated application, remote
telemetry sink, production CPU/latency, hard isolate termination, external provider reconciliation or
target MCP client was exercised for these policy changes. Structural references and a declaration of
skill use do not demonstrate those behaviors. Future adoption uses the optional
[operational acceptance record](../../plugins/engineering-standards/templates/operational-acceptance.md)
with actual implementation/check/signal evidence and explicit missing layers.

Plugin installation/cache refresh and session discovery are separate from committing the source.
The previously installed 2.4.0 cache was not rewritten. Existing projects keep their selected tools;
this change does not migrate their configuration or activate new remote services.

## Authorized synchronization follow-through

The subsequent authorized fast-forward preserved the original nine changes and published the separate
commits at `53ed1fa` (2.5.0). GitHub run 42157732067 passed the release job and both macOS/Linux quality
jobs on pinned Bun 1.3.14, establishing those previously unavailable checks. Its dependency audit failed
on transitive minimatch 10.2.6, advisory GHSA-g3hv-75wg-m249; that failure was not suppressed or retried
as a presumed transient error.

Patch 2.5.1 pins the root tooling override to minimatch 11.0.4 and regenerates the lockfile without
changing direct dependency pins. Registry inspection found the current direct-package releases still
request affected minimatch ranges. The newer 11.0.5 did not meet the existing 24-hour release-age policy;
11.0.4 did. See [the compatibility decision](../compatibility.md). The patch requires the aggregate,
negative worktree Git gates, frozen install and network audit before another authorized push; hosted
results and final installed-session discovery must be reported separately after they run.
The patch's local aggregate passed all 44 tests/164 assertions with Bun 1.4.3, including the real Git
negative worktree gates. `bun install --frozen-lockfile --offline` reported no changes, and `bun audit`
reported no vulnerabilities across 99 checked packages. These results do not predeclare hosted CI success.
