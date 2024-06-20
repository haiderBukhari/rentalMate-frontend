import React, { useEffect, useState } from "react";
import Navbar from "../../Components/Navbar/index";
import Footer from "../../Components/Footer/Index";
import { useSelector } from "react-redux";
import profilePic from "../../Assets/image.png";
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import './profile.css'

const EditProfile = () => {
    const [profile, setProfile] = useState({});
    const token = useSelector((state) => state.userID);
    const id = useSelector((state) => state.id);
    const status = useSelector((state) => state.status);
    const Navigate = useNavigate();
    useEffect(() => {
        axios
            .get(`${process.env.REACT_APP_BACKEND_URL}/profile/${id}`, {
                headers: { Authorization: `${token}` },
            })
            .then((res) => {
                setProfile(res.data.data[0]);
                setPhoneNumber(res.data.data[0].phoneNumber.toString() || "");
                // setProfile(res.data.data[0])
            })
            .catch((err) => console.log(err));
    }, []);

    const handleUpdate = () => {
        const profile1 = { ...profile };
        profile1.phoneNumber = phoneNumber;
        axios.put(`${process.env.REACT_APP_BACKEND_URL}/profile/${profile._id}`, profile1, {
            headers: { Authorization: `${token}` },
        })
            .then((res) => {
                if (status === "vendor") {
                    Navigate('/vendor/dashboard')
                } else {
                    Navigate('/user/dashboard')
                }
            })
            .catch((err) => console.log(err));
    }
    const [phoneNumber, setPhoneNumber] = useState("");
    const [valid, setValid] = useState(true);

    const handleChange = (value) => {
        setPhoneNumber(value);
        setValid(validatePhoneNumber(value));
    };

    const validatePhoneNumber = (phoneNumber) => {
        const phoneNumberPattern = /^\+?[1-9]\d{1,14}$/;

        return phoneNumberPattern.test(phoneNumber);
    };

    const ImageUpload = (event) => {
        const file = event.target.files[0];

        if (file) {
            const reader = new FileReader();

            reader.onloadend = () => {
                const img = new Image();

                img.onload = () => {
                    const canvas = document.createElement("canvas");
                    const ctx = canvas.getContext("2d");
                    const maxWidth = 300; // Set your desired maximum width
                    const maxHeight = 150; // Set your desired maximum height

                    let width = img.width;
                    let height = img.height;

                    // Resize the image if necessary
                    if (width > maxWidth || height > maxHeight) {
                        if (width > maxWidth) {
                            height *= maxWidth / width;
                            width = maxWidth;
                        }

                        if (height > maxHeight) {
                            width *= maxHeight / height;
                            height = maxHeight;
                        }
                    }

                    canvas.width = width;
                    canvas.height = height;

                    ctx.drawImage(img, 0, 0, width, height);

                    // Get the compressed image as a base64 string
                    const compressedBase64 = canvas.toDataURL("image/jpeg", 0.3); // Adjust the quality as needed
                    setProfile({ ...profile, image: compressedBase64 })
                };
                img.src = reader.result;
            };

            reader.readAsDataURL(file);
        }
    };

    return (
        <div>
            <Navbar />
            <div className="w-full mx-auto mt-6">
                <h1 className="text-center my-10 pt-16 pb-32 md:pb-16 mb-10 text-2xl font-semibold">Edit Profile</h1>
                <div className="mb-32 mx-4">
                    <div className="relative buttonShadow rounded-2xl p-4 sm:p-8 md:p-12 lg:p-16 mt-10 md:mt-20 pt-6 md:pt-10 mb-10 w-full md:w-[700px] mx-auto">
                        <img
                            className="w-[250px] h-[250px] object-cover object-center rounded-full absolute top-[-130px] left-[50%] translate-x-[-50%] border border-gray-200"
                            src={profile?.image || profilePic}
                            alt="Card "
                        />
                        <div className="text-center mt-16 pt-16 pb-20 mb-10 md:pt-10">
                            <label htmlFor="picture" className="bg-[#01A664] mt-5 mb-10 py-3 rounded-2xl text-white font-semibold text-[14px] tracking-[1px] w-[200px] cursor-pointer px-3">
                                Upload Images
                                <input onChange={ImageUpload} id="picture" type="file" accept="image/*" style={{ display: "none" }} />
                            </label>
                            <h1 className="text-normal font-semibold text-primary flex justify-start pl-5 pb-4 pt-10">Edit Profile</h1>
                            <div className="pl-4 md:pl-0">
                                <input onChange={(e) => { setProfile({ ...profile, name: e.target.value }) }} type="text" class="w-full md:w-[95%] py-3 rounded-full text-base text-gray-400 bg-[#D9D9D9] font-medium mb-6 pl-4 mx-auto" placeholder="Full Name" value={profile?.name} />
                                <input type="email" class="w-full md:w-[95%] py-3 rounded-full text-base text-gray-400 bg-[#D9D9D9] font-medium mb-6 pl-4 mx-auto" placeholder="Email Address" value={`${profile?.email}`} disabled={true} />
                                <input onChange={(e) => { setProfile({ ...profile, dob: e.target.value }) }} type="date" class="w-full md:w-[95%] py-3 rounded-full text-base text-gray-400 bg-[#D9D9D9] font-medium mb-6 pl-4 mx-auto pr-4" placeholder="Date of Birth" value={profile?.dob?.length > 10 ? profile?.dob.slice(0, 8) : profile?.dob} />
                            </div>
                            <h1 className="text-normal font-semibold text-primary flex justify-start pl-5 pb-4">Gender</h1>
                            <div className="flex justify-start pl-4">
                                <select
                                    id="category"
                                    name="category"
                                    onChange={(e) => { setProfile({ ...profile, gender: e.target.value }) }}
                                    class="w-full px-3 h-[48px] border border-gray-300 rounded-full text-base text-gray-400 bg-[#D9D9D9] font-medium"
                                >
                                    <option value="" disabled selected={!profile?.gender}> Select </option>
                                    <option value="male" selected={profile?.gender === "male"}>Male</option>
                                    <option value="female" selected={profile?.gender === "female"}>Female</option>
                                </select>
                            </div>
                            <h1 className="text-normal font-semibold text-primary flex justify-start pl-5 pb-4 mt-10">Contact and Address Information</h1>
                            <div className="flex justify-between ml-4">
                                <label className="mb-7 w-[100%]">
                                    <PhoneInput
                                        className="w-[100%] md:w-[45%] py-3 rounded-full text-base text-gray-400 bg-[#D9D9D9] font-medium mb-6 pl-4"
                                        inputClass="w-[100%] py-3 rounded-full text-base text-gray-400 bg-[#D9D9D9] font-medium mb-6 pl-4 mx-auto"
                                        inputStyle={{ backgroundColor: "#D9D9D9", border:"none" }}
                                        containerClass="phone-input-container"
                                        value={phoneNumber}
                                        onChange={handleChange}
                                        inputProps={{
                                            required: true,
                                        }}
                                    />
                                </label>
                            </div>
                            <div className="flex justify-between ml-4">
                                <textarea onChange={(e) => { setProfile({ ...profile, address: e.target.value }) }} type="text" class="w-full md:w-[100%] py-3 rounded-lg text-base text-gray-400 bg-[#D9D9D9] font-medium mb-6 pl-4 mx-auto flex-1 mr-2" placeholder="Address" value={profile?.address} cols='30' rows='4'></textarea>
                            </div>
                            <div className="flex flex-col justify-center items-center">
                                <button onClick={handleUpdate} className="bg-[#01A664] mt-5 mb-6 py-3 rounded-2xl text-white font-semibold text-[14px] tracking-[1px] w-[200px]"> Update </button>
                                <button className="bg-[#01A664] mt-1 mb-10 py-3 rounded-2xl text-white font-semibold text-[14px] tracking-[1px] w-[200px]"> Delete </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default EditProfile;