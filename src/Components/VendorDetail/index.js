import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// import CardImage from "../../Assets/cardImg.png";
import AlertDialog from './../../Pages/Dasboards/Admin/DeleteDialog';
import axios from "axios"
import { useSelector } from 'react-redux';
import {useNavigate} from "react-router-dom"
const Index = ({ name, email, id, fetchAgain, setFetchAgain }) => {
    const [open, setOpen] = useState(false);
    const [confirmDelete, setConfirmDelete] = useState(false);
    const [selectedId, setSelectedID] = useState(0);
    const handledelete = (id) => {
        setSelectedID(id);
        setOpen(true);
    }
    const Navigate = useNavigate();
    const token = useSelector((state) => state.userID);
    useEffect(() => {
        if (confirmDelete) {
            axios.get(`${process.env.REACT_APP_BACKEND_URL}/vendors/deactivate/${selectedId}`, {
                headers: { Authorization: `${token}` },
            })
                .then((res) => {
                    Navigate('/admin/dashboard')
                    setFetchAgain(!fetchAgain)
                })
                .catch((err) => console.log(err));
        }
    }, [confirmDelete])
    return (
        <div
            className="h-[auto] max-w-[800px] pb-10 mb-10 mx-auto bg-white rounded-2xl relative"
            style={{ boxShadow: "0px 4px 13px -2px rgba(0, 0, 0, 0.60)" }}
        >
            <div className="relative  rounded overflow-hidden shadow-lg">
                <div className="">
                    <svg className="absolute w-8 h-8 top-2 right-3">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="32"
                            viewBox="0 0 32 32"
                            fill="none"
                        >
                            <g clip-path="url(#clip0_716_190)">
                                <path
                                    d="M22.6667 2.66667C20.0667 2.66667 17.3334 4.73334 16.0001 7C14.6667 4.73334 11.9334 2.66667 9.33339 2.66667C8.27718 2.67283 7.23265 2.88807 6.26005 3.29999C5.28746 3.71192 4.40607 4.31236 3.66673 5.06667C2.92148 5.80931 2.33139 6.69276 1.93081 7.66561C1.53022 8.63845 1.32714 9.68126 1.33339 10.7333C1.33339 13.4667 3.13339 15.8 4.66673 17.5333L15.5334 29.1333C15.658 29.2555 15.8256 29.3239 16.0001 29.3239C16.1746 29.3239 16.3421 29.2555 16.4667 29.1333L27.3334 17.5333C28.8667 15.8 30.6667 13.4667 30.6667 10.7333C30.6668 8.60543 29.8261 6.56368 28.3277 5.05279C26.8293 3.54189 24.7946 2.68426 22.6667 2.66667Z"
                                    fill="#B8B8B8"
                                />
                            </g>
                            <defs>
                                <clipPath id="clip0_716_190">
                                    <rect width="32" height="32" fill="white" />
                                </clipPath>
                            </defs>
                        </svg>
                    </svg>
                </div>
            </div>
            <div className=" inset-0 flex items-center justify-center">
                <div className=" text-center">
                    <div className="text-lg mb-2 text-black mt-6 font-normal">
                        <span className="text-primary font-semibold text-lg mr-2">Name: </span> {name} {" "}
                    </div>

                    <div className="text-lg mb-2 text-black mt-6 font-normal">
                        <span className="text-primary font-semibold text-lg mr-2">Email: </span> {email} {" "}
                    </div>
                </div>
            </div>
            <div className="flex">
                <Link to={`/admin/dashboard/vendors/${id}`} className="max-w-[210px] px-2 md:px-3 left-[8%] md:left-[34%] py-3 mt-3 mx-auto rounded-xl bg-primary text-white font-bold absolute text-center" style={{ bottom: "-20px" }}>
                    Check Detail{" "}
                </Link>
                <div onClick={() => { handledelete(id) }} className="max-w-[210px] px-2 md:px-3 left-[53%] py-3 mt-3 mx-auto rounded-xl bg-red-500 text-white font-bold absolute text-center cursor-pointer" style={{ bottom: "-20px" }}>
                    Delete User{" "}
                </div>
            </div>
            <AlertDialog open={open} setOpen={setOpen} confirmDelete={confirmDelete} setConfirmDelete={setConfirmDelete} />
        </div>
    );
};

export default Index;
