# Consequence-based verification

Select verification from affected guarantees and the consequences of failure. Use independent
adversarial investigation to discover defects and executable properties, bounded fuzzing, corpus
replay and small behavioral checks to preserve valuable guarantees. Do not require a unit test per
function, branch or change. Properties can run at a unit or integration boundary; the technique
does not determine the runtime. Preserve project authority and suitable existing tools. Technology
guides own runners, adapters and runtime commands.

## Scope and review selection

Identify changed contracts, entrypoints, callers, shared dependencies, data, migrations, configuration
and side effects. Trace indirect consumers across actual package boundaries. Select checks and any
project-owned review recipes from this impact, rather than changed filenames alone. Unknown impact
requires broader relevant investigation, not every possible review.

For a material change or a project with review-only retirements, record a compact selection ledger:

| Guarantee or recipe ID | Changed source and indirect consumer evidence | Consequence | Triggered, not triggered or unknown; reason | Required checks/reviewer and owner | Result and remaining scope |
| ---------------------- | --------------------------------------------- | ----------- | ------------------------------------------- | ---------------------------------- | -------------------------- |

Match recipe triggers against contracts, shared dependencies, migrations and configuration as well
as implementation paths. Explain non-triggered relevant recipes; investigate unknown matches before
claiming complete verification. The coordinator owns selection and closure even when work is delegated.
A documented recipe is not proof that review occurred: retain the artifact, assigned role, executed
probes and completion state. If a project has no recipe inventory, derive the affected guarantees
without inventing a repository-wide registry.

Use a separate fresh-context discovery agent and independent finding validation for material changes
to authorization, private access, irreversible effects, recovery, concurrency or shared public
contracts, and whenever an applicable project recipe requires it. Follow
[adversarial review](adversarial-review.md) for role handoffs and execution evidence. A reversible
low-impact edit may need direct inspection and the relevant project checks only; record why heavier
review adds no necessary evidence. Missing required review leaves verification incomplete.

## Useful evidence

- Cover observable success, relevant invalid input and failures at changed boundaries. Test behavior,
  not private structure, incidental wording or an implementation copied into assertions.
- For a bug fix, show the same focused counterexample failing before the fix and passing after it when
  practical. The failure must demonstrate the defect, not missing setup. Reuse an existing protective
  test; disclose missing pre-fix evidence.
- Use the real engine/adapter for constraints, transactions, query semantics and migrations. Mock at
  external boundaries; label mocked browser journeys separately from those exercising a real backend.
- Use controlled clocks and observable events instead of arbitrary sleeps. Browser interactions need
  semantic locators, keyboard/focus checks and accessibility checks where relevant.
- Define properties from requirements with an independent expected-result oracle. Challenge the
  generator as well as the assertion; never use the production decision helper to label its inputs.
  Pair safety with successful progress, and normalization with preservation and distinction.
- Generate meaningful invalid transitions, boundaries, Unicode, time and controlled interleavings.
  A small state model must remain simpler than the implementation. Observe persisted effects and
  intercepted external calls when those are the guarantee; a pure helper cannot establish them.
- Select finite fuzz targets at concrete parsers, envelopes or state/input boundaries. Define allowed
  rejection, forbidden effects, resource bounds and successful completion. Investigate incorrect
  acceptance, private exposure, unexpected errors and hangs as well as crashes. More generated inputs
  do not establish coverage-guided fuzzing or full-application coverage.
- Keep useful minimized counterexamples in a property, bounded synthetic corpus or distinct regression
  check. Preserve fixed fixtures when generator upgrades would invalidate seed/path replay.

For generator design, causal witnesses, harness profiles and consolidation, read
[generated verification](generated-verification.md). A few reviewed property families can replace
many implementation-shaped examples without creating a standalone test for each generated input.

## Flow evidence

For bug fixes and features, map acceptance criteria to affected entrypoints, decisions and state
transitions, expected outcomes and executable checks. Keep a compact table when several paths need
tracking. Mark each check as passed, failed or unexecuted; record the reason for an omitted path.

Challenge materially distinct outcomes of changed decisions, compound guards, boundaries and relevant
error/recovery paths from the contracts and consequences. Include alternate callers, retry,
reset, navigation, permissions or concurrent operations when they can reach or reactivate the defect.
Choose cases from the actual dependency/state model; do not enumerate unrelated application flows
or every theoretical input combination. Explain unreachable branches and material coverage gaps.

Exercise the integration boundary when unit tests or mocks cannot demonstrate the acceptance criterion.
Keep compiled/runtime, browser, storage, TLS and provider evidence when those boundaries matter.
Recheck impacted cases after repairs; bind the verdict to the final artifact and execution envelope
defined in [adversarial review](adversarial-review.md#artifact-and-handoff).

For costly processing or changed resource guards, apply [resource budgets and representative fixtures](resource-budgets.md).
For operational instrumentation, exercise [coverage, privacy and observer failure](operation-observability.md#acceptance-and-adoption-evidence).
For gate changes, prove a known-invalid fixture is rejected through the real gate and a corrected one
is accepted; distinguish direct helper execution from Git/CI/client dispatch. Never inject faults into
the user's active work or use a real external destination to test rejection.

## Isolation and execution

Use disposable databases, directories, accounts and ports with deterministic fixtures and explicit
ownership. Confirm reset/drop targets and clean up only test-owned resources. Never test against
production or send real payments, messages or notifications by default; use selected sandboxes or doubles.
Reset state or use verified fresh per-attempt namespaces for every generated trial and shrink attempt,
including shared counters and pending operations. Restore fixture-only reset bypasses before exercising
production behavior. Settle owned asynchronous work before reuse and dispose owned runtimes.
Keep parallel runs independent and redact sensitive diagnostics.

Let the project set finite generation, execution, shrinking, review and CI budgets from measured cost
and risk. Bound process lifetime and cleanup; report timeout, interruption and unavailable execution
separately from product failures. A cooperative deadline does not cancel an active trial. If work
cannot settle, terminate/dispose its owned isolated process/runtime at the outer bound and never reuse
its state or report that trial as passed. There is no universal case ceiling, coverage percentage,
mutation score or finding quota.

Start with affected tests, then run the required project quality command and relevant production build.
Broaden checks for unresolved risk; do not repeat passing suites without new evidence. Investigate
failures without deleting assertions, masking flakes with retries or silently skipping missing tools.
Report commands and outcomes using the [delivery rules](workflow.md#delivery).

## Replacements and reduced protection

Preserve existing protective evidence during ordinary fixes. Use
[verification retirement](verification-retirement.md) when evaluating suite quality, replacing or
retiring checks, or transferring a guarantee to change-triggered review. It defines per-retirement
traceability, comparable detection/cost experiments and explicit acceptance of reduced continuous
protection. Passing a smaller suite does not establish equivalent detection.

Deliberate defects support those bounded evaluations and replacement decisions; they are not required
for every code edit. Establish an intact passing baseline and use disposable copies, including an
independently chosen held-out defect. Classify meaningful failures, equivalent/surviving mutants and
broken compilation/setup separately. Verify active source integrity and cleanup. No experiment may
weaken the user's active implementation to demonstrate detection.
