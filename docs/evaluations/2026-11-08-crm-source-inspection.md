# CRM source inspection and verification refinement — 2026-11-08

## Scope and inspected state

The user requested inspection of the originating CRM's actual uncommitted work to refine the kit's
adversarial-adoption instructions. This continues the
[initial adoption](2026-11-07-adversarial-adoption.md), which read the CRM plans/reports and evaluated
the kit on synthetic changes. The CRM's own instructions and adversarial procedure remain its
authority; Engineering Standards was not imposed on that project.

The workspace was on `main`, base `ddcf50db519e701c6d5bcecdbbf9678173e05237`, with no staged diff.
The tracked unstaged diff contained 250 files, 922 added lines and 73,114 removed lines; those figures
exclude new untracked files. The selected technical inventory also included 27 untracked
test/fixture/script/document files. Its path/content-or-deletion hash inventory has SHA-256
`1dd8998a2f72cc041dab2aab6e8f51531974bf1136031c42e7484f43aa112fea`.
The inventory hashes each file's bytes, then hashes sorted path, NUL, hex content hash or `deleted`, NUL.

Git HEAD contained 210 CRM `*.test.ts` files. The complete working diff removes 182 and adds 12 new
untracked test files, leaving 40. Eight supporting fixtures are deleted. The broad reduction report's
181 deletions describes a later phase; the complete base-to-working-tree diff additionally includes
the earlier deleted HTTP test. No tracked Playwright file or Vite test-discovery configuration changed.
The retirement manifest sums to 139 Vitest cases, including 34 property declarations. These are
inspected selection records; fresh execution of the complete CRM suite was not performed here.

The migration changes three production files: HTTP cancellation, URL escape normalization and the
append-validation policy version. Those corrections are distinct from later test-only retirement.
Only reading `git diff` would have missed the new property implementations and harness entirely.
Both tracked diff bytes and relevant untracked source were inspected/pinned separately.

## Source observations and transferred instructions

The parent inspected HTTP/identity properties, their original examples, source corrections, harness,
campaign script, package commands, discovery configuration, artifact-parity table and selection
manifest. Two read-only agent passes inspected state models and auth/delivery/operations respectively,
including representative deleted originals read from Git HEAD. Their reports pin 26 and 20 current
files and six and nine historical originals. This is a representative source inspection, not an
exhaustive reconciliation of every removed assertion or a renewed CRM acceptance verdict.

| Concrete CRM source evidence                                                                                       | Observed mechanism                                                                                                                                                              | Kit refinement or existing protection                                                                                                                                                |
| ------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `tests/prospecting/identity-properties.test.ts:73–129,133–184,187–225` versus former URL example matrices          | Seven property families generate spellings, provenance and ambiguous/exact identity scenarios with independent expected literal keys; five distinct boundaries remain separate. | Clarify cohesive family consolidation and generated trials versus maintained examples; do not require a separate test or inventory row for every scalar variation.                   |
| `tests/api/http-properties.test.ts:64–78,177–225`                                                                  | JSON serialization semantics, UTF-8 partitions, independent validity classification and first-observable-error outcomes define the oracle.                                      | Explain representation-aware expectations; semantic equality and allowed failure ordering must come from the contract, not incidental implementation.                                |
| `tests/api/delivery-properties.test.ts:255–296`, `tests/prospecting/workflow-properties.test.ts`                   | Essential outcome examples and page-tail witnesses supplement inexpensive random domains; boundary witnesses can exceed ordinary generator sizes.                               | Require essential selected outcomes to execute within ordinary budgets, not merely be possible in a generator. Witnesses can live inside a property/corpus.                          |
| Native claim properties in `tests/api/automation.test.ts`, store revision fence and retained history-clock witness | A failed claim may be denied by another guard; preflight and atomic commit need distinct observations.                                                                          | Add causal guard witnesses with unrelated guards valid, distinguishing preflight, commit and whole-operation evidence. This source caveat is not a confirmed CRM defect.             |
| `tests/crm/mutation-properties.test.ts`, document recovery properties and fixtures                                 | Model observations include rows, audits, reservations, original receipts and terminal state. Test reset restores guards; some attempts use fresh scoped identities.             | Preserve the existing real-boundary rule and clarify verified namespaces as an alternative to destructive reset; restore fixture-only bypasses before behavior executes.             |
| `tests/auth/oauth-concurrency.fixtures.ts:157–193` and former dedicated harness check                              | Pending work is gated/drained where possible; an unusable timed-out runtime is disposed, and catching the timeout cannot make the harness pass.                                 | Clarify outer lifetime bounds, failed/incomplete status and no state reuse after unjoinable work; avoid an instruction to await forever.                                             |
| `tests/property-support.ts`, `scripts/testing/property-campaign.ts`, package scripts                               | Ordinary discovery includes properties and retained cases. Scoped/extended/fuzz targets have separate filters, profiles, seeds and budgets.                                     | Verify actual scoped dispatch, target reconciliation and failure propagation; filtered success is not a complete-gate pass. Keep stable replay identities and project-owned budgets. |
| OAuth, delivery, Keychain, backup/configuration properties and retained boundaries                                 | Invariants consolidate many service examples while distinct native restore, historical migration, filesystem/process and socket witnesses survive.                              | Existing real-boundary and reduced-protection rules already cover this; no new infrastructure, authentication migration or universal retention rule was added.                       |

