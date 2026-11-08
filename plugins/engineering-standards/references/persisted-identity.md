# Persisted identity compatibility

Use when serialization, canonicalization, fingerprints, signatures, parser projections or persistent
identifiers change. Inventory indirect consumers, stored format versions, receipts, reservations,
signed proofs and rollback readers before choosing the correction. Public API compatibility alone
does not establish compatibility with stored identity bytes.

## Representations and allowed equivalence

Identify the received representation, parser transformations, identity representation and the
equivalences the contract permits at each boundary. Business equivalence does not automatically grant
replay of an already recorded operation. Omission/null, equal instants with different spellings and
trimmed values may or may not share identity; derive that decision from the contract.

Check permitted equivalences and distinctions that must survive with independently constructed
expectations. Do not use only the production parser/normalizer to label expected identity. Key-order
changes can alter historical ASCII hashes; also challenge Unicode normalization and unusual inputs.

## Historical reads, writes and recovery

Exercise historical reads/replay, new writes, coexistence and rollback against representative frozen
old artifacts. Compare actual identity bytes/hashes and original receipt content, not only current
business results. Choose a bounded correction, explicit format version or migration from evidence;
do not require versioning for every implementation change. Never rewrite receipts/reservations or
invent historical request bytes to make verification pass.

If an old parser discarded information, a receipt may not authenticate the original request. Preserve
recovery/replay that retained evidence establishes, but reject or mark unprovable variants indeterminate
as the contract requires. Current state is not proof of past input. Report the exact missing evidence
and test the limitation alongside successful replay; do not promise universal historical compatibility.

## Coexisting-version interleavings

When old/new producers can overlap, exercise controlled interleavings at the actual persistence
boundary. Include a new request paused before commit, another version inserting its historical
receipt, subsequent work advancing, and the first request resuming. Assert original receipt replay,
current-state reads and a new operation on that work separately. Inspect effect counts and reservation
identity; never return current state as a substitute for a historical result. Promise concurrency alone
does not establish commit order. Use owned disposable storage and retain the controlled schedule.
