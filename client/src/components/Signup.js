import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import HeroImage2 from '../components/HeroImage2'
import SignupForm from './SignupForm'

const Signup = () => {
    return (
        <>
            <Navbar />
            <HeroImage2 heading="Sign Up" text="Enter your details to Sign up here" />
            <SignupForm/>
            <Footer />
        </>
    )
}

export default Signup