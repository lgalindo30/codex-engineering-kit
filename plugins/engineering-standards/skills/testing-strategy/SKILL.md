---
name: testing-strategy
description: Plan, implement, and run behavior-focused unit, integration, contract, and browser tests for Bun backends and React frontends, or diagnose gaps and regressions.
---

# Testing Strategy

Implementers own their tests; a testing specialist adds independent coverage of integration and risk.

1. Inspect applicable instructions, existing tests, runnable commands, and the behavior being changed.
   Identify externally observable acceptance criteria and likely regressions before selecting tools.
2. Read [testing decisions](../../references/testing.md). Select the smallest test layer that can
   demonstrate the behavior, adding integration or browser coverage when lower layers miss the risk.
3. Read [engineering defaults](../../references/engineering.md) for shared constraints. Preserve the
   existing stack unless changing it is part of the request. Default new backend tests to Bun Test,
   React component tests to Vitest and React Testing Library, and browser tests to Playwright.
4. Use isolated fixtures and services. Never point tests at production databases, accounts, files,
   or external side effects. Confirm that destructive integration setup targets a disposable resource.
5. Run affected tests, investigate failures, and then run the project's required quality command.
   Broaden testing when the change or evidence warrants it; do not repeatedly rerun passing checks.
6. Report commands, outcomes, skipped checks, unavailable prerequisites, and material residual risks.
   Distinguish implemented tests from executed tests and static validation from observed agent behavior.

Do not introduce infrastructure, blanket coverage thresholds, or tests that merely repeat
implementation details to make a task appear more complete. Reversible configuration-only edits
usually need direct validation rather than a new test suite.
