# Astro integration

Use static output for buildable content. Select on-demand rendering and a supported adapter only when
needed. Astro implies neither Bun nor a standalone API. Preserve explicit framework choices; discuss
island/shared-state costs instead of replacing Astro for a complex interface.

## Content and islands

Use Astro components for static content and hydrate islands at the time their interaction needs them.
Preserve content collections/schema validation, coherent layouts, and generated routes/metadata/assets.
Do not invent a production origin. Validate third-party content and sanitize raw HTML only when needed.

For an unselected styling stack prefer Tailwind. Use shadcn/React Hook Form/Zod in React islands when
needed, following [interface policy](../../../references/interface.md); preserve existing supported
styles/forms and avoid hydrating static content solely for a component system.

Use native routes and a built 404 page (normally `src/pages/404.astro`). Apply
[URL/data-view policy](../../../references/interface.md#navigation-and-data-views) to interactive views,
including navigation/history/hydration, without adding a second router. Static pages need no artificial
loading state, API layer, or OpenAPI document.

## Server integrations

For on-demand/public APIs and interactive consumers, apply
[API contracts](../../../references/api-contracts.md). Enforce validation, authorization, and safe
errors at the actual adapter/server boundary. Apply [authentication](../../../references/authentication.md)
only to session work: never prerender private session data, and keep islands within browser duties.

Apply [file policy](../../../references/files.md) for uploads; verify adapter parsing/body ceilings.
Local storage needs persistent writable hosting. Static output uses the selected API for uploads.
Apply [public-form policy](../../../references/public-forms.md), integrating browser controls through
an island/focused script and protection at the real submission endpoint.

Diagnose static failures through build/content evidence, islands through browser/hydration evidence,
and on-demand failures through adapter server logs with [logging policy](../../../references/logging.md).
Do not add a logger SDK or analytics to a static site merely for diagnostics.

Source: [Astro islands](https://docs.astro.build/en/concepts/islands/).
