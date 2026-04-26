const path = require('path');
const db = require('../Model/db.js');
const chatbot = require('../services/chatbotServer.js');
const ai = require('../services/goalVerification.js');
const { generateToken, verify } = require('../utils/authMiddleware');


async function getUserLogin(req, res) {
    const userData = db.userLogin(userData.userEmail, userData.userPassword);
    if (userData) {
        const token = generateToken(userData);
        let deviceLock = await db.checkChildLock(verify[0].ID);
        let fingerprint = null;
        if (deviceLock == true) {
            fingerprint = await db.retriveFingerPrint(verify[0].ID);
        }
        res.status(200).json({ message: "Done", data: "Login Successfully!", usertoken: token, name: userData.userName, isChildLockOn: deviceLock, blueprint: fingerprint });
    }
    else {
        res.status(200).json({ message: "Fail", data: "No Account!" });
    }
}

async function addUserAccount(req, res) {
    const userData = req.body;
    const duplicateRec = await db.checkData(userData);
    if (duplicateRec) {
        res.status(200).json({
            message: "Fail",
            data: "Duplicate record!"
        });
    }
    else {
        await db.InsertData(userData.userName, userData.userEmail, userData.userPassword);
        res.status(200).json({
            message: "Done",
            data: "User added!"
        });
    }
}

async function getUserReport(req, res) {
    let ans = await db.report(req.user);
    res.status(200).json({ report: ans });
}

async function setUserDailyGoals(req, res) {
    let daily_goals_list = req.body;
    daily_goals_list.map(async (value) => {
        await db.dailyGoalsSubmit(value, req.user);
    })
    res.status(200).json({
        message: "Done!"
    })
}

async function getUserDailyGoals(req, res) {
    let result = await db.dailyRetrive(req.user);
    if (result) {
        res.status(200).json({ data: "Duplicate", message: result });
    }
    else {
        res.status(200).json({ data: "allowed" });
    }
}

async function checkDailyGoalIsSubmit(req, res) {
    let answer = await db.IsSubmit(req.user);
    res.status(200).json({ message: "allow" })
}

async function setUserDailyScore(req, res) {
    let count = req.body;
    let resultArray = count.GoalsAndImages.map(item => ({
        GoalText: item.Goal,
        image: item.Image
    }));

    //---------Checking Image---------------------//
    const VisionRes = await ai.aiVerify(resultArray);
    if (!VisionRes.success) {
        return res.status(500).json({ message: "Fail", data: VisionRes.error });
    }

    //--------Calculating Score------------------//
    const Score = await ai.getScore(VisionRes.data);
    if (!Score.success) {
        return res.status(500).json({ message: "Fail", data: Score.error });
    }
    let marks = Score.data.result / 10;
    //--------Storing Data----------------------//
    const result = await db.SubmitResponse(req.user, marks);

    if (result) {
        res.status(200).send({ message: "done", marks: Score.data.result });
    }
    else {
        res.status(400).json({ message: "Fail" });
    }
}
async function getUserDailyScore(req, res) {
    let result = await db.retriveData(req.user);
    res.status(200).json({ data: "Done", message: result[0].Avg });
}

async function getUserWeeklyScore(req, res) {
    let answer = await db.WeeklyScore(req.user);
    res.status(200).json({ message: answer });
}

async function getUserMonthlyScore(req, res) {
    let answer = await db.MonthlyScore(req.user);
    res.status(200).json({ message: answer });
}

async function getUserYearlyScore(req, res) {
    let answer = await db.YearlyScore(req.user);
    res.status(200).json({ message: answer });
}

async function getUserMonthlyProgress(req, res) {
    let result = await db.MonthlyProgress(req.user);
    res.status(200).json({ message: result });
}

async function getUserYearlyProgress(req, res) {
    let result = await db.YearlyProgress(req.user);
    res.status(200).json({ message: result });
}
async function setUserMonthlyGoals(req, res) {
    const list = req.body;
    try {
        list.map(async (value, index) => {
            await db.MonthlyGoals(value, req.user);
        });
        res.status(200).json({
            message: "Done!"
        });
    }
    catch (err) {
        throw new Error(err);
    }
}

async function getUserMonthlyGoals(req, res) {
    let result = await db.MonthlyResponse(req.user);
    if (result) {
        res.status(200).json({ data: "Duplicate", message: result });
    }
    else {
        res.status(200).json({ data: "allowed" });
    }
}

async function checkUserMonthlyRes(req, res) {
    let result = await db.MonthlyReport(req.user);
    if (result === "Duplicate") {
        res.status(200).json({ data: "Duplicate" });
    }
    else {
        res.status(200).json({ data: "allowed" });
    }
}

