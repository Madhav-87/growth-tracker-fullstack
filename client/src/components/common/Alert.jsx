import { useEffect,useState } from 'react'

export default function Alert () {
    let [div, setdiv] = useState();
    useEffect(() => {
        let report = localStorage.getItem('report');
        if (report === 'alert') {
            let box = 
            <div className="alert alert-danger alert-dismissible fade show m-0 " style={{borderRadius:"0px"}} role="alert">
                <strong>High Alert- </strong> Your last 3 Days progress is less than 50%.
                <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
            
            setdiv(box);
        }
    },[]);
    return (
        <div>
            {div}
        </div>
    )
}
