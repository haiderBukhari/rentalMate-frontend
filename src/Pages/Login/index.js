import React, { useEffect, useState } from "react";
import coffeeTable from "../../Assets/coffeeTable.svg";
import facebookIcon from "../../Assets/facebook.svg";
import googleIcon from "../../Assets/google.svg";
import { Link, useNavigate } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import axios from "axios";
import { useGoogleLogin } from "@react-oauth/google";
import { LoginSocialFacebook } from "reactjs-social-login";
import { useDispatch } from "react-redux";
import { storeUserID, changeStatus, changeId, changeName } from "../../redux/Main/mainSlice";
import { useLocation } from "react-router-dom"
const Login = ({socket}) => {
  const [showPassword, setShowPassword] = useState(false);

  const location = useLocation(); // Get the current location using the useLocation hook
  const [containsAdmin, setContainsAdmin] = useState(location.pathname.includes('admin'));
  useEffect(() => {
    setContainsAdmin(location.pathname.includes('admin'));
  }, [location])
  const [showPass, setShowPass] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({ mode: "all" });
  const [message, setMessage] = useState("");

  const login = useGoogleLogin({
    onSuccess: async (codeResponse) => {
      await axios
        .post(`${process.env.REACT_APP_BACKEND_URL}/auth/google-login`, {
          accessToken: codeResponse.access_token,
        })
        .then((res) => {
          dispatch(storeUserID(res.data.token));
          dispatch(changeStatus(res.data.status))
          dispatch(changeId(res.data.id))
          dispatch(changeName(res.data.name))
          setMessage("");
          navigate("/home");
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

  const handleFBresponse = async (response) => {
    console.log("responseeeee", response);
    await axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/auth/facebook-login`, {
        accessToken: response.data.accessToken,
      })
      .then((res) => {
        console.log(res.data.token);
        dispatch(storeUserID(res.data.token));
        setMessage("");
        navigate("/home");
      })
      .catch((err) => {
        console.log(err.response.data.message);
        setMessage(err.response.data.message);
        console.log(err);
      });
  };
  const onSubmit = async (data) => {
    try {
      data.socketId = socket.id;
      await axios
        .post(`${process.env.REACT_APP_BACKEND_URL}/auth/login`, data)
        .then((res) => {
          console.log(res.data);
          dispatch(storeUserID(res.data.token));
          dispatch(changeStatus(res.data.status))
          dispatch(changeId(res.data.id))
          dispatch(changeName(res.data.name))
          setMessage("");
          setTimeout(() => {
            if (res.data.status !== "admin") {
              navigate("/home");
            } else {
              navigate("/admin/dashboard");
            }
          }, 1000); // 5000 milliseconds = 5 seconds
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
        <div className="px-10 text-white text-[20px]">
          No more buying, just renting with Rentmyitem{" "}
        </div>
        <img className="absolute bottom-0 left-40 z-10 hidden sm:block" src={coffeeTable} alt="" />
      </div>
      <div className="sm:col-span-8 bg-[#01A664] relative">
        <div className="h-full rounded-3xl sm:rounded-l-3xl flex justify-center items-center flex-col bg-white mt-3 sm:mt-0">
          <div className="space-y-10">
            <div className="space-y-4">
            <div className="font-bold text-[#01A664] mt-5 text-[30px]">
                Welcome {containsAdmin && "Admin"}
              </div>
              {
                containsAdmin ? (<div>
                  Login to Rentmyitem
                </div>) : (<div>
                  Login to Rentmyitem or{" "}
                  <Link className="text-[#1976D2] " to={"/Signup"}>
                    Create an account
                  </Link>
                </div>)
              }
            </div>
            <div>
              <div className="space-y-8">
                <Controller
                  name="email"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <div className="flex items-center bg-[#D9D9D9] sm:w-[300px] md:w-[400px] lg:w-[500px] rounded-3xl h-12 px-5 gap-3">
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
                        className="bg-[#D9D9D9] w-auto focus:outline-none text-[14px]"
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
                <Controller
                  name="password"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <div className="flex items-center bg-[#D9D9D9] sm:w-[300px] md:w-[400px] lg:w-[500px] rounded-3xl h-12 px-5 gap-3">
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
                        className="bg-[#D9D9D9] w-full focus:outline-none text-[14px]"
                        placeholder="Password"
                        type={showPassword ? "text" : "password"}
                        onChange={(value) => {
                          field.onChange(value);
                        }}
                      />
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="25"
                        height="25"
                        viewBox="0 0 25 25"
                        fill="none"
                        onClick={() => setShowPassword(!showPassword)}
                        className="cursor-pointer"
                      >
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M20.2616 1.38398C19.92 1.18405 19.4832 1.30271 19.2859 1.64898L17.1014 5.48539C15.6131 4.78874 14.0724 4.43255 12.5129 4.43255C8.32257 4.43255 4.26896 7.00564 1.00015 11.8428L0.987182 11.8619L0.975843 11.8783C0.866961 12.0342 0.864181 12.2175 0.975298 12.3716C3.38739 15.9544 6.22972 18.301 9.23985 19.2872L7.49963 22.3411C7.30235 22.6875 7.41941 23.1303 7.76105 23.3302L8.07036 23.5111C8.412 23.7111 8.84883 23.5925 9.0461 23.2461L20.8324 2.55398C21.0297 2.20771 20.9126 1.76493 20.5709 1.56499L20.2616 1.38398ZM16.1538 7.14905C14.9424 6.61573 13.7193 6.35579 12.5129 6.35579C9.46824 6.35579 6.31642 8.0116 3.51724 11.5391C3.24853 11.8778 3.24853 12.3714 3.51724 12.7101C5.61549 15.3544 7.91183 16.9473 10.2127 17.5794L11.4158 15.467C10.0415 15.0286 8.90497 13.8059 8.90497 12.1265C8.90497 10.0022 10.5332 8.27997 12.5413 8.27997C13.4682 8.27997 14.3142 8.64693 14.9565 9.25097L16.1538 7.14905ZM13.9636 10.9943C13.6543 10.5148 13.1458 10.2032 12.5413 10.2032C11.5364 10.2032 10.7145 11.0629 10.7145 12.1251C10.7145 12.827 11.4674 13.6473 12.4131 13.7163L13.9636 10.9943Z"
                          fill="black"
                          fill-opacity="0.25"
                        />
                        <path
                          d="M13.1138 19.8001C17.0814 19.5668 20.898 17.0256 24.0058 12.4384C24.0709 12.3423 24.1073 12.243 24.1073 12.1247C24.1073 12.0121 24.076 11.918 24.014 11.8264C22.8197 10.0605 21.5202 8.5972 20.1476 7.45142L19.2019 9.1118C19.99 9.79046 20.7618 10.5982 21.5085 11.5392C21.7773 11.8779 21.7773 12.3715 21.5085 12.7102C19.2569 15.5478 16.7772 17.1747 14.3085 17.7027L13.1138 19.8001Z"
                          fill="black"
                          fill-opacity="0.25"
                        />
                      </svg>
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
              </div>
              {
                !containsAdmin && <button className="px-6 pt-5 text-[14px]">
                  Forgot Password?
                </button>
              }
            </div>
            <div className="flex justify-center">
              <div className="flex justify-between items-center w-9/12">
                <button
                  onClick={handleSubmit(onSubmit)}
                  className="bg-[#01A664]  py-2 px-12 rounded-xl text-white font-semibold text-[13px] tracking-[1px]"
                >
                  Login
                </button>
                {
                  !containsAdmin && <div>Or</div>
                }
                {
                  !containsAdmin && <div className="flex items-center gap-2">                    <button
                      onClick={() => login()}
                      className="shadow-xl rounded-lg"
                    >
                      <img src={googleIcon} />
                    </button>
                  </div>
                }
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

export default Login;
