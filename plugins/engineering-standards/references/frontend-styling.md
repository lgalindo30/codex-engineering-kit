# Tailwind and Component Integration

Use when setting up or changing styling/components. Preserve explicit or established systems, including
Ant Design. For an unselected stack, prefer Tailwind; add shadcn/ui for complex React controls.
Static/simple pages normally need Tailwind alone.

## Styles and tokens

- Use utilities for normal styling. Keep a CSS entrypoint for Tailwind imports, semantic theme tokens
  and base styles; custom CSS remains valid for specific components, integrations and complex behavior.
- Resolve identity, density and responsiveness per project. Add dark mode when requested; check contrast
  and focus in active themes.
- Keep complete class strings or explicit variant maps; avoid fragments such as `bg-${color}-500`.
  Register external/monorepo sources using the installed Tailwind version's mechanism. Use validated
  CSS variables for dynamic values instead of unbounded class lists.

## Component ownership

Keep reused components in the established shared boundary, normally `components/ui/` for shadcn
primitives, with product wrappers alongside them. Keep feature-specific components near their feature.
Extract repeated behavior rather than copying long class lists or creating empty layers.

Use the framework's supported integration and compatible stable tooling. Review CLI/registry sources
and generated changes, adding only needed components. Generated shadcn code becomes maintained source:
preserve local changes, accessibility and [source limits](quality.md) during updates. Reuse the selected
primitive base rather than mixing UI systems without justification.

Keep browser-only Next.js primitives behind client boundaries. In Astro, use React islands only for
needed interactions; styling alone does not require React or hydration.

Verify production CSS, variants, responsive/focus states and reduced motion for changed components.

Sources: [Tailwind detection](https://tailwindcss.com/docs/detecting-classes-in-source-files),
[Tailwind themes](https://tailwindcss.com/docs/theme), [shadcn setup](https://ui.shadcn.com/docs/installation),
[shadcn source ownership](https://ui.shadcn.com/docs).
