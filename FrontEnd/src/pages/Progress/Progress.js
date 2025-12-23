import { Link } from 'react-router-dom';
import './progress.css';
import '../../styles/Panel.css';
import Weeklyimg from '../../assets/images/WeeklyProgress.png';
import Monthlyimg from '../../assets/images/MonthProgress.png';
import Yearimg from '../../assets/images/YearProgress.png';
import Alert from '../../components/common/Alert.jsx';
import Footer from '../../components/layout/Footer.jsx';
import Header from '../../components/layout/Header.jsx';
export default function Progress() {
    return (
        <div>
            <Alert />
            <Header title={'Progress'} />
            <main>
                <div className='mc-progress-cards'>
                    <div className="card mc-progress-card" style={{ width: "18rem" }}>
                        <img src={Weeklyimg} className="card-img-top" alt="Weeklyimg"></img>
                        <div className="card-body">
                            <h5 className="card-title">Weekly Progress</h5>
                            <p className="card-text">Check out you daily progress to analyse your growth.</p>
                            <Link to="/WeeklyView" className="btn btn-primary">View</Link>
                        </div>
                    </div>
                    <div className="card mc-progress-card" style={{ width: "18rem" }}>
                        <img src={Monthlyimg} className="card-img-top" alt="Monthlyimg"></img>
                        <div className="card-body">
                            <h5 className="card-title">Monthly Progress</h5>
                            <p className="card-text">Check out your monthly progress to analyse your activity.</p>
                            <Link to="/MonthlyView" className="btn btn-primary">View</Link>
                        </div>
                    </div>
                    <div className="card mc-progress-card" style={{ width: "18rem" }}>
                        <img src={Yearimg} className="card-img-top" alt="Yearimg"></img>
                        <div className="card-body">
                            <h5 className="card-title">Yearly Progress</h5>
                            <p className="card-text">Check out your Yearly progress to analyse your growth.</p>
                            <Link to="/YearlyView" className="btn btn-primary">View</Link>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    )
}
