
import React, { useState } from 'react'
import '../../../styles/DailyGoals2.css';
import axios from 'axios';
import Alert from '../../../components/common/Alert.jsx';
import addTask from '../../../assets/images/addTask.svg';
import { toast, ToastContainer } from 'react-toastify';
import YlineCirProgress from '../../../components/ui/YlineCirProgress.jsx';
import GoalWarningBox from '../../../components/common/GoalWarningBox.jsx';
import GoalPlus from '../../../assets/images/addGoal.svg';
import animeMan from '../../../assets/images/animeMan.png';
import { isMobile } from 'react-device-detect';
import Drawer from '../../../components/common/Drawer.jsx';
import Footer from '../../../components/layout/Footer.jsx';
import Header from '../../../components/layout/Header.jsx';
import { useNavigate } from 'react-router-dom';
export default function DailyGoals() {
  let token = localStorage.getItem('token');
  const navigate=useNavigate();
  let [Goalslist, setGoals] = useState([]);
  let [visible, setVisible] = useState(true);
  let sendlist = (event) => {
    event.preventDefault();
    let data = event.target.items.value;
    if (!Goalslist.includes(data)) {
      let finalData = [...Goalslist, data];
      setGoals(finalData);
    }
    else {
      toast.error('Task already added');
    }
  }
  let itemlist = Goalslist.map((value, indexNumber) => {
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
  let removeItem = (index) => {
    let finalData = Goalslist.filter((value, indexNumber) => {
      return indexNumber !== index;
    })
    setGoals(finalData);
  }
  let submitGoals = () => {
    if (Goalslist.length === 0) {
      toast.error("Add your targets firstly");
      return
    }
    setVisible(!visible);
    if (visible === false) {

    }
    axios.post(`${process.env.REACT_APP_API_URL}/daily-goals-submit`, Goalslist, {
      headers: {
        authorization: `Bearer ${token}`,
        'content-type': 'application/json'
      }
    })
      .then((res) => {
        if (res.data.message === "Done!") {
          toast.success("Goals Added!");
          setTimeout(()=>{
            navigate('/home')
          },3000);
        }
        else {
          toast.error("Fail");
        }
      })
      .catch((err) => {
        console.log(err);
      })
  }
 
  return (
    <div>
          <Drawer/>
      <Alert />
      <GoalWarningBox />
      <ToastContainer />
      <Header title={'Daily Goals'}/>
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
            Your Daily Goals
          </div>
          <div className='d-flex align-items-center justify-content-center mb-4' style={{ fontSize: "20px " }}>
            stay consistent and track your progress
          </div>
          <div className='mc-progress-box'>
            <div className='mc-progress'>
              <YlineCirProgress />
            </div>
          </div>
          <div className='mc-input-boxes'>
            <form onSubmit={sendlist} style={{ display: 'flex', width: '100%' }}>
              <div className="input-group ps-mb-3 mt-2">
                <input type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" placeholder='Add a new goal' name='items'></input>
              </div>
              <div>
                <button className="btn btn-primary mt-2 ms-4">Add</button>
              </div>
            </form>
          </div>
          <div className='d-flex align-items-center mc-plaintext mb-3'>
            Tip: Start with one important thing
          </div>
          <div className='goals-panel'>
            {
              itemlist.length === 0
                ?
                <div className="DailyGoalMess">
                  <img src={addTask} className='h-75'></img><span><h4>Please add Goals</h4></span><span className='text-center'>Your Goals appear here and sync with your progress.</span>
                </div>
                :
                itemlist
            }
          </div>
          <div className='button-section'>
            <button type="button" onClick={submitGoals} className="btn btn-success">Submit Goals</button>

          </div>

        </div>
      </main>
     <Footer/>
    </div>
  )
}
