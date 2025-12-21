import { useEffect, useState } from 'react';
import axios from 'axios';
import addTask from '../../../assets/images/addTask.svg';
import { toast, ToastContainer } from 'react-toastify';
import ResWarningBox from '../../../components/common/ResWarningBox.jsx';
import '../../../styles/Panel.css';
import '../../../styles/Response.css';
import Drawer from '../../../components/common/Drawer.jsx';
import Footer from '../../../components/layout/Footer.jsx';
import Header from '../../../components/layout/Header.jsx';
export default function MonthResponse() {
    const token = localStorage.getItem("token");
    useEffect(() => {
        axios.post(`${process.env.REACT_APP_API_URL}/Monthly/Response`, {}, {
            headers: {
                authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        }).then((res) => {
            setDatabase(res.data.data);
        }).catch((err) => {
            console.log(err);
        });
    }, [])
    let [database, setDatabase] = useState([]);
    let [button, setbutton] = useState([]);
    let [submit, setSubmit] = useState(0);
    let [count, setCount] = useState({
        Marks: 0,
        Total: 0
    });
    let setButtonPath = (index) => {
        let oldData = [...button];
        oldData.push(index);
        setbutton(oldData);
    }
    let setCountPath = (value) => {
        if (value === 1) {
            count["Marks"] = ++count["Marks"] ;
        }
        count["Total"] = ++count["Total"];
    }
    let submitForm = () => {
        let avg = count["Marks"] / count["Total"];
        axios.post(`${process.env.REACT_APP_API_URL}/Monthly/Response/Score/Check`, {}, {
            headers: {
                authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        }).then((res) => {
            if (res.data.data === "Duplicate") {
                toast.error("Record already submited!");
            }
            else if (res.data.data === "allowed") {
                axios.post(`${process.env.REACT_APP_API_URL}/Monthly/Response/Score`, {
                    marks: avg
                }, {
                    headers: {
                        authorization: `Bearer ${token}`,
                        "Content-Type": "application/json"
                    }
                }).then((res) => {
                    if (res.data.message === "Done") {
                        setSubmit(++submit);
                        toast.success("Record Submited");
                    }
                    if (res.data.message === "Fail") {
                        toast.error("Try after some time");
                    }
                }).catch((err) => {
                    console.log(err);
                });
            }
            else {
                console.log(res.data.data);
            }
        }).catch((err) => {
            console.log(err);
        });
    }
    let setGreen = (e) => {
        e.target.style.backgroundColor = "green";
        e.target.style.color = "white";
    }
    let setRed = (e) => {
        e.target.style.backgroundColor = "red";
        e.target.style.color = "white";
    }
    return (
        <div className='response-page-body'>
                <Drawer/>
            <ResWarningBox identity={"Month"} />
            <ToastContainer />
            <Header title={'Monthly Response'}/>
            <main>
                <div className="section-header mt-0">
                    <div className='fs-2 h1'>
                        Monthly Response Section
                    </div>
                    <div className='small-txt'>
                        Review your goals and mark your progress for today
                    </div>
                </div>
                <div className='status-panel'>
                    <div className='status-bar'>
                        <div className='small-txt'>
                            Total Goals
                        </div>
                        <div className='status-value'>
                            {database.length}
                        </div>
                    </div>
                    <div className='status-bar'>
                        <div className='small-txt'>
                            Complete
                        </div>
                        <div className='status-value text-success'>
                            {count["Marks"]}
                        </div>
                    </div>
                    <div className='status-bar'>
                        <div className='small-txt'>
                            Responded
                        </div>
                        <div className='status-value ' style={{ color: "purple" }}>
                            {count["Total"]}/{database.length}
                        </div>
                    </div>
                    <div className='status-bar'>
                        <div className='small-txt'>
                            Total Score
                        </div>
                        <div className='status-value ' style={{ color: "purple" }}>
                            {database.length ? (count["Marks"] / database.length) * 100 : 0}
                        </div>
                    </div>
                </div>
                {/* Response Progress */}
                <div className='section-header'>
                    <div className='coustome-width'>
                        <div className='status-bar mobile-width'>
                            <div className='small-txt mt-2'>
                                Response Progress
                            </div>
                            <div className='w-100 mt-3'>
                                <div className="progress" role="progressbar" aria-label="Basic example" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">
                                    <div className="progress-bar" style={{ width: `${(count["Total"] / database.length) * 100}%` }}></div>
                                </div>
                                <div className='d-horizontal mt-1'>
                                    <div className='me-1'>
                                        {database.length - count["Total"]}
                                    </div>
                                    <div>
                                        goals(s) remaining
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/*Goals section */}
                {database.length === 0
                    ?
                    <div className="DailyGoalMess">
                        <img src={addTask} className='h-75'></img><span>Monthly's goals not submited yet</span>
                    </div>
                    :
                    database.map((value, indexNumber) => {
                        return (
                            <div className='section-header'>
                                <div className='Goal-panel panel-width'>
                                    <div className='Goal-header-conatiner'>
                                        <div className='Goal-number circle'>
                                            {indexNumber + 1}
                                        </div>
                                        <div className='Goal-header'>
                                            {value.Goal_text}
                                        </div>
                                    </div>
                                    <div className='d-flex align-items-center'>
                                        <div className='Goal-Buttons'>
                                            <button className='mt-3 me-2 success' onClick={(event) => { setButtonPath(indexNumber); setCountPath(1); setGreen(event) }} disabled={button.includes(indexNumber)}>
                                                <span className="me-2 material-symbols-outlined">
                                                    check
                                                </span>Complete</button>
                                        </div>
                                        <div className='Goal-Buttons'>
                                            <button className='ms-2 mt-3 reject' onClick={(event) => { setButtonPath(indexNumber); setCountPath(0); setRed(event) }} disabled={button.includes(indexNumber)}>
                                                <span className="me-2 material-symbols-outlined">
                                                    close
                                                </span>
                                                Not Complete</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}

                {/* Submit Button Section */}
                <div className='d-vertical mt-5'>
                    <div>
                        <button className={`d-horizontal ${count["Total"] === database.length ? 'submited' : 'submit-btn '}`} disabled={submit > 0} onClick={submitForm} ><span className="me-2 material-symbols-outlined">
                            trending_up
                        </span>
                            {submit > 0 ? "Submited" : "Submit Response"}</button>
                    </div>
                    <div >

                        {count["Total"] === database.length ? "" :
                            <div className='d-horizontal text-danger mt-4'><span className="me-2  border border-danger circle alert-txt material-symbols-outlined">
                                priority_high
                            </span>
                                <span>Please respond to all goals before submitting</span>
                            </div>
                        }
                    </div>
                </div>
            </main>
           <Footer/>
        </div>
    )
}
