
import '../../styles/form.css';
import arrow from '../../assets/images/arrow.png'
import axios from 'axios';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
function App() {
  let navigate = useNavigate();
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
    axios.post(`${process.env.REACT_APP_API_URL}/Login`, userData)
      .then((res) => {
        if (res.data.message === 'Fail') {
          toast.error("Invalid credentials");
        }
        else {
          localStorage.setItem("token", res.data.usertoken);
          toast.success("Login successfully!");
        }
      }).then((res) => {
        axios.post(`${process.env.REACT_APP_API_URL}/report`, {}, {
          headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json"
          }
        }).then((res) => {
          localStorage.setItem("report", res.data.report);
          navigate('/Home');
        }).catch((err) => {
          console.log(err);
        })
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
          Transform your potential into progress
        </div>
        <div className='mc-login-form'>
          <div className='d-flex flex-column align-items-center'>
            <div className='h4 mt-3 pt-2'>
              Welcome Back
            </div>
            <div className='mb-2'>
              Continue your journey of personal growth
            </div>
          </div>
          <form onSubmit={postMan}>
            <div className='p-4'>
              <div className='mb-3'>
                <label for="exampleFormControlInput1" class="form-label">Name</label>
                <input type="text" class="form-control" id="exampleFormControlInput1" placeholder="Enter your name" onChange={getData} value={userData.userName} name="userName" required></input>
              </div>
              <div className='mb-3'>
                <label for="exampleFormControlInput1" class="form-label">Email address</label>
                <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="Enter your email" name="userEmail" onChange={getData} value={userData.userEmail} required ></input>
              </div>
              <div className='mb-3'>
                <label for="exampleFormControlInput1" class="form-label">Password</label>
                <input type="text" class="form-control" id="exampleFormControlInput1" placeholder="Enter your password" name="userPassword" onChange={getData} value={userData.userPassword} required></input>
              </div>
              <div className='d-flex flex-column align-items-end mc-login-txt'>
                forgot password?
              </div>
              <div>
                <button type="submit" className="mc-login-btn w-100 text-white btn mt-3 mb-3">
                  Login
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
                Don't have an account?  <Link to="/create-account" className='text-decoration-none'><span className='mc-login-txt ms-1'>Sign up for free</span></Link>
              </div>
            </div>
          </form>
        </div>
        <div className='pt-2 ps-4 pe-4 d-flex align-items-center justify-content-center flex-column'>
          <span className='text-center'>"The only impossible journey is the one you never begin."</span>
          <span className='text-center'>- Tony Robbins</span>
        </div>
      </div>
    </div>
  );
}

export default App;
