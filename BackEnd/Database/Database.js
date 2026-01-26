const mysql = require('mysql2');
const dotenv = require('dotenv');

dotenv.config();
const ca = Buffer.from(
  process.env.CA,
  "base64"
);
const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    port:process.env.MYSQL_PORT,
    database:process.env.MYSQL_DATABASE,
    ssl: {
        ca,
        minVersion: 'TLSv1.2',
        rejectUnauthorized: true
    },
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
}).promise();
 async function InsertData(Name, Email, Password) {
    let [result] = await pool.query(`
        INSERT INTO userAccount (Name,Email,Password)
        VALUES (?,?,?)
        `, [Name, Email, Password]);
}
 async function checkData(userData) {
    let [mysqlData] = await pool.query(`
        SELECT Email FROM userAccount
        WHERE Email=? AND Password=?;
        `, [userData.userEmail, userData.userPassword]);
    if (mysqlData.length > 0) {
        return true;
    }
    else {
        return false;
    }
}
 async function report(user) {
    let [result] = await pool.query(`
        SELECT Avg FROM Score WHERE DateOfDay>= CURDATE() - INTERVAL 3 DAY AND User_ID=?;
        `, [user.id]);
    if(result.length===0){
        return "safe";
    }
    let total = result.reduce((pre, cur, index) => {
        if (index === 1)
            return pre.Avg + cur.Avg;
        else
            return pre + cur.Avg;
    });
    let report = (total * 10) / 3;
    if (report < 50) {
        return "alert";
    }
    else {
        return "safe";
    }
}
 async function userLogin(Email, Password) {
    try {
        const [record] = await pool.query(`
        SELECT ID,Name FROM userAccount
        WHERE Email=? AND Password=?;    
        `, [Email, Password]);
        if (record.length != 0) {
            return record;
        }
        else {
            return null;
        }
    }
    catch (err) {
        console.log(err);
    }
}
 async function dailyGoalsSubmit(Goal, user) {
    await pool.query(`
        INSERT INTO daily_goals (User_ID,Goal_text)
        VALUES(?,?)
        `, [user.id, Goal]);
}
 async function dailyRetrive(user) {
    let [result] = await pool.query(`
        SELECT Goal_text FROM daily_goals
        WHERE User_ID=? AND DateOfDay=(CURRENT_DATE);
        `, [user.id]);
    return result;
}
 async function IsSubmit(user) {
    let [result] = await pool.query(`
        SELECT Is_Submit FROM daily_goals
        WHERE User_ID=? AND DateOfDay=(CURRENT_DATE);
        `, [user.id]);
    if (result[0].Is_Submit === 0) {
        return 'True';
    }
    else {
        return 'False';
    }
}
 async function SubmitResponse(user, AVG) {
    try{
        await pool.query(`UPDATE Daily_goals SET Is_Submit=1
        WHERE User_ID=? AND DateOfDay=CURRENT_DATE;
        `, [user.id]);
        await pool.query(`INSERT INTO Score (User_ID,Avg,DateOfDay)
        VALUES(?,?,CURRENT_DATE);
        `, [user.id, AVG]);
        return true;
    }
    catch(err){
        console.log(err);
        return false;
    }
}
 async function retriveData(user) {
    let [Score] = await pool.query(`SELECT Avg FROM Score WHERE DateOfDay=CURDATE()-INTERVAL 1 DAY AND User_ID=?`, [user.id]);
    if (Score.length === 0)
        return [{ Avg: "0" }];
    else
        return Score;
}
 async function WeeklyScore(user) {
    let [answer] = await pool.query(`
        SELECT DateOfDay,Avg 
        FROM Score
        WHERE User_ID=? AND 
        (DateOfDay<=CURDATE() AND DateOfDay>CURDATE()- INTERVAL 7 DAY);`, [user.id]);

    let result = answer.map((value, index) => {
        let date = new Date(value.DateOfDay);
        return {
            DateOfDay: date.toLocaleDateString('en-IN'),
            Avg: value.Avg * 10
        }
    });
    return result;
}
 async function MonthlyScore(user) {
    let [answer] = await pool.query(`SELECT DateOfDay,Avg FROM Score
         WHERE User_ID=? AND (DateOfDay<=CURDATE() AND DateOfDay>=DATE_FORMAT(CURDATE(),'%Y-%m-01'));`, [user.id]);
    let result = answer.map((value, index) => {
        let date = new Date(value.DateOfDay);
        return {
            DateOfDay: date.toLocaleDateString('en-IN'),
            Avg: value.Avg * 10
        }
    });
    return result;
}
 async function YearlyScore(user) {
    let [answer] = await pool.query(`SELECT DateOfDay,Avg FROM Score
         WHERE User_ID=? AND (DateOfDay<=CURDATE() AND DateOfDay>=DATE_FORMAT(CURDATE(),'%Y-01-01'));`, [user.id]);
    let result = answer.map((value, index) => {
        let date = new Date(value.DateOfDay);
        return {
            DateOfDay: date.toLocaleDateString('en-IN'),
            Avg: value.Avg * 10
        }
    });
    return result;
}
 async function MonthlyProgress(user) {
    let [answer] = await pool.query(`
    SELECT Avg FROM Monthly_progress
    WHERE DateOfDay>=CURDATE()-INTERVAL 1 MONTH
    AND DateOfDay<=CURDATE()+ INTERVAL 1 MONTH
    AND User_ID=?
    `, [user.id]);
    if (answer.length == 1) {
        let DailyScore = answer[0]["Avg"] * 10;
        let [MonthlyScore] = await pool.query(`SELECT Avg FROM Monthly_Score
            WHERE User_ID=?
            AND
            DateOfDay>=DATE_FORMAT(CURDATE(),'%Y-%m-01') - INTERVAL 1 MONTH
            AND
            DateOfDay<=DATE_FORMAT(CURDATE(),'%Y-%m-01') - INTERVAL 1 DAY;`, [user.id]);
        if (MonthlyScore.length === 0) {
            return DailyScore;
        }
        let sum2 = MonthlyScore.reduce((prev, current) => {
            return prev + current["Avg"];
        }, 0);
        sum2 = (sum2 * 10) / MonthlyScore.length;
        let Total = (DailyScore + sum2) / 2;
        return Total;
    }
    else {
        return "fewDays";
    }
}
 async function MonthlyGoals(value, user) {
    let [answer] = await pool.query(`
        INSERT INTO Monthly_Goals (User_ID,Goal_text) 
        VALUES (?,?);
        `, [user.id, value]);
}
 async function MonthlyResponse(user) {
    let [answer] = await pool.query(`
        SELECT Goal_text from Monthly_Goals 
        WHERE User_ID=? 
        AND DateOfDay>=DATE_FORMAT(CURDATE(),'%Y-%m-01')
        AND DateOfDay<=DATE_FORMAT(CURDATE(),'%Y-%m-01')+ INTERVAL 1 MONTH - INTERVAL 1 DAY;
        `, [user.id]);
    return answer;
}
 async function MonthlyReport(user) {
    let [answer] = await pool.query(`
        SELECT Is_Submit FROM Monthly_Goals
        WHERE User_ID=? AND DateOfDay>=DATE_FORMAT(CURDATE(),'%Y-%m-01')
        AND DateOfDay<=DATE_FORMAT(CURDATE(),'%Y-%m-01')+ INTERVAL 1 MONTH - INTERVAL 1 DAY;
        `, [user.id]);
    if (answer[0].Is_Submit === 0) {
        return "allowed";
    }
    else {
        return "Duplicate";
    }
}
 async function SubmitMonthReport(user, marks) {
    try {
        await pool.query(`
        UPDATE Monthly_Goals 
        SET Is_Submit=1
        WHERE DateOfDay>=DATE_FORMAT(CURDATE(),'%Y-%m-01') 
        AND DateOfDay<=DATE_FORMAT(CURDATE(),'%Y-%m-01')+ INTERVAL 1 MONTH- INTERVAL 1 DAY 
        AND User_ID=?;
        `, [user.id]);
        await pool.query(`
        INSERT INTO Monthly_Score (User_ID,Avg)
        VALUES(?,?);
        `, [user.id, marks]);
        return "Done";
    }
    catch (err) {
        console.log(err);
        return "Fail"
    }
}
 async function YearlyGoals(value, user) {
    try {
        await pool.query(`
        INSERT INTO Yearly_Goals(User_ID,Goal_text)
        VALUES(?,?); 
        `, [user.id, value]);
    }
    catch (err) {
        console.log(err);
    }
}
 async function YearlyRes(user) {
    let [result] = await pool.query(`
        SELECT Goal_text from Yearly_Goals 
        WHERE User_ID=?
        AND DateOfDay>=DATE_FORMAT(CURDATE(),'%Y-01-01')
        AND DateOfDay<= CURDATE();
        `, [user.id]);
    return result;
}
 async function YearlyResCheck(user) {
    let [result] = await pool.query(`
        SELECT Is_Submit FROM Yearly_Goals
        WHERE User_ID=?
        AND DateOfDay>=DATE_FORMAT(CURDATE(),'%Y-01-01');
        `, [user.id]);
    if (result[0].Is_Submit === 0) {
        return false;
    }
    else {
        return true;
    }
}
 async function YearlyResSubmit(user, Score) {
    try {
        await pool.query(`
        UPDATE Yearly_Goals 
        SET Is_Submit=1
        WHERE DateOfDay>=DATE_FORMAT(CURDATE(),'%Y-01-01') 
        AND DateOfDay<=CURDATE()
        AND User_ID=?;
        `, [user.id]);

        await pool.query(`
        INSERT INTO Yearly_Score (User_ID,Avg)
        VALUES(?,?);
        `, [user.id, Score]);

        return "Done";
    }
    catch (err) {
        console.log(err);
        return "Fail";
    }
}
 async function YearlyProgress(user) {
    let [answer] = await pool.query(`
    SELECT Avg FROM Monthly_progress
    WHERE DateOfDay>=DATE_FORMAT(CURDATE(),'%Y-01-01') - INTERVAL 1 YEAR
    AND DateOfDay<=DATE_FORMAT(CURDATE(),'%Y-01-01') - INTERVAL 1 DAY
    AND User_ID=?
    `, [user.id]);
    if (answer.length <= 12 && answer.length>0) {
        let day = answer.reduce((prev, current) => {
            return prev + current["Avg"];
        }, 0);
        day = (day * 10) / answer.length;
        let [MonthlyScore] = await pool.query(`SELECT Avg FROM Monthly_Score
            WHERE User_ID=?
            AND
            DateOfDay>=DATE_FORMAT(CURDATE(),'%Y-01-01') - INTERVAL 1 YEAR
            AND
            DateOfDay<=DATE_FORMAT(CURDATE(),'%Y-01-01') - INTERVAL 1 DAY;`, [user.id]);
        if (MonthlyScore.length === 0) {
            let [YearlyScore] = await pool.query(`SELECT Avg FROM Yearly_Score
            WHERE User_ID=?
            AND
            DateOfDay>=DATE_FORMAT(CURDATE(),'%Y-01-01') - INTERVAL 1 YEAR
            AND
            DateOfDay<=DATE_FORMAT(CURDATE(),'%Y-01-01') - INTERVAL 1 DAY;`, [user.id]);
            if(YearlyScore.length===0){
                return day;
            }
            let year = YearlyScore.reduce((prev, current) => {
                return prev + current["Avg"];
            }, 0);
            year = (year * 10) / YearlyScore.length;
            let Total = (day + year) / 2;
            return Total;
        }
        let month = MonthlyScore.reduce((prev, current) => {
            return prev + current["Avg"];
        }, 0);
        month = (month * 10) / MonthlyScore.length;
        let [YearlyScore] = await pool.query(`SELECT Avg FROM Yearly_Score
            WHERE User_ID=?
            AND
            DateOfDay>=DATE_FORMAT(CURDATE(),'%Y-01-01') - INTERVAL 1 YEAR
            AND
            DateOfDay<=DATE_FORMAT(CURDATE(),'%Y-01-01') - INTERVAL 1 DAY;`, [user.id]);
        let year = YearlyScore.reduce((prev, current) => {
            return prev + current["Avg"];
        }, 0);
        year = (year * 10) / YearlyScore.length;
        let Total = (day + month + year) / 3;
        return Total;
    }
    else {
       let [MonthlyScore] = await pool.query(`SELECT Avg FROM Monthly_Score
            WHERE User_ID=?
            AND
            DateOfDay>=DATE_FORMAT(CURDATE(),'%Y-01-01') - INTERVAL 1 YEAR
            AND
            DateOfDay<=DATE_FORMAT(CURDATE(),'%Y-01-01') - INTERVAL 1 DAY;`, [user.id]);
        if (MonthlyScore.length === 0) {
            let [YearlyScore] = await pool.query(`SELECT Avg FROM Yearly_Score
            WHERE User_ID=?
            AND
            DateOfDay>=DATE_FORMAT(CURDATE(),'%Y-01-01') - INTERVAL 1 YEAR
            AND
            DateOfDay<=DATE_FORMAT(CURDATE(),'%Y-01-01') - INTERVAL 1 DAY;`, [user.id]);
            let year = YearlyScore.reduce((prev, current) => {
                return prev + current["Avg"];
            }, 0);
            if(year.length===0){
                return "fewDays";
            }
            year = (year * 10) / YearlyScore.length;
            let Total = (year) / 1;
            return Total;
        }
        let month = MonthlyScore.reduce((prev, current) => {
            return prev + current["Avg"];
        }, 0);
        month = (month * 10) / MonthlyScore.length;
        let [YearlyScore] = await pool.query(`SELECT Avg FROM Yearly_Score
            WHERE User_ID=?
            AND
            DateOfDay>=DATE_FORMAT(CURDATE(),'%Y-01-01') - INTERVAL 1 YEAR
            AND
            DateOfDay<=DATE_FORMAT(CURDATE(),'%Y-01-01') - INTERVAL 1 DAY;`, [user.id]);
        let year = YearlyScore.reduce((prev, current) => {
            return prev + current["Avg"];
        }, 0);
        year = (year * 10) / YearlyScore.length;
        let Total = (month + year) / 2;
        return Total;
    }
}
 async function taskInfo(user){
    try{
        let [data]=await pool.query(
        `
        SELECT Is_Submit
        FROM 
        daily_goals
        WHERE
        User_ID=?
        AND
        DateOfDay>=CURDATE()-INTERVAL 7 DAY;      
        `,[user.id]
    );
    if(data.length===0){
        return "no task submitted";
    }
    else{
        return data;
    }
    }
    catch(err){
        console.log(err)
        return false;
    }
}
module.exports = {
  InsertData,
  checkData,
  report,
  userLogin,
  dailyGoalsSubmit,
  dailyRetrive,
  IsSubmit,
  SubmitResponse,
  retriveData,
  WeeklyScore,
  MonthlyScore,
  YearlyScore,
  MonthlyProgress,
  MonthlyGoals,
  MonthlyResponse,
  MonthlyReport,
  SubmitMonthReport,
  YearlyGoals,
  YearlyRes,
  YearlyResCheck,
  YearlyResSubmit,
  YearlyProgress,
  taskInfo
};
