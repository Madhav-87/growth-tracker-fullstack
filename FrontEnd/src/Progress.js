import { Link } from 'react-router-dom';
import React, { useState } from 'react'
import './progress.css';
import './Panel.css';
import Weeklyimg from './WeeklyProgress.png';
import Monthlyimg from './MonthProgress.png';
import Yearimg from './YearProgress.png';
import ChartEx from './ChartEx.png';
import Alert from './Components/Alert.jsx';
export default function Progress() {
        let [btn, setbtn] = useState(false);
         const toggleNavbar = () => {
    const nav = document.getElementById("navbarSupportedContent");
    if (!nav) return;
    const bootstrap = require("bootstrap");
    const collapse = bootstrap.Collapse.getOrCreateInstance(nav);
    collapse.toggle();
         }
    return (
        <div>
            <Alert />
            <header>
                <nav class="navbar navbar-expand-lg">
                    <div class="mc-navbar pe-5">
                        <Link class="navbar-brand text-color" href="#">GrowthTracker</Link>
                        <button class="navbar-toggler" type="button" onClick={()=>{toggleNavbar()}} aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
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
                                    <Link class="nav-Link mc-normalbtn text-primary" to="#" style={{ width: "200px" }}>Progress</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </header>
            <main>
                <div className='mc-progress-cards'>
                <div className="card mc-progress-card" style={{ width: "18rem" }}>
                    <img src={Weeklyimg} className="card-img-top" alt="Weeklyimg"></img>
                    <div className="card-body">
                        <h5 className="card-title">Weekly Progress</h5>
                        <p className="card-text">Check out you daily progress to analyse your growth.</p>
                        <Link to="/DailyView" className="btn btn-primary">View</Link>
                    </div>
                </div>
                <div className="card mc-progress-card" style={{ width: "18rem" }}>
                    <img src={Monthlyimg} className="card-img-top" alt="Monthlyimg"></img>
                    <div className="card-body">
                        <h5 className="card-title">Monthly Progress</h5>
                        <p className="card-text">Check out your monthly progress to analyse your activity.</p>
                        <Link to="/MonthlyView" className="btn btn-primary">View</Link>
                    </div>
                </div>
                <div className="card mc-progress-card" style={{ width: "18rem" }}>
                    <img src={Yearimg} className="card-img-top" alt="Yearimg"></img>
                    <div className="card-body">
                        <h5 className="card-title">Yearly Progress</h5>
                        <p className="card-text">Check out your Yearly progress to analyse your growth.</p>
                        <Link to="/YearlyView" className="btn btn-primary">View</Link>
                    </div>
                </div>
            </div>
            </main>
            <footer>
        <div className='h4'>
          GoalTracker
        </div>
        <div>
          Empowering you to achieve your dreams, one goal at a time.
        </div>
        <div>
          © 2024 GoalTracker. All rights reserved.
        </div>
      </footer>
        </div>
    )
}
