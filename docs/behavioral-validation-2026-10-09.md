# Bounded Forward Tests — 2026-10-09

## Scope and method

The evaluation used the 2.0.0 plugin source at commit `8e1aaa1` with the working-tree storage and
authentication revisions. One fresh subagent was dispatched with GPT-6 Luna and high reasoning effort;
backend submodel metadata was not exposed to the evaluator. It received explicit skill paths,
realistic requests, and small raw fixtures in a disposable workspace. The parent owned
source changes and independently inspected artifacts and reran checks. Fixtures were separate, but
the evaluating agent handled them sequentially in one conversation.

This tests bounded instruction use and generated behavior. It does not establish automatic skill
discovery, isolated-home installation, every development skill, or universal compliance. The globally
installed plugin and operator configuration were not changed. No production resources or credentials
were used. Existing storage and identity adapters were represented by declared test doubles.

Parent tools observed: Bun 1.4.2, Node.js 24.21.0, Codex CLI 0.154.0, and TypeScript 5.9.3. The evaluator
separately reported Node.js 23.6.1 and npm 10.9.2; these observations are not interchangeable. The
parent reran Worker tests/build/types with its own environment. Worker dependencies included Hono
4.13.13, Zod OpenAPI 1.6.3, Zod 4.6.5, Drizzle ORM 0.45.4, Wrangler 4.149.0, Vite 8.3.4, Vitest 5.0.3,
Cloudflare Vite plugin 1.63.1, Cloudflare Vitest plugin 1.4.0, and workerd 1.20261006.1.

The evaluated snapshot contained 98 files and matched the repository plugin source after evaluation.
Its SHA-256 is `0c16b2b5e36f87ef157e3895af417ad810e0e1ba93c21a8a49bf544f998fd545`, computed
over sorted relative paths, NUL separators, file bytes, and a trailing NUL per file.

## Requests and acceptance boundaries

- Existing GCP document storage: protect an attachment download by ownership while retaining its
  `DocumentStore` integration. Check missing/unauthorized records and safe attachment metadata.
- Explicit storage change: for a separately requested local deployment with persistent writable
  storage, implement a filesystem adapter. Check retrieval, invalid records, traversal and symlink
  escape without replacing unrelated feature behavior.
- Existing opaque sessions: protect a profile using `SessionService`; reject absent/expired sessions
  without introducing another sign-in or token flow.
- Requested email/password: add the selected identity service's password method alongside its
  federated sign-in, keeping its opaque cookie sessions and checking invalid input/provider failure.
- Provider planning: propose public-form protection and rate limiting for AWS API Gateway/WAF,
  Azure Front Door Premium/WAF, GCP with existing reCAPTCHA, and an unspecified deployment. An
  unrelated Cloudflare DNS mention is present in each context. Identify pending setup without
  provisioning services or claiming active protection.
- Cloudflare API: implement small Hono inventory/contact features with Zod/OpenAPI, Drizzle/D1 and
  rate limits. Check actual local runtime/database behavior and distinguish mocked limiter behavior.
- Cloudflare form: implement interaction-only verification, disabled/loading submission, server
  validation and recovery. Check the mount/lifecycle adapter separately from controller tests and
  identify simulated provider behavior.
- Unselected storage/authentication: propose the decisions and setup needed for a new uploads/login
  feature without inventing a provider or implementing an unselected integration.

## Observed defects and review

The initial focused storage/session/password cases preserved their supplied integrations. The parent
reran nine passing tests with 30 assertions and strict TypeScript checking. The explicit filesystem
case initially had a missing test import and used an unsuitable fixed host-temporary filename; the
subagent corrected both and confined scratch resources to the disposable evaluation workspace.

The form's initial six controller/server tests passed, but parent inspection found a raw TypeScript
browser import, an asynchronous Turnstile readiness race, and callbacks that could submit after
unmount. These were generated implementation defects despite existing guidance for readiness and
cleanup. The parent requested adapter-level regression checks rather than duplicating plugin policy.

