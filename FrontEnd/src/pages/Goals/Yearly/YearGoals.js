import { useState } from 'react'
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
export default function YearGoals() {
  const token = localStorage.getItem("token");
  const navigate=useNavigate();
  let [submitBTN, setsubmitBTN] = useState(1);
  let [list, setList] = useState([]);
  let submitForm = (event) => {
    event.preventDefault();
    let item = event.target.items.value;
    if(item===""){
      toast.error("Add Goal First..!");
    }
    else if (!list.includes(item)) {
      let oldData = [...list];
      oldData.push(item);
      setList(oldData);
      event.target.items.value="";
    }
    else {
      toast.error("Task already added");
    }
  }
  let removeItem = (index) => {
    let newData = list.filter((value, indexNumber) => {
      return index != indexNumber;
    })
    setList(newData);
  }
  let Items = list.map((value, indexNumber) => {
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
  let transferData = () => {
    if (list.length === 0) {
      toast.error("Add your targets firstly");
      return
    }
    axios.post(`${process.env.REACT_APP_API_URL}/YearGoals/Submit`, list, {
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    }).then((res) => {
      if (res.data.message === "Done") {
        setsubmitBTN(++submitBTN);
        toast.success("Goals Submited");
        setTimeout(()=>{
            navigate('/Year')
        },3000);
      }
      else {
        toast.error("Sending Fail!");
      }
    }).catch((err) => {
      console.log(err);
    })
  }
  return (
    <div>
      <Drawer />
      <Alert />
      <GoalWarningBox />
      <ToastContainer />
      <Header title={'Yearly Goals'} />
      <main>
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
          <div className='d-flex align-items-center justify-content-center fs-4 fw-semibold mt-4 mb-1'>
            Your Yearly Goals
          </div>
          <div className='d-flex align-items-center justify-content-center mb-4' style={{ fontSize: "20px " }}>
            365 Days. One mission. Become better
          </div>
          <div className='mc-progress-box'>
            <div className='mc-progress'>
              <YlineCirProgress />
            </div>
          </div>
          <div className='mc-input-boxes'>
            <form onSubmit={submitForm} style={{ display: 'flex', width: '100%' }}>
              <div className="input-group mt-2">
                <input type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" placeholder='Add a new goal' name='items'></input>
              </div>
              <div>
                <button className="btn btn-primary mt-2 ms-4">Add</button>
              </div>
            </form>
          </div>
          <div className='d-flex align-items-center mc-plaintext mb-3'>
            Tip: Set 3 big goals, not 30 small ones.
          </div>
          <div className='goals-panel'>
            {
              Items.length === 0
                ?
                <div className="DailyGoalMess">
                  <img src={addTask} className='h-75'></img><span>Please add Goals</span>
                  <span>Your Goals appear here and sync with your progress.</span>
                </div>
                :
                Items
            }
          </div>
          <div className='button-section'>
            <button type="button" onClick={() => transferData()} disabled={submitBTN > 1 ? true : false} className="btn btn-success">{submitBTN > 1 ? "Submited" : "Submit"}</button>

          </div>

        </div>
      </main>
      <Footer />
    </div>
  )
}
