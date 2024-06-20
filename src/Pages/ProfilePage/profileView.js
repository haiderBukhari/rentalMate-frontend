import React, { useEffect, useState } from "react";
import Navbar from "../../Components/Navbar/index";
import Footer from "../../Components/Footer/Index";
import profilePic from "../../Assets/image.png";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import BrowsingPic2 from "../../Assets/browsing2.png";
import axios from "axios";
import { GridItems } from "../../Components/BrowsingPagination/GridView";
import { useParams } from "react-router-dom"

const ProfileViewPage = () => {
    const { id } = useParams();
    const Navigate = useNavigate();
    const [activeTab, setActiveTab] = useState(0);
    const [item, setItems] = useState("");
    const [profileData, setProfileData] = useState([]);
    const [profile, setProfile] = useState({});
    const token = useSelector((state) => state.userID);
    const [page, setPage] = useState(0);

    useEffect(() => {
        axios
            .get(`${process.env.REACT_APP_BACKEND_URL}/products/${id}/${page}`, {
                headers: { Authorization: `${token}` },
            })
            .then((res) => {
                setProfileData(res.data.product);
            })
            .catch((err) => console.log(err));
    }, []);

    useEffect(() => {
        axios
            .get(`${process.env.REACT_APP_BACKEND_URL}/profile/${id}`, {
                headers: { Authorization: `${token}` },
            })
            .then((res) => {
                setProfile(res.data.data[0]);
            })
            .catch((err) => console.log(err));
    }, []);

    const handleTabClick = (index) => {
        setActiveTab(index);
    };
    const rentalData = [
        {
            title: "SONY high resolution camera-92",
            orderNumber: 564,
            rentedFor: "$6.7",
        },
        {
            title: "SONY high resolution camera-92",
            orderNumber: 564,
            rentedFor: "$6.7",
        },
        {
            title: "SONY high resolution camera-92",
            orderNumber: 564,
            rentedFor: "$6.7",
        },
        {
            title: "SONY high resolution camera-92",
            orderNumber: 564,
            rentedFor: "$6.7",
        },
    ];
    return (
        <div>
            <Navbar />

            <div className="w-11/12 mx-auto mt-6">
                <div className="mb-32">
                    <div className="relative z-[10] rounded-2xl p-12 mt-48 mb-20 w-[350px] mx-auto">
                        <img
                            className="w-[250px] h-[250px] object-cover object-center rounded-full absolute top-[-50%] left-[50%] translate-x-[-50%] border border-gray-200"
                            src={profile?.image || profilePic}
                            alt="Card "
                        />
                    </div>
                    <div className="buttonShadow lg:p-20 md:p-12 p-6">
                        <h2 className="text-center font-semibold text-4xl mb-8">
                            {profile?.name}
                        </h2>
                        <p className=" text-center text-lg mb-10 lg:w-[60%] md:w-[90%] w-full mx-auto">
                            {profile?.profileDescription}
                        </p>

                        <div className="profileTabs">
                            <div className="tab-buttons">
                                {[0].map((index) => (
                                    <button
                                        key={index}
                                        onClick={() => {
                                            Navigate(`/vendor/products/${id}`)
                                        }}
                                        className={index === activeTab ? "active" : ""}
                                    >
                                        {"View All Products"}
                                    </button>
                                ))}
                            </div>
                            <div className="tab-content">
                                <div style={{ display: activeTab === 0 ? "block" : "none" }}>
                                    {item ? (
                                        <div className="text-center mb-12">
                                            <h3 className="text-center font-bold text-xl mb-4">
                                                You have no Items listed yet
                                            </h3>
                                            <p className=" text-center text-lg mb-6">
                                                List your items and unlock earning opportunities
                                            </p>
                                        </div>
                                    ) : (
                                        <GridItems
                                            currentItems={profileData}
                                            parentClassName="flex justify-center items-center flex-col md:flex-row flex-wrap"
                                            boxWidth="w-[250px]"
                                            imageHeight="h-[170px]"
                                            itemsToRender={4}
                                        />
                                    )}
                                </div>
                                <div style={{ display: activeTab === 1 ? "block" : "none" }}>
                                    {/* IF NO ITEMS TO SHOW */}
                                    {item ? (
                                        <div className="text-center mb-12">
                                            <h3 className="text-center font-bold text-xl mb-4">
                                                You have no Items listed yet
                                            </h3>
                                            <p className=" text-center text-lg mb-6">
                                                List your items and unlock earning opportunities
                                            </p>
                                        </div>
                                    ) : (
                                        <div className="grid grid-cols-4  justify-center px-5 mt-10">
                                            {rentalData.map((item, index) => (
                                                <div
                                                    key={index}
                                                    className={` cursor-pointer flex flex-col mb-10 items-center w-[230px]  bg-white rounded-2xl shadow-xl`}
                                                >
                                                    <img
                                                        className={`h-[150px] w-full rounded-2xl `}
                                                        src={BrowsingPic2}
                                                    />
                                                    <div className="  flex-col flex gap-1 pt-4 pb-8">
                                                        <div className="font-semibold text-black text-center line-clamp-1 text-[13px] flex justify-center">
                                                            {item.title}
                                                        </div>
                                                        <div className="flex justify-between items-center">
                                                            <div className="font-semibold text-[black] text-[13px]">
                                                                Order Number
                                                            </div>
                                                            <div className="flex gap-1 items-center text-[13px]">
                                                                {item.orderNumber}
                                                            </div>
                                                        </div>
                                                        <div className="flex items-center font-semibold text-[13px] justify-between">
                                                            <div>Rented for {item.rentedFor}</div>
                                                            <div className="font-semibold text-[#01A664] text-[13px]">
                                                                Rented
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default ProfileViewPage;