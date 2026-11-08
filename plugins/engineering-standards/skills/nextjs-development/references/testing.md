# Next.js testing

Apply the [shared testing policy](../../../references/testing.md).

Preserve the runner/router and verify harness support for the installed framework. A DOM runner
cannot establish all server-component behavior.

Generated server-policy inputs can challenge business invariants; navigation, caching and rendering
still need the actual app boundary when affected. Match project review recipes against shared server
helpers, caller contracts and cache/runtime configuration, not only route files.

- Select independent properties or behavioral checks for consequential server logic; exercise changed
  client interactions through accessible UI.
- Exercise changed async server components, routing, cache invalidation, and rendering through app
  integration or browser tests. Framework mocks cannot establish these paths.
- Test Route Handlers/mutations for validation, authorization, ownership, error mapping, and effects.
  Check actual server logging so framework capture and application handling do not duplicate errors.
- Cover navigation/refresh, server mutations and state, native Not Found semantics, URL filter/sort/page
  history, retained form values, server errors, focus, pending guards, and optional client loading when changed.
- Verify generated styles and keyboard/focus behavior for changed interactions.
- Use production-like serving for changed caching, rendering, bundling, or deployment output. Distinguish
  intercepted fixtures from a real backend and builds from executed browser journeys.