async function setUserMonthlyScore(req, res) {
    let count = req.body;
    let resultArray = count.GoalsAndImages.map(item => ({
        GoalText: item.Goal,
        image: item.Image
    }));

    //---------Checking Image---------------------//
    const VisionRes = await ai.aiVerify(resultArray);
    if (!VisionRes.success) {
        return res.status(500).json({ message: "Fail", data: VisionRes.error });
    }

    //--------Calculating Score------------------//
    const Score = await ai.getScore(VisionRes.data);
    if (!Score.success) {
        return res.status(500).json({ message: "Fail", data: Score.error });
    }

    let marks = Score.data.result / 10;
    //--------Storing Data----------------------//
    const result = await db.SubmitMonthReport(req.user, marks);
    if (result) {
        res.status(200).send({ message: "done", marks: Score.data.result });
    }
    else {
        res.status(400).json({ message: "Fail" });
    }
}

async function setUserYearlyGoals(req, res) {
    let DataItems = req.body;
    try {
        DataItems.map(async (value) => {
            await db.YearlyGoals(value, req.user);
        });
        res.status(200).json({ message: "Done" });
    }
    catch (err) {
        res.status(500).json({ message: "Fail" });
        console.log(err);
    }
}

async function getUserYearlyRes(req, res) {
    let result = await db.YearlyRes(req.user);
    if (result) {
        res.status(200).json({ data: "Duplicate", message: result });
    }
    else {
        res.status(200).json({ data: "allowed" });
    }
}

async function checkUserYearlyRes(req, res) {
    let result = await db.YearlyResCheck(req.user);
    if (result) {
        res.status(200).json({ message: "not allowed" });
    }
    else {
        res.status(200).json({ message: "allow" });
    }
}

async function setUserYearlyScore(req, res) {
    let count = req.body;
    let resultArray = count.GoalsAndImages.map(item => ({
        GoalText: item.Goal,
        image: item.Image
    }));
    //---------Checking Image---------------------//
    const VisionRes = await ai.aiVerify(resultArray);
    if (!VisionRes.success) {
        return res.status(500).json({ message: "Fail", data: VisionRes.error });
    }
    //--------Calculating Score------------------//
    const Score = await ai.getScore(VisionRes.data);
    if (!Score.success) {
        return res.status(500).json({ message: "Fail", data: Score.error });
    }
    let marks = Score.data.result / 10;
    //--------Storing Data----------------------//
    const result = await db.YearlyResSubmit(req.user, marks);
    if (result) {
        res.status(200).send({ message: "done", marks: Score.data.result });
    }
    else {
        res.status(400).json({ message: "Fail" });
    }
}
async function sendPrompt(req, res) {
    const reqData = req.body;
    const reply = await chatbot(reqData.history, reqData.data);
    if (reply)
        res.status(200).json({ data: reply });
    else
        res.status(500).json({ data: "Something went wrong, try again later." });
}

async function getUserDailyTaskInfo(req, res) {
    const reply = await db.taskInfo(req.user);
    if (reply)
        res.status(200).json({ data: "Done", message: reply });
    else
        res.status(500).json({ data: false });
}

async function setFingerPrintLock(req, res) {
    const Data = req.body;
    const reply = await db.setFingerPrint(Data, req.user);
    if (reply) {
        res.status(200).json({ message: "done", isChildLockOn: "true" });
    }
    else {
        res.status(500).json({ message: "failed" });
    }
}

async function removeLock(req, res) {
    const Data = req.body;
    try {
        const validPIN = await db.retriveUserPIN(req.user);
        if (Data.userPin == validPIN) {
            const reply = await db.removeFingerPrint(req.user);
            if (reply) {
                res.status(200).json({ message: "done" });
            }
            else {
                res.status(500).json({ message: "failed" });
            }
        }
        else {
            res.status(200).json({ message: "invalid pin" });
        }
    }
    catch (err) {
        res.status(500).json({ message: "fail", errorMessage: err });
    }
}
module.exports={
getUserLogin,
addUserAccount,
getUserReport,
setUserDailyGoals,
getUserDailyGoals,
checkDailyGoalIsSubmit,
setUserDailyScore,
getUserDailyScore,
getUserWeeklyScore,
getUserMonthlyScore,
getUserYearlyScore,
getUserMonthlyProgress,
getUserYearlyProgress,
setUserMonthlyGoals,
getUserMonthlyGoals,
checkUserMonthlyRes,
setUserMonthlyScore,
setUserYearlyGoals,
getUserYearlyRes,
checkUserYearlyRes,
setUserYearlyScore,
sendPrompt,
getUserDailyTaskInfo,
setFingerPrintLock,
removeLock
}