# Security Policy

Do not publish credentials, private configuration, personal data, or a working exploit against a live
third-party system in an issue. Use GitHub private vulnerability reporting when enabled; otherwise
request a private reporting channel without disclosing exploit details publicly.

Review plugin instructions and executable assets before installation. Plugin setup supports a
read-only preview and refuses a marketplace registered to a different checkout. Project scaffolding
refuses conflicting files; adopt changes deliberately rather than overwriting local configuration.

The plugin contains instructions and local scripts. It has no MCP server, account credentials, analytics,
or automatic external telemetry. Dependency installation and audits contact package registries; plugin
management is performed by Codex. App integrations described in references require a scoped task.

Relevant OWASP controls live in the [common security policy](plugins/engineering-standards/references/security.md) and stack-specific guidance such as
[browser security](plugins/engineering-standards/skills/react-vite-development/references/security.md).
Instructions and scanners do not replace application-specific threat analysis and behavioral testing.

Report compatibility failures with redacted versions, commands, and reproducible steps. Never attach
your complete Codex config, token cookies, or environment file.
