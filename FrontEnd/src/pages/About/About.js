import Logo from '../../assets/icons/Logo.png'
import { Link } from 'react-router-dom';
import './About.css';
import plus from '../../assets/images/addGoal.svg';
import message from '../../assets/images/addTask.svg';
import profile from '../../assets/images/profile.svg';
import annualtip from '../../assets/images/annualtip.svg';
import sword from '../../assets/images/sword.svg';
import annualReport from '../../assets/images/annualReport.svg';
import annual from '../../assets/images/annualReport.svg';
import support from '../../assets/images/support.svg';
import medal from '../../assets/images/medal.svg';
import monthReport from '../../assets/images/monthReport.svg';
import monthlyGoal from '../../assets/images/monthGoals.svg';
import tip from '../../assets/images/tip.svg';
import reportsvg from '../../assets/images/reportsvg.svg';
import progress from '../../assets/images/progress.svg';
import goal from '../../assets/images/goal.svg';
export default function About() {
    return (
        <div>
            <div className="Header">
                <ul className="nav nav-underline">
                    <li className="nav-item">
                        <Link className="nav-link" to="/Home">Home</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link active" to="#">About</Link>
                    </li>
                </ul>
            </div>
            <div className='d-flex align-items-center justify-content-evenly mc-mobile-section1'>
                <div>
                    <div className='mc-web-title m-4 mt-5 mb-5'>
                        Personal Growth Tracking Website
                    </div>
                    <div>
                        <div className='para-container p-4 m-4 mt-5'>
                            <div className='para'>
                                Personal Growth Tracking Website made for tracking daily progress, monthly progress and also year wise progress.
                                The aim of that site is to support people for making desipline in there life and also support for acheving there
                                dreams in there life.
                            </div>
                            <div className='para'>
                                The website is made by:
                                <ul>
                                    <li><b>Madhav Deepak Bondhare</b></li>
                                    <li><b>Lokaji Santosh Kale</b></li>
                                    <li><b>Ashitosh Ritesh Gundawar</b></li>
                                </ul>
                                under the guidance of :
                                <ul>
                                    <li><b>Satish Sarkate Sir</b></li>
                                </ul>
                                We hope we help you for improving your life as this website
                                only for Humans and there well-being.
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <img src={Logo} className='img-fluid mc-img-poster' alt="Logo" />
                </div>
            </div>
            <div>
                <div className='h2 credit-title'>
                    Credits
                </div>
                <div className='mc-credit-cards'>
                    <div class="card mc-set-cards">
                        <div className='mc-credit-img'>
                            <img src={plus} class="icon" alt="..." />
                        </div>
                        <div class="card-body">
                            <p class="card-text">The icon "Add Interface Multimedia" was created by Icon Lauk, available on SVGRepo under the Creative Commons Attribution (CC BY) License.
                                Part of the Multimedia Flat Icons collection. Free for personal and commercial use with attribution.</p>
                        </div>
                    </div>
                    <div class="card mc-set-cards">
                        <div className='mc-credit-img'>
                            <img src={message} class="icon" alt="..." />
                        </div>
                        <div class="card-body">
                            <p class="card-text">The icon "Add Chat Email" was created by Icon Lauk and is part of the Interface Lineal Icons collection available on SVGRepo.
                                This icon is licensed under the Creative Commons Attribution (CC BY) License, which permits use with credit to the creator.</p>
                        </div>
                    </div> <div class="card mc-set-cards">
                        <div className='mc-credit-img'>
                            <img src={profile} class="icon" alt="..." />
                        </div>
                        <div class="card-body">
                            <p class="card-text">The icon "Account Avatar Profile User 6" was created by Maxicons and is part of the Avatar Flat Icons collection on SVGRepo.
                                It is licensed under the Creative Commons Attribution (CC BY) License, which permits reuse with proper attribution.</p>
                        </div>
                    </div> <div class="card mc-set-cards">
                        <div className='mc-credit-img'>
                            <img src={annualtip} class="icon" alt="..." />
                        </div>
                        <div class="card-body">
                            <p class="card-text">The icon "Email Notification Message Envelope Letter Chat" was created by Good Ware, from the Interface Solid Icons collection on SVGRepo.
                                It is licensed under the Creative Commons Attribution (CC BY) License, which allows free use with proper credit.</p>
                        </div>
                    </div>
                    <div class="card mc-set-cards">
                        <div className='mc-credit-img'>
                            <img src={sword} class="icon" alt="..." />
                        </div>
                        <div class="card-body">
                            <p class="card-text">The icon "Excalibur Legend" was created by Freepik, part of the Game Flat Icons collection available on SVGRepo.
                                It is licensed under the Creative Commons Attribution (CC BY) License, which permits use with proper credit.</p>
                        </div>
                    </div>
                    <div class="card mc-set-cards">
                        <div className='mc-credit-img'>
                            <img src={annualReport} class="icon" alt="..." />
                        </div>
                        <div class="card-body">
                            <p class="card-text">The icon "Report" was created by Cyber Olympus and is part of the Strategy Management Flat Vectors collection available on SVGRepo.
                                It is licensed under the Creative Commons Attribution (CC BY) License, which permits reuse with credit.</p>
                        </div>
                    </div>
                    <div class="card mc-set-cards">
                        <div className='mc-credit-img'>
                            <img src={annual} class="icon" alt="..." />
                        </div>
                        <div class="card-body">
                            <p class="card-text">The icon "Annual Year" is from the Business Flat Icons collection on SVGRepo and is licensed under the Creative Commons Zero (CC0) License.</p>
                        </div>
                    </div>
                    <div class="card mc-set-cards">
                        <div className='mc-credit-img'>
                            <img src={support} class="icon" alt="..." />
                        </div>
                        <div class="card-body">
                            <p class="card-text">The icon "Telemarketer Support" is from the Business Flat Icons collection on SVGRepo and is licensed under the Creative Commons Zero (CC0) License.</p>
                        </div>
                    </div>
                    <div class="card mc-set-cards">
                        <div className='mc-credit-img'>
                            <img src={medal} class="icon" alt="..." />
                        </div>
                        <div class="card-body">
                            <p class="card-text">The icon "Medal" is from the Awards and Badges collection on SVGRepo, licensed under the Creative Commons Zero (CC0) License.</p>
                        </div>
                    </div>
                    <div class="card mc-set-cards">
                        <div className='mc-credit-img'>
                            <img src={monthReport} class="icon" alt="..." />
                        </div>
                        <div class="card-body">
                            <p class="card-text">The icon "Analytics Statistics" is from the Business Flat Icons collection on SVGRepo, and is licensed under the Creative Commons Zero (CC0) License.</p>
                        </div>
                    </div>
                    <div class="card mc-set-cards">
                        <div className='mc-credit-img'>
                            <img src={monthlyGoal} class="icon" alt="..." />
                        </div>
                        <div class="card-body">
                            <p class="card-text">The icon "Appointment Calendar Date Event Month Plan" was created by Icon Lauk and is part of the Calendar Icons collection on SVGRepo.
                                It is licensed under the Creative Commons Attribution (CC BY) License.
                            </p>
                        </div>
                    </div>
                    <div class="card mc-set-cards">
                        <div className='mc-credit-img'>
                            <img src={tip} class="icon" alt="..." />
                        </div>
                        <div class="card-body">
                            <p class="card-text">The icon "Operator Support" is from the Communication Flat Icons collection on SVGRepo and is licensed under the Creative Commons Zero (CC0) License.</p>
                        </div>
                    </div>
                    <div class="card mc-set-cards">
                        <div className='mc-credit-img'>
                            <img src={reportsvg} class="icon" alt="..." />
                        </div>
                        <div class="card-body">
                            <p class="card-text">The icon "Report Document File" was created by Cyber Olympus and is part of the Strategy Management Flat Vectors collection on SVGRepo.
                                It is licensed under the Creative Commons Attribution (CC BY) License.</p>
                        </div>
                    </div>
                    <div class="card mc-set-cards">
                        <div className='mc-credit-img'>
                            <img src={progress} class="icon" alt="..." />
                        </div>
                        <div class="card-body">
                            <p class="card-text">The icon "Achievement Business Mission" was created by Icon Lauk and is part of the Business Success Vectors collection on SVGRepo.
                                It is licensed under the Creative Commons Attribution (CC BY) License.
                            </p>
                        </div>
                    </div>
                    <div class="card mc-set-cards">
                        <div className='mc-credit-img'>
                            <img src={goal} class="icon" alt="..." />
                        </div>
                        <div class="card-body">
                            <p class="card-text">The icon "Goals Target Aim" was created by Cyber Olympus and is part of the Strategy Management Flat Vectors collection on SVGRepo.
                                It is licensed under the Creative Commons Attribution (CC BY) License.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div className='footer-container'>
                Thank You
            </div>
        </div>
    )
}
