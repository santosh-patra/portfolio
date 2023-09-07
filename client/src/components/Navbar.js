import "./css/NavbarStyles.css"

import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom"
import { FaBars, FaTimes } from 'react-icons/fa'
import { useAuth } from "../context/UserContext"
import { toast } from "react-hot-toast"

const Navbar = () => {
    const [auth, setAuth] = useAuth();
    const [click, setClick] = useState(false);
    const navigate = useNavigate();

    const handleClick = () => {
        setClick(!click)
    }
    const [color, setColor] = useState(false)
    const changeColor = () => {
        if (window.scrollY > 100) {
            setColor(true)
        }
        else {
            setColor(false)
        }
    }
    window.addEventListener("scroll", changeColor)

    const handleLogout = async () => {
        setAuth({
            ...auth,
            user: null,
            token: ''
        })
        localStorage.removeItem('pfAuth')
        toast.success("Logout Successfully")
        navigate('/login')
    }
    return (
        <div className={color ? "header header-bg" : "header"}>
            <Link to='/'>
                <h1>Portfolio</h1>
            </Link>
            <ul className={click ? "nav-menu active" : "nav-menu"}>
                <li>
                    <Link to='/'>Home</Link>
                </li>
                <li>
                    <Link to='/project'>Project</Link>
                </li>
                <li>
                    <Link to='/experience'>Experience</Link>
                </li>
                <li>
                    <Link to='/about'>About</Link>
                </li>
                <li>
                    <Link to='/contact'>Contact</Link>
                </li>
                {
                    auth?.user ? (
                        <>
                            <p style={{ border: '1px solid yellow', borderRadius: "3px", padding: '2px' }}>Welcome {auth?.user?.name}</p>
                            <li>
                                <Link onClick={handleLogout}>Logout</Link>
                            </li>
                        </>
                    ) : (
                        <>
                            <li>
                                <Link to='/login'>Login</Link>
                            </li>
                            <li>
                                <Link to='/signup'>SignUp</Link>
                            </li>
                        </>
                    )
                }
            </ul>
            <div className='humburger' onClick={handleClick}>
                {click ? (<FaTimes size={20} style={{ color: "#fff" }} />)
                    :
                    (<FaBars size={20} style={{ color: "#fff" }} />)}
            </div>
        </div>
    )
}

export default Navbar