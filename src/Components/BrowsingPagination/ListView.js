import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import ReactPaginate from "react-paginate";
import BrowsingPic2 from "../../Assets/browsing2.png";
import { Audio } from "react-loader-spinner";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  addToWishlist,
  calculateCartPrice,
  deleteFromCart,
  productDescription,
} from "../../redux/Main/mainSlice";
import { Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";
// Example items, to simulate fetching from another resources.
// const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];

function Items({ currentItems, deleteBtn }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const wishlist = useSelector((state) => state.wishlist);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [severity, setSeverity] = useState("");
  const handleCart = async (currentItems, index) => {
    dispatch(addToCart(currentItems[index]));
    setShowAlert(true);
    setAlertMessage("Item Added to Cart Successfully");
    setSeverity("success");
    setTimeout(() => {
      setShowAlert(false);
    }, 1000);
  };
  const handleDelete = (index) => {
    dispatch(deleteFromCart(index));
    dispatch(calculateCartPrice());
  };
  const handleWishlist = (item) => {
    console.log(item);
    const matchedItem = wishlist.find((elem) => elem._id == item._id);
    if (!matchedItem) {
      dispatch(addToWishlist(item));
      setShowAlert(true);
      setAlertMessage("Item Added to Wishlist Successfully");
      setSeverity("success");
      navigate('/wishlist')
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
  const handleProductClick = (id) => {
    // dispatch(productDescription(item));
    navigate(`/productdetail/${id}`);
  };
  return (
    <div>
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
      {currentItems &&
        currentItems.map((item, index) => (
          <div
            key={index}
            className={`bg-white cursor-pointer flex gap-4 px-2 py-2 shadow-xl relative`}
            style={{margin: "20px"}}
          >
            <img
              onClick={() => handleProductClick(item._id)}
              className="h-[110px] w-[120px] rounded-2xl "
              src={item?.images[0]}
              alt=""
            />
            <div className="flex items-center pr-10 w-full justify-between ">
              <div onClick={() => handleProductClick(item._id)} className="flex flex-col gap-2 py-2">
                <div className="font-semibold text-[15px]">{item.title}</div>
                <div className="flex items-center">
                  <div className="relative flex">
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
                    <div className="absolute right-[-20px] top-[-1px] text-[10px] font-semibold">
                      (2)
                    </div>
                  </div>
                </div>
                <div className="text-[#4CAF50] text-[13px] font-normal">
                  {item.price}
                </div>
                <div className="flex justify-between w-[150px]">
                  <div className="text-[13px]">Zipcode</div>
                  <div className="text-[13px]">{item.zipCode}</div>
                </div>
              </div>
              <div className="flex gap-3 md:gap-6 absolute md:relative right-[20px] top-[50%] md:top-auto md:right-auto">
                <button onClick={() => handleWishlist(item)}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="23"
                    height="23"
                    viewBox="0 0 31 31"
                    fill="none"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M15.3208 7.62903C13.033 4.96282 9.21001 4.13885 6.34352 6.5803C3.47702 9.02174 3.07346 13.1037 5.32454 15.9912C7.19615 18.3919 12.8603 23.4554 14.7167 25.0943C14.9244 25.2776 15.0282 25.3693 15.1494 25.4053C15.2551 25.4367 15.3708 25.4367 15.4765 25.4053C15.5977 25.3693 15.7015 25.2776 15.9092 25.0943C17.7656 23.4554 23.4297 18.3919 25.3014 15.9912C27.5524 13.1037 27.1981 8.99606 24.2823 6.5803C21.3666 4.16453 17.6086 4.96282 15.3208 7.62903Z"
                      stroke="black"
                      stroke-width="1.90714"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </button>

                {deleteBtn ? (
                  <button onClick={() => handleDelete(item._id)}>
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
                      />
                    </svg>
                  </button>
                ) : (
                  <button onClick={() => handleCart(currentItems, index)}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="23"
                      height="23"
                      viewBox="0 0 31 31"
                      fill="none"
                    >
                      <g clip-path="url(#clip0_1396_5313)">
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M22.9922 25.746C21.9394 25.746 21.085 26.6004 21.085 27.6531C21.085 28.7059 21.9394 29.5603 22.9922 29.5603C24.0449 29.5603 24.8993 28.7059 24.8993 27.6531C24.8993 26.6004 24.0449 25.746 22.9922 25.746ZM13.4564 25.746C12.4037 25.746 11.5493 26.6004 11.5493 27.6531C11.5493 28.7059 12.4037 29.5603 13.4564 29.5603C14.5092 29.5603 15.3636 28.7059 15.3636 27.6531C15.3636 26.6004 14.5092 25.746 13.4564 25.746ZM25.8529 20.0246C25.8529 21.0773 24.9985 21.9317 23.9457 21.9317H13.4564C12.4037 21.9317 11.5493 21.0773 11.5493 20.0246L9.95971 10.4888H28.2368L25.8529 20.0246ZM9.61355 8.5817L7.2344 0.953125H1.06002C0.532692 0.953125 0.106445 1.38033 0.106445 1.9067C0.106445 2.43402 0.532692 2.86027 1.06002 2.86027H5.82787L7.74549 8.5817H7.73502L9.64216 20.0246C9.64216 22.131 11.35 23.8388 13.4564 23.8388H23.9457C26.0522 23.8388 27.76 22.131 27.76 20.0246L30.6207 8.5817H9.61355Z"
                          fill="black"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_1396_5313">
                          <rect
                            width="30.5143"
                            height="30.5143"
                            fill="white"
                            transform="translate(0.106445)"
                          />
                        </clipPath>
                      </defs>
                    </svg>
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
    </div>
  );
}

function ListView({ itemsPerPage, items, loading }) {
  // Here we use item offsets; we could also use page offsets
  // following the API or data you're working with.
  const [itemOffset, setItemOffset] = useState(0);

  // Simulate fetching items from another resources.
  // (This could be items from props; or items loaded in a local state
  // from an API endpoint with useEffect and useState)
  const endOffset = itemOffset + itemsPerPage;
  console.log(`Loading items from ${itemOffset} to ${endOffset}`);
  const currentItems = items.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(items.length / itemsPerPage);

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % items.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
  };

  return (
    <>
      <div className="col-span-12 bg-[#D6FFD8] px-0 md:px-8 py-5 flex flex-col">
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
              <Items currentItems={currentItems} />
            ) : (
              <div className="text-center font-semibold text-[20px] justify-center items-center flex h-full">
                <div>No Products Found </div>
              </div>
            )}{" "}
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
        containerClassName="flex col-span-12 items-center gap-5 mb-5 justify-center border-black text-black font-semibold text-[15px]"
        activeClassName="bg-[#01A664]  w-[30px] h-[30px] items-center flex justify-center rounded-full"
        renderOnZeroPageCount={null}
      />
    </>
  );
}
export { ListView, Items };
