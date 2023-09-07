import "./css/FormStyles.css"

import React, { useState } from 'react'
import axios from 'axios'
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Form = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async () => {
    try {
      let result = await axios.post(`/v1/auth/send-mail`, { name, email, subject, message });

      if (result?.data?.success) {
        toast.success(`${result?.data?.message}`);
        navigate('/')
      }
      else {
        toast.error(`${result?.data?.message}`);
      }
    } catch (error) {
      toast.error('Something went wrong...please try again...')
    }
  }
  return (
    <div className="form">
      <form>
        <label>Your Name</label>
        <input value={name} onChange={(e) => setName(e.target.value)} type='text' required/>
        <label>Email</label>
        <input value={email} onChange={(e) => setEmail(e.target.value)} type='email' required/>
        <label>Subject</label>
        <input value={subject} onChange={(e) => setSubject(e.target.value)} type='text' required/>
        <label>Message</label>
        <textarea value={message} onChange={(e) => setMessage(e.target.value)} rows='6' placeholder="Type your message Here" required></textarea>
        <button type='submit' onClick={handleSubmit} className="btn">Submit</button>
      </form>
    </div>
  )
}

export default Form