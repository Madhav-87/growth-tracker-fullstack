import React, { useState,useEffect,useRef } from 'react'
import './Panel.css';
import logo from './logo.svg'
import setGoals from './setGoals.png';
import submitGoals from './submitGoals.png';
import Progressimg from './CheckProgress.png';
import GetTips from './GetTips.png';
import person from './person.png';
import { Link } from 'react-router-dom';
import calender from './Images/calender.png';
import tree from './Images/tree.png';
import steps from './Images/steps.png';
import Drawer from './Components/Drawer';
export default function App() {
    let [btn, setbtn] = useState(false);
    let [profile, setProfile] = useState(false);
      let [navbarOpen, setNavbarOpen] = useState(false);
      const carouselRef = useRef(null);
      
        useEffect(() => {
          const bootstrap = require('bootstrap');
          //To coustomize the Carousel behavior
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
                        <button class="navbar-toggler me-5" onClick={() => { toggleNavbar() }} type="button"  aria-controls="navbarSupportedContent" aria-expanded={navbarOpen} aria-label="Toggle navigation">
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
                              <Link class="nav-Link mc-normalbtn  text-primary" to="#">Year</Link>
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
                                <img src={calender} class="d-block w-100" height="410px" alt="..." />
                            </div>
                            <div class="carousel-item">
                                <img src={tree} class="d-block w-100" alt="..." />
                            </div>
                            <div class="carousel-item">
                                <img src={steps} class="d-block w-100" alt="..." />
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
                        <b>Yearly Goal Management Hub</b>
                    </div>
                    <div className='mc-subtxt'>
                        Everything you need to set, track, and achieve your goals in one powerful platform
                    </div>
                </div>
                <div className='mc-Cards'>
                    <div class="card" id="card1" style={{ width: "18rem" }}>
                        <div class="card-body">
                            <img src={setGoals} height="80px"></img>
                            <h5 class="card-title">Set Yearly Goals</h5>
                            <p class="card-text">Define and organize your daily objectives with our intuitive goal-setting system.</p>
                            <Link to="/Year/goals" class="btn btn-primary btn1"><span>Set Goals</span></Link>
                        </div>
                    </div>
                    <div class="card" id="card2" style={{ width: "18rem" }}>
                        <div class="card-body">
                            <img src={submitGoals} style={{ borderRadius: "15px" }} height="75px"></img>
                            <h5 class="card-title">Submit Yearly Response</h5>
                            <p class="card-text">Track your progress and submit detailed responses about your completed tasks.</p>
                            <Link to="/Year/Response" class="btn btn-primary btn2">Response</Link>
                        </div>
                    </div>
                    <div class="card" id="card3" style={{ width: "18rem" }}>
                        <div class="card-body">
                            <img src={Progressimg} style={{ borderRadius: "15px" }} height="75px"></img>
                            <h5 class="card-title">Check Progress</h5>
                            <p class="card-text">Check the progress and anayise your growth.</p>
                            <Link to="/check-progress" class="btn btn-primary btn3">Check Progress</Link>
                        </div>
                    </div>
                    <div class="card" id="card4" style={{ width: "18rem" }}>
                        <div class="card-body">
                            <img src={GetTips} style={{ borderRadius: "15px" }} height="75px"></img>
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
