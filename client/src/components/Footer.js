import "./css/FooterStyles.css"

import React from 'react'
import { FaHome, FaPhone,FaMailBulk, FaFacebook, FaTwitter, FaLinkedin } from "react-icons/fa"
import { NavLink } from "react-router-dom"

const Footer = () => {
  return (
    <div className="footer">
        <div className="footer-container">
            <div className="left">
                <div className="location">
                    <FaHome size={20} style={{color:"#fff",marginRight:"2rem"}}/>
                    <p>Home Location : </p>
                    <p> Rourkela</p>
                    <p> </p>
                </div>
                <div className="location">
                    <FaHome size={20} style={{color:"#fff",marginRight:"2rem"}}/>
                    <p>Job Location : </p>
                    <p> Infocity ,</p>
                    <p> Bhubaneswar</p>
                </div>
                <div className="phone">
                    <h4>
                        <FaPhone size={20} style={{color:"#fff",marginRight:"2rem"}}/>
                        +91 977****795
                    </h4>
                </div>
                <div className="email">
                    <h4>
                        <FaMailBulk size={20} style={{color:"#fff",marginRight:"2rem"}}/>
                        patra***tosh**@gmail.com
                    </h4>
                </div>
            </div>
            <div className="right">
                <h4>About Me </h4>
                <p>lorem ipsum text.i dont know what to erite .so for sample purpose i am writing this much text. please change the text according to your need</p>
                <div className="social">
                    <FaFacebook href="" size={20} style={{color:"#fff",marginRight:"1rem"}}/>
                    <FaTwitter  href="" size={20} style={{color:"#fff",marginRight:"1rem"}}/>
                    <NavLink to={"https://in.linkedin.com/in/santosh-patra-67742b144"}><FaLinkedin  size={20} style={{color:"#fff",marginRight:"1rem"}}/></NavLink>
                </div>
            </div>

        </div>
    </div>
  )
}

export default Footer