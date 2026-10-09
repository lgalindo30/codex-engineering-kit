# Rate Limiting at Application Boundaries

Recommend rate limiting for authentication, public submissions, expensive operations, and other
abuse-sensitive endpoints in the requested functionality. Inspect the actual serving boundary,
deployment target, selected services, and existing limits before proposing implementation.

## Service selection and pending work

Respect the project's chosen cloud/services and established architecture, including deployments
outside managed clouds. Prefer a suitable existing or native control at the trusted edge, gateway,
or server boundary. Verify current capabilities against the endpoint and required scope; provider
configuration and runtime integration belong to the relevant technology guide.
Do not introduce a different vendor, change hosting, or provision a service because another guide
describes it. A tooling mention alone does not select a deployment provider. If the deployment or
service is unspecified, keep the recommendation generic and leave service selection pending.

Implement when requested or included in scope. Otherwise record a concrete pending item in the
deliverable or existing planning mechanism: affected endpoints, proposed control, policy decisions,
required configuration, and next step. Missing account access or configuration remains explicit
pending work. Distinguish recommended, prepared, configured, and verified protection; do not claim
that middleware or a configuration file alone establishes active enforcement.

## Policy and enforcement

Choose thresholds, windows, allowed bursts, and key scope from expected traffic and operation cost,
not an arbitrary universal quota. Document protected endpoints and justified health/internal-route
exemptions. Preserve existing controls and check how multiple enforcement layers interact.

Prefer a verified user/tenant identity for authenticated traffic. For anonymous traffic, use a bounded
key combining endpoint policy with a trusted identifier when suitable. Account for shared networks,
proxies, and platform trust when using IP addresses; do not accept spoofable client identity headers.
Bound key length, cardinality, and retention where the control supports them. Authenticate before
user-based limits; apply protection before expensive work, provider calls, and side effects. Early
anonymous controls may also protect the authentication boundary.

Enforce at the real trusted serving boundary and check that alternate routes cannot bypass it.
Browser delays and counters in one process do not establish distributed enforcement. Confirm the
selected control's consistency, geographic scope, and concurrency behavior. Approximate abuse
protection is different from exact global quotas or billing; stricter requirements need an explicit
design rather than unsupported guarantees from the default limiter.

Keep rate limiting alongside validation, authorization, bounded requests, and applicable
[anti-bot protection](public-forms.md); none substitutes for the others.

## Responses and failures

For application/API rate-limit rejection, return a documented `429` following the
[shared error contract](api-contracts.md#errors). Check gateway/edge rejection behavior separately
and document differences when that layer cannot produce the application error format. Include
`Retry-After` only when supported by a defensible retry policy; do not invent an exact reset time.
Keep client recovery bounded and avoid retry storms or automatic duplicate mutations.

Define behavior when the limiter is unavailable according to endpoint risk and availability needs.
Distinguish limiter failures from exceeded limits; do not silently bypass enforcement or label every
failure as `429`. Use safe errors and the [shared logging policy](logging.md), without credentials,
raw identity keys, or routine per-request logging.

## Verification

Exercise allowed, exceeded, and limiter-failure paths at the actual enforcement boundary. Check
trusted identity selection, policy isolation, exemptions, bypass attempts, concurrent requests when
relevant, response/retry semantics, and no effects after rejection. Use isolated keys and disposable
environments. Distinguish mocks, local integration, pending setup, and observed remote behavior;
local tests do not prove distributed accuracy or live configuration.

## Primary references

- [OWASP REST Security](https://cheatsheetseries.owasp.org/cheatsheets/REST_Security_Cheat_Sheet.html)
- [RFC 6585: 429 Too Many Requests](https://www.rfc-editor.org/rfc/rfc6585.html#section-4)
- [RFC 9110: Retry-After](https://www.rfc-editor.org/rfc/rfc9110.html#section-10.2.3)
