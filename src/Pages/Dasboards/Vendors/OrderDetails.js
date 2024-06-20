import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useSelector } from "react-redux"
import { useParams } from 'react-router-dom';
import Navbar from '../../../Components/Navbar';
import Footer from '../../../Components/Footer/Index';
import { GridView } from '../../../Components/BrowsingPagination/GridView';

const VendorOrderDetails = () => {

    const { orderid } = useParams();
    const id = useSelector(state=>state.id);

    const [prodData, setProdData] = useState([]);
    const [loading, setLoading] = useState(true);
    const token = useSelector((state) => state.userID);
    const [page, setPage] = useState(0);

    async function getOrderDetails(){
        await axios.get(`${process.env.REACT_APP_BACKEND_URL}/order/vendor/${id}/${orderid}`, {
            headers: { Authorization: `${token}` },
        })
        .then((res) => {
            setProdData(res.data.data[0].orderData);
            setLoading(false);
        })
        .catch((err) => console.log(err));
    }

    useEffect(() => {
        setLoading(true);
        getOrderDetails();
    },[]);

    return (
        <div className="mb-10">
            <Navbar />
            <p className="font-semibold text-3xl ml-16 mb-10 mt-6">
                Order Detail
            </p>
            <div>
                <GridView
                    parentClassName="flex justify-center items-center flex-wrap px-5"
                    boxWidth="w-[250px]"
                    imageHeight="h-[150px]"
                    itemsPerPage={10}
                    items={prodData}
                    loading={loading}
                />
            </div>
            <Footer />
        </div>
    )
}

export default VendorOrderDetails