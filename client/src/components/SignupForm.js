import "./css/FormStyles.css"

import React, { useState } from 'react'
import axios from 'axios';
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
// import { useAuth } from "../context/UserContext";

const SignupForm = () => {
    const navigate = useNavigate();
    // const [auth,setAuth] = useAuth();
    const [name,setName] = useState('');
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const handleSubmit = async(e)=>{
        e.preventDefault();
        let result = await axios.post(`/v1/auth/register`,{name,email,password});
        if(result.data.success){
            toast.success(`${result.data.message}`)
            navigate('/login')
        }
        else{
            toast.error(`${result.data.message}`)
        }
    }
  return (
    <div className="form">
        <form>
            
            <label>Full Name</label>
            <input value={name} onChange={(e)=>setName(e.target.value)} type='text'/>
            <label>Email</label>
            <input value={email} onChange={(e)=>setEmail(e.target.value)} type='email'/>
            <label>Password</label>
            <input value={password} onChange={(e)=>setPassword(e.target.value)} type='password'/>
            <button onClick={handleSubmit} type='submit' className="btn">Submit</button>
        </form>
    </div>
  )
}

export default SignupForm