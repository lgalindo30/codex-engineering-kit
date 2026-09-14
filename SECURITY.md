# Security Policy

Do not publish credentials, private configuration, personal data, or a working exploit against a live
third-party system in an issue. Use GitHub private vulnerability reporting when enabled; otherwise
request a private reporting channel without disclosing exploit details publicly.

The installer modifies local Codex instructions and role configuration, which can affect future agent
behavior. Review these sources before installation. Dry-run is read-only; replacement is explicit and
backed up. Backups may contain secrets from existing config and are never repository artifacts.

The plugin contains instructions and local scripts. It has no MCP server, account credentials, analytics,
or automatic external telemetry. Dependency installation and audits contact package registries; plugin
management is performed by Codex. App integrations described in references require a scoped task.

Relevant OWASP controls are referenced in [security guidance](plugins/engineering-standards/references/security.md).
Instructions and scanners do not replace application-specific threat analysis and behavioral testing.

Report compatibility failures with redacted versions, commands, and reproducible steps. Never attach
your complete Codex config, local installation state, token cookies, or environment file.
