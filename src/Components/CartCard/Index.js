import React, { useState } from "react";
import CardImage from "../../Assets/cardImg.png";

const Index = () => {
  const [rating, setRating] = useState(0);

  const handleStarClick = (index) => {
    setRating(index + 1);
  };
  return (
    <div
      className="bg-white rounded-2xl p-4 mb-6"
      style={{ boxShadow: "0px 4px 13px -2px rgba(0, 0, 0, 0.60)" }}
    >
      <div className="relative flex md:flex-row flex-col gap-x-6 bg-white">
        <img
          className="w-28 h-28 object-cover object-center rounded-xl"
          src={CardImage}
          alt="Card "
        />
        <div className="md:w-[80%] flex flex-col justify-center">
          <div className="flex gap-x-4">
            <h2 className="text-base mb-2 font-semibold">Date</h2>
            <h2 className="text-base mb-2 font-medium">30-Dec-2023</h2>
            <a href="#" className="text-base mb-2 font-medium text-primary">change</a>
          </div>
          <p className="text-xl font-semibold tracking-wider">SONY high resolution camera-92</p>
          <p className="text-primary font-semibold text-xl mt-2">Price</p>

        </div>
        <div className="md:w-[20%] md:mt-0 mt-4">
          <div className="w-full h-full flex items-center gap-x-4 justify-center">
            <div>
              <svg className="cursor-pointer " width="26" height="23" viewBox="0 0 26 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path className="hover:fill-red-500" fill-rule="evenodd" clip-rule="evenodd" d="M13.3209 3.6288C11.0331 0.962593 7.21013 0.138618 4.34364 2.58007C1.47714 5.02151 1.07358 9.10346 3.32466 11.991C5.19628 14.3917 10.8604 19.4552 12.7169 21.0941C12.9245 21.2774 13.0284 21.3691 13.1495 21.405C13.2552 21.4364 13.3709 21.4364 13.4767 21.405C13.5978 21.3691 13.7016 21.2774 13.9093 21.0941C15.7657 19.4552 21.4298 14.3917 23.3015 11.991C25.5526 9.10346 25.1982 4.99583 22.2824 2.58007C19.3667 0.164301 15.6087 0.962593 13.3209 3.6288Z" stroke="black" stroke-width="1.90714" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </div>
            <div>
              <svg className="cursor-pointer" width="31" height="30" viewBox="0 0 31 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M22.9924 25.7464C21.9397 25.7464 21.0853 26.6008 21.0853 27.6536C21.0853 28.7063 21.9397 29.5607 22.9924 29.5607C24.0451 29.5607 24.8995 28.7063 24.8995 27.6536C24.8995 26.6008 24.0451 25.7464 22.9924 25.7464ZM13.4567 25.7464C12.4039 25.7464 11.5495 26.6008 11.5495 27.6536C11.5495 28.7063 12.4039 29.5607 13.4567 29.5607C14.5094 29.5607 15.3638 28.7063 15.3638 27.6536C15.3638 26.6008 14.5094 25.7464 13.4567 25.7464ZM25.8531 20.025C25.8531 21.0777 24.9987 21.9321 23.946 21.9321H13.4567C12.4039 21.9321 11.5495 21.0777 11.5495 20.025L9.95995 10.4893H28.237L25.8531 20.025ZM9.6138 8.58214L7.23464 0.953568H1.06026C0.532936 0.953568 0.106689 1.38077 0.106689 1.90714C0.106689 2.43446 0.532936 2.86071 1.06026 2.86071H5.82812L7.74574 8.58214H7.73526L9.6424 20.025C9.6424 22.1314 11.3503 23.8393 13.4567 23.8393H23.946C26.0524 23.8393 27.7603 22.1314 27.7603 20.025L30.621 8.58214H9.6138Z" fill="black" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
