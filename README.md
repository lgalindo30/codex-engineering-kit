# Codex Engineering Kit

A personal engineering toolkit for Codex: specialized agents, reusable skills, project standards,
and reproducible setup. MIT licensed, written in English, and designed for macOS and Linux.

## What is included

- **One optional agent profile:** code_reviewer for independent read-only reviews.
- **Engineering Standards plugin:** ten focused skills with conditional references and safe quality
  templates. No MCP server, hosted service, or global lifecycle hook is required.
- **Reversible global setup:** dry-run, preserved configuration, collision detection, backups, and
  restoration. Personal Git identity is never installed by the kit.

Implementation skills follow the chosen stack: Bun or Node.js backends, Astro, Next.js, and React/Vite.
Shared guidance covers contracts, persistence, structured logging, security, and verification.
Authentication, hosted storage, OpenTelemetry, background jobs, and Kubernetes are conditional work.

The plugin supplies instructions and quality assets. It does **not** generate a complete application
or install these application dependencies merely by being enabled.

## Install

Prerequisites: Git, Bun 1.3.14 or a compatible newer version, and a working Codex local client with
custom-agent and plugin support. The tested Codex baseline is recorded in [compatibility](docs/compatibility.md).

```sh
git clone https://github.com/lgalindo30/codex-engineering-kit.git
cd codex-engineering-kit
bun install --frozen-lockfile
bun run check

# Preview both independent setup steps.
bun run setup:plugin --dry-run
bun run setup:global --dry-run

# Install the plugin first, then the managed global files.
bun run setup:plugin
bun run setup:global
bun run setup:doctor
bun run setup:plugin --check
```

`setup:plugin` registers this checkout as a local marketplace through the Codex CLI and installs
`engineering-standards@codex-engineering-kit`. Keep the checkout available for updates. It does not
publish anything to GitHub or a public marketplace. Set `CODEX_BIN` to a working Codex executable if
the `codex` command on your PATH is unavailable. No application-specific absolute path is assumed.

`setup:global` uses `CODEX_HOME` or `~/.codex`; use `--codex-home PATH` to preview/test another target.
It installs only the code_reviewer TOML, with private state and backups. Global AGENTS.md files remain untouched. It preserves the selected parent model and unrelated configuration. Existing agent conflicts
require review before using `--replace-existing`; originals are backed up locally. See
[installation and restoration](docs/installation.md) before replacing an existing profile.

Start a **new Codex session** after installation. Ask it to list the loaded engineering roles/skills,
then try a bounded task. Files on disk are not proof that the current session loaded them.

## Use

The main session uses the skills directly for backend, frontend, testing, and project scaffolding.
The optional code_reviewer profile provides independent review with a read-only sandbox. It has no
model or reasoning pin. For example: "Use code_reviewer to review this diff."

```text
Use $bun-development to add a validated endpoint to this Hono API.
Use $repository-quality to inspect this project's checks without replacing its tooling.
Use $observability to investigate this failure using the existing console logs.
Use engineering-standards to create a Node.js and Next.js application.
Use engineering-standards for a separate Node.js API and an Astro frontend.
```

| Skill                  | When it applies                                        |
| ---------------------- | ------------------------------------------------------ |
| bun-development        | Standalone Bun backends                                |
| node-development       | Standalone Node.js backends                            |
| astro-development      | Astro sites and islands                                |
| nextjs-development     | Next.js, including integrated server behavior          |
| react-vite-development | React/Vite single-page applications                    |
| api-contracts          | Versioned schemas, OpenAPI, clients and compatibility  |
| testing-strategy       | Meaningful unit, integration and browser verification  |
| repository-quality     | Toolchains, checks, hooks, CI and dependency hygiene   |
| project-instructions   | Accurate AGENTS.md at real project boundaries          |
| observability          | Logging, debugging, and explicitly requested telemetry |

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

`check` runs check-only formatting, lint, strict types, behavioral installer/template tests, and
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
- [Installation, backups, updates and restoration](docs/installation.md)
- [Versioning before each push](docs/releasing.md)
- [Compatibility and verification limits](docs/compatibility.md)
- [Behavioral acceptance scenarios](docs/behavioral-validation.md)
- [Security policy](SECURITY.md)
- [Contribution guide](CONTRIBUTING.md)
- [MIT license](LICENSE)
