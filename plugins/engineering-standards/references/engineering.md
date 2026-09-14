# Shared Engineering Policy

Apply to new work; explicit requirements and established repository conventions take precedence.
Do not migrate or expand a project merely to apply these defaults.

## Toolchain and dependencies

- Prefer Bun, TypeScript strict mode, and ESM. Use import/export. Node is an allowed tool/runtime
  compatibility exception; document why and pin its version. Keep one package manager per workspace.
- Prefer uv/uvx for standalone Python tools when appropriate; use annotations and uv.lock. Prefer
  TypeScript for plugins belonging to a TypeScript application, subject to SDK/runtime requirements.
- Pin direct dependencies and the toolchain to tested stable versions. Commit the lockfile and use
  frozen installs in CI. Verify current official docs before selecting significant dependencies.
- Bun's install.minimumReleaseAge = 86400 is seconds and filters new resolutions, including
  transitive dependencies. Existing lockfile entries are not re-audited by this filter. Check advisories
  separately. Document narrowly scoped exceptions, especially urgent security patches.
- If a project intentionally uses Node with pnpm, retain its pinned toolchain, lockfile and existing
  minimumReleaseAge/trust protections; verify options for its pnpm version rather than copying Bun units.

## Code and communication

- Write code, identifiers, documentation, AGENTS files, examples, and default UI copy in English.
  Explicit product locale requirements override UI defaults. Conversation may follow the user's language.
- Favor functional composition, pure business functions and explicit dependencies. Classes are allowed
  for SDK/framework contracts or lifecycle/state where they materially improve clarity.
- Split modules by cohesive responsibility, normally before 400 source lines. Use roughly 50 lines per
  function as a review signal; never obscure logic just to satisfy a counter. Exclude generated files
  explicitly and document justified exceptions. Avoid interfaces/layers with no actual architectural value.
- Keep schemas local per application and derive consumer transport types from versioned OpenAPI.
  Sharing schemas across applications is an explicit design choice, not a monorepo requirement.
- Use EditorConfig, ESLint and Prettier without overlapping formatting rules. Two spaces, single JS/TS
  quotes, semicolons, 100-column formatting, UTF-8, LF, final newline; Python uses four spaces.

## Delivery and Git

- Establish the actual repository/application roots; do not create nested repositories or unnecessary
  frontend/backend folders. Initialize Git for a new evolving codebase only outside an existing repo.
- Use the user's existing Git identity or explicit task values in repository-local Git config only.
  Never embed personal identity or machine paths in distributable templates.
- When commits are requested, use Conventional Commits with meaningful package scopes in monorepos.
  Implementation does not imply authorization to commit, push, publish, or deploy.
- Preserve existing AGENTS.md content and document real commands and boundaries. Read instructions
  in the target subtree before changes, even when the session starts at repository root.
- Require meaningful verification for changed behavior. Do not add tests just to assert configuration
  text or manufacture coverage. Run relevant format, lint, type, unit/integration/build checks and report
  exact limitations. Formatting fixes and check-only commands are separate operations.
- Prefer scoped Git hooks and trusted project Codex hooks. CI remains the authoritative gate. Never
  silently disable checks or claim a skipped, network-blocked, or failed check passed.

## Ownership and conditional work

The parent owns architecture, contracts, integration and final verification. Delegate independent,
bounded tasks with explicit ownership; one owner handles shared manifests/lockfiles. Workers preserve
others' changes and escalate concrete uncertainty rather than guessing. Keep simple changes local.

Authentication, roles, multitenancy, queues, external telemetry and hosted storage are conditional.
Docker is the default for new server applications, not for every script or static artifact. Kubernetes
and replica adaptations require a later explicit request. Do not create an external account or service
merely because a reference describes its integration.

## Sources

- [Bun install](https://bun.com/docs/pm/cli/install)
- [Bun Test](https://bun.com/docs/test)
- [uv](https://docs.astral.sh/uv/)
- [Codex AGENTS.md](https://learn.chatgpt.com/docs/agent-configuration/agents-md)
- [Codex hooks](https://learn.chatgpt.com/docs/hooks)
