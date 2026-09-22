# File contracts

For APIs that receive or serve files, apply the [common file policy](../../../references/files.md)
for default limits, content validation, storage, access, and enforcement tests. Expose the producer's
actual per-file, file-count, and total-request limits, accepted content, and error responses in the
public contract. Keep consumer validation and rejection handling aligned with that contract.

Version incompatible limit/type changes deliberately. Define safe retrieval content types, disposition,
ownership, and access behavior as part of the response contract. Verify documented rejection statuses
and error bodies against the producer's boundary tests; consumer fixtures and generated types alone
do not establish server enforcement.
