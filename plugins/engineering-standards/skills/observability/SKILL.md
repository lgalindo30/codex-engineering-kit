---
name: observability
description: Design and verify operational observability, investigate cross-service failures, audit correlation, or integrate requested telemetry. Routine diagnostics belong to the technology skill.
---

# Observability

Read [the shared workflow](../../references/workflow.md) and
[diagnostics/telemetry guidance](references/observability.md).
For a new baseline or requested telemetry, apply [observability by design](../../references/operation-observability.md).

Choose the requested scope:

- Application baseline: existing or runtime-supported structured console logging, correlation, and
  centralized safe errors plus bounded operation/dependency measurements where relevant; no remote
  telemetry service by default.
- Investigation: reproduce and narrow the failing boundary using existing tools before adding others.
- Explicit integration: define signals/destination and verify current SDK/runtime compatibility.

Keep logger dependencies injectable at application boundaries without building a custom framework.
Verify correlation, redaction, and failure behavior. Report missing evidence when reproduction is unavailable.
Show adoption through concrete implementation, checks and emitted coverage, including incomplete work;
a declaration of skill use is not evidence that every applicable requirement was satisfied.
