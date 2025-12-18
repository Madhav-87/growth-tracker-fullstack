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
import './Response.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Drawer from './Components/Drawer.jsx';

export default function App() {
  let [btn, setbtn] = useState(false);
  let [profile, setProfile] = useState(false);
  let userName = jwtDecode(localStorage.getItem('token')).name;
  let clearCash = () => {
    localStorage.clear();
    window.location.reload();
  }
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
      axios.get(`${REACT_APP_URL}/send-goals`, {
        headers: {
          authorization: `Bearer ${token}`,
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
    axios.get(`${REACT_APP_URL}/Is-Submit`, {
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
          if (count["Total"] != database.length) {
            toast.error("Please provide all checks!");
            return;
          }
          axios.post(`${REACT_APP_URL}/Submit-Response`, count, {
            headers: {
              authorization: `Bearer ${token}`,
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
  let setGreen = (e) => {
    e.target.style.backgroundColor = "green";
    e.target.style.color = "white";
  }
  let setRed = (e) => {
    e.target.style.backgroundColor = "red";
    e.target.style.color = "white";
  }
  return (
    <div>
          <Drawer/>
      <ResWarningBox identity={"Day"} />
      <ToastContainer />
      <div className='response-page-body'>
        <header>
          <nav class="navbar navbar-expand-lg">
            <div class="mc-navbar">
              <Link class="navbar-brand text-color" href="#">GrowthTracker</Link>
              <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class={`${btn ? 'btn-close' : 'navbar-toggler-icon'}`}></span>
              </button>
              <div className='icon-Home'>
                <div className={profile ? 'mc-profile d-flex flex-column align-items-center' : 'nonvisible'}>
                  <div className='mc-profile-icon'><img src={person} height={"40px"} className='profile-icon-Home'></img></div>
                  <div className='d-flex flex-column mb-2'><div className='mc-profile-txt'>{userName.split(' ')[0]}</div><div className='mc-profile-subtxt'>Goal Acheiver</div></div>
                  <Link className='mb-2 mc-profile-btn' to="/About">About</Link>
                  <div className='mc-profile-btn' onClick={() => { clearCash() }}>Log out</div>
                </div>
                <img src={person} height={"40px"} onClick={() => { setProfile(!profile) }}></img>
              </div>
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
                    <Link class="nav-Link mc-normalbtn text-primary" to="#" style={{ width: "200px" }}>Daily Response</Link>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        </header>
        <main>
          <div className="section-header">
            <div className='fs-2 h1'>
              Daily Response Section
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
              <img src={addTask} className='h-75'></img><span>Today's goals not submited yet</span>
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
    </div>
  )
}
