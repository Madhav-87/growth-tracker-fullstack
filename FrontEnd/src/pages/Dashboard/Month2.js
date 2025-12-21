import React, { useState,useEffect,useRef } from 'react'
import '../../styles/Panel.css';
import mountain from '../../assets/images/mountain.png';
import sea from '../../assets/images/sea.png';
import ice from '../../assets/images/ice.png';
import setGoals from '../../assets/images/setGoals.png';
import submitGoals from '../../assets/images/submitGoals.png';
import Progressimg from '../../assets/images/CheckProgress.png';
import GetTips from '../../assets/images/GetTips.png';
import {Link} from 'react-router-dom';
import Drawer from '../../components/common/Drawer.jsx';
export default function App() {
  let [navbarOpen, setNavbarOpen] = useState(false);
  const carouselRef = useRef(null);
    useEffect(() => {
      const bootstrap = require('bootstrap');
      const carousel = new bootstrap.Carousel(carouselRef.current, {
        interval: 3000,
        ride: 'carousel'
      });
       //To avoid memory leak
          return () => carousel.dispose();
    }, []);
     const toggleNavbar = () => {
    const nav = document.getElementById("navbarSupportedContent");
    if (!nav) return;
    const bootstrap = require("bootstrap");
    const collapse = bootstrap.Collapse.getOrCreateInstance(nav);
    collapse.toggle();
  };
  return (
    <div>
          <Drawer/>
      <header>
        <nav class="navbar navbar-expand-lg">
          <div class="mc-navbar">
            <Link class="navbar-brand text-color" href="#">GrowthTracker</Link>
            <button class="navbar-toggler me-5" onClick={() => { toggleNavbar()}} type="button" aria-controls="navbarSupportedContent" aria-expanded={navbarOpen} aria-label="Toggle navigation">
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
                  <Link class="nav-Link mc-normalbtn text-primary" to="#">Month</Link>
                </li>
                <li class="nav-item">
                  <Link class="nav-Link mc-normalbtn" to="/Year">Year</Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </header>
      <main>
        <div className='mc-crousel'>
          <div ref={carouselRef} id="carouselExampleIndicators" class="carousel slide shadow" data-bs-ride="carousel" data-bs-interval="3000">
            <div class="carousel-indicators">
              <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
              <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
              <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
            </div>
            <div class="carousel-inner">
              <div class="carousel-item carousel-overlay active">
                <img src={sea} class="d-block w-100" height="410px" alt="sea image" />
              </div>
              <div class="carousel-item">
                <img src={mountain} class="d-block w-100" height="410px" alt="motain image" />
              </div>
              <div class="carousel-item">
                <img src={ice} class="d-block w-100" alt="iceland image" />
              </div>
            </div>
            <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
              <span class="carousel-control-prev-icon" aria-hidden="true"></span>
              <span class="visually-hidden">Previous</span>
            </button>
            <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
              <span class="carousel-control-next-icon" aria-hidden="true"></span>
              <span class="visually-hidden">Next</span>
            </button>
          </div>
        </div>
        <div className='mt-5 d-flex flex-column align-items-center'>
          <div className='mc-heading'>
            <b>Monthly Goal Management Hub</b>
          </div>
          <div className='mc-subtxt'>
            Everything you need to set, track, and achieve your goals in one powerful platform
          </div>
        </div>
        <div className='mc-Cards'>
          <div class="card" id="card1" style={{width:"18rem"}}>
            <div class="card-body">
              <img src={setGoals} height="80px"></img>
              <h5 class="card-title">Set Monthly Goals</h5>
              <p class="card-text">Define and organize your daily objectives with our intuitive goal-setting system.</p>
              <Link to="/Monthly/Goals" class="btn btn-primary btn1"><span>Set Goals</span></Link>
            </div>
          </div>
          <div class="card" id="card2" style={{width:"18rem"}}>
            <div class="card-body">
              <img src={submitGoals} style={{borderRadius:"15px"}} height="75px"></img>
              <h5 class="card-title">Submit Monthly Response</h5>
              <p class="card-text">Track your progress and submit detailed responses about your completed tasks.</p>
              <Link to="/Month/Response" class="btn btn-primary btn2">Go somewhere</Link>
            </div>
          </div>
          <div class="card" id="card3" style={{width:"18rem"}}>
            <div class="card-body">
              <img src={Progressimg} style={{borderRadius:"15px"}} height="75px"></img>
              <h5 class="card-title">Check Progress</h5>
              <p class="card-text">Check the progress and anayise your growth.</p>
              <Link to="/check-progress" class="btn btn-primary btn3">Check Progress</Link>
            </div>
          </div>
          <div class="card" id="card4" style={{width:"18rem"}}>
            <div class="card-body">
              <img src={GetTips} style={{borderRadius:"15px"}} height="75px"></img>
              <h5 class="card-title">Tips</h5>
              <p class="card-text">Sometips for your daily routine.</p>
              <Link to="/tips" class="btn btn-primary btn4">Tip</Link>
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
