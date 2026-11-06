# Resource budgets and representative performance

Apply to costly reads, scans, transformations, fan-out, background jobs and changed capacity guards.
Reuse existing budgets for small edits; do not require a benchmark suite for every endpoint. Record
the target/runtime, expected workload, acceptance threshold and evidence behind each important limit.

## Admission and bounded work

Separate provider limits from application budgets. Distinguish per-query/page, per-record, per-request,
whole-operation, tenant and global limits. Bound relevant input/output bytes, retained state, rows,
CPU, wall time, subrequests, concurrency and retry attempts. A response page size does not prove that
the work before pagination is bounded. Streaming bounds retained memory only if reducers/caches and
per-record processing are also bounded; it does not by itself bound CPU or total scanned bytes.

Name units and where each guard is enforced. Serialized UTF-8 size, SQL-side estimates, JavaScript
heap, process RSS, CPU and wall time are different measures. Validate limits before expensive work
where possible, and observe started/completed/omitted work through [operational signals](operation-observability.md).
Return stable safe capacity reasons/counters instead of arbitrary source content. Test exact bounds,
one-over cases, large individual records and partially completed work.

Do not remove evidence, authorization, consistency checks or bounds merely to make a failing request
pass. Diagnose the actual guard before raising it. If the required workload cannot fit, consider
coherent streaming, indexed reads, durable partitioned work or a changed contract based on measured
constraints. Preserve revision/snapshot semantics and [coverage completeness](persistence.md#coverage-and-complete-scans).
Do not cache live authorization or share request-dependent state as a performance shortcut.

## Representative fixtures

Choose cases from real access patterns using synthetic or appropriately sanitized data. Cover volume
and composition independently: record-size distribution, distinct versus repeated values, Unicode,
long prose, nested content, URL/normalization work, archived evidence, fan-out and branch-specific
inputs when relevant. Repeating one cheap character to reach many bytes is a byte-capacity exercise,
not proof that a high-cardinality textual workload fits CPU. Include empty/small, normal, near-limit,
rejected and recovery cases for the affected operation.

Inspect query plans, rows scanned/returned and binding/statement counts where available. Check work
amplification and repeated transformations before changing service boundaries or infrastructure.
Optimizations need equal results, authorization, full required evidence, ordering, revisions, receipts
and other applicable semantics; lower latency alone is insufficient.

## Measurement and adoption

Record source/fixture hashes or revisions, runtime/dependency versions, environment, clocks, setup
exclusions, warm/cold behavior, sample count and raw results. Compare baseline/candidate on the same
workload and preserve semantic equivalence. Measure observer overhead separately. Keep nested and
parallel phases separate; use the [measurement contract](operation-observability.md#measurement-meaning-and-coverage).

Small deterministic regression fixtures belong in normal checks. Large stress/benchmark runs may be
opt-in with explicit targets and cleanup. Avoid arbitrary timing assertions on noisy shared CI;
use stable work/count assertions when they prove the requirement, and a dedicated environment for
agreed latency/CPU gates. Report failures and variance; a few local samples do not establish p95,
provider CPU compliance, production attribution, savings or an SLA. Validate the compiled target and
runtime-specific resource behavior before making those claims.
