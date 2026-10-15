---
name: observability
description: Investigate cross-service failures, audit logging/correlation, or integrate requested telemetry. Routine diagnostics belong to the technology skill.
---

# Observability

Read [the shared workflow](../../references/workflow.md) and
[diagnostics/telemetry guidance](references/observability.md).

Choose the requested scope:

- Application baseline: existing or runtime-supported structured console logging, correlation, and
  centralized safe errors; no remote telemetry service by default.
- Investigation: reproduce and narrow the failing boundary using existing tools before adding others.
- Explicit integration: define signals/destination and verify current SDK/runtime compatibility.

Keep logger dependencies injectable at application boundaries without building a custom framework.
Verify correlation, redaction, and failure behavior. Report missing evidence when reproduction is unavailable.
