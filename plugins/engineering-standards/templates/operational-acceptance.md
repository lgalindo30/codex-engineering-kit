# Operational acceptance evidence

Use only for the operational behavior in scope; omit inapplicable rows with a reason.

- Standard source/version or local revision:
- Application revision, runtime and environment:
- Operation, entrypoints, dependencies and intended outcomes:
- Budgets, destination, retention/sampling and measurement limitations:

| Requirement                                      | Implementation location | Executed check | Observed signal and coverage | Status or limitation |
| ------------------------------------------------ | ----------------------- | -------------- | ---------------------------- | -------------------- |
| Correlation across actual boundaries             |                         |                |                              |                      |
| Phase/dependency attribution and units           |                         |                |                              |                      |
| Early failure, timeout and incomplete work       |                         |                |                              |                      |
| Missing metadata, overflow and omitted entries   |                         |                |                              |                      |
| Redaction and bounded cardinality/volume         |                         |                |                              |                      |
| Observer failure preserves results/effects       |                         |                |                              |                      |
| Runtime/provider-only termination                |                         |                |                              |                      |
| Representative workload and observation overhead |                         |                |                              |                      |

Use passed, failed, not run or blocked; distinguish local, mocked and live evidence. Include the exact
commands and safe artifact references. An absent measurement is unknown. List any deployment/exporter
or client-adoption step separately; neither a declared skill invocation nor this document proves it ran.
