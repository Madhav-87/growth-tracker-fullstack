import React, { useEffect, useRef,useState } from 'react'
import Header from '../../components/layout/Header'
import './Settings.css';
import DeviceAlertBox from '../../components/common/DeviceAlertBox';
import Footer from '../../components/layout/Footer';
import axios from 'axios';
import ChildLock from '../../components/common/ChildLock';
export default function Settings() {
    
    let [btn, setBtn] = useState(true);
    let [childConfirm,setChildConfirm]=useState(false);
    let [showChildWarn,setChildWarn]=useState(false);
    const childCheck=useRef(null);
   
    
    function showDeviceAlert(e) {
        let isCheck = e.target.checked
        if (isCheck) {
            setBtn(false);
        }
    }
    useEffect(()=>{
        if(childCheck.current.checked && childConfirm==true){
            childCheck.current.checked=true;
            
        }
        else{
            childCheck.current.checked=false;
        }
    },[childConfirm])
    function showChildAlert(e) {
         let isCheck = e.target.checked
        if (isCheck) {
        setChildWarn(true)
        }
    }
    let [deviceLock, setDeviceLock] = useState(false);
    // useEffect(() => {
    //     return () => {
    //         const fingerPrint = btoa(
    //             navigator.userAgent +
    //             screen.width +
    //             screen.height +
    //             Intl.DateTimeFormat().resolvedOptions().timeZone
    //         );
    //         axios.post(`${process.env.REACT_APP_API_URL}/deviceLock`,{data:fingerPrint},{
    //         headers:{
    //             Authorization:`Bearer ${token}`,
    //             'Content-Type':'application/json'
    //         }
    //         }).then((res)=>{

    //         }).catch((err)=>{

    //         })
    //     }
    // }, []);
    return (
        <div className='setting-page'>
            <DeviceAlertBox btn={btn} setBtn={setBtn} />
            <ChildLock childConfirm={childConfirm} setChildConfirm={setChildConfirm} showChildWarn={showChildWarn} setChildWarn={setChildWarn}/>
            <Header title="Settings"></Header>
            <div className='title-section'>
                <div className='setting-label'>
                    <span class="material-symbols-outlined">
                        settings
                    </span>
                    <div>Settings</div>
                </div>
                <div className='setting-heading'>
                    Coustomize Your Experience
                </div>
                <div className='setting-subtxt'>
                    Personalise your Growth Tracker to work the way you do.
                </div>
            </div>
            <div className='box-section'>
                <div className='box-div'>
                    <div className='settings-title'>
                        Privacy & Security
                    </div>
                    <hr></hr>
                    <div className='setting-box mb-3'>
                        <div className='setting-box-text-section'>
                            <div className='setting-box-text-title'>
                                <span class="color-org lock">
                                    &#x1F9D2;&#x1F510;


                                </span>
                                <span>Child Lock</span>
                            </div>
                            <div>
                                Enable Child Lock for Parental Control.
                            </div>
                        </div>
                        <div>
                            <div class="form-check form-switch">
                                <input ref={childCheck} class="form-check-input" type="checkbox" role="switch" id="switchCheckDefault" onClick={(e) => { showChildAlert(e) }} />
                                <label class="form-check-label" for="switchCheckDefault"></label>
                            </div>
                        </div>
                    </div>
                    <div className='setting-box'>
                        <div className='setting-box-text-section'>
                            <div className='setting-box-text-title'>
                                <span class="color-org lock">
                                    &#128274;

                                </span>
                                <span>Allow Access Up to This Device</span>
                            </div>
                            <div>
                                Restrict data access to device only for enhance privacy and security.
                            </div>
                        </div>
                        <div>
                            <div class="form-check form-switch">
                                <input class="form-check-input" type="checkbox" role="switch" id="switchCheckDefault" onClick={(e) => { showDeviceAlert(e) }} />
                                <label class="form-check-label" for="switchCheckDefault"></label>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='box-div'>
                    <div className='settings-title'>
                        Display Preferences
                    </div>
                    <hr></hr>
                    <div className='setting-box'>
                        <div className='setting-box-text-section'>
                            <div className='setting-box-text-title'>
                                <span class="color-org lock">
                                    &#x1F514;

                                </span>
                                <span>Hide Warning Boxes</span>
                            </div>
                            <div>
                                Disable warning notifications and alert boxes.
                            </div>
                        </div>
                        <div>
                            <div class="form-check form-switch">
                                <input class="form-check-input" type="checkbox" role="switch" id="switchCheckDefault" />
                                <label class="form-check-label" for="switchCheckDefault"></label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}
