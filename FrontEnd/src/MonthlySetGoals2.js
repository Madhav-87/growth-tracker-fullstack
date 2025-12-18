
import React, { useState } from 'react'
import './DailyGoals2.css';
import person from './person.png';
import axios from 'axios';
import Alert from './Components/Alert.jsx';
import { isMobile } from 'react-device-detect';
import Notification from './Components/Notification.jsx';
import addTask from './addTask.svg';
import { toast, ToastContainer } from 'react-toastify';
import YCirProgress from './YCirProgress';
import {Link} from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import GoalWarningBox from './Components/GoalWarningBox.jsx';
import GoalPlus from './addGoal.svg';
import animeMan from './Images/animeMan.png';
import Drawer from './Components/Drawer.jsx';
export default function App() {
    let [btn, setbtn] = useState(false);
  let [profile, setProfile] = useState(false);
  // let userName=jwtDecode(localStorage.getItem('token')).name;
  //   let clearCash=()=>{
  //       localStorage.clear();
  //       window.location.reload();
  //   }
    let [Items, setItem] = useState([]);
    let token = localStorage.getItem("token" )|| null;
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
    let List =Items.map((value, indexNumber) => {
        return (
            <div key={indexNumber}>
                <div className="alert alert-dismissible fade show mc-items-list d-flex align-items-center" role="alert">
                    <div style={{ height: "50px" }} className='d-flex align-items-center'><img src={GoalPlus} class="h-50 me-3"></img></div>
                    <div className='p-2'>{value}</div>
                   
                    <button type="button" className="btn-close" aria-label="RemoveItem" onClick={() => removeItem(indexNumber)}></button>
                </div>
            </div>
        );
    })
    let SubmitGoals = () => {
        if (Items.length === 0) {
            toast.error("Add your targets firstly");
            return
        }
        axios.post(`${REACT_APP_URL}/Monthly/Goals`, Items, {
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
            <Drawer/>
         <Alert />
            <GoalWarningBox />
            <ToastContainer />
        <header>
        <nav class="navbar navbar-expand-lg">
          <div class="mc-navbar">
            <Link class="navbar-brand text-color" href="#">GrowthTracker</Link>
            <button class="navbar-toggler" onClick={() => { setbtn(!btn) }} type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span class={`${btn ? 'btn-close' : 'navbar-toggler-icon'}`}></span>
            </button>
          </div>
          <div className='mc-close-width d-flex'>
            <div class="collapse navbar-collapse mc-nav-center" id="navbarSupportedContent">
              <ul class="navbar-nav me-auto ms-0 ms-md-5  mb-2 mb-lg-0">
                <li class="nav-item">
                  <Link class="nav-Link mc-normalbtn" aria-current="page" to="/Home">Day</Link>
                </li>
                <li class="nav-item">
                  <Link class="nav-Link mc-normalbtn" to="/Month">Month</Link>
                </li>
                <li class="nav-item">
                  <Link class="nav-Link mc-normalbtn" to="/Year">Year</Link>
                </li>
                <li class="nav-item">
                  <Link class="nav-Link mc-normalbtn text-primary" to="#" style={{width:"200px"}}>Monthly Goals</Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </header>
      <main className='panel-body'>
        {
          isMobile
            ?
            null
            :
            (
              <div className='character-img'>
                <img src={animeMan} alt="image" height="600px" />
              </div>
            )
        }
        <div className='w-100'>
            <div className='d-flex align-items-center justify-content-center fs-2 fw-semibold pt-4 mb-1'>
                Your Monthly Goals
            </div>
            <div className='d-flex align-items-center justify-content-center mb-4' style={{ fontSize: "20px " }}>
            Small steps daily, Big result monthly.
          </div>
            <div className='mc-progress-box'>
                <div className='mc-progress'>
                    <YCirProgress/>
                </div>
            </div>
            <div className='mc-input-boxes'>
               <form onSubmit={FormSubmit} style={{display:'flex',width:'100%'}}>
                <div className="input-group ps-mb-3 mt-2">
                        <input type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" placeholder='Add a new goal' name='items'></input>
                    </div>
                    <div>
                        <button className="btn btn-primary mt-2 ms-4">Add</button>
                    </div>
               </form>
            </div>
             <div className='d-flex align-items-center mc-plaintext mb-3' >
            Tip: Momentum makes everything easier.
          </div>
            <div className='goals-panel'>
               {
                    List.length === 0
                        ?
                        <div className="DailyGoalMess">
                            <img src={addTask} className='h-75'></img><span>Please add Goals</span>
                            <span style={{textAlign:"center"}}>Your Goals appear here and sync with your progress.</span>
                        </div>
                        :
                        List
                }
            </div>
            <div className='button-section'>
            <button type="button" onClick={SubmitGoals}   className="btn btn-success" disabled={submitBTN}>Submit Goals</button>
            </div>
           
        </div>
      </main>
       <footer className='text-center'>
        <div className='h4'>
          GoalTracker
        </div>
        <div>
          Empowering you to achieve your dreams, one goal at Link time.
        </div>
        <div>
          © 2024 GoalTracker. All rights reserved.
        </div>
      </footer>
       </div>
    )
}
