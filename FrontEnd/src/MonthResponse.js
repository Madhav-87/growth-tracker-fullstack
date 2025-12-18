import MCirProgress from './Components/MCirProgress.jsx';
import {Link} from 'react-router-dom';
import {useState,useEffect} from 'react';
import axios from 'axios';
import {toast,ToastContainer} from 'react-toastify';
import ResWarningBox from './Components/ResWarningBox.jsx';
export default function MonthResponse(){
    const token=localStorage.getItem("token");
    useEffect(()=>{
        axios.post("http://localhost:7000/Monthly/Response",{},{
            headers:{
                authorization:`Bearer ${token}`,
                "Content-Type":"application/json"
            }
        }).then((res)=>{
            setDatabase(res.data.data);
        }).catch((err)=>{
            console.log(err);
        });
    },[])
    let [Database,setDatabase]=useState([]);
    let [button,setbutton]=useState([]);
    let [submit,setSubmit]=useState(0);
    let [Report,setReport]=useState({
        Marks:0,
        Total:0
    });
    let setButtonPath=(index)=>{
        let oldData=[...button];
        oldData.push(index);
        setbutton(oldData);
    }
    let setCountPath=(value)=>{
        if(value===1){
            Report["Marks"]=Report["Marks"]+10;
        }
        Report["Total"]=++Report["Total"];
    }
    let sendResponse=()=>{
        let avg=Report["Marks"]/Report["Total"];
        axios.post('http://localhost:7000/Monthly/Response/Score/Check',{},{
            headers:{
                authorization:`Bearer ${token}`,
                "Content-Type":"application/json"
            }
        }).then((res)=>{
            if(res.data.data==="Duplicate"){
                toast.error("Record already submited!");
            }
            else if(res.data.data==="allowed"){
                axios.post('http://localhost:7000/Monthly/Response/Score',{
                    marks:avg
                },{
                    headers:{
                        authorization:`Bearer ${token}`,
                        "Content-Type":"application/json"
                    }
                }).then((res)=>{
                    if(res.data.message==="Done"){
                        toast.success("Record Submited");
                    }
                    if(res.data.message==="Fail"){
                        toast.error("Try after some time");
                    }
                }).catch((err)=>{
                    console.log(err);
                });
            }
            else{
                console.log(res.data.data);
            }
        }).catch((err)=>{
            console.log(err);
        });
    }
    return(
        <div>
            <ResWarningBox identity={"Month"}/>
            <ToastContainer/>
            <div className="Header">
                <ul className="nav nav-underline">
                    <li className="nav-item">
                        <Link className="nav-link " aria-current="page" to="/Home">Daily</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/Month">Month</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/Year">Year</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link active" to="#">Response</Link>
                    </li>
                </ul>
            </div>
            <MCirProgress/>
            <div className='Goals-list'>
                {
                    Database.map((value,index)=>{
                        return(
                            <div className="alert border-dark alert-dismissible fade show mc-res-blocks" style={{ minWidth: "65%", maxWidth: "65%" }} key={index}>
                                <div className='mc-para'>{value.Goal_text}</div>
                                <div className='mc-res-button-block'>
                                <div className='mc-res-button'>
                                    <button id='mc-res-btn1' className={`btn btn-primary`} onClick={()=>{setButtonPath(index);setCountPath(1)}} disabled={button.includes(index)}>Complete</button>
                                    <button id='mc-res-btn2' className={`btn btn-primary`} onClick={()=>{setButtonPath(index);setCountPath(0)}} disabled={button.includes(index)}>Not Complete</button>
                                </div>
                            </div>
                            </div>
                        )
                    })
                }
            </div>
             <div className="Submit-Section">
                <button type="button" className="btn btn-success" onClick={()=>{setSubmit(++submit);sendResponse()}} disabled={submit>0?true:false}>{submit>0?"Submited":"Submit"}</button>
            </div>
        </div>
    )
}