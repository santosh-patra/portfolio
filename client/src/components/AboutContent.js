import "./css/AboutContentStyles.css"

import React from 'react'
import { Link } from "react-router-dom"
import react1 from '../assets/react1.jpg'
import react2 from '../assets/react2.webp'

const AboutContent = () => {
    return (
        <div className="about">
            <div className="left">
                <h1>Who am I !!!</h1>
                <p>I am a MERN Full stack Developer currently work as a Software Engineer</p>
                <Link to="/contact">
                    <button className="btn">Contact</button>
                </Link>
                <div>
                    <button className="btn2">Click Here to Download my Resume😀</button>
                </div>
            </div>

            <div className="right">
                <div className="img-container">
                    <div className="img-stack top">
                        <img src={react1} className='img' alt="true"></img>
                    </div>
                    <div className="img-stack bottom">
                        <img src={react2} className='img' alt="true"></img>
                    </div>

                </div>

            </div>

        </div>
    )
}

export default AboutContent