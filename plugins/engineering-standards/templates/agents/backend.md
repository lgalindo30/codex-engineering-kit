# Backend Project Instructions

- Use English for repository content and generated defaults unless requested otherwise.
- This is a Bun quality scaffold; no application framework is installed. Record the selected runtime,
  framework, database, host and actual application commands after setup. Preserve established choices.
- Prefer functional composition, explicit dependencies and cohesive maintained files below 400 lines.
- Keep schemas backend-owned and consumers on versioned OpenAPI; no shared contracts package by default.
  Use `/api/v1` for new resource routes. Validate untrusted input/configuration and authorize data access.
- Commit reviewed migrations; keep reset/seed commands away from production and plan data recovery.
- Preserve selected auth/storage designs. Email/password does not select JWT; apply relevant session,
  rotation and CSRF controls. Local uploads require persistent writable storage. Default to 10,000,000
  bytes per file unless overridden, with separate request/count limits and content verification.
- Log structured console events, redact secrets and avoid complete bodies. Keep credentials/personal
  identity out of distributed assets. Add services and perform live remote actions only within scope.
- After dependency installation, checks are `bun run format:check`, `bun run lint`, `bun run typecheck`,
  `bun run test` and aggregate `bun run check`. The initial test placeholder fails deliberately; replace
  it with `bun test` after adding behavioral tests. Report actual results and unexecuted checks.
- Apply relevant OWASP controls and update these instructions as architecture and commands change.
