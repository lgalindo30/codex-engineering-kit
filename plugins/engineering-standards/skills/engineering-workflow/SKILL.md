---
name: engineering-workflow
description: Coordinate engineering work spanning multiple technologies or project-wide concerns. Use for combined backend/frontend work or cross-package changes; use a focused skill directly for a single-stack task.
---

# Engineering workflow

Read the [shared workflow](../../references/workflow.md). Inspect the actual application boundaries
and selected stack, then use only the skills needed for the request. Resolve missing framework or host
decisions before dependent scaffolding using [frontend selection](../../references/frontend-architecture.md).
A request for Node.js and Next.js can describe one integrated application.

| Work                                                         | Skill                                                                                                                                 |
| ------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------- |
| Standalone backend                                           | [Node.js](../node-development/SKILL.md) or [Bun](../bun-development/SKILL.md)                                                         |
| Workers, bindings, D1 or selected Cloudflare form protection | [Cloudflare Workers](../cloudflare-workers-development/SKILL.md)                                                                      |
| Frontend or integrated application                           | [Astro](../astro-development/SKILL.md), [Next.js](../nextjs-development/SKILL.md) or [React/Vite](../react-vite-development/SKILL.md) |
| Public contracts and compatibility                           | [API contracts](../api-contracts/SKILL.md)                                                                                            |
| Project-wide test assessment                                 | [Testing strategy](../testing-strategy/SKILL.md)                                                                                      |
| Repository checks and tooling                                | [Repository quality](../repository-quality/SKILL.md)                                                                                  |
| Logging, diagnosis or requested telemetry                    | [Observability](../observability/SKILL.md)                                                                                            |
| Instruction structure                                        | [Project instructions](../project-instructions/SKILL.md)                                                                              |

Read the selected entrypoints and their relevant references; the table is not a mandatory checklist.
Routine stack implementation uses its own testing and tooling guidance. Coordinate shared contracts
and dependent changes at the real package boundaries, without duplicating another skill's procedure.
When delegating, assign non-overlapping file ownership and integrate the results before verification.
