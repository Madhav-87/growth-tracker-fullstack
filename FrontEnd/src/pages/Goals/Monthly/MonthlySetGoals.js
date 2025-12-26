
import { useState } from 'react'
import '../../../styles/DailyGoals2.css';
import axios from 'axios';
import Alert from '../../../components/common/Alert.jsx';
import { isMobile } from 'react-device-detect';
import addTask from '../../../assets/images/addTask.svg';
import { toast, ToastContainer } from 'react-toastify';
import YlineCirProgress from '../../../components/ui/YlineCirProgress.jsx';
import GoalWarningBox from '../../../components/common/GoalWarningBox.jsx';
import GoalPlus from '../../../assets/images/addGoal.svg';
import animeMan from '../../../assets/images/animeMan.png';
import Drawer from '../../../components/common/Drawer.jsx';
import Footer from '../../../components/layout/Footer.jsx';
import Header from '../../../components/layout/Header.jsx';
import { useNavigate } from 'react-router-dom';
export default function MonthlySetGoals() {
    let [Items, setItem] = useState([]);
    const naviagte=useNavigate();
    let token = localStorage.getItem("token" )|| null;
    let [submitBTN, setsubmitBTN] = useState(false);
    let FormSubmit = (event) => {
        event.preventDefault();
        let data = event.target.items.value;
        if (!Items.includes(data)) {
            let OldData = [...Items];
            OldData.push(data);
            setItem(OldData);
        }
        else {
            toast.error("Task already added");
        }
    }
    let removeItem = (index) => {
        let newData = Items.filter((values, indexNumber) => {
            return index !== indexNumber;
        });
        setItem(newData);
    }
    let List =Items.map((value, indexNumber) => {
        return (
            <div key={indexNumber}>
                <div className="alert alert-dismissible fade show mc-items-list d-flex align-items-center" role="alert">
                    <div style={{ height: "50px" }} className='d-flex align-items-center'><img src={GoalPlus} className="h-50 me-3"></img></div>
                    <div className='p-2'>{value}</div>
                   
                    <button type="button" className="btn-close" aria-label="RemoveItem" onClick={() => removeItem(indexNumber)}></button>
                </div>
            </div>
        );
    })
    let SubmitGoals = () => {
        if (Items.length === 0) {
            toast.error("Add your targets firstly");
            return
        }
        axios.post(`${process.env.REACT_APP_API_URL}/Monthly/Goals`, Items, {
            headers: {
                authorization: `Bearer ${token}`,
                "content-type": "application/json"
            }
        }).then((res) => {
            toast.success("Goal Submitted!");
            setsubmitBTN(true);
            setTimeout(()=>{
            naviagte('/home')
          },3000);
        });
    }
    
    return (
       <div>
            <Drawer/>
         <Alert />
            <GoalWarningBox />
            <ToastContainer />
        <Header title={'Monthly Goals'}/>
      <main className='panel-body'>
        {
          isMobile
            ?
            null
            :
            (
              <div className='character-img'>
                <img src={animeMan} alt="image" height="600px" />
              </div>
            )
        }
        <div className='w-100'>
            <div className='d-flex align-items-center justify-content-center fs-2 fw-semibold pt-4 mb-1'>
                Your Monthly Goals
            </div>
            <div className='d-flex align-items-center justify-content-center mb-4' style={{ fontSize: "20px " }}>
            Small steps daily, Big result monthly.
          </div>
            <div className='mc-progress-box'>
                <div className='mc-progress'>
                    <YlineCirProgress/>
                </div>
            </div>
            <div className='mc-input-boxes'>
               <form onSubmit={FormSubmit} style={{display:'flex',width:'100%'}}>
                <div className="input-group ps-mb-3 mt-2">
                        <input type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" placeholder='Add a new goal' name='items'></input>
                    </div>
                    <div>
                        <button className="btn btn-primary mt-2 ms-4">Add</button>
                    </div>
               </form>
            </div>
             <div className='d-flex align-items-center mc-plaintext mb-3' >
            Tip: Momentum makes everything easier.
          </div>
            <div className='goals-panel'>
               {
                    List.length === 0
                        ?
                        <div className="DailyGoalMess">
                            <img src={addTask} className='h-75'></img><span>Please add Goals</span>
                            <span style={{textAlign:"center"}}>Your Goals appear here and sync with your progress.</span>
                        </div>
                        :
                        List
                }
            </div>
            <div className='button-section'>
            <button type="button" onClick={SubmitGoals}   className="btn btn-success" disabled={submitBTN}>Submit Goals</button>
            </div>
           
        </div>
      </main>
       <Footer/>
       </div>
    )
}
