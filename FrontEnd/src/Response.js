import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import YCirProgress from './Components/YCirProgress.jsx';
import Alert from './Components/Alert.jsx';
import ResWarningBox from './Components/ResWarningBox.jsx';
export default function Response() {
    let token = localStorage.getItem('token');
    let [database, setDatabase] = useState([]);
    let [button, setButton] = useState([]);
    let [count, setCount] = useState({
        Marks: 0,
        Total: 0
    });
    useEffect(
        () => {
            //Task2:--
            axios.get('http://localhost:7000/send-goals', {
                headers: {
                    authorization : `Bearer ${token}`,
                    'content-type': 'application/json'
                }
            })
            .then((res) => {
                    let data = res.data.message;
                    setDatabase(data);
            })
            .catch((err) => {
                    console.log(err);
            })
        },
        []);
    let setButtonPath = (value) => {
        let oldData = [...button];
        oldData.push(value);
        setButton(oldData);
    }
    let setCountPath = (value) => {
        let oldCount = { ...count }
        if (value === 1) {
            oldCount["Marks"] = ++oldCount["Marks"];
        }
        oldCount["Total"] = ++oldCount["Total"];
        setCount(oldCount)
    }
    let [submit, setSubmit] = useState(0);
    let submitForm = (event) => {
        event.preventDefault();
        axios.get('http://localhost:7000/Is-Submit', {
            headers: {
                authorization: `Bearer ${token}`,
                'content-type': 'application/json'
            }
        })
            .then((res) => {
                if (res.data.message === 'False') {
                    toast.error("Response already submited!");
                }
                else {
                    axios.post('http://localhost:7000/Submit-Response', count, {
                        headers: {
                            authorization:`Bearer ${token}`,
                        }
                    }).then((res) => {
                        setSubmit(++submit);
                        toast.success("Response Submited!");
                    }).catch((err) => {
                        console.log(err);
                    })
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }
    return (
        <div>
            <ResWarningBox identity={"Day"}/>
            <Alert/>
            <ToastContainer />
            <div className="Header">
                <ul className="nav nav-underline">
                    <li className="nav-item">
                        <Link className="nav-link" to="/Home">Daily</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/Month">Month</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/Year">Year</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link active" aria-current="page" to="#">Response</Link>
                    </li>
                </ul>
            </div>
            <div>
                <YCirProgress />
            </div>
            <div className='Goals-list'>{
                database.map((value, indexNumber) => {
                    return (
                        <div className="alert border-dark alert-dismissible fade show mc-res-blocks" style={{ minWidth: "65%", maxWidth: "65%" }} key={indexNumber}>
                            <div className='mc-para'>{value.Goal_text}</div>
                            <div className='mc-res-button-block'>
                                <div className='mc-res-button'>
                                    <input type="checkbox" id='form-check-input' className={`btn btn-primary`} onClick={() => { setButtonPath(indexNumber); setCountPath(1) }} disabled={button.includes(indexNumber)}/>
                                    <input type="checkbox" id='form-check-input' className={`btn btn-primary`} onClick={() => { setButtonPath(indexNumber); setCountPath(0) }} disabled={button.includes(indexNumber)}/>
                                </div>
                            </div>
                        </div>
                    );
                })
            }
            </div>
            <div className="Submit-Section">
                <button type="button" className="btn btn-success" disabled={submit > 0} onClick={submitForm} >{submit > 0 ? "Submited" : "Submit"}</button>
            </div>
        </div>
    )
}
