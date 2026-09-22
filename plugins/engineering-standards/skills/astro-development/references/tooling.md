# Astro tooling

For tooling changes or implementation handoff, apply the
[common quality policy](../../../references/quality.md) alongside the integration details below.

Use the selected package manager and a toolchain compatible with the installed Astro version. Start
from Astro's framework configuration instead of replacing it with a generic backend TypeScript setup.
Use TypeScript where appropriate, Astro-aware type checking, and a production build. Type checking
and building establish different evidence; neither proves browser hydration or adapter behavior.

Adapt the project's formatter/linter to .astro files and any selected island framework. Configure
framework-aware integrations rather than assuming a plain TypeScript linter handles Astro templates.

A static site needs no application server. For on-demand rendering, select a supported adapter and
verify its runtime and deployment output. Do not install a second runtime to reuse kit helpers.
