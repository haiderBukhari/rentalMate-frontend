import React from 'react'
import Navbar from "../../../Components/Navbar/index";
import Footer from "../../../Components/Footer/Index";
import { Link } from 'react-router-dom';
import { useSelector } from "react-redux"

const UserDasboard = () => {
    const id = useSelector(state => state.id);
    return (
        <div>
            <Navbar />
            <div className="mt-10">
                <p className="font-semibold text-3xl ml-16 mt-6">
                    Hi! Welcome {useSelector(state=>state.name)}
                </p>
                <div className="flex mt-24 mb-24 w-3/4 mx-auto items-center justify-center flex-wrap gap-10">
                    <div class="flex flex-col justify-center w-72 ">
                        <div class="w-32 h-32 bg-[#01A664] justify-center items-center flex rounded-md mx-auto">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="72"
                                height="72"
                                viewBox="0 0 72 72"
                                fill="none"
                            >
                                <path
                                    d="M63.18 53.2575L50.8275 40.8825C49.7685 39.8773 48.4298 39.2167 46.9878 38.9878C45.5458 38.7588 44.0682 38.9723 42.75 39.6L38.925 35.775C41.4013 32.6335 42.7486 28.7502 42.75 24.75C42.75 21.1899 41.6943 17.7098 39.7165 14.7497C37.7386 11.7897 34.9274 9.48255 31.6383 8.12018C28.3492 6.7578 24.73 6.40134 21.2384 7.09587C17.7467 7.79041 14.5394 9.50474 12.0221 12.0221C9.50474 14.5394 7.79041 17.7467 7.09587 21.2384C6.40134 24.73 6.7578 28.3492 8.12018 31.6383C9.48255 34.9274 11.7897 37.7386 14.7497 39.7165C17.7098 41.6943 21.1899 42.75 24.75 42.75C28.7475 42.755 32.6305 41.4157 35.775 38.9475L39.5775 42.75C38.9267 44.0646 38.7026 45.5496 38.9366 46.9977C39.1706 48.4458 39.8509 49.7847 40.8825 50.8275L53.2575 63.18C54.5873 64.4258 56.3494 65.1057 58.1714 65.076C59.9933 65.0463 61.7323 64.3093 63.0208 63.0208C64.3093 61.7323 65.0463 59.9933 65.076 58.1714C65.1057 56.3494 64.4258 54.5873 63.18 53.2575ZM11.25 24.75C11.25 22.08 12.0418 19.4699 13.5252 17.2498C15.0086 15.0297 17.117 13.2994 19.5838 12.2776C22.0506 11.2559 24.765 10.9885 27.3837 11.5094C30.0025 12.0303 32.4079 13.3161 34.2959 15.2041C36.184 17.0921 37.4697 19.4975 37.9906 22.1163C38.5115 24.735 38.2442 27.4494 37.2224 29.9162C36.2006 32.383 34.4703 34.4914 32.2502 35.9748C30.0301 37.4582 27.4201 38.25 24.75 38.25C21.1696 38.25 17.7358 36.8277 15.2041 34.2959C12.6723 31.7642 11.25 28.3304 11.25 24.75ZM60.0075 60.0075C59.7733 60.2436 59.4946 60.4309 59.1876 60.5588C58.8806 60.6866 58.5513 60.7525 58.2188 60.7525C57.8862 60.7525 57.5569 60.6866 57.2499 60.5588C56.9429 60.4309 56.6643 60.2436 56.43 60.0075L44.055 47.6325C43.5891 47.1537 43.3284 46.5119 43.3284 45.8438C43.3284 45.1756 43.5891 44.5339 44.055 44.055C44.5392 43.5994 45.1789 43.3457 45.8438 43.3457C46.5086 43.3457 47.1484 43.5994 47.6325 44.055L60.0075 56.43C60.2436 56.6643 60.4309 56.9429 60.5588 57.2499C60.6866 57.5569 60.7525 57.8862 60.7525 58.2188C60.7525 58.5513 60.6866 58.8806 60.5588 59.1876C60.4309 59.4946 60.2436 59.7733 60.0075 60.0075Z"
                                    fill="white"
                                />
                            </svg>
                        </div>
                        <div class="mt-4 text-left">
                            <h2 class="text-xl font-bold mb-2 text-center">Show Orders</h2>
                            <p class="text-base w-72 text-center">
                                Check All the orders and there approval status
                            </p>
                            <Link
                                to={`/user/dashboard/orders/${id}`}
                                className="w-full mt-6 mb-5  flex justify-center  "
                            >
                                <button class="w-56 h-11 ml-10  rounded-xl bg-[#01A664] text-white font-bold mr-5">
                                    Show Orders
                                </button>
                            </Link>
                        </div>
                    </div>
                    <div class="flex flex-col justify-center mb-8 w-72 ">
                        <div class="w-32 h-32  justify-center bg-[#01A664] items-center flex rounded-md mx-auto">
                            <svg xmlns="http://www.w3.org/2000/svg" width="72" height="72" viewBox="0 0 32.402 32" id="cart"><path d="M6 30a2 2 1080 1 0 4 0 2 2 1080 1 0-4 0zm18 0a2 2 1080 1 0 4 0 2 2 1080 1 0-4 0zM-.058 5a1 1 0 0 0 1 1H3.02l1.242 5.312L6 20c0 .072.034.134.042.204l-1.018 4.58A.997.997 0 0 0 6 26h22.688a1 1 0 0 0 0-2H7.248l.458-2.06c.1.016.19.06.294.06h18.23c1.104 0 1.77-.218 2.302-1.5l3.248-9.964C32.344 8.75 31.106 8 30 8H6c-.156 0-.292.054-.438.088l-.776-3.316A1 1 0 0 0 3.812 4H.942a1 1 0 0 0-1 1zm6.098 5h23.81l-3.192 9.798c-.038.086-.07.148-.094.19-.066.006-.17.012-.334.012H8v-.198l-.038-.194L6.04 10z" fill="white"></path><defs>
                                <clipPath id="clip0_332_163">
                                    <rect width="72.7208" height="72" fill="white" />
                                </clipPath>
                            </defs></svg>
                        </div>
                        <div class="mt-4 text-left">
                            <h2 class="text-xl font-bold mb-2 text-center">Cart</h2>
                            <p class="text-base w-72 text-center">
                                Details of all the products added to the cart
                            </p>
                            <Link
                                to={"/cart"}
                                className="w-full mt-7 mb-0  flex justify-center  "
                            >
                                <button class="w-56 h-11 ml-10  rounded-xl bg-[#01A664] text-white font-bold mr-5">
                                    Check Cart
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default UserDasboard