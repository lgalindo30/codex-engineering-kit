# Authentication integration

Apply the browser responsibilities in the [shared authentication policy](../../../references/authentication.md).
The server owns password hashing, token validation, session rotation, revocation, and authorization;
client route guards only control navigation. Integrate session transitions with the query cache: clear
private cached data on logout/session loss and prevent stale requests from repopulating another user's
view. Coordinate refresh across concurrent API failures and test actual origin/cookie behavior.
