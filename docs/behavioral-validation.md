# Behavioral Validation

Acceptance scenarios are stored by topic. All full scenario rubrics below are **not run**;
bounded historical observations do not establish a pass for the full scenario or the current revision.
Structural checks validate packaging and tooling, not agent behavior.

## Bounded evaluations

- [2026-11-08 persisted compatibility](evaluations/2026-11-08-persisted-compatibility.md): six temporary
  scenarios with independent validation, historical identity/receipt boundaries, real SQLite version
  interleavings, retirement dependencies and evidence replay after deletion.
- [2026-11-08 installed release](evaluations/2026-11-08-installed-release-evals.md): explicit installed
  2.6.0 invocation, independent discovery/validation, async repair and an informed generator correction
  after a post-design semantic-boundary challenge in temporary projects.
- [2026-11-08 CRM source inspection](evaluations/2026-11-08-crm-source-inspection.md): real unstaged
  and untracked migration evidence, generator consolidation, causal witnesses, harness boundaries
  and a limited HTTP property replay in disposable Bun copies.
- [2026-11-07 adversarial adoption](evaluations/2026-11-07-adversarial-adoption.md): consequence-based
  recipe selection, retirement traceability, comparable sensitivity/cost, independent review/validation
  and explicit unavailable-execution and reduced-protection decisions in isolated fixtures.
- [2026-10-15 change verification](evaluations/2026-10-15-change-verification.md): independent bug,
  feature and read-only inspection exercises, parent checks and explicit execution limits.
- [2026-10-15 simplification](evaluations/2026-10-15-simplification.md): per-skill local execution,
  scoring criteria, observed corrections and cleanup status. These smaller cases do not establish a
  pass for the broader scenario rubrics below.

## Scenarios

| Topic                                               | Cases                                                              | Status  |
| --------------------------------------------------- | ------------------------------------------------------------------ | ------- |
| [Backend](evaluations/scenarios/backend.md)         | Standalone API; architecture, persistence, deployment              | Not run |
| [Frontend](evaluations/scenarios/frontend.md)       | React/Vite SPA; static site; framework and design-system selection | Not run |
| [Integration](evaluations/scenarios/integration.md) | Integrated Next.js; separate API/Astro; monorepo                   | Not run |
| [Cloudflare](evaluations/scenarios/cloudflare.md)   | Modular Workers API; Turnstile form                                | Not run |
| [Protection](evaluations/scenarios/protection.md)   | Provider-aware forms and rate limiting                             | Not run |
| [Workflow](evaluations/scenarios/workflow.md)       | Small changes; focused implementation and review exercises         | Not run |
| [Operations](evaluations/scenarios/operations.md)   | Observability, recovery, capacity and MCP/client behavior          | Not run |

## Run an evaluation

Use a disposable workspace. For installation or automatic discovery, use an isolated Codex home;
explicit-path tests do not establish discovery. Preserve the operator's configuration and avoid live
external resources. Inspect generated artifacts and executed checks, not just the final message.

Record the date, kit revision, model/runtime versions, environment, prompt, fixtures, produced files,
executed checks, failed criteria, and cleanup. Use `not run`, `passed`, `failed`, or `blocked` explicitly.
Record delegation as context, not an acceptance criterion. Investigate failures before changing a skill;
an isolated failure does not automatically justify a global rule.

Older evaluation notes remain available in Git history.
See [operational implementation evidence](evaluations/2026-11-06-operational-standards.md) for the
bounded executable gate checks and explicit limits of the current standards revision.
