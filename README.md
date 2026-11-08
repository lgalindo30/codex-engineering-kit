# Codex Engineering Kit

A Codex plugin with focused engineering skills, shared policies, and optional project assets.
Written in English, MIT licensed, and designed for macOS and Linux.

## Install

Requires Git, Bun 1.3.14 or a compatible newer version, and a Codex local client with plugin support.
See the tested [compatibility baseline](docs/compatibility.md).

```sh
git clone https://github.com/lgalindo30/codex-engineering-kit.git
cd codex-engineering-kit
bun install --frozen-lockfile
bun run check
bun run setup:plugin --dry-run
bun run setup:plugin
bun run setup:plugin --check
```

Setup registers this checkout as a local marketplace and installs
`engineering-standards@codex-engineering-kit`. Keep the checkout available, then start a new Codex
session and verify skill discovery. See [updates, removal, and configuration boundaries](docs/installation.md).

## Choose a skill

Use a focused skill directly. For work spanning technologies or project concerns, use the optional
`engineering-workflow` coordinator to select the relevant skills.

```text
Use $node-development to add a validated endpoint to this API.
Use $cloudflare-workers-development to add an inventory feature backed by D1.
Use $engineering-workflow to build a Node.js API and separate Astro frontend.
Use $repository-quality to inspect this project's checks.
Use $change-verification to fix this bug and verify related flows and engineering standards.
```

| Skill                          | Purpose                                                |
| ------------------------------ | ------------------------------------------------------ |
| engineering-workflow           | Coordinate work across selected skills                 |
| bun-development                | Standalone Bun backends                                |
| node-development               | Standalone Node.js backends                            |
| cloudflare-workers-development | TypeScript Workers with Hono, bindings, and D1         |
| astro-development              | Astro sites and islands                                |
| nextjs-development             | Next.js applications and integrated server behavior    |
| react-vite-development         | React/Vite single-page applications                    |
| api-contracts                  | Schemas, OpenAPI, clients, and compatibility           |
| testing-strategy               | Verification risks, detection/cost and test retirement |
| change-verification            | Iterative bug/feature acceptance and standards review  |
| repository-quality             | Toolchains, checks, hooks, CI, and dependencies        |
| project-instructions           | AGENTS.md at actual project boundaries                 |
| observability                  | Operational signals, diagnostics and telemetry         |

Skills load shared policies and stack references as needed. They preserve existing project choices;
enabling the plugin does not install application dependencies or generate an application.
The [verification policy](plugins/engineering-standards/references/testing.md) selects independent
adversarial review and executable evidence from failure consequences, without unit-test quotas.
Test retirement records distinguish demonstrated replacement from accepted reduced protection;
project review recipes record activation, indirect consumers, owners and actual execution. Updating
the plugin does not create an automated agent review gate.
Optional [Bun project assets](plugins/engineering-standards/templates/README.md) provide conservative
quality scaffolding and hooks that require activation/trust. New compatible JS/TS projects default to
[Vite+](plugins/engineering-standards/references/vite-plus.md) for unified dev/build, testing, lint,
formatting and workspace tasks, while preserving Bun and existing project toolchains.

## Develop and verify

```sh
bun run format
bun run check
```

`check` runs formatting, lint, strict types, tooling tests, and structural validation.
Run the separate network-dependent `bun run security:check` when changing dependencies.
Agent evaluations and their status are documented in [behavioral validation](docs/behavioral-validation.md).
For contributing from any checkout, use the explicit [Git hook setup and worktree checks](docs/git-hooks.md).
New operational work follows the shared
[observability contract](plugins/engineering-standards/references/operation-observability.md) and
[resource budgets](plugins/engineering-standards/references/resource-budgets.md); optional Workers/D1
and MCP profiles apply only to selected integrations. Source updates do not automatically instrument
applications or refresh an installed plugin.

- [Contributing and knowledge ownership](CONTRIBUTING.md)
- [Architecture](docs/design.md)
- [Versioning before an authorized push](docs/releasing.md)
- [Security policy](SECURITY.md)
- [MIT license](LICENSE)
