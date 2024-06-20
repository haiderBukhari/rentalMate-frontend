import React, { useEffect, useState } from 'react'
import Navbar from "../../../Components/Navbar/index";
import Footer from "../../../Components/Footer/Index";
import Orders from "../../../Components/Orders"
import axios from 'axios';
import { useSelector } from "react-redux"
import { useNavigate } from 'react-router-dom';

const UserOrder = () => {
    const token = useSelector((state) => state.userID);
    const [data, setData] = useState([]);
    const [page, setPage] = useState(0);
    const [loading, setloading] = useState(false);
    const [notfound, setNotfound] = useState(false);

    const Navigate = useNavigate();
    const id = useSelector((state) => state.id);
    const getvendors = async () => {
        setloading(true);
        await axios
            .get(`${process.env.REACT_APP_BACKEND_URL}/order/${id}`, {
                headers: { Authorization: `${token}` },
            })
            .then((res) => {
                setData(res.data.data);
            })
            .catch((err) => {
                setNotfound(true);
            });
        setloading(false);
    }
    useEffect(() => {
        getvendors();
    }, [])

    return (
        <div className="mb-10">
            <Navbar />
            <p className="font-semibold text-3xl ml-16 mt-6">
                Orders
            </p>
            <div className="mt-16 mb-20 mx-5">
                {
                    data?.map((Items) => (
                        <Orders items={Items} />
                    ))
                }
            </div>
            {loading && <div className="min-h-[40vh] flex justify-center items-center text-xl font-semibold">Loading...</div>}
            {notfound && (
                <div className="min-h-[40vh] flex flex-col justify-center items-center ">
                    <div className="text-xl font-semibold mb-10">No Orders Yet...</div>
                    <button
                        onClick={()=>{Navigate('/Categories')}}
                        class="w-48 h-11 text-sm rounded-xl bg-primaryLig border border-grayBr text-black font-semibold mb-10"
                    >
                        View All Products
                    </button>
                </div>)
            }
            <Footer />
        </div>
    )
}

export default UserOrder