The maintained implementation lives in
[generated verification](../../plugins/engineering-standards/references/generated-verification.md),
linked conditionally from the shared policy and testing-strategy. Change-verification links causal
witnesses; Workers guidance accepts the shared isolation alternatives. Retirement guidance now
explicitly prefers replacing redundant matrices with reviewed invariant families, permits cohesive
group mappings, and separates product-correction phases from test-only retirement phases.

No CRM-specific case ceilings, sample counts, seed algorithms, runner versions or review time budgets
became kit defaults. A scoped browser/API authentication wording question was recorded in the local
inspection evidence but left outside this verification refinement; the CRM helper has its own reviewed
durable renewal protocol.

## Fresh bounded HTTP replay

Copies of Git HEAD and current `readJsonBody` were exercised with both the four original examples
and the six actual new HTTP properties. Other source dependencies were copied unchanged; the only
test adaptation replaced the `vite-plus/test` import with `bun:test`. The existing installed
fast-check 4.10.2 was reused read-only. No dependency installation, network, credentials or CRM writes
were involved. Runtime was Bun 1.4.3, not the CRM's selected Node/Vitest execution path.

| Source artifact        | Original examples | New properties | Observed boundary                                                                                               |
| ---------------------- | ----------------- | -------------- | --------------------------------------------------------------------------------------------------------------- |
| Git HEAD               | 4 pass            | 4 pass, 2 fail | Rejecting cancellation changes the expected 413 to 500; pending cancellation delays an already-known rejection. |
| Current working source | 4 pass            | 6 pass         | Both counterexamples reject as intended; byte/JSON/UTF-8 and reader-release observations also pass.             |

The rejecting-cancellation counterexample is `[null,[],false,true]`, seed `862344666`, path `0`.
The pending-cancellation counterexample shrinks to `[Uint8Array.from([0])]`, seed `1183492909`,
path `0:0:0`. Failures came from the intended functional assertions, not compilation or setup.
Each property requested 500 pure trials plus its fixed examples. Single-process wall observations
were approximately 19/236 ms for original/property checks on HEAD and 7/209 ms on current source;
these single samples do not establish performance savings or the complete CRM gate result.

This replay corroborates one concrete migration mechanism: old examples can remain green while
contract-derived properties detect real defects and their corrections. It does not establish D1/R2,
identity, browser, native TLS, deployment behavior or full before/after detection parity. The reported
2,162-to-139 complete-suite reduction and preserved 155 browser cases remain historical CRM evidence.

## Refinement validation

A separate read-only pass inspected the six current policy/skill/reference files touched by the
focused refinement and reported zero material contradictions or omissions. It did not run CRM tests
or substitute source inspection for agent behavior. The two source-inspection passes took roughly
196 and 295 seconds; model monetary cost was unavailable.

The focused forward-test supplied the revised testing-strategy skill, a frozen plugin snapshot and
raw Bun/TypeScript reservation-decision fixture. The request was to propose and evaluate compact
generated replacements for repetitive examples, preserve source/old tests, use existing dependencies,
map retirements and report actual counts/costs/limits. No intended answer, private defect or previous
conclusion was supplied. The six-minute task completed in 258.1 seconds.

