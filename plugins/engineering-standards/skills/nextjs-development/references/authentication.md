# Authentication integration

Apply the [shared authentication policy](../../../references/authentication.md) to the selected session
design. Authorize Route Handlers and server mutations at their entrypoints; client navigation guards
are not authorization. Keep authentication logic server-side and prevent private data from leaking
through cached rendering or client props. Verify the selected server/edge runtime supports the library;
a supported integrated session does not require creating a separate Bearer-token service.
