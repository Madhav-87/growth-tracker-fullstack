import { useEffect, useState } from "react";
import '../../styles/Panel.css';
import { toast, ToastContainer } from "react-toastify";
import axios from 'axios';
export default function ChildLockOff({setlockOffNotify,lockOffNotify,turnOff}) {
    const token=localStorage.getItem('token');
    let [confirmPIN, setConfirmPIN] = useState(false);

//-------------User Pin Input-------------//
    let [UserPIN, setUSERPIN] = useState({
        ChildLockPIN: ""
    })
//---------------------------------------//

//--------To turn off notification-------//
    function OffNotify(){
        clearPIN();
        setlockOffNotify(false);
        setConfirmPIN(false);
    }
//---------------------------------------//

//--------To confirm user pin------------//
    function userConfirm(){
        setConfirmPIN(true);
    }
//---------------------------------------//
    function handleChange(e) {
        let valueOfPro = (e.target.value).trim();
        let newObj = {
            ChildLockPIN: valueOfPro
        }
        setUSERPIN(newObj);
    }
//---------Clearing input---------------//
    function clearPIN(){
        let newObj = {
            ChildLockPIN: ""
        }
        setUSERPIN(newObj);
    }
//---------------------------------------//
    function submitPIN() {
        if (UserPIN.ChildLockPIN === "") {
            toast.error("Opps! Please Enter PIN")
            return;
        }
        else {
          
            axios.post(`${process.env.REACT_APP_API_URL}/deviceLockOff`, {
                userPin:UserPIN["ChildLockPIN"]
             }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            }).then((res) => {
                if(res.data.message==="invalid pin"){
                    toast.error("Invalid Pin!",{
                        hideProgressBar: true
                    });
                clearPIN();
                }
                if(res.data.message==="done"){
                    toast.error("Deactivating Child Lock…",{
                        hideProgressBar: true
                    });
                    localStorage.removeItem("isChildLockOn");
                    setTimeout(()=>{
                        turnOff();
                    },5000);
                }
            }).catch((err) => {
                console.log(err);
                toast.error("Something broken..!");
            }).finally(()=>{
                OffNotify();
                clearPIN();
            })
           
        }
    }
    return (
        <div className="warning">
            <ToastContainer />
            <div className={`${!lockOffNotify ? '' : 'blur-background'}`}></div>
            <div className={`alertBox ${!lockOffNotify ? "setaalertbox" : ""}`}>
                <div className="Alertbox-heading"><span className="h3 "><span style={{ fontSize: "30px" }}>&#9888;</span> Notice</span><hr></hr></div>
                <div>Are you really want to turn off the child lock?
                </div>
                <div>
                    <button 
                    className="btn btn-primary mt-4 mb-4 me-4"
                    onClick={()=>{userConfirm()}}
                    >
                    {confirmPIN ? 'Confirmed' : 'Confirm'}
                    </button>

                    <button 
                    className="btn btn-primary mt-4 mb-4" 
                    onClick={() => {OffNotify()}}
                    >Cancel
                    </button>
                </div>
                {
                    confirmPIN
                        ?
                        (
                            <div>
                                <div class="mb-3">
                                    <label class="form-label">Enter The Child Lock PIN</label>
                                    <input type="password" class="form-control" value={UserPIN.ChildLockPIN} name="ChildLockPIN" onChange={(e) => { handleChange(e) }} required />
                                </div>
                                <div>
                                    <button className="btn btn-primary mt-4 mb-4" onClick={() => { submitPIN() }}>Turn Off</button>
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