# Manual Tracking Implementation Report

## Implementation summary

The daily response page now supports per-task **Complete** and **Not Complete** decisions. An authenticated backend endpoint validates the task ID and boolean state, scopes the task to the current user and date, recalculates the daily aggregate, persists it transactionally, and returns the updated task and marks.

The original Gemini/Vision scoring service and image submission endpoint remain present. The manual workflow is daily-only; monthly and yearly review pages retain their existing AI image flow.

## Final scoring analysis

`server/services/goalVerification.js` assigns each AI-reviewed goal 100 or 0 and returns the rounded average from 0 to 100. `setUserDailyScore()` divides this aggregate by 10 before storage. The Score history endpoints multiply `Avg` by 10 for charts, and progress calculations use the stored 0–10 value as a percentage fraction. `Score.Avg` therefore represents a normalized **daily aggregate**, not an individual task mark.

Manual scoring uses the same rule: each complete task contributes 100, each incomplete task contributes 0, and the rounded mean is returned as `marks` (0–100) and stored as `Avg=marks/10` (0–10). The score readers choose the row with the highest `Score.ID` for each user/day so legacy duplicate rows do not overcount dashboard date series.

## API changes

- `GET /send-goals` now returns each daily task's `ID`, text, completion/submission state, plus the current marks calculated from those states.
- New authenticated endpoint: `PUT /daily-goals/:taskId/completion` with JSON `{ "isComplete": true | false }`.
- Success returns `message`, the updated `task`, `marks`, `average`, and per-task marks. Invalid input returns 400; a task outside the authenticated user's current-day scope returns 404; an already AI-submitted day returns 409; nontransactional table engines return 503 without writing.

## Database operations and duplicate protection

- Task updates include all of `ID`, authenticated `User_ID`, and `DateOfDay=CURRENT_DATE` in the predicate. New daily goals start incomplete.
- Manual task/status and score writes run in one transaction. The implementation checks that `userAccount`, `daily_goals`, and `Score` use InnoDB, locks the authenticated account row to serialize updates for that user, then updates task state and recalculates the daily score.
- When a same-day Score row exists, the latest row by `ID` is updated; no additional row is inserted. Older duplicate rows are preserved. When none exists, one daily aggregate row is inserted.
- The existing AI scoring algorithm is unchanged. Its daily persistence now uses the same transactional latest-row update/insert behavior, retaining `Is_Submit` finalization.
- Weekly, monthly, yearly, yesterday, and recent-score readers select the latest row per date. No unique constraint or migration was added.
- The previously attempted live duplicate-count query still cannot run because TLS verification fails. Existing duplicate counts are therefore unknown; no records were read or modified. The latest-row policy is non-destructive and handles existing duplicates in the Score-based date-series consumers.

## Frontend changes

`DailyResponse.js` removes daily image upload/EXIF handling and the old final submit flow. It displays Complete / Not Complete buttons, task state, per-task marks, total completed tasks, a progress bar, and backend-returned daily marks. Requests include the JWT and the task ID. The controls retain native button semantics, expose their selected state, and have 44px minimum height for touch use.

## Files modified or created

- Modified `client/src/pages/Goals/Daily/DailyResponse.js`
- Modified `client/src/styles/Response.css`
- Created `client/src/pages/Goals/Daily/DailyResponse.test.js`
- Modified `server/controller/controller.js`
- Modified `server/model/db.js`
- Modified `server/router/routes.js`
- Created `server/model/manualTaskRepository.js`
- Created `server/model/manualTaskRepository.test.js`
- Existing `server/services/manualScoring.js` and its test are used unchanged.
- Updated `MANUAL_TRACKING_IMPLEMENTATION_REPORT.md`

## Tests and build

- Backend command: `cd server; node --test services/manualScoring.test.js model/manualTaskRepository.test.js` — **13 passed, 0 failed**. Coverage includes complete/incomplete scoring, multiple tasks, repeated requests, cross-user task access, legacy duplicate Score rows, submitted-day rejection, and refusal to write if a required table is not transactional.
- Frontend command: `cd client; npm test -- --watchAll=false --runInBand --runTestsByPath src/pages/Goals/Daily/DailyResponse.test.js` — **2 passed, 0 failed**. Both button decisions, request payloads, returned marks, and rendered task state are covered.
- `node --check` passed for the modified server controller, database model, repository, and router.
- `git diff --check` passed; it reported only repository line-ending conversion warnings.
- `npm run build` cannot run as written in Windows because the existing script prefixes the command with Unix-style `CI=false`. The equivalent `npm exec -- react-scripts build` completed successfully with existing lint and outdated-browser-data warnings elsewhere in the project.
- Database integration tests were not run: the configured DB connection fails TLS verification. TLS verification was not disabled.

## Progress and dashboard behavior

Weekly, monthly, yearly daily-score charts and the recent-score report consume `Score`; those readers now return one latest aggregate per date. Daily task counts continue to read `daily_goals.Is_Complete` through `/taskInfo`.

The separate blended monthly/yearly progress service also reads `Monthly_progress`, `Monthly_Score`, and `Yearly_Score`; those tables and their update path were not changed. The repository has no application-side writer for `Monthly_progress`, so propagation from Score may be database-managed. That trigger/process could not be inspected due the TLS failure and remains a limitation to verify against the deployed database.

## Running the project

- Backend: from `server/`, run `node server.js` with the existing trusted database CA configuration and environment variables.
- Frontend: from `client/`, run `npm start` with `REACT_APP_API_URL` configured for the backend.
- Focused tests: use the backend and frontend commands listed above.

## Migration and limitations

- No database migration is required for the implementation as written; it uses the confirmed `daily_goals.ID` and existing `Score.ID` fields and does not add a unique constraint.
- Duplicate Score records already in the database were not counted because TLS inspection failed. Existing rows are left intact; score history readers use the highest ID per date.
- Live database writes and real multi-account/dashboard integration were not verified. Automated repository tests use a transactional fake connection; the runtime engine check prevents writes if the deployment tables are not InnoDB.
- The blended monthly/yearly progress propagation through `Monthly_progress` remains unverified.
- `main` was not checked out or changed. No merge, push, or commit was made.

### Modern Web Guidance

- **`accessibility`**: I used native buttons with visible action text and `aria-pressed` for each completion state, avoiding custom keyboard behavior (“Prefer HTML elements and attributes to ARIA”).
- **`form-factor-adaptation`**: I set a 44px minimum button height and let the actions wrap on narrow layouts (“at least 44×44 on touch screens”).
