import React, { useEffect, useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
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
import { BsPersonCircle } from "react-icons/bs";
import { HiBuildingOffice2 } from "react-icons/hi2";
import { Input } from "@material-tailwind/react";
const Register = () => {
  const [selectedUser, setSelectedUser] = useState("Candidate");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    location.state && setSelectedUser(location.state);
  }, []);

  const [hiddenPassword, setHiddenPassword] = useState(true);
  const [hiddenConfirmPassword, setHiddenConfirmPassword] = useState(true);

  const [alertMessage, setAlertMessage] = useState(null);

  const [errorMessage, setErrorMessage] = useState("");
  const [message, setMessage] = useState("");

  const validationSchema = yup
    .object({
      full_name: yup.string().required("Full Name is required"),
      username: yup.string().required("user name is required"),
      email: yup.string().email("Invalid Email").required("Email is Required"),
      password: yup
        .string()
        .min(8, "At least 8 characters")
        .required("please Enter Password"),
      confirm_password: yup
        .string()
        .oneOf([yup.ref("password"), null], "Passwords must match")
        .required("Please Confirm your password"),
      terms_and_conditions: yup
        .boolean()
        .oneOf([true], "You must agree to the terms and conditions")
        .required("You must agree to the terms and conditions"),
    })
    .required();

  let {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setError,
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      full_name: "",
      email: "",
      username: "",
      password: "",
      confirm_password: "",
    },
  });

  const full_name = watch("full_name");
  const username = watch("username");
  const email = watch("email");
  const password = watch("password");
  const confirm_password = watch("confirm_password");

  const Register = async (data) => {
    console.log("data", data);
    const csrftoken = Cookies.get("csrftoken");

    const RegisteringData = new FormData();

    RegisteringData.append("username", username);
    RegisteringData.append("email", email);
    RegisteringData.append("password", password);

    console.log(full_name, username, email, password);

    if (selectedUser == "Candidate") {
      RegisteringData.append("first_name", full_name);
      RegisteringData.append("is_job_seeker", true);

      await axios
        .post(`http://127.0.0.1:8000/candidate/register/`, RegisteringData, {
          headers: {
            "X-CSRFToken": csrftoken,
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          console.log(response.data);
          setMessage(
            "Registeration successfull ! please verify you email to get full features"
          );
          console.log(message);
          navigate(`/verify/${email}`)
        })
        .catch((err) => {
          if (err.response) {
            setErrorMessage("Registration Failed ! Please Try Again ");
            Object.entries(err.response.data).map(([key, value]) => {
              setError(key, { type: "server", message: value });
              console.log(key, value);
            });
          }
        });
    } else if (selectedUser == "employer") {
      RegisteringData.append("full_name", full_name);
      await axios
        .post(
          `http://127.0.0.1:8000/user/employer/register/`,
          RegisteringData,
          {
            headers: {
              "X-CSRFToken": csrftoken,
              "Content-Type": "multipart/form-data",
            },
          }
        )
        .then((response) => {
          console.log(response.data);
          setMessage(
            response.data["response"] + "\n" + response.data["suggestion"]
          );
          console.log(message);
          navigate(`/verify/${email}`)
        })
        .catch((err) => {
          if (err.response) {
            setErrorMessage("Registration Failed ! Please Try Again ");
            Object.entries(err.response.data).map(([key, value]) => {
              setError(key, { type: "server", message: value });
              console.log(key, value);
            });
          }
        });
    }
  };
  console.log("errors", errors);

  return (
    <UserProvider>
      <div className="grid grid-cols-2 lg:grid-cols-5 justify-center">
        <div className="col-span-2 flex   md:mt-[9rem] justify-center">
          <form onSubmit={handleSubmit(Register)} className="w-full" noValidate>
            <div className="flex flex-col  w-full p-5 md:px-[5%] gap-5">
              <div className="space-y-1">
                <h2 className="text-xl font-bold">Create account</h2>
                <p className="text-sm text-gray-500">
                  Already have account ?{" "}
                  <Link to="/login" className="text-blue-500 font-semibold">
                    Login
                  </Link>
                </p>
              </div>
              {errorMessage && (
                <div
                  class="p-4  text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                  role="alert"
                >
                  <span class="font-bold">Danger alert :</span>
                  <p className="font-medium">{errorMessage}</p>
                </div>
              )}
              {message && (
                <div
                  class="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400"
                  role="alert"
                >
                  <span class="font-bold">Success alert !</span>
                  <p className="font-medium"> {message}</p>
                </div>
              )}
              <div className="space-y-3 px-3 py-3 bg-gray-200 rounded-md ">
                <p className="text-center text-sm text-gray-500">
                  Create Account As :
                </p>
                <div className="flex justify-around w-full">
                  <div
                    onClick={() => setSelectedUser("Candidate")}
                    className={`duration-700 transition-all ease-in-out flex gap-2 justify-center items-center cursor-pointer w-full  text-center py-1 ${
                      selectedUser == "Candidate" &&
                      "bg-black text-white   rounded-md"
                    }`}
                  >
                    <BsPersonCircle />
                    <p>Candidate</p>
                  </div>
                  <div
                    onClick={() => setSelectedUser("employer")}
                    className={`duration-700 transition-all ease-in-out flex gap-2 justify-center items-center cursor-pointer w-full text-center py-1 ${
                      selectedUser == "employer" &&
                      "bg-black text-white   rounded-md"
                    }`}
                  >
                    <HiBuildingOffice2 />
                    <p>Employers</p>
                  </div>
                </div>
              </div>
              {alertMessage && (
                <div
                  className="p-4  text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                  role="alert"
                >
                  <span className="font-medium">Danger alert!</span>
                  {alertMessage}
                </div>
              )}
              <div className="space-y-3">
                <div className="flex justify-between gap-5">
                  <div className="w-full">
                    <Input
                      type="text"
                      size="lg"
                      name="full_name"
                      id="full_name"
                      {...register("full_name")}
                      className="input outline-none border w-full p-2 border-gray-400"
                      label={`${
                        selectedUser == "employer"
                          ? "Company Name "
                          : "Full Name"
                      }`}
                    />

                    {errors.full_name && (
                      <span
                        className=" text-red-800 rounded-lg text-xs  dark:bg-gray-800 dark:text-red-400"
                        role="alert"
                      >
                        {errors.full_name.message}
                      </span>
                    )}
                  </div>
                  <div className="w-full">
                    <Input
                      type="text"
                      size="lg"
                      label="Username"
                      name="username"
                      id="username"
                      {...register("username")}
                      className="outline-none border w-full p-2"
                    />
                    {errors.username && (
                      <span
                        className=" text-red-800 rounded-lg text-xs  dark:bg-gray-800 dark:text-red-400"
                        role="alert"
                      >
                        {errors.username.message}
                      </span>
                    )}
                  </div>
                </div>
                <div className="w-full">
                  <Input
                    type="email"
                    size="lg"
                    label="Email address"
                    name="email"
                    id="Email"
                    {...register("email")}
                    className="outline-none border w-full p-2"
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
                  <div className="flex border rounded-sm">
                    <Input
                      size="lg"
                      type={hiddenPassword ? "password" : "text"}
                      name="password"
                      {...register("password")}
                      id="password"
                      className="  outline-none  w-full p-2 border "
                      label="password"
                      icon={
                        <div
                          className="cursor-pointer"
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
                  {errors.password && (
                    <span
                      className=" text-red-800 rounded-lg text-xs  dark:bg-gray-800 dark:text-red-400"
                      role="alert"
                    >
                      {errors.password.message}
                    </span>
                  )}
                </div>
                <div>
                  <div className="flex border rounded-sm">
                    <Input
                      color="red"
                      size="lg"
                      name="confirm_password"
                      type={hiddenConfirmPassword ? "password" : "text"}
                      id="confirm_password"
                      {...register("confirm_password")}
                      className="outline-none border w-full p-2 "
                      label="Confirm Password"
                      icon={
                        <div
                          className="cursor-pointer"
                          onClick={() => {
                            setHiddenConfirmPassword(!hiddenConfirmPassword);
                          }}
                        >
                          {hiddenConfirmPassword ? (
                            <IoEyeOutline />
                          ) : (
                            <IoEyeOffOutline />
                          )}{" "}
                        </div>
                      }
                    />
                  </div>
                </div>
                {errors.confirm_password && (
                  <span
                    className=" text-red-800 rounded-lg text-xs  dark:bg-gray-800 dark:text-red-400"
                    role="alert"
                  >
                    {errors.confirm_password.message}
                  </span>
                )}
              </div>
              <div className="flex flex-col justify-between">
                <div className="flex gap-3">
                  <input
                    type="checkbox"
                    name="terms_conditions"
                    {...register("terms_and_conditions")}
                    id="terms_conditions"
                    className="w-5"
                  />
                  <label htmlFor="remember_me">
                    I have Read and agree with your{" "}
                    <Link to={"/terms_conditions"} className="text-blue-500">
                      terms & conditions
                    </Link>{" "}
                  </label>
                </div>
                {errors.terms_and_conditions && (
                  <span
                    className=" text-red-800 rounded-lg text-xs  dark:bg-gray-800 dark:text-red-400"
                    role="alert"
                  >
                    {errors.terms_and_conditions.message}
                  </span>
                )}
              </div>
              <div className="w-full">
                <button className="flex gap-1 bg-blue-700 w-full py-3 justify-center rounded-md text-white">
                  Sign In{" "}
                  <FontAwesomeIcon icon={faArrowRight} className="p-1" />
                </button>
                <Link to ={`/verify/asebekalu@gmail.com`}>Sign in</Link>
              </div>
            </div>
          </form>
        </div>
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
          <div className="flex flex-col  justify-center  lg:justify-end  md:items-baseline h-full py-44 gap-5 px-10 md:px-32 w-full lg:w-2/3">
            <h2 className="font-semibold text-white text-lg md:text-3xl">
              Over 1,75,324 candidates Waiting for good employees.
            </h2>
            <div className="flex flex-col gap-20 md:gap-0 md:grid grid-cols-3 mt-7">
              <div className="w-32 lg:h-10 flex flex-col justify-center items-center gap-3 m-auto">
                <div className="  ">
                  <IoBagRemoveOutline
                    color="white"
                    className="w-16 h-14 lg:w-10 lg:h-10 bg-gray-700 rounded-md p-2"
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
                    className="w-16 h-14 lg:w-10 lg:h-10 bg-gray-700 rounded-md p-2"
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
                    className="w-16 h-14 lg:w-10 lg:h-10 bg-gray-700 rounded-md p-2"
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

export default Register;
