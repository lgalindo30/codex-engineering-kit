# Anti-Bot Protection for Public Submission Forms

Recommend protection for public unauthenticated contact, lead, newsletter and similar submissions.
Identify the real endpoint, deployment and existing protection first.

## Provider selection and pending work

Prefer suitable native tools from the selected cloud; preserve an explicitly selected supported service.
Technology guidance owns provider defaults/integration. Without a cloud selection, leave the provider
pending. Verify endpoint/browser/API support: WAF challenges and verification widgets are not equivalent.
If native protection cannot meet the flow, explain the limitation and propose an alternative for selection.

Implement when included in scope. Otherwise record a concrete pending item: endpoint, proposed control,
required configuration and next step. Distinguish recommendation, prepared code, active configuration
and verified enforcement using [workflow criteria](workflow.md).

## Interaction and enforcement when implemented

Keep automatic verification/success hidden and reveal required interaction using supported provider
behavior; never hide a required challenge with CSS or simulate protection. Follow [form behavior](interface.md#forms-errors-and-mutations)
for pending actions, accessible status, preserved values and bounded retry recovery. Expose `aria-busy`
on the pending form without announcing every poll.

Enforce at the real server/trusted edge before effects. Verify provider results and applicable
action/origin bindings; browser callbacks are insufficient. Keep credentials server-side and tokens
out of logs. Combine with [rate limits](rate-limiting.md), bounded requests and applicable
authorization/CSRF/idempotency. Static pages still require a protected endpoint; use [safe errors](api-contracts.md#errors).

## Verification

Use provider test facilities. Exercise accepted, rejected, invalid, expired/reused and provider-failure
paths where applicable, with no effects after rejection. Check keyboard interaction, pending/disabled
actions and recovery. Apply [shared testing criteria](testing.md).
