import { useState } from 'react'
import './drawer.css';
import {useNavigate } from 'react-router-dom';
export default function Drawer() {
  let [drawerbtn, setdrawerbtn] = useState(true);
  const navigate = useNavigate();
  return (
    <div>
      <div className={`drawer-cicle ${drawerbtn ? '' : 'open'}`}>
        {
          drawerbtn
            ?
            <button className="material-symbols-outlined fs-1" onClick={() => { setdrawerbtn(!drawerbtn) }}>
              rocket_launch
            </button>
            :
            <div className='h-100'>
              <div className='mt-4 pt-2 mb-2 button-panel'>
                {/* {body} */}
                <div className='drawer-panel' onClick={() => { navigate('/WeeklyView') }}>
                  <div className='drawer-icon'><span className="material-symbols-outlined">
                    view_week
                  </span>
                  </div>
                  <div>
                    Weekly View
                  </div>
                </div>
                <div className='drawer-panel' onClick={() => { navigate('/MonthlyView') }}>
                  <div className='drawer-icon'><span className="material-symbols-outlined">
                    calendar_month
                  </span>
                  </div>
                  <div>
                    Monthly View
                  </div>
                </div>
                <div className='drawer-panel' onClick={() => { navigate('/YearlyView') }}>
                  <div className='drawer-icon'><span className="material-symbols-outlined">
                    timeline
                  </span>
                  </div>
                  <div>
                    Yearly View
                  </div>
                </div>
                <div className='drawer-panel' onClick={() => { navigate('/tips') }}>
                  <div className='drawer-icon'><span className="material-symbols-outlined">
                    lightbulb
                  </span>
                  </div>
                  <div>
                    Tips
                  </div>
                </div>
                <div className='drawer-panel' onClick={() => { navigate('/chatbot') }}>
                  <div className='drawer-icon'><span className="material-symbols-outlined">
                    smart_toy
                  </span>
                  </div>
                  <div>
                    AI Growth Coach
                  </div>
                </div>
                <div className='drawer-panel' onClick={() => { navigate('/studyPlanner/dashboard') }}>
                  <div className='drawer-icon'><span className="material-symbols-outlined">
                    school
                  </span>
                  </div>
                  <div>
                    Study Planner
                  </div>
                </div>
              </div>
              <div className='drawer-header'>
                {/* {Header} */}
                <div className='me-1'>
                  <span className="material-symbols-outlined drawer-close" onClick={() => { setdrawerbtn(!drawerbtn) }}>
                    close
                  </span>
                </div>
                <div className='drawer-header-txt-block'>
                  <div className='fw-medium fs-4'>Growth Tracker</div>
                  <div className='drawer-subtxt'>V1.0</div>
                </div>


              </div>
            </div>
        }
      </div>
    </div>
  )
}
