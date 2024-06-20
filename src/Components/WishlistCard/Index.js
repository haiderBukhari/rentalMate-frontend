import React, { useState } from "react";
import CardImage from "../../Assets/cardImg.png";

const Index = () => {
  const [rating, setRating] = useState(0);

  const handleStarClick = (index) => {
    setRating(index + 1);
  };
  return (
    <div
      className="bg-white rounded-2xl"
      style={{ boxShadow: "0px 4px 13px -2px rgba(0, 0, 0, 0.60)" }}
    >
      <div className="relative  rounded overflow-hidden shadow-lg">
        <img
          className="w-full h-48 object-cover object-center rounded-xl"
          src={CardImage}
          alt="Card "
        />
        <div className="">
          <svg className="absolute top-3 right-3 w-8 h-8">
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
      <div className=" inset-0 flex items-center justify-center">
        <div className=" text-center">
          <div className="text-xl mb-2 font-semibold tracking-wider mt-6">
            Product Name
          </div>
          <div className="flex justify-between items-center mt-3">
            <p className="text-primary font-semibold text-xl">Price</p>
            <div className="flex items-center ml-12">
              <div>
                {[...Array(5)].map((_, index) => (
                  <span
                    key={index}
                    className={`cursor-pointer text-2xl ${index < rating ? "text-yellow-500" : "text-gray-300"
                      }`}
                    onClick={() => handleStarClick(index)}
                  >
                    &#9733;
                  </span>
                ))}
              </div>
              <p className="text-sm font-semibold pl-1">(2)</p>
            </div>
          </div>
          <div className="flex justify-between items-center mt-2">
            <p className="font-semibold text-xl pr-10">Zip Code</p>
            <p className="font-semibold text-xl">20001</p>
          </div>
        </div>
      </div>
      <div className="text-center flex-col">
        <button class="w-[70%] py-2 mt-8 mx-auto tracking-widest rounded-[18px] text-lg bg-primary buttonShadow text-white font-bold">
          Add To Cart{" "}
        </button>
        <button class="w-[70%] py-3 mt-6 mb-8 mx-auto tracking-widest rounded-[18px] text-lg bg-white buttonShadow font-bold">
          Delete{" "}
        </button>
      </div>
    </div>
  );
};

export default Index;
