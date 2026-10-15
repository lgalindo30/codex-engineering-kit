# File Handling

Use for receiving, storing or serving files. Follow selected storage; when none exists, recommend a
deployment-compatible option and record pending setup. Keep provider/filesystem access behind a small
boundary. Local uploads require persistent writable storage; ephemeral filesystems are temporary.
See [container persistence](docker-deployment.md#local-operation-and-persistent-data) when applicable.

## Limits and admission

- Default to **10,000,000 bytes per file** unless explicitly overridden; lower feature limits are valid.
  Separately bound file count, total request/multipart bytes, text fields and processing resources.
  Expose public limits to the client; enforce them server-side.
- Reject missing/non-file fields. Allowlist types and verify actual content using maintained parsers or
  signature detection. MIME/extension alone is insufficient. Bound archive expansion/image pixels for
  accepted formats.
- Bound total bytes before buffering/parsing and file bytes during streaming. Content-Length is only
  an early check. If parsing buffers, use a strict upstream body ceiling and budget concurrent memory.
  Clean partial files after failure/cancellation and return documented 413 Problem Details.

## Storage and retrieval

Generate independent storage keys; retain sanitized submitted names as metadata. Prevent traversal,
symlink escapes and cross-user overwrites. Keep filesystem uploads outside public/executable paths;
apply object bucket/key boundaries and access policy. Bound storage use and clean incomplete uploads.

Authorize retrieval, set safe content type/disposition and prevent uploaded active content executing
under the application origin. Add malware scanning when the accepted content/risk warrants it.

## Verification

Exercise exact limits/one byte over, multipart totals, multiple files, malformed/disguised content,
missing/false Content-Length and chunked input, unsafe names, interrupted uploads and denied retrieval.
Verify actual runtime/proxy stream rejection, cleanup and useful browser errors. Apply [shared criteria](testing.md).

## Primary references

- [OWASP File Upload](https://cheatsheetseries.owasp.org/cheatsheets/File_Upload_Cheat_Sheet.html)
