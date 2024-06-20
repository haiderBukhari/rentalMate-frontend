import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useSelector } from "react-redux"
import { GridView } from './BrowsingPagination/GridView';
import Footer from './Footer/Index';
import Navbar from './Navbar';
import { useSearchParams } from 'react-router-dom'

const Search = () => {
    const [searchParams, setSearchParams] = useSearchParams()
    const [prodData, setProdData] = useState([]);
    const [loading, setLoading] = useState(true);
    const token = useSelector((state) => state.userID);
    const [userId, setUserId] = useState(useSelector(state=>state?.id))
    const [page, setPage] = useState(0);
    useEffect(() => {
        setLoading(true);
        axios
            .get(`${process.env.REACT_APP_BACKEND_URL}/products/search/${userId}?search=${searchParams.get('search')}`, {
                headers: { Authorization: `${token}` },
            })
            .then((res) => {
                setProdData(res.data);
                setLoading(false);
                console.log(res);
            })
            .catch((err) => console.log(err));
    },[searchParams.get('search')]);

    return (
        <div className="">
            <Navbar />
            <p className="font-semibold text-3xl ml-16 mb-10 mt-6">
                {typeof(searchParams.get('search')) === "string" ? searchParams.get('search') : ""} searched
            </p>
            <div className='mb-20 pb-10'>
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

export default Search