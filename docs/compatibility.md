# Compatibility and Verification

## Baseline

- Bun 1.3.14, TypeScript 5.9.3, ESLint 10.10.0, typescript-eslint 8.70.0, Prettier 3.9.6.
- macOS is the primary development environment; Linux is included in the CI matrix.
- Local plugin installation was exercised against Codex CLI 0.154.0-alpha.6.2. This is a tested
  client snapshot, not a claim that every earlier or later build supports the same settings.
- Current custom-agent keys: name, description, developer_instructions; reviewer sandbox read-only.
  Only code_reviewer is distributed. The installer does not modify config.toml. The profile has no model/effort pins.

## Verification layers

`bun run check` verifies static packaging, local reference links, roles, defaults, type safety, formatting,
and behavioral installer/scaffolder tests. The tests use isolated temporary directories and local Git
repositories. They check actual file preservation, conflicts, restoration, staged snapshots and hook
failure behavior; they do not compare prompt prose as a substitute for agent evaluation.

`bun run security:check` consults dependency advisories. An unavailable network check is not a clean
audit. Static tooling and dependency scans do not prove the absence of application vulnerabilities.

Codex CLI plugin installation verifies registration and cache ingestion separately. A new interactive
session is still needed to verify discovery, dynamic model choices and effective concurrent slots.
See [behavioral validation](behavioral-validation.md) for agent-driven acceptance cases and status.

CI execution on GitHub and Linux results cannot be claimed until the repository is pushed and those
runs complete. This kit does not automatically push or create a GitHub Actions run.

## References

- [Codex subagents](https://learn.chatgpt.com/docs/agent-configuration/subagents)
- [Codex configuration](https://learn.chatgpt.com/docs/config-file/config-reference)
- [Codex plugins](https://learn.chatgpt.com/docs/plugins)
- [Codex hooks](https://learn.chatgpt.com/docs/hooks)
