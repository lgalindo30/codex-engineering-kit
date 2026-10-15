# Dates and Time

Choose the semantic type before validation/storage; never silently use the host timezone.

| Meaning              | Contract                                                 |
| -------------------- | -------------------------------------------------------- |
| Instant              | RFC 3339 with `Z`/offset; normalize output to UTC `Z`    |
| Civil date           | Real `YYYY-MM-DD` calendar date; no UTC shifting         |
| Recurring local time | Local time plus IANA zone; define DST ambiguity behavior |
| Duration             | Documented unit/range, separate from instant/local time  |

Reject impossible dates and timezone-less instants. Define precision and inclusive/exclusive bounds.
Use server time for authoritative audit fields and inject test clocks. PostgreSQL `timestamptz` stores
an instant, so retain the zone separately for recurrence. Format locale/timezone at presentation boundaries.

Test applicable offsets, leap dates, DST transitions and date-only round trips using [shared criteria](testing.md).

## Primary references

- [RFC 3339](https://www.rfc-editor.org/rfc/rfc3339.html)
- [PostgreSQL date/time](https://www.postgresql.org/docs/current/datatype-datetime.html)
