import React from 'react'
import Navbar from '../components/Navbar'
import HeroImage from '../components/HeroImage'
import Footer from '../components/Footer'
import Work from '../components/Work'
const Home = () => {
  console.log("REACT_APP_BASE_URL--->",process.env.REACT_APP_BASE_URL);
  return (
    <div>
        <Navbar/>
        <HeroImage/>
        <Work/>
        <Footer/>
    </div>
  )
}

export default Home