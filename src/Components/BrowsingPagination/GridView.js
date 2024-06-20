import React, { useState } from "react";
import ReactPaginate from "react-paginate";
import { Audio } from "react-loader-spinner";
import { useDispatch, useSelector } from "react-redux";
import { Alert } from "@mui/material";

import {
  addToCart,
  addToWishlist,
  deleteFromWishlist,
  productDescription,
} from "../../redux/Main/mainSlice";
import { useNavigate } from "react-router-dom";

function GridItems({
  currentItems,
  parentClassName,
  boxWidth,
  imageHeight,
  itemsToRender,
  deleteBtn,
}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const wishlist = useSelector((state) => state.wishlist);
  const status = useSelector(state => state.status);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [severity, setSeverity] = useState("");
  const handleCart = async (item) => {
    if (status !== "vendor" && status !== "admin") {
      dispatch(addToCart(item));
      setShowAlert(true);
      setAlertMessage("Item Added to Cart Successfully");
      setSeverity("success");
      setTimeout(() => {
        setShowAlert(false);
      }, 1000);
      navigate('/cart')
    }
  };
  const handleWishlist = (item) => {
    console.log(item);
    const matchedItem = wishlist.find((elem) => elem._id == item._id);
    if (!matchedItem) {
      dispatch(addToWishlist(item));
      setShowAlert(true);
      setAlertMessage("Item Added to Wishlist Successfully");
      navigate('/wishlist')
      setSeverity("success");
      setTimeout(() => {
        setShowAlert(false);
      }, 1000);
    } else {
      setShowAlert(true);
      setAlertMessage("Item Already in Wishlist");
      setSeverity("error");
      setTimeout(() => {
        setShowAlert(false);
      }, 500);
    }
  };
  const handleDelete = (index) => {
    dispatch(deleteFromWishlist(index));
  };
  const handleProductClick = (item) => {
    dispatch(productDescription(item));
    navigate(`/productdetail/${item._id}`);
  };

  return (
    <div className="flex-col flex gap-5">
      {showAlert && (
        <Alert
          onClose={() => {
            setShowAlert(false);
          }}
          severity={severity}
        >
          {alertMessage}
        </Alert>
      )}
      <div className={parentClassName}>
        {currentItems &&
          currentItems.map((item, index) => {
            if (itemsToRender > index) {
              return (
                <div
                  key={index}
                  className={`relative cursor-pointer flex flex-col mb-10 mx-5 items-center ${boxWidth} bg-white rounded-2xl shadow-xl m-3`}
                >
                  <img onClick={() => handleProductClick(item)}
                    className={`${imageHeight} w-full rounded-2xl `}
                    src={item.images[0]} alt=""
                  />
                  <div className=" w-[120px] flex-col flex gap-1 pt-4 pb-8">
                    <div onClick={() => handleProductClick(item)} className="font-semibold text-black text-center line-clamp-1 text-[13px] flex justify-center">
                      {item.title}
                    </div>
                    <div onClick={() => handleProductClick(item)} className="flex justify-between items-center">
                      <div className="font-semibold text-[#01A664] text-[13px]">
                        {item.price}
                      </div>
                      <div className="flex gap-1 items-center">
                        <div className="flex">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="13"
                            height="10"
                            viewBox="0 0 15 12"
                            fill="none"
                          >
                            <path
                              d="M13.583 4.35974L9.90681 4.05974C9.67506 4.04156 9.47482 3.91428 9.38012 3.72338L8.06339 0.968838C7.85271 0.514294 7.10471 0.514294 6.89403 0.968838L5.58783 3.72338C5.50356 3.91428 5.29289 4.04156 5.06114 4.05974L1.38484 4.35974C0.83708 4.40519 0.615869 4.9961 1.02669 5.31428L3.79708 7.41427C3.97616 7.55064 4.0499 7.75064 3.99723 7.95063L3.16506 10.896C3.03865 11.3597 3.61801 11.7414 4.10257 11.4961L7.16791 9.94145C7.36805 9.84145 7.61033 9.84145 7.81047 9.94145L10.8759 11.4961C11.3605 11.7414 11.9398 11.3688 11.8133 10.896L10.9917 7.95063C10.939 7.75064 11.0128 7.55064 11.1918 7.41427L13.9622 5.31428C14.3625 4.9961 14.1308 4.40519 13.583 4.35974Z"
                              fill="#FFC107"
                            />
                          </svg>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="13"
                            height="10"
                            viewBox="0 0 15 12"
                            fill="none"
                          >
                            <path
                              d="M13.583 4.35974L9.90681 4.05974C9.67506 4.04156 9.47482 3.91428 9.38012 3.72338L8.06339 0.968838C7.85271 0.514294 7.10471 0.514294 6.89403 0.968838L5.58783 3.72338C5.50356 3.91428 5.29289 4.04156 5.06114 4.05974L1.38484 4.35974C0.83708 4.40519 0.615869 4.9961 1.02669 5.31428L3.79708 7.41427C3.97616 7.55064 4.0499 7.75064 3.99723 7.95063L3.16506 10.896C3.03865 11.3597 3.61801 11.7414 4.10257 11.4961L7.16791 9.94145C7.36805 9.84145 7.61033 9.84145 7.81047 9.94145L10.8759 11.4961C11.3605 11.7414 11.9398 11.3688 11.8133 10.896L10.9917 7.95063C10.939 7.75064 11.0128 7.55064 11.1918 7.41427L13.9622 5.31428C14.3625 4.9961 14.1308 4.40519 13.583 4.35974Z"
                              fill="#FFC107"
                            />
                          </svg>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="13"
                            height="10"
                            viewBox="0 0 15 12"
                            fill="none"
                          >
                            <path
                              d="M13.583 4.35974L9.90681 4.05974C9.67506 4.04156 9.47482 3.91428 9.38012 3.72338L8.06339 0.968838C7.85271 0.514294 7.10471 0.514294 6.89403 0.968838L5.58783 3.72338C5.50356 3.91428 5.29289 4.04156 5.06114 4.05974L1.38484 4.35974C0.83708 4.40519 0.615869 4.9961 1.02669 5.31428L3.79708 7.41427C3.97616 7.55064 4.0499 7.75064 3.99723 7.95063L3.16506 10.896C3.03865 11.3597 3.61801 11.7414 4.10257 11.4961L7.16791 9.94145C7.36805 9.84145 7.61033 9.84145 7.81047 9.94145L10.8759 11.4961C11.3605 11.7414 11.9398 11.3688 11.8133 10.896L10.9917 7.95063C10.939 7.75064 11.0128 7.55064 11.1918 7.41427L13.9622 5.31428C14.3625 4.9961 14.1308 4.40519 13.583 4.35974Z"
                              fill="#FFC107"
                            />
                          </svg>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="13"
                            height="10"
                            viewBox="0 0 15 12"
                            fill="none"
                          >
                            <path
                              d="M13.583 4.35974L9.90681 4.05974C9.67506 4.04156 9.47482 3.91428 9.38012 3.72338L8.06339 0.968838C7.85271 0.514294 7.10471 0.514294 6.89403 0.968838L5.58783 3.72338C5.50356 3.91428 5.29289 4.04156 5.06114 4.05974L1.38484 4.35974C0.83708 4.40519 0.615869 4.9961 1.02669 5.31428L3.79708 7.41427C3.97616 7.55064 4.0499 7.75064 3.99723 7.95063L3.16506 10.896C3.03865 11.3597 3.61801 11.7414 4.10257 11.4961L7.16791 9.94145C7.36805 9.84145 7.61033 9.84145 7.81047 9.94145L10.8759 11.4961C11.3605 11.7414 11.9398 11.3688 11.8133 10.896L10.9917 7.95063C10.939 7.75064 11.0128 7.55064 11.1918 7.41427L13.9622 5.31428C14.3625 4.9961 14.1308 4.40519 13.583 4.35974Z"
                              fill="#FFC107"
                            />
                          </svg>
                        </div>
                        <div className="font-semibold text-black text-[10px]">
                          (2)
                        </div>
                      </div>
                    </div>
                    <div onClick={() => handleProductClick(item)} className="flex items-center font-semibold text-[13px] justify-between">
                      <div>Zipcode</div>
                      <div>{item.zipCode}</div>
                    </div>
                    <button
                      onClick={() => handleCart(item)}
                      className="absolute bottom-[-20px] bg-[#01A664] py-2 px-4 rounded-3xl text-white font-semibold text-[14px] tracking-[1px]"
                    >
                      {status === "vendor" || status ==="admin" ? "More Details" : "Add to Cart"}
                    </button>
                  </div>
                  {deleteBtn ? (
                    <button
                      className="absolute right-2 top-2"
                      onClick={() => handleDelete(index)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          d="M9 7C9 6.20435 9.31607 5.44129 9.87868 4.87868C10.4413 4.31607 11.2044 4 12 4C12.7956 4 13.5587 4.31607 14.1213 4.87868C14.6839 5.44129 15 6.20435 15 7M9 7H15M9 7H6M15 7H18M6 7H4M6 7V18C6 18.5304 6.21071 19.0391 6.58579 19.4142C6.96086 19.7893 7.46957 20 8 20H16C16.5304 20 17.0391 19.7893 17.4142 19.4142C17.7893 19.0391 18 18.5304 18 18V7M18 7H20"
                          stroke="black"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          fill="white"
                        />
                      </svg>
                    </button>
                  ) : (
                    <button
                      className="absolute right-2 top-2"
                      onClick={() => handleWishlist(item)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 27 27"
                        fill="none"
                      >
                        <g clip-path="url(#clip0_1430_290)">
                          <path
                            d="M19.1251 2.25C16.9314 2.25 14.6251 3.99375 13.5001 5.90625C12.3751 3.99375 10.0689 2.25 7.87512 2.25C6.98394 2.25519 6.10261 2.43681 5.28199 2.78437C4.46136 3.13193 3.71769 3.63855 3.09387 4.275C2.46507 4.9016 1.96718 5.64701 1.62919 6.46785C1.29119 7.28869 1.11985 8.16856 1.12512 9.05625C1.12512 11.3625 2.64387 13.3312 3.93762 14.7937L13.1064 24.5812C13.2115 24.6843 13.3529 24.742 13.5001 24.742C13.6474 24.742 13.7887 24.6843 13.8939 24.5812L23.0626 14.7937C24.3564 13.3312 25.8751 11.3625 25.8751 9.05625C25.8752 7.26082 25.1658 5.5381 23.9015 4.26328C22.6373 2.98847 20.9205 2.26484 19.1251 2.25Z"
                            fill="#B8B8B8"
                          />
                        </g>
                        <defs>
                          <clipPath id="clip0_1430_290">
                            <rect width="27" height="27" fill="white" />
                          </clipPath>
                        </defs>
                      </svg>
                    </button>
                  )}
                </div>
              );
            }
          })}
      </div>
    </div>
  );
}

function GridView({
  itemsPerPage,
  items,
  loading,
  parentClassName,
  boxWidth,
  imageHeight,
}) {
  const [itemOffset, setItemOffset] = useState(0);

  const endOffset = itemOffset + itemsPerPage;
  console.log(`Loading items from ${itemOffset} to ${endOffset}`);
  const currentItems = items.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(items.length / itemsPerPage);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % items.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
  };

  return (
    <>
      <div className="col-span-12 bg-[#D6FFD8] px-8 pt-5 pb-0 flex flex-col gap-5">
        {loading ? (
          <div className="justify-center items-center flex h-full">
            <Audio
              height="60"
              width="60"
              radius="9"
              color="green"
              ariaLabel="loading"
              wrapperStyle
              wrapperClass
            />
          </div>
        ) : (
          <>
            {items.length > 0 ? (
              <GridItems
                currentItems={currentItems}
                parentClassName={parentClassName}
                boxWidth={boxWidth}
                imageHeight={imageHeight}
                itemsToRender={999999}
              />
            ) : (
              <div className="text-center font-semibold text-[20px] justify-center items-center flex h-full">
                <div>No Products Found </div>
              </div>
            )}
          </>
        )}
      </div>
      <ReactPaginate
        breakLabel="..."
        nextLabel={
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="10"
            height="17"
            viewBox="0 0 14 21"
            fill="none"
          >
            <path
              d="M2.87729 20.5936L13.4013 11.8433C13.5898 11.6737 13.7405 11.4665 13.8436 11.2351C13.9467 11.0037 14 10.7532 14 10.5C14 10.2468 13.9467 9.99634 13.8436 9.76494C13.7405 9.53354 13.5898 9.32633 13.4013 9.1567L2.87729 0.406381C2.70048 0.259153 2.49635 0.148111 2.27653 0.0795965C2.05672 0.0110821 1.82553 -0.0135635 1.59617 0.00706717C1.36681 0.0276978 1.14377 0.0932006 0.939787 0.199835C0.735799 0.30647 0.55486 0.452149 0.407299 0.628554C0.259738 0.804959 0.148446 1.00864 0.0797768 1.22795C0.0111084 1.44727 -0.0135937 1.67794 0.00708294 1.90678C0.0277605 2.13563 0.0934114 2.35817 0.200286 2.56169C0.307161 2.76522 0.45317 2.94576 0.629972 3.09298L9.53706 10.5L0.629972 17.907C0.45317 18.0542 0.307161 18.2348 0.200286 18.4383C0.0934114 18.6418 0.0277605 18.8644 0.00708294 19.0932C-0.0135937 19.3221 0.0111084 19.5527 0.0797768 19.772C0.148446 19.9914 0.259738 20.195 0.407299 20.3714C0.55486 20.5478 0.735799 20.6935 0.939787 20.8002C1.14377 20.9068 1.36681 20.9723 1.59617 20.9929C1.82553 21.0136 2.05672 20.9889 2.27653 20.9204C2.49635 20.8519 2.70048 20.7408 2.87729 20.5936Z"
              fill="black"
            />
          </svg>
        }
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel={
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="10"
            height="17"
            viewBox="0 0 14 21"
            fill="none"
          >
            <path
              d="M11.1227 0.406384L0.598672 9.1567C0.41021 9.32633 0.259542 9.53354 0.156415 9.76494C0.0532878 9.99634 0 10.2468 0 10.5C0 10.7532 0.0532878 11.0037 0.156415 11.2351C0.259542 11.4665 0.41021 11.6737 0.598672 11.8433L11.1227 20.5936C11.2995 20.7408 11.5037 20.8519 11.7235 20.9204C11.9433 20.9889 12.1745 21.0136 12.4038 20.9929C12.6332 20.9723 12.8562 20.9068 13.0602 20.8002C13.2642 20.6935 13.4451 20.5479 13.5927 20.3714C13.7403 20.195 13.8516 19.9914 13.9202 19.772C13.9889 19.5527 14.0136 19.3221 13.9929 19.0932C13.9722 18.8644 13.9066 18.6418 13.7997 18.4383C13.6928 18.2348 13.5468 18.0542 13.37 17.907L4.46294 10.5L13.37 3.09298C13.5468 2.94576 13.6928 2.76522 13.7997 2.5617C13.9066 2.35817 13.9722 2.13563 13.9929 1.90679C14.0136 1.67794 13.9889 1.44728 13.9202 1.22796C13.8516 1.00864 13.7403 0.80496 13.5927 0.628555C13.4451 0.45215 13.2642 0.306471 13.0602 0.199837C12.8562 0.0932007 12.6332 0.0277004 12.4038 0.00707054C12.1745 -0.0135612 11.9433 0.0110836 11.7235 0.0795975C11.5037 0.148111 11.2995 0.259155 11.1227 0.406384Z"
              fill="black"
            />
          </svg>
        }
        containerClassName="flex col-span-12 items-center gap-5 mb-20 justify-center border-black text-black font-semibold text-[15px]"
        activeClassName="bg-[#01A664]  w-[30px] h-[30px] items-center flex justify-center rounded-full"
        renderOnZeroPageCount={null}
      />
    </>
  );
}
export { GridView, GridItems };
