import arrow from './arrow.png'
import axios from 'axios';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import './form.css';
export default function App() {
    let [userData, setUserData] = useState({
        userName: "",
        userEmail: "",
        userPassword: ""
    });
    let getData = (event) => {
        let InputValue = event.target.value;
        let InputName = event.target.name;
        let OldData = { ...userData };
        OldData[InputName] = InputValue;
        setUserData(OldData);
    }
    let postMan = async (event) => {
        event.preventDefault();
        axios.post(`${process.env.REACT_APP_API_URL}/addRecord`, userData)
            .then((res) => {
                if (res.data.message === 'Done') {
                    toast.success("Account created!");
                }
                else {
                    toast.error("Email or password is exists!");
                }
            })
            .catch((err) => {
                console.log(err);
            });
        }
        return (
            <div>
                <ToastContainer />
                <div className='d-flex align-items-center flex-column  mc-login-background'>
                    <div className='mt-3 mb-3 mc-login-box'>
                        <img src={arrow} height="100px"></img>
                    </div>
                    <div className='mb-2 mc-login-title h1'>
                        GrowthTracker
                    </div>
                    <div className='mb-3 mc-login-title'>
                        Begin your transformation journey
                    </div>
                    <div className='mc-login-form'>
                        <div className='d-flex flex-column align-items-center'>
                            <div className='h4 mt-3 pt-2'>
                                Create Your Account
                            </div>
                            <div className='mb-2'>
                                Start tracking your personal growth today
                            </div>
                        </div>
                        <form onSubmit={postMan}>
                            <div className='p-4'>
                                <div className='mb-3'>
                                    <label for="exampleFormControlInput1" class="form-label">Name</label>
                                    <input type="text" class="form-control" id="exampleFormControlInput1" placeholder="Enter your name" name="userName" value={userData.userName} onChange={getData} required ></input>
                                </div>
                                <div className='mb-3'>
                                    <label for="exampleFormControlInput1" class="form-label">Email address</label>
                                    <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="Enter your email" name="userEmail" value={userData.userEmail} onChange={getData} required ></input>
                                </div>
                                <div className='mb-3'>
                                    <label for="exampleFormControlInput1" class="form-label">Password</label>
                                    <input type="text" class="form-control" id="exampleFormControlInput1" placeholder="Enter your password" name="userPassword" value={userData.userPassword} onChange={getData} required ></input>
                                </div>
                                <div>
                                    <button className="mc-login-btn w-100 text-white btn mt-3 mb-3">
                                        Create Account
                                    </button>
                                </div>
                                <div>
                                    <div className='d-flex align-items-center justify-content-center'>
                                        <hr className='w-25 me-3'></hr>
                                        <span className='align-text-top'>or</span>
                                        <hr className='w-25 ms-3'></hr>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center justify-content-center'>
                                    Already have an account?  <Link to="/" className='text-decoration-none'><span className='mc-login-txt ms-1'>Sign in here</span></Link>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className='pt-2 ps-4 pe-4 d-flex align-items-center justify-content-center flex-column'>
                        <span className='text-center'>"The journey of a thousand miles begins with one step"</span>
                        <span className='text-center'>- Lao Tzu</span>
                    </div>
                </div>
            </div>
        )
    }
