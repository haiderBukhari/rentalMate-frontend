import React, { useEffect, useState } from 'react'
import Navbar from "../../../Components/Navbar/index";
import Footer from "../../../Components/Footer/Index";
import Orders from "../../../Components/Orders"
import axios from 'axios';
import { useSelector } from "react-redux"

const VendorsOrder = () => {
    const token = useSelector((state) => state.userID);
    const [data, setData] = useState([]);
    const [page, setPage] = useState(0);
    const id = useSelector((state) => state.id);
    const getvendors = async () => {
        await axios
            .get(`${process.env.REACT_APP_BACKEND_URL}/order/vendor/${id}`, {
                headers: { Authorization: `${token}` },
            })
            .then((res) => {
                setData(res.data.data);
            })
            .catch((err) => console.log(err));
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
            <Footer />
        </div>
    )
}

export default VendorsOrder