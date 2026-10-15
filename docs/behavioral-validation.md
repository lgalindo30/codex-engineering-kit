# Behavioral Validation

Acceptance scenarios are stored by topic. All full scenario rubrics below are **not run**;
bounded historical observations do not establish a pass for the full scenario or the current revision.
Structural checks validate packaging and tooling, not agent behavior.

## Bounded evaluations

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

## Run an evaluation

Use a disposable workspace. For installation or automatic discovery, use an isolated Codex home;
explicit-path tests do not establish discovery. Preserve the operator's configuration and avoid live
external resources. Inspect generated artifacts and executed checks, not just the final message.

Record the date, kit revision, model/runtime versions, environment, prompt, fixtures, produced files,
executed checks, failed criteria, and cleanup. Use `not run`, `passed`, `failed`, or `blocked` explicitly.
Record delegation as context, not an acceptance criterion. Investigate failures before changing a skill;
an isolated failure does not automatically justify a global rule.

Older evaluation notes remain available in Git history.
