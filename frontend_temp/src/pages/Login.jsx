import React, { useState } from 'react';
import './Auth.css';
import {useNavigate} from 'react-router-dom'
const Login = () => {
  const [userNameorEmail,setusernameoremail]=useState("")
  const [password,setpassword]=useState("")
  const [error,seterror]=useState("")
  const navigate=useNavigate()
  const handleSubmit = async(e) => {
    e.preventDefault();

    const response=await fetch("http://localhost:8080/user/login",{

      method:"POST",
      headers:{'Content-Type':"application/json"},
      body:JSON.stringify({userNameorEmail,password})
    })
    const data=await response.json()
    if(response.ok){
      localStorage.setItem("token",data.token)
      navigate("/")
      //alert("Success")
    }
    else{
      seterror(data.message)
    }
   
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Login</h2>
        {error && <p>{error || "Error encounterd"}</p>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="usernameOrEmail">Username / Email</label>
            <input type="text" id="usernameOrEmail" 
            value={userNameorEmail}
            onChange={(e)=>setusernameoremail(e.target.value)}
            required />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" id="password"
            value={password}
            onChange={(e)=>setpassword(e.target.value)}
            required />
          </div>
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;