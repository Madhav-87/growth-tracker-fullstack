# Monthly Progress Integration Report

## Result

The live database objects could not be inspected. The metadata-only connection attempt failed during TLS verification with `HANDSHAKE_SSL_ERROR`. TLS verification was not disabled. No database records were queried or changed, and no application code was modified.

The repository scan found no checked-in trigger, procedure, or event definitions. Application source alone cannot establish whether `Score` automatically propagates to `Monthly_progress`; that behavior may be implemented by live database objects or an external process.

## Application code findings

- `server/model/db.js:getMonthlyProgressScores()` reads `Avg` from `Monthly_progress` for the authenticated user over a date window around the current date.
- `server/model/db.js:getYearlyProgressScores()` also reads `Avg` from `Monthly_progress`, for the previous year’s range. This is a daily input to yearly progress, despite the table name.
- No application-side `INSERT`, `UPDATE`, or `DELETE` of `Monthly_progress` was found.
- `server/services/progressService.js:getMonthlyProgress()` uses the monthly progress rows only when exactly one row is returned, multiplies its `Avg` by 10, then combines it with prior `Monthly_Score` averages.
- `getYearlyProgress()` aggregates `Monthly_progress` rows and combines them with `Monthly_Score` and `Yearly_Score` averages.
- Daily AI and manual marking write daily aggregate values to `Score`; the monthly and yearly review flows write their own aggregates to `Monthly_Score` and `Yearly_Score`. No application code connects a daily `Score` write to a `Monthly_progress` write.

## Conclusion

**Whether updating `Score` automatically updates monthly or yearly progress is unconfirmed.** If a trigger or scheduled event maintains `Monthly_progress`, its behavior depends on whether it handles `INSERT`, `UPDATE`, or both. The manual workflow updates an existing same-day `Score` row after its first write, so an insert-only trigger would not refresh the monthly progress value on later task changes. The database definitions below are needed to determine the actual behavior.

## Read-only SQL to run

Run these in a trusted MySQL session using the target database as the current schema. They inspect metadata only and return no user task or score records.

### `Monthly_progress` table structure and engine

```sql
SHOW CREATE TABLE Monthly_progress\G
SHOW INDEX FROM Monthly_progress;

SELECT TABLE_NAME, ENGINE
FROM information_schema.TABLES
WHERE TABLE_SCHEMA = DATABASE()
  AND TABLE_NAME IN ('Score', 'daily_goals', 'Monthly_progress');
```

### Triggers for the relevant tables

```sql
SELECT TRIGGER_NAME,
       EVENT_OBJECT_TABLE,
       ACTION_TIMING,
       EVENT_MANIPULATION,
       ACTION_STATEMENT
FROM information_schema.TRIGGERS
WHERE TRIGGER_SCHEMA = DATABASE()
  AND EVENT_OBJECT_TABLE IN ('Score', 'daily_goals', 'Monthly_progress')
ORDER BY EVENT_OBJECT_TABLE, TRIGGER_NAME;
```

This exposes trigger timing and body, which shows whether `INSERT` and/or `UPDATE` on `Score` propagates into `Monthly_progress`. If a trigger body calls a stored routine, inspect that routine as well.

### Stored procedures and functions

```sql
SELECT ROUTINE_TYPE,
       ROUTINE_NAME,
       ROUTINE_DEFINITION
FROM information_schema.ROUTINES
WHERE ROUTINE_SCHEMA = DATABASE()
  AND ROUTINE_TYPE IN ('PROCEDURE', 'FUNCTION')
  AND (
       LOWER(ROUTINE_DEFINITION) LIKE '%score%'
    OR LOWER(ROUTINE_DEFINITION) LIKE '%daily_goals%'
    OR LOWER(ROUTINE_DEFINITION) LIKE '%monthly_progress%'
  )
ORDER BY ROUTINE_TYPE, ROUTINE_NAME;
```

If the server returns a `NULL` definition due to metadata privileges, run `SHOW CREATE PROCEDURE procedure_name\G` (or `SHOW CREATE FUNCTION function_name\G`) for each relevant routine name returned by `information_schema.ROUTINES`.

### Scheduled events

```sql
SELECT EVENT_NAME,
       STATUS,
       EVENT_DEFINITION,
       INTERVAL_VALUE,
       INTERVAL_FIELD,
       EXECUTE_AT,
       STARTS,
       ENDS,
       LAST_EXECUTED
FROM information_schema.EVENTS
WHERE EVENT_SCHEMA = DATABASE()
ORDER BY EVENT_NAME;
```

Review event definitions for direct table writes and calls to procedures/functions. To inspect one event’s full definition, use `SHOW CREATE EVENT event_name\G`.

## Safety

Only the earlier authorized metadata queries were attempted. No DML, DDL, trigger, routine, or event changes were made. No credentials or sensitive user records were exposed.
