# Anti-Bot Protection for Public Submission Forms

Recommend anti-bot protection for public unauthenticated contact, lead, newsletter, and similar
submission forms. Identify the real submission endpoint, deployment cloud, selected services, and
existing protection before proposing an integration. A public form alone does not select a cloud or
authorize adding a vendor, authentication flow, or new infrastructure.

## Provider selection and pending work

Respect the project's explicit cloud/service choices and established architecture. Prefer appropriate
native anti-bot tools from the selected cloud; verify their current capabilities, integration boundary,
and suitability for the actual form. Preserve an explicitly chosen supported protection service.
Do not introduce a different vendor because its integration appears in another guide or plugin.
When deployment context selects a cloud, its technology guidance owns provider-specific defaults and
integration details. If the cloud is unspecified, keep the recommendation generic and leave selection
pending rather than assuming a provider.

For planning or form work without an authorized anti-bot implementation, identify protection as a
concrete pending item: the proposed provider/control, affected endpoint, required configuration, and
next implementation step. Include it in the task's deliverable or existing project planning mechanism;
do not create unrelated tickets or tooling. Implement the selected integration when requested or
included in the task scope. Recommendation, provider selection, prepared code, active configuration,
and verified protection are different outcomes; report which was actually delivered.

Check whether the native option protects the form endpoint and supports the requested browser/API
flow. An edge WAF challenge and an application-level verification widget are not interchangeable by
assumption. If the native option cannot meet the required interaction, explain the limitation and
recommend a compatible alternative for selection. Do not silently change the chosen cloud or add an
external service. Missing credentials or account configuration remain explicit pending work.

## Interaction and enforcement when implemented

Keep automatic verification and success visually hidden; reveal an interactive challenge only
when the selected service requires visitor interaction. Verify that its supported behavior matches
this experience instead of hiding a required challenge with CSS or claiming unsupported capabilities.
Disable submission and conflicting mutation actions while actual verification/submission is pending,
with accessible loading/status feedback matching the existing design system. Expose concise status
and `aria-busy` on the form while work is pending; avoid announcing every polling step. Prevent duplicates,
preserve entered data on failure, and provide bounded timeout/retry recovery without indefinite loading.
Do not show simulated verification or claim protection while the integration is still pending.

Enforce the selected control at the real server or trusted edge boundary before side effects. Validate
provider results and relevant request/action/origin binding using that service's documented semantics;
a browser success callback is insufficient. Keep credentials server-side and tokens out of logs.
Combine protection with [security controls](security.md), bounded requests, [rate limiting](rate-limiting.md),
and relevant authorization/CSRF/idempotency controls. Static pages still need a protected submission
endpoint. Keep safe errors consistent with the [API contract](api-contracts.md#errors) where relevant.

## Verification

Use the selected provider's supported test facilities and disposable environments. Verify accepted,
rejected, invalid, expired/reused where applicable, and provider-failure paths without effects after
rejection. Check loading/disabled actions, retry recovery, and any interactive fallback with keyboard
access. Distinguish simulated provider responses, observed integration behavior, and pending setup;
do not use production credentials or claim that a recommendation is a configured control.
