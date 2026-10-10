# Authentication integration

Use the [shared authentication policy](../../../references/authentication.md) when session work is
in scope. Verify the chosen provider/session integration and applicable hashing, token, cookie, and
database libraries on the selected Bun version. For application-owned rotating refresh sessions, use
atomic consumption in the actual database; in-memory tests alone do not establish concurrent safety.
Test the actual middleware chain and applicable origin/cookie behavior without adding another session flow.
