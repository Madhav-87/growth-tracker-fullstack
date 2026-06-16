import React, { useState, useRef, useEffect } from 'react'
import '../../styles/Panel.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import { isMobile, isDesktop } from 'react-device-detect';
//Mobile images
import mobileGoal from '../../assets/images/mobileGoal.png';
import girl from '../../assets/images/girl.png';
import Drawer from '../../components/common/Drawer.jsx';
import setGoals from '../../assets/images/setGoals.png';
import submitGoals from '../../assets/images/submitGoals.png';
import Progressimg from '../../assets/images/CheckProgress.png';
import GetTips from '../../assets/images/GetTips.png';
import { Link } from 'react-router-dom';
import handNote from '../../assets/images/handNote.png';
import focus from '../../assets/images/focus.png';
import boy from '../../assets/images/boy.png';
import Footer from '../../components/layout/Footer.jsx';
import Header from '../../components/layout/Header.jsx';
export default function App() {
  const carouselRef = useRef(null);

  useEffect(() => {
    const bootstrap = require('bootstrap');
    const carousel = new bootstrap.Carousel(carouselRef.current, {
      interval: 3000,
      ride: 'carousel' //Auto-initializes and starts the carousel cycling
    });
    //To avoid memory leak
    return () => carousel.dispose();
  }, []);
  return (
    <div>
      <Drawer />
      <Header title={'Day'}/>
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
      <Footer/>
    </div>
  )
}
