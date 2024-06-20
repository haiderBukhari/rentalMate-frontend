import React, { useEffect, useState } from 'react'
import VendorsDetail from "../../../Components/VendorDetail/index"
import axios from 'axios';
import { useSelector } from "react-redux"
import Sidebar, { SidebarItem } from '../../../Components/Sidebar';
import {User, LayoutDashboard, ListOrdered} from "lucide-react"
import { useLocation } from 'react-router-dom';

const VendorsDetails = () => {
    const token = useSelector((state) => state.userID);
    const [data, setData] = useState([]);
    const [page, setPage] = useState(0);
    const [fetchAgain, setFetchAgain] = useState(false);
    
    const getvendors = async () => {
        await axios
            .get(`${process.env.REACT_APP_BACKEND_URL}/vendors?page=${page}`, {
                headers: { Authorization: `${token}` },
            })
            .then((res) => {
                setData(res.data.items);
            })
            .catch((err) => console.log(err));
    }
    useEffect(() => {
        getvendors();
    }, [fetchAgain])

    const location = useLocation();
    return (
        <div className="mb-10 flex">
            <Sidebar>
                <SidebarItem link="/admin/dashboard" icon={<LayoutDashboard size={20}/>} text="Dasboard" active={location.pathname==="/admin/dashboard"? true:false}></SidebarItem>
                <SidebarItem link="/admin/dashboard/vendors" icon={<User size={20}/>} text="Users" active={location.pathname==="/admin/dashboard/vendors"? true:false}></SidebarItem>
                <SidebarItem link="/admin/dashboard/orders" icon={<ListOrdered size={20}/>} text="Orders" active={location.pathname==="/admin/dashboard/orders"? true:false}></SidebarItem>
            </Sidebar>
            <div className="w-[100%]">
                <p className="font-semibold text-3xl ml-16 mt-6">
                    Vendors Details
                </p>
                <div className="mt-16 mb-20 mx-5 w-[87%] pl-5 float-right md:float-none md:w-[100%]">
                    {
                        data?.map((Items) => (
                            <VendorsDetail name={Items.name} email={Items.email} id={Items._id} fetchAgain={fetchAgain} setfetchAgain={setFetchAgain}/>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default VendorsDetails
