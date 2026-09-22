---
name: testing-strategy
description: Assess project-wide test coverage, integration risks, and verification strategy across components or technologies. Use for test audits or coordinated regression plans; routine stack tests belong to the technology skill.
---

# Testing Strategy

This is an independent project-level workflow, not a prerequisite for development skills. Use local
technology references only when their execution detail helps the assigned analysis; do not route
ordinary implementation work through this skill.

Verify the changed behavior using the project's actual test environment.

1. Inspect applicable instructions, existing tests, runnable commands, and the behavior being changed.
   Identify externally observable acceptance criteria and likely regressions before selecting tools.
2. Read [testing decisions](references/testing.md). Select the smallest test layer that can
   demonstrate the behavior, adding integration or browser coverage when lower layers miss the risk.
3. Preserve the existing stack unless changing it is part of the request. Use the matching technology skill's testing reference when available, selecting it from the skill
   descriptions and actual project. Load only testing guidance for a testing-only task; do not start
   its implementation workflow. Otherwise follow the existing tests and official framework guidance.
4. Use isolated fixtures and services. Never point tests at production databases, accounts, files,
   or external side effects. Confirm that destructive integration setup targets a disposable resource.
5. For defect fixes, demonstrate the regression fails for the expected defect before the correction
   when feasible, then passes with it. Reuse an existing protective test rather than duplicating it.
   If pre-fix evidence is unavailable, state that limitation.
6. Run affected tests, investigate failures, and then run the project's required quality command.
   Broaden testing when the change or evidence warrants it; do not repeatedly rerun passing checks.
7. Report commands, outcomes, skipped checks, unavailable prerequisites, and material residual risks.
   Distinguish implemented tests from executed tests and static validation from observed agent behavior.

Do not introduce infrastructure, blanket coverage thresholds, or tests that merely repeat
implementation details to make a task appear more complete. Reversible configuration-only edits
usually need direct validation rather than a new test suite.
