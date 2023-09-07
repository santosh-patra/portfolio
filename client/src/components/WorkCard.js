// import "./WorkCardStyles.css"
import "./css/WorkCardStyles.css"

import React from 'react'

import { NavLink } from "react-router-dom"
import { useAuth } from "../context/UserContext"
import axios from 'axios'
import { toast } from "react-hot-toast"

const WorkCard = (props) => {
    const [auth] = useAuth();
    const getProjectDetailsData = async () => {
        let result = await axios.get(`/v1/auth/get-all-project-details`, {
            headers: {
                Authorization: auth?.token
            }
        });
        if (result.data.success) {
            toast.success(`${result?.data?.message}`);
        }
    }
    const handleDelete = async (id) => {
        try {
            let value = await window.confirm("Are you sure want to delete this Project?");
            if (value) {
                let result = await axios.delete(`/v1/auth/delete-project/${id}`, {
                    headers: {
                        Authorization: auth?.token
                    }
                })
                if (result?.data?.success) {
                    toast.success(`${result?.data?.message}`)
                    getProjectDetailsData();
                }
                else {
                    toast.error(`${result?.data?.message}`)
                }
            }
        } catch (error) {
            console.log("Error occured--->", error.message);
            toast.error(`Something went wrong...Please try again.`)
        }
    }
    return (
        <div className="project-card">
            <img src={`/v1/auth/get-project-photo/${props.id}`} alt="textimage"></img>
            <h2 className="project-title">{props.title}</h2>
            <div className="pro-details">
                <p>{props.text}</p>
                <div className="pro-btns">
                    <NavLink to={props.view} className="btn">View</NavLink>
                    {
                        auth?.user?.role === 1 && (
                            <>
                                <button onClick={() => handleDelete(props.id)} className="btn">Delete</button>
                            </>
                        )
                    }
                    <NavLink to={props.source} className="btn">Source</NavLink>
                </div>
            </div>
        </div>
    )
}

export default WorkCard