# Generated verification design

Use when building or reviewing property/model-based checks, bounded fuzz campaigns or generator-backed
test replacement. Apply [verification policy](testing.md) and keep the existing compatible runner.
Properties state reusable guarantees; they do not require a new runner, service or CI agent gate.

## Invariants and useful variation

Define the requirement, observation boundary, independent oracle and input/state grammar before
expanding trials. Generate variations of a coherent guarantee rather than copying old expected-output
tables or production decisions. Keep the model smaller than the implementation and derive expected
effects from known fixture facts, contracts or independently labeled constructions.

Different representations need different oracles. JSON wire semantics need not preserve JavaScript
negative zero; UTF-8 byte limits differ from character counts; exact typed identities and ambiguous
prose need not grant the same authority. Define allowed outcomes from the contract's observable
ordering when failures compete, such as malformed bytes and an exceeded stream budget. Do not widen
the allowed outcomes merely to accept an unexplained failure.

Guarantee essential success, rejection and failure-outcome families in bounded runs through mandatory
witnesses, generator examples or deliberately scheduled discriminants. Being possible in an arbitrary
generator does not establish that an outcome executed. Include contract-relevant long inputs, state
history, page tails and boundary positions even when ordinary random trials stay small for cost.
Pair random variation with these witnesses; do not enumerate every theoretical combination.

Check observed progress, preserved information and distinct outputs as well as safety/idempotence.
Challenge vocabulary, lengths, distributions and operation reachability in the generator itself.
Reject-heavy filters or preconditions must not discard required denial/invalid-transition scenarios.
Record exercised outcome/command families and limits without describing a finite corpus as universal.

## Causal state and boundary witnesses

For a material guard, keep unrelated guards valid and observe its specific effect. A generic denial
may come from a revision fence, expired lease or transport check rather than the predicate being
claimed. Use controlled clocks/interleavings or a targeted disposable mutation to distinguish causes;
rejection alone is insufficient evidence for every term in a compound condition.
Distinguish preflight checks, commit-time enforcement and complete-operation outcomes.

Observe the real boundary that owns the guarantee: committed rows, audits/reservations, stored object
bytes, historical receipts and intercepted call counts when applicable. Check after relevant commands
and after controlled work settles. Separate historical receipt replay from current state, and remote
uncertainty from known failure. Retain process, transport and browser witnesses the model cannot prove.

Fresh namespaces can avoid expensive destructive resets only after checking shared quotas, counters,
actor/global facts and other cross-attempt state. Otherwise reset all owned state between trials and
shrinks. Fixture preparation must preserve production invariants; restore any fixture-only bypass
before exercising the operation. Release/join delayed work before reuse, or terminate/dispose its
isolated owner at the outer deadline as required by [execution policy](testing.md#isolation-and-execution).

## Profiles, replay and the real gate

Keep bounded properties and deterministic corpus replay in the ordinary selected suite alongside
distinct retained behavioral checks. Opt-in extended runs can explore new recorded seeds or more
inputs within project budgets; stateful traces need not scale like cheap pure inputs. Structured
fuzzing targets concrete parser/envelope boundaries and reports its separate selection and limits.

Verify scoped commands dispatch to the actual runner, select the intended properties and propagate
failure, timeout and interruption. Reconcile the property inventory with target lists, tags or name
filters after changes. A passing filtered property/fuzz campaign does not establish that retained
examples or the complete project gate passed. Preserve ordinary discovery instead of narrowing it to
make retirement appear complete.

Use stable property identities for reproducible seeds and retain the generator/runtime versions,
shrink coordinates and minimized synthetic failures. Pin the actual artifact through
[the execution handoff](adversarial-review.md#artifact-and-handoff); a seed and dirty-tree flag alone
do not identify its source. Fail malformed/out-of-range harness settings instead of silently reducing
work or hiding skips. Cooperative budgets must also fail visibly when exceeded after a trial.
The harness owns timeout state: a callback catching a timeout must not convert incomplete execution
into success. Challenge this failure behavior when harness lifetime is material to the guarantee.

## Consolidation and measurement

One property may assert a cohesive guarantee across generated inputs/traces with many observations.
Those trials are generated exploration, not a hidden hand-maintained example matrix. Fixed essential
witnesses can live in the same property or bounded corpus. Avoid a standalone test per generated case
or finding; retain a separate check when it demonstrates a distinct valuable boundary.

Report authored property declarations, executed conventional cases and generated trials separately,
including parameterized expansion and fixed witnesses. Measure generator/model/fixture code and edit
effort as well as runner time: replacing examples can add substantial oracle code. Use
[retirement comparisons](verification-retirement.md#compare-detection-and-total-cost) before claiming
replacement or savings. Do not recreate the old matrix as thousands of maintained expected results.
