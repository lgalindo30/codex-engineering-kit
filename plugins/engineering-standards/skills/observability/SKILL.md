---
name: observability
description: Add Pino console logging, investigate runtime failures, or integrate OpenTelemetry when requested. Use for request correlation, error diagnostics, logging hygiene, and explicit telemetry work.
---

# Observability

Read [engineering defaults](../../references/engineering.md) and
[observability guidance](../../references/observability.md).

Choose the scope from the request:

- **Application baseline:** structured Pino console logs, request correlation, safe centralized error
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
