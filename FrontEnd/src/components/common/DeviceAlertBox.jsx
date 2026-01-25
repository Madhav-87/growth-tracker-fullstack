import { useState } from "react";
import '../../styles/Panel.css';
export default function DeviceAlertBox({btn,setBtn}) {
    return (
       <div className="warning">
         <div className={`${btn?'':'blur-background'}`}></div>
            <div className={`alertBox ${btn?"setaalertbox":""}`}>
                <div className="Alertbox-heading"><span className="h3 "><span style={{fontSize:"30px"}}>&#9888;</span> Warning</span><hr></hr></div>
                <div>Once you enable the setting then you can't login from other devices. You can only use this app from this device only.
                </div>
                <div>
                    <button className="btn btn-primary mt-4 mb-4" onClick={()=>setBtn(true)}>Close</button>
                </div>
            </div>
        </div>
    )
}