The first Worker draft omitted feature composition, Problem Details, structured correlated failures,
and tests that apply the actual migration files. Existing references already require those behaviors.
Review-assisted corrections must be distinguished from independent first-pass adherence.

Expanded parent type checking exposed another fixture defect: `typeof fetch` required Bun's extra
`preconnect` member on an injected Siteverify double. A narrow callable dependency contract corrected
the portability issue without a cast. Strict checking and the six form tests passed after the change.

## Results and limits

| Case                               | Final bounded result                                         | Evidence boundary                                            |
| ---------------------------------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| Existing object-storage adapter    | Passed: 3 tests                                              | Declared adapter double; no GCP account calls                |
| Explicit filesystem override       | Passed: 3 tests                                              | Actual disposable files, traversal and symlink checks        |
| Existing opaque session            | Passed: 2 tests                                              | SessionService double; no Azure identity integration         |
| Password method on chosen provider | Passed: 4 tests                                              | IdentityService double; existing cookie contract preserved   |
| Four provider plans                | Reviewed                                                     | Official capability research; no configured protection       |
| Cloudflare API                     | Passed after review: 7 tests, build and types                | Actual local workerd/D1 and migration files; limiter doubles |
| Cloudflare form                    | Passed after review: 6 tests, browser build and strict types | Siteverify responses and delivery simulated                  |
| Form browser adapter               | Passed after review                                          | Real Edge DOM with a simulated widget and contact endpoint   |
| Unselected upload/login proposal   | Reviewed                                                     | Provider/configuration decisions pending; no provisioning    |

The parent independently reran 18 Bun tests with 65 assertions across storage, session, password and
form fixtures, plus seven workerd tests. All 25 tests passed. The parent also reran Worker build/types,
browser compilation and strict TypeScript checking of the focused Bun/browser sources and tests.

Commands are normalized to a disposable evaluation root, with fixture paths supplied to the parent
compiler where needed:

- `bun test fixtures/storage fixtures/storage-override fixtures/session fixtures/password fixtures/form`
- In `fixtures/worker`: `bun run test`, `bun run build`, and `bun run typecheck`.
- In `fixtures/form`: `bun run build:browser` and the final `bun test`.
- Parent compiler: `tsc --noEmit --strict --target ES2023 --module ESNext --moduleResolution Bundler --types bun`
  over the storage/session/password sources and tests plus form controller/server/browser sources and tests.
- Browser: `bun run browser:test-server`, open its ephemeral loopback URL, inspect the actual harness
  result, then close the tab and stop the server. This was observed by the evaluator.

The final DOM harness checked hidden automatic verification through token success/server pending,
then a distinct visible manual challenge that hid after token issuance while submission stayed
disabled. It also checked late API readiness, duplicate attempts, expiration/error recovery, server
failure and cleanup/late callbacks. An earlier expanded run fetched the public Turnstile JavaScript
before simulation took over; no credentials, challenge token or Siteverify call were involved. The
final expanded run used a local-only script loader. This does not establish a real provider challenge.

Restricted package installation and local listeners initially failed. Scoped execution with owned
temporary/cache/log directories resolved the blockers. Wrangler telemetry was disabled per process;
global configuration was preserved. Initial generated defects and review-assisted passes are distinct.
The revised guides did not receive an independent repeat from another fresh agent after feedback.

Native rate-limit counters, live identity/storage providers, production configuration, remote D1,
deployment, load testing and the full scenario rubrics in [Behavioral Validation](behavioral-validation.md)
remain untested. Passing these bounded cases cannot establish universal plugin compliance.

The evaluator closed its browser tabs and stopped its test servers. After preserving this record and
inspecting the artifacts, the parent removed the disposable workspace, dependencies, local databases,
caches, logs and generated applications. Repository quality checks are recorded by the parent separately.