| Observation               | Executed result                                                                                                                                                                                                                                     | Limit                                                                                                                |
| ------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| Cohesive consolidation    | Three generated properties express valid progress, independently invalid guards and competing-invalid subsets instead of 48 scalar examples. They request 400 trials each, seed `20261108`, plus mandatory long/Unicode/integer/boundary witnesses. | Proposed replacement only; no old test was deleted or transferred to review-only.                                    |
| Ordinary runner selection | The unchanged project check discovers 48 old cases plus three generated declarations: 51 passed, 3,275 assertions, including 1,200 generated trials and fixed witnesses.                                                                            | Pure-helper evidence, not storage, transport or application integration.                                             |
| Causal sensitivity        | On eight author-selected functional defects, the generated checks detect eight and the old examples three. An ignored hold survives old examples because stale revision masks it; focused generated witnesses expose it.                            | Author-selected set, not independent detection parity.                                                               |
| Outer lifetime handling   | Disposable noncooperative process probes are terminated at their outer bounds, with exits 137/143 and incomplete product verdicts. Owned scratch copies are removed.                                                                                | Tests the comparison harness's process cleanup, not universal preemption by the project's ordinary Bun test command. |
| Total-cost honesty        | One intact comparison observed about 7 ms for old examples versus 26 ms for generated checks; the candidate has more generator/oracle code.                                                                                                         | Single samples; no time, model-cost or long-term maintenance saving is claimed.                                      |

The parent then supplied a separate post-design source challenge that compared only the first
character of actor/owner identity. It was not one of the author's eight defects. The old 48 examples
still passed; the three generated checks produced one pass and two functional failures. A separate
agent independently derived requirements before reading comparison output and reproduced owner
`alpha` versus foreign actor `alpine` with every other guard valid. It verified successful/denied
controls, matched artifact hashes, and reran normal discovery: intact 51 passed; challenged 49 passed
and two failed. Validation completed in 125.608 seconds. This demonstrates sensitivity to that
identity defect, not reviewer discovery rate or broad replacement parity.

The challenged source SHA-256 is
`11d6740ac3e265332a137c30c0d05f25e46c16bcc08756cfe70f874a69602a00`;
the intact source is `dc0d7f9c2a7c2c01d6d1aa82383dbc9182636c55e8beddc479f12ec8348323e6`.

## Artifact identity and verification limits

The 78 skill/reference Markdown/YAML files in the forward-test snapshot have aggregate SHA-256
`b39b7fc98c5406cba9f2ed8c03d5c34172c27c77c63dfe1e2ac5dec0aecc1c7d`.
The final refinement has SHA-256
`ff80ffd7832056e0d806b8cffdb61d5bd188fc5da591f3fe944e2ecb97d7b92c`.
Each uses sorted canonical repository-relative path, NUL, file bytes, NUL. The final version adds
explicit preflight/commit and timeout-ownership clarifications, adjusts Workers isolation wording and
separates source-correction phases. Those final textual differences received the separate source
inspection; the full agent authoring task was not repeated on the final bytes. These scopes remain
distinct. Agents inherited coordinator configuration; exact serving-model identity/cost was unavailable.

All 277 selected CRM path states/content hashes, its branch/base and staged diff matched the initial
inventory after inspection and replay. No CRM source, test, configuration or dependency was modified.
No CRM command or full gate was executed in place. Its historical 2,162-to-139 suite result is not
relabeled as a fresh run. No Engineering Standards tests were removed either.

## Local evidence and cleanup

The ignored local archive is `.local/evaluations/2026-11-07-crm-live-review/evidence.tar.gz`, SHA-256
`c1762f73d425e7de88e4ba9de330f2fd0d0c16884c336e4323e7e4c75f576e6b`.
The directory date identifies the inspection's start; reporting completed after the local date changed.
It retains selected CRM snapshots/diff, input hashes, source-inspection notes, earlier/final instruction
snapshots, adapted HTTP replay, synthetic forward trial, challenge, independent validation and logs.
Dependency links refer to existing local installations; dependencies were not installed or vendored.
This is private local replay evidence, not a distributed archive or production-data capture.

Evaluation-owned processes completed or were killed/awaited at their bounds, and temporary copies
were removed after archiving. The source CRM checkout remains unchanged. The kit changes remain
uncommitted; no push or plugin-cache update occurred.

## Final repository verification

`bun run check` passed formatting, lint, strict TypeScript, all 44 existing tooling tests with zero
failures, and structural/reference validation. `bun run setup:hooks --check` passed for both registered
worktrees without activation/configuration changes. `git diff --check` passed. The existing compatible
Bun 1.4.3 executable was prepended to PATH to avoid the Vite+ shim's network resolution attempt.
No dependencies changed, so no registry audit was required. The earlier optional Python-validator
limitation (missing PyYAML) was not bypassed by installing packages; the Bun structural validator passed.

The kit HEAD remains `a6a174a39a9c7dad5cee8aaea43fe3febaf531b5` with the accumulated adoption/refinement
changes uncommitted. No user configuration, installed plugin, CRM source or production state changed.
