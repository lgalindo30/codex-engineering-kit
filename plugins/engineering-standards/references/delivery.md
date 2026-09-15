# Delivery in Verified Slices

Use for substantial implementation work. Scale the process to the task: a small correction does not
need a separate planning document, a fixed number of steps, or an approval checkpoint before each edit.
The parent owns scope and integration; implementers own verification of their assigned behavior.

## Establish the evidence and scope

Identify the observable outcome, acceptance criteria, dependencies and explicit exclusions. Inspect
nearby implementation and tests before choosing an approach. For existing projects, capture only
conventions relevant to the change, with representative file or symbol references: file placement,
error mapping, response shapes, persistence boundaries and fixture patterns. Distinguish observed
patterns from assumptions; do not treat a single example as a universal rule without corroboration.

Run a useful baseline check when needed to distinguish existing failures from regressions. Record
unavailable prerequisites or pre-existing failures without silently fixing unrelated issues or
claiming a clean baseline. Do not require every repository test before every small change.

## Implement, verify, continue

Order work by dependencies and choose small slices of externally observable behavior. Each slice
includes the necessary validation, failure handling and meaningful verification across its boundaries.
Extend storage and abstractions only as needed, rather than building speculative layers first.
Establish startup configuration and essential safeguards when first needed, not as a final cleanup.

For each slice, decide what evidence will demonstrate success, implement it, then run the relevant
checks before accumulating dependent work. A route slice may exercise HTTP parsing through storage
and serialization; a UI slice may cover user action, API interaction and visible error behavior.
Use a real process or browser check where unit/in-process tests cannot establish the claimed result.
Do not duplicate equivalent checks merely to satisfy a ritual.

If a slice fails verification, diagnose or report its blocker before treating dependent work as
complete. Independent work may continue with explicit limitations. A scaffold compiling successfully
is evidence about the scaffold, not proof that the application works.

Keep changes reviewable. Commit verified units when commits are authorized; implementing a feature
alone does not authorize commits, pushes or publication. No fixed commit count is required.

## Fit the existing project

Review changed code against the relevant conventions identified earlier. Resolve accidental deviations.
When a new pattern is needed, explain the concrete gap, why existing patterns are insufficient, and
its implications for callers and tests. Do not reproduce a known defect or unsafe practice merely
for consistency; address the task-related risk and explain the deviation.

Put durable architecture, commands and conventions in the appropriate project AGENTS.md or linked
documentation. Keep task plans, temporary hypotheses and review scratch notes out of permanent rules.

## Verify corrections and close the task

Follow [testing decisions](testing.md) and [debugging guidance](observability.md) for defects. When a
review identifies an issue, track its location, trigger, cause, correction, verification evidence and
status. A compact task note is enough; create a persistent review log only when useful or requested.
Status should distinguish verified resolution, unresolved issues and unavailable verification.

The implementer fixes issues; the parent verifies integration and closure. Use an independent reviewer
when warranted, without making one mandatory for every change. Never count a proposed correction as
a verified fix. Prioritize findings by impact rather than by whether they concern an edge case.

Finish with the delivered behavior, relevant checks and material limitations. Run the project's
required quality gate and any additional integration/build checks justified by the change. Report
unrelated baseline failures separately from new regressions.
