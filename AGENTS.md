# Codex Engineering Kit

This repository contains a public Codex plugin, global agent profiles, and a reversible installer.

- Write repository content, code, comments, and generated project defaults in English.
- Keep personal Git identity in local Git configuration only. Never put personal names, email defaults, credentials, or machine-specific paths in distributed templates.
- Use Bun and strict TypeScript for executable tooling. Prefer functional composition and explicit dependencies.
- Keep manually maintained source files below 400 lines and split by responsibility. Avoid mechanical fragmentation.
- Preserve unrelated user configuration, agents, installed plugins, and working-tree changes.
- Installation must support dry-run, backups, repeatable execution, conflict detection, and restoration.
- Keep role profiles small. Put task workflows in skills and conditional detail in linked references.
- The parent may delegate bounded independent implementation or review work. Assign file ownership; workers must not overwrite another worker's changes. The parent owns integration and final verification.
- Do not install infrastructure, authentication, telemetry, or unrelated project tooling merely because a skill describes it.
- Run the repository's documented quality command before reporting implementation complete; report unavailable checks accurately.
- Before an authorized push advancing repository content, prepare and commit a higher plugin version using the release workflow, even for documentation-only changes. Never bump or create commits inside a push hook.
- Do not commit or push unless explicitly requested.
