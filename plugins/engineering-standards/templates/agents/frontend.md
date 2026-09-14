# Frontend Project Instructions

- Use English for code, comments, documentation, and generated content unless the product explicitly requires another language.
- This is a quality scaffold, not an installed React, Astro, or Next.js application. Document actual framework commands after setup.
- When unspecified, choose React + Vite SPA for simple interactive applications, Astro for mostly static public content, and Next.js for complex applications. Treat public-site SEO and performance as explicit requirements.
- Next.js consumes the Bun/Hono backend. Put business logic in a separate backend unless explicitly requested otherwise.
- Use Ant Design when product requirements call for substantial forms, tables, and CRUD interfaces; use purposeful CSS for simpler experiences.
- Use Ant Design Skeleton for suitable initial asynchronous loading when Ant Design is installed; otherwise reuse a CSS Skeleton component. Preserve cached content during refresh, respect reduced motion, and avoid artificial loading for static content.
- Keep the API base URL and version centralized. Prefer client types generated from a pinned backend OpenAPI contract, with local Zod schemas for forms and runtime boundaries.
- Validate forms for usability; backend validation and authorization remain mandatory. Do not keep access or refresh tokens in localStorage.
- Prefer TanStack Query when remote-state caching is needed. Use the framework router; do not add a second router to Next.js or Astro by default.
- Use Vitest and React Testing Library for React behavior, and Playwright for critical browser journeys. Replace the deliberately failing initial test placeholder with an appropriate aggregate command once frontend tests exist.
- Maintain accessibility, semantic markup, keyboard support, loading states, empty states, and actionable error states.
- Prefer functional composition and explicit dependencies. Keep manually maintained source files below 400 lines and responsibilities cohesive.
- The current quality commands are `bun run format:check`, `bun run lint`, `bun run typecheck`, `bun run test`, and `bun run check` after dependency installation. This initial tooling configuration must be adapted to the chosen framework, including JSX, browser types, and framework lint rules.
- Keep server-only Bun APIs out of browser modules. Follow applicable OWASP guidance and update these instructions as project decisions change.
