import "./css/WorkCardStyles.css"
import React, { useEffect, useState } from 'react'
import WorkCard from "./WorkCard"
import axios from "axios";
import { toast } from "react-hot-toast";
import { useAuth } from "../context/UserContext";

// import WorkCardData from "./WorkCardData"

const Work = () => {
    const [WorkCardData, setWorkCardData] = useState([]);
    const [auth] = useAuth();

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [view, setView] = useState('');
    const [source, setSource] = useState('');
    const [photo, setPhoto] = useState('');

    const getProjectDetailsData = async () => {
        let result = await axios.get(`/v1/auth/get-all-project-details`, {
            headers: {
                Authorization: auth?.token
            }
        });
        if (result.data.success) {
            // toast.success(`${result?.data?.message}`);
            setWorkCardData(result?.data?.data)
        }
        else {
            toast.error(`${result?.data?.message}`);
        }
    }
    useEffect(() => {
        getProjectDetailsData();
        
    }, []);
    const handleSubmit = async (e) => {
        e.preventDefault();
        let projData = new FormData();
        projData.append('name', name)
        projData.append('description', description)
        projData.append('view', view)
        projData.append('source', source)
        projData.append('photo', photo)

        let result = await axios.post(`/v1/auth/create-project`, projData, {
            headers: {
                Authorization: auth?.token
            }
        });
        // console.log("auth?.token--->", auth?.token);
        if (result?.data?.success) {
            toast.success(`${result?.data?.message}`);
            getProjectDetailsData();
        }
        else {
            toast.error(`${result?.data?.message}`);
        }
    }
    return (
        <div className="work-container">
            <h1 className="project-heading">Projects</h1>
            {
                auth?.user && (
                    <>
                        <div className="pro-btns" style={{ marginLeft: '40%' }}>
                            {/* <button className="btn">Add New Project</button> */}
                            {
                                auth?.user?.role === 1 && (
                                    <button type="button" className="btn" data-toggle="modal" data-target="#myModal">Add New Project</button>
                                )
                            }
                            {/* open modal start for update */}
                            <div id="myModal" className="modal fade" role="dialog">
                                <div className="modal-dialog">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <button type="button" className="close" data-dismiss="modal">×</button>
                                            <h4 className="modal-title">Add a New Project</h4>
                                        </div>
                                        <div className="modal-body">
                                            <div className='mb-3'>
                                                <input value={name} onChange={(e) => setName(e.target.value)} type='text' className='form-control' placeholder='Enter Project Name' />
                                            </div>
                                            <div className='mb-3'>
                                                <input value={description} onChange={(e) => setDescription(e.target.value)} type='text' className='form-control' placeholder='Enter Project Description' />
                                            </div>
                                            <div className='mb-3'>
                                                <input value={view} onChange={(e) => setView(e.target.value)} type='text' className='form-control' placeholder='Enter Project link to View' />
                                            </div>
                                            <div className='mb-3'>
                                                <input value={source} onChange={(e) => setSource(e.target.value)} type='text' className='form-control' placeholder='Enter Project Source code Deatination' />
                                            </div>
                                            <div className='mb-3'>
                                                <input accept='image/*' onChange={(e) => setPhoto(e.target.files[0])} type='file' className='form-control' placeholder='Enter any Sample Image' />
                                            </div>
                                        </div>
                                        <div className="modal-footer">
                                            <button onClick={handleSubmit} type="button" className="btn btn-success" data-dismiss="modal">Submit</button>
                                            <button type="button" className="btn btn-danger" data-dismiss="modal">Close</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* open modal End for update */}
                        </div>
                    </>
                )
            }
            <div className="project-container">
                {
                    WorkCardData?.map((val, ind) => {
                        return (
                            <WorkCard
                                key={ind}
                                id={val._id}
                                // imgsrc={val.imgsrc}
                                title={val.name}
                                text={val.description}
                                view={val.view}
                                source={val.source}
                            />
                        )
                    })
                }

            </div>
        </div>
    )
}

export default Work