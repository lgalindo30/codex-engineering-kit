# Bun testing

Apply the [shared testing policy](../../../references/testing.md).

Use Bun Test for new Bun backend code, preserving a suitable existing suite. Its Jest-style API does
not require Jest. Execute on the selected Bun version and type-check separately.

- Exercise Hono handlers with request helpers for contracts and error behavior. Use a real Bun listener
  for changed streaming limits, adapter behavior, connections, or graceful shutdown.
- Verify database constraints, transactions, concurrency, and migrations against the actual engine
  and Bun driver. SQLite does not establish PostgreSQL-specific semantics.
- Test public serialized responses and affected consumers. A mocked journey cannot establish backend
  integration. Execute relevant tests on Node too when the package promises Node compatibility.
- Exercise changed production startup, persistence, and selected container paths. Replace the quality
  scaffold's deliberately failing test placeholder with meaningful coverage, never unconditional success.

Source: [Bun tests](https://bun.com/docs/test).
