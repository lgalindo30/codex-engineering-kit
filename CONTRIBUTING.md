# Contributing

Use English for public content. Keep changes focused and preserve the distinction between policy,
agent responsibility, reusable workflow, and executable enforcement. Avoid adding every preference to
every skill; link focused references instead.

Install the pinned toolchain/dependencies, run `bun run format`, then `bun run check`. Run
`bun run security:check` when changing dependencies. Add behavioral tests for installer or hook changes
that could damage user files, misreport validation, or bypass a quality gate. Test changes to skills
against realistic tasks when appropriate and record what was actually executed.

Do not add real identity defaults, personal paths, credentials, telemetry destinations, or model keys.
Use repository-local Git identity configured by each contributor. Use scoped Conventional Commits when
creating commits. A successful implementation or review does not authorize a push or release.

Increment the plugin version before every push that advances an existing remote branch, including
documentation-only changes. Use `bun run release:bump patch` (or `minor`/`major`) before committing;
this keeps the root package version aligned. Enable `.githooks` to check outgoing committed versions.
See [the release workflow](docs/releasing.md) for initial branches, tags, and enforcement limits.
Validate installation from the repository marketplace before publishing. Document breaking policy changes and project migration
guidance; never rewrite previously generated projects implicitly.

## Adding technology skills

Add a discoverable folder under the plugin's skills directory with its own SKILL.md, agents/openai.yaml,
and the references needed by its workflow. Runtime/framework behavior, testing strategy, and tooling
belong to that skill. Names and descriptions should distinguish the capability and scope. The validator
discovers skills automatically; no central technology registry is needed.

Keep common policies with multiple consumers in the plugin's references directory. Link to them from
local guides rather than copying them: authentication, date semantics, server file rules, security,
server deployment controls, and interface criteria have canonical shared sources. Local references
should explain real integration differences, not restate those rules. If a topic has no stack-specific
detail, link directly to the shared policy instead of adding a wrapper file. Shared policy must not link
back into a technology skill; the local caller owns integration details.

Testing strategies remain local because execution and evidence differ by stack. Transversal skills
remain independent project-wide assessment/coordination workflows, not mandatory implementation steps.
A testing-only task reads the local testing guide without starting application scaffolding. Load common
policy only for the feature that needs it, not all references for every task.

The validator follows inline Markdown links from each SKILL.md through local and shared knowledge.
Every local reference must be reachable from its skill; every shared reference must be reachable from
at least one skill. It rejects broken targets, orphan files, cross-skill knowledge dependencies, and
shared-policy links back into skills. Optional shared executable/template assets are allowed.
External links are sources to verify when implementing; structural checks do not prove their current
content or the agent's runtime behavior. Validate relevant behavior before claiming it was exercised.
