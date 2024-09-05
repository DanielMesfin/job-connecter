import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaArrowRightToBracket } from "react-icons/fa6";
import { BsCurrencyDollar } from "react-icons/bs";
import { IoLocationOutline } from "react-icons/io5";
import { TiArrowRight } from "react-icons/ti";
import { PiBellSimpleRinging } from "react-icons/pi";
import { BsBookmark } from "react-icons/bs";
import { PiShoppingBagOpenLight } from "react-icons/pi";
import { PiBriefcaseLight } from "react-icons/pi";
import { useUserContext } from "../../context/context";
import MyJob from "./myJob";
import Charts from "./chart";
const OverView = () => {
  const profileMessage = useLocation()?.state?.message;
  const { user } = useUserContext();
  const isActive = new Date().getHours() > 7 && new Date().getHours() < 18;
  const [errorMessage, setErrorMessage] = useState("");
  const [message, setMessage] = useState("");


  const OverviewInformation = [
    {
      label: "Posted Job",
      count: user.job_no,
      icon: (
        <PiBriefcaseLight
          size={55}
          className="hover:text-blue-500  text-blue-500 bg-white p-2  rounded-lg"
        />
      ),
    },
    {
      label: "Applications",
      count: user.applications_no,
      icon: (
        <BsBookmark
          size={55}
          className="hover:text-blue-500 text-yellow-700 bg-white mr-2 p-2 rounded-lg"
        />
      ),
    },
    {
      label: "Schedules",
      count: 400,
      icon: (
        <PiBellSimpleRinging
          size={55}
          className="hover:text-blue-500 text-green-500 bg-white mr-2 p-2 rounded-lg"
        />
      ),
    },
  ];
  const backgroundColors = ["bg-blue-100", "bg-yellow-100", "bg-green-100"];
  return (
    <div className="flex flex-col gap-5">
      {errorMessage && (
        <div
          class="p-4  text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
          role="alert"
        >
          <span class="font-medium">Danger alert!</span>
          {errorMessage}
        </div>
      )}
      {message && (
        <div
          className="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400"
          role="alert"
        >
          <span className="font-medium">Success alert!</span> {message}
        </div>
      )}
      <div>
        <p className="font-bold text-lg">
          Hello,
          <span className="mx-1">{user.full_name}</span>
          <span>{user.user_name}</span>
        </p>
      </div>
      <div className=" flex  gap-5  ">
        {OverviewInformation.map((activity, index) => (
          <div
            key={index}
            className={`flex w-3/4 px-5 items-center justify-between rounded-md ${
              backgroundColors[index % backgroundColors.length]
            }`}
          >
            <div className="flex flex-col justify-center  h-32">
              <p className="text-2xl text-center font-bold ">
                {activity.count}
              </p>
              <p className="text-md text-gray-600">{activity.label}</p>
            </div>
            <div className="flex">{activity.icon}</div>
          </div>
        ))}
      </div>
      {/* <div className="bg-red-400 my-6 p-3 rounded">
        <div className="flex items-center">
          <div className="w-[85%] flex items-center">
            <div className="w-[9%] mr-2 bg-white h-16 rounded-[50%]">
              <img
                width={100}
                src={user.profile_picture}
                className="rounded"
              />
            </div>
            <div className="text-white w-[60%]">
              <h1>Your Profile is Not Complited!</h1>
              <p>Complite your profile to get the most out of the system</p>
            </div>
          </div>
          <div className="">
            <button className="bg-white rounded px-3 py-1 text-red-400 flex items-center">
              Edit Profile <FaArrowRightToBracket className="ml-1" />
            </button>
          </div>
        </div>
      </div> */}
      <Charts />
      <div className="space-y-2">
        <div className="flex justify-between">
          <h1 className="font-bold">Recently Posted Jobs</h1>
          <Link
            className="justify-end flex w-[50%] text-gray-500 items-center hover:text-blue-500"
            to={"/EmployerDashboard/dashboard/myjob"}
          >
            View All <TiArrowRight size={24} />
          </Link>
        </div>
        <div></div>
        <MyJob limit={3} />
      </div>
    </div>
  );
};

export default OverView;
