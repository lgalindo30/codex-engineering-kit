---
name: astro-development
description: Build or change Astro sites and applications with content-oriented rendering and selective interactive islands. Use for an existing or explicitly selected Astro project.
---

# Astro Frontend

Use this skill for Astro applications. Preserve the rendering mode and requested deployment. Keep
static content static and add framework islands only for interaction that needs them.

Select only the guidance needed by the request:

- [Implementation](references/implementation.md): architecture, boundaries, contracts, and diagnostics.
- [Interface](../../references/interface.md): components, state, accessible loading, content, and performance.
- [Testing](references/testing.md): test selection, isolation, regression evidence, and reporting.
- [Tooling](references/tooling.md): setup, dependencies, quality commands, and deployment checks.

Read these conditional references only when the feature requires them:

- [Security](../../references/security.md): trust boundaries, permission checks, or sensitive data.
- [Authentication](references/authentication.md): requested or existing login/session behavior.
- [Files](references/files.md): uploads, storage, or retrieval.
- [Dates](../../references/dates.md): timestamps, civil dates, or schedules.
- [Deployment](references/deployment.md): build output, hosting, or server operation.

For testing-only or tooling-only work, use that reference directly without scaffolding an application.
Local references own stack behavior; shared references own common policies. Neither requires invoking
a transversal skill, and unrelated topics should remain unloaded.

1. Read applicable project instructions and inspect the actual application boundary, existing code,
   tests, and commands. Preserve explicit choices and established conventions; do not create nested
   repositories or extra services merely because the skill has a particular name.
2. Identify observable acceptance criteria and affected callers or consumers. Implement small,
   verifiable changes using local implementation guidance; keep scope proportional to the task.
3. Use local testing and tooling guidance to verify the affected behavior. Reuse existing checks and
   report unavailable prerequisites instead of treating unexecuted checks as passing.
4. When architecture or commands change, update the project's AGENTS.md with verified commands,
   boundaries, and durable decisions. Preserve existing instructions and keep temporary task notes out.
5. Report delivered behavior, compatibility or migration implications, checks, and remaining limits.

Write repository content in English and honor requested product locales. Introduce authentication,
remote services, telemetry, or infrastructure only when required by the task. Implementation alone
does not authorize commits, deployment, or production data changes.

For substantial changes, ground conventions in nearby code and tests, distinguish observed patterns
from assumptions, and verify each dependent behavioral slice before treating it as complete. Explain
necessary deviations without copying unsafe behavior for consistency. Report baseline failures
separately; a proposed correction is not a verified fix. Keep temporary diagnosis notes out of AGENTS.md.
