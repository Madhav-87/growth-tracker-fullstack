import { useEffect, useState } from "react";
import '../../styles/Panel.css';
import { toast, ToastContainer } from "react-toastify";
import axios from 'axios';
export default function ChildLock({ setlockOnNotify, lockOnNotify, turnON }) {
    const token = localStorage.getItem('token');
    let [confirmPIN, setConfirmPIN] = useState(false);

    let [UserPIN, setUSERPIN] = useState({
        ChildLockPIN: ""
    })

    //--------To turn off notification-------//
    function OffNotify() {
        setlockOnNotify(false);
        setConfirmPIN(false);
    }
    //---------------------------------------//

    function OffNotify() {
        setlockOnNotify(false);
        setConfirmPIN(false);
    }

    //--------To confirm user pin------------//
    function userConfirm() {
        setConfirmPIN(true);
    }
    //---------------------------------------//
    //---------Clearing input---------------//
    function clearPIN() {
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
            const fingerPrint = btoa(
                navigator.userAgent +
                window.screen.width +
                window.screen.height +
                Intl.DateTimeFormat().resolvedOptions().timeZone
            );

            axios.post(`${process.env.REACT_APP_API_URL}/deviceLock`, {
                bluePrint: fingerPrint,
                userAgent: navigator.userAgent,
                width: window.screen.width,
                height: window.screen.height,
                timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
                userPin: UserPIN["ChildLockPIN"]
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            }).then((res) => {
                if (res.data.message === "done") {
                    toast.success("Enabling Child Lock...", {
                        hideProgressBar: true
                    })
                    localStorage.setItem("isChildLockOn",res.data.isChildLockOn);
                    setTimeout(() => {
                        turnON();
                    }, 5000)
                }
            }).catch((err) => {
                console.log(err);
                toast.error("Something broken..!");
            }).finally(() => {

                OffNotify();
                clearPIN();
            })
        }
    }
    function handleChange(e) {
        let valueOfPro = (e.target.value).trim();
        let newObj = {
            ChildLockPIN: valueOfPro
        }
        setUSERPIN(newObj);
    }
    return (
        <div className="warning">
            <ToastContainer />
            <div className={`${!lockOnNotify ? '' : 'blur-background'}`}></div>
            <div className={`alertBox ${!lockOnNotify ? "setaalertbox" : ""}`}>
                <div className="Alertbox-heading"><span className="h3 "><span style={{ fontSize: "30px" }}>&#9888;</span> Notice</span><hr></hr></div>
                <div>Once you enable child lock you can manage device control for your child. Are you sure you want to enable child lock?
                </div>
                <div>
                    <button
                        className="btn btn-primary mt-4 mb-4 me-4"
                        onClick={() => { userConfirm() }}
                    >{confirmPIN ? 'Confirmed' : 'Confirm'}
                    </button>
                    <button className="btn btn-primary mt-4 mb-4"
                        onClick={() => { OffNotify() }}
                    >Cancel</button>
                </div>
                {
                    confirmPIN
                        ?
                        (
                            <div>
                                <div class="mb-3">
                                    <label class="form-label">Enter the Child Lock PIN</label>
                                    <input type="password" class="form-control" value={UserPIN.ChildLockPIN} name="ChildLockPIN" onChange={(e) => { handleChange(e) }} required />
                                </div>
                                <div>
                                    <button className="btn btn-primary mt-4 mb-4" onClick={() => { submitPIN() }}>Set PIN</button>
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