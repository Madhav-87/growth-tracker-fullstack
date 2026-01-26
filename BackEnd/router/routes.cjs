const express = require('express');
const router = express.Router();
const path = require('path');
const Database = require('../Database/Database.js');
const jwt = require('jsonwebtoken');
const chatbot = require('../services/chatbotServer.js');
const ai = require('../services/goalVerification.js');
const verify = (req, res, next) => {
    const data = req.headers['authorization'];
    const token = data.split(' ')[1];
    if (!token) {
        res.status(401).json({
            message: "Not valid user!"
        });
    }
    else {
        jwt.verify(token, 'security_key', (err, decoded) => {
            if (err) {
                return res.status(403);
            }
            else {
                req.user = decoded;
                next();
            }
        })
    }
}
router.post('/Login', async (req, res) => {
    const userData = req.body;
    try {
        let verify = await Database.userLogin(userData.userEmail, userData.userPassword);
        if (verify != null) {
            const token = jwt.sign(
                {
                    name: verify[0].Name,
                    id: verify[0].ID
                },
                'security_key',
                {
                    expiresIn: '1h'
                }
            );
            res.status(200).json({ message: "Done", data: "Login Successfully!", usertoken: token, name: userData.userName });
        }
        else {
            res.status(200).json({ message: "Fail", data: "No Account!" });
        }
    }
    catch (err) {
        console.log(err);
    }
});
router.post('/addRecord', async (req, res) => {
    const userData = req.body;
    let verify = await Database.checkData(userData);
    if (verify) {
        res.status(200).json({
            message: "Fail",
            data: "Duplicate record!"
        });
    }
    else {
        await Database.InsertData(userData.userName, userData.userEmail, userData.userPassword);
        res.status(200).json({
            message: "Done",
            data: "User added!"
        });
    }
});
router.post('/report', verify, async (req, res) => {
    let ans = await Database.report(req.user);
    res.status(200).json({ report: ans });
})
router.post('/daily-goals-submit', verify, async (req, res) => {
    let daily_goals_list = req.body;
    daily_goals_list.map(async (value) => {
        await Database.dailyGoalsSubmit(value, req.user);
    })
    res.status(200).json({
        message: "Done!"
    })
})
router.get('/send-goals', verify, async (req, res) => {
    let result = await Database.dailyRetrive(req.user);
    const aiGenobject = await ai.aigetQuestionaries(result);
    if (result) {
        res.status(200).json({ data: "Duplicate", message: result, aiGenQues: aiGenobject });
    }
    else {
        res.status(200).json({ data: "allowed" });
    }
})
router.get('/', (req, res) => {
    res.status(200).json({
        message: "Data"
    })
})
router.get('/Is-Submit', verify, async (req, res) => {
    let answer = await Database.IsSubmit(req.user);
    res.status(200).json({ message: "allow" })
})
router.post('/Submit-Response', verify, async (req, res) => {
    let count = req.body;
    let resultArray = count.GoalsAndImages.map(item => ({
        GoalText: item.Goal,
        image: item.Image
    }));

    
    //---------Checking Image---------------------//
    const VisionRes=await ai.aiVerify(resultArray);
    if(!VisionRes.success){
        return res.status(500).json({message:"Fail",data:VisionRes.error});
    }

    //--------Calculating Score------------------//
    const Score=await ai.getScore(VisionRes.data);
    if(!Score.success){
       return res.status(500).json({message:"Fail",data:Score.error});
    }

    let marks=Score.data.result/10;
    //--------Storing Data----------------------//
    const result=await Database.SubmitResponse(req.user,marks);
    if(result){
        res.status(200).send({message:"done",marks:Score.data.result});
    }
    else{
        res.status(400).json({message:"Fail"});
    }
})
router.post('/Score', verify, async (req, res) => {
    let result = await Database.retriveData(req.user);
    res.status(200).json({ data: "Done", message: result[0].Avg });
})
router.post('/Check-Daily-Score', verify, async (req, res) => {
    let answer = await Database.WeeklyScore(req.user);
    res.status(200).json({ message: answer });
})
router.post('/Check-Monthly-Score', verify, async (req, res) => {
    let answer = await Database.MonthlyScore(req.user);
    res.status(200).json({ message: answer });
})
router.post('/Check-Yearly-Score', verify, async (req, res) => {
    let answer = await Database.YearlyScore(req.user);
    res.status(200).json({ message: answer });
})
router.post('/Month/Score', verify, async (req, res) => {
    let result = await Database.MonthlyProgress(req.user);
    res.status(200).json({ message: result });
})
router.post('/Year/Score', verify, async (req, res) => {
    let result = await Database.YearlyProgress(req.user);
    res.status(200).json({ message: result });
})
router.post('/Monthly/Goals', verify, async (req, res) => {
    const list = req.body;
    try {
        list.map(async (value, index) => {
            await Database.MonthlyGoals(value, req.user);
        });
        res.status(200).json({
            message: "Done!"
        });
    }
    catch (err) {
        console.log(err);
    }
});
router.get('/Monthly/Response', verify, async (req, res) => {
    let result = await Database.MonthlyResponse(req.user);
    if (result) {
        res.status(200).json({ data: "Duplicate", message:result});
    }
    else {
        res.status(200).json({ data: "allowed" });
    }
})
router.get('/Monthly/Response/Score/Check', verify, async (req, res) => {
    let result = await Database.MonthlyReport(req.user);
    if (result === "Duplicate") {
        res.status(200).json({ data: "Duplicate" });
    }
    else {
        res.status(200).json({ data: "allowed" });
    }
})
router.post('/Monthly/Response/Score', verify, async (req, res) => {
     let count = req.body;
    let resultArray = count.GoalsAndImages.map(item => ({
        GoalText: item.Goal,
        image: item.Image
    }));

    
    //---------Checking Image---------------------//
    const VisionRes=await ai.aiVerify(resultArray);
    if(!VisionRes.success){
        return res.status(500).json({message:"Fail",data:VisionRes.error});
    }

    //--------Calculating Score------------------//
    const Score=await ai.getScore(VisionRes.data);
    if(!Score.success){
       return res.status(500).json({message:"Fail",data:Score.error});
    }

    let marks=Score.data.result/10;
    //--------Storing Data----------------------//
    const result=await Database.SubmitMonthReport(req.user,marks);
    if(result){
        res.status(200).send({message:"done",marks:Score.data.result});
    }
    else{
        res.status(400).json({message:"Fail"});
    }
})
router.post('/YearGoals/Submit', verify, async (req, res) => {
    let DataItems = req.body;
    try {
        DataItems.map(async (value) => {
            await Database.YearlyGoals(value, req.user);
        });
        res.status(200).json({ message: "Done" });
    }
    catch (err) {
        res.status(500).json({ message: "Fail" });
        console.log(err);
    }
})
router.get('/Yearly/Response', verify, async (req, res) => {
    let result = await Database.YearlyRes(req.user);
    if (result) {
        res.status(200).json({ data: "Duplicate",message:result});
    }
    else {
        res.status(200).json({ data: "allowed" });
    }
})
router.get('/Year/Response/Check', verify, async (req, res) => {
    let result = await Database.YearlyResCheck(req.user);
    if (result) {
        res.status(200).json({ message: "not allowed" });
    }
    else {
        res.status(200).json({ message: "allow" });
    }
})
router.post('/Year/Response/Score', verify, async (req, res) => {
    let count = req.body;
    let resultArray = count.GoalsAndImages.map(item => ({
        GoalText: item.Goal,
        image: item.Image
    }));

    
    //---------Checking Image---------------------//
    const VisionRes=await ai.aiVerify(resultArray);
    if(!VisionRes.success){
        return res.status(500).json({message:"Fail",data:VisionRes.error});
    }

    //--------Calculating Score------------------//
    const Score=await ai.getScore(VisionRes.data);
    if(!Score.success){
       return res.status(500).json({message:"Fail",data:Score.error});
    }

    let marks=Score.data.result/10;
    //--------Storing Data----------------------//
    const result=await Database.YearlyResSubmit(req.user,marks);
    if(result){
        res.status(200).send({message:"done",marks:Score.data.result});
    }
    else{
        res.status(400).json({message:"Fail"});
    }
})
router.post('/chatbot', verify, async (req, res) => {
    const reqData = req.body;
    const reply = await chatbot(reqData.history, reqData.data);
    if (reply)
        res.status(200).json({ data: reply });
    else
        res.status(500).json({ data: "Something went wrong, try again later." });
})
router.get('/taskInfo', verify, async (req, res) => {
    const reply = await Database.taskInfo(req.user);
    if (reply)
        res.status(200).json({ data: "Done", message: reply });
    else
        res.status(500).json({ data: false });
})
module.exports = router;
