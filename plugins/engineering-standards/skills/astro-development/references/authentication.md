# Authentication integration

Apply the [shared authentication policy](../../../references/authentication.md) only to requested or
existing sessions. Verify middleware and endpoint behavior on the chosen on-demand adapter. Static
output cannot enforce per-user server authorization: use the selected API or on-demand boundary and
never prerender private session data. Keep island code limited to its browser responsibilities.
