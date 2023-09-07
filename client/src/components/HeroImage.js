import "./css/HeroImageStyles.css"

import React from 'react'
import IntroImg from '../assets/intro-bg.jpg'
import { Link } from "react-router-dom"

const HeroImage = () => {
  return (
    <div className="hero">
        <div className="mask">
            <img className="intro-img" 
            src={IntroImg} alt="IntroImage">
            </img>
        </div>
        <div className="content">
            <p className="springy-text">Hi, I'M Santosh Patra</p>
            <h2 className="springy-text1 typewriter">Backend-cum-FullStack Developer.</h2>
            <div>
                <Link to='/project' title="Click to see my all Projects" className="btn">Projects</Link>
                <Link to='/contact' className="btn-light">Contacts</Link>
            </div>
        </div>
    </div>
  )
}

export default HeroImage