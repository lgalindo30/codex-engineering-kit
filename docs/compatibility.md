# Compatibility and Verification

## Baseline

- Bun 1.3.14, TypeScript 5.9.3, ESLint 10.10.0, typescript-eslint 8.70.0, Prettier 3.9.6.
- macOS is the primary development environment; Linux is included in the CI matrix.
- The root tooling temporarily overrides transitive `minimatch` to 11.0.4. ESLint 10.10.0,
  its config-array dependency and typescript-eslint 8.70.0 still request affected 10.x ranges.
  [GHSA-g3hv-75wg-m249](https://github.com/advisories/GHSA-g3hv-75wg-m249) identifies versions below
  11.0.1 as affected. The override is an explicit cross-major compatibility decision for development
  tooling, verified through actual lint, staged hooks and negative Git gates; it is not an advisory
  suppression. Version 11.0.4 is the newest corrected stable release meeting the existing 24-hour
  release-age policy at adoption; 11.0.5 was too recent. Node engine requirements remain compatible
  with ESLint's selected runtime. Remove the override when both dependency paths adopt corrected
  versions, after fresh audit and gate verification. No application runtime dependency is added.
- Local plugin registration, installation, repeat installation and removal were exercised against
  Codex CLI 0.159.2 on 2026-10-15. This is a tested
  client snapshot, not a claim that every earlier or later build supports the same settings.

## Verification layers

`bun run check` verifies static packaging, local reference links, type safety, formatting,
and behavioral file/scaffolder/release tests. The tests use isolated temporary directories and local Git
repositories. They check actual file preservation, conflicts, rollback, staged snapshots and hook
failure behavior; they do not compare prompt prose as a substitute for agent evaluation.

`bun run security:check` consults dependency advisories. An unavailable network check is not a clean
audit. Static tooling and dependency scans do not prove the absence of application vulnerabilities.

Codex CLI plugin installation verifies registration and cache ingestion separately. A new interactive
session is still needed to verify skill discovery.
See [behavioral validation](behavioral-validation.md) for agent-driven acceptance cases and status.

CI execution on GitHub and Linux results cannot be claimed until the repository is pushed and those
runs complete. This kit does not automatically push or create a GitHub Actions run.

## References

- [Codex configuration](https://learn.chatgpt.com/docs/config-file/config-reference)
- [Codex plugins](https://learn.chatgpt.com/docs/plugins)
- [Codex hooks](https://learn.chatgpt.com/docs/hooks)
