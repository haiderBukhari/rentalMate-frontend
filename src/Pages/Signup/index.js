import React, { useState } from "react";
import coffeeTable from "../../Assets/coffeeTable.svg";
import facebookIcon from "../../Assets/facebook.svg";
import { useForm, Controller } from "react-hook-form";
import googleIcon from "../../Assets/google.svg";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useGoogleLogin } from "@react-oauth/google";
import { LoginSocialFacebook } from "reactjs-social-login";
import { changeId, changeName, changeStatus, storeUserID } from "../../redux/Main/mainSlice";
import { useDispatch } from "react-redux";

const SignUp = () => {
  const [customerChecked, setCustomerChecked] = useState(false);
  const [vendorChecked, setVendorChecked] = useState(true);

  const handleCustomerChange = () => {
    setCustomerChecked(true);
    setVendorChecked(false);
  };

  const handleVendorChange = () => {
    setVendorChecked(true);
    setCustomerChecked(false);
  };

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({ mode: "all" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleFBresponse = async (response) => {
    console.log("aaaaaaaaaaaaaaaaaaaaa", response);
    await axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/auth/facebook-login`, {
        accessToken: response.data.accessToken,
      })
      .then((res) => {
        setMessage("");
        dispatch(storeUserID(res.data.token));

        navigate("/Browsing");
      })
      .catch((err) => {
        console.log(err.response.data.message);
        setMessage(err.response.data.message);
        console.log(err);
      });
  };
  const login = useGoogleLogin({
    onSuccess: async (codeResponse) => {
      console.log(codeResponse);
      await axios
        .post(`${process.env.REACT_APP_BACKEND_URL}/auth/google-login`, {
          accessToken: codeResponse.access_token,
        })
        .then((res) => {
          console.log(res.data.token);
          dispatch(storeUserID(res.data.token));
          dispatch(changeStatus(res.data.status))
          dispatch(changeId(res.data.id))
          dispatch(changeName(res.data.name))
          setMessage("");
          navigate("/Browsing");
        })
        .catch((err) => {
          console.log(err.response.data.message);
          setMessage(err.response.data.message);
          console.log(err);
        });
    },
    flow: "implicit",
    onError: (error) => console.log("Login Failed:", error),
  });
  const onSubmit = async (data) => {
    console.log(data);
    data.status = customerChecked ? "customer" : "vendor"
    try {
      await axios
        .post(`${process.env.REACT_APP_BACKEND_URL}/auth/register`, data)
        .then((res) => {
          console.log(res);
          navigate("/");
          setMessage("");
        })
        .catch((err) => {
          console.log(err.response.data.message);
          setMessage(err.response.data.message);
        });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="grid h-full grid-cols-1 sm:grid-cols-12">
      <div className="sm:col-span-4 relative sm:flex sm:flex-col sm:py-20 items-center h-full gap-4 bg-[#01A664] mb-3">
        <div className="text-white text-[30px] font-bold px-10 mt-4 mb-2">
          Need it? Rentmyitem delivers.{" "}
        </div>
        <div className=" px-10 text-white text-[20px]">
          No more buying, just renting with Rentmyitem{" "}
        </div>
        <img className="absolute bottom-0 left-40 z-10 hidden sm:block" src={coffeeTable} alt="" />
      </div>
      <div className="sm:col-span-8 bg-[#01A664] relative">
        <div className="h-full rounded-3xl sm:rounded-l-3xl flex justify-center items-center flex-col bg-white mt-3 sm:mt-0">
          <div className="space-y-10">
            <div className="space-y-4">
              <div className="font-bold text-[#01A664] mt-5 text-[30px]">
                Create an account
              </div>
              <div>
                Already have an Account ?{" "}
                <Link to="/" className="text-[#1976D2]">
                  Log in
                </Link>
              </div>
            </div>
            <div>
              <div className="space-y-8">
                <Controller
                  name="name"
                  defaultValue=""
                  control={control}
                  render={({ field }) => (
                    <div className="flex items-center bg-[#D9D9D9] sm:w-[400px] md:w-[400px] lg:w-[500px] rounded-3xl h-12 px-5 gap-3">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 25 25"
                        fill="none"
                      >
                        <path
                          d="M20.8332 22.9167H18.7498V20.8334C18.7498 19.1075 17.3508 17.7084 15.6248 17.7084H9.37484C7.64895 17.7084 6.24984 19.1075 6.24984 20.8334V22.9167H4.1665V20.8334C4.1665 17.957 6.49836 15.6251 9.37484 15.6251H15.6248C18.5013 15.6251 20.8332 17.957 20.8332 20.8334V22.9167ZM12.4998 13.5417C9.04806 13.5417 6.24984 10.7435 6.24984 7.29175C6.24984 3.83997 9.04806 1.04175 12.4998 1.04175C15.9516 1.04175 18.7498 3.83997 18.7498 7.29175C18.7498 10.7435 15.9516 13.5417 12.4998 13.5417ZM12.4998 11.4584C14.801 11.4584 16.6665 9.59294 16.6665 7.29175C16.6665 4.99056 14.801 3.12508 12.4998 3.12508C10.1986 3.12508 8.33317 4.99056 8.33317 7.29175C8.33317 9.59294 10.1986 11.4584 12.4998 11.4584Z"
                          fill="black"
                          fill-opacity="0.25"
                        />
                      </svg>
                      <input
                        className="bg-[#D9D9D9] w-[300px] focus:outline-none text-[14px]"
                        placeholder="Full Name"
                        onChange={(value) => {
                          field.onChange(value);
                        }}
                      />
                    </div>
                  )}
                  rules={{
                    required: "Name is required",
                  }}
                />
                {errors.name && (
                  <span className="text-[red] px-6 mb-[-20px] text-[13px]">
                    {errors.name.message}
                  </span>
                )}
                <Controller
                  name="password"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <div className="flex items-center bg-[#D9D9D9] sm:w-[400px] md:w-[400px] lg:w-[500px] rounded-3xl h-12 px-5 gap-3">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 26 25"
                        fill="none"
                      >
                        <path
                          d="M6.80273 10.4167V9.375C6.80273 5.92322 9.60095 3.125 13.0527 3.125C16.5045 3.125 19.3027 5.92322 19.3027 9.375V10.4167H21.3861C21.9614 10.4167 22.4277 10.883 22.4277 11.4583V23.9583C22.4277 24.5336 21.9614 25 21.3861 25H4.7194C4.14411 25 3.67773 24.5336 3.67773 23.9583V11.4583C3.67773 10.883 4.14411 10.4167 4.7194 10.4167H6.80273ZM20.3444 12.5H5.76107V22.9167H20.3444V12.5ZM12.0111 18.4712C11.3884 18.111 10.9694 17.4378 10.9694 16.6667C10.9694 15.516 11.9021 14.5833 13.0527 14.5833C14.2034 14.5833 15.1361 15.516 15.1361 16.6667C15.1361 17.4378 14.7171 18.111 14.0944 18.4712V20.8333H12.0111V18.4712ZM8.88607 10.4167H17.2194V9.375C17.2194 7.07381 15.3539 5.20833 13.0527 5.20833C10.7515 5.20833 8.88607 7.07381 8.88607 9.375V10.4167Z"
                          fill="black"
                          fill-opacity="0.25"
                        />
                      </svg>
                      <input
                        className="bg-[#D9D9D9] w-auto focus:outline-none text-[14px]"
                        placeholder="Password"
                        type="password"
                        onChange={(value) => {
                          field.onChange(value);
                        }}
                      />
                    </div>
                  )}
                  rules={{
                    required: "Password is required",
                    minLength: {
                      value: 8,
                      message: "Password too short (minimum length is 8)",
                    },
                    maxLength: {
                      value: 16,
                      message: "Password too long (maximum length is 16)",
                    },
                  }}
                />
                {errors.password && (
                  <span className="text-[red] px-6 mb-[-20px] text-[13px]">
                    {errors.password.message}
                  </span>
                )}
                <Controller
                  name="email"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <div className="flex items-center bg-[#D9D9D9] sm:w-[400px] md:w-[400px] lg:w-[500px] rounded-3xl h-12 px-5 gap-3">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 26 26"
                        fill="none"
                      >
                        <path
                          d="M4.54102 7.78936L10.9993 12.6331C12.1105 13.4664 13.6382 13.4664 14.7493 12.6331L21.2077 7.78931"
                          stroke="black"
                          stroke-opacity="0.25"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M20.1662 5.70581H5.58284C4.43225 5.70581 3.49951 6.63855 3.49951 7.78914V18.2058C3.49951 19.3564 4.43225 20.2891 5.58284 20.2891H20.1662C21.3168 20.2891 22.2495 19.3564 22.2495 18.2058V7.78914C22.2495 6.63855 21.3168 5.70581 20.1662 5.70581Z"
                          stroke="black"
                          stroke-opacity="0.25"
                          stroke-width="2"
                          stroke-linecap="round"
                        />
                      </svg>
                      <input
                        className="bg-[#D9D9D9] w-full focus:outline-none text-[14px]"
                        placeholder="Email Address or Phone Number"
                        onChange={(value) => {
                          field.onChange(value);
                        }}
                      />
                    </div>
                  )}
                  rules={{
                    required: "Email is required",
                    pattern: {
                      value: /^\w+([.-]?\w+)*@[\w-]+(\.[a-zA-Z]{2,3})+$/,
                      message: "*Enter a valid Email",
                    },
                  }}
                />
                {errors.email && (
                  <span className="text-[red] px-6 mb-[-20px] text-[13px]">
                    {errors.email.message}
                  </span>
                )}
              </div>
              {/* <div className="">
                <p className="ml-10 mt-5">Register as: </p>
                <div className="flex items-center justify-center">
                  <div>
                    <input
                      type="checkbox"
                      id="customerCheckbox"
                      name="customer"
                      checked={customerChecked}
                      onChange={handleCustomerChange}
                    />
                    <label className="cursor-pointer mr-6 ml-2" htmlFor="customerCheckbox">Customer: </label>
                  </div>
                  <div>
                    <input
                      type="checkbox"
                      id="vendorCheckbox"
                      name="vendor"
                      checked={vendorChecked}
                      onChange={handleVendorChange}
                    />
                    <label className="cursor-pointer ml-2" htmlFor="vendorCheckbox">Vendor: </label>
                  </div>
                </div>
              </div> */}
            </div>
            <div className="flex justify-center">
              <div className="flex justify-between items-center w-9/12">
                <button
                  onClick={handleSubmit(onSubmit)}
                  className="bg-[#01A664]  py-2 px-12 rounded-xl text-white font-semibold text-[13px] tracking-[1px]"
                >
                  SignUp
                </button>
                <div className="mx-2">Or</div>
                <div className="flex items-center gap-2">
                  {/* <LoginSocialFacebook
                    className="shadow-xl rounded-lg"
                    onResolve={(response) => handleFBresponse(response)}
                    onReject={(err) => console.log(err)}
                >*/}
                  <button
                    onClick={() => login()}
                    className="shadow-xl rounded-lg"
                  >
                    <img src={googleIcon} />
                  </button>
                </div>
              </div>
            </div>
            <div className="text-center text-[red] px-6 mb-[-20px] text-[15px]">
              {message}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
