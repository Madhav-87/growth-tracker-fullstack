import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import person from '../../assets/images/person.png';
import { jwtDecode } from "jwt-decode";
export default function Header(props) {
    let [mainTitle, setMainTitle] = useState(null);
    useEffect(() => {

        setMainTitle(props.title);
    }, [props.title])
    const toggleNavbar = () => {
        const nav = document.getElementById("navbarSupportedContent");
        if (!nav) return;
        const bootstrap = require("bootstrap");
        const collapse = bootstrap.Collapse.getOrCreateInstance(nav);
        collapse.toggle();
    };
    let [profile, setProfile] = useState(false);
    let userName = jwtDecode(localStorage.getItem('token')).name;
    let clearCache = () => {
        localStorage.clear();
        window.location.reload();
    }
    const isMainPage = mainTitle === 'Day' || mainTitle === 'Month' || mainTitle === 'Year';
    return (
        <>
            {
                isMainPage
                    ?
                    (
                        <>
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
                                            aria-expanded="false"
                                        >

                                            <span className="navbar-toggler-icon"></span>
                                        </button>
                                        <div className='icon-Home'>
                                            <div className={profile ? 'mc-profile d-flex flex-column align-items-center' : 'nonvisible'}>
                                                <div className='mc-profile-icon'><img src={person} height={"40px"} className='profile-icon-Home'></img></div>
                                                <div className='d-flex flex-column mb-2'><div className='mc-profile-txt'>{userName.split(' ')[0]}</div><div className='mc-profile-subtxt'>Goal Achiever</div></div>
                                                <Link className='mb-2 mc-profile-btn' to="/About">About</Link>
                                                <div className='mc-profile-btn' onClick={() => { clearCache() }}>Log out</div>
                                            </div>
                                            <img src={person} height={"40px"} onClick={() => { setProfile(!profile) }}></img>
                                        </div>
                                    </div>
                                    <div className='mc-close-width d-flex'>
                                        <div className="collapse navbar-collapse mc-nav-center" id="navbarSupportedContent">
                                            <ul className="navbar-nav text-align-left me-auto ms-0 ms-md-5  mb-2 mb-lg-0">
                                                <li className="nav-item">
                                                    <Link className={`nav-Link mc-normalbtn ${mainTitle === 'Day' ? 'text-primary' : ''}`} aria-current="page" to="/Home">Day</Link>
                                                </li>
                                                <li className="nav-item">
                                                    <Link className={`nav-Link mc-normalbtn ${mainTitle === 'Month' ? 'text-primary' : ''}`} to="/Month">Month</Link>
                                                </li>
                                                <li className="nav-item">
                                                    <Link className={`nav-Link mc-normalbtn ${mainTitle === 'Year' ? 'text-primary' : ''}`} to="/Year">Year</Link>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </nav>
                            </header>
                        </>
                    )
                    :
                    (
                        <>
                            <header>
                                <nav className="navbar navbar-expand-lg">
                                    <div className="mc-navbar">
                                        <Link className="navbar-brand text-color" href="#">GrowthTracker</Link>
                                        <button className="navbar-toggler me-5" onClick={() => { toggleNavbar() }} type="button" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                                            <span className={`navbar-toggler-icon`}></span>
                                        </button>
                                    </div>
                                    <div className='mc-close-width d-flex'>
                                        <div className="collapse navbar-collapse mc-nav-center" id="navbarSupportedContent">
                                            <ul className="navbar-nav me-auto ms-0 ms-md-5  mb-2 mb-lg-0">
                                                <li className="nav-item">
                                                    <Link className="nav-Link mc-normalbtn" aria-current="page" to="/Home">Day</Link>
                                                </li>
                                                <li className="nav-item">
                                                    <Link className="nav-Link mc-normalbtn" to="/Month">Month</Link>
                                                </li>
                                                <li className="nav-item">
                                                    <Link className="nav-Link mc-normalbtn" to="/Year">Year</Link>
                                                </li>
                                                <li className="nav-item">
                                                    <Link className="nav-Link mc-normalbtn text-primary" to="#" style={{ width: "200px" }}>{mainTitle}</Link>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </nav>
                            </header>
                        </>
                    )
            }
        </>
    )
}

