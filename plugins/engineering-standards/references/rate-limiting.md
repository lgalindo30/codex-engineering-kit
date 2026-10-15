# Rate Limiting at Application Boundaries

Recommend controls for authentication, public submissions, expensive operations and other abuse-sensitive
endpoints. Inspect the real serving boundary, selected services and existing controls first.

## Service selection and pending work

Prefer a suitable existing/native control at the trusted edge, gateway or server. Technology guidance
owns provider integration. Without a deployment/service selection, leave selection pending.

Implement when included in scope; otherwise record endpoints, proposed control, policy/configuration
decisions and next step. Distinguish prepared, configured and verified protection using [workflow criteria](workflow.md).

## Policy and enforcement

- Choose thresholds, windows, bursts and key scope from traffic/cost, not a universal quota. Document
  protected endpoints and justified health/internal exemptions; account for stacked controls.
- Prefer verified user/tenant identity for authenticated traffic. Anonymous keys need trusted identifiers
  and endpoint scope. Account for proxies/shared networks; reject spoofable identity headers. Bound key
  length/cardinality/retention. Authenticate before user limits; reject before costly work/effects.
- Verify alternate routes cannot bypass enforcement. Process-local/browser counters do not establish
  distributed protection. Confirm geographic scope, consistency and concurrency. Exact global quotas
  or billing need a design beyond approximate abuse limiting.
- Combine limits with validation, authorization, request bounds and [anti-bot controls](public-forms.md).

## Responses and failures

Return documented application `429` [Problem Details](api-contracts.md#errors). Check edge/gateway
responses separately and document format differences. Include `Retry-After` only with a defensible policy;
keep client recovery bounded and mutation retries safe.

Choose limiter-unavailable behavior from endpoint risk/availability. Distinguish failure from exceeded
limits: avoid silent bypass or converting every failure to 429. Apply [safe logging](logging.md) without
credentials, raw identity keys or routine per-request logs.

## Verification

Exercise allowed, exceeded and unavailable paths at the enforcement boundary. Check identity, policy
isolation, exemptions, bypasses, concurrency, retry semantics and no effects after rejection. Use isolated
keys and [shared testing criteria](testing.md).

## Primary references

- [OWASP REST Security](https://cheatsheetseries.owasp.org/cheatsheets/REST_Security_Cheat_Sheet.html)
- [RFC 6585: 429](https://www.rfc-editor.org/rfc/rfc6585.html#section-4)
- [RFC 9110: Retry-After](https://www.rfc-editor.org/rfc/rfc9110.html#section-10.2.3)
