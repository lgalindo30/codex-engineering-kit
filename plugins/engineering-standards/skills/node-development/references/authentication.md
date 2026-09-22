# Authentication integration

Use the [shared authentication policy](../../../references/authentication.md) when session work is
in scope. Use maintained libraries compatible with the selected Node release and framework. Keep
session operations testable separately from listener startup and verify their real middleware ordering,
proxy trust, database atomicity, and browser origin/cookie behavior.
