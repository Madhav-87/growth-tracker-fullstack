import { useState } from "react";
export default function ResWarningBox(probs) {
    let [btn,setBtn]=useState(false);
    return (
        <div>
            <div className={`alertBox ${btn?"setaalertbox":""}`}>
                <div className="Alertbox-heading"><span className="h3 "><spna style={{fontSize:"30px"}}>&#9888;</spna> Warning</span><hr></hr></div>
                <div>Please submit your response after completing all the goals at the end of
                    the <span className="alertbox-subline">{probs.identity}</span>. It is important
                    to note that you can submit response only at once for <span className="alertbox-subline">{probs.identity}</span> respectively, 
                    After that the another second response regarding same <span className="alertbox-subline">{probs.identity}</span> will
                    not be consider or taken.
                </div>
                <div>
                    <button className="btn btn-primary mt-4 mb-4" onClick={()=>setBtn(true)}>Close</button>
                </div>
            </div>
        </div>
    )
}