import React from 'react'
import { useEffect, useState } from 'react';
import axios from 'axios';
import './Ycircularbar.css';
import { buildStyles, CircularProgressbar } from 'react-circular-progressbar';
export default function YCirProgress() {
    let token = localStorage.getItem('token');
    let [Score, setScore] = useState(0);
    let [marks, setMarks] = useState(0);
    useEffect(() => {
        axios.post(`${process.env.REACT_APP_API_URL}/Score`, {}, {
            headers: {
                authorization: `Bearer ${token}`,
                'content-type': 'application/json'
            }
        }).then((res) => {
            if (res.data.data === 'Done') {
                let data = Math.round(parseFloat(res.data.message)* 10);
                setScore(data);
            }
        }).catch((err) => {
            console.log(err);
        });
    }, []);
    useEffect(() => {
        const interval = setInterval(() => {
            setMarks((prev) => {
                if (prev < Score) {
                    return prev + 1;
                }
                else {
                    clearInterval(interval);
                    return Score;
                }
            })
        }, 20);
        return () => clearInterval(interval);
    }, [Score]);
    return (
        <div className="mc-container-cirbar">
            <div className='mc-circbar'>
                <CircularProgressbar
                    minValue={0}
                    maxValue={100}
                    value={marks}
                    text={`${marks}%`}
                    strokeWidth={8}
                    styles={buildStyles({
                        textColor: "black",
                        trailColor: "silver",
                        pathColor: "blue",
                        textSize: "16px",
                        pathTransition: "ease",
                        strokeLinecap:"round"
                    })}
                ></CircularProgressbar>

            </div>
        </div>
    )
}
