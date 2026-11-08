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

Pin the [artifact and execution envelope](../../references/adversarial-review.md#artifact-and-handoff),
including dirty/untracked source and the requirements/configuration/evidence used for the verdict.
Record the [review selection](../../references/testing.md#scope-and-review-selection) for material
changes or project review-only recipes. Trace indirect consumers and migration/configuration impact;
do not treat an unmatched filename as proof that a contract is unaffected.
For changed parsers, canonicalization, fingerprints/signatures or stored identity, apply
[persisted identity compatibility](../../references/persisted-identity.md) to historical bytes, replay,
missing evidence and coexisting versions before accepting a correction.

Build the [flow evidence map](../../references/testing.md#flow-evidence) for this change. For a bug,
demonstrate failure before and success after the fix when practical, using an isolated baseline if
needed; disclose missing pre-fix evidence. Trace the cause through related callers and state transitions.
For a feature, derive cases from its acceptance criteria and changed decisions. Investigate a failed
check before attributing it to the change; distinguish setup failures and unrelated baseline defects.
For material compound guards, use [causal witnesses](../../references/generated-verification.md#causal-state-and-boundary-witnesses)
to distinguish the named guard from another rejection, and preflight from commit-time enforcement.

## Inspect the implementation

Check the changed code and affected boundaries against project instructions, the selected stack guides
and relevant shared policies. Include [architecture](../../references/architecture.md) and
[quality](../../references/quality.md); load contract, frontend, security or cloud guidance only when
the change touches those concerns. Formatting and passing tests alone do not establish conformance.

For each actionable violation, identify the rule, code location, affected scenario and impact.
Keep required corrections separate from optional improvements; established compatible choices are not
defects merely because a skill offers a default. Zero findings is a valid outcome.
For an operational baseline or telemetry change, inspect emitted coverage against
[the adoption evidence](../../references/operation-observability.md#acceptance-and-adoption-evidence).
Keep standard loading, implementation conformance and exercised runtime behavior as separate claims.

For independent inspection selected by project policy or failure consequences, follow
[adversarial review](../../references/adversarial-review.md). Give discovery requirements and the pinned
artifact before author explanations. Have a separate agent validate candidate findings and expected
behavior. Keep discovery, validation and execution states separate; a reviewer does not edit its target.

## Repair and verify

For authorized implementation work, correct demonstrated in-scope defects and standards violations,
retain protective evidence, and rerun the affected checks. Test retirement requires the separate
[replacement decision](../../references/verification-retirement.md), not removal of a failing check
to close the fix. Update the flow map for newly discovered paths.
Recheck previously passing behavior that a subsequent repair could affect; earlier evidence may be stale.
Change the hypothesis or experiment when an attempt fails instead of retrying the same repair blindly.
Pin each repair as a new artifact and independently revalidate affected findings. Explain which prior
evidence still applies; an old verdict does not automatically cover new bytes.

Close as verified only when required checks for the primary acceptance, related feasible flows and
applicable standards pass on the final implementation, with no unresolved findings that invalidate acceptance.
Select commands and evidence reuse through the shared [execution policy](../../references/testing.md#execution-selection-and-evidence-reuse).
Follow its isolation, boundary and incomplete-execution rules.

If a required check cannot run or investigation cannot progress without missing access, environment or
a product decision, report partial verification and the concrete blocker. Never weaken acceptance or
label an unexecuted check as passed to finish the loop.
Missing required review or unresolved unknown recipe impact also leaves verification incomplete.

Report behavior and standards verdicts separately, the flow/check evidence, corrections, remaining
findings and unverified scope. Scope the conclusion to what was exercised; do not promise that no bug
can ever recur or substitute a self-assigned score for evidence.
