---
name: testing-strategy
description: Audit cross-component test coverage and integration risks, or coordinate regression plans. Routine stack tests belong to the technology skill.
---

# Testing Strategy

Read [the shared workflow](../../references/workflow.md) and [testing policy](../../references/testing.md).
Use the selected technology's testing reference for execution details without loading an implementation
workflow. Preserve the existing runner; use project evidence and official docs when no matching skill exists.

Map changed behavior to consumers, integration boundaries, and likely regressions. Identify what current
tests establish and where mocks hide consequential behavior; choose the smallest additional layer that
closes each gap. Include database semantics, contract compatibility, browser/server interaction,
authorization, and external side effects only where the project actually has those risks.

Run affected tests and the documented quality command. Report commands, outcomes, unexecuted scope,
and remaining gaps, distinguishing static skill validation from observed autonomous-agent behavior.
