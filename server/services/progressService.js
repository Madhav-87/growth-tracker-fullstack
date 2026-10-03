const db = require('../model/db.js');

async function getReport(user) {
    const scores = await db.getRecentScoresForReport(user);
    if (scores.length === 0) {
        return 'safe';
    }

    const total = scores.reduce((previous, current, index) => {
        if (index === 1) {
            return previous.Avg + current.Avg;
        }

        return previous + current.Avg;
    });
    const reportScore = (total * 10) / 3;

    return reportScore < 50 ? 'alert' : 'safe';
}

async function getMonthlyProgress(user) {
    const dailyScores = await db.getMonthlyProgressScores(user);
    if (dailyScores.length !== 1) {
        return 'fewDays';
    }

    const dailyScore = dailyScores[0].Avg * 10;
    const monthlyScores = await db.getPreviousMonthScores(user);
    if (monthlyScores.length === 0) {
        return dailyScore;
    }

    const monthlyTotal = monthlyScores.reduce((total, score) => {
        return total + score.Avg;
    }, 0);
    const previousMonthAverage = (monthlyTotal * 10) / monthlyScores.length;

    return (dailyScore + previousMonthAverage) / 2;
}

async function getYearlyProgress(user) {
    const dailyScores = await db.getYearlyProgressScores(user);

    if (dailyScores.length <= 12 && dailyScores.length > 0) {
        const dailyTotal = dailyScores.reduce((total, score) => {
            return total + score.Avg;
        }, 0);
        const dailyAverage = (dailyTotal * 10) / dailyScores.length;
        const monthlyScores = await db.getYearMonthlyScores(user);

        if (monthlyScores.length === 0) {
            const yearlyScores = await db.getYearAnnualScores(user);
            if (yearlyScores.length === 0) {
                return dailyAverage;
            }

            const yearlyTotal = yearlyScores.reduce((total, score) => {
                return total + score.Avg;
            }, 0);
            const yearlyAverage = (yearlyTotal * 10) / yearlyScores.length;
            return (dailyAverage + yearlyAverage) / 2;
        }

        const monthlyTotal = monthlyScores.reduce((total, score) => {
            return total + score.Avg;
        }, 0);
        const monthlyAverage = (monthlyTotal * 10) / monthlyScores.length;
        const yearlyScores = await db.getYearAnnualScores(user);
        const yearlyTotal = yearlyScores.reduce((total, score) => {
            return total + score.Avg;
        }, 0);
        const yearlyAverage = (yearlyTotal * 10) / yearlyScores.length;
        return (dailyAverage + monthlyAverage + yearlyAverage) / 3;
    }

    const monthlyScores = await db.getYearMonthlyScores(user);
    if (monthlyScores.length === 0) {
        const yearlyScores = await db.getYearAnnualScores(user);
        const yearlyTotal = yearlyScores.reduce((total, score) => {
            return total + score.Avg;
        }, 0);
        if (yearlyTotal.length === 0) {
            return 'fewDays';
        }

        const yearlyAverage = (yearlyTotal * 10) / yearlyScores.length;
        return yearlyAverage / 1;
    }

    const monthlyTotal = monthlyScores.reduce((total, score) => {
        return total + score.Avg;
    }, 0);
    const monthlyAverage = (monthlyTotal * 10) / monthlyScores.length;
    const yearlyScores = await db.getYearAnnualScores(user);
    const yearlyTotal = yearlyScores.reduce((total, score) => {
        return total + score.Avg;
    }, 0);
    const yearlyAverage = (yearlyTotal * 10) / yearlyScores.length;
    return (monthlyAverage + yearlyAverage) / 2;
}

module.exports = {
    getReport,
    getMonthlyProgress,
    getYearlyProgress
};
