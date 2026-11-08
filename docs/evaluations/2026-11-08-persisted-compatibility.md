# Persisted compatibility and review closure — 2026-11-08

## Scope and canonical owners

The user requested seven refinements and six temporary-project agent evaluations, with correction,
independent validation and cleanup, without commit or push. Base:
`33c853e5c64502270a010a5130cb9ffb73152361` (released 2.6.1). Installed cache was not modified.

- [Persisted identity](../../plugins/engineering-standards/references/persisted-identity.md) owns
  historical formats, parser/business/operation representations, missing historical information and
  coexisting-version schedules. Reliability, persistence, API contracts and the two responsible skills
  link to it; versioning is selected only when compatibility evidence requires it.
- [Retirement](../../plugins/engineering-standards/references/verification-retirement.md) owns
  shared setup, parameterized expansion, non-test fixture consumers, empty suites and overall runner
  status. No exclusions or assertion-count shortcuts substitute for preserved guarantees.
- [Review closure](../../plugins/engineering-standards/references/adversarial-review.md#evidence-export-before-cleanup)
  owns minimal evidence export, replay before cleanup, classification, redaction and project-owned retention.
- [Execution selection](../../plugins/engineering-standards/references/testing.md#execution-selection-and-evidence-reuse)
  owns proportional invalidation. Workflow, verification, strategy and retirement route there instead
  of imposing an unconditional runtime gate on prose. Executable instructions are behavioral even in
  Markdown; explicit project aggregate mandates and existing CI/hooks remain authoritative. This kit's
  own mandatory quality command still applies to this instruction change.

## Evaluation design

The parent supplied six raw synthetic projects. Three fresh-context agents each received two
realistic tasks, current source skill paths, project requirements and raw artifacts, with no intended
verdict or author rationale. They owned only assigned temporary directories. Each initial pair had a
six-minute bound. The parent integrated results; different agents independently validated other
authors' pairs under four-minute bounds. A final source-only policy audit had two minutes and found
no material gaps or contradictions. It is distinct from runtime evidence.

Runtime was existing Bun 1.4.3 on macOS/arm64, with actual bun:sqlite storage for the race. No packages,
network, credentials, production data, services or infrastructure were installed/accessed. No CRM or
installed-plugin files changed. Agents inherited coordinator configuration; exact serving model and
model cost were unavailable. These are bounded deterministic checks, not a fuzz campaign, general
compatibility proof or automatic CI integration. Standalone fixture typechecking/builds were not
provided; execution is not substituted for static type verification.

| Scenario                           | Initial observed failure                                                                                                              | Repair or correct disposition                                                                                                                           | Independent validation                                                                                                                                                                                                                     |
| ---------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Historical ASCII hashes            | Sorting keys changed format-1 insertion-order hashes and rejected the frozen receipt; baseline 0 pass/2 fail.                         | Dual format-aware writer/reader preserves historical bytes/results and new sorted writes; final gate 3 pass. Frozen history unchanged.                  | 22 observations and gate pass; tamper/unknown formats reject. Legacy rollback cannot read all format-2 writes; use compatible writes/dual readers, no universal rollback claim.                                                            |
| Omitted versus null                | Business defaults made `{}` and explicit null share replay identity; baseline 1 pass/1 fail.                                          | Identity uses original JSON object representation before defaults; business projection unchanged; final gate 2 pass.                                    | 24 observations and gate pass; literals/order/extras preserved. This is object-level JSON, not lost wire whitespace/numeric spelling, and not a global omission/null rule.                                                                 |
| Coexisting-version race            | New request paused after lookup; old receipt inserted, work advanced; resume returned current version 3 and added a duplicate effect. | Atomic persistence recheck returns original version-1 receipt, effects remain 2; a genuinely new key records its own effect/receipt. Final gate 3 pass. | Independent two-connection on-disk SQLite/barrier schedule confirms original receipt, current-state read and new key separately. No Promise.all ordering assumption or remote guarantee.                                                   |
| Incomplete historical receipt      | Lossy summary replay returned current version 9 despite original result version 1 and absent request bytes/hash.                      | Request variants explicitly indeterminate; authenticated receipt-id recovery preserves original result. Final gate 2 pass.                              | Eight independent variants remain indeterminate; recovery stays version 1. Fixture assumes trusted receipt lookup; external authentication is not implemented or inferred.                                                                 |
| Retired shared setup and consumers | Removing prepare broke all three retained parameterized checks; removing fixture broke CLI import.                                    | Shared seed relocated to owned source; each case prepares itself; CLI updated. Final aggregate passes 3 cases plus CLI.                                 | Each retained case passes alone. Independently held-out inverted CLI guard lets tests pass but aggregate fails in both original/final copies for the intended CLI error. Passing assertions do not override gate failure.                  |
| Export before cleanup              | Empty-input acceptance remains a read-only finding; deleting the sole source would lose replay.                                       | Retained minimal source/probe/command/output/hashes; replay verified before and after disposable deletion within a local 64 KiB envelope.               | Exported probe also runs in an unrelated fresh directory after original deletion, failing on the intended contract assertion, not missing imports. Aggregate exits 1 for no tests: separate baseline runner failure, never a product pass. |

Initial source/historical bytes, repaired source, tests, independent expectations, exact outputs,
commands, hashes and limits are retained in the local evidence. No historical receipt/reservation was
rewritten to pass a check. Mixed-version timing exists only in the actual SQLite scenario; pure hash
and omission APIs do not claim storage schedules. Seed/shrink coordinates do not apply to these
deterministic probes. Injected readiness/CLI defects are counted separately from seeded contract
failures and setup problems. No total performance or maintenance savings are claimed.

## Iteration and proportional evidence

The retirement author initially placed snapshots/fault copies where Bun recursively discovered them.
It disclosed the failed overall gate despite passing assertions, archived immutable snapshots and
removed runnable fault copies, then renewed the unfiltered gate. Independent validation confirms
exactly three retained cases plus CLI, without skips/exclusions. No instruction change was justified
by that self-corrected setup mistake; the existing isolation rule already covers it. Independent
validation found no remaining repair defect within the six exercised contracts.

Authors and validators separately assessed README-only wording versus executable Markdown changes.
Pure prose preserves relevant runtime evidence with document checks; changed commands/instructions
require actual dispatch and affected runtime evidence. Unconditional project checks remain binding.
No actual behavior-affecting instruction change was mislabeled prose-only. Unknown impact requires
broader investigation under the canonical policy, not extension-based skipping.

## Evidence export and final cleanup

Archive: `.local/evaluations/2026-11-08-persisted-compatibility/evidence.tar.gz`, SHA-256
`abf565a76c17dec89faabec86960f6bfc850a0f764ba5d96696d714fd67a0ee4`.
The parent extracted it to an unrelated temporary location, verified all five repaired project gates
(3/2/3/2/3 passes, plus retained CLI) and the sixth probe's intended contract failure. It then deleted
the original six projects and replayed the exported artifacts again: identical gate outcomes and
the exact intended empty-input assertion, with no missing dependency/setup failure. Evidence is
therefore usable without the original temporary projects, not merely a hash of deleted probes.

The inert local archive and replay logs remain ignored; both sets of temporary projects and owned
setup/replay scripts were removed after verification. No live runtime/database process remains.
The export case's product defect and baseline empty-suite failure are deliberately preserved as
read-only evidence, not unresolved defects in the kit or hidden successful product checks.

## Repository checks and remaining limits

`bun run check` passed formatting, lint, strict TypeScript, all 44 existing tooling tests and
structural/reference validation. Effective hooks passed for both registered worktrees without
configuration changes; `git diff --check` passed. No dependency change required a registry audit.
The earlier optional Python-validator limitation was not bypassed by installing PyYAML; Bun validated
skill metadata, reference ownership/reachability and local links. No kit tests were removed.

The six scenario results establish manual instruction use, local execution and independent validation
within these synthetic contracts. They do not establish live authentication, deployed storage,
arbitrary cross-process/version compatibility, automatic agent CI integration or general defect parity.
At evaluation closure, the changes were unstaged/uncommitted; no push, release bump or installed-plugin
update had been performed. The released commit identified above is the evaluation base.
