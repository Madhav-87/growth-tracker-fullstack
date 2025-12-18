import Yearimg1 from './Yearimg1.png';
import Yearimg2 from './Yearimg2.png';
import Yearimg3 from './Yearimg3.png';
import annual from './annual.svg';
import annualReport from './annualReport.svg';
import sword from './sword.svg';
import annualtip from './annualtip.svg';
import { Link } from 'react-router-dom';
import './App.css';
export default function Year() {
    return (
        <div>
            <div className="Header">
                <ul className="nav nav-underline">
                    <li className="nav-item">
                        <Link className="nav-link" aria-current="page" to="/Home">Daily</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/Month">Month</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link active" to="#">Year</Link>
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
                                <img src={Yearimg1} className="d-block coustome-height img-fluid" alt="Dream img"></img>
                            </div>
                            <div className="carousel-item">
                                <img src={Yearimg2} className="d-block coustome-height img-fluid " alt="Teacher img"></img>
                            </div>
                            <div className="carousel-item">
                                <img src={Yearimg3} className="d-block coustome-height img-fluid" alt="Man img" style={{ backgroundColor: "#F1F1EA" }}></img>
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
                                    <img src={annual} className='img-fluid mc-front-icons'></img>
                                    <h5 className="card-title">Set Goals</h5>
                                </div>
                                <p className="card-text">Set your long term goals which you want to do.</p>
                                <Link to="/Year/goals" className="btn btn-primary mt-auto mc-Card-buttons">Goals</Link>
                            </div>
                        </div>
                        <div className="card mc-Cards-box d-flex">
                            <div className="card-body d-flex flex-column h-100">
                                <div className="d-flex flex-row mc-svg-box">
                                    <img src={annualReport} className='img-fluid mc-front-icons'></img>
                                    <h5 className="card-title">Submit Response</h5>
                                </div>
                                <p className="card-text">Submit response after completing long term goals.</p>
                                <Link to="/Year/Response" className="btn btn-primary mt-auto mc-Card-buttons">Response</Link>
                            </div>
                        </div>
                        <div className="card mc-Cards-box d-flex">
                            <div className="card-body d-flex flex-column h-100">
                                 <div className="d-flex flex-row mc-svg-box">
                                    <img src={sword} className='img-fluid mc-front-icons'></img>
                                    <h5 className="card-title">Check Progress</h5>
                                </div>
                                <p className="card-text">Analyse your Progress.</p>
                                <Link to="/check-progress" className="btn btn-primary mt-auto mc-Card-buttons">View</Link>
                            </div>
                        </div>
                        <div className="card mc-Cards-box d-flex">
                            <div className="card-body d-flex flex-column h-100">
                                <div className="d-flex flex-row mc-svg-box">
                                    <img src={annualtip} className='img-fluid mc-front-icons'></img>
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