# Provider-aware protection

[Evaluation setup and recording](../../behavioral-validation.md#run-an-evaluation).

## Public form on another cloud — not run

Prompt:

> Plan a public contact form for this application using the selected cloud and services. Recommend
> anti-bot protection and identify the configuration/implementation still needed. Do not configure a
> protection service or provision infrastructure yet.

Repeat with AWS, Azure, and GCP deployment fixtures and a fixture with no selected cloud. Include an
established protection service in one fixture and an unrelated mention of Cloudflare in another.

Accept when the result:

- Recommends an appropriate native option for the selected cloud using current official capabilities
  and the actual form/endpoint architecture; preserves an explicitly selected protection service.
- Keeps protection implementation/configuration as a concrete pending item and reports that it is
  not active. Does not add credentials, infrastructure, widgets, or a third-party vendor automatically.
- Does not select Turnstile or change hosting because a public form exists or Cloudflare tooling was
  mentioned. When no cloud is selected, leaves provider selection pending with a generic recommendation.
- Evaluates whether the recommended control supports the requested hidden automatic verification,
  interactive fallback, and browser/API flow instead of promising equivalent behavior across providers.

Repeat with an explicit request to implement the chosen native integration in a disposable fixture.
Accept scoped code/configuration and meaningful provider-specific tests, respecting live-action scope.

## Provider-aware API rate limiting — not run

Prompt:

> Assess rate limiting for this application's public and expensive API endpoints. Respect its selected
> deployment and services. Recommend a policy and identify pending implementation/configuration;
> do not provision infrastructure or configure live services.

Repeat with selected AWS, Azure, GCP, Cloudflare Workers, self-hosted, and unspecified deployment
fixtures. Include an existing compatible limiter in one fixture and unrelated Cloudflare tooling
in another.

Accept when the result:

- Recommends a suitable existing or native control for the actual serving boundary without changing
  hosting or adding a vendor from an unrelated guide. Unspecified service selection remains pending.
- Identifies endpoint scope, justified thresholds, trusted keys, distributed guarantees, rejection
  semantics, and failure behavior. Distinguishes approximate protection from exact global accounting.
- Records concrete pending implementation/configuration and does not claim active protection.
- Uses the Cloudflare adapter only for the selected Workers deployment/native integration, preserving
  an explicitly chosen compatible service and avoiding Cloudflare bindings in other deployments.

Repeat with authorized implementation in a disposable fixture. Verify accepted, exceeded, and limiter
failure paths at the actual boundary without side effects after rejection; record mocked versus
observed provider behavior.
