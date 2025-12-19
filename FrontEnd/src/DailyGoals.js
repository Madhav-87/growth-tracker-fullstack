import { Link } from 'react-router-dom';
import './App.css';
import { useState } from 'react';
import axios from 'axios';
import Alert from './Components/Alert.jsx';
import Notification from './Components/Notification.jsx';
import addTask from './addTask.svg';
import { toast, ToastContainer } from 'react-toastify';
import YCirProgress from './Components/YCirProgress.jsx';
import GoalWarningBox from './Components/GoalWarningBox.jsx';
import GoalPlus from './addGoal.svg';
export default function DailyGoals() {
    let token = localStorage.getItem('token');
    let [Goalslist, setGoals] = useState([]);
    let [visible, setVisible] = useState(true);
    let sendlist = (event) => {
        event.preventDefault();
        let data = event.target.items.value;
        if (!Goalslist.includes(data)) {
            let finalData = [...Goalslist, data];
            setGoals(finalData);
        }
        else {
            toast.error('Task already added');
        }
    }
    let itemlist = Goalslist.map((value, indexNumber) => {
        return (
            <div key={indexNumber}>
                <div className="alert alert-dismissible fade show mc-lists d-flex align-items-center" role="alert">
                    <div style={{ height: "50px" }} className='d-flex align-items-center'><img src={GoalPlus} class="h-50 me-3"></img></div>
                    <div className='p-2'>{value}</div>

                    <button type="button" className="btn-close" aria-label="RemoveItem" onClick={() => removeItem(indexNumber)}></button>
                </div>
            </div>
        );
    })
    let removeItem = (index) => {
        let finalData = Goalslist.filter((value, indexNumber) => {
            return indexNumber !== index;
        })
        setGoals(finalData);
    }
    let submitGoals = () => {
        if (Goalslist.length === 0) {
            toast.error("Add your targets firstly");
            return
        }
        setVisible(!visible);
        if (visible === false) {

        }
        axios.post(`${process.env.REACT_APP_API_URL}/daily-goals-submit`, Goalslist, {
            headers: {
                authorization: `Bearer ${token}`,
                'content-type': 'application/json'
            }
        })
            .then((res) => {
                if (res.data.message === "Done!") {
                    toast.success("Record Submited!");
                }
                else {
                    toast.error("Fail");
                }
            })
            .catch((err) => {
                console.log(err);
            })
    }
    return (
        <div>
            <Notification element={visible} />
            <Alert />
            <GoalWarningBox />
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
                        <Link className="nav-link active" aria-current="page" to="#">Daily Goals</Link>
                    </li>
                </ul>
            </div>
            <div className='panel-body'>


                <div>
                    <YCirProgress />
                </div>
                <form onSubmit={sendlist}>
                    <div className='Input-Section'>
                        <div className="input-group mt-2">
                            <input type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" placeholder='Add Targets' name='items'></input>
                        </div>
                        <div>
                            <button className="btn btn-primary mt-2 me-2">Add</button>
                        </div>
                    </div>
                </form>
                <div className='Goals-list'>
                    {
                        itemlist.length === 0
                            ?
                            <div className="DailyGoalMess">
                                <img src={addTask} className='h-75'></img><span>Please add Goals</span>
                            </div>
                            :
                            itemlist
                    }
                </div>
                <div className="Submit-Section">
                    <button type="button" onClick={submitGoals} className="btn btn-success">Submit Goals</button>
                </div>
            </div>
        </div>
    )
}
