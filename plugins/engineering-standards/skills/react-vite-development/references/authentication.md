# Authentication integration

Apply the browser responsibilities in the [shared authentication policy](../../../references/authentication.md).
The selected server or identity provider owns credential verification and the session lifecycle;
client route guards only control navigation. Follow its supported client integration without replacing
the chosen session design. Integrate session transitions with the query cache: clear
private cached data on logout/session loss and prevent stale requests from repopulating another user's
view. Coordinate refresh across concurrent API failures when the client owns that mechanism, and test
applicable origin/cookie behavior.
