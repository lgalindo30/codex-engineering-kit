---
name: frontend-development
description: Implement or revise React, Next.js, or Astro frontends using the project's API contracts, accessible components, and appropriate rendering strategy.
---

# Frontend Development

Use this workflow for frontend implementation, including work performed directly by the parent.

For substantial work, follow [delivery in verified slices](../../references/delivery.md). Ground
project conventions in nearby code and tests, verify each dependent slice, and explain necessary
pattern changes. Keep the process proportional to the task.

1. Read applicable project instructions and inspect the existing frontend, API client, and commands.
   Preserve the requested scope and existing framework unless a migration is authorized.
2. Read [engineering defaults](../../references/engineering.md) and the relevant sections of
   [frontend decisions](../../references/frontend.md). Choose rendering, routing, and UI tools from
   the product's needs: simple interactive SPA, static Astro site, or complex Next.js application.
3. Agree on the API version and contract before parallel frontend/backend implementation. Use the
   backend's versioned OpenAPI artifact when available; distinguish fixtures from verified endpoints.
4. Implement coherent components, explicit loading/error/empty states, accessible interaction, and
   local form validation. Keep server credentials and business persistence out of the frontend.
5. Add or update meaningful tests using [testing guidance](../../references/testing.md). Run the
   affected checks and inspect the actual interface when visual or interaction behavior changes.
6. For a new application, follow [repository-quality](../repository-quality/SKILL.md) and adapt
   the [quality assets](../../templates/README.md) to its framework. Include formatting, lint,
   framework type checks, meaningful tests where applicable, and production build verification;
   do not report a build alone as the complete quality gate.
7. Create or update the local `AGENTS.md` when project architecture or commands change. Place it at
   the actual application boundary, without inventing a new subproject or replacing unrelated rules.

Deliver the implemented behavior, contract assumptions, checks performed, and remaining limitations.
Write code, documentation, and default product copy in English unless the user specifies a locale.
