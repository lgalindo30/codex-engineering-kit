---
name: project-instructions
description: Create or maintain accurate AGENTS.md files at real repository and application boundaries when establishing or changing project structure, commands, or architecture.
---

# Project Instructions

Read [shared policy](../../references/engineering.md). Inspect the actual tree, Git root, manifests,
existing AGENTS.md/AGENTS.override.md files and executable scripts before writing instructions.

- A standalone backend or frontend uses its root AGENTS.md. A monorepo uses a root coordination file
  and focused files for applications/packages with distinct requirements. Never create a subproject
  directory or nested repository simply because a delegated role is named backend or frontend.
- Preserve existing valid user content. Describe the actual stack, file ownership, public API version,
  local schemas, commands with working directories, test strategy and deployment assumptions.
- Include only the local rules that change decisions, linking repository-owned documentation for
  longer details. Do not repeat the global manual or require another developer's home-directory files.
- Record English content defaults, cohesive modules normally below 400 lines, explicit exceptions,
  functional composition, validation boundaries and the project's security-relevant requirements.
- When creating a skeleton, label incomplete application setup clearly. Never document a command as
  verified until it exists and was executed successfully. Remove placeholders before application handoff.
- Keep root instructions aware of child AGENTS files. Codex's initial instruction discovery follows
  the path to the working directory; workers starting at root must inspect target subtrees explicitly.
- Updating a kit/plugin does not automatically migrate a generated application. Propose a reviewable
  project change, preserve project decisions and record the adopted kit version when useful.

Use [profile templates](../../templates/README.md) as starting points, then adapt to evidence. Return
the instruction locations, meaningful rules added or changed, checked commands, and remaining gaps.

Source: [Codex instruction discovery](https://learn.chatgpt.com/docs/agent-configuration/agents-md).
