# Monorepo Instructions

- Use English for repository content and generated defaults unless requested otherwise.
- This Bun/Vite+/strict TypeScript quality scaffold creates no applications. Record selected stacks and actual
  commands per application; add workspaces only for real packages.
- Keep configuration minimal: omit tool defaults, empty sections and duplicated inherited settings.
- Use project-local Vite+ for formatting, lint and type checks in `vite.config.ts`; keep type-aware
  lint and type checking enabled. Preserve existing tools; do not add ESLint, Prettier or Turborepo
  by default. Keep a supported Node runtime for Vite+ alongside the selected Bun runtime.
- Assign delegated file ownership/acceptance criteria; one owner coordinates root config and lockfile.
- Use scoped AGENTS.md files for actual app/package boundaries; inspect target instructions before edits.
- Keep contracts backend-owned; generate clients from versioned OpenAPI. Shared contracts need justification.
- Preserve architecture and unrelated configuration. Add services and perform live remote actions only
  within authorized scope; keep secrets/personal identity out of distributed assets.
- Prefer functional composition, explicit dependencies and cohesive maintained files below 400 lines.
- After dependencies are installed, root checks are `bun run format:check`, `bun run lint`,
  `bun run typecheck`, `bun run test` and aggregate `bun run check`. The initial test placeholder fails
  until behavioral tests exist; current checks cover the root scaffold only.
- When adding packages, keep one workspace lockfile and configure scoped checks, root aggregation and
  cross-package integration tests using Vite Task (`vp run -r`), with verified package coverage. Report actual coverage/unexecuted checks and update these instructions.
