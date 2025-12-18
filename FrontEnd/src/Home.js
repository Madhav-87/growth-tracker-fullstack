import girl from './girl.png';
import goalsvg from './goal.svg';
import reportsvg from './reportsvg.svg';
import progress_svg from './progress.svg';
import tipsvg from './tip.svg';
import setGoals from './Set Your Goals.png';
import comAims from './Complete your aims.png';
import profile from './profile.svg';
import { Link } from 'react-router-dom';
import './App.css';
import { jwtDecode } from 'jwt-decode';
import Alert from './Components/Alert.jsx';
function Home() {
    let userName=jwtDecode(localStorage.getItem('token')).name;
    let clearCash=()=>{
        localStorage.clear();
        window.location.reload();
    }
    return (
        <div>
            <Alert />
            <div className="Header">
                <ul className="nav nav-underline">
                    <li className="nav-item">
                        <Link className="nav-link active" aria-current="page" to="/Home">Daily</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/Month">Month</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/Year">Year</Link>
                    </li>
                    <li className="nav-item">
                        <img src={profile} className="profile" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight" alt="profileimg"></img>
                        <div className="offcanvas offcanvas-end mc-offcanavas" tabindex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel" >
                            <div className="offcanvas-header">
                                <h5 className="offcanvas-title" id="offcanvasRightLabel">User</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                            </div>
                            <div className="offcanvas-body mc-offcanvas-body">
                                <div className='mc-profile-photo'>
                                    <img src={profile} className='profile2' alt="profileimg" />
                                </div>
                                <div className='username-text'>{userName}</div>
                                <Link className='about-text-container' to="/About">About</Link>
                                <button className='about-text-container mt-2' onClick={()=>{clearCash()}}>Log out</button>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
            <div className="main-body">
                <div className='mc-Crousal'>
                    <div id="carouselExampleIndicators" className="carousel slide">
                        <div className="carousel-indicators">
                            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
                            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
                        </div>
                        <div className="carousel-inner">
                            <div className="carousel-item active">
                                <img src={girl} className="d-block coustome-height img-fluid" alt="Girl"></img>
                            </div>
                            <div className="carousel-item">
                                <img src={setGoals} className="d-block coustome-height img-fluid " alt="SetGoals"></img>
                            </div>
                            <div className="carousel-item">
                                <img src={comAims} className="d-block coustome-height img-fluid" alt="CompleteAims" style={{ backgroundColor: "#F1F1EA" }}></img>
                            </div>
                        </div>
                        <button className="carousel-control-prev align-self-center" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Previous</span>
                        </button>
                        <button className="carousel-control-next align-self-center" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                            <span className="carousel-control-next-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Next</span>
                        </button>
                    </div>
                </div>
                <div>
                    <div className='mc-Cards'>
                        <div className="card mc-Cards-box d-flex">
                            <div className="card-body d-flex flex-column h-100">
                                <div className="d-flex flex-row mc-svg-box">
                                    <img src={goalsvg} className='img-fluid mc-front-icons'></img>
                                    <h5 className="card-title">Set Goals</h5>
                                </div>
                                <p className="card-text">Set your today's goals which you want to do.</p>
                                <Link to="/daily-goals" className="btn btn-primary mt-auto mc-Card-buttons">Goals</Link>
                            </div>
                        </div>
                        <div className="card mc-Cards-box d-flex">
                            <div className="card-body d-flex flex-column h-100">
                                <div className="d-flex flex-row mc-svg-box">
                                    <img src={reportsvg} className='img-fluid mc-front-icons'></img>
                                    <h5 className="card-title">Submit Response</h5>
                                </div>
                                <p className="card-text">Submit response after completing today's work.</p>
                                <Link to="/response" className="btn btn-primary mt-auto mc-Card-buttons">Response</Link>
                            </div>
                        </div>
                        <div className="card mc-Cards-box d-flex">
                            <div className="card-body d-flex flex-column h-100">
                                <div className="d-flex flex-row mc-svg-box">
                                    <img src={progress_svg} className='img-fluid mc-front-icons'></img>
                                    <h5 className="card-title">Check Progress</h5>
                                </div>
                                <p className="card-text">Analyse your today's performance.</p>
                                <Link to="/check-progress" className="btn btn-primary mt-auto mc-Card-buttons">View</Link>
                            </div>
                        </div>
                        <div className="card mc-Cards-box d-flex">
                            <div className="card-body d-flex flex-column h-100">
                                <div className="d-flex flex-row mc-svg-box">
                                    <img src={tipsvg} className='img-fluid mc-front-icons'></img>
                                    <h5 className="card-title">Tips</h5>
                                </div>
                                <p className="card-text">To do better.</p>
                                <Link to="/tips" className="btn btn-primary mt-auto mc-Card-buttons">Help</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <div className="Footer">
                    <span className="SignCopyRight" >&#169;</span>
                    <div style={{ textDecoration: "underline", alignSelf: "center" }}> Copyright. All rights are reserve</div>
                </div>
            </div>
        </div>
    )
}
export default Home;