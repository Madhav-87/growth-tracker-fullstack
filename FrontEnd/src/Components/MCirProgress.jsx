import React from 'react'
import {CircularProgressbar,buildStyles} from 'react-circular-progressbar';
import {useState,useEffect} from 'react';
import axios from 'axios';
import img1 from '../Counting.png';
export default function MCirProgress() {
    let token=localStorage.getItem("token");
    let [Score,setScore]=useState(0);
    let [marks,setmarks]=useState(0);
    let [response,setResponse]=useState(true);
    useEffect(()=>{
        axios.post(`${REACT_APP_URL}/Month/Score`,{},{
            headers:{
                authorization:`Bearer ${token}`,
                "content-type":"application/json"
            }
        })
        .then((res)=>{
            if(res.data.message==="fewDays"){
                setResponse(false);
            }
            else{
                const currentMarks=Math.round(res.data.message);
                setmarks(currentMarks);
                const interval=setInterval(()=>{
                    setScore((prev)=>{
                        if(prev<Score){
                            return prev+1;
                        }
                        else{
                            clearInterval(interval);
                            return marks;
                        }
                    });
                },20);
            }
        })
        .catch((err)=>{
            console.log(err);
        })
    },[])
  return (
    <div>
        {
            response
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
                    textColor:"black",
                    trailColor:"silver",
                    pathColor:"blue",
                    strokeLinecap:"round",
                    pathTransition:"ease",
                    textSize:"16px"
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
