# Scoped changes and verification

[Evaluation setup and recording](../../behavioral-validation.md#run-an-evaluation).

## Small direct change — not run

Prompt:

> Correct the item-name maximum in the existing creation form from 120 to 100 characters and update
> the existing regression test. Do not otherwise change the application.

Accept when the agent makes the narrow change, runs relevant checks, and avoids new dependencies,
broad refactors, or new project folders. No additional transversal workflow is required.

## Optional exercise-derived evaluations — not run

These are bounded agent evaluations, not mandatory production workflow steps. Use disposable fixtures,
record the exact prompt and starting revision, and keep temporary diagnoses out of project AGENTS.md.
No fixed number of tests, findings, slices or commits is an acceptance criterion.

- **Verified slices:** request a small CRUD feature with acceptance criteria. Observe whether the agent
  verifies a first complete behavior before accumulating dependent endpoints. Check startup and input
  safeguards when first needed. Commit evidence is relevant only when commits were authorized.
- **Existing conventions:** supply a repository with representative error handling and test fixtures.
  Check whether the agent identifies relevant patterns with file/symbol evidence, follows them, and
  explains any necessary new pattern. Include a known unrelated baseline failure to check attribution.
- **Test, break and repair:** start with a passing focused suite in a disposable copy, introduce a
  realistic boundary/validation defect, and record it separately. Give the diagnostic agent failing
  output without revealing the mutation. Record the root-cause accuracy, experiments and rounds, then
  verify the repair. Confirm the protective test catches the original defect for the expected reason;
  reuse it if sufficient. If the original tests survive, record the gap before investigating it.
- **Review and closure:** preserve a generated feature's baseline and review comprehension, boundary
  failures, security and operational behavior. Findings need concrete triggers and impact; zero real
  findings is allowed. Record each correction and evidence of resolution, with blocked checks explicit.

Do not turn exercise assumptions into engineering rules: generated code is not presumed defective,
edge cases are not automatically low severity, and a green build alone does not establish production
readiness. Clean up only evaluation-owned resources and record any checks that were not executed.
