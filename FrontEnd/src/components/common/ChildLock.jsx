import { useEffect, useState } from "react";
import '../../styles/Panel.css';
import { toast,ToastContainer } from "react-toastify";
export default function ChildLock({ childConfirm, setChildConfirm, showChildWarn, setChildWarn }) {
   
    let [btn, setBtn] = useState(showChildWarn);
    let [confirmPIN,setConfirmPIN]=useState(false);
    let [UserPIN,setUSERPIN]=useState({
        ChildLockPIN:""
    })
    function submitPIN(){
        if(UserPIN.ChildLockPIN===""){
            toast.error("Opps! Please Enter PIN")
            return;
        }
        else{
            let newObj={
            ChildLockPIN:""
            }

            setUSERPIN(newObj);setChildWarn(false); setChildConfirm(true);setConfirmPIN(false);
            toast.success("Child Lock Enabled!")
        }
    }
    function handleChange(e){
        let valueOfPro=e.target.value;
        let newObj={
            ChildLockPIN:valueOfPro
        }
        setUSERPIN(newObj);
    }
    return (
        <div className="warning">
            <ToastContainer/>
            <div className={`${!showChildWarn ? '' : 'blur-background'}`}></div>
            <div className={`alertBox ${!showChildWarn ? "setaalertbox" : ""}`}>
                <div className="Alertbox-heading"><span className="h3 "><span style={{ fontSize: "30px" }}>&#9888;</span> Notice</span><hr></hr></div>
                <div>Once you enable child lock you can manage device control for your child. Are you sure you want to enable child lock?
                </div>
                <div>
                    <button className="btn btn-primary mt-4 mb-4 me-4" onClick={() => { setConfirmPIN(true) }}>{confirmPIN?'Confirmed':'Confirm'}</button>
                    <button className="btn btn-primary mt-4 mb-4" onClick={() => { setChildWarn(false); setChildConfirm((prev)=>prev==="false"? false:"false");setConfirmPIN(false) }}>Cancel</button>
                </div>
                {
                confirmPIN
                    ?
                    (
                        <div>
                            <div class="mb-3">
                            <label  class="form-label">Enter the Child Lock PIN</label>
                            <input type="password" class="form-control" value={UserPIN.ChildLockPIN} name="ChildLockPIN" onChange={(e)=>{handleChange(e)}} required/>
                            </div>
                            <div>
                               <button className="btn btn-primary mt-4 mb-4" onClick={() => { submitPIN()}}>Set PIN</button> 
                            </div>
                        </div>
                    )
                    :
                    null
            }
            </div>
            
        </div>
    )
}