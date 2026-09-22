# React/Vite browser security

For trust boundaries, permission checks, or sensitive data, apply the
[common security policy](../../../references/security.md). This guide adds browser/build integration
details; use [authentication](authentication.md) for sessions and [files](files.md) for uploads.

Treat Vite public environment variables as build-time public configuration. Check the generated bundle,
source maps, and browser diagnostics when changing environment exposure; a server-only variable must
not become public through a client import or build substitution.

React escapes text values; preserve that boundary and isolate any required sanitized rich HTML at the
rendering component. Validate navigation destinations derived from route/search parameters before
passing them to browser navigation APIs. Router guards control navigation; test server denials through
the API client and remove stale private UI/cache state when a session expires.

Configure CSP and other response headers in the actual static host or server. Vite's development server
configuration does not establish production headers; verify a production build served by that host,
including required assets and direct navigation to client routes.
