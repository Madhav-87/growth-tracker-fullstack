import { useEffect, useState } from 'react'
export default function Notification({element}) {
    let [state,setState]=useState(true);
    useEffect(()=>{
        setState(element);
    },[element]);
    return (
        <div className={state?'mc-noftify':'mc-notifications-app'}>
            <div className="d-flex align-items-center justify-content-center">
                <div>

                </div>

                <div className='h5'>
                    Do you want notification for your goals?
                </div>
            </div>
            <div className='d-flex align-items-center justify-content-center w-100'>
                <button className='btn btn-primary me-5 mt-2 w-25 ms-5' >Yes</button>
                <button className='btn btn-primary me-5 mt-2 w-25 ms-5' onClick={()=>{setState(true)}}>No</button>
            </div>
        </div>
    )
}
