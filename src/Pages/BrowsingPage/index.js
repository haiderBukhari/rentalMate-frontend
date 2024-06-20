import React, { useEffect, useState } from "react";
import Navbar from "../../Components/Navbar/index";
import Footer from "../../Components/Footer/Index";

import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import Slider, { Range } from "rc-slider";
import "rc-slider/assets/index.css";

import BrowsingPic from "../../Assets/BrowsingPic.svg";
import { ListView } from "../../Components/BrowsingPagination/ListView";
import { GridView } from "../../Components/BrowsingPagination/GridView";
import axios from "axios";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import { useSelector } from "react-redux";
const BrowsingPage = () => {
  // if (navigator.geolocation) {
  //   navigator.geolocation.getCurrentPosition((position) => {
  //     console.log(position.coords.latitude, position.coords.longitude);
  //   });
  // }
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/products/filter/${userId}`, {
        headers: { Authorization: `${token}` },
      })
      .then((res) => {
        setProdData(res.data);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);

  const daysOption = [
    { label: "7 Days", value: 7 },
    { label: "30 Days", value: 30 },
    { label: "60 Days", value: 60 },
  ];
  const verificationOptions = [
    { value: false, label: "Not Verified" },
    { value: true, label: "Verified" },
  ];
  const [country, setCountry] = useState();
  const [state, setState] = useState();
  const [city, setCity] = useState();
  const [status, setStatus] = useState("");
  const [startDate, setStartDate] = useState(false);
  const [days, setDays] = useState("");
  const [enableListView, setenableListView] = useState(false);
  const [rangeMin, setRangeMin] = useState(0);
  const [rangeMax, setRangeMax] = useState(10000);
  const [prodData, setProdData] = useState([]);
  const [loading, setLoading] = useState(true);

  const options = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  };
  const token = useSelector((state) => state.userID);
  const category = useSelector((state) => state.category);
  const userId = useSelector((state) => state.id);

  const clearFilter = async () => {
    setLoading(true);
    setStatus("");
    setStartDate(false);
    setDays("");
    setRangeMin(0);
    setRangeMax(10000);
    setState("");
    setCountry("");
    setCity("");

    const params = {
      category: category,
    };

    await axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/products/filter/${userId}`, {
        params: params,
        headers: { Authorization: `${token}` },
      })
      .then((res) => {
        setProdData(res.data);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }
  const handleFilters = async () => {
    setLoading(true);
    const formattedDate = new Intl.DateTimeFormat("en-US", options).format(
      startDate
    );
    const month = formattedDate.split("/")[0];
    const day = formattedDate.split("/")[1];
    const year = formattedDate.split("/")[2];
    const date = `${year}-${month}-${day}`;
    const range = [rangeMin, rangeMax];

    const params = {
      country: country,
      state: state,
      city: city,
      priceRange: JSON.stringify(range),
      datePosted: date,
      verficationStatus: status,
      availableDays: days,
      category: category,
    };
    await axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/products/filter/${userId}`, {
        params: params,
        headers: { Authorization: `${token}` },
      })
      .then((res) => {
        setProdData(res.data);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  };
  // if (navigator.geolocation) {
  //   navigator.geolocation.getCurrentPosition((position) => {
  //     console.log(position.coords.latitude, position.coords.longitude);
  //   });
  // }

  useEffect(
    () => {
      setLoading(true);
      axios
        .get(`${process.env.REACT_APP_BACKEND_URL}/products/filter/${userId}`, {
          params: { category: category },
          headers: { Authorization: `${token}` },
        })
        .then((res) => {
          setProdData(res.data);
          setLoading(false);
          console.log(res);
        })
        .catch((err) => console.log(err));
    },
    [category],
    []
  );

  return (
    <div>
      <Navbar />
      <div className="relative flex justify-center mt-5 mb-20">
        <img src={BrowsingPic} />
        <div className="absolute top-[180px] left-[140px]">
          <div className="absolute w-[116px] h-[24px] top-0  xl:left-[30px] lg:-left-[30px] font-semibold text-black text-[20px] text-center tracking-[0] leading-[normal] whitespace-nowrap hidden lg:block">
            Browse
          </div>
          <p className="relative w-[235px] h-[82px] top-[30px] lg:-left-[90px] xl:-left-[19px] font-normal text-black text-[14px] text-center tracking-[1px] leading-5 hidden lg:block">
            Search for the item or service you want to borrow, and select a
            listing that suits your needs.
          </p>
        </div>
        <div className="absolute top-[210px] right-[120px]">
          <div className="absolute top-[-40px] lg:left-[13rem] xl:left-[2.6rem]  font-semibold text-black text-[20px] text-center tracking-[0] leading-[normal] whitespace-nowrap hidden lg:block">
            Borrow
          </div>
          <p className="relative w-[234px] h-[82px] top-[10px] lg:left-[7rem] xl:left-0  font-normal text-black text-[14px] text-center tracking-[1px] leading-5 hidden lg:block">
            Reserve or book the item, specify your rental dates.
          </p>
        </div>
        <div className="absolute top-[375px] left-[160px]">
          <div className="absolute w-[80px] h-[24px] top-0 left-[59px]  font-semibold text-black text-[20px] text-center tracking-[0] leading-[normal] whitespace-nowrap hidden lg:block">
            Chat
          </div>
          <p className="relative w-[200px] h-[82px] top-[30px] font-normal text-black text-[14px] text-center tracking-[1px] leading-5 hidden lg:block">
            Communicate with the owner to coordinate logistics, such as pick-up
            or delivery.
          </p>
        </div>
        <div className="absolute top-[430px] right-[110px]">
          <div className="absolute w-[116px] h-[24px] top-0 left-[59px]  font-semibold text-black text-[20px] text-center tracking-[0] leading-[normal] whitespace-nowrap hidden lg:block">
            Return
          </div>
          <p className="relative w-[234px] h-[82px] top-[30px]   font-normal text-black text-[14px] text-center tracking-[1px] leading-5 hidden lg:block">
            Return the item in the same condition at the end of the rental
            period.
          </p>
        </div>
      </div>

      <div className="flex items-center justify-between px-5">
        <div className="font-bold text-[22px]">
          Browse items to rent near you
        </div>
        <div className="flex items-center gap-2">
          <div className="font-bold text-[12px]">View</div>
          <button onClick={() => setenableListView((prev) => !prev)}>
            {enableListView ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                viewBox="0 0 32 32"
                fill="none"
              >
                <rect width="32" height="32" fill="#D6FFD8" />
                <path
                  d="M10.6663 10.667H26.6663M14.6663 16.0003H26.6663M18.6663 21.3337H26.6663M5.33301 10.667H5.34634M9.33301 16.0003H9.34634M13.333 21.3337H13.3463"
                  stroke="black"
                  stroke-width="3"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                viewBox="0 0 32 32"
                fill="none"
              >
                <path
                  d="M10.6668 10.667H26.6668M14.6668 16.0003H26.6668M18.6668 21.3337H26.6668M5.3335 10.667H5.34683M9.3335 16.0003H9.34683M13.3335 21.3337H13.3468"
                  stroke="black"
                  stroke-width="3"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            )}
          </button>
          <button onClick={() => setenableListView((prev) => !prev)}>
            {enableListView ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                viewBox="0 0 32 32"
                fill="none"
              >
                <g clip-path="url(#clip0_1396_5211)">
                  <path
                    d="M12.4446 3.55566H5.33344C4.86195 3.55566 4.40976 3.74297 4.07636 4.07636C3.74297 4.40976 3.55566 4.86195 3.55566 5.33344V12.4446C3.55566 12.916 3.74297 13.3682 4.07636 13.7016C4.40976 14.035 4.86195 14.2223 5.33344 14.2223H12.4446C12.916 14.2223 13.3682 14.035 13.7016 13.7016C14.035 13.3682 14.2223 12.916 14.2223 12.4446V5.33344C14.2223 4.86195 14.035 4.40976 13.7016 4.07636C13.3682 3.74297 12.916 3.55566 12.4446 3.55566ZM5.33344 12.4446V5.33344H12.4446V12.4446H5.33344Z"
                    fill="black"
                  />
                  <path
                    d="M26.6662 3.55566H19.5551C19.0836 3.55566 18.6314 3.74297 18.298 4.07636C17.9646 4.40976 17.7773 4.86195 17.7773 5.33344V12.4446C17.7773 12.916 17.9646 13.3682 18.298 13.7016C18.6314 14.035 19.0836 14.2223 19.5551 14.2223H26.6662C27.1377 14.2223 27.5899 14.035 27.9233 13.7016C28.2567 13.3682 28.444 12.916 28.444 12.4446V5.33344C28.444 4.86195 28.2567 4.40976 27.9233 4.07636C27.5899 3.74297 27.1377 3.55566 26.6662 3.55566ZM19.5551 12.4446V5.33344H26.6662V12.4446H19.5551Z"
                    fill="black"
                  />
                  <path
                    d="M12.4446 17.7773H5.33344C4.86195 17.7773 4.40976 17.9646 4.07636 18.298C3.74297 18.6314 3.55566 19.0836 3.55566 19.5551V26.6662C3.55566 27.1377 3.74297 27.5899 4.07636 27.9233C4.40976 28.2567 4.86195 28.444 5.33344 28.444H12.4446C12.916 28.444 13.3682 28.2567 13.7016 27.9233C14.035 27.5899 14.2223 27.1377 14.2223 26.6662V19.5551C14.2223 19.0836 14.035 18.6314 13.7016 18.298C13.3682 17.9646 12.916 17.7773 12.4446 17.7773ZM5.33344 26.6662V19.5551H12.4446V26.6662H5.33344Z"
                    fill="black"
                  />
                  <path
                    d="M26.6662 17.7773H19.5551C19.0836 17.7773 18.6314 17.9646 18.298 18.298C17.9646 18.6314 17.7773 19.0836 17.7773 19.5551V26.6662C17.7773 27.1377 17.9646 27.5899 18.298 27.9233C18.6314 28.2567 19.0836 28.444 19.5551 28.444H26.6662C27.1377 28.444 27.5899 28.2567 27.9233 27.9233C28.2567 27.5899 28.444 27.1377 28.444 26.6662V19.5551C28.444 19.0836 28.2567 18.6314 27.9233 18.298C27.5899 17.9646 27.1377 17.7773 26.6662 17.7773ZM19.5551 26.6662V19.5551H26.6662V26.6662H19.5551Z"
                    fill="black"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_1396_5211">
                    <rect width="32" height="32" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                viewBox="0 0 32 32"
                fill="none"
              >
                <g clip-path="url(#clip0_1396_5545)">
                  <rect width="32" height="32" fill="#D6FFD8" />
                  <path
                    d="M12.4446 3.55566H5.33344C4.86195 3.55566 4.40976 3.74297 4.07636 4.07636C3.74297 4.40976 3.55566 4.86195 3.55566 5.33344V12.4446C3.55566 12.916 3.74297 13.3682 4.07636 13.7016C4.40976 14.035 4.86195 14.2223 5.33344 14.2223H12.4446C12.916 14.2223 13.3682 14.035 13.7016 13.7016C14.035 13.3682 14.2223 12.916 14.2223 12.4446V5.33344C14.2223 4.86195 14.035 4.40976 13.7016 4.07636C13.3682 3.74297 12.916 3.55566 12.4446 3.55566ZM5.33344 12.4446V5.33344H12.4446V12.4446H5.33344Z"
                    fill="black"
                  />
                  <path
                    d="M26.6667 3.55566H19.5556C19.0841 3.55566 18.6319 3.74297 18.2985 4.07636C17.9651 4.40976 17.7778 4.86195 17.7778 5.33344V12.4446C17.7778 12.916 17.9651 13.3682 18.2985 13.7016C18.6319 14.035 19.0841 14.2223 19.5556 14.2223H26.6667C27.1382 14.2223 27.5904 14.035 27.9238 13.7016C28.2572 13.3682 28.4445 12.916 28.4445 12.4446V5.33344C28.4445 4.86195 28.2572 4.40976 27.9238 4.07636C27.5904 3.74297 27.1382 3.55566 26.6667 3.55566ZM19.5556 12.4446V5.33344H26.6667V12.4446H19.5556Z"
                    fill="black"
                  />
                  <path
                    d="M12.4446 17.7773H5.33344C4.86195 17.7773 4.40976 17.9646 4.07636 18.298C3.74297 18.6314 3.55566 19.0836 3.55566 19.5551V26.6662C3.55566 27.1377 3.74297 27.5899 4.07636 27.9233C4.40976 28.2567 4.86195 28.444 5.33344 28.444H12.4446C12.916 28.444 13.3682 28.2567 13.7016 27.9233C14.035 27.5899 14.2223 27.1377 14.2223 26.6662V19.5551C14.2223 19.0836 14.035 18.6314 13.7016 18.298C13.3682 17.9646 12.916 17.7773 12.4446 17.7773ZM5.33344 26.6662V19.5551H12.4446V26.6662H5.33344Z"
                    fill="black"
                  />
                  <path
                    d="M26.6667 17.7773H19.5556C19.0841 17.7773 18.6319 17.9646 18.2985 18.298C17.9651 18.6314 17.7778 19.0836 17.7778 19.5551V26.6662C17.7778 27.1377 17.9651 27.5899 18.2985 27.9233C18.6319 28.2567 19.0841 28.444 19.5556 28.444H26.6667C27.1382 28.444 27.5904 28.2567 27.9238 27.9233C28.2572 27.5899 28.4445 27.1377 28.4445 26.6662V19.5551C28.4445 19.0836 28.2572 18.6314 27.9238 18.298C27.5904 17.9646 27.1382 17.7773 26.6667 17.7773ZM19.5556 26.6662V19.5551H26.6667V26.6662H19.5556Z"
                    fill="black"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_1396_5545">
                    <rect width="32" height="32" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            )}
          </button>
        </div>
      </div>
      <div className="px-5 mt-4 mb-5">
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 md:col-span-3 bg-[#D6FFD8] flex flex-col py-5 px-5 gap-5 ">
            <div className="font-semibold text-[22px] mb-2">Filters</div>
            <div className="">Location</div>

            <div className="">Country</div>
            <input type='text' className="px-2 border-[1px] text-[15px] border-black h-[37px]" placeholder="Select location" value={country} onChange={(e) => { setCountry(e.target.value) }} />
            <div className="">State</div>
            <input type='text' className="px-2 border-[1px] text-[15px] border-black h-[37px]" placeholder="Select location" value={state} onChange={(e) => { setState(e.target.value) }} />
            <div className="">City</div>
            <input type='text' className="px-2 border-[1px] text-[15px] border-black h-[37px]" placeholder="Select location" value={city} onChange={(e) => { setCity(e.target.value) }} />

            <div className="">Verification Status</div>

            <Dropdown
              options={verificationOptions}
              onChange={(item) => {
                setStatus(item.value);
              }}
              // value={status}
              placeholder="Select status"
              className="border-[1px] border-black"
              menuClassName="text-[15px]"
              controlClassName="h-[37px]"
              placeholderClassName="text-[15px]"
            />
            <div className="">Days available</div>

            <Dropdown
              options={daysOption}
              onChange={(item) => {
                console.log(item);
                setDays(item.value);
              }}
              // value={days}
              placeholder="Select days"
              className="border-[1px] border-black"
              menuClassName="text-[15px]"
              controlClassName="h-[37px]"
              placeholderClassName="text-[15px]"
            />

            <div className="">Date posted</div>

            <DatePicker
              selected={startDate}
              onChange={(date) => {
                setStartDate(date);
              }}
              className="border-[1px] border-black h-[37px] text-[15px] w-full px-2 "
              calendarClassName="absolute"
              dateFormat={"MMMM d, yyyy"}
            />
            <div>
              <Slider
                range
                defaultValue={[rangeMin, rangeMax]}
                min={0}
                max={10000}
                handleStyle={[
                  {
                    backgroundColor: "black",
                    border: "none",
                    width: 12,
                    height: 12,
                    zIndex: 0,
                  },
                  {
                    backgroundColor: "black",
                    border: "none",
                    width: 12,
                    height: 12,
                    zIndex: 0,
                  },
                ]}
                trackStyle={{ backgroundColor: "none", height: 0 }}
                railStyle={{ backgroundColor: "black", height: 1 }}
                onChange={(val) => {
                  setRangeMin(val[0]);
                  setRangeMax(val[1]);
                }}
              ></Slider>

              <div className="flex items-center justify-between text-[14px]">
                <div>{rangeMin}</div>
                <div>{rangeMax}</div>
              </div>
            </div>
            <button
              onClick={handleFilters}
              className="bg-[#01A664] mb-10 py-3 rounded-2xl text-white font-semibold text-[14px] tracking-[1px]"
            >
              Apply filters
            </button>
            <button
              onClick={clearFilter}
              className="bg-[#01A664] py-3 rounded-2xl text-white font-semibold text-[14px] tracking-[1px]"
            >
              Clear filters
            </button>
          </div>
          <div className="col-span-12 md:col-span-9 grid grid-cols-1 md:grid-cols-3 gap-6 pb-20">
            {enableListView ? (
              <ListView itemsPerPage={5} items={prodData} loading={loading} />
            ) : (
              <GridView
                parentClassName="flex flex-wrap justify-center items-center"
                boxWidth="w-[250px]"
                imageHeight="h-[150px]"
                itemsPerPage={9}
                items={prodData}
                loading={loading}
              />
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default BrowsingPage;
