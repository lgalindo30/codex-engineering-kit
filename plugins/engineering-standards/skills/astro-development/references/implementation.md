# Astro applications

Use static output for content that can be built ahead of time. Select on-demand rendering and a
compatible deployment adapter only when the behavior requires it. Package management and server
runtime are separate choices; Astro does not imply Bun or a standalone API.

- Prefer Astro components for static content. Add hydrated framework islands only for actual
  interaction, choosing hydration timing to match when the control must work.
- Preserve content collections and their schema validation when present. Verify content, links,
  generated routes, metadata, and asset behavior in the built output.
- Keep shared layout, copy, and styles coherent without shipping a React application for a static page.
  Apply accessible interactions and reduced-motion behavior to any islands added.
- Use framework type checking and production build verification. Test interactive islands with their
  framework's tools; verify hydration and critical navigation in a browser when behavior warrants it.
- For server-rendered routes, validate input and enforce authorization at the server boundary; test
  the chosen adapter's runtime rather than treating a static build as proof of server behavior.

Official reference: [Astro islands](https://docs.astro.build/en/concepts/islands/).

## Content, contracts, and diagnostics

Reuse semantic layouts and accessible controls. Validate content schemas and third-party content before
rendering; treat raw HTML as untrusted and sanitize only when rich HTML is actually needed. Keep image
sizes, metadata, canonical URLs, and generated routes consistent with the real deployment. Do not invent
a production origin. Static pages need no artificial loading states, API layer, or OpenAPI document.

For interactive API consumers and public on-demand APIs, apply the
[shared API contract policy](../../../references/api-contracts.md) and validate consequential external
values. Keep client form validation separate from server authorization. On-demand endpoints validate
input, enforce ownership where relevant, bound bodies/uploads, and return safe errors without stack
traces or credentials. Keep secrets out of client directives, public environment values, and output.

Diagnose static failures from build/content evidence, island failures from browser/hydration evidence,
and on-demand failures from the adapter's server logs, following
[shared logging](../../../references/logging.md). Verify the original failing path after a correction.
Do not add a logger SDK, analytics, or remote telemetry merely to a static site; retain supported logging
for existing servers.

For public submission forms, follow the [shared anti-bot policy](../../../references/public-forms.md)
to recommend protection appropriate to the selected cloud/services and record pending implementation
or configuration. When implemented, integrate browser controls through a hydrated island or focused
script and enforce protection at the real endpoint; a static build alone does not establish it.
