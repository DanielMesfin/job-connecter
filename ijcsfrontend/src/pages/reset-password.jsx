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
import { UserProvider, useUserContext } from "../context/context";
import { Input } from "@material-tailwind/react";

const ResetPassword = () => {
  const navigate = useNavigate(); 
  const location=useLocation();
  const [hiddenPassword, setHiddenPassword] = useState(true);
  const [alertMessage, setAlertMessage] = useState(null);
  const [hiddenConfirmPassword, setHiddenConfirmPassword] = useState(true);
  const validationSchema = yup
    .object({
      password: yup
        .string()
        .min(8, "At least 8 characters")
        .required("please Enter Password"),
      confirm_password: yup
        .string()
        .oneOf([yup.ref("password"), null], "Passwords must match")
        .required("Please Confirm your password"),
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
      password: "",
      confirm_password: "",
    },
  });

  const email = watch("email");
  const password = watch("password");
  const confirm_password = watch("confirm_password");
  const {otpEmail}=location.state || ''

  const ResetPassword = async (data) => {
    console.log("data", data);
    const csrftoken = Cookies.get("csrftoken");

    const resetData = new FormData();
    resetData.append("email", otpEmail);
    resetData.append("password", password);

    console.log(email, password);
    console.log(email, password);

    await axios
      .patch("http://127.0.0.1:8000/user/reset-password",resetData )
      .then((response) => {
        console.log(response)
        
      })
      .catch((err) => {
        console.log("Error : ", err.response);
        console.log("Error : ", err);
      });
  };

  return (
    <UserProvider>
      <div className="grid grid-cols-2 md:grid-cols-5 justify-center">
        <div className="col-span-2 flex justify-center  items-center">
          <form
            onSubmit={handleSubmit(ResetPassword)}
            className="w-full"
            noValidate
          >
            8
            <div className="flex flex-col space-y-3  w-full px-5 py-10 md:p-20 gap-5">
              <div className="space-y-2">
                <h2 className="text-xl font-bold">Reset Password</h2>
                <p className="text-sm text-gray-600">
                  Remebered Password ?
                  <Link to="/login" className="text-blue-500 underline underline-offset-1">
                    Back to login
                  </Link>
                </p>
              </div>

              {alertMessage && (
                <div
                  class="p-4  text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                  role="alert"
                >
                  <span class="font-bold">Danger alert! </span>
                  <p className="font-medium"> {alertMessage}</p>
                </div>
              )}
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
              <div className="">
                <div className="flex border rounded-sm">
                  <Input
                     
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
                {errors.confirm_password && (
                  <span
                    className=" text-red-800 rounded-lg text-xs  dark:bg-gray-800 dark:text-red-400"
                    role="alert"
                  >
                    {errors.confirm_password.message}
                  </span>
                )}
              </div>

              <div className=" ">
                <button className="flex gap-1 bg-blue-700 w-full py-3 justify-center rounded-md text-white">
                  Reset
                </button>
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

export default ResetPassword;
