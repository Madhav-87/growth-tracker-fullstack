import axios from 'axios';
import { Link } from 'react-router-dom';
import YearlyCirPro from './Components/YearlyCirPro.jsx';
import ResWarningBox from './Components/ResWarningBox.jsx';
import { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
export default function YearlyRes() {
    const token = localStorage.getItem('token');
    let [list, setList] = useState([]);
    let [submit,setsubmitBTN]=useState(false);
    let [btn, setBtn] = useState([]);
    let [Object, setObject] = useState({
        Marks: "",
        Total: ""
    });
    useEffect(() => {
        axios.post('http://localhost:7000/Yearly/Response', {}, {
            headers: {
                authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        }).then((res) => {
            if (res.data.message === "Done") {
                setList(res.data.data);
            }
        }).catch((err) => {
            console.log(err);
        });
    }, []);
    let calculateMarks = (value) => {
        if (value == 1) {
            Object["Marks"] = ++Object["Marks"];
        }
        Object["Total"] = ++Object["Total"];
    }
    let BtnOff = (index) => {
        let OldData = [...btn];
        OldData.push(index);
        setBtn(OldData);
    }
    let Items = list.map((value, index) => {
        return (
            <div className="alert border-dark alert-dismissible fade show mc-res-blocks" style={{ minWidth: "65%", maxWidth: "65%" }} key={index}>
                <div className='mc-para'>{value.Goal_text}</div>
                <div className='mc-res-button-block'>
                    <div className='mc-res-button'>
                        <button id='mc-res-btn1' className={`btn btn-primary`} onClick={() => { calculateMarks(1); BtnOff(index) }} disabled={btn.includes(index) ? true : false}>Complete</button>
                        <button id='mc-res-btn2' className={`btn btn-primary`} onClick={() => { calculateMarks(0); BtnOff(index) }} disabled={btn.includes(index) ? true : false}>Not Complete</button>
                    </div>
                </div>
            </div >
        )
    })
    let submitGoal = () => {
        axios.post('http://localhost:7000/Year/Response/Check', {}, {
            headers: {
                authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        }).then((res) => {
            if (res.data.message === "not allowed") {
                toast.error("Response already submited!");
            }
            else {
                axios.post('http://localhost:7000/Year/Response/Score', Object, {
                    headers: {
                        authorization: `Bearer ${token}`,
                        "Content-Type": "application/json"
                    }
                }).then((res)=>{
                    if(res.data.message==="Done"){
                        setsubmitBTN(true);
                        toast.success("Record Submited !");
                    }
                    if(res.data.message==="Fail"){
                        toast.error("Try after some time");
                    }
                })
            }
        }).catch((err)=>{
            console.log(err);
        })
    }
    return (
        <div>
            <ToastContainer />
            <ResWarningBox identity={"Year"} />
            <div className="Header">
                <ul className="nav nav-underline">
                    <li className="nav-item">
                        <Link className="nav-link" aria-current="page" to="/Home">Daily</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/Month">Month</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/Year">Year</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link active" to="#">Year Response</Link>
                    </li>
                </ul>
            </div>
            <div>
                <YearlyCirPro />
            </div>
            <div className='Goals-list'>
                {Items}
            </div>
            <div className="Submit-Section">
                <button type="button" className="btn btn-success" onClick={()=>submitGoal()} disabled={submit}>{submit?"Submited":"Submit"}</button>
            </div>
        </div>
    )
}