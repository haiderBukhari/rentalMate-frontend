import React from 'react'
import { X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { changeMenuOpen } from '../../redux/Main/mainSlice';

const MobileNavbar = () => {
    const status = useSelector((state) => state.status);
    const dispatch = useDispatch();
    const closeMenu = () => {
        dispatch(changeMenuOpen(true))
    };
    return (
        <div className='bg-white w-[100%]'>
            <div className='w-[100%] p-10 flex flex-col justify-center items-center'>
                <X onClick={closeMenu} style={{ position: "absolute", right: "20px", top: "24px", textUnderlineOffset: "auto", color: "#000", cursor: "pointer" }} />
                <Link to={"/home"} className="text-5xl font-semibold flex items-center text-center text-[#01A664]">
                    Logo
                </Link>
                <div className="mt-10">
                    <div onClick={closeMenu} className='flex justify-center flex-col items-center'>
                        <a href="/home" className="text-black text-lg font-semibold block py-2">Home</a>
                        <a href="/about" className="text-black block text-lg font-semibold py-2 pt-5">About</a>
                        {status === "admin" && (
                            <a href="/admin/dashboard" className="text-black block text-lg font-semibold py-2 pt-5">Dashboard</a>
                        )}
                        {status === "vendor" && (
                            <a href="/vendor/dashboard" className="text-black text-lg font-semibold block py-2 pt-5">Dashboard</a>
                        )}
                        {status === "customer" && (
                            <a href="/user/dashboard" className="text-black block py-2 text-lg font-semibold pt-5">Dashboard</a>
                        )}
                        <a href="/chat" className="text-black block py-2 text-lg font-semibold pt-5">Chat</a>
                        <div className="flex justify-center gap-10 mt-20">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="30"
                                height="30"
                                viewBox="0 0 30 30"
                                fill="none"
                            >
                                <path
                                    fill-rule="evenodd"
                                    clip-rule="evenodd"
                                    d="M9.435 26.9997C20.7555 26.9997 26.9475 17.765 26.9475 9.75775C26.9475 9.49487 26.9475 9.23398 26.9295 8.97406C28.134 8.1175 29.1735 7.05398 30 5.83709C28.878 6.3274 27.6855 6.64894 26.466 6.79071C27.75 6.0331 28.7115 4.84286 29.172 3.43841C27.963 4.14433 26.6415 4.64253 25.263 4.90985C22.932 2.47014 19.0335 2.35194 16.554 4.64691C14.9565 6.12667 14.277 8.33298 14.7735 10.4374C9.825 10.1923 5.214 7.89145 2.088 4.10638C0.4545 6.8754 1.29 10.4164 3.9945 12.1945C3.015 12.1665 2.0565 11.9068 1.2 11.4372V11.5141C1.2015 14.3983 3.267 16.8818 6.138 17.4533C5.232 17.697 4.281 17.7323 3.36 17.5566C4.1655 20.0258 6.477 21.7171 9.1095 21.7658C6.93 23.4523 4.2375 24.3681 1.4655 24.3652C0.9765 24.3637 0.4875 24.3356 0 24.278C2.8155 26.0561 6.09 26.9997 9.435 26.9953"
                                    fill="#1DA1F2"
                                />
                            </svg>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="30"
                                height="30"
                                viewBox="0 0 30 30"
                                fill="none"
                            >
                                <path
                                    d="M18.75 15C18.75 15.7417 18.5301 16.4667 18.118 17.0834C17.706 17.7001 17.1203 18.1807 16.4351 18.4645C15.7498 18.7484 14.9958 18.8226 14.2684 18.6779C13.541 18.5333 12.8728 18.1761 12.3483 17.6516C11.8239 17.1272 11.4667 16.459 11.3221 15.7316C11.1774 15.0042 11.2516 14.2502 11.5355 13.5649C11.8193 12.8797 12.2999 12.294 12.9166 11.882C13.5333 11.4699 14.2583 11.25 15 11.25C15.9942 11.2511 16.9474 11.6466 17.6504 12.3496C18.3534 13.0526 18.7489 14.0058 18.75 15ZM26.7188 9.84375V20.1562C26.7168 21.8961 26.0247 23.5642 24.7945 24.7945C23.5642 26.0247 21.8961 26.7168 20.1562 26.7188H9.84375C8.10387 26.7168 6.43582 26.0247 5.20554 24.7945C3.97526 23.5642 3.28322 21.8961 3.28125 20.1562V9.84375C3.28322 8.10387 3.97526 6.43582 5.20554 5.20554C6.43582 3.97526 8.10387 3.28322 9.84375 3.28125H20.1562C21.8961 3.28322 23.5642 3.97526 24.7945 5.20554C26.0247 6.43582 26.7168 8.10387 26.7188 9.84375ZM20.625 15C20.625 13.8875 20.2951 12.7999 19.677 11.8749C19.0589 10.9499 18.1804 10.2289 17.1526 9.80318C16.1248 9.37744 14.9938 9.26604 13.9026 9.48308C12.8115 9.70013 11.8092 10.2359 11.0225 11.0225C10.2359 11.8092 9.70013 12.8115 9.48308 13.9026C9.26604 14.9938 9.37744 16.1248 9.80318 17.1526C10.2289 18.1804 10.9499 19.0589 11.8749 19.677C12.7999 20.2951 13.8875 20.625 15 20.625C16.4913 20.6233 17.9211 20.0301 18.9756 18.9756C20.0301 17.9211 20.6233 16.4913 20.625 15ZM22.5 8.90625C22.5 8.62812 22.4175 8.35624 22.263 8.12498C22.1085 7.89372 21.8889 7.71348 21.6319 7.60704C21.3749 7.50061 21.0922 7.47276 20.8194 7.52702C20.5466 7.58128 20.296 7.71521 20.0994 7.91188C19.9027 8.10855 19.7688 8.35912 19.7145 8.6319C19.6603 8.90469 19.6881 9.18744 19.7945 9.4444C19.901 9.70136 20.0812 9.92098 20.3125 10.0755C20.5437 10.23 20.8156 10.3125 21.0938 10.3125C21.4667 10.3125 21.8244 10.1643 22.0881 9.90062C22.3518 9.6369 22.5 9.27921 22.5 8.90625Z"
                                    fill="#fa7e1e"
                                />
                            </svg>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="30"
                                height="30"
                                viewBox="0 0 30 30"
                                fill="none"
                            >
                                <path
                                    fill-rule="evenodd"
                                    clip-rule="evenodd"
                                    d="M17.7319 30V16.5H21.8305L22.5 10.5H17.7319V7.57764C17.7319 6.03264 17.7714 4.5 19.9303 4.5H22.117V0.210205C22.117 0.145705 20.2387 0 18.3385 0C14.37 0 11.8851 2.48579 11.8851 7.05029V10.5H7.5V16.5H11.8851V30H17.7319Z"
                                    fill="#316FF6"
                                />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MobileNavbar