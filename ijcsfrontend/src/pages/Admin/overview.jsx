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
 
import Charts from "./chart";
import JobActivation from "./job_activation";
const OverView = () => {
  const { user } = useUserContext();
  const data= JSON.parse(localStorage.getItem('info'))
 
  const dailyActivity = [
    {
      label: "Posted Job",
      count: data.job_count,
      icon: (
        <PiBriefcaseLight
        size={55}
          className="hover:text-blue-500  text-blue-500 bg-white p-2  rounded-lg"
        />
      ),
    },
    {
      label: "Job Applications",
      count:data.app_count,
      icon: (
        <BsBookmark
          size={55}
          className="hover:text-blue-500 text-yellow-700 bg-white mr-2 p-2 rounded-lg"
        />
      ),
    },
    {
      label: "Job Seeker",
      count:  data.job_seeker_count,
      icon: (
        <PiBellSimpleRinging
          size={55}
          className="hover:text-blue-500 text-green-500 bg-white mr-2 p-2 rounded-lg"
        />
      ),
    },
    {
      label: "Employers",
      count:  data.emp_count,
      icon: (
        <PiBellSimpleRinging
          size={55}
          className="hover:text-blue-500 text-green-500 bg-white mr-2 p-2 rounded-lg"
        />
      ),
    },
  ];
  const backgroundColors = ["bg-blue-50", "bg-yellow-50", "bg-green-50"];
  return (
    <div className="flex flex-col gap-5">
      <div>
        <p className="font-bold text-lg">
          Hello,
          <span className="mx-1">{user.first_name}</span>
          <span>{user.full_name}</span>
        </p>
        <p className="text-gray-400 text-sm font-normal">
          Here is your daily activities and applications
        </p>
      </div>
      <div className=" flex  gap-5  ">
        {dailyActivity.map((activity, index) => (
          <div
            key={index}
            className={`flex w-3/4 px-5 items-center justify-between rounded-md ${
              backgroundColors[index % backgroundColors.length]
            }`}
          >
            <div className="flex flex-col justify-center h-32">
              <p className="text-2xl text-center font-bold ">{activity.count}</p>
              <p className="text-md text-gray-600">{activity.label}</p>
            </div>
            <div className="flex">{activity.icon}</div>
          </div>
        ))}
      </div>
      <Charts/>
<div className="space-y-2">


      <div className="flex justify-between">
        <h1 className="font-bold">Recently Posted Jobs</h1>
        <Link
          className="justify-end flex w-[50%] text-gray-500 items-center hover:text-blue-500"
          to={"/AdminDashboard/dashboard/job_activation"}
        >
          View All <TiArrowRight size={24} />
        </Link>
      </div>
      <div>
      </div>
      <JobActivation limit={4}/>
    </div>
    </div>
  );
};

export default OverView;
