---
name: project-instructions
description: Audit or restructure AGENTS.md across repository/application boundaries. Routine command updates belong to the technology skill.
---

# Project Instructions

Read [the shared workflow](../../references/workflow.md). Inspect the actual tree, Git root, manifests,
AGENTS.md/AGENTS.override.md files, and executable scripts before writing guidance.

Use a root file for standalone applications; monorepos can add focused files for distinct package
requirements. Keep root guidance aware of children: initial Codex discovery follows the working-directory
path, so workers starting at root must inspect target subtrees. A delegated role name creates no new
application boundary or nested repository.

Keep only rules that change decisions: actual stack/ownership, API/schema boundaries, security
requirements, working directories, verified commands, and durable conventions. Ground them in existing
files/symbols; distinguish observed patterns from proposals. Link longer repository documentation rather
than duplicating skill manuals or referring to another developer's home files.

Preserve useful examples and valid content. Record English defaults, functional composition, cohesive
modules normally below 400 lines, and explicit exceptions where applicable. Label incomplete skeletons;
remove placeholders before handoff and never call unexecuted commands verified. Temporary plans,
hypotheses, and review logs do not belong here. Kit updates do not automatically migrate generated apps.

Adapt [profile templates](../../templates/README.md) to the evidence. Report instruction locations,
meaningful rule changes, checked commands, and gaps; record an adopted kit version when useful.

Source: [Codex discovery](https://learn.chatgpt.com/docs/agent-configuration/agents-md).
