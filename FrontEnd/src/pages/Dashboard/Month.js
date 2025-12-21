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
import Footer from '../../components/layout/Footer.jsx';
import Header from '../../components/layout/Header.jsx';
export default function App() {
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
  return (
    <div>
      <Drawer/>
      <Header title={'Month'}/>
      <main>
        <div className='mc-crousel'>
          <div ref={carouselRef} id="carouselExampleIndicators" className="carousel slide shadow" data-bs-ride="carousel" data-bs-interval="3000">
            <div className="carousel-indicators">
              <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
              <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
              <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
            </div>
            <div className="carousel-inner">
              <div className="carousel-item carousel-overlay active">
                <img src={sea} className="d-block w-100" height="410px" alt="sea image" />
              </div>
              <div className="carousel-item">
                <img src={mountain} className="d-block w-100" height="410px" alt="motain image" />
              </div>
              <div className="carousel-item">
                <img src={ice} className="d-block w-100" alt="iceland image" />
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
            <b>Monthly Goal Management Hub</b>
          </div>
          <div className='mc-subtxt'>
            Everything you need to set, track, and achieve your goals in one powerful platform
          </div>
        </div>
        <div className='mc-Cards'>
          <div className="card" id="card1" style={{width:"18rem"}}>
            <div className="card-body">
              <img src={setGoals} height="80px"></img>
              <h5 className="card-title">Set Monthly Goals</h5>
              <p className="card-text">Define and organize your daily objectives with our intuitive goal-setting system.</p>
              <Link to="/Monthly/Goals" className="btn btn-primary btn1"><span>Set Goals</span></Link>
            </div>
          </div>
          <div className="card" id="card2" style={{width:"18rem"}}>
            <div className="card-body">
              <img src={submitGoals} style={{borderRadius:"15px"}} height="75px"></img>
              <h5 className="card-title">Submit Monthly Response</h5>
              <p className="card-text">Track your progress and submit detailed responses about your completed tasks.</p>
              <Link to="/Month/Response" className="btn btn-primary btn2">Go somewhere</Link>
            </div>
          </div>
          <div className="card" id="card3" style={{width:"18rem"}}>
            <div className="card-body">
              <img src={Progressimg} style={{borderRadius:"15px"}} height="75px"></img>
              <h5 className="card-title">Check Progress</h5>
              <p className="card-text">Check the progress and anayise your growth.</p>
              <Link to="/check-progress" className="btn btn-primary btn3">Check Progress</Link>
            </div>
          </div>
          <div className="card" id="card4" style={{width:"18rem"}}>
            <div className="card-body">
              <img src={GetTips} style={{borderRadius:"15px"}} height="75px"></img>
              <h5 className="card-title">Tips</h5>
              <p className="card-text">Sometips for your daily routine.</p>
              <Link to="/tips" className="btn btn-primary btn4">Tip</Link>
            </div>
          </div>
        </div>
      </main>
      <Footer/>
    </div>
  )
}
