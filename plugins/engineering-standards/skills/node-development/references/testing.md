# Node.js testing

Apply the [shared testing policy](../../../references/testing.md).

Preserve the runner; Node's test runner or Vitest are new-project options. Configure TypeScript
execution explicitly and type-check separately. Run runtime-sensitive tests on Node itself.

- Test handlers through the application boundary, including malformed JSON, content types, limits,
  authorization, and serialized errors. Use a real listener/adapter for changed transport, streaming,
  shutdown, or connection behavior; request helpers cannot establish these.
- Use the real database engine for constraints, transactions, concurrency, queries, and migrations.
  Verify native drivers and production startup on Node; test representative existing migration data.
- Verify changed public responses and consumers; generated client compilation is insufficient.
- Exercise the production entrypoint and, when selected, the built container for changed startup paths.

Source: [Node test runner](https://nodejs.org/api/test.html).
