# Authentication integration

Use the [shared authentication policy](../../../references/authentication.md) when session work is
in scope. Verify hashing, JWT, cookie, and database libraries on the selected Bun version. Use atomic
refresh consumption in the actual database; in-memory tests alone do not establish concurrent safety.
Test the real Bun/Hono middleware chain with the deployed origins and cookie settings.
