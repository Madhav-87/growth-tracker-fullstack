# Daily Goals Schema Inspection Report

## Result

The exact live `CREATE TABLE` definition could not be retrieved. The configured MySQL connection failed during TLS negotiation with `HANDSHAKE_SSL_ERROR`, before any metadata query ran. The application config expects a base64 CA value (`CA`), but the local `server/config/.env` does not define that setting. Retrying with the local certificate files did not complete TLS verification. Certificate verification was not disabled.

Only read-only `information_schema` and `SHOW CREATE TABLE` queries were attempted. No table data query or write statement was run. Credential values and user records were not displayed. No application files or Git state were modified.

## What the repository establishes

The repository has no checked-in SQL DDL or migration for `daily_goals`. In `server/model/db.js`:

- `dailyGoalsSubmit()` inserts `User_ID`, `Goal_text`, and `Is_Complete`; it does not name a task ID column.
- `dailyRetrive()` selects only `Goal_text`, scoped to `User_ID` and `DateOfDay=CURRENT_DATE`.
- `SubmitResponse()` updates all of the user’s current-day rows and inserts an aggregate `Score` row. The score update/insert is not transactional or idempotent in the existing code.
- `taskInfo()` selects `Is_Submit` and `Is_Complete` for the user's previous-day rows.

Thus, the application code confirms these fields are used: `daily_goals.User_ID`, `Goal_text`, `DateOfDay`, `Is_Complete`, and `Is_Submit`. It does **not** establish the primary key, actual column types/defaults, auto-increment, unique constraints, foreign keys, or indexes. Those details remain unknown. Related `Score` constraints also remain unverified.

## Safe identification and update plan

Do not identify a task by `Goal_text` alone: two rows for one account/date could have the same text, causing an update to affect multiple tasks. Once the actual DDL confirms a primary key, return that key from the daily-goals query and update with both the key and authenticated owner, plus the eligible date/submission scope, for example:

```sql
UPDATE daily_goals
SET Is_Complete = ?
WHERE <confirmed_primary_key> = ?
  AND User_ID = ?
  AND DateOfDay = CURRENT_DATE
  AND Is_Submit = 0;
```

Use a transaction for task status and aggregate score changes. Derive marks server-side from current task states (complete = 100, incomplete = 0, average across that day’s tasks; store the average divided by 10 in `Score.Avg` to preserve the existing 0–10 storage convention). Make retries idempotent by recalculating/updating the single existing user/day score rather than inserting another row. Before relying on an upsert or unique index, inspect existing `Score` DDL and data cardinality; do not add a constraint or migration until duplicate historical rows and deployed schema are understood. Locking the parent account row or another verified stable row within the transaction can serialize concurrent score recalculations if no user/day unique key exists.

## Needed to complete inspection

Provide a valid, trusted CA configuration for the existing read-only database connection (or the sanitized output of `SHOW CREATE TABLE daily_goals` and relevant `Score` table DDL). After schema confirmation, the task primary key, indexes, relationships, and duplicate-safe write strategy can be finalized. No implementation has started pending this schema confirmation.
