# Dates and Time

Choose the semantic type before selecting validation or storage. Do not silently use the host timezone.

| Meaning                        | Contract and handling                                                                                |
| ------------------------------ | ---------------------------------------------------------------------------------------------------- |
| Instant, such as creation time | Require an RFC 3339 timestamp with explicit `Z` or numeric offset; normalize output to UTC `Z`.      |
| Civil date, such as a birthday | Validate a real calendar date in `YYYY-MM-DD`; do not shift it through UTC.                          |
| Recurring local time           | Preserve local time and an IANA timezone, for example `America/Lima`; define DST ambiguity behavior. |
| Duration                       | Use a documented unit and range, separate from an instant or local time.                             |

Reject impossible dates and ambiguous timezone-less instants. Document precision and inclusive/exclusive
range boundaries. Prefer server time for authoritative audit fields and inject the clock into tests.
Use timezone-aware storage appropriate to the database; PostgreSQL `timestamptz` represents an instant
but does not preserve the original zone name, so store that separately when recurrence requires it.

Format for the user's locale/timezone only at presentation boundaries. Centralize conversion helpers
when they are reused. Test offset normalization, leap dates, relevant DST transitions, and date-only
round trips for the features that depend on them. Do not install scheduling infrastructure for ordinary
timestamp fields.

## Primary references

- [RFC 3339](https://www.rfc-editor.org/rfc/rfc3339.html)
- [PostgreSQL date/time types](https://www.postgresql.org/docs/current/datatype-datetime.html)
