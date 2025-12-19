import img1 from '../Counting.png';
import axios from 'axios';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import { useState, useEffect } from 'react';
export default function YearlyGoals() {
    let token = localStorage.getItem("token");
    let [Response, setResponse] = useState(true);
    let [Score, setScore] = useState(0);
    useEffect(() => {
        axios.post(`${process.env.REACT_APP_API_URL}/Year/Score`, {}, {
            headers: {
                authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        }).then((res) => {
            if (res.data.message === "fewDays") {
                setResponse(false);
            }
            else {
                const marks = Math.round(res.data.message);
                const interval = setInterval(() => {
                    setScore((prev) => {
                        if (prev < marks) {
                            return prev + 1;
                        }
                        else {
                            clearInterval(interval);
                            return marks;
                        }
                    });
                }, 20);
            }
        }).catch((err) => {
                console.log(err);
            });
    }, []);
    return (
        <div>
            {
                Response
                    ?
                    <div className='mc-container-circularbar '>
                        <div className="mc-container-title">
                            <span className="h4">Last month  progress:</span>
                        </div>
                        <div className='mc-circularbar'>
                            <CircularProgressbar
                                minValue={0}
                                maxValue={100}
                                value={Score}
                                text={`${Score}%`}
                                styles={buildStyles({
                                    textColor: "black",
                                    trailColor: "silver",
                                    pathColor: "blue",
                                    strokeLineCap: "round",
                                    pathTransition: "ease",
                                    textSize: "16px"
                                })}
                            ></CircularProgressbar>
                        </div>
                    </div>
                    :
                    <div className='mc-container-circularbar '>
                        <div className="mc-container-title">
                            <span className="h4">Last month progress still in progress:</span>
                        </div>
                        <img src={img1} className="img-fluid h-100"></img>
                    </div>
            }
        </div>
    )
}