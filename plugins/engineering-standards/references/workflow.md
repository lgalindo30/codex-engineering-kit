# Shared workflow

Read this policy whenever using an engineering skill. Load other references only for the affected
behavior; a focused task does not require the complete implementation workflow.

## Scope and safeguards

- Follow applicable project instructions, explicit choices and established conventions. Inspect the
  affected code and commands before changing them; ground consequential decisions in project evidence.
- Add services, authentication, telemetry or infrastructure only when the task requires them.
  Implementation does not itself authorize commits, pushes, publication, live deployment or production
  data changes. Reuse authorization already given; do not add an approval step for ordinary local work.
- Preserve unrelated edits and configuration. Do not overwrite conflicting settings or create nested
  repositories to fit a skill or delegated role. Never distribute secrets, personal Git identity or
  machine-specific paths.
- Do not add code comments. Use clear names and cohesive functions; put rationale in documentation.
  Preserve legally required notices and tool directives required for correct behavior.
- Write repository content in English and honor the product's requested locales. Technology defaults
  apply when no compatible choice is established; they do not authorize migrations.

## Delivery

Use observable acceptance criteria and small changes that can be verified before dependent work
accumulates. Follow [consequence-based verification](testing.md) for review selection, durable evidence
and explicit test-retirement tradeoffs, and the selected stack's local guide
for execution. Run the project's documented quality command before handoff.
For new backend/job operations or changed costly dependencies, include the relevant
[operational observability acceptance](operation-observability.md#acceptance-and-adoption-evidence).
Reuse established instrumentation for small changes and avoid adding remote infrastructure by default.

When architecture or commands change, update the project's AGENTS.md with durable decisions and
verified commands. Keep task plans, hypotheses and temporary diagnosis notes out of permanent rules.

Report delivered behavior, compatibility or migration implications, checks actually run and remaining
limits. Separate baseline failures, missing configuration and skipped checks from new failures.
Distinguish static validation, mocked integration, exercised runtime behavior and live observations;
prepared code or a test plan does not establish active protection or successful execution.
