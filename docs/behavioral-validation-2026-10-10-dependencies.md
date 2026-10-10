# Dependency Policy Evaluation — 2026-10-10

This bounded evaluation covers selecting current stable dependencies, compatibility checks and
preserving existing project choices. Version numbers below are observations, not project defaults.

## Evaluation setup

One fresh subagent was requested with `gpt-6-luna`, reasoning `high`, without inherited conversation.
It received an isolated plugin snapshot and realistic new-project and existing-project tasks,
without expected answers or previous evaluation results. Requested dispatch settings do not establish
independent backend model identification. The snapshot contained the pending dependency-policy changes
on repository base `bc95bd1`, plugin version `2.1.1`.

The agent owned temporary fixtures and a package cache outside application directories. It read the
repository-quality and Bun guidance, scaffold documentation and shared dependency-selection policy.
Explicit snapshot selection was tested; automatic native skill discovery was not.

## Observed behavior

The new Bun/strict TypeScript project used the optional scaffold, replaced its failing test placeholder
with four string-utility behavior tests and installed reviewed exact dependency versions:

| Package           | Adopted version |
| ----------------- | --------------- |
| @eslint/js        | 10.0.1          |
| @types/bun        | 1.4.2           |
| eslint            | 10.12.0         |
| prettier          | 3.9.9           |
| typescript        | 6.0.3           |
| typescript-eslint | 8.71.1          |

Official registry queries identified TypeScript `7.0.2` as latest, outside typescript-eslint's
`>=4.8.4 <6.1.0` peer range. Luna selected the newest compatible stable version instead. Its first
installation attempted Prettier `3.9.10` and failed because of the configured 24-hour release-age
protection. It disclosed the block and selected `3.9.9` without disabling that protection.

The parent inspected the actual manifest, source and tests and independently repeated `bun run check`:
format, lint, strict types and all four tests passed under Bun `1.4.2`. Frozen installation reported
101 installs across 102 packages with no changes. Luna also ran the fixture audit successfully,
reporting no vulnerabilities across 98 packages; the parent did not repeat that fixture audit.

The existing fixture intentionally selected Zod `4.3.5`, while registry latest was `4.6.5`, and had
its own manifest, lockfile, TypeScript configuration and tests. The initializer rejected conflicting
configuration before writing. Luna changed only string-label behavior and added a regression test.
The parent repeated the conflict check, frozen installation and existing aggregate check: types and
all three tests passed; six installs across seven packages required no changes. Manifest and lockfile
hashes matched Luna's recorded pre-change hashes:

```text
fd3cdc0e09c29758b27f235bb7da3e966b93213d57d7ae6d1892ced51b25297f  package.json
82290b2bb4227533e57543c543d7fd41434a045a9aab3713e45899e2e382f7e4  bun.lock
```

## Repository checks and limits

Repository `bun run check` passed formatting, lint, strict types, 33 tests with 80 assertions,
and plugin metadata/reference/source-limit validation. The parent repository audit reported no
vulnerabilities across 98 packages. Initial unprivileged registry queries failed DNS resolution;
scoped network access succeeded. Those failed queries were not counted as passing checks.

The agent completed before the parent removed the temporary snapshot, fixtures, installed packages
and cache; removal was verified. This report retains reviewed evidence, not executable fixtures.
No cloud deployment, global configuration change or plugin installation was part of the evaluation.
These cases support the intended behavior; they do not guarantee every future dependency combination,
workspace layout, package manager or agent decision.
