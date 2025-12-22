import Logo from '../../assets/icons/Logo.png'
import { Link, useNavigate } from 'react-router-dom';
import './About.css';
import plus from '../../assets/images/addGoal.svg';
import message from '../../assets/images/addTask.svg';
import Footer from '../../components/layout/Footer.jsx';
import Header from '../../components/layout/Header.jsx';
export default function About() {
    const navigate=useNavigate();
    return (
        <div className='about-section-body'>
            <Header title={'About'} />
            <div className='about-headline-section'>
                <div className='about-story'>
                    <div style={{ display: "flex", alignmentBaseline: "central", marginRight: "4px" }}>
                        <span class="material-symbols-outlined">
                            fertile
                        </span>
                    </div>
                    <div>Our Story</div>
                </div>
                <div className='about-headline'>Track Growth.</div>
                <div className='about-headline gradient-text'>Build Momentum.</div>
                <div className='headline-subtitle'>We help ambitious people turn daily
                    actions into meaningful progress through simple, powerful habit
                    tracking.
                </div>
            </div>
            <div className='story-section'>
                <div className='story-box'>
                    <div className='story-headline'>
                        <h2>Why we Built This</h2>
                    </div>
                    <div className='story-subtitle'>
                        Most productivity apps are overwhelming. They demand perfection and punish mistakes.
                        We wanted something different-- a tool that celebrates small wins and makes consistency
                        feel achievable.<br></br><br></br>GrowthTracker started as a personal project. Our aim is to
                        help people make good habits in there life as habits are help us to make people that what we wanted
                        to be. It is important to note that the app is only meant for helping people to make good habits
                        and reduce bad ones from there life.
                    </div>
                </div>
            </div>
            <div className='belive-section'>
                <div className='belive-section-heading'>What We Believe</div>
                <div className='belive-panel'>
                    <div className='logo background-primary'>
                        <span class="material-symbols-outlined">
                            target
                        </span>
                    </div>
                    <div className='belive-panel-headings'>
                        Progress Over Perfection
                    </div>
                    <div className='belive-subtitle'>
                        Small consistent steps beat big sporadic leaps. We design for sustainability, not intensity.
                    </div>
                </div>
                <div className='belive-panel'>
                    <div className='logo background-purple'>
                        <span class="material-symbols-outlined">
                            favorite
                        </span>
                    </div>
                    <div className='belive-panel-headings'>
                        Fast and Simple
                    </div>
                    <div className='belive-subtitle'>
                        Track habits in seconds. No complexity, no clutter, just pure focus.
                    </div>
                </div>
                <div className='belive-panel'>
                    <div className='logo background-green'>
                        <span class="material-symbols-outlined">
                            shield
                        </span>
                    </div>
                    <div className='belive-panel-headings'>
                        Protect your courier
                    </div>
                    <div className='belive-subtitle'>
                        Protect your courier by building good habits.
                    </div>
                </div>

            </div>
            <div className='credit-section'>
                <div className='about-story'>
                    <div style={{ display: "flex", alignmentBaseline: "central", marginRight: "4px" }}>
                        <span class="material-symbols-outlined">
                            workspace_premium
                        </span>
                    </div>
                    <div>Credit</div>
                </div>
                <div className='credit-panel'>
                    <div>
                        <img src={plus} className="icon" alt="..." />
                    </div>
                    <div>
                        <p className="credit-txt">The icon "Add Interface Multimedia" was created by Icon Lauk, available on SVGRepo under the Creative Commons Attribution (CC BY) License.
                            Part of the Multimedia Flat Icons collection. Free for personal and commercial use with attribution.</p>
                    </div>
                </div>
                <div className='credit-panel'>
                    <div>
                        <img src={message} className="icon" alt="..." />
                    </div>
                    <div>
                        <p className="credit-txt">
                            The icon "Add Chat Email" was created by Icon Lauk and is part of the Interface Lineal Icons collection available on SVGRepo.
                            This icon is licensed under the Creative Commons Attribution (CC BY) License, which permits use with credit to the creator.
                        </p>
                    </div>
                </div>
            </div>
            <div className='sign-up-section'>
                <div className='about-headline readyAnim'>
                    Ready to Grow?
                </div>
                <div className='headline-subtitle'>
                    Start your journey with Growth Tracker
                </div>
                <button className='login-btn-section' onClick={()=>{navigate('/')}}>
                    <div style={{alignSelf:"center"}} >
                        Start Free
                    </div>
                    <div style={{display:"flex", marginLeft:"5px",alignSelf:"center"}}>
                        <span class="material-symbols-outlined" style={{alignmentBaseline:"middle"}} >
                            arrow_forward
                        </span>
                    </div>
                </button>
            </div>
            <Footer />
        </div>
    )
}
