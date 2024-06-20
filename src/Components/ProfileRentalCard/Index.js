import React, { useState } from "react";
import CardImage from "../../Assets/cardImg.png";

const Index = () => {
  return (
    <div
      className="h-[358px] bg-white rounded-2xl"
      style={{ boxShadow: "0px 4px 13px -2px rgba(0, 0, 0, 0.60)" }}
    >
      <div className="relative  rounded overflow-hidden shadow-lg">
        <img
          className="w-full h-48 object-cover object-center rounded-xl"
          src={CardImage}
          alt="Card "
        />
        <div className="">
          <svg className="absolute w-8 h-8 top-2 right-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              viewBox="0 0 32 32"
              fill="none"
            >
              <g clip-path="url(#clip0_716_190)">
                <path
                  d="M22.6667 2.66667C20.0667 2.66667 17.3334 4.73334 16.0001 7C14.6667 4.73334 11.9334 2.66667 9.33339 2.66667C8.27718 2.67283 7.23265 2.88807 6.26005 3.29999C5.28746 3.71192 4.40607 4.31236 3.66673 5.06667C2.92148 5.80931 2.33139 6.69276 1.93081 7.66561C1.53022 8.63845 1.32714 9.68126 1.33339 10.7333C1.33339 13.4667 3.13339 15.8 4.66673 17.5333L15.5334 29.1333C15.658 29.2555 15.8256 29.3239 16.0001 29.3239C16.1746 29.3239 16.3421 29.2555 16.4667 29.1333L27.3334 17.5333C28.8667 15.8 30.6667 13.4667 30.6667 10.7333C30.6668 8.60543 29.8261 6.56368 28.3277 5.05279C26.8293 3.54189 24.7946 2.68426 22.6667 2.66667Z"
                  fill="#B8B8B8"
                />
              </g>
              <defs>
                <clipPath id="clip0_716_190">
                  <rect width="32" height="32" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </svg>
        </div>
      </div>
      <div className="text-left p-4">
        <div className="font-semibold text-lg mb-2 text-black">
          SONY high resolution camera-92
        </div>
        <div className="font-semibold text-lg mb-2 text-black">
          Rent period
          <span className="pl-3 font-normal">Nov 30-Dec 01</span>
        </div>
        <div className="font-semibold text-lg mb-2 text-black">
          Order number
          <span className="pl-3 font-normal">564</span>
        </div>
        <div className="font-semibold text-lg mb-2 text-black">
          Rented for
          <span className="pl-3 font-normal">$6.7</span>
          <span className="pl-3 font-medium text-primary">Rented1</span>
        </div>
      </div>
    </div>
  );
};

export default Index;
