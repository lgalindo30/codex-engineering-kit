# Frontend Project Instructions

- Use English for repository content; honor the product's requested language.
- This is a Bun quality scaffold; no application framework is installed. Record the selected framework,
  rendering mode, backend boundary, host and actual application commands after setup. Preserve choices.
- Adapt TypeScript JSX/browser/server boundaries and framework lint before application checks.
- Prefer functional composition, explicit dependencies and cohesive maintained files below 400 lines.
  Keep reused UI shared and feature-specific UI near its feature; customized generated UI is maintained source.
- Centralize API origin/version and use the backend's supported contract. Validate forms locally and
  mutations on the server. Keep secrets, persistence and server-only Bun APIs out of browser dependencies;
  never put access/refresh tokens in browser storage or logs.
- Provide accessible keyboard/focus behavior, loading/empty/error states and recoverable submissions.
  Prevent duplicate pending mutations and preserve meaningful unsaved values on failure.
- After dependency installation, checks are `bun run format:check`, `bun run lint`, `bun run typecheck`,
  `bun run test` and aggregate `bun run check`. The initial test placeholder fails deliberately; configure
  behavioral tests before replacing it. Report actual results and unexecuted checks.
- Preserve unrelated configuration. Keep credentials/personal identity out of distributed assets; add
  services and perform live remote actions only within authorized scope. Update these instructions as
  architecture and commands change.
