# Vite+ for new projects

Use Vite+ as the default toolchain for new compatible JS/TS projects: Vite for apps, Vitest for
JavaScript tests, Oxlint for linting, Oxfmt for formatting, and Vite Task for workspace orchestration.
Do not configure standalone Vite, Vitest, ESLint, Prettier or Turborepo alongside it by default.
Preserve existing toolchains; an ordinary feature or fix does not authorize migration.

## Setup and compatibility

Prefer the official `bun create vite-plus` flow for a new application, selecting the framework and
Bun package manager. Inspect generated scripts, agent instructions and hook settings before adopting
kit policy; do not run the kit initializer over conflicting files. The kit's optional
[quality scaffold](../templates/README.md) supplies shared configuration without application code.

Use a project-local, exact `vite-plus` development dependency and a committed lockfile. Resolve the
compatible stable version using [dependency selection](quality.md#dependency-selection). Keep Bun as
the selected package manager/runtime and provide the supported Node runtime required by the local
Vite+ CLI. Installing the global `vp` CLI or changing machine-level runtime management is optional;
package scripts resolve local `vp` without it. Do not install global tools merely to follow this guide.

For manual setup, follow the official [local CLI instructions](https://viteplus.dev/guide/local-cli):
set the package manager's `vite` override to the matching `npm:@voidzero-dev/vite-plus-core` version,
and pin its `vitest` override to the bundled version reported by local `vp toolchain vitest`.
Keep these aligned when upgrading. Framework plugins and Vitest ecosystem packages must support the
bundled versions; resolve actual peers rather than adding a second standalone runner or bundler.
Import config from `vite-plus` and test APIs from `vite-plus/test`.

Vite+ supplies tooling, not framework compatibility. Keep Next.js and Astro's own dev/build commands,
framework type generation/checks, and syntax-specific lint/format support. Retain specialized tooling
where compatibility or rule coverage requires it and document the reason. For Workers, verify the
Cloudflare Vite/Vitest integration against the bundled versions and exercise workerd; Vite+ alone does
not establish runtime compatibility. Bun backends can keep `bun test` for Bun-specific behavior.

## Configuration and acceptance

Consolidate supported settings in `vite.config.ts` with `defineConfig` from `vite-plus`. Put formatting
in `fmt`, lint in `lint`, tests in `test`, and task orchestration in `run`. Enable both
`lint.options.typeAware` and `lint.options.typeCheck`; otherwise `vp check` does not establish type safety.
Declare only settings that differ from the adopted version's defaults or enable required behavior;
omit empty blocks and duplicated inherited settings. The kit retains `fmt.singleQuote` to select
single quotes, explicit lint error severity for `no-debugger` and `no-unused-vars`, and both type options.
Formatting defaults supply semicolons, 100 columns, two spaces, trailing commas and LF line endings;
`.gitignore` supplies output-directory exclusions during file discovery, and Oxfmt skips lockfiles.
Add extra ignores only for a demonstrated gap, such as tracked generated files or explicitly named
files that must always be excluded. Keep explanations in documentation, not comments in config.

Adapt browser/server tsconfig boundaries and React/framework lint rules to the actual application.

Use package scripts backed by local tools:

- `format`: `vp fmt` (writes); `format:check`: `vp fmt --check` (check only).
- `lint`: `vp lint`; `typecheck`: `vp check --no-fmt --no-lint`.
- React/Vite apps: `dev`: `vp dev`, `build`: `vp build`, `preview`: `vp preview`.
- Vitest tests: `test`: `vp test run`; add Testing Library and a DOM/browser environment as needed.
- `check`: `vp check` followed by meaningful tests and the actual production build when applicable.

`vp check` covers static checks only. Keep framework-specific checks in the aggregate when required.
Run `bun run check` or `vp run check` for that aggregate: bare `vp check` cannot invoke a custom script.
Do not make absent tests pass with `--pass-with-no-tests`. Keep Playwright for critical browser journeys.
Reuse the aggregate in CI with a frozen install; keep advisory audits separate.

## Monorepos

Declare real packages in Bun workspaces and keep one lockfile. Use a root `vite.config.ts` for shared
lint/format settings with file/package `overrides`; package configs own framework/build/test behavior.
Use `vp run -r build` and `vp run -r test` for package tasks, or explicit package filters with
`--fail-if-no-match` so a typo cannot silently pass. Verify all expected packages are included.

Use Vite Task instead of adding Turborepo. Package scripts are uncached by default; opt into
`vp run --cache build` or define `run.tasks` with explicit commands and dependency relationships.
Keep each task name in either config or package scripts, never both. Disable caching for deployment,
stateful integration tests and other side effects. Do not cache acceptance checks until input,
environment and output invalidation have been exercised. A root quality scaffold has no packages;
replace its failing test placeholder with real package aggregation as packages are added.

Sources: [getting started](https://viteplus.dev/guide/),
[configuration](https://viteplus.dev/config/), [check](https://viteplus.dev/guide/check),
[Oxfmt defaults](https://oxc.rs/docs/guide/usage/formatter/config),
[formatter ignores](https://oxc.rs/docs/guide/usage/formatter/ignore-files),
[linter ignores](https://oxc.rs/docs/guide/usage/linter/ignore-files),
[Oxlint severity](https://oxc.rs/docs/guide/usage/linter/config),
[task execution](https://viteplus.dev/guide/run), [monorepos](https://viteplus.dev/guide/monorepo).
