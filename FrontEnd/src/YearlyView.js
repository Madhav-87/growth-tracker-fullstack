import { ResponsiveContainer, XAxis, YAxis, Tooltip, Legend, CartesianGrid, Bar, BarChart } from 'recharts';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Alert from './Components/Alert.jsx';
import './DailyView.css';
import { isMobile } from 'react-device-detect';
import Ycircularbar from './Components/Ycircularbar.jsx';
function DailyView() {
    let [btn, setbtn] = useState(false);
    let token = localStorage.getItem('token');
    let [data, setData] = useState([]);
    let [bestScore, setBestScore] = useState(0);
    let [weeklyAvg, setWeeklyAvg] = useState(0);
    let [date, setDate] = useState(0);
    let [yesScore, setYesScore] = useState(0);
    let [task, setTask] = useState([]);
    let [compTask, setCompTask] = useState(0);
    useEffect(() => {
        axios.post(`${process.env.REACT_APP_API_URL}/Check-Yearly-Score`, {}, {
            headers: {
                authorization: `Bearer ${token}`
            }
        }).then((res) => {
            const apiData = res.data.message || [];
            const result = [];
            const today = new Date();
            const year1 = today.getFullYear();
            const month1 = today.getMonth();
            const todayDate = today.getDate();
            for (let m = 0; m <= month1; m++) {
                const daysInMonth = (m === month1) ? todayDate : new Date(year1, m + 1, 0).getDate();
                for (let dayNum = 1; dayNum <= daysInMonth; dayNum++) {
                    const d = new Date(year1, m, dayNum);
                    const day = String(d.getDate()).padStart(2, "0");
                    const month = String(d.getMonth() + 1).padStart(2, "0");
                    const year = d.getFullYear();
                    const dateStr = `${day}/${month}/${year}`;
                    const found = apiData.find(x => x.DateOfDay === dateStr);
                    result.push({
                        DateOfDay: dateStr,
                        Avg: found ? found.Avg : 0
                    });
                }
            }

            setData(result);
        }).catch((err) => {
            console.log(err);
        })
    }, []);
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/taskInfo`, {
            headers: {
                authorization: `Bearer ${token}`,
                'content-type': 'application/json'
            }
        }).then((res) => {
            if (res.data.data === 'Done') {
                if (res.data.message === "no task submitted")
                    setTask([]);
                else {
                    console.log(res.data.message)
                    setTask(res.data.message);
                }
            }
        }).catch((err) => {
            console.log(err);
        });
    }, [data]);
    useEffect(() => {
        let result = data.reduce((prev, cur) => {
            return cur.Avg < prev ? prev : cur.Avg;
        }, 0);
        setBestScore(result);
    }, [data])
    useEffect(() => {
        let sum = data.reduce((prev, cur) => {
            return prev + cur.Avg;
        }, 0);
        let avg = sum / data.length;
        setWeeklyAvg(avg);
    }, [data])
    useEffect(() => {
        if (data.length === 0)
            return
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const yesDate = yesterday.toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric"
        });
        setDate(yesDate);
        let score = data.slice(-2)[0].Avg ?? 0;
        setYesScore(score);
    }, [data]);
    let status = () => {
        if (yesScore < 50) {
            return (<span><p>Bad: &#128546;</p>  </span>)
        }
        else if (yesScore >= 50 && yesScore <= 70) {
            return (<span><p>Poor: &#128533;</p> </span>)
        }
        else if (yesScore > 70 && yesScore <= 85) {
            return (<span><p>Good: &#128578;</p> </span>)
        }
        else {
            return (<span>Excellent: &#128079;</span>)
        }
    }
    useEffect(() => {
        if (task.length === 0)
            return
        let completeTask = (yesScore*task.length)/100;
        setCompTask(completeTask);
    }, [task])
    return (
        <div className='body'>
            <header>
                <nav className="navbar navbar-expand-lg">
                    <div className="mc-navbar">
                        <Link className="navbar-brand text-color" href="#">GrowthTracker</Link>
                        <button className="navbar-toggler me-5" onClick={() => { setbtn(!btn) }} type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className={`${btn ? 'btn-close' : 'navbar-toggler-icon'}`}></span>
                        </button>
                    </div>
                    <div className='mc-close-width d-flex'>
                        <div className="collapse navbar-collapse mc-nav-center" id="navbarSupportedContent">
                            <ul className="navbar-nav me-auto ms-0 ms-md-5  mb-2 mb-lg-0">
                                <li className="nav-item">
                                    <Link className="nav-Link mc-normalbtn" aria-current="page" to="/Home">Day</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-Link mc-normalbtn" to="/Month">Month</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-Link mc-normalbtn" to="/Year">Year</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-Link mc-normalbtn text-primary" to="#" style={{ width: "200px" }}>Yearly Progress</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </header>
            <main className='weely-view-main'>
                <div className='header-title'>
                    <div className='d-flex'>
                        <div className='line'></div>
                        <div>
                            <div className='fs-1 ' style={{ fontWeight: "600" }}>Task Progress</div>
                            <div style={{ color: "grey" }}>Monitor your daily and Yearly achievements</div>
                        </div>
                    </div>
                </div>
                <div className='circular-bar-box'>
                    <div className='d-flex titles'>
                        <div className='calender-icon'>
                            <span className="material-symbols-outlined">
                                today
                            </span>
                        </div>
                        <div>
                            <div>
                                <span className='fs-4 ps-2' style={{ fontWeight: "600" }}>Yesterday's Performance</span>
                            </div>
                            <div>
                                <span className='ps-2' style={{ color: "grey" }}>{date}</span>
                            </div>
                        </div>
                    </div>
                    <div className='h-25 mb-2'>
                        <Ycircularbar />
                    </div>
                    <div className='progress-box border border-grey green-box mb-5'>
                        <div className='bar-box-1'>
                            <div className="">
                                <span className='material-symbols-outlined green-theme background-none' style={{ fontSize: "35px" }}>add_task</span>
                            </div>
                            <div className="bar-box-icon-right" >
                                <span className='material-symbols-outlined circle green-theme' style={{ fontSize: "35px" }}>check</span>
                            </div>
                        </div>
                        <div className='bar-box-2'>
                            <div className='green-theme background-none'>
                                Task Completed
                            </div>

                        </div>
                        <div className='bar-box-3'>
                            <div className='fs-4 fw-bold green-theme background-none'>
                                {compTask.toFixed(1)}
                            </div>
                        </div>

                    </div>
                    <div className='progress-box border border-grey blue-box mb-5'>
                        <div className='bar-box-1'>
                            <div className="">
                                <span className='material-symbols-outlined blue-theme background-none' style={{ fontSize: "35px" }}>bolt</span>
                            </div>
                            <div className="bar-box-icon-right" >
                                <span className='material-symbols-outlined circle blue-theme' style={{ fontSize: "35px" }}>check</span>
                            </div>
                        </div>
                        <div className='bar-box-2'>
                            <div className='blue-theme background-none'>
                                Total Task
                            </div>

                        </div>
                        <div className='bar-box-3'>
                            <div className='fs-4 fw-bold blue-theme background-none'>
                                {task.length ?? 0}
                            </div>
                        </div>
                    </div>
                    <div className='progress-box border border-grey blue-box mb-2 d-flex align-item-center flex-row  purple-theme'>
                        <div className='h-100 d-flex align-items-center justify-content-start me-2' >
                            <span className="material-symbols-outlined performace-icon">
                                license
                            </span>
                        </div>
                        <div className='d-flex justify-content-center align-items-start background-none flex-column'>
                            <div className='purple-theme background-none'>
                                Performance Status
                            </div>
                            <div className='fs-4 fw-bold purple-theme background-none'>
                                {
                                    status()
                                }
                            </div>
                        </div>
                    </div>
                </div>
                <div className='weekly-icon-container '>
                    <div className='d-flex' id="icon2">
                        <span className="material-symbols-outlined">
                            moving
                        </span>
                    </div>
                    <div>
                        <div className='ms-3 fs-3 fw-bold'>
                            Yearly Progress Overview
                        </div>
                        <div className='ms-3 text-grey'>
                            Track your consistent over the last 30 days
                        </div>
                    </div>
                </div>
                <div className='bar-box'>

                    <div className='bar-container'>
                        <ResponsiveContainer className="mc-barChart">
                            <BarChart data={data}>
                                <Tooltip></Tooltip>
                                <Legend></Legend>
                                <CartesianGrid></CartesianGrid>
                                <XAxis dataKey="DateOfDay"></XAxis>
                                <YAxis dataKey="Avg" domain={[0, 100]}></YAxis>
                                <Bar fill="blue" dataKey="Avg"></Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
                <div className='bar-box' id="bar-box2">
                    <div className='panels panel-blue' id="">
                        <div className='weekly-icons-1 circle'>
                            <span className="material-symbols-outlined">
                                moving
                            </span>
                        </div>
                        <div className='mt-3 mt-md-1' style={{ fontWeight: "600" }}>
                            Yearly Average
                        </div>
                        <div className='fs-2 fw-bold'>
                            {isNaN(weeklyAvg.toFixed(1)) ? 0 : weeklyAvg.toFixed(1) ?? 0}%
                        </div>
                    </div>
                    <div className='panels panel-purple'>
                        <div className='weekly-icons-2 circle'>
                            <span className="material-symbols-outlined">
                                stars
                            </span>
                        </div>
                        <div className='mt-3 mt-md-1' style={{ fontWeight: "600" }}>
                            Best Performance
                        </div>
                        <div className='fs-2 fw-bold'>
                            {bestScore}%
                        </div>
                    </div>
                    <div className='panels mb-0 reddish-theme'>
                        <div className='weekly-icons-3 circle'>
                            <span className="material-symbols-outlined">
                                task_alt
                            </span>
                        </div>
                        <div className='mt-3 mt-md-1' style={{ fontWeight: "600" }}>
                            Yesterday Score
                        </div>
                        <div className='fs-2 fw-bold'>
                            {yesScore.toFixed(1)}%
                        </div>
                    </div>
                </div>
                <div className='last-panel'>
                    <div className='insight-heading'>
                        <div className='circle Insight-icon'>
                            <span className="material-symbols-outlined">
                                bolt
                            </span>
                        </div>
                        <div>
                            <div className='fs-2 fw-bold'>Yearly Insight</div>
                        </div>
                    </div>
                    <div className='mt-4'>
                        Great work yesterday with 85% task completion! you are on task with an 81%
                        Yearly average. Stay focused and you'll even higher achievements! &#128170;
                    </div>
                </div>

            </main>
            <footer className='p-5'>
                <div className='h4'>
                    GoalTracker
                </div>
                <div>
                    Empowering you to achieve your dreams, one goal at Link time.
                </div>
                <div>
                    © 2024 GoalTracker. All rights reserved.
                </div>
            </footer>
        </div>
    )
}
export default DailyView;