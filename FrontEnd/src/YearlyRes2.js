import person from './person.png';
import { jwtDecode } from 'jwt-decode';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import addTask from './addTask.svg';
import { toast, ToastContainer } from 'react-toastify';
import YCirProgress from './Components/YCirProgress.jsx';
import ResWarningBox from './Components/ResWarningBox.jsx';
import './Panel.css';
import Drawer from './Components/Drawer.jsx';
export default function App() {
  let [profile, setProfile] = useState(false);
  let [btn, setbtn] = useState(false);
  let userName = jwtDecode(localStorage.getItem('token')).name;
  let clearCash = () => {
    localStorage.clear();
    window.location.reload();
  }
  const token = localStorage.getItem('token');
  let [database, setDatabase] = useState([]);
  let [submit, setsubmitBTN] = useState(0);
  let [button, setButton] = useState([]);
  let [count, setCount] = useState({
    Marks: "0",
    Total: "0"
  });
  useEffect(() => {
    axios.post(`${process.env.REACT_APP_API_URL}/Yearly/Response`, {}, {
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    }).then((res) => {
      if (res.data.message === "Done") {
        setDatabase(res.data.data);
      }
    }).catch((err) => {
      console.log(err);
    });
  }, []);
  let setCountPath = (value) => {
    if (value == 1) {
      count["Marks"] = ++count["Marks"];
    }
    count["Total"] = ++count["Total"];
  }
  let setButtonPath = (value) => {
    let oldData = [...button];
    oldData.push(value);
    setButton(oldData);
  }
  let submitForm = () => {
    axios.post(`${process.env.REACT_APP_API_URL}/Year/Response/Check`, {}, {
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    }).then((res) => {
       console.log(count);
      if (res.data.message === "not allowed") {
        toast.error("Response already submited!");
      }
      else {
       axios.post(`${process.env.REACT_APP_API_URL}/Year/Response/Score`, count, {
          headers: {
            authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        }).then((res) => {
          if (res.data.message === "Done") {
            setsubmitBTN(1);
            toast.success("Record Submited !");
          }
          if (res.data.message === "Fail") {
            toast.error("Try after some time");
          }
        })
      }
    }).catch((err) => {
      console.log(err);
    })
  }
  let setGreen = (e) => {
    e.target.style.backgroundColor = "green";
    e.target.style.color = "white";
  }
  let setRed = (e) => {
    e.target.style.backgroundColor = "red";
    e.target.style.color = "white";
  }
  const toggleNavbar = () => {
    const nav = document.getElementById("navbarSupportedContent");
    if (!nav) return;
    const bootstrap = require("bootstrap");
    const collapse = bootstrap.Collapse.getOrCreateInstance(nav);
    collapse.toggle();
     }
  return (
    <div>
          <Drawer/>
      <ResWarningBox identity={"Year"} />
      <ToastContainer />
        <header>
        <nav class="navbar navbar-expand-lg">
          <div class="mc-navbar">
            <Link class="navbar-brand text-color" href="#">GrowthTracker</Link>
            <button class="navbar-toggler me-4" type="button" onClick={()=>{toggleNavbar()}} aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span class={`navbar-toggler-icon`}></span>
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
                  <Link class="nav-Link mc-normalbtn text-primary" to="#" style={{ width: "200px" }}>Yearly Response</Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </header>
      <main>
        <div className="section-header mt-0">
          <div className='fs-2 h1'>
            Yearly Response Section
          </div>
          <div className='small-txt'>
            Review your goals and mark your progress for year
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
            <button className={`d-horizontal ${count["Total"] === database.length ? 'submited' : 'submit-btn '}`} disabled={submit > 0} onClick={submitForm} ><span class="me-2 material-symbols-outlined">
              trending_up
            </span>
              {submit > 0 ? "Submited" : "Submit Response"}</button>
          </div>
          <div >

            {count["Total"] === database.length ? "" :
              <div className='d-horizontal text-danger mt-4'><span class="me-2  border border-danger circle alert-txt material-symbols-outlined">
                priority_high
              </span>
                <span>Please respond to all goals before submitting</span>
              </div>
            }
          </div>
        </div>
      </main>
      <footer>
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
