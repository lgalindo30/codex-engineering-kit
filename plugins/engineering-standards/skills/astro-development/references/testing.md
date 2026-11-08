# Astro testing

Apply the [shared testing policy](../../../references/testing.md).

Match evidence to static output, islands, or on-demand routes; do not add a UI framework for its runner.
Generated content/schema properties can explore transformation boundaries, while emitted routes,
hydration and adapter behavior need their actual output/runtime. Include collections, shared content
helpers and adapter configuration when selecting project review recipes.

- Static content/styling may need framework checks, production build, and generated-page inspection
  only. Verify changed links, metadata, collections/schema failures, routes, and assets.
- Select properties or distinct checks for consequential content transformations. For islands, use their framework's component
  tools and browser checks for changed hydration timing, navigation, responsive output, keyboard/focus,
  forms, and pending/error behavior. Verify rendered Tailwind/shadcn variants without hydrating other content.
- Serve the built Not Found page through the chosen host. For interactive data views, verify URL history.
- For on-demand routes, test the real adapter/runtime, validation, authorization, errors, and persistence.
  A static build/preview cannot establish server integration or browser hydration.
