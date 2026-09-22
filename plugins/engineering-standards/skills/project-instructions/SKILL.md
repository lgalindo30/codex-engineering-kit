---
name: project-instructions
description: Audit or restructure AGENTS.md guidance across repository and application boundaries. Use for instruction-focused work; routine command documentation belongs to the technology skill.
---

# Project Instructions

This is an independent project-level workflow, not a prerequisite for development skills. Use local
technology references only when their execution detail helps the assigned analysis; do not route
ordinary implementation work through this skill.

Preserve the project's conventions and explicit task scope. Inspect the actual tree, Git root, manifests,
existing AGENTS.md/AGENTS.override.md files and executable scripts before writing instructions.

- A standalone backend or frontend uses its root AGENTS.md. A monorepo uses a root coordination file
  and focused files for applications/packages with distinct requirements. Never create a subproject
  directory or nested repository simply because a delegated role is named backend or frontend.
- Preserve existing valid user content. Describe the actual stack, file ownership, public API version,
  local schemas, commands with working directories, test strategy and deployment assumptions.
- Ground project-specific conventions in representative existing files or symbols; distinguish
  observed patterns from proposed decisions. Preserve useful examples or links when maintaining rules.
  Keep temporary task plans, hypotheses and review logs out of permanent AGENTS.md instructions.
- Include only the local rules that change decisions, linking repository-owned documentation for
  longer details. Do not duplicate the plugin skill manuals or require another developer's home-directory files.
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
