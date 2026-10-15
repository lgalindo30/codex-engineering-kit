# Next.js testing

Apply the [shared testing policy](../../../references/testing.md).

Preserve the runner/router and verify harness support for the installed framework. A DOM runner
cannot establish all server-component behavior.

- Test pure server logic independently from rendering; test client interactions through accessible UI.
- Exercise changed async server components, routing, cache invalidation, and rendering through app
  integration or browser tests. Framework mocks cannot establish these paths.
- Test Route Handlers/mutations for validation, authorization, ownership, error mapping, and effects.
  Check actual server logging so framework capture and application handling do not duplicate errors.
- Cover navigation/refresh, server mutations and state, native Not Found semantics, URL filter/sort/page
  history, retained form values, server errors, focus, pending guards, and optional client loading when changed.
- Verify generated styles and keyboard/focus behavior for changed interactions.
- Use production-like serving for changed caching, rendering, bundling, or deployment output. Distinguish
  intercepted fixtures from a real backend and builds from executed browser journeys.
