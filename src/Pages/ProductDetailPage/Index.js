import React, { useEffect, useState } from "react";
import Navbar from "../../Components/Navbar/index";
import Footer from "../../Components/Footer/Index";
import editbtn from "../../Assets/edit-button.png";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { GridItems } from "../../Components/BrowsingPagination/GridView";
import { addToCart, addToWishlist } from "../../redux/Main/mainSlice";
import { Alert } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom"
import AlertDialog from "./DeleteDialog"
import personImage from "../../Assets/image.png"
import ReviewDialog from "./ReviewDialog";

const Index = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [rating, setRating] = useState(0);
  const [moreToRentData, setMoreToRentData] = useState([]);
  const [image, setImage] = useState(null);
  const [selectedImg, setSelectedImg] = useState(1);
  const token = useSelector((state) => state.userID);
  const currentUserId = useSelector((state) => state.id);
  const productDescription = useSelector((state) => state.productDescription);
  const [productData, setProductData] = useState({})
  const status = useSelector(state => state.status);
  const [open, setOpen] = useState(false);
  const [reviewOpen, setReviewOpen] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [vendorProfile, setVendorProfile] = useState({});
  const [review, setReview] = useState({ rating: '', comment: '' })
  const [calculateRating, setCalculateRating] = useState(0);
  const Navigate = useNavigate();

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/products/${id}`, {
      headers: { Authorization: `${token}` },
    })
      .then((res) => {
        let sum = 0;
        for (let i = 0; i < res.data.product.reviews.length; i++) {
          sum += res.data.product.reviews[i].rating;
          axios.get(`${process.env.REACT_APP_BACKEND_URL}/profile/${res.data.product.reviews[i].user}`, {
            headers: { Authorization: `${token}` },
          }).then(res1 => {
            res.data.product.reviews[i].profilePicture = res1.data.data[0].image;
            res.data.product.reviews[i].name = res1.data.data[0].name;
          }).catch((err) => console.log(err));
        }
        sum = Math.round(sum / res.data.product.reviews.length);
        setProductData(res.data.product);
        setCalculateRating(sum);
        setImage(res.data.product.images[0]);
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/profile/${res.data.product?.owner}`, {
          headers: { Authorization: `${token}` },
        }).then(res => {
          setVendorProfile(res.data.data[0]);
        }).catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  }, [id]); //eslint-disable-line

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/products/filter/${currentUserId}`, {
      headers: { Authorization: `${token}` },
    })
      .then((res) => {
        setMoreToRentData(res.data);
      })
      .catch((err) => console.log(err));
  }, [id]); //eslint-disable-line

  const AddReview = () => {
    axios.post(`${process.env.REACT_APP_BACKEND_URL}/products/review`, {
      productId: id,
      user: currentUserId,
      comment: review.comment,
      rating: review.rating
    }, {
      headers: { Authorization: `${token}` },
    })
      .then((res) => {
        const updatedReviews = [
          {
            user: currentUserId,
            comment: review.comment,
            rating: review.rating
          },
          ...productData.reviews
        ];
        setProductData((prevProductData) => ({
          ...prevProductData,
          reviews: updatedReviews
        }));
      })
      .catch((err) => console.log(err));
  }
  const dispatch = useDispatch();
  const wishlist = useSelector((state) => state.wishlist);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [severity, setSeverity] = useState("");
  const handleCart = async (item) => {
    dispatch(addToCart(item));
    setShowAlert(true);
    setAlertMessage("Item Added to Cart Successfully");
    setSeverity("success");
    setTimeout(() => {
      setShowAlert(false);
    }, 1000);
  };
  const handleWishlist = (item) => {
    console.log(item);
    const matchedItem = wishlist.find((elem) => elem._id === item._id);
    if (!matchedItem) {
      dispatch(addToWishlist(item));
      setShowAlert(true);
      setAlertMessage("Item Added to Wishlist Successfully");
      setSeverity("success");
      navigate('/wishlist')
      setTimeout(() => {
        setShowAlert(false);
      }, 1500);
    } else {
      setShowAlert(true);
      setAlertMessage("Item Already in Wishlist");
      setSeverity("error");
      setTimeout(() => {
        setShowAlert(false);
      }, 500);
    }
  };

  useEffect(() => {
    if (confirmDelete) {
      axios
        .delete(`${process.env.REACT_APP_BACKEND_URL}/products/${id}`, {
          headers: { Authorization: `${token}` },
        })
        .then(() => {
          if (status === "vendor") {
            Navigate('/vendor/dashboard')
          } else {
            Navigate('/admin/dashboard')
          }
        })
        .catch((err) => alert(err));
      setConfirmDelete(false);
    }
  }, [confirmDelete])
  return (
    <div>
      <Navbar />
      <div className="w-11/12 mx-auto mt-6">
        <div className="my-14">
          <ul className="productDetailBread text-grayBr inline-block font-medium">
            <li className="inline">{productData?.category}</li>
            <li className="inline-block px-2">/</li>
            <li className="inline-block">{productData?.title}</li>
            <li className="inline-block px-2">/</li>
            <li className="inline-block">{productData?.description}</li>
          </ul>
        </div>
        <div className="mb-10">
          {showAlert && (
            <Alert
              onClose={() => {
                setShowAlert(false);
              }}
              severity={severity}
              className="mb-10"
            >
              {alertMessage}
            </Alert>
          )}
          <div className="md:grid md:grid-cols-12 md:gap-x-10">
            <div className="lg:col-span-7 col-span-12">
              <div className="flex flex-col-reverse md:flex-row gap-x-6 max-h-[600px] md:max-h-[none]">
                <div className="md:w-[20%] w-full gap-y-9 flex md:block mt-6 md:mt-0">
                  {productData?.images?.map((item, index) => (
                    <img
                      className={`${selectedImg === index + 1 ? "border-4 border-white" : ""} w-[100px] h-[100px] md:w-full mr-2 md:mr-0 md:h-[150px] object-cover object-center rounded-xl mb-3 md:mb-5`}
                      src={item}
                      alt="Card "
                      onClick={() => {
                        setImage(item);
                        setSelectedImg(index + 1);
                      }}
                    />
                  ))}
                </div>
                <div className="w-[80%] md:w-[80%]">
                  <img
                    className="w-full h-auto md:max-h-[300px] max-w-full lg:max-h-[600px] rounded-xl"
                    src={image}
                    alt="Card"
                  />
                </div>

              </div>

            </div>
            <div className="lg:col-span-5 col-span-12">
              <div className="">
                <h1 className="font-semibold text-xl mb-4">
                  {productData?.title}
                </h1>
                <p className="text-md mb-6">{productData?.description}</p>
                <div className="flex flex-wrap gap-4 w-full">
                  <div className="bg-primaryLig rounded-2xl text-center p-3">
                    <h3 className="font-semibold text-sm">Daily</h3>
                    <h4 className="text-sm">
                      {productData?.pricePerDay}£ / Day
                    </h4>
                  </div>
                  <div className="bg-primaryLig rounded-2xl text-center p-3">
                    <h3 className="font-semibold  text-sm">Hourly</h3>
                    <h4 className=" text-sm">
                      {productData?.pricePerHour}£ / Hour
                    </h4>
                  </div>
                  <div className="flex items-center ml-2">
                    <div>
                      {[...Array(5)].map((_, index) => (
                        <span
                          key={index}
                          className={`text-2xl ${index < calculateRating ? "text-yellow-500" : "text-gray-300"
                            }`}
                        >
                          &#9733;
                        </span>
                      ))}
                    </div>
                    <p className="text-grayBr text-sm pl-3">({productData?.reviews?.length})</p>
                  </div>
                </div>

                <hr className="my-6 "></hr>
                {
                  (status !== "vendor" && status !== "admin" && productData?.owner !== currentUserId) && <div className="gap-6 mb-6 grid grid-cols-12">
                    <button
                      onClick={() => handleCart(productDescription)}
                      className="col-span-10 py-4 bg-primary rounded-lg text-center font-bold text-white text-lg"
                    >
                      Add to Cart
                    </button>
                    <button
                      onClick={() => handleWishlist(productDescription)}
                      className="col-span-2 flex justify-center items-center p-4 bg-transparent border border-grayHead rounded-lg text-center font-bold text-white text-xl"
                    >
                      <svg
                        width="22"
                        height="20"
                        viewBox="0 0 22 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M6 1C3.239 1 1 3.216 1 5.95C1 8.157 1.875 13.395 10.488 18.69C10.6423 18.7839 10.8194 18.8335 11 18.8335C11.1806 18.8335 11.3577 18.7839 11.512 18.69C20.125 13.395 21 8.157 21 5.95C21 3.216 18.761 1 16 1C13.239 1 11 4 11 4C11 4 8.761 1 6 1Z"
                          stroke="black"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                    </button>
                  </div>
                }
                <p className="mb-5">{productData?.isDeliverable ? "Delivery Included" : "Delivery not included"}</p>
                {
                  (status === "admin" || (productData?.owner === currentUserId && status !== "customer")) && <div className="gap-6 mb-6 grid grid-cols-12">
                    <button onClick={() => { setOpen(!open) }}
                      className="col-span-10 py-4 bg-red-500 rounded-lg text-center font-bold text-white text-lg"
                    >
                      Delete Product
                    </button>
                    <img className="cursor-pointer" onClick={() => { Navigate(`/product/edit/${productData._id}`) }} src={editbtn} alt="edit" />
                  </div>
                }
                <div className="mb-6">
                  <h2 className="text-xl font-bold mb-4">Owner of the item</h2>
                  <div className="flex gap-x-4">
                    <img
                      className="w-[60px] h-[60px] object-cover object-center rounded-full"
                      src={vendorProfile?.image ? vendorProfile?.image : personImage}
                      alt="Card "
                    />
                    <div>
                      <h3 className="font-medium text-md">
                        {productData?.manufacturer?.name}
                      </h3>
                      <div className="flex items-center">
                        <div>
                          {[...Array(5)].map((_, index) => (
                            <span
                              key={index}
                              className={` text-2xl ${index < 4 ? "text-yellow-500" : "text-gray-300"
                                }`}
                            >
                              &#9733;
                            </span>
                          ))}
                        </div>
                        <div className="flex text-sm gap-x-2 pl-2 text-grayBr">
                          <p>(34)</p>
                          <p>({productData?.manufacturer?.address})</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex md:flex-row flex-col gap-6">
                  <p
                    onClick={() => {
                      if (productData?.owner === currentUserId && status === "vendor") {
                        Navigate('/profile')
                      } else {
                        Navigate(`/profile/${productData?.owner}`)
                      }
                    }}
                    className="bg-primaryLig py-3 text-center w-full rounded-xl font-medium text-md cursor-pointer"
                  >
                    View Profile
                  </p>
                  <a
                    href={`/chat?user=${productData?.owner}`}
                    className="bg-primaryLig py-3 text-center w-full rounded-xl font-medium text-md"
                  >
                    Chat with renter
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col md:flex-row justify-between items-center my-16">
          <div className="text-xl font-medium flex items-center md:mb-0 mb-4">
            <div className="w-[15px] h-[30px] bg-primary rounded-sm block md:mr-2 mb-2 md:mb-0"></div>
            <div className="font-semibold ">Other items by owner</div>
          </div>
          <div className="">
            <button
              onClick={() => { Navigate(`/vendor/products/${productData?.owner}`) }}
              className="px-10 h-11 rounded-xl text-md bg-primaryLig border border-grayBr text-black font-semibold"
            >
              View all listings by the owner
            </button>
          </div>
        </div>
        <div className="mb-10">
          <GridItems
            currentItems={moreToRentData}
            parentClassName="flex justify-center items-center flex-col md:flex-row flex-wrap"
            boxWidth="w-[250px]"
            imageHeight="h-[170px]"
            itemsToRender={4}
          />
        </div>
      </div>

      <div className="md:mb-36 bg-[#D6FFD8] mx-0 md:mt-15 mt-16 p-4 md:p-14 mb-20">
        <div className="flex justify-center items-center mb-10">
          <button
            onClick={() => { setReviewOpen(!reviewOpen) }}
            className="py-2 px-5 bg-primary rounded-lg text-center font-bold text-white text-lg"
          >
            Write Review
          </button>
        </div>
        <div className="flex flex-wrap justify-between">
          {
            productData?.reviews?.map((Item) => (
              <div className="bg-white p-4 md:p-6 w-[100%] md:max-w-[48%] my-3">
                <div>
                  <div className="flex flex-col md:flex-row justify-between items-start w-[100%]">
                    <div className="flex items-center mb-2 md:mb-0 md:mr-4">
                      <img
                        className="w-[60px] h-[60px] object-cover object-center rounded-full"
                        src={Item.profilePicture || personImage}
                        alt="Card "
                      />
                      <div className="ml-6">
                        <h3 className="font-medium text-md">{Item.name || ''}</h3>
                        <div className="flex items-center">
                          <div>
                            {[...Array(5)].map((_, index) => (
                              <span
                                key={index}
                                className={`text-2xl ${index < Item.rating ? "text-yellow-500" : "text-gray-300"
                                  }`}
                              >
                                &#9733;
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                    <h3 className="text-md font-medium md:mt-0 mt-2">{Item?.createdAt?.slice(0, 10)}</h3>
                  </div>
                  <p className="text-sm md:text-md mt-2">
                    {Item.comment}
                  </p>
                </div>
              </div>
            ))
          }

          {/* <div className="bg-white p-4 md:p-6 w-[100%] md:max-w-[48%] my-3">
            <div>
              <div className="flex flex-col md:flex-row justify-between items-start w-[100%]">
                <div className="flex items-center mb-2 md:mb-0 md:mr-4">
                  <img
                    className="w-[60px] h-[60px] object-cover object-center rounded-full"
                    src={customer1}
                    alt="Card "
                  />
                  <div className="ml-6">
                    <h3 className="font-medium text-md">Louis max</h3>
                    <div className="flex items-center">
                      <div>
                        {[...Array(5)].map((_, index) => (
                          <span
                            key={index}
                            className={`text-2xl ${index < 4 ? "text-yellow-500" : "text-gray-300"
                              }`}
                          >
                            &#9733;
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                <h3 className="text-md font-medium md:mt-0 mt-2">22-12-2023</h3>
              </div>
              <p className="text-sm md:text-md mt-2">
                “Renting a camera from Louis Max was like stepping into a portal
                to photographic paradise. From the moment I messaged them, I felt
                like I was talking to a fellow shutterbug, not just a random
                renter. They knew exactly what I needed, recommended the perfect
                lens for my wildlife adventure, and even threw in a couple of
                handy filters for good measure.” - Angela
              </p>
            </div>
          </div> */}
        </div>

        {/* <div className="lg:col-span-6 col-span-12 bg-white p-6">
          <div>
            <div className="flex justify-between items-start">
              <div className="flex gap-x-4">
                <img
                  className="w-[60px] h-[60px] object-cover object-center rounded-full"
                  src={customer2}
                  alt="Card "
                />
                <div>
                  <h3 className="font-medium text-md">Louis max</h3>
                  <div className="flex items-center">
                    <div>
                      {[...Array(5)].map((_, index) => (
                        <span
                          key={index}
                          className={`text-2xl ${index < 5 ? "text-yellow-500" : "text-gray-300"
                            }`}
                        >
                          &#9733;
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <h3 className="text-md font-medium">22-12-2023</h3>
            </div>
            <p className="text-md mt-2">
              “Renting a camera from Louis Max was like stepping into a portal
              to photographic paradise. From the moment I messaged them, I felt
              like I was talking to a fellow shutterbug, not just a random
              renter. They knew exactly what I needed, recommended the perfect
              lens for my wildlife adventure, and even threw in a couple of
              handy filters for good measure.” - Angela
            </p>
          </div>
        </div>
        <div className="lg:col-span-6 col-span-12 bg-white p-6">
          <div>
            <div className="flex justify-between items-start">
              <div className="flex gap-x-4">
                <img
                  className="w-[60px] h-[60px] object-cover object-center rounded-full"
                  src={customer3}
                  alt="Card "
                />
                <div>
                  <h3 className="font-medium text-md">Louis max</h3>
                  <div className="flex items-center">
                    <div>
                      {[...Array(5)].map((_, index) => (
                        <span
                          key={index}
                          className={`text-2xl ${index < 4 ? "text-yellow-500" : "text-gray-300"
                            }`}
                        >
                          &#9733;
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <h3 className="text-md font-medium">22-12-2023</h3>
            </div>
            <p className="text-md mt-2">
              “Renting a camera from Louis Max was like stepping into a portal
              to photographic paradise. From the moment I messaged them, I felt
              like I was talking to a fellow shutterbug, not just a random
              renter. They knew exactly what I needed, recommended the perfect
              lens for my wildlife adventure, and even threw in a couple of
              handy filters for good measure.” - Angela
            </p>
          </div>
        </div>
        <div className="lg:col-span-6 col-span-12 bg-white p-6">
          <div>
            <div className="flex justify-between items-start">
              <div className="flex gap-x-4">
                <img
                  className="w-[60px] h-[60px] object-cover object-center rounded-full"
                  src={customer4}
                  alt="Card "
                />
                <div>
                  <h3 className="font-medium text-md">Louis max</h3>
                  <div className="flex items-center">
                    <div>
                      {[...Array(5)].map((_, index) => (
                        <span
                          key={index}
                          className={`text-2xl ${index < 5 ? "text-yellow-500" : "text-gray-300"
                            }`}
                        >
                          &#9733;
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <h3 className="text-md font-medium">22-12-2023</h3>
            </div>
            <p className="text-md mt-2">
              “Renting a camera from Louis Max was like stepping into a portal
              to photographic paradise. From the moment I messaged them, I felt
              like I was talking to a fellow shutterbug, not just a random
              renter. They knew exactly what I needed, recommended the perfect
              lens for my wildlife adventure, and even threw in a couple of
              handy filters for good measure.” - Angela
            </p>
          </div>
        </div> */}
      </div>
      <AlertDialog open={open} setOpen={setOpen} confirmDelete={confirmDelete} setConfirmDelete={setConfirmDelete} />
      <ReviewDialog open={reviewOpen} setOpen={setReviewOpen} AddReview={AddReview} review={review} setReview={setReview} />
      <Footer />
    </div>
  );
};

export default Index;
