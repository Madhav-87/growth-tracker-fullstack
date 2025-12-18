import { Link } from 'react-router-dom';
import {useState} from 'react';
import YearlyCirPro from './Components/YearlyCirPro.jsx';
import axios from 'axios';
import {toast,ToastContainer} from 'react-toastify';
import WarningBox from './Components/GoalWarningBox.jsx';
export default function YearGoals() {
    const token=localStorage.getItem("token");
    let [submitBTN,setsubmitBTN]=useState(1);
    let [list,setList]=useState([]);
    let submitForm=(event)=>{
        event.preventDefault();
        let item=event.target.items.value;
        if(!list.includes(item)){
        let oldData=[...list];
        oldData.push(item);
        setList(oldData);
        }
        else{
            toast.error("Task already added");
        }
    }
    let removeItem=(index)=>{
        let newData=list.filter((value,indexNumber)=>{
            return index!=indexNumber;
        })
        setList(newData);
    }
    let showList=()=>{
                    return list.map((value,index)=>{
                        return(
                            <div key={index}>
                                <div className="alert alert-dismissible fade show mc-lists" role="alert">
                                    {value}
                                <button type="button" className="btn-close" aria-label="RemoveItem" onClick={()=>{removeItem(index)}}></button>
                                </div>
                            </div>
                        )
                    }) 
    }
    let transferData=()=>{
        if(list.length===0){
            toast.error("Add your targets firstly");
            return
        }
        axios.post('http://localhost:7000/YearGoals/Submit',list,{
            headers:{
                authorization:`Bearer ${token}`,
                "Content-Type":"application/json"
            }
        }).then((res)=>{
            if(res.data.message==="Done"){
                setsubmitBTN(++submitBTN);
                toast.success("Record Submited");
            }
            else{
                toast.error("Sending Fail!");
            }
        }).catch((err)=>{
            console.log(err);
        })
    }
    return (
        <div>
            <WarningBox/>
            <ToastContainer/>
            <div className="Header">
                <ul className="nav nav-underline">
                    <li className="nav-item">
                        <Link className="nav-link" aria-current="page" to="/Home">Daily</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/Month">Month</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/Year">Year</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link active" to="#">Set Goals</Link>
                    </li>
                </ul>
            </div>
            <div>
                <YearlyCirPro />
            </div>
            <form onSubmit={submitForm}>
                <div className='Input-Section'>
                    <div className="input-group">
                        <input type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" placeholder='Add Targets' name='items'></input>
                    </div>
                    <div>
                        <button className="btn btn-primary">Add</button>
                    </div>
                </div>
            </form>
            <div className='Goals-list'>
                {showList()}
            </div>
            <div className="Submit-Section">
                <button type="button" className="btn btn-success" onClick={()=>transferData()} disabled={submitBTN>1?true:false}>{submitBTN>1?"Submited":"Submit"}</button>
            </div>
        </div>
    )
}