const express=require('express');
const router=express.Router();
const {verify}=require('../config/authMiddleware.js');
const { 
getUserLogin,addUserAccount,getUserReport,setUserDailyGoals,getUserDailyGoals,checkDailyGoalIsSubmit,setUserDailyScore,getUserDailyScore,
getUserWeeklyScore,getUserMonthlyScore,getUserYearlyScore,getUserMonthlyProgress,getUserYearlyProgress,
setUserMonthlyGoals,getUserMonthlyGoals,checkUserMonthlyRes,setUserMonthlyScore,setUserYearlyGoals,
getUserYearlyRes,checkUserYearlyRes,setUserYearlyScore,sendPrompt,getUserDailyTaskInfo,setFingerPrintLock,removeLock
}=require('../controller/controller.js');


router.post('/Login',getUserLogin);
router.post('/addRecord',addUserAccount);
router.post('/report',verify,getUserReport);
router.post('/daily-goals-submit',verify,setUserDailyGoals);
router.get('/send-goals',verify,getUserDailyGoals);
router.get('/',);
router.get('/Is-Submit',verify,checkDailyGoalIsSubmit);
router.post('/Submit-Response',verify,setUserDailyScore);
router.post('/Score',verify,getUserDailyScore);
router.post('/Check-Daily-Score',verify,getUserWeeklyScore);
router.post('/Check-Monthly-Score',verify,getUserMonthlyScore);
router.post('/Check-Yearly-Score',verify,getUserYearlyScore);
router.post('/Month/Score',verify,getUserMonthlyProgress);
router.post('/Year/Score',verify,getUserYearlyProgress);
router.post('/Monthly/Goals',verify,setUserMonthlyGoals);
router.get('/Monthly/Response',verify,getUserMonthlyGoals);
router.get('/Monthly/Response/Score/Check',verify,checkUserMonthlyRes);
router.post('/Monthly/Response/Score',verify,setUserMonthlyScore);
router.post('/YearGoals/Submit',verify,setUserYearlyGoals);
router.get('/Yearly/Response',verify,getUserYearlyRes);
router.get('/Year/Response/Check',verify,checkUserYearlyRes);
router.post('/Year/Response/Score',verify,setUserYearlyScore);
router.post('/chatbot',verify,sendPrompt);
router.get('/taskInfo',verify,getUserDailyTaskInfo);
router.post('/deviceLock',verify,setFingerPrintLock);
router.post('/deviceLockOff',verify,removeLock);

module.exports=router;