import { Link } from 'react-router-dom';
import MCirProgress from './Components/MCirProgress.jsx';
import { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import GoalWarningBox from './Components/GoalWarningBox.jsx';
import GoalPlus from './addGoal.svg';
export default function MonthlySetGoals() {
    let [Items, setItem] = useState([]);
    let token = localStorage.getItem("token");
    let [submitBTN, setsubmitBTN] = useState(false);
    let FormSubmit = (event) => {
        event.preventDefault();
        let data = event.target.items.value;
        if (!Items.includes(data)) {
            let OldData = [...Items];
            OldData.push(data);
            setItem(OldData);
        }
        else {
            toast.error("Task already added");
        }
    }
    let removeItem = (index) => {
        let newData = Items.filter((values, indexNumber) => {
            return index !== indexNumber;
        });
        setItem(newData);
    }
    let List = () => {
        return Items.map((value, index) => {
            return (
                <div key={index}>
                    <div className="alert alert-dismissible fade show mc-lists d-flex align-items-center" role="alert"  >
                        <div style={{ height: "50px" }} className='d-flex align-items-center'><img src={GoalPlus} class="h-50 me-3"></img></div>
                        <div>{value}</div>
                        <button type="button" className="btn-close" aria-label="RemoveItem" onClick={() => removeItem(index)}></button>
                    </div>
                </div>
            )
        })
    };
    let SubmitGoals = () => {
        if (Items.length === 0) {
            toast.error("Add your targets firstly");
            return
        }
        axios.post('http://localhost:7000/Monthly/Goals', Items, {
            headers: {
                authorization: `Bearer ${token}`,
                "content-type": "application/json"
            }
        }).then((res) => {
            toast.success("Goal Submitted!");
            setsubmitBTN(true);
        });
    }
    return (
        <div>
            <GoalWarningBox />
            <ToastContainer />
            <div className="Header">
                <ul className="nav nav-underline">
                    <li className="nav-item">
                        <Link className="nav-link" to="/Home" aria-label="daily">Daily</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/Month" aria-label="month">Month</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/Year" aria-label="year">Year</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link active" aria-current="page" to="#">Monthly Goals</Link>
                    </li>
                </ul>
            </div>
            <div>
                <MCirProgress />
            </div>
            <div>
                <form onSubmit={FormSubmit}>
                    <div className='Input-Section'>
                        <div className="input-group">
                            <input type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" placeholder='Add Targets' required name='items'></input>
                        </div>
                        <div>
                            <button className="btn btn-primary" >Add</button>
                        </div>
                    </div>
                </form>
                <div className='Goals-list'>
                    {
                        List()
                    }
                </div>
            </div>
            <div className="Submit-Section">
                <button type="button" className="btn btn-success" onClick={SubmitGoals} disabled={submitBTN}>Submit Goals</button>
            </div>
        </div>
    )
}