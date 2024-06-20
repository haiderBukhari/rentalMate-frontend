import React, { useState } from "react";
import Navbar from "../../Components/Navbar/index";
import CategoryBanner from "../../Assets/CategoryBanner.png";
import ExploreCard from "../../Components/ExploreCard/Index";
import Footer from "../../Components/Footer/Index";
import { Link } from "react-router-dom";
const Index = () => {
  const [selectedPage, setSelectedPage] = useState(1);

  const handlePageClick = (pageNumber) => {
    setSelectedPage(pageNumber);
  };
  return (
    <div>
      <Navbar />

      <div className="w-11/12 mx-auto mt-6">
        <div className="flex justify-center items-center">
          <div>
            <div className="w-60 mt-28">
              <p className="text-center font-semibold text-2xl">Browse</p>
              <p className="text-center">
                Search for the item or service you want to borrow, and select a
                listing that suits your needs.
              </p>
            </div>
            <div className="w-60 mt-14">
              <p className="text-center font-semibold text-2xl">Chat</p>
              <p className="text-center">
                Communicate with the owner to coordinate logistics, such as
                pick-up or delivery.
              </p>
            </div>
          </div>
          <div className="w-[600px]">
            <img src={CategoryBanner} alt="" />
          </div>
          <div>
            <div className="w-60 mt-36">
              <p className="text-center font-semibold text-2xl">Borrow</p>
              <p className="text-center">
                Reserve or book the item, specify your rental dates.
              </p>
            </div>
            <div className="w-60 mt-24">
              <p className="text-center font-semibold text-2xl">Return</p>
              <p className="text-center">
                Return the item in the same condition at the end of the rental
                period.
              </p>
            </div>
          </div>
        </div>
        <div className="flex justify-between items-center mt-6">
          <div className="text-2xl font-semibold">
            Browse items to rent near you
          </div>
          <div className="flex justify-between items-center">
            <p className="font-bold">View</p>
            <p>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 32 32"
                fill="none"
              >
                <path
                  d="M10.6666 10.6667H26.6666M14.6666 16H26.6666M18.6666 21.3333H26.6666M5.33331 10.6667H5.34665M9.33331 16H9.34665M13.3333 21.3333H13.3466"
                  stroke="black"
                  stroke-width="3"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </p>
            <p>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 32 32"
                fill="none"
              >
                <g clip-path="url(#clip0_707_764)">
                  <path
                    d="M12.4444 3.55554H5.33332C4.86182 3.55554 4.40964 3.74284 4.07624 4.07624C3.74284 4.40964 3.55554 4.86182 3.55554 5.33332V12.4444C3.55554 12.9159 3.74284 13.3681 4.07624 13.7015C4.40964 14.0349 4.86182 14.2222 5.33332 14.2222H12.4444C12.9159 14.2222 13.3681 14.0349 13.7015 13.7015C14.0349 13.3681 14.2222 12.9159 14.2222 12.4444V5.33332C14.2222 4.86182 14.0349 4.40964 13.7015 4.07624C13.3681 3.74284 12.9159 3.55554 12.4444 3.55554ZM5.33332 12.4444V5.33332H12.4444V12.4444H5.33332Z"
                    fill="black"
                  />
                  <path
                    d="M26.6667 3.55554H19.5555C19.0841 3.55554 18.6319 3.74284 18.2985 4.07624C17.9651 4.40964 17.7778 4.86182 17.7778 5.33332V12.4444C17.7778 12.9159 17.9651 13.3681 18.2985 13.7015C18.6319 14.0349 19.0841 14.2222 19.5555 14.2222H26.6667C27.1382 14.2222 27.5903 14.0349 27.9237 13.7015C28.2571 13.3681 28.4444 12.9159 28.4444 12.4444V5.33332C28.4444 4.86182 28.2571 4.40964 27.9237 4.07624C27.5903 3.74284 27.1382 3.55554 26.6667 3.55554ZM19.5555 12.4444V5.33332H26.6667V12.4444H19.5555Z"
                    fill="black"
                  />
                  <path
                    d="M12.4444 17.7778H5.33332C4.86182 17.7778 4.40964 17.9651 4.07624 18.2985C3.74284 18.6319 3.55554 19.0841 3.55554 19.5555V26.6667C3.55554 27.1382 3.74284 27.5903 4.07624 27.9237C4.40964 28.2571 4.86182 28.4444 5.33332 28.4444H12.4444C12.9159 28.4444 13.3681 28.2571 13.7015 27.9237C14.0349 27.5903 14.2222 27.1382 14.2222 26.6667V19.5555C14.2222 19.0841 14.0349 18.6319 13.7015 18.2985C13.3681 17.9651 12.9159 17.7778 12.4444 17.7778ZM5.33332 26.6667V19.5555H12.4444V26.6667H5.33332Z"
                    fill="black"
                  />
                  <path
                    d="M26.6667 17.7778H19.5555C19.0841 17.7778 18.6319 17.9651 18.2985 18.2985C17.9651 18.6319 17.7778 19.0841 17.7778 19.5555V26.6667C17.7778 27.1382 17.9651 27.5903 18.2985 27.9237C18.6319 28.2571 19.0841 28.4444 19.5555 28.4444H26.6667C27.1382 28.4444 27.5903 28.2571 27.9237 27.9237C28.2571 27.5903 28.4444 27.1382 28.4444 26.6667V19.5555C28.4444 19.0841 28.2571 18.6319 27.9237 18.2985C27.5903 17.9651 27.1382 17.7778 26.6667 17.7778ZM19.5555 26.6667V19.5555H26.6667V26.6667H19.5555Z"
                    fill="black"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_707_764">
                    <rect width="32" height="32" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </p>
          </div>
        </div>
        <div className="flex mb-2">
          <div>
            <div className="flex justify-start p-4 h-full      ">
              <div
                className="p-4 "
                style={{ width: "263px ", background: "#D6FFD8" }}
              >
                <h1 className="text-2xl font-bold mb-4">Filters</h1>

                {/* Filter Options */}
                <div className="mb-4">
                  <label htmlFor="location">Location</label>
                  <select
                    id="location"
                    className="block w-full mt-4 p-2 border rounded"
                  >
                    <option value="option1">Option 1</option>
                    <option value="option2">Option 2</option>
                    <option value="option3">Option 3</option>
                  </select>
                </div>

                <div className="mb-4">
                  <label htmlFor="verificationStatus">
                    Verification Status
                  </label>
                  <select
                    id="verificationStatus"
                    className="block w-full p-2 mt-4 border rounded"
                  >
                    <option value="verified">Verified</option>
                    <option value="notVerified">Not Verified</option>
                  </select>
                </div>

                <div className="mb-4">
                  <label htmlFor="daysAvailable">Days Available</label>
                  <select
                    id="daysAvailable"
                    className="block w-full p-2 mt-4 border rounded"
                  >
                    <option value="monday">Monday</option>
                    <option value="tuesday">Tuesday</option>
                    <option value="wednesday">Wednesday</option>
                    {/* Add more options as needed */}
                  </select>
                </div>

                <div className="mb-4">
                  <label htmlFor="datePosted">Date Posted</label>
                  <select
                    id="datePosted"
                    className="block w-full p-2 mt-4 border rounded"
                  >
                    <option value="last24h">Last 24 hours</option>
                    <option value="last7days">Last 7 days</option>
                    <option value="last30days">Last 30 days</option>
                    {/* Add more options as needed */}
                  </select>
                </div>

                {/* Price Range */}
                <div>
                  <label htmlFor="priceRange">Price Range</label>
                  <input
                    type="range"
                    id="priceRange"
                    name="priceRange"
                    min="0"
                    max="150"
                    className="block w-full"
                  />
                  <p className="text-sm text-gray-600">Min: $0 - Max: $150</p>
                </div>
                <button class="w-56 h-11 mt-6  rounded-xl bg-[#4CAF50] text-white font-bold mr-5">
                  Apply Filters{" "}
                </button>
                <button class="w-56 h-11 mt-6  rounded-xl bg-[#4CAF50] text-white font-bold mr-5">
                  Remove Filters{" "}
                </button>
              </div>
            </div>
          </div>
          <div className="bg-[#D6FFD8] py-3 px-6 w-full mt-4">
            <div className="">
              <ExploreCard />
            </div>
            <div className="">
              <ExploreCard />
            </div>
            <div className="">
              <ExploreCard />
            </div>
            <div className="">
              <ExploreCard />
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center space-x-5 p-5">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="14"
          height="21"
          viewBox="0 0 14 21"
          fill="none"
        >
          <path
            d="M11.1227 0.406384L0.598672 9.1567C0.41021 9.32633 0.259542 9.53354 0.156415 9.76494C0.0532878 9.99634 0 10.2468 0 10.5C0 10.7532 0.0532878 11.0037 0.156415 11.2351C0.259542 11.4665 0.41021 11.6737 0.598672 11.8433L11.1227 20.5936C11.2995 20.7408 11.5037 20.8519 11.7235 20.9204C11.9433 20.9889 12.1745 21.0136 12.4038 20.9929C12.6332 20.9723 12.8562 20.9068 13.0602 20.8002C13.2642 20.6935 13.4451 20.5479 13.5927 20.3714C13.7403 20.195 13.8516 19.9914 13.9202 19.772C13.9889 19.5527 14.0136 19.3221 13.9929 19.0932C13.9722 18.8644 13.9066 18.6418 13.7997 18.4383C13.6928 18.2348 13.5468 18.0542 13.37 17.907L4.46294 10.5L13.37 3.09298C13.5468 2.94576 13.6928 2.76522 13.7997 2.5617C13.9066 2.35817 13.9722 2.13563 13.9929 1.90679C14.0136 1.67794 13.9889 1.44728 13.9202 1.22796C13.8516 1.00864 13.7403 0.80496 13.5927 0.628555C13.4451 0.45215 13.2642 0.306471 13.0602 0.199837C12.8562 0.0932007 12.6332 0.0277004 12.4038 0.00707054C12.1745 -0.0135612 11.9433 0.0110836 11.7235 0.0795975C11.5037 0.148111 11.2995 0.259155 11.1227 0.406384Z"
            fill="black"
          />
        </svg>

        <div className="flex items-center space-x-2">
          {[1, 2, 3].map((pageNumber) => (
            <p
              key={pageNumber}
              onClick={() => handlePageClick(pageNumber)}
              className={`pagination-number ${
                selectedPage === pageNumber
                  ? "bg-primary font-bold cursor-pointer text-white w-11 h-11 rounded-full flex justify-center items-center"
                  : "cursor-pointer bg-transparent font-bold w-8 h-8 rounded-full flex justify-center items-center"
              }`}
            >
              {pageNumber}
            </p>
          ))}
        </div>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="14"
          height="21"
          viewBox="0 0 14 21"
          fill="none"
        >
          <path
            d="M2.87729 20.5936L13.4013 11.8433C13.5898 11.6737 13.7405 11.4665 13.8436 11.2351C13.9467 11.0037 14 10.7532 14 10.5C14 10.2468 13.9467 9.99634 13.8436 9.76494C13.7405 9.53354 13.5898 9.32633 13.4013 9.1567L2.87729 0.406381C2.70048 0.259153 2.49635 0.148111 2.27653 0.0795965C2.05672 0.0110821 1.82553 -0.0135635 1.59617 0.00706717C1.36681 0.0276978 1.14377 0.0932006 0.939787 0.199835C0.735799 0.30647 0.55486 0.452149 0.407299 0.628554C0.259738 0.804959 0.148446 1.00864 0.0797768 1.22795C0.0111084 1.44727 -0.0135937 1.67794 0.00708294 1.90678C0.0277605 2.13563 0.0934114 2.35817 0.200286 2.56169C0.307161 2.76522 0.45317 2.94576 0.629972 3.09298L9.53706 10.5L0.629972 17.907C0.45317 18.0542 0.307161 18.2348 0.200286 18.4383C0.0934114 18.6418 0.0277605 18.8644 0.00708294 19.0932C-0.0135937 19.3221 0.0111084 19.5527 0.0797768 19.772C0.148446 19.9914 0.259738 20.195 0.407299 20.3714C0.55486 20.5478 0.735799 20.6935 0.939787 20.8002C1.14377 20.9068 1.36681 20.9723 1.59617 20.9929C1.82553 21.0136 2.05672 20.9889 2.27653 20.9204C2.49635 20.8519 2.70048 20.7408 2.87729 20.5936Z"
            fill="black"
          />
        </svg>
      </div>
      <Footer />
    </div>
  );
};

export default Index;
