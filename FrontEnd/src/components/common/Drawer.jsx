import React, { useState } from 'react'
import './drawer.css';
import { Navigate, useNavigate } from 'react-router-dom';
export default function Drawer() {
  let [drawerbtn, setdrawerbtn] = useState(true);
  const navigate = useNavigate();
  return (
    <div>
      <div className={`drawer-cicle ${drawerbtn ? '' : 'open'}`}>
        {
          drawerbtn
            ?
            <button class="material-symbols-outlined fs-1" onClick={() => { setdrawerbtn(!drawerbtn) }}>
              rocket_launch
            </button>
            :
            <div className='h-100'>
              <div className='mt-4 pt-2 mb-2 button-panel'>
                {/* {body} */}
                <div className='drawer-panel' onClick={() => { navigate('/Home') }}>
                  <div className='drawer-icon'><span class="material-symbols-outlined">
                    home_app_logo
                  </span>
                  </div>
                  <div>
                    Day
                  </div>
                </div>
                <div className='drawer-panel' onClick={() => { navigate('/Month') }}>
                  <div className='drawer-icon'><span class="material-symbols-outlined">
                    bookmark
                  </span>
                  </div>
                  <div>
                    Month
                  </div>
                </div>
                <div className='drawer-panel' onClick={() => { navigate('/Year') }}>
                  <div className='drawer-icon'><span class="material-symbols-outlined">
                    workspace_premium
                  </span>
                  </div>
                  <div>
                    Year
                  </div>
                </div>
                <div className='drawer-panel' onClick={() => { navigate('/tips') }}>
                  <div className='drawer-icon'><span class="material-symbols-outlined">
                    lightbulb
                  </span>
                  </div>
                  <div>
                    Tips
                  </div>
                </div>
                <div className='drawer-panel' onClick={() => { navigate('/chatbot') }}>
                  <div className='drawer-icon'><span class="material-symbols-outlined">
                    smart_toy
                  </span>
                  </div>
                  <div>
                    AI Growth Coach
                  </div>
                </div>
                <div className='drawer-panel' onClick={() => { navigate('/chatbot') }}>
                  <div className='drawer-icon'><span class="material-symbols-outlined">
                    smart_toy
                  </span>
                  </div>
                  <div>
                    AI Growth Coach
                  </div>
                </div>
                <div className='drawer-panel' onClick={() => { navigate('/chatbot') }}>
                  <div className='drawer-icon'><span class="material-symbols-outlined">
                    smart_toy
                  </span>
                  </div>
                  <div>
                    AI Growth Coach
                  </div>
                </div>
                <div className='drawer-panel' onClick={() => { navigate('/chatbot') }}>
                  <div className='drawer-icon'><span class="material-symbols-outlined">
                    smart_toy
                  </span>
                  </div>
                  <div>
                    AI Growth Coach
                  </div>
                </div>
                <div className='drawer-panel' onClick={() => { navigate('/chatbot') }}>
                  <div className='drawer-icon'><span class="material-symbols-outlined">
                    smart_toy
                  </span>
                  </div>
                  <div>
                    AI Growth Coach
                  </div>
                </div>
                <div className='drawer-panel' onClick={() => { navigate('/chatbot') }}>
                  <div className='drawer-icon'><span class="material-symbols-outlined">
                    smart_toy
                  </span>
                  </div>
                  <div>
                    AI Growth Coach
                  </div>
                </div>
                <div className='drawer-panel' onClick={() => { navigate('/chatbot') }}>
                  <div className='drawer-icon'><span class="material-symbols-outlined">
                    smart_toy
                  </span>
                  </div>
                  <div>
                    AI Growth Coach
                  </div>
                </div>
                <div className='drawer-panel' onClick={() => { navigate('/chatbot') }}>
                  <div className='drawer-icon'><span class="material-symbols-outlined">
                    smart_toy
                  </span>
                  </div>
                  <div>
                    AI Growth Coach
                  </div>
                </div>
                <div className='drawer-panel' onClick={() => { navigate('/chatbot') }}>
                  <div className='drawer-icon'><span class="material-symbols-outlined">
                    smart_toy
                  </span>
                  </div>
                  <div>
                    AI Growth Coach
                  </div>
                </div>
              </div>
              <div className='drawer-header'>
                {/* {Header} */}
                <div className='me-1'>
                  <span class="material-symbols-outlined drawer-close" onClick={() => { setdrawerbtn(!drawerbtn) }}>
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
