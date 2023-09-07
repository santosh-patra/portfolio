import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import HeroImage2 from '../components/HeroImage2'
import LoginForm from './LoginForm'

const Login = () => {
    return (
        <>
            <Navbar />
            <HeroImage2 heading="Login" text="Login Here" />
            <LoginForm/>
            <Footer />
        </>
    )
}

export default Login