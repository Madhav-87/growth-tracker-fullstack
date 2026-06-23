const path = require('path');
const db = require('../model/db.js');
const jwt = require("jsonwebtoken");
const chatbot = require('../services/chatbotServer.js');
const ai = require('../services/goalVerification.js');
const { generateToken, verify } = require('../utils/authMiddleware');



async function getUserLogin(req, res, next) {
    try {
        const userData = req.body;
        let resData = await db.userLogin(userData.userEmail, userData.userPassword);
        if (resData) {
            const token = generateToken(resData);
            const verifyToken = jwt.verify(token, "security_key");
            let deviceLock = await db.checkChildLock(verifyToken.id);
            let fingerprint = null;
            if (deviceLock == true) {
                fingerprint = await db.retriveFingerPrint(verifyToken.id);
            }
            res.status(200).json({ message: "Done", data: "Login Successfully!", usertoken: token, name: userData.userName, isChildLockOn: deviceLock, blueprint: fingerprint });
        }
        res.status(401).json({message:"Unauthorized user..!",success:false});
    }
    catch (err) {
        next(err);
    }
}

async function addUserAccount(req, res, next) {
    try {
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
    catch (err) {
        next(err);
    }
}

async function getUserReport(req, res, next) {
    try {
        let ans = await db.report(req.user);
        res.status(200).json({ report: ans });
    }
    catch (err) {
        next(err);
    }
}

async function setUserDailyGoals(req, res, next) {
    try {
        let daily_goals_list = req.body;
        daily_goals_list.map(async (value) => {
            await db.dailyGoalsSubmit(value, req.user);
        })
        res.status(200).json({
            message: "Done!"
        })
    }
    catch (err) {
        next(err)
    }
}

async function getUserDailyGoals(req, res, next) {
    try {
        let result = await db.dailyRetrive(req.user);
        if (result) {
            res.status(200).json({ data: "Duplicate", message: result });
        }
        else {
            res.status(200).json({ data: "allowed" });
        }
    }
    catch (err) {
        next(err);
    }
}

async function checkDailyGoalIsSubmit(req, res, next) {
    try {
        let answer = await db.IsSubmit(req.user);
        res.status(200).json({ message: "allow" })
    }
    catch (err) {
        next(err);
    }
}

async function setUserDailyScore(req, res, next) {
    try {
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
    catch (err) {
        next(err);
    }
}
async function getUserDailyScore(req, res, next) {
    try {
        let result = await db.retriveData(req.user);
        res.status(200).json({ data: "Done", message: result[0].Avg });
    }
    catch (err) {
        next(err);
    }
}

async function getUserWeeklyScore(req, res, next) {
    try {
        let answer = await db.WeeklyScore(req.user);
        res.status(200).json({ message: answer });
    }
    catch (err) {
        next(err)
    }
}

async function getUserMonthlyScore(req, res, next) {
    try {
        let answer = await db.MonthlyScore(req.user);
        res.status(200).json({ message: answer });
    }
    catch (err) {
        next(err);
    }
}

async function getUserYearlyScore(req, res, next) {
    try {
        let answer = await db.YearlyScore(req.user);
        res.status(200).json({ message: answer });
    }
    catch (err) {
        next(err)
    }
}

async function getUserMonthlyProgress(req, res, next) {
    try {
        let result = await db.MonthlyProgress(req.user);
        res.status(200).json({ message: result });
    }
    catch (err) {
        next(err);
    }
}

async function getUserYearlyProgress(req, res, next) {
    try {
        let result = await db.YearlyProgress(req.user);
        res.status(200).json({ message: result });
    }
    catch (err) {
        next(err);
    }
}
async function setUserMonthlyGoals(req, res, next) {
    try {
        const list = req.body;
        list.map(async (value, index) => {
            await db.MonthlyGoals(value, req.user);
        });
        res.status(200).json({
            message: "Done!"
        });
    }
    catch (err) {
        next(err);
    }
}

async function getUserMonthlyGoals(req, res, next) {
    try {
        let result = await db.MonthlyResponse(req.user);
        if (result) {
            res.status(200).json({ data: "Duplicate", message: result });
        }
        else {
            res.status(200).json({ data: "allowed" });
        }
    }
    catch (err) {
        next(err);
    }
}

async function checkUserMonthlyRes(req, res, next) {
    try {
        let result = await db.MonthlyReport(req.user);
        if (result === "Duplicate") {
            res.status(200).json({ data: "Duplicate" });
        }
        else {
            res.status(200).json({ data: "allowed" });
        }
    }
    catch (err) {
        next(err);
    }
}

async function setUserMonthlyScore(req, res, next) {
    try {
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
    catch (err) {
        next(err);
    }
}

async function setUserYearlyGoals(req, res, next) {
    try {
        let DataItems = req.body;
        DataItems.map(async (value) => {
            await db.YearlyGoals(value, req.user);
        });
        res.status(200).json({ message: "Done" });
    }
    catch (err) {
        next(err)
    }
}

async function getUserYearlyRes(req, res, next) {
    try {
        let result = await db.YearlyRes(req.user);
        if (result) {
            res.status(200).json({ data: "Duplicate", message: result });
        }
        else {
            res.status(200).json({ data: "allowed" });
        }
    }
    catch (err) {
        next(err);
    }
}

async function checkUserYearlyRes(req, res, next) {
    try {
        let result = await db.YearlyResCheck(req.user);
        if (result) {
            res.status(200).json({ message: "not allowed" });
        }
        else {
            res.status(200).json({ message: "allow" });
        }
    }
    catch (err) {
        next(err);
    }
}

async function setUserYearlyScore(req, res, next) {
    try {
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
    catch (err) {
        next(err);
    }
}
async function sendPrompt(req, res, next) {
    try {
        const reqData = req.body;
        const reply = await chatbot(reqData.history, reqData.data);
        if (reply)
            res.status(200).json({ data: reply });
        else
            res.status(500).json({ data: "Something went wrong, try again later." });
    }
    catch (err) {
        next(err);
    }
}

async function getUserDailyTaskInfo(req, res, next) {
    try {
        const reply = await db.taskInfo(req.user);
        if (reply)
            res.status(200).json({ data: "Done", message: reply });
        else
            res.status(500).json({ data: false });
    }
    catch (err) {
        next(err);
    }
}

async function setFingerPrintLock(req, res, next) {
    try {
        const Data = req.body;
        const reply = await db.setFingerPrint(Data, req.user);
        if (reply) {
            res.status(200).json({ message: "done", isChildLockOn: "true" });
        }
        else {
            res.status(500).json({ message: "failed" });
        }
    }
    catch (err) {
        next(err);
    }
}

async function removeLock(req, res, next) {
    try {
        const Data = req.body;
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
        next(err);
    }
}
async function defaultRes(req, res, next) {
    try {
        res.status(200).json({
            message: "server listening..!"
        })
    }
    catch (err) {
        next(err)
    }
}
module.exports = {
    defaultRes,
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