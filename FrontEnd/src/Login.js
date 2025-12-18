import axios from 'axios';
import Logo from './Logo.png'
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
function Login() {
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
        axios.post("http://localhost:7000/Login", userData)
            .then((res) => {
                if (res.data.message === 'Fail') {
                    toast.error("Invalid credentials");
                }
                else {
                    localStorage.setItem("token", res.data.usertoken);
                    toast.success("Login successfully!");
                }
            }).then((res) => {
                axios.post("http://localhost:7000/report", {}, {
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
        <div className='Login-form-div'>
            <div className='mc-Logo'>
                <div className='logo'>
                    <img src={Logo} className='img-fluid' alt="Logo"/>
                </div>
            </div>
            <form className="row g-3 needs-validation mc-Login" novalidate onSubmit={postMan}>
                <div className="mb-1 h3 d-flex justify-content-center">
                    <label for="exampleFormControlInput1" className="form-label">Login</label>
                </div>
                <div className=" d-block">
                    <label for="validationCustom01" className="form-label">Enter your name</label>
                    <input type="text" className="form-control" id="validationCustom01" onChange={getData} value={userData.userName} name="userName" required />
                    <div className="valid-feedback">
                        Looks good!
                    </div>
                </div>
                <div className="d-block">
                    <label for="validationCustom02" className="form-label">Enter your email</label>
                    <input type="text" className="form-control" id="validationCustom02" name="userEmail" onChange={getData} value={userData.userEmail} required />
                    <div className="valid-feedback">
                        Looks good!
                    </div>
                </div>
                <div className=" d-block">
                    <label for="validationCustom03" className="form-label">Enter you password</label>
                    <input type="text" className="form-control" id="validationCustom03" name="userPassword" onChange={getData} value={userData.userPassword} required />
                    <div className="valid-feedback">
                        Looks good!
                    </div>
                </div>
                <button className="btn btn-primary login-buttons" >Login</button>
                <hr></hr>
                <Link className="btn btn-success login-buttons" type="button" to="/create-account">Create Account</Link>
            </form>
            <ToastContainer />
        </div>
    )
}
export default Login;