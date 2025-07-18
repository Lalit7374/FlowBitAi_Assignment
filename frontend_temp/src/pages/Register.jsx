import { useState } from 'react';
import './Auth.css';

const Register = () => {
const[firstName,setFirstName]=useState("")
const[lastName,setLastName]=useState("")
const[email,setemail]=useState("")
const[userName,setuserName]=useState("")
const[password,setpassword]=useState("")

  const handleSubmit = async(e) => {
    e.preventDefault();
    //console.log(firstName,lastName,email,password,userName)

    const response=await fetch("http://localhost:8080/user/register",{

      method:"POST",
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify({firstName,lastName,email,userName,password})
    })
    // console.log(response)
   // const data=await response.json()
   // console.log(data)
    //alert(data.message)
    // Handle registration logic here
    if(response.ok){
      alert("Success")
    }
    else{
      alert("Failed")
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Register</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="firstName">First Name</label>
              <input type="text" id="firstName" 
              value={firstName}
              onChange={(e)=>setFirstName(e.target.value)}
              
              required />
            </div>
            <div className="form-group">
              <label htmlFor="lastName">Last Name</label>
              <input type="text" id="lastName"
              value={lastName}
              onChange={(e)=>setLastName(e.target.value)} required />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" 
            value={email}
            onChange={(e)=>setemail(e.target.value)}required />
          </div>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input type="text" id="username" 
            value={userName}
            onChange={(e)=>setuserName(e.target.value)}required />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" 
            value={password}
            onChange={(e)=>setpassword(e.target.value)}required />
          </div>
          <button type="submit">Register</button>
        </form>
      </div>
    </div>
  );
};

export default Register;