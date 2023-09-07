import "./css/FormStyles.css"

import React, { useState } from 'react'
import axios from 'axios';
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/UserContext";

const LoginForm = () => {
    const navigate = useNavigate();
    const [auth, setAuth] = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const handleSubmit = async (e) => {
        e.preventDefault();
        let result = await axios.post(`/v1/auth/login`, { email, password });
        console.log("result?.data?.data?.role--->", result?.data?.data?.role);
        if (result?.data?.success) {
            if (result?.data?.data?.user?.role === 1) {
                toast.success(`Welcome Sir .... How are You feeling today ?`)
            }
            else {
                toast.success(`${result.data.message}`)
            }
            localStorage.setItem('pfAuth', JSON.stringify(result.data.data));
            setAuth({
                ...auth,
                user: result.data.data.user,
                token: result.data.data.token
            })
            navigate('/')
        }
        else {
            toast.error(`${result.data.message}`)
        }
    }
    return (
        <div className="form">
            <form>

                <label>Email</label>
                <input value={email} onChange={(e) => setEmail(e.target.value)} type='email' />
                <label>Password</label>
                <input value={password} onChange={(e) => setPassword(e.target.value)} type='password' />
                <button onClick={handleSubmit} type='submit' className="btn">Submit</button>
            </form>
        </div>
    )
}

export default LoginForm