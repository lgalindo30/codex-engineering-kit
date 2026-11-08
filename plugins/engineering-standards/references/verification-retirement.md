# Verification replacement and retirement

Use when a project asks to evaluate or reduce its suite, or when replacing protective evidence.
Ordinary fixes retain protective checks. Preserve project authority and existing runners; adding this
policy neither removes tests nor activates an agent runner.

## Inventory and traceability

Inventory guarantees and observation boundaries before classifying checks as retain, consolidate,
replace or retire. Record known incidents, hidden mock boundaries, runtime/setup cost and maintenance
sensitivity. Do not assume a suite called unit tests contains only pure-function checks.

Maintain one project-owned retirement record with stable IDs and an explicit mapping for each
retired test or cohesive family. Multiple checks can share a record only when their guarantees and
disposition really coincide; list their identities so no retired check is left unmapped.
For a cohesive family, its old file/group and covered dimensions can identify the mapping without
one row per scalar input. Split records when guarantees, observation boundaries or retained protection
differ. Reuse project records rather than creating a parallel inventory.

| Field             | Required evidence                                                                                                  |
| ----------------- | ------------------------------------------------------------------------------------------------------------------ |
| Identity          | Retirement ID, old artifact and file/case IDs, guaranteed behavior and observation boundary.                       |
| Decision          | Retain/consolidate/replace/retire, reason, and `replacement` or `reduced-protection` for removed evidence.         |
| Replacement       | Exact property/corpus/retained-check/runtime IDs, what each establishes and what it cannot.                        |
| Sensitivity       | Baseline/candidate artifacts, comparison commands, defect set, outcomes and replay artifacts.                      |
| Review-only scope | Guarantees losing continuous detection; linked recipe IDs and remaining automatic witnesses.                       |
| Accountability    | Maintainer role, project-authorized acceptance source for reduced protection, residual risk and revisit condition. |

`replacement` requires demonstrated evidence for the same valuable guarantee at the necessary boundary.
`reduced-protection` explicitly accepts less continuous detection, including a guarantee judged
unnecessary. A review recipe is not executable replacement coverage. Split mixed records so protected
and review-only guarantees cannot be conflated.

For material authorization, private data, irreversible effects, integrity or recovery guarantees,
retain executable protection until a demonstrated replacement exists or project authority explicitly
accepts the specific reduction. Do not infer that acceptance from a lower test budget or a generic
request to simplify. Retain the check when acceptance or replacement is missing; explain the decision
without inventing an additional approval requirement for an already authorized reduction.

## Review recipes and activation

Before removal inspect shared setup/hooks, dependencies between cases, parameterized expansion, empty
suites, dead imports and commands targeting retired files. Trace fixture imports outside tests,
including CLI/scripts. Retained cases must not rely on setup performed by removed cases. Physically
remove retired material and verify actual selection and the runner's overall exit/suite result;
passing assertion counts cannot override failed suites.

Each review-only recipe needs an ID, named guarantees, implementation/contract/dependency triggers,
indirect callers, relevant migration/configuration triggers, required probes and success witnesses,
permitted runtime/data, accountable role, execution budget and known limits. Include the acceptance
source and a revisit condition such as a contract/dependency change, incident or agreed expiry.

Use the [selection ledger](testing.md#scope-and-review-selection) on subsequent affected changes.
Demonstrate activation with realistic direct and indirect consumer changes, a configuration/migration
change and an unrelated low-risk change. Inspect actual selected recipes, assigned roles, probes and
unexecuted scope. An unknown dependency match needs investigation or broader relevant review.
For a selected required recipe, missing execution leaves the change incompletely verified.

Record whether activation is a manually exercised coordinator workflow or a verified automated job.
If the promised activation mechanism is unavailable, retain continuous protection or obtain explicit
project acceptance of that additional gap. Do not describe future runner plans as active enforcement.

## Compare detection and total cost

Keep the old checks available in a disposable baseline while evaluating the candidate on the same
source artifact, requirements, fixtures, environment and defect set. Establish intact passing runs.
Include relevant known regressions and meaningful injected defects, with an independently selected
held-out subset. Evaluate reviewer discovery without revealing defect locations, separately from
whether executable evidence detects each defect for its intended functional reason.

| Per-defect record       | Meaning                                                                                                  |
| ----------------------- | -------------------------------------------------------------------------------------------------------- |
| Identity and effect     | Exact disposable patch/hash, violated guarantee, intended observable failure and provenance.             |
| Old/candidate execution | Detected, survived, equivalent, invalid or unexecuted; command/output and causal assertion.              |
| Independent discovery   | Found, missed or unexecuted; reviewer artifact, budget and validated evidence.                           |
| Replay                  | Minimized synthetic input/trace, seed/path, generator/runtime versions, clock/schedule and artifact IDs. |

Do not count broken compilation/setup as functional detection. Investigate survivors for equivalence
or a blind spot; no mutation-score quota applies. Verify active source hashes and disposal after fault
injection. A passing candidate against one held-out defect does not establish broad detection parity.

Measure expanded conventional cases, property declarations and generated trials separately. Record
focused/full-gate duration, setup exclusions, review/triage time, model usage/cost, maintenance effort,
validated findings, false positives, missed injected defects and escaped bugs when available. Compare
like workloads and report sample counts/variation for timing claims. Unknown cost or maintenance is
unavailable evidence, not zero. Do not infer total savings from fewer cases or faster Vitest alone.

## Migration decision

Start with one bounded pilot. Decide from detection, residual risk and total cost before extending to
another boundary. Keep cheap distinct authorization, transport, storage, process and browser witnesses
where a proposed replacement would be weaker or costlier. Explain each accepted detection regression.
Prefer retiring implementation-shaped expectations and duplicate input matrices once reviewed
invariants or an explicit reduced-protection decision account for their valuable guarantees. Use
[cohesive generated families](generated-verification.md#consolidation-and-measurement) instead of
requiring a standalone unit test for every retained input variation.
Record product corrections and their compatibility/versioning effects separately from test-only
retirement phases. Pin each phase's dirty/untracked artifacts and compare check selections on common
source bytes; a successful full gate on a later phase does not retroactively validate an earlier one.

Never delete a failing assertion solely for green output, hide a large matrix inside one case, rename
tests out of discovery or introduce silent skips/exclusions. Project budgets are finite local choices,
not universal suite ceilings or deletion targets. Update policy, mappings, commands and consumers
together; follow [execution selection](testing.md#execution-selection-and-evidence-reuse) on the final
artifact and report gaps. Export evidence through
[review closure](adversarial-review.md#evidence-export-before-cleanup) before deleting experiments.
