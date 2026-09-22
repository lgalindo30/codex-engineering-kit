---
name: observability
description: Investigate failures across services, audit logging and correlation, or design explicit telemetry integrations. Routine application diagnostics belong to the technology skill.
---

# Observability

This is an independent project-level workflow, not a prerequisite for development skills. Use local
technology references only when their execution detail helps the assigned analysis; do not route
ordinary implementation work through this skill.

Preserve the project's conventions and explicit task scope. Read
[observability guidance](references/observability.md).

Choose the scope from the request:

- **Application baseline:** structured console logs using the existing logger or the selected technology's supported integration, request correlation, safe centralized error
  handling, and useful development output. No centralized service or telemetry SDK by default.
- **Debugging:** reproduce, collect redacted evidence, test a hypothesis, make the smallest correction,
  and verify the failing behavior. Use existing tools and observability before introducing new ones.
- **Explicit telemetry integration:** verify current official SDK/runtime compatibility, identify the
  desired signals and deployment destination, then integrate only the requested capabilities.

Keep logging dependencies injectable at application boundaries so output destinations can evolve.
Do not build a custom observability framework. Confirm meaningful checks for correlation, redaction,
and failure behavior. If diagnostics cannot be reproduced, state what evidence remains missing.

Knowledge of OpenTelemetry is not authorization to install a collector, choose a paid service, enable
session recording, or export user data. Service selection belongs to the explicit integration task.
