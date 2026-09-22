# Local File Handling

Apply only to features that receive, store, or serve files. Start with local storage; remote providers
are a separate requested integration. Put filesystem access behind a small boundary so storage can
change without rewriting business logic. Keep container persistence in [deployment](deployment.md).

## Limits and admission

Default to a maximum of **10,000,000 bytes per file** unless the task explicitly specifies otherwise.
Choose lower feature-specific limits when appropriate and document explicit overrides. Set separate
limits for file count, total request bytes including multipart overhead, text fields, and processing
resources. Expose the public limits to frontend validation without trusting the frontend to enforce them.

Reject missing/non-file fields. Allowlist accepted types and verify actual content using maintained
parsers/signature detection appropriate to those types. A client-provided MIME or filename extension
is not proof. Reject unsupported or inconsistent content; account for archive expansion and image
pixel limits only when those formats are part of the feature.

Enforce the total request limit before body buffering/parsing and per-file limits during streaming.
Content-Length is an early optimization, not the sole control: test missing/false length and chunked
input. Verify the selected runtime/framework/proxy layers actually stop oversized streams. If the multipart
parser buffers, configure a strict upstream runtime body ceiling and account for concurrent memory use;
do not claim per-file streaming protection that the parser does not provide. Clean partial files on
failure or cancellation. Return the documented 413 Problem Details response.

## Storage and retrieval

Generate storage names independently of submitted filenames. Keep the original name as sanitized
metadata only. Prevent traversal and symlink escapes; store outside the public webroot and executable
paths. Write safely without overwriting another user's content. Bound disk usage and define cleanup.

Protect retrieval according to the feature's ownership/access rules. Serve safe content types and
content-disposition deliberately; do not execute uploaded content or allow active untrusted content to
run under the application's origin. Add malware scanning only when warranted by the accepted content
and risk, not as unused infrastructure.

## Verification

Exercise the exact size boundary and one byte over, total request limits, multiple files, disguised or
malformed content, absent content length, unsafe names, interrupted uploads, and access denial where
applicable. Check that failure leaves no persistent partial file. Validate the browser's useful error
message as well as the server's rejection.

## Primary references

- [OWASP File Upload](https://cheatsheetseries.owasp.org/cheatsheets/File_Upload_Cheat_Sheet.html)
