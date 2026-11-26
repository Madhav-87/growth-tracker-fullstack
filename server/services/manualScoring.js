const TASK_MARKS = 100;

/**
 * Convert task completion decisions into the existing 0–100 displayed mark
 * and 0–10 stored average used by the daily Score table.
 *
 * @param {boolean[]} completionStates
 * @returns {{ marks: number, average: number, taskMarks: number[] }}
 */
function calculateManualScore(completionStates) {
    if (!Array.isArray(completionStates) || completionStates.length === 0) {
        throw new TypeError('At least one task completion state is required.');
    }

    if (!completionStates.every((state) => typeof state === 'boolean')) {
        throw new TypeError('Each task completion state must be a boolean.');
    }

    const taskMarks = completionStates.map((completed) => completed ? TASK_MARKS : 0);
    const marks = Math.round(
        taskMarks.reduce((total, taskMark) => total + taskMark, 0) / taskMarks.length
    );

    return {
        marks,
        average: marks / 10,
        taskMarks
    };
}

module.exports = { calculateManualScore };
