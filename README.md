# Codex Engineering Kit

A personal engineering toolkit for Codex: reusable skills, project standards,
and reproducible setup. MIT licensed, written in English, and designed for macOS and Linux.

## What is included

- **Engineering Standards plugin:** eleven focused skills with conditional references and safe quality
  templates. No MCP server, hosted service, or global lifecycle hook is required.
- **Plugin setup:** dry-run, preserved configuration, and marketplace collision detection through the
  Codex CLI. Personal Git identity is never installed by the kit.

Implementation skills follow the chosen stack: Bun or Node.js backends, Cloudflare Workers, Astro,
Next.js, and React/Vite.
Shared guidance covers contracts, persistence, structured logging, security, and verification.
Authentication, hosted storage, OpenTelemetry, background jobs, and Kubernetes are conditional work.

The plugin supplies instructions and quality assets. It does **not** generate a complete application
or install these application dependencies merely by being enabled.

## Install

Prerequisites: Git, Bun 1.3.14 or a compatible newer version, and a working Codex local client with
plugin support. The tested Codex baseline is recorded in [compatibility](docs/compatibility.md).

```sh
git clone https://github.com/lgalindo30/codex-engineering-kit.git
cd codex-engineering-kit
bun install --frozen-lockfile
bun run check

# Preview plugin setup.
bun run setup:plugin --dry-run

# Install and check the plugin.
bun run setup:plugin
bun run setup:plugin --check
```

`setup:plugin` registers this checkout as a local marketplace through the Codex CLI and installs
`engineering-standards@codex-engineering-kit`. Keep the checkout available for updates. It does not
publish anything to GitHub or a public marketplace. Set `CODEX_BIN` to a working Codex executable if
the `codex` command on your PATH is unavailable. No application-specific absolute path is assumed.

See [installation and updates](docs/installation.md) for configuration boundaries and removal.

Start a **new Codex session** after installation. Ask it to list the loaded engineering skills,
then try a bounded task. Files on disk are not proof that the current session loaded them.

## Use

The main session uses the skills directly for backend, frontend, testing, and project scaffolding.

```text
Use $bun-development to add a validated endpoint to this Hono API.
Use $cloudflare-workers-development to add a modular Hono API with Zod contracts and D1.
Use $repository-quality to inspect this project's checks without replacing its tooling.
Use $observability to investigate this failure using the existing console logs.
Use engineering-standards to create a Node.js and Next.js application.
Use engineering-standards for a separate Node.js API and an Astro frontend.
```

| Skill                          | When it applies                                        |
| ------------------------------ | ------------------------------------------------------ |
| bun-development                | Standalone Bun backends                                |
| node-development               | Standalone Node.js backends                            |
| cloudflare-workers-development | TypeScript Workers with Hono, bindings and D1          |
| astro-development              | Astro sites and islands                                |
| nextjs-development             | Next.js, including integrated server behavior          |
| react-vite-development         | React/Vite single-page applications                    |
| api-contracts                  | Versioned schemas, OpenAPI, clients and compatibility  |
| testing-strategy               | Meaningful unit, integration and browser verification  |
| repository-quality             | Toolchains, checks, hooks, CI and dependency hygiene   |
| project-instructions           | Accurate AGENTS.md at real project boundaries          |
| observability                  | Logging, debugging, and explicitly requested telemetry |

Each technology skill owns its implementation, testing, tooling, and stack-specific integrations.
Reusable policies live once in the plugin's `references/` directory and are linked where needed,
including authentication and date semantics. A shared reference does not invoke another skill.
Testing, quality, contracts, observability, and project instructions provide independent project-wide
assessments and coordination rather than mandatory implementation steps. See [contributing](CONTRIBUTING.md#adding-technology-skills)
for extension boundaries.

For a Bun-specific quality skeleton, see [project templates](plugins/engineering-standards/templates/README.md).
Existing repositories retain their conventions; the scaffolder refuses differing configuration.
Project Git/Codex hooks are opt-in assets and need activation/trust. They are not installed globally.

## Develop and verify

```sh
bun run format
bun run check
bun run security:check
```

`check` runs check-only formatting, lint, strict types, behavioral file/template/release tests, and
structural validation. `security:check` is a separate network-dependent advisory audit, also run in CI.
No test invokes a model, deploys an app, or uses production data. Real agent acceptance scenarios are
documented separately with their execution status in [behavioral validation](docs/behavioral-validation.md).

Activate this repository's Git hooks only after inspecting any existing local `core.hooksPath`:

```sh
git config --local core.hooksPath .githooks
```

Conventional Commits require a scope in this multi-package/tooling repository. Commits, pushes,
publication and deployments are separate actions; setup never performs them.

## Project documentation

- [Architecture and agreed decisions](docs/design.md)
- [Plugin installation, updates and removal](docs/installation.md)
- [Versioning before each push](docs/releasing.md)
- [Compatibility and verification limits](docs/compatibility.md)
- [Behavioral acceptance scenarios](docs/behavioral-validation.md)
- [Security policy](SECURITY.md)
- [Contribution guide](CONTRIBUTING.md)
- [MIT license](LICENSE)
