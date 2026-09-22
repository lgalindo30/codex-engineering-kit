# Browser file handling

For upload or retrieval features, apply the browser responsibilities in the
[common file policy](../../../references/files.md). Use the server's documented limits and accepted
content in selection feedback; preserve an established producer contract rather than applying new
feature defaults to it.

Handle selection, progress, cancellation, rejection, and retry without accidental duplicate uploads.
Show useful errors for 413, unsupported types, and expired/unauthorized access. Render file names as
text and revoke preview object URLs when replaced or unmounted. Keep upload results and retrieval
URLs in the appropriate query/session cache; invalidate affected queries after successful mutations
and clear private previews on session changes.

Exercise selection feedback, preview cleanup, cancellation, retry, and actual server rejection handling
with small local fixtures. Coordinate changes to accepted content and retrieval permissions with the
API owner. Do not upload private user files or send test data to production.
