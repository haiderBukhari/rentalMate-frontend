import React, { useEffect, useState } from 'react'
import { GridView } from "../../Components/BrowsingPagination/GridView";
import axios from 'axios';
import { useSelector } from "react-redux"
import { useParams } from 'react-router-dom';
import Footer from '../../Components/Footer/Index';
import Navbar from '../../Components/Navbar';

const VendorProducts = () => {
    let { id } = useParams();
    const [prodData, setProdData] = useState([]);
    const [loading, setLoading] = useState(true);
    const token = useSelector((state) => state.userID);
    const [page, setPage] = useState(0);
    console.log(id)
    useEffect(() => {
        setLoading(true);
        axios
            .get(`${process.env.REACT_APP_BACKEND_URL}/products/${id}/${page}`, {
                headers: { Authorization: `${token}` },
            })
            .then((res) => {
                setProdData(res.data.product);
                setLoading(false);
                console.log(res);
            })
            .catch((err) => console.log(err));
    },[]);

    return (
        <div className="mb-10">
            <Navbar />
            <p className="font-semibold text-3xl ml-16 mb-10 mt-6">
                Vendor Products
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

export default VendorProducts