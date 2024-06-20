import React, { useEffect, useState } from 'react'
import Navbar from "../../../Components/Navbar/index";
import Footer from "../../../Components/Footer/Index";
import { Link } from 'react-router-dom';
import { useSelector } from "react-redux"
import axios from 'axios';


const VendorDasboard = () => {
    const id = useSelector(state => state.id);
    const token = useSelector((state) => state.userID);
    const [name, setName] = useState(null)

    useEffect(()=>{
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/profile/${id}`, {
            headers: { Authorization: `${token}` },
          })
            .then((res) => {
                setName(res.data.data[0].name);
            })
            .catch((err) => console.log(err));
    }, [])
    return (
        <div>
            <Navbar />
            <div className="mt-10">
                <p className="font-semibold text-3xl ml-16 mt-6">
                    Hi Welcome {name}
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
                            <h2 class="text-xl font-bold mb-2 text-center">Show Products</h2>
                            <p class="text-base w-72 text-center">
                                List all all products and modify them.
                            </p>
                            <Link
                                to={`/vendor/dashboard/products/${id}`}
                                className="w-full mt-6 mb-5  flex justify-center  "
                            >
                                <button class="w-56 h-11 ml-10  rounded-xl bg-[#01A664] text-white font-bold mr-5">
                                    Show Products
                                </button>
                            </Link>
                        </div>
                    </div>
                    <div class="flex flex-col justify-center mb-8 w-72 ">
                        <div class="w-32 h-32  justify-center bg-[#01A664] items-center flex rounded-md mx-auto">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="73"
                                height="72"
                                viewBox="0 0 73 72"
                                fill="none"
                            >
                                <g clip-path="url(#clip0_332_163)">
                                    <path
                                        d="M36.807 9.26786V1.09047C36.807 0.689664 36.583 0.322753 36.2154 0.129719C35.8522 -0.0618404 35.4199 -0.0404741 35.0835 0.183504L12.2658 15.3897C11.96 15.5974 11.7806 15.9341 11.7806 16.2952C11.7806 16.6569 11.9577 17.0003 12.2658 17.2014L35.0731 32.4031C35.4147 32.6279 35.8418 32.65 36.2102 32.4672C36.5666 32.2735 36.7966 31.9014 36.7966 31.4991V22.7087C40.3885 22.7338 43.348 22.8863 45.8282 23.1803C57.6951 24.5794 60.8689 31.6281 60.9991 31.9279C61.1643 32.3354 61.5766 32.591 62.0149 32.591C62.0781 32.591 62.157 32.5888 62.2284 32.5711C62.7404 32.4702 63.1147 32.0237 63.1147 31.5043C63.1147 13.6973 41.7585 9.90517 36.807 9.26786Z"
                                        fill="white"
                                    />
                                    <path
                                        d="M60.4536 54.7942L37.6411 39.5954C37.31 39.3684 36.8776 39.3427 36.5093 39.5269C36.1528 39.7243 35.9288 40.092 35.9288 40.495V49.2868C32.3324 49.2596 29.3729 49.1078 26.8979 48.8124C15.0258 47.414 11.8513 40.366 11.7263 40.0662C11.5544 39.6573 11.1443 39.4031 10.7113 39.4031C10.6413 39.4031 10.5639 39.406 10.4925 39.4237C9.97902 39.5246 9.6062 39.9704 9.6062 40.492C9.6062 58.2953 30.9602 62.0926 35.9177 62.7336V70.9103C35.9177 71.3059 36.1364 71.6772 36.5041 71.871C36.8672 72.0604 37.2995 72.0397 37.6359 71.8157L60.4536 56.6118C60.7587 56.4025 60.9395 56.0673 60.9395 55.7048C60.9403 55.3387 60.7617 54.9938 60.4536 54.7942Z"
                                        fill="white"
                                    />
                                </g>
                                <defs>
                                    <clipPath id="clip0_332_163">
                                        <rect width="72.7208" height="72" fill="white" />
                                    </clipPath>
                                </defs>
                            </svg>
                        </div>
                        <div class="mt-4 text-left">
                            <h2 class="text-xl font-bold mb-2 text-center">Orders</h2>
                            <p class="text-base w-72 text-center">
                                Details of all the orders recieved
                            </p>
                            <Link
                                to={"/vendor/dashboard/orders"}
                                className="w-full mt-14 mb-0  flex justify-center  "
                            >
                                <button class="w-56 h-11 ml-10  rounded-xl bg-[#01A664] text-white font-bold mr-5">
                                    Check Orders
                                </button>
                            </Link>
                        </div>
                    </div>
                    <div class="flex flex-col justify-center mb-8 w-72 ">
                        <div class="w-32 h-32 bg-[#01A664] justify-center items-center flex rounded-md mx-auto">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="72"
                                height="72"
                                viewBox="0 0 72 72"
                                fill="none"
                            >
                                <path
                                    d="M24 18L63 18.0023M24 36L63 36.0024M24 54L63 54.0021M9 19.5H12V16.5H9V19.5ZM9 37.5H12V34.5H9V37.5ZM9 55.5H12V52.5H9V55.5Z"
                                    stroke="white"
                                    stroke-width="5"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                />
                            </svg>
                        </div>
                        <div class="mt-4 text-left">
                            <h2 class="text-xl font-bold mb-2 text-center">List Product</h2>
                            <p class="text-base w-72 text-center">
                                Create a new Product
                            </p>
                            <Link
                                to={"/vendor/dashboard/product/create"}
                                className="w-full mt-14 mb-0  flex justify-center  "
                            >
                                <button class="w-56 h-11 ml-10  rounded-xl bg-[#01A664] text-white font-bold mr-5">
                                    Create
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

export default VendorDasboard