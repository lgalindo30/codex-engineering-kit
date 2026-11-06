# Operational standards behavior

[Evaluation setup and recording](../../behavioral-validation.md#run-an-evaluation).
These are bounded agent scenarios, not a mandatory infrastructure checklist. All scenarios below
are **not run**. Executable kit tests do not establish generated-application behavior.

## Backend observability from the first implementation — not run

Prompt:

> Add a document-validation operation using this project's existing runtime, logger and repository.
> Inputs contain Unicode text and URLs. Preserve the complete evidence and current authorization.
> Include operational telemetry and realistic verification; do not add remote services or deploy.

Use fixtures with an ordinary result, missing provider metadata, a rejected await, overlapping calls,
slow/pending work and a throwing sink. Privately inspect the requirement-to-code/check/signal mapping.
Accept when observations distinguish phase/adapter/SQL/CPU meanings, expose incomplete coverage and
omissions, fit serialized event budgets, exclude injected secrets/content and preserve original results
and errors. Require tests through the actual entrypoint and representative text composition, not only
an empty database or many identical bytes. A declared skill invocation is not an acceptance criterion.

Repeat with compiled Workers/D1 bindings only when evaluating the Cloudflare profile. Check supported
batch/session and metadata-free APIs, pending callbacks, native severity and provider-only outcome
limitations. Do not infer Worker CPU compliance from a Node benchmark or claim a live provider test
without executing it.

## Replay, expired ownership and incomplete evidence — not run

Prompt:

> Make this existing background validation recover safely after interruptions without duplicating
> effects. Keep its current database and public contract unless a compatibility change is justified.

Use a real disposable engine with duplicate/concurrent requests, a repeated key with changed content,
an old worker resuming after a new claim, a lost provider response, interrupted pages and stale cursors.
Accept explicit request matching and receipt semantics, target-enforced fencing where applicable,
unknown-outcome reconciliation and no negative complete verdict from partial evidence. Do not accept
an expiry check alone as proof that a dispatched effect stopped. Verify critical writes and recovery
through the actual adapter; test doubles only establish their modeled external behavior.

## MCP schema and actual client — not run

Prompt:

> Expose the existing bounded validation through the selected MCP client. Preserve native semantics
> and complete evidence; verify that the client can discover and call the tool with valid large inputs.

Supply existing SDK/client versions, Unicode/byte-boundary values and a schema with a feature requiring
portability assessment. Accept separate evidence for validator, advertised schema, protocol round trip
and target-client behavior, including negative inputs and safe errors. If hosted execution exists,
exercise its actual limits and a deliberate native path for inputs that cannot fit it. Do not accept
Inspector/AJV success alone as proof of another client's compatibility, or a server listing as proof
of refreshed client discovery. Missing client access remains unverified.

## Worktree gate activation — automated bounded coverage

`bun test tests/git-hooks.test.ts` exercises isolated worktrees and a local bare remote. It verifies
explicit repeatable activation, effective paths, executable permissions, preservation of conflicting
managers/overrides, invalid staged commits/messages, version and quality rejections, unchanged remote
refs after rejection, corrected acceptance and the release-range CLI used by CI. This test does not
prove hosted GitHub execution, branch protection or hooks for another project's selected toolchain.
