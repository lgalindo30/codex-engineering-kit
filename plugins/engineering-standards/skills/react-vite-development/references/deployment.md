# React/Vite deployment

Apply [shared deployment controls](../../../references/deployment.md). Deploy the generated assets
with the selected static host, excluding secrets and private configuration. A container is optional;
when selected, apply [Docker controls](../../../references/docker-deployment.md) with a maintained
static server and the actual built assets.
Do not treat Vite's development server as the production API or assume its proxy exists in production.

Verify the public base path, hashed assets and cache policy, deep-link fallback, refresh/navigation,
API origin, and allowed cross-origin behavior. Keep non-secret public configuration intentional; browser
variables are visible to users. Match security headers to the actual application and hosting platform.

Test production-like output and critical journeys with disposable services. Report which build and
serving checks ran, with missing prerequisites explicit. Document deployment/rollback and configuration
steps without provisioning remote resources or publishing unless authorized.
