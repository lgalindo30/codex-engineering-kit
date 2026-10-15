# React/Vite testing

Apply the [shared testing policy](../../../references/testing.md).

Preserve the runner; Vitest/React Testing Library and Playwright are useful new-project options for
component behavior and critical journeys respectively.

- Exercise accessible interactions: validation, pending/error/empty/retry states, keyboard, and focus.
  For styling changes inspect generated variants, responsive/focus behavior, and reduced motion rather
  than class strings alone; complement automated accessibility checks with keyboard/focus inspection.
- For TanStack changes, use isolated router/query instances; check shared loader/component cache,
  validated search state, back/forward, mutation invalidation, and session clearing.
- Verify Not Found, direct links/refresh, and filter/sort/page history in a browser. For changed routing,
  assets, base paths, or splitting, use production-like serving and inspect initial/deferred requests,
  failed-chunk recovery, retained unsaved work, and bounded retries.
- For forms, check retained values, server errors, invalid-control focus, and duplicate submission guards.
  Test file selection, preview cleanup, cancellation, retry, and actual server rejection handling.
- Distinguish HTTP fixtures from real backend journeys; browser validation cannot prove server access
  or data integrity. Vite bundling is separate from type checking and browser execution.
