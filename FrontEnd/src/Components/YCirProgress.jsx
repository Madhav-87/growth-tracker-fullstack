import React from 'react'
import { useEffect, useState } from 'react';
import axios from 'axios';
import '../DailyGoals2.css';
import { buildStyles, CircularProgressbar } from 'react-circular-progressbar';
export default function YCirProgress() {
    let token = localStorage.getItem('token');
    let [Score, setScore] = useState(0);
    let [marks, setMarks] = useState(0);
    useEffect(() => {
        axios.post(`${REACT_APP_URL}/Score`, {}, {
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
    let horizontalbar={
        width:`${marks}%`,
        height:'100%',
        background:'#000000',
        borderRadius:'4px',
        transition:'width 0.3s ease'
    }
    return (
        <div className="mc-container-circularbar">
            <div className="mc-container-title">
                <label className='r'>
                     <input type="radio" name="opt" defaultChecked/>
                     <span></span>
                </label>
                <span className="h4 ">Yesterday's Progress:</span>
            </div>
            <div className='mc-circularbar'>
                <CircularProgressbar
                    minValue={0}
                    maxValue={100}
                    value={marks}
                    text={`${marks}%`}
                    strokeWidth={8}
                    styles={buildStyles({
                        textColor: "black",
                        trailColor: "#f2f2f2",
                        pathColor: "#6c63ff",
                        textSize: "16px",
                        pathTransition: "ease",
                        strokeLinecap: "butt"
                    })}
                ></CircularProgressbar>

            </div>
            <div style={{ marginTop: '20px', width: '200px', marginLeft: 'auto', marginRight: 'auto', height: '8px', background: '#f2f2f2', borderRadius: '4px' }}>
                    <div style={horizontalbar}>

                    </div>
            </div>
        </div>
    )
}
