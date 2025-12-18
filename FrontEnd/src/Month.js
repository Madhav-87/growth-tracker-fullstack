import './App.css';
import Girl from './Tipimg1.png';
import Boy1 from './Questionimg2.png';
import Boy2 from './Tipimg2.png';
import monthGoalsSvg from './monthGoals.svg';
import monthreportSvg from './monthReport.svg';
import medalSvg from './medal.svg';
import supportSvg from './support.svg';
import { Link } from 'react-router-dom';
import Alert from './Components/Alert.jsx';
function Month() {
    return (
        <div>
            <Alert />
            <div className="Header">
                <ul className="nav nav-underline">
                    <li className="nav-item">
                        <Link className="nav-link " aria-current="page" to="/Home">Daily</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link active" to="/Month">Month</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/Year">Year</Link>
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
                                <img src={Girl} className="d-block coustome-height" alt="Girl give advice"></img>
                            </div>
                            <div className="carousel-item">
                                <img src={Boy1} className="d-block coustome-height" alt="Boy try to think"></img>
                            </div>
                            <div className="carousel-item">
                                <img src={Boy2} className="d-block coustome-height" alt="Boy gives advice"></img>
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
                                    <img src={monthGoalsSvg} className='img-fluid mc-front-icons'></img>
                                    <h5 className="card-title">Set Your Monthly Goals</h5>
                                </div>
                                <p className="card-text">Set your monthly goals which you want to do.</p>
                                <Link to="/Monthly/Goals" className="btn btn-primary mt-auto mc-Card-buttons">Goals</Link>
                            </div>
                        </div>
                        <div className="card mc-Cards-box d-flex">
                            <div className="card-body d-flex flex-column h-100">
                                 <div className="d-flex flex-row mc-svg-box">
                                    <img src={monthreportSvg} className='img-fluid mc-front-icons'></img>
                                    <h5 className="card-title">Submit Response</h5>
                                </div>
                                <p className="card-text">Submit response after completing monthly work.</p>
                                <Link to="/Month/Response" className="btn btn-primary mt-auto mc-Card-buttons">Response</Link>
                            </div>
                        </div>
                        <div className="card mc-Cards-box d-flex">
                            <div className="card-body d-flex flex-column h-100">
                                <div className="d-flex flex-row mc-svg-box">
                                    <img src={medalSvg} className='img-fluid mc-front-icons'></img>
                                    <h5 className="card-title">Check Progress</h5>
                                </div>
                                <p className="card-text">Analyse your monthly performance.</p>
                                <Link to="/check-progress" className="btn btn-primary mt-auto mc-Card-buttons">View</Link>
                            </div>
                        </div>
                        <div className="card mc-Cards-box d-flex">
                            <div className="card-body d-flex flex-column h-100">
                                <div className="d-flex flex-row mc-svg-box">
                                    <img src={supportSvg} className='img-fluid mc-front-icons'></img>
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
export default Month;