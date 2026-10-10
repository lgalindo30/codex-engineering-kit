# Tailwind and Component Integration

Use when setting up or changing frontend styling/components. Explicit choices and established design
systems take precedence, including Ant Design. Do not add Tailwind/shadcn or migrate styles merely to
apply a new-project preference. For an unselected new stack, prefer Tailwind; add shadcn/ui for rich
React interfaces such as dashboards, forms and tables. Static/simple pages normally need Tailwind
alone; a primitive should solve a real interaction need rather than trigger a whole UI setup.

## Styles and tokens

Use utilities for normal component/layout styling. Keep an intentional CSS entrypoint for Tailwind
imports, project theme variables/tokens and necessary base styles; dedicated custom CSS remains valid
for a specific component, third-party integration or behavior poorly expressed by utilities. Avoid
duplicating utility styles in parallel stylesheets or scattering unrelated arbitrary design values.
Set visual identity, density and responsive behavior per project. Prepare semantic tokens for theme
changes; implement dark mode only when the product requests it. Verify contrast/focus in active themes.

Tailwind generates utilities from detected source classes at build time, not runtime usage or visited
routes. Keep complete class strings in source or explicit variant maps; do not interpolate fragments
such as `bg-${color}-500`. Register necessary external/monorepo sources using the installed version's
supported mechanism. Dynamic values can use validated CSS variables rather than unbounded class lists.

## Component ownership

Place reused components in the established `components/` boundary, normally `components/ui/` for
shadcn primitives and product wrappers alongside them. Keep single-feature components near that feature.
Extract actual repeated behavior/variants instead of copying long class lists or creating empty layers.

Use the selected framework's supported Tailwind/shadcn integration and pin compatible stable tooling.
Review the CLI/registry source and generated changes, preserve existing files/configuration, and add
only needed components. Generated shadcn source becomes maintained project code: review upstream
updates against local changes, preserve accessibility and test the changed interaction. Do not label
customized components exempt from source limits solely because they originated from a generator.
Reuse the project's chosen primitive base; do not mix another base or UI system without justification.

For Next.js, keep browser-only primitives behind appropriate client boundaries. For Astro, use shadcn
inside React islands when justified; do not hydrate static content merely to style it. Framework setup
is conditional, not a requirement to install React in every Tailwind site.

Verify actual production CSS and component states, including variants, responsive/focus styling and
reduced motion. A successful utility scan or a copied primitive does not prove accessibility.

Sources to verify when implementing:
[Tailwind detection](https://tailwindcss.com/docs/detecting-classes-in-source-files),
[Tailwind themes](https://tailwindcss.com/docs/theme),
[shadcn setup](https://ui.shadcn.com/docs/installation),
[shadcn source ownership](https://ui.shadcn.com/docs).
