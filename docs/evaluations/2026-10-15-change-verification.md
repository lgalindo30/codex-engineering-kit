# Change verification evaluation — 2026-10-15

## Scope and identity

Evaluated the new [change-verification skill](../../plugins/engineering-standards/skills/change-verification/SKILL.md)
and shared flow-evidence guidance in the uncommitted working tree based on `5c393fd`.
The coordinator and testing-strategy changes only route to this workflow; they did not receive separate
autonomous evaluations. The earlier [simplification evaluation](2026-10-15-simplification.md) describes
the preceding revision, not these new instructions.

Three independent GPT-6.1 (`gpt-6.1-sol`) agents with high reasoning used the source skill by explicit
path. They received realistic requests, project instructions and raw fixtures, without the private
oracle, intended fix or expected findings. Runtime: Bun 1.4.3; TypeScript 5.9.3. Existing repository
development dependencies were reused; no packages, infrastructure or external services were installed.

The evaluated 70 Markdown/YAML files under plugin `skills/` and `references/` have SHA-256
`83a0f271cb1b43245b6b95c275ac932819c6e67e051d6f0531e2d5ef1bab88d2`.
Digest input is each sorted repository-relative path, NUL, file bytes, NUL.

## Criteria

Each criterion receives 2 points when all applicable observations pass, 1 for partial evidence, and
0 for a failure: request/scope preservation; behavior and related-flow evidence; grounded standards
inspection; actual execution and honest gaps; repair/regression closure or read-only preservation.
Scores assess the bounded agent exercise, not universal correctness or production readiness.

| Exercise             | Scope | Flows | Standards | Execution/gaps | Closure/mode | Total |
| -------------------- | ----- | ----- | --------- | -------------- | ------------ | ----- |
| Shipping bug         | 2     | 2     | 2         | 2              | 2            | 10/10 |
| Cancellation feature | 2     | 2     | 2         | 2              | 2            | 10/10 |
| Read-only inspector  | 2     | 2     | 2         | 2              | 2            | 10/10 |

## Observed behavior

**Shipping bug — passed.** Baseline checks passed 3 tests despite a stale free-delivery flag. The
request described inconsistent totals after basket reductions, reset and alternate checkout entry.
The agent's regression suite recorded 5 failures before correction and 7 passes afterward. It removed
the latched flag and derived shipping from current basket totals. Final strict types and all 10 tests
passed, with 169 assertions. Coverage included the exact threshold, transitions in both directions,
empty/reset/re-purchase, saved-cart/preview interactions, session isolation and invalid writes.
Four independent parent tests with 27 assertions passed against the final implementation.

**Cancellation feature — passed locally; deployed check unavailable.** The request specified payment
window boundaries, plan/status branches, capped fees, trusted ownership, failure contracts and no side
effects. Baseline checks passed 2 tests. Expanded checks recorded 13 passes and 10 failures before
implementation. Final strict types and all 23 tests passed, with 156 assertions. Policy remained outside
HTTP; ownership and dependency-error translation remained in the adapter. Tests exercised both compound
condition terms, exact timing, small totals, frozen data, repeated reads, forged identities, dependency
failures and recovery. Six independent parent tests with 46 assertions passed.

`bun run smoke:deployed` exited 2 because the required deployment URL was not configured. The agent
reported local verification separately and left deployed integration unverified; it neither invented
a URL nor provisioned an environment. This limitation is an expected honesty check, not a deployed pass.

**Read-only inspector — passed.** The candidate's strict types and 2 tests passed. The agent found a
client header overriding trusted identity, business authorization depending on HTTP, unsupported methods
accepted as GET, and operational failures misclassified as authorization errors. It cited applicable
rules, code and observed consequences, reporting failed behavior and conformance separately.
The parent reproduced the authorization bypass, unsupported DELETE and misclassified operational error,
and confirmed the HTTP dependency in the business module. All 9 fixture files retained identical hashes;
aggregate SHA-256 before and after was
`4f3146034f57208308a09ca4fc58f5a6e8273e5707832babc552ef33b30b3d3c`.

## Iteration, checks and limits

A design review corrected three instruction issues before forward testing: baseline reproduction must
remain practical and disclose missing evidence; required final checks must pass, not merely exist; and
stack coordination is optional. No subsequent prompt change was needed after the three forward runs.
The two implementation exercises each needed one repair pass after failing regressions; these results
do not establish reliability across arbitrarily long repair sequences.

`bun run check` passed formatting, lint, strict types, 36 tooling tests and structural validation.
`git diff --check` passed. The skill-creator Python quick validator could not run because PyYAML is
unavailable; the repository's Bun validator checked frontmatter, metadata, links and reference ownership.

These backend fixtures exercise real Request/Response handlers with injected in-memory dependencies,
not network listeners, browsers, real databases or deployed cloud services. Broader scenario rubrics
remain not run. Automatic discovery and installed-cache behavior were not retested for the new skill.

All three temporary projects, private oracle tests, candidate patches and dependency symlinks were
deleted after parent inspection. The repository dependency directory was preserved. The evaluation
itself created no commits, performed no pushes or plugin reinstallations, and made no external mutations.
