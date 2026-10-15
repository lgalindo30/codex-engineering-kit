---
name: change-verification
description: Verify and iterate on bug fixes or features until scoped behavior and applicable engineering standards are demonstrated. Use for regression closure, alternate-flow acceptance, or independent implementation inspection.
---

# Change verification

Read the [shared workflow](../../references/workflow.md) and [testing policy](../../references/testing.md).
Use this workflow to close a concrete change. Project-wide coverage assessment belongs to
[testing strategy](../testing-strategy/SKILL.md). Read the affected stack's relevant implementation and
testing references. When stack selection needs coordination, use the routing table in
[engineering workflow](../engineering-workflow/SKILL.md), without restarting this workflow.
Preserve a requested read-only review: report findings without repairing code.

## Establish evidence

Identify the requested behavior, affected entrypoints/consumers, current diff, project commands and
baseline failures. Define observable acceptance criteria from the request and existing contracts;
do not infer expected results from the implementation being checked.

Build the [flow evidence map](../../references/testing.md#flow-evidence) for this change. For a bug,
demonstrate failure before and success after the fix when practical, using an isolated baseline if
needed; disclose missing pre-fix evidence. Trace the cause through related callers and state transitions.
For a feature, derive cases from its acceptance criteria and changed decisions. Investigate a failed
check before attributing it to the change; distinguish setup failures and unrelated baseline defects.

## Inspect the implementation

Check the changed code and affected boundaries against project instructions, the selected stack guides
and relevant shared policies. Include [architecture](../../references/architecture.md) and
[quality](../../references/quality.md); load contract, frontend, security or cloud guidance only when
the change touches those concerns. Formatting and passing tests alone do not establish conformance.

For each actionable violation, identify the rule, code location, affected scenario and impact.
Keep required corrections separate from optional improvements; established compatible choices are not
defects merely because a skill offers a default. Zero findings is a valid outcome.

When independent inspection is requested or materially useful, give a read-only reviewer the request,
exact candidate diff, applicable skill paths and available check evidence without prescribing a verdict.
The implementer owns corrections and final verification; a reviewer does not silently edit its target.

## Repair and verify

For authorized implementation work, correct demonstrated in-scope defects and standards violations,
retain protective tests, and rerun the affected checks. Update the flow map for newly discovered paths.
Recheck previously passing behavior that a subsequent repair could affect; earlier evidence may be stale.
Change the hypothesis or experiment when an attempt fails instead of retrying the same repair blindly.

Close as verified only when required checks for the primary acceptance, related feasible flows and
applicable standards pass on the final implementation, with no unresolved findings that invalidate acceptance.
Run the required quality command and relevant build. Follow the shared testing policy for isolation,
test layers and avoiding redundant execution.

If a required check cannot run or investigation cannot progress without missing access, environment or
a product decision, report partial verification and the concrete blocker. Never weaken acceptance or
label an unexecuted check as passed to finish the loop.

Report behavior and standards verdicts separately, the flow/check evidence, corrections, remaining
findings and unverified scope. Scope the conclusion to what was exercised; do not promise that no bug
can ever recur or substitute a self-assigned score for evidence.
