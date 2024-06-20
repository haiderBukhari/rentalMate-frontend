import React, { useState } from "react";
import CardImage from "../../Assets/cardImg.png";

const Index = ({setName}) => {
  const [rating, setRating] = useState(0);
  const today = new Date();
  const tomorrowTimestamp = new Date().setDate(today.getDate() + 1);
  const tomorrow = new Date(tomorrowTimestamp);
  
  const handleStarClick = (index) => {
    setRating(index + 1);
  };
  return (
    <div>
      <div className="border border-grayHead p-8">
        <div className="flex gap-x-4 mb-6">
          <h2 className="text-lg font-semibold">Dates</h2>
          <h2 className="text-lg font-medium">{today.toDateString()} - {tomorrow.toDateString()}</h2>
        </div>
        <h2 className="text-lg font-medium mb-6">Pickup Person</h2>
        <div className="grid grid-cols-12">
          <div className="md:col-span-6 col-span-12">
            <div className="bg-[#D9D9D9] rounded-full flex gap-x-2 px-4 py-3">
              <svg width="27" height="25" viewBox="0 0 27 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M21.868 22.5H19.6812V20.5C19.6812 18.8431 18.2127 17.5 16.401 17.5H9.84057C8.02896 17.5 6.56035 18.8431 6.56035 20.5V22.5H4.37354V20.5C4.37354 17.7386 6.82121 15.5 9.84057 15.5H16.401C19.4203 15.5 21.868 17.7386 21.868 20.5V22.5ZM13.1208 13.5C9.49755 13.5 6.56035 10.8137 6.56035 7.5C6.56035 4.18629 9.49755 1.5 13.1208 1.5C16.744 1.5 19.6812 4.18629 19.6812 7.5C19.6812 10.8137 16.744 13.5 13.1208 13.5ZM13.1208 11.5C15.5362 11.5 17.4944 9.70914 17.4944 7.5C17.4944 5.29086 15.5362 3.5 13.1208 3.5C10.7053 3.5 8.74716 5.29086 8.74716 7.5C8.74716 9.70914 10.7053 11.5 13.1208 11.5Z" fill="#7D8E95" />
              </svg>
              <input onChange={(e)=>{setName(e.target.value)}} placeholder="Full Name" name="" className="bg-transparent text-lg w-full outline-none" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
