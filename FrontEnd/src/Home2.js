import React, { useState, useRef, useEffect } from 'react'
import './Panel.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import { isMobile, isDesktop } from 'react-device-detect';
//Mobile images
import mobileGoal from './Images/mobileGoal.png';
import girl from './Images/girl.png';

import Drawer from './Components/Drawer.jsx';
import logo from './logo.svg'
import setGoals from './setGoals.png';
import submitGoals from './submitGoals.png';
import Progressimg from './CheckProgress.png';
import GetTips from './GetTips.png';
import person from './person.png';
import { Link } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import journey from './Images/journey.png';
import dash from './Images/dash.png';
import handNote from './Images/handNote.png';
import focus from './Images/focus.png';
import boy from './Images/boy.png';
import ChatBoticon from './Components/ChatBoticon';
export default function App() {
  let [btn, setbtn] = useState(false);
  let [navbarOpen, setNavbarOpen] = useState(false);
  let [profile, setProfile] = useState(false);
  let userName = jwtDecode(localStorage.getItem('token')).name;
  let clearCash = () => {
    localStorage.clear();
    window.location.reload();
  }
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
      <Drawer />
      <header>
        <nav className="navbar navbar-expand-lg">
          <div className="mc-navbar">
            <Link className="navbar-brand text-color" to="#">GrowthTracker</Link>
            <button
              className="navbar-toggler"
              type="button"
              onClick={toggleNavbar}
              aria-controls="navbarSupportedContent"
              aria-label="Toggle navigation"
              aria-expanded={navbarOpen}
            >

              <span className="navbar-toggler-icon"></span>
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
            <div className="collapse navbar-collapse mc-nav-center" id="navbarSupportedContent">
              <ul className="navbar-nav text-align-left me-auto ms-0 ms-md-5  mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link className="nav-Link mc-normalbtn text-primary" aria-current="page" to="#">Day</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-Link mc-normalbtn" to="/Month">Month</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-Link mc-normalbtn" to="/Year">Year</Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </header>
      <main>
        <div className='mc-crousel'>
          <div ref={carouselRef} id="carouselExampleIndicators" className="carousel slide shadow" data-bs-ride="carousel" data-bs-interval="3000" >
            <div className="carousel-indicators">
              <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
              <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
              <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
            </div>
            <div className="carousel-inner">
              <div className="carousel-item carousel-overlay active">
                <img src={isMobile ? mobileGoal : handNote} className="d-block w-100" height="410px" alt="image" />
              </div>
              <div className="carousel-item">
                <img src={focus} className="d-block w-100" alt="title" />
              </div>
              <div className="carousel-item">
                <img src={isMobile ? girl : boy} className="d-block w-100" alt="image" />
              </div>
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
              <span className="carousel-control-prev-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
              <span className="carousel-control-next-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>
        </div>
        <div className='mt-5 d-flex flex-column align-items-center'>
          <div className='mc-heading'>
            <b>Your Goal Management Hub</b>
          </div>
          <div className='mc-subtxt'>
            Everything you need to set, track, and achieve your goals in one powerful platform
          </div>
        </div>
        <div className='mc-Cards'>
          <div className="card" id="card1" style={{ width: "18rem" }}>
            <div className="card-body">
              <img src={setGoals} height="80px"></img>
              <h5 className="card-title">Set Goals</h5>
              <p className="card-text">Define and organize your daily objectives with our intuitive goal-setting system.</p>
              <Link to="/daily-goals" className="btn btn-primary btn1"><span>Set Goals</span></Link>
            </div>
          </div>
          <div className="card" id="card2" style={{ width: "18rem" }}>
            <div className="card-body">
              <img src={submitGoals} style={{ borderRadius: "15px" }} height="75px"></img>
              <h5 className="card-title">Submit Response</h5>
              <p className="card-text">Track your progress and submit detailed responses about your completed tasks.</p>
              <Link to="/response" className="btn btn-primary btn2">Response</Link>
            </div>
          </div>
          <div className="card" id="card3" style={{ width: "18rem" }}>
            <div className="card-body">
              <img src={Progressimg} style={{ borderRadius: "15px" }} height="75px"></img>
              <h5 className="card-title">Check Progress</h5>
              <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
              <Link to="/check-progress" className="btn btn-primary btn3">Progress</Link>
            </div>
          </div>
          <div className="card" id="card4" style={{ width: "18rem" }}>
            <div className="card-body">
              <img src={GetTips} style={{ borderRadius: "15px" }} height="75px"></img>
              <h5 className="card-title">AI Growth</h5>
              <p className="card-text">Get personalized advice and motivation from your AI companion.</p>
              <Link to="/chatbot" className="btn btn-primary btn4">Chat Now</Link>
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
