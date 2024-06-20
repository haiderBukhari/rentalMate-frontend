import React, { useEffect, useRef, useState } from "react";
import Usa from "../../Assets/Usa.png";
import German from "../../Assets/german.png";
import Spanish from "../../Assets/spanish.png";
import Bengali from "../../Assets/bangladesh.png";
import French from "../../Assets/french.png";
import profilepic from "../../Assets/image.png";
import { Link } from "react-router-dom";
import { changeCategory, logout, changeStatus, deleteWholeCart, deleteWholeWishlist, changeMenuOpen } from "../../redux/Main/mainSlice";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from 'react-router-dom'; // Import useLocation hook if you're using React Router
import axios from "axios"
import { LogOut, Menu } from 'lucide-react';

const Navbar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const dispatch = useDispatch();
  const Navigate = useNavigate();
  const [token, setToken] = useState(useSelector((state) => state.userID));
  const [isMenuOpen, setIsMenuOpen] = useState(useSelector((state) => state.isMenuOpen));
  const id = useSelector((state) => state.id);
  const status = useSelector((state) => state.status);
  const [profile, setProfile] = useState({});
  const [isChecked, setIsChecked] = useState(status === "customer" ? false : true); // Initial state
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const searchInputRef = useRef(null);
  const reduxIsMenuOpen = useSelector((state) => state.isMenuOpen);

  useEffect(() => {
    setIsMenuOpen(reduxIsMenuOpen.payload)
  }, [reduxIsMenuOpen]); // Dependency array

  const toggleMenu = () => {
    dispatch(changeMenuOpen(!isMenuOpen))
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    Navigate(`/search?search=${encodeURIComponent(searchTerm)}`);
  };

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };
  const handleCheckboxChange = () => {
    const initial = isChecked;
    console.log(token);
    setIsChecked(!isChecked);
    axios.patch(`${process.env.REACT_APP_BACKEND_URL}/customers/${id}/${initial ? "customer" : "vendor"}`, {}, {
      headers: { Authorization: `${token}` },
    })
      .then((res) => {
        dispatch(changeStatus(initial ? "customer" : "vendor"))
        dispatch(deleteWholeCart())
        dispatch(deleteWholeWishlist())
        if (initial) {
          Navigate('/user/dashboard')
        } else {
          Navigate('/vendor/dashboard')
        }
      })
      .catch((err) => console.log(err));
  };

  const languageOptions = [
    { value: "en", label: "English", flag: Usa },
    { value: "de", label: "German", flag: German },
    { value: "fr", label: "French", flag: French },
    { value: "es", label: "Spanish", flag: Spanish },
    { value: "bn", label: "Bengali", flag: Bengali },
  ];
  const categories = [
    "Electronics",
    "Home and Garden",
    "Party",
    "Film and Photography",
    "Sports and leisures",
    "Construction Tools",
    "Others"
  ];
  const profileCategories = [
    {
      item: "View Profile",
      link: "/profile",
    },
    {
      item: "Edit Profile",
      link: "/edit/profile",
    }
  ]
  useEffect(() => {
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/profile/${id}`, {
      headers: { Authorization: `${token}` },
    })
      .then((res) => {
        setProfile(res.data.data[0]);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    // Attach the resize event listener
    window.addEventListener('resize', handleResize);

    // Detach the resize event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []); // empty dependency array ensures this effect runs only once after initial render


  const handleCategory = (item) => {
    dispatch(changeCategory(item));
  };

  const [selectedLanguage, setSelectedLanguage] = useState(languageOptions[0]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isDropdownOpen1, setIsDropdownOpen1] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen)
  };

  const location = useLocation(); // Get the current location using the useLocation hookSearch rentmyitem for anything
  const [containsDashboard, setContainsDashboard] = useState(location.pathname.includes('dashboard') || location.pathname.includes('productdetail'));
  useEffect(() => {
    setContainsDashboard(location.pathname.includes('dashboard') || location.pathname.includes('productdetail'));
  }, [location])
  const handleLanguageChange = (selectedValue) => {
    const languageObject = languageOptions.find(
      (option) => option.value === selectedValue
    );
    setSelectedLanguage(languageObject);
    setIsDropdownOpen(false);
  };

  return (
    <div>
      <div className="bg-[#01A664]">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex ">
            <Link to={"/home"} className="text-white text-2xl font-medium flex items-center">
              Logo
            </Link>
            {
              screenWidth > 1100 ? (<form
                onSubmit={handleSubmit}
                className="max-w-[450px] min-w-[240px] ml-5 relative h-12 flex items-center bg-white p-2"
              >
                <input
                  className="w-full h-12 bg-transparent outline-none placeholder-black pl-12"
                  type="text"
                  value={searchTerm}
                  onChange={handleChange}
                  name="search"
                  placeholder="Search rentmyitem"
                />
                <i className="material-icons w-8 h-8 absolute left-4 top-7 transform -translate-y-2/4">
                  search
                </i>
              </form>) :
                <div className="ml-4 cursor-pointer text-white mt-2" onClick={toggleSearch}>
                  <i className="material-icons">search</i>
                </div>
            }
          </div>
          <div className="flex justify-around w-full">
            {
              screenWidth >= 800 && (<div className="flex items-center">
                <Link to={"/home"} className="text-white text-lg mr-2 ml-5">
                  Home
                </Link>
                <Link to={"/about"} className="text-white text-lg mr-2 ml-7">
                  About
                </Link>
                {
                  status === "admin" && (
                    <Link to={"/admin/dashboard"} className="text-white text-lg mr-2 ml-7">
                      Dasboard
                    </Link>
                  )
                }
                {
                  status === "vendor" && (
                    <Link to={"/vendor/dashboard"} className="text-white text-lg mr-2 ml-7">
                      Dasboard
                    </Link>
                  )
                }
                {
                  status === "customer" && (
                    <Link to={"/user/dashboard"} className="text-white text-lg mr-2 ml-7">
                      Dasboard
                    </Link>
                  )
                }
                <Link to={"/chat"} className="text-white text-lg mr-2 ml-7"> Chat
                </Link>
                {
                  !status ? (<Link to={"/Signup"} className="text-white text-lg mr-2 ml-7">
                    Signup
                  </Link>) : (<Link onClick={() => { dispatch(logout()) }} to={"/"} className="text-white text-lg mr-2 ml-7">
                    {screenWidth < 800 ? (<LogOut />) : 'Logout'}
                  </Link>)
                }
              </div>)
            }

            <div className="flex items-center justify-between gap-6">

              {!status ? (screenWidth < 800 && <Link to={"/Signup"} className="text-white text-lg mr-2 ml-7">
                Signup
              </Link>) : (screenWidth < 800 && <Link onClick={() => { dispatch(logout()) }} to={"/"} className="text-white text-lg mr-2 ml-7">
                {screenWidth < 800 ? (<LogOut />) : 'Logout'}
              </Link>)
              }
              <Link to="/cart" className="relative">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 32 32"
                  fill="none"
                >
                  <path
                    d="M13.5 29C13.1022 29 12.7206 28.842 12.4393 28.5607C12.158 28.2794 12 27.8978 12 27.5C12 27.1022 12.158 26.7206 12.4393 26.4393C12.7206 26.158 13.1022 26 13.5 26C13.8978 26 14.2794 26.158 14.5607 26.4393C14.842 26.7206 15 27.1022 15 27.5C15 27.8978 14.842 28.2794 14.5607 28.5607C14.2794 28.842 13.8978 29 13.5 29ZM23.5 29C23.1022 29 22.7206 28.842 22.4393 28.5607C22.158 28.2794 22 27.8978 22 27.5C22 27.1022 22.158 26.7206 22.4393 26.4393C22.7206 26.158 23.1022 26 23.5 26C23.8978 26 24.2794 26.158 24.5607 26.4393C24.842 26.7206 25 27.1022 25 27.5C25 27.8978 24.842 28.2794 24.5607 28.5607C24.2794 28.842 23.8978 29 23.5 29ZM3 4C2.73478 4 2.48043 3.89464 2.29289 3.70711C2.10536 3.51957 2 3.26522 2 3C2 2.73478 2.10536 2.48043 2.29289 2.29289C2.48043 2.10536 2.73478 2 3 2H8C8.23109 2.00014 8.455 2.08031 8.63366 2.22689C8.81232 2.37346 8.93471 2.57739 8.98 2.804L10.02 8H29C29.1492 7.99996 29.2965 8.03329 29.4311 8.09755C29.5657 8.16181 29.6843 8.25538 29.778 8.37139C29.8718 8.48741 29.9384 8.62293 29.973 8.76804C30.0076 8.91314 30.0093 9.06415 29.978 9.21L26.978 23.21C26.93 23.4337 26.8067 23.6341 26.6287 23.7779C26.4507 23.9217 26.2288 24.0001 26 24H12C11.7689 23.9999 11.545 23.9197 11.3663 23.7731C11.1877 23.6265 11.0653 23.4226 11.02 23.196L7.18 4H3ZM12.82 22H25.192L27.764 10H10.42L12.82 22Z"
                    fill="white"
                  />
                </svg>
                <div className="bg-red-600 absolute px-2 text-white" style={{ borderRadius: "50%", bottom: "-10px", right: "-10px" }}>{useSelector(state => state.cart).length}</div>
              </Link>
              <Link to="/wishlist" className="relative">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 32 32"
                  fill="none"
                  className="w-8 h-8 cursor-pointer group-hover:fill-current group-hover:text-green-500"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    viewBox="0 0 32 32"
                    fill="none"
                  >
                    <path
                      d="M4.52998 12.5C3.83998 8.64998 6.38998 5.31498 10.365 4.99998C13.865 4.72498 15.6 8.96498 15.95 9.77498C15.9539 9.78856 15.9621 9.80051 15.9733 9.80902C15.9846 9.81752 15.9984 9.82213 16.0125 9.82213C16.0266 9.82213 16.0404 9.81752 16.0516 9.80902C16.0629 9.80051 16.0711 9.78856 16.075 9.77498C17.7 5.31998 20.66 5.12998 21.7 5.02498C24.5 4.72498 28.255 6.88998 27.5 11.935C26.42 18.935 15.94 26.84 15.94 26.84C15.94 26.84 5.89498 20.025 4.52998 12.5Z"
                      stroke="white"
                      stroke-width="2"
                    />
                  </svg>
                </svg>
                <div className="bg-red-600 absolute text-white" style={{ borderRadius: "50%", bottom: "-9px", right: "-4px", paddingLeft: "10px", paddingRight: "10px" }}>{useSelector(state => state.wishlist).length}</div>
              </Link>

            </div>

            <div className="custom-select inline-block relative mr-3 ml-5">
              <div onClick={() => { setIsDropdownOpen1(!isDropdownOpen1) }} className="flex justify-center items-center">
                <img
                  className="w-7 h-7 rounded-full"
                  src={profile?.image || profilepic}
                  alt=""
                />
                <div
                  className={`select-header ml-2 flex items-center ${isDropdownOpen1 ? "open" : ""
                    }`}
                >
                </div>
                {
                  screenWidth > 900 && <span className="text-white">{profile?.name}</span>
                }
                <svg class="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 6" fill="white">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4" fill="white" />
                </svg>
              </div>
              {isDropdownOpen1 && (
                <ul style={{ zIndex: "20", width: "170px" }} className="select-options absolute mt-2 pb-10 left-[-100px] border bg-white rounded-lg shadow-md">
                  {profileCategories.map((option, index) => (
                    <li key={index} onClick={() => { Navigate(option.link) }} className="px-4 py-2 cursor-pointer hover:bg-gray-200"
                    > {option.item} </li>
                  ))}
                  {
                    status !== "admin" && <div className="flex items-center mt-2">
                      <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300 mr-2">Buyer</span>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          value=""
                          className="sr-only peer"
                          checked={isChecked}
                          onChange={handleCheckboxChange}
                        />
                        <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                        <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">Seller</span>
                      </label>
                    </div>
                  }
                </ul>
              )}
            </div>
            {
              screenWidth < 800 && <div className="relative">
                <Menu className="text-white cursor-pointer" onClick={toggleMenu} />
              </div>
            }
            {
              screenWidth > 900 && (<div className="custom-select inline-block relative">
                <div
                  className={`select-header flex items-center ${isDropdownOpen ? "open" : ""
                    }`}
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                >
                  <img
                    className="w-7 h-7 rounded-full"
                    src={selectedLanguage.flag}
                    alt={selectedLanguage.value}
                  />
                  <span className="text-white">{selectedLanguage.label}</span>
                </div>
                {isDropdownOpen && (
                  <ul className="select-options absolute mt-2 left-0 w-32 border bg-white rounded-lg shadow-md">
                    {languageOptions.map((option) => (
                      <li
                        key={option.value}
                        onClick={() => handleLanguageChange(option.value)}
                        className="px-4 py-2 cursor-pointer hover:bg-gray-200"
                      >
                        {option.label}
                      </li>
                    ))}
                  </ul>
                )}
              </div>)
            }
          </div>
        </div>
      </div>
      <div>
        {!containsDashboard && (
          <div className="mx-auto px-5 bg-white mt-3">
            {
              screenWidth < 1000 ? (<marquee className="flex flex-wrap justify-between">
                {categories.map((item, index) => (
                  <Link
                    className="p-2 text-black font-semibold"
                    onClick={() => handleCategory(item)}
                    key={index}
                    to={"/Categories"}
                  >
                    {item}
                  </Link>
                ))}
              </marquee>) : (<div className="flex flex-wrap justify-between">
                {categories.map((item, index) => (
                  <Link
                    className="p-2 text-black font-semibold"
                    onClick={() => handleCategory(item)}
                    key={index}
                    to={"/Categories"}
                  >
                    {item}
                  </Link>
                ))}
              </div>)
            }
          </div>
        )}
      </div>

      {isSearchOpen && (
        <form onSubmit={handleSubmit} className="container mx-auto px-4 py-2 flex items-center justify-center relative">
          <input
            className="w-full h-12 bg-white rounded-lg px-4 pl-12"
            type="text"
            value={searchTerm}
            onChange={handleChange}
            name="search"
            placeholder="Search rentmyitem for anything"
            ref={searchInputRef}
          />
          <i className="material-icons w-8 h-8 absolute left-7 top-9 transform -translate-y-2/4">
            search
          </i>
        </form>
      )}
    </div>
  );
};

export default Navbar;
