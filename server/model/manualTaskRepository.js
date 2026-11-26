async function ensureTransactionalTables(connection) {
    const [engines] = await connection.query(`
        SELECT TABLE_NAME, ENGINE
        FROM information_schema.TABLES
        WHERE TABLE_SCHEMA=DATABASE()
        AND TABLE_NAME IN ('userAccount','daily_goals','Score');
    `);
    const engineByName = new Map(engines.map((table) => [table.TABLE_NAME.toLowerCase(), table.ENGINE]));
    if (['useraccount', 'daily_goals', 'score'].some((table) => String(engineByName.get(table)).toLowerCase() !== 'innodb')) {
        const error = new Error('Manual completion requires InnoDB for account, task, and score tables.');
        error.statusCode = 503;
        throw error;
    }
}

async function lockAccount(connection, userId) {
    const [accounts] = await connection.query(`
        SELECT ID FROM userAccount WHERE ID=? FOR UPDATE;
    `, [userId]);
    if (accounts.length === 0) {
        const error = new Error('Account not found.');
        error.statusCode = 404;
        throw error;
    }
}

async function persistDailyScore(connection, userId, average) {
    const [scores] = await connection.query(`
        SELECT ID
        FROM Score
        WHERE User_ID=? AND DateOfDay=CURRENT_DATE
        ORDER BY ID DESC
        LIMIT 1
        FOR UPDATE;
    `, [userId]);

    if (scores.length > 0) {
        // Keep older rows intact; the newest daily aggregate is canonical.
        await connection.query(`
            UPDATE Score
            SET Avg=?
            WHERE ID=? AND User_ID=? AND DateOfDay=CURRENT_DATE;
        `, [average, scores[0].ID, userId]);
        return scores[0].ID;
    }

    const [result] = await connection.query(`
        INSERT INTO Score (User_ID,Avg,DateOfDay)
        VALUES(?,?,CURRENT_DATE);
    `, [userId, average]);
    return result.insertId;
}

function createManualTaskRepository(pool, calculateManualScore) {
    async function updateCompletion(user, taskId, isComplete) {
        const connection = await pool.getConnection();

        try {
            await connection.beginTransaction();
            await ensureTransactionalTables(connection);
            await lockAccount(connection, user.id);

            const [tasks] = await connection.query(`
                SELECT ID, Goal_text, Is_Complete, Is_Submit
                FROM daily_goals
                WHERE ID=? AND User_ID=? AND DateOfDay=CURRENT_DATE
                FOR UPDATE;
            `, [taskId, user.id]);
            if (tasks.length === 0) {
                const error = new Error('Task not found for this account and date.');
                error.statusCode = 404;
                throw error;
            }
            if (Number(tasks[0].Is_Submit) === 1) {
                const error = new Error('This day has already been submitted.');
                error.statusCode = 409;
                throw error;
            }

            const completionValue = isComplete ? 1 : 0;
            await connection.query(`
                UPDATE daily_goals
                SET Is_Complete=?
                WHERE ID=? AND User_ID=? AND DateOfDay=CURRENT_DATE
                AND (Is_Submit IS NULL OR Is_Submit<>1);
            `, [completionValue, taskId, user.id]);

            const [currentTasks] = await connection.query(`
                SELECT Is_Complete
                FROM daily_goals
                WHERE User_ID=? AND DateOfDay=CURRENT_DATE;
            `, [user.id]);
            const score = calculateManualScore(
                currentTasks.map((task) => Number(task.Is_Complete) === 1)
            );

            await persistDailyScore(connection, user.id, score.average);

            await connection.commit();
            return {
                task: {
                    ID: tasks[0].ID,
                    Goal_text: tasks[0].Goal_text,
                    Is_Complete: completionValue
                },
                marks: score.marks,
                average: score.average,
                taskMarks: score.taskMarks
            };
        } catch (error) {
            await connection.rollback();
            throw error;
        } finally {
            connection.release();
        }
    }

    return { updateCompletion };
}

module.exports = {
    createManualTaskRepository,
    ensureTransactionalTables,
    lockAccount,
    persistDailyScore
};
