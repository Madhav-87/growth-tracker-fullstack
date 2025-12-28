import { useState } from "react";
import '../../styles/Panel.css';
export default function AlertBox() {
    let [btn,setBtn]=useState(false);
    return (
       <div className="warning">
         <div className={`${btn?'':'blur-background'}`}></div>
            <div className={`alertBox ${btn?"setaalertbox":""}`}>
                <div className="Alertbox-heading"><span className="h3 "><span style={{fontSize:"30px"}}>&#9888;</span> Warning</span><hr></hr></div>
                <div>Please don't submit the tasks that you already submited in
                    your previous visit. If you forgot about that tasks then you
                    can view them in <span className="alertbox-subline">Response Section</span>.
                </div>
                <div>
                    <button className="btn btn-primary mt-4 mb-4" onClick={()=>setBtn(true)}>Close</button>
                </div>
            </div>
        </div>
    )
}