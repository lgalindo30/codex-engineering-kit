# Testing policy

Use the smallest test layer that demonstrates the changed behavior. Preserve suitable existing tools;
the technology guide owns runners, adapters and runtime commands.

## Useful evidence

- Cover observable success, relevant invalid input and failures at changed boundaries. Test behavior,
  not private structure, incidental wording or an implementation copied into assertions.
- For a bug fix, show the same focused regression failing before the fix and passing after it when
  practical. The failure must demonstrate the defect, not missing setup. Reuse an existing protective
  test; disclose missing pre-fix evidence.
- Use the real engine/adapter for constraints, transactions, query semantics and migrations. Mock at
  external boundaries; label mocked browser journeys separately from those exercising a real backend.
- Use controlled clocks and observable events instead of arbitrary sleeps. Browser interactions need
  semantic locators, keyboard/focus checks and accessibility checks where relevant.
- Reversible low-impact configuration changes may need direct validation rather than new tests.
  Coverage informs risk; there is no universal percentage or required test count.

## Flow evidence

For bug fixes and features, map acceptance criteria to affected entrypoints, decisions and state
transitions, expected outcomes and executable checks. Keep a compact table when several paths need
tracking. Mark each check as passed, failed or unexecuted; record the reason for an omitted path.

Cover both outcomes of reachable changed conditions, including independently meaningful terms in
compound conditions, boundaries and relevant error/recovery paths. Include alternate callers, retry,
reset, navigation, permissions or concurrent operations when they can reach or reactivate the defect.
Choose cases from the actual dependency/state model; do not enumerate unrelated application flows
or every theoretical input combination. Explain unreachable branches and material coverage gaps.

Exercise the integration boundary when unit tests or mocks cannot demonstrate the acceptance criterion.
Recheck impacted cases after repairs; evidence must correspond to the final implementation.

## Isolation and execution

Use disposable databases, directories, accounts and ports with deterministic fixtures and explicit
ownership. Confirm reset/drop targets and clean up only test-owned resources. Never test against
production or send real payments, messages or notifications by default; use selected sandboxes or doubles.
Keep parallel runs independent and redact sensitive diagnostics.

Start with affected tests, then run the required project quality command and relevant production build.
Broaden checks for unresolved risk; do not repeat passing suites without new evidence. Investigate
failures without deleting assertions, masking flakes with retries or silently skipping missing tools.
Report commands and outcomes using the [delivery rules](workflow.md#delivery).

Deliberate mutation exercises are optional and require a requested test-quality evaluation. Use
disposable copies, restore the fixture and verify cleanup; never introduce deliberate defects into
the active project. A surviving mutation is evidence to investigate, not a test-count quota.
