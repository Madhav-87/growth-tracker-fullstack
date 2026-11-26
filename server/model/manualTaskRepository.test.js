const test = require('node:test');
const assert = require('node:assert/strict');
const { createManualTaskRepository } = require('./manualTaskRepository');
const { calculateManualScore } = require('../services/manualScoring');

function makeRepository({ tasks, scores = [], engines } = {}) {
    const state = {
        tasks: tasks || [],
        scores,
        engines: engines || [
            { TABLE_NAME: 'userAccount', ENGINE: 'InnoDB' },
            { TABLE_NAME: 'daily_goals', ENGINE: 'InnoDB' },
            { TABLE_NAME: 'Score', ENGINE: 'InnoDB' }
        ],
        nextScoreId: Math.max(0, ...scores.map((score) => score.ID)) + 1,
        writes: 0,
        committed: false,
        rolledBack: false
    };

    const connection = {
        async beginTransaction() {},
        async commit() { state.committed = true; },
        async rollback() { state.rolledBack = true; },
        release() {},
        async query(sql, params = []) {
            const query = sql.replace(/\s+/g, ' ').trim().toLowerCase();
            if (query.includes('information_schema.tables')) return [state.engines];
            if (query.startsWith('select id from useraccount')) {
                return [[{ ID: params[0] }]];
            }
            if (query.startsWith('select id, goal_text, is_complete, is_submit from daily_goals')) {
                const task = state.tasks.find((item) => item.ID === params[0] && item.User_ID === params[1]);
                return [task ? [{ ...task }] : []];
            }
            if (query.startsWith('update daily_goals')) {
                state.writes++;
                const task = state.tasks.find((item) => item.ID === params[1] && item.User_ID === params[2]);
                if (task && Number(task.Is_Submit) !== 1) task.Is_Complete = params[0];
                return [{ affectedRows: task ? 1 : 0 }];
            }
            if (query.startsWith('select is_complete from daily_goals')) {
                return [state.tasks.filter((task) => task.User_ID === params[0]).map(({ Is_Complete }) => ({ Is_Complete }))];
            }
            if (query.startsWith('select id from score')) {
                return [state.scores
                    .filter((score) => score.User_ID === params[0])
                    .sort((left, right) => right.ID - left.ID)
                    .slice(0, 1)
                    .map(({ ID }) => ({ ID }))];
            }
            if (query.startsWith('update score')) {
                state.writes++;
                const score = state.scores.find((item) => item.ID === params[1] && item.User_ID === params[2]);
                if (score) score.Avg = params[0];
                return [{ affectedRows: score ? 1 : 0 }];
            }
            if (query.startsWith('insert into score')) {
                state.writes++;
                const [userId, average] = params;
                state.scores.push({ ID: state.nextScoreId++, User_ID: userId, Avg: average });
                return [{ insertId: state.nextScoreId - 1 }];
            }
            throw new Error(`Unexpected SQL in repository test: ${query}`);
        }
    };

    return {
        state,
        repository: createManualTaskRepository({ getConnection: async () => connection }, calculateManualScore)
    };
}

test('completing a task updates the owner-scoped row and creates the daily aggregate', async () => {
    const { state, repository } = makeRepository({
        tasks: [{ ID: 11, User_ID: 7, Goal_text: 'Read', Is_Complete: 0, Is_Submit: 0 }]
    });

    const result = await repository.updateCompletion({ id: 7 }, 11, true);

    assert.equal(state.tasks[0].Is_Complete, 1);
    assert.deepEqual(result.task, { ID: 11, Goal_text: 'Read', Is_Complete: 1 });
    assert.equal(result.marks, 100);
    assert.equal(state.scores.length, 1);
    assert.equal(state.scores[0].Avg, 10);
    assert.equal(state.committed, true);
});

test('marking a task incomplete recalculates marks as zero', async () => {
    const { state, repository } = makeRepository({
        tasks: [{ ID: 12, User_ID: 7, Goal_text: 'Walk', Is_Complete: 1, Is_Submit: 0 }],
        scores: [{ ID: 4, User_ID: 7, Avg: 10 }]
    });

    const result = await repository.updateCompletion({ id: 7 }, 12, false);

    assert.equal(state.tasks[0].Is_Complete, 0);
    assert.equal(result.marks, 0);
    assert.equal(state.scores.length, 1);
    assert.equal(state.scores[0].Avg, 0);
});

test('repeated completion requests reuse the existing daily score row', async () => {
    const { state, repository } = makeRepository({
        tasks: [{ ID: 13, User_ID: 7, Goal_text: 'Study', Is_Complete: 0, Is_Submit: 0 }]
    });

    await repository.updateCompletion({ id: 7 }, 13, true);
    await repository.updateCompletion({ id: 7 }, 13, true);

    assert.equal(state.scores.length, 1);
    assert.equal(state.writes, 4);
});

test('multiple tasks contribute equally to one daily aggregate', async () => {
    const { state, repository } = makeRepository({
        tasks: [
            { ID: 14, User_ID: 7, Goal_text: 'Study', Is_Complete: 0, Is_Submit: 0 },
            { ID: 15, User_ID: 7, Goal_text: 'Exercise', Is_Complete: 0, Is_Submit: 0 }
        ]
    });

    const result = await repository.updateCompletion({ id: 7 }, 14, true);

    assert.equal(result.marks, 50);
    assert.equal(state.scores[0].Avg, 5);
});

test('a task owned by another user cannot be changed', async () => {
    const { state, repository } = makeRepository({
        tasks: [{ ID: 16, User_ID: 8, Goal_text: 'Theirs', Is_Complete: 0, Is_Submit: 0 }]
    });

    await assert.rejects(repository.updateCompletion({ id: 7 }, 16, true), { statusCode: 404 });

    assert.equal(state.tasks[0].Is_Complete, 0);
    assert.equal(state.scores.length, 0);
});

test('pre-existing duplicate daily scores are not deleted or increased', async () => {
    const { state, repository } = makeRepository({
        tasks: [{ ID: 17, User_ID: 7, Goal_text: 'Read', Is_Complete: 0, Is_Submit: 0 }],
        scores: [
            { ID: 2, User_ID: 7, Avg: 3 },
            { ID: 9, User_ID: 7, Avg: 4 }
        ]
    });

    await repository.updateCompletion({ id: 7 }, 17, true);

    assert.equal(state.scores.length, 2);
    assert.equal(state.scores[0].Avg, 3);
    assert.equal(state.scores[1].Avg, 10);
});

test('refuses nontransactional tables before changing task state', async () => {
    const { state, repository } = makeRepository({
        tasks: [{ ID: 18, User_ID: 7, Goal_text: 'Read', Is_Complete: 0, Is_Submit: 0 }],
        engines: [{ TABLE_NAME: 'userAccount', ENGINE: 'InnoDB' }]
    });

    await assert.rejects(repository.updateCompletion({ id: 7 }, 18, true), { statusCode: 503 });
    assert.equal(state.tasks[0].Is_Complete, 0);
    assert.equal(state.rolledBack, true);
});

test('submitted daily goals cannot be changed through the manual endpoint', async () => {
    const { state, repository } = makeRepository({
        tasks: [{ ID: 19, User_ID: 7, Goal_text: 'Read', Is_Complete: 1, Is_Submit: 1 }]
    });

    await assert.rejects(repository.updateCompletion({ id: 7 }, 19, false), { statusCode: 409 });
    assert.equal(state.tasks[0].Is_Complete, 1);
    assert.equal(state.scores.length, 0);
});
