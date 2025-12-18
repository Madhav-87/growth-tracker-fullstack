import { useState } from 'react'
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import Logo from './Logo.png';
export function CreateAccount() {
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
    axios.post("http://localhost:7000/addRecord", userData)
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
    < div className="Login-form-div" >
      <div className='mc-Logo'>
        <div className='logo'>
          <img src={Logo} className='img-fluid' alt="Logo" />
        </div>
      </div>
      <form className="mc-Login" onSubmit={postMan}>
        <div className="mb-3 h3 d-flex justify-content-center">
          <label for="exampleFormControlInput1" className="form-label">Create Account</label>
        </div>
        <div className="mb-3">
          <label for="exampleFormControlInput1" className="form-label">Enter your name</label>
          <input type="text" className="form-control border-dark" id="exampleFormControlInput1" name="userName" value={userData.userName} onChange={getData} />
        </div>
        <div className="mb-3">
          <label for="exampleFormControlInput2" className="form-label">Enter your email</label>
          <input type="email" className="form-control border-dark" id="exampleFormControlInput2" name="userEmail" value={userData.userEmail} onChange={getData} />
        </div>
        <div className="mb-3">
          <label for="exampleFormControlInput3" className="form-label">Enter your password</label>
          <input type="password" className="form-control border-dark" id="exampleFormControlInput3" name="userPassword" value={userData.userPassword} onChange={getData} />
        </div>
        <button className="btn btn-success">Sign Up</button>
      </form>
      <ToastContainer />
    </div >
  )
}
