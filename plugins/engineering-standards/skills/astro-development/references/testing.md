# Astro testing strategy

## Select the evidence

Match verification to static output, interactive islands, or on-demand routes. Preserve established
tools; do not add a UI framework merely to obtain its test runner.

- For static content or styling, framework checks, a production build, and inspection of generated
  pages may suffice. Check links, metadata, content schema failures, routes, and assets affected by
  the change. Avoid unit tests that merely repeat static markup.
- Unit-test meaningful content transformations and business rules independently from rendering.
- Test interactive islands with their framework's compatible component tools. Exercise accessible
  controls, invalid input, and loading/empty/error states when those behaviors exist.
- Use browser tests for hydration timing, navigation, focus, keyboard interactions, and critical flows
  when changed. Inspect responsive output; a component test does not establish successful hydration.
- For on-demand routes, test the selected adapter and runtime, validation, authorization, failure
  responses, and persistence as applicable. A successful static build does not verify server behavior.

## Isolation and regressions

Use deterministic content fixtures and disposable output directories, accounts, and services. Never
reset production resources or perform live external actions as tests. Keep concurrent runs independent.
For a defect, reproduce the broken generated output or interaction before the correction when practical,
then verify the same case. Use observable conditions instead of fixed sleeps and avoid assertions tied
to incidental generated markup. Do not add artificial loading to test a page that renders statically.

## Execution and reporting

Run affected checks and the project's quality command. Inspect built output for routing, asset, or
rendering changes and use the actual server adapter when relevant. Record what was built, inspected,
and exercised in a browser, plus commands, failures, and missing prerequisites. Redact artifacts.
Do not describe a static preview as server integration evidence or require an arbitrary coverage quota.
