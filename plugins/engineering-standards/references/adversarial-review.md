# Independent adversarial review

Use for the material changes and selected review recipes in
[verification policy](testing.md#scope-and-review-selection). The coordinating agent owns bounded
scope selection, role assignment and final integration. Ordinary edits do not require an unlimited
chain of reviewers. Preserve a requested read-only review.

## Artifact and handoff

Give discovery the applicable requirements and an immutable artifact, plus a small execution envelope:

- Base revision, exact patch or commit range, source snapshot and SHA-256. Include relevant untracked
  files for a dirty checkout; a commit ID alone does not identify local edits.
- Versioned requirement sources or frozen excerpts, affected entrypoints and unknown contracts.
  Withhold the author's verdict, suspected defect and explanatory conclusions from the initial brief.
- Runtime/tool versions, lockfile, configuration, test/generator/fixture versions or hashes, permitted
  paths/commands, synthetic data, intercepted calls, output location and finite execution/review budgets.
  State missing prerequisites and who owns cleanup. Do not copy secrets into evidence.

Use separate agents/tasks for discovery and validation. Fresh context reduces anchoring without
guaranteeing independent reasoning; changing models alone proves nothing. The reviewer derives
hypotheses from requirements before reading the author's tests or rationale. Raw source/tests remain
available for investigation. Label later author explanations with provenance.

The validator receives the same artifact, requirements and candidate evidence. It independently
checks expected behavior before accepting the reviewer's causal explanation. The implementer owns
repairs and must not serve as the independent validator of its own implementation. When the required
role is unavailable, report incomplete verification rather than substituting self-review silently.

## Discovery and validation

Challenge reachable malformed inputs, authorized success, denied access, state/history transitions,
time boundaries, alternate callers, retry/recovery, interrupted effects, resource bounds and controlled
interleavings. Challenge tests, generators and oracles too. Use real local transaction/storage/runtime
boundaries where the contract depends on them; intercept external delivery. Concurrency of promises
alone does not schedule database commits. A local receipt cannot prove remote exactly-once delivery.

Reviewers do not edit the candidate implementation or weaken its requirements. Put experimental
reproducers and deliberate defects in owned disposable copies. Each candidate needs this evidence:

| Field       | Content                                                                                    |
| ----------- | ------------------------------------------------------------------------------------------ |
| Source      | Artifact ID, requirement and entrypoint; label inferred expectations.                      |
| Trigger     | Minimal synthetic input/trace, preconditions, actor/scope, clock and controlled schedule.  |
| Effect      | Expected versus observed response, persisted state or intercepted call, and causal impact. |
| Reproducer  | Command/fixture, environment and actual output; label source-only claims unexecuted.       |
| Disposition | Validator's evidence for `validated`, `refuted` or `insufficient`, and next action.        |

`validated` establishes the stated violation on the pinned artifact. `refuted` disproves that candidate
under its preconditions, not the whole feature. `insufficient` leaves an evidence, access or contract
gap. No finding quota applies; a clean review records challenged hypotheses and unexamined risks.

Record execution separately as completed, timed out, interrupted or unavailable. Compilation errors,
fixture failures, infrastructure failures and reproduced product failures have different meanings.
A timeout is incomplete exploration unless independent evidence establishes a product resource-bound
violation. Do not count all nonzero exits as detected defects.

## Correction and closure

Correct confirmed in-scope defects only when implementation is authorized. Pin the new artifact and
have independent validation recheck the counterexample and affected alternate flows. Changes to code,
requirements, configuration or evidence can invalidate prior verdicts; explicitly justify any reused
partial evidence. The final overall verdict must identify the final bytes and execution envelope.

Run the currently selected complete project gate and relevant build, retaining valuable runtime and
browser witnesses. Keep durable counterexamples through properties, a corpus or a small behavioral
check. Report behavioral acceptance and standards conformance separately.

Block a verified verdict on validated material failures or missing evidence needed for a material
contract. Lower-risk deferral needs a disposition, accountable owner and rationale under project
authority. Report unfinished scope and the missing next action; optional exploration timeout alone
is not a defect. Bound review, reproduction and process cleanup costs without silently extending them.

A recipe or skill does not create an automated CI review gate. Any future runner needs separately
verified artifact dispatch, credentials, cost/lifetime bounds, evidence storage, required/optional job
semantics and unavailable-review handling. Required reviews must not silently fail open.
