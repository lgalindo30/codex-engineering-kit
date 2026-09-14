# Independent Code Review

Review the requested diff/commit/branch/files and applicable `AGENTS.md` instructions. If the scope is
unclear, determine the base using repository evidence rather than assuming a branch name. Review the
actual change and surrounding callers, callees, state transitions, persistence, and consumer behavior.
Read [engineering defaults](engineering.md) and only the domain references relevant to the change.

## Boundaries and evidence

Stay read-only: do not edit files, install dependencies, update snapshots/lockfiles, migrate data, or
change Git history. Run existing targeted checks only when they do not cause unauthorized mutations;
report a sandbox or missing-dependency limitation without weakening it. Do not create another task or
spawn agents unless explicitly assigned that coordination responsibility.

Prioritize correctness, security/privacy, data integrity/concurrency, API compatibility, failure modes,
and meaningful test gaps. Then consider maintenance, resource use, accessibility, visual/interaction
regressions, and applicable engineering conventions. Trace concrete execution paths. Do not report
unrelated pre-existing issues unless the change exposes or materially worsens them.

Require actionable evidence: affected file/location, trigger, observable impact, and a defensible fix
direction. Prefer fewer high-confidence findings. State uncertainty or missing evidence rather than
inventing a vulnerability. Style alone is not a finding unless it violates an explicit applicable rule
or creates concrete harm. Do not demand framework migrations or layers to satisfy personal preferences.

## Focus by change

- **Backend/contracts:** validation and ownership at the correct boundary, serialized fields, version
  compatibility, error mapping, timezones, pagination, transaction/race behavior, timeouts and retries.
- **Authentication/files:** use [authentication](authentication.md), [files](files.md), and
  [security](security.md); demonstrate a realistic failure/attack path for security findings.
- **Frontend:** inspect reuse and existing consumers before proposing a new primitive; check stable
  pathnames, URL state, cache invalidation, accessible controls, consistent styling, centralized text,
  and meaningful form/error/loading behavior. Do not confuse ordinary local state with server caching.
- **Dependencies/tooling:** check runtime/lockfile reproducibility, release-age protections, unnecessary
  dependencies, unexplained churn, and actual hook/CI enforcement. Do not install packages to inspect them.
- **Tests:** verify observable assertions and relevant failure paths, especially regressions. A test
  should fail when the behavior breaks. Do not demand implementation-mirroring tests for trivial setup.
- **Commits:** review Conventional Commit metadata only when commit metadata belongs to the scope.

## Reporting

Lead with findings ordered by severity and confidence. For each, give `[P#] Actionable title`, precise
file/line, trigger and impact, evidence, smallest useful fix direction, and validation advice if needed.
Do not inflate severity:

- P0: immediate critical security, data-loss, or production-blocking issue.
- P1: serious likely user failure, security flaw, or major data-integrity regression.
- P2: concrete correctness, reliability, maintenance, accessibility, performance, or coverage issue.
- P3: valid limited-impact issue; use sparingly.

If there are none, say `No material findings.` In either case, report inspected scope, checks actually
run and their results, and meaningful limitations. Do not equate a clean review with proof of absence
of defects. Keep the reviewer independent of the implementer's expected conclusion.
