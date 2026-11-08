---
name: testing-strategy
description: Audit verification risks, compare detection and cost, or plan evidence-based test replacement and retirement. Concrete fix or feature closure belongs to change-verification; routine stack execution belongs to the technology skill.
---

# Testing Strategy

Read [the shared workflow](../../references/workflow.md) and [testing policy](../../references/testing.md).
Use the selected technology's testing reference for execution details without loading an implementation
workflow. Preserve the existing runner; use project evidence and official docs when no matching skill exists.
For iterative acceptance and implementation inspection of one change, use
[change verification](../change-verification/SKILL.md) instead of expanding a coverage audit into repairs.

Map guarantees to consequences, consumers, integration boundaries and likely regressions. Identify what
current checks establish and where mocks hide consequential behavior. Select independent adversarial
investigation, reviewed properties, bounded fuzzing and distinct behavioral witnesses from these gaps.
Include database semantics, public contracts, browser/server interaction, authorization and external
effects only where the project actually has those risks. Use the shared selection ledger to account
for applicable review recipes, indirect dependencies and unknown impact.
When replacing example matrices, read [generated verification](../../references/generated-verification.md).
Choose a small set of coherent invariant families with mandatory boundary/outcome witnesses and
independent oracles; verify causal guard evidence, isolation and real runner selection. Do not convert
every generated trial into a separately maintained example or require a new test for every finding.

For suite changes, read [replacement and retirement](../../references/verification-retirement.md).
Produce per-retirement mappings and distinguish demonstrated replacement from accepted reduced
continuous protection. Compare old and candidate evidence on common artifacts/defects, including
independent held-out defects, and measure total execution/review/maintenance cost. Keep unknown costs
and detection gaps explicit. Start with a bounded pilot; do not import another project's case ceiling.
Exercise recipe activation on realistic changes before relying on review-only transfer.

Select commands through [execution and evidence reuse](../../references/testing.md#execution-selection-and-evidence-reuse).
For retirement inspect shared setup, parameterized expansion, non-test fixture consumers and runner
suite failures as specified in the retirement policy. Report commands, outcomes, unexecuted scope,
and remaining gaps, distinguishing static skill validation from observed autonomous-agent behavior.
For instruction changes, forward-test realistic requests with independent agents in disposable
workspaces; inspect their selected scope, artifacts, actual probes and incomplete-run handling.
