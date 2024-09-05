import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

// import * as yup from "yup";
// import { yupResolver } from "@hookform/resolvers/yup";
// import { useForm, useFieldArray } from "react-hook-form";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, useFieldArray } from "react-hook-form";

import hr from "../assets/images/hr.jpg";
import Cookies from "js-cookie";
import axios from "axios";
import {
  IoEyeOutline,
  IoEyeOffOutline,
  IoBagRemoveOutline,
} from "react-icons/io5";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { UserProvider, useUserContext } from "../context/context";
import {
  Input,
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Typography,
} from "@material-tailwind/react";

const Login = () => {
  const navigate = useNavigate();
  const { setAuthedUserData } = useUserContext();
  // const { setAuthedUserData } = useUserContext();
  const [hiddenPassword, setHiddenPassword] = useState(true);
  const [accountVerified, setAccountVerified] = useState(false);
  // whay these happend on both the method...
  // const {authenticatedUserData,setAuthedUserData}=useUserContext();

  const [alertMessage, setAlertMessage] = useState(null);

  const [remember_me, setRememberMe] = useState(false);

  const validationSchema4login = yup
    .object({
      email: yup.string().email("Invalid Email").required("Email is Required"),
      password: yup
        .string()
        .min(8, "At least 8 characters")
        .required("please Enter Password"),
    })
    .required();

  let {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setError,
  } = useForm({
    resolver: yupResolver(validationSchema4login),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const email = watch("email");
  const otpemail = watch("otpemail");
  const password = watch("password");

  const [otpEmail, setOtpEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [validOtpEmail, setValidOtpEmail] = useState(false);

  const [open, setOpen] = useState(false);

  const [disableOtpInput, setDisableOtpInput] = useState(true);

  const handleOpen = () => setOpen(!open);

  const userLogin = async (data) => {
    console.log("data", data);
    const csrftoken = Cookies.get("csrftoken");

    const loginData = new FormData();
    loginData.append("email", email);
    loginData.append("password", password);

    await axios
      .post("http://127.0.0.1:8000/user/login", loginData, {
        headers: {
          "X-CSRFToken": csrftoken,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        localStorage.setItem("user", JSON.stringify(response.data));

        if (response.data.is_job_seeker) {
          const data = response.data;
          navigate("/jobseeker-dashboard/", {
            state: { data },
          });
        }
        if (response.data["user-type"] == "Employer") {
          alert(response.data["user"]["full_name"]);
          const authenticatedUserData = response.data["user"];
          setAuthedUserData(authenticatedUserData);

          if (response.data["user"].profile_full) {
            navigate("/EmployerDashboard");
          } else {
            navigate("/EmployerDashboard/dashboard/settings");
          }
        }
        if (response.data["user-type"] == "Admin") {
          alert(response.data["user"]["full_name"]);
          console.log(response.data);
          const authenticatedUserData = response.data["user"];
          setAuthedUserData(authenticatedUserData);

          localStorage.setItem("info", JSON.stringify(response.data["info"]));
          navigate("/AdminDashboard");
        } else {
          setAccountVerified(true);
          setAlertMessage("Login Failed ! Please Try Again ");
        }
      })
      .catch((err) => {
        console.log("Error : ", err.response);
        console.log("Error : ", err);
        if (err.response) {
          Object.entries(err.response.data).map(([key, value]) => {
            setError(key, { type: "server", message: value });
            console.log(key, value);
          });

          if (err.response.status == 401) {
            setAccountVerified(false);
            setAlertMessage(err.response.data.message);
          }
        }
      });
  };

  const validateEmail = (email) => {
    if (email.includes("@") && email.includes(".")) {
      setValidOtpEmail(true);
      setOtpEmail(email);
    } else {
      setValidOtpEmail(false);
    }
  };

  const sendOTP = async () => {
    console.log("yup", otpEmail);

    await axios
      .post("http://127.0.0.1:8000/user/send-otp", { email: otpEmail })
      .then((response) => {
        console.log(response.data.status == false);
        setDisableOtpInput(response.data.status == false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const CheckOtp = async () => {
    console.log("yup", otp);

    await axios
      .post("http://127.0.0.1:8000/user/check-otp", {
        email: otpEmail,
        otp: otp,
      })
      .then((response) => {
        console.log(response.data.status == false);
        setDisableOtpInput(response.data.status == false);
        // if otp is confirmed

        navigate("/resetPassword", {
          state: {
            otpEmail: otpEmail,
          },
        });
      })
      .catch((err) => {
        console.log(err);
        alert("otp does Not match");
      });
  };

  return (
    <UserProvider>
      <div className="grid grid-cols-2 md:grid-cols-5 justify-center">
        <div className="col-span-2 flex justify-center  items-center">
          <form
            onSubmit={handleSubmit(userLogin)}
            className="w-full"
            noValidate
          >
            <div className="flex flex-col  w-full px-5 py-10 md:py-20 md:px-[7%] gap-5">
              <div className="space-y-2">
                <h2 className="text-xl font-bold">Sign in</h2>
                <p className="text-sm text-gray-600">
                  Don't have an account ?
                  <Link to="/register" className="text-blue-500">
                    Create Account
                  </Link>
                </p>
              </div>

              {alertMessage && (
                <div
                  class={`p-4  text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 ${
                    accountVerified == false && "flex justify-between"
                  }`}
                  role="alert"
                >
                  <div>
                    <span class="font-bold">Danger alert! </span>
                    <p className="font-medium"> {alertMessage}</p>
                  </div>
                  <button
                    className={`hover:underline ${
                      accountVerified == false ? "block" : "hidden"
                    }`}
                    onClick={() => navigate(`/verify/${email}`)}
                  >
                    Verify Account ?
                  </button>
                </div>
              )}
              <div className="space-y-3">
                <div>
                  <Input
                    size="lg"
                    type="email"
                    name="Email"
                    id="Email"
                    {...register("email")}
                    className="outline-none border w-full p-2"
                    label="Email address"
                  />
                  {errors.email && (
                    <span
                      className=" text-red-800 rounded-lg text-xs  dark:bg-gray-800 dark:text-red-400"
                      role="alert"
                    >
                      {errors.email.message}
                    </span>
                  )}
                </div>
                <div>
                  <div className="flex border  rounded-lg">
                    <Input
                      size="lg"
                      type={hiddenPassword ? "password" : "text"}
                      name="password"
                      id="password"
                      {...register("password")}
                      className="outline-none border w-full p-2"
                      label="password"
                      icon={
                        <div
                          className="  cursor-pointer"
                          onClick={() => {
                            setHiddenPassword(!hiddenPassword);
                          }}
                        >
                          {hiddenPassword ? (
                            <IoEyeOutline />
                          ) : (
                            <IoEyeOffOutline />
                          )}{" "}
                        </div>
                      }
                    />
                  </div>
                </div>
                {errors.password && (
                  <span
                    className=" text-red-800 rounded-lg text-xs  dark:bg-gray-800 dark:text-red-400"
                    role="alert"
                  >
                    {errors.password.message}
                  </span>
                )}
              </div>

              <div className="flex justify-between">
                <div className="flex gap-3">
                  <input
                    type="checkbox"
                    name="remember_me"
                    id="remember_me"
                    className="w-5"
                    checked={remember_me}
                    onChange={() => {
                      setRememberMe(!remember_me);
                    }}
                  />
                  <label htmlFor="remember_me" className="text-gray-600">
                    Remember Me
                  </label>
                </div>
                <div>
                  <Link
                    // to="/resetPassword"
                    onClick={handleOpen}
                    className="text-blue-500 text-sm font-bold"
                  >
                    Forgot Password
                  </Link>
                </div>
              </div>
              <div className=" ">
                <button
                  type="submit"
                  className="flex gap-1 bg-blue-700 w-full py-3 justify-center rounded-md text-white"
                >
                  Sign In{" "}
                  <FontAwesomeIcon icon={faArrowRight} className="p-1" />
                </button>
              </div>
            </div>
          </form>
        </div>

        <Dialog open={open} handler={handleOpen} translate="yes">
          <DialogHeader>Forgot Password.</DialogHeader>
          <DialogBody className="space-y-5">
            <div className="bg-green-200 flex gap-3 px-2 pt-2 pb-1 rounded-md items-end">
              <span className="text-black border px-2 border-white  bg-green-200  font-bold cursor-pointer rounded-full">
                !
              </span>
              <p className="text-black">
                {" "}
                Enter Email you used to register to IJC
              </p>
            </div>
            <div className="space-y-3">
              <div className="flex flex-col gap-3">
                <Input
                  size="lg"
                  type="email"
                  name="otpEmail"
                  id="otpEmail"
                  onChange={(e) => validateEmail(e.target.value)}
                  className="outline-none border w-full p-2"
                  label="Email address"
                />
                {!validOtpEmail && (
                  <span
                    className=" text-red-800 rounded-lg text-xs  dark:bg-gray-800 dark:text-red-400"
                    role="alert"
                  >
                    Invalid Email Address
                  </span>
                )}
              </div>
              <Button disabled={!validOtpEmail} onClick={sendOTP}>
                Get code
              </Button>
            </div>
            <Input
              disabled={disableOtpInput}
              onChange={(e) => {
                setOtp(e.target.value);
              }}
              type="text"
              size="lg"
              label={`Enter OTP code sent to ${
                otpEmail ? otpEmail : "your email address"
              } `}
            />
          </DialogBody>
          <DialogFooter>
            <Button
              variant="text"
              color="red"
              onClick={handleOpen}
              className="mr-1"
            >
              <span>Cancel</span>
            </Button>
            <Button variant="gradient" color="green" onClick={CheckOtp}>
              <span>Confirm</span>
            </Button>
          </DialogFooter>
        </Dialog>

        <div
          className="w-full md:col-span-3"
          style={{
            clipPath: "polygon(5% 0, 100% 0, 100% 100%, 0 100%)",
            backgroundImage: `url(${hr})`,
            backgroundSize: "cover", // Cover the entire space of the div
            height: "100vh", //  Full height
            width: "100vw",
            backgroundRepeat: "no-repeat",
          }}
        >
          <div className="flex flex-col  justify-center  md:justify-end  md:items-baseline h-full py-44 gap-5 px-10 md:px-32 w-full md:w-2/3">
            <h2 className="font-semibold text-white text-lg md:text-3xl">
              Over 1,75,324 candidates Waiting for good employees.
            </h2>
            <div className="flex flex-col gap-20 md:gap-0 md:grid grid-cols-3 mt-7">
              <div className="w-32 h-10 flex flex-col justify-center items-center gap-3 m-auto">
                <div className="  ">
                  <IoBagRemoveOutline
                    color="white"
                    className="w-10 h-10 bg-gray-700 rounded-md p-2"
                  />
                </div>
                <div className=" ">
                  <h2 className="text-white">1,75,324</h2>
                  <h2 className="text-gray-500 text-sm">Live Job</h2>
                </div>
              </div>

              <div className="w-32 h-10 flex flex-col justify-center items-center gap-3 m-auto">
                <div className="  ">
                  <IoBagRemoveOutline
                    color="white"
                    className="w-10 h-10 bg-gray-700 rounded-md p-2"
                  />
                </div>
                <div className=" ">
                  <h2 className="text-white">1,75,324</h2>
                  <h2 className="text-gray-500 text-sm">Live Job</h2>
                </div>
              </div>

              <div className="w-32 h-10 flex flex-col justify-center items-center gap-3 m-auto">
                <div className="  ">
                  <IoBagRemoveOutline
                    color="white"
                    className="w-10 h-10 bg-gray-700 rounded-md p-2"
                  />
                </div>
                <div className=" ">
                  <h2 className="text-white">1,75,324</h2>
                  <h2 className="text-gray-500 text-sm">Live Job</h2>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </UserProvider>
  );
};

export default Login;
