# Next.js testing strategy

## Select the test boundary

Preserve the project's runner and router. Check support for the installed Next.js version before
choosing a harness; a browser-like DOM runner cannot establish all server component behavior.

- Unit-test pure transformations and server business logic with explicit persistence/network boundaries.
- Test client components through user-visible interactions, accessible roles, labels, loading/error
  states, and keyboard behavior. Use the established runner or a compatible Vitest/Testing Library setup.
- Exercise async server components, routing, cache invalidation, and rendering through application
  integration or browser tests when affected; mocks of framework internals do not prove these paths.
- Test Route Handlers and server mutations with invalid input, unauthorized requests, resource ownership,
  error mapping, and successful effects. Invocations from the UI do not make server inputs trusted.
- Cover critical browser journeys across navigation, refresh, mutations, and resulting server state.
  Distinguish intercepted API fixtures from an application connected to its actual backend.

## Isolation and regression evidence

Use a dedicated application instance, disposable database and test accounts, and sandbox external
integrations. Confirm configuration before resets; never use production. Give parallel runs separate
resources. Keep secrets out of browser fixtures, traces, screenshots, and logs.

For defects, reproduce the specific failing interaction or server condition before the correction when
practical, then verify the same case. Prefer observable assertions over framework internals or broad
snapshots. Await user-visible conditions instead of sleeping. Inspect accessibility and focus when
interaction changes; automated checks alone do not establish accessibility.

## Execution and reporting

Run affected tests, framework type/lint checks, and production build when rendering or bundling changes.
Test production-like serving for behavior that differs from development, including caching or deployment
output. Report the router, runtime, services exercised, commands, failures, and unexecuted scope.
A build is not an executed browser journey; retries must not conceal flaky behavior. Do not impose a
universal coverage percentage or require browser tests for a pure function already covered below.
