import React, { useEffect, useRef,useState } from 'react'
import Header from '../../components/layout/Header'
import './Settings.css';
import Drawer from '../../components/common/Drawer.jsx';
import DeviceAlertBox from '../../components/common/DeviceAlertBox';
import Footer from '../../components/layout/Footer';
import axios from 'axios';
import ChildLock from '../../components/common/ChildLock';
import ChildLockOff from '../../components/common/ChildLockOff.jsx';
export default function Settings() {
    const isChildLockOn=localStorage.getItem("isChildLockOn")==="true";
    let [childLock,setChildLock]=useState(isChildLockOn);
    let [checkBtn,setCheckBtn]=useState(childLock?true:false);
    //---------------- notify ON ---------------------------//

    let [lockOffNotify,setlockOffNotify]=useState(false);
    let [lockOnNotify,setlockOnNotify]=useState(false);
    //----------------- notify -----------------------------//
    function turnON(){
        setCheckBtn(true);
        setChildLock(true);
    }
    function turnOff(){
        setCheckBtn(false);
        setChildLock(false);
    }
    function showChildLockNotification(){
        setlockOnNotify(true);
        console.log(childLock);
    }
    function showChildLockOffNotification(){
        setlockOffNotify(true);
    }
    function handleCheck(event){
        console.log("Function is calling");
        if(checkBtn){
            showChildLockOffNotification();
        }
        else{
           showChildLockNotification(); 
        }
    }
    return (
        <div className='setting-page'>
            <Drawer/>
            {
            !(childLock===true)
            ? 
            (
            <ChildLock 
                setlockOnNotify={setlockOnNotify}
                lockOnNotify={lockOnNotify}
                turnON={turnON}
            />
            )
            :
            (
            <ChildLockOff
                setlockOffNotify={setlockOffNotify}
                lockOffNotify={lockOffNotify}
                turnOff={turnOff}
            />
            )
        }
        
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
                                <input 
                                class="form-check-input" 
                                type="checkbox"
                                checked={checkBtn} 
                                role="switch" 
                                id="switchCheckDefault" 
                                onClick={(e)=>{handleCheck(e)}}
                               />
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
                                <input 
                                class="form-check-input" 
                                checked={checkBtn} 
                                type="checkbox" 
                                role="switch" 
                                id="switchCheckDefault2"
                                onClick={(e)=>{handleCheck(e)}}
                                />
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
