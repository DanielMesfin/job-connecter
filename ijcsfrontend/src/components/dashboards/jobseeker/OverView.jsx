import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

import { FaArrowRightToBracket } from "react-icons/fa6";
import { BsCurrencyDollar } from "react-icons/bs";
import { IoLocationOutline } from "react-icons/io5";
import { TiArrowRight } from "react-icons/ti";
import { PiBellSimpleRinging } from "react-icons/pi";

import { BsBookmark } from "react-icons/bs";
import { PiShoppingBagOpenLight } from "react-icons/pi";
const OverView = ({ handleComponentChange }) => {
  const autedUserData =
    useLocation()?.state?.data || JSON.parse(localStorage.getItem("user"));
  const [authedJobSeekerData, setAuthedJobSeekerData] = useState(null);

  const loadJobSeeker = async () => {
    const { data } = await axios.get(
      `http://localhost:8000/candidate/all/${autedUserData.id}/`
    );
    setAuthedJobSeekerData(data);
  };

  useEffect(() => {
    loadJobSeeker();
  }, []);

  const handleSwitchToSettings = () => {
    handleComponentChange("Settings");
  };
  const handleSwitchToJobsAlert = () => {
    handleComponentChange("Jobs Alert");
  };
  const isActive = new Date().getHours() > 7 && new Date().getHours() < 18;
  const dailyActivity = [
    {
      label: "Applied Jobs",
      count: 250,
      icon: (
        <PiShoppingBagOpenLight
          size={35}
          className="hover:text-blue-500 mr-2 text-blue-500 bg-white p-2"
        />
      ),
    },
    {
      label: "Favorite Jobs",
      count: 300,
      icon: (
        <BsBookmark
          size={35}
          className="hover:text-blue-500 text-yellow-700 bg-white mr-2 p-2"
        />
      ),
    },
    {
      label: "Jobs Alert",
      count: 400,
      icon: (
        <PiBellSimpleRinging
          size={35}
          className="hover:text-blue-500 text-green-500 bg-white mr-2 p-2"
        />
      ),
    },
  ];
  const backgroundColors = ["bg-blue-50", "bg-yellow-50", "bg-green-50"];
  return (
    <>
      {authedJobSeekerData && (
        <div className="">
          <div>
            <p>
              HELLO,
              <span className="mx-1">{authedJobSeekerData?.first_name}</span>
              <span>{authedJobSeekerData?.last_name}</span>
            </p>
            <p className="text-gray-400">
              Here is your daily activities and job alerts
            </p>
          </div>
          <div className="flex w-full mt-5 gap-5">
            {dailyActivity.map((activity, index) => (
              <div
                key={index}
                className={`flex w-[33%] items-center p-4 rounded ${
                  backgroundColors[index % backgroundColors.length]
                }`}
              >
                <div className="flex flex-col w-[85%]">
                  <p>{activity.count}</p>
                  <p>{activity.label}</p>
                </div>
                <div className="flex float-end text-end w-[15%]">
                  <p className="flex justify-end">{activity.icon}</p>
                </div>
              </div>
            ))}
          </div>
          {!authedJobSeekerData.profile_picture ||
          !authedJobSeekerData.first_name ||
          !authedJobSeekerData.last_name ||
          !authedJobSeekerData.username ||
          !authedJobSeekerData.skills ||
          !authedJobSeekerData.socialMediaLink ||
          !authedJobSeekerData.educations ? (
            <div className="bg-red-400 my-6 p-3 rounded">
              <div className="flex items-center">
                <div className="w-[85%] flex items-center">
                  <div className="w-[9%] mr-2 h-16 rounded-[100%]  bg-white">
                    <img
                      src={authedJobSeekerData?.profile_picture}
                      className="rounded-[100%] w-full h-full"
                    />
                  </div>
                  <div className="text-white w-[60%]">
                    <h1>Your Profile is Not Completed!</h1>
                    <p>
                      Complete your profile to get the most out of the system
                    </p>
                  </div>
                </div>
                <div className="">
                  <button
                    onClick={handleSwitchToSettings}
                    className="bg-white rounded px-3 py-1 text-red-400 flex items-center"
                  >
                    Edit Profile <FaArrowRightToBracket className="ml-1" />
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-blue-300 my-6 p-3 rounded">
              <div className="flex items-center">
                <div className="w-[85%] flex items-center">
                  <div className="w-[9%] mr-2 h-16 rounded-[100%]  bg-white">
                    <img
                      src={authedJobSeekerData?.profile_picture}
                      className="rounded-[100%] w-full h-full"
                    />
                  </div>
                  <div className="text-white w-[75%]">
                    <h1>Your Profile is Complete!</h1>
                    <p>
                      Now you can generate CV/Resume and have access to free
                      features of the system
                    </p>
                  </div>
                </div>
                <div className="">
                  <button
                    onClick={handleSwitchToSettings}
                    className="bg-white rounded px-3 py-1 text-blue-400 flex items-center"
                  >
                    Edit Profile <FaArrowRightToBracket className="ml-1" />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      <div className="flex px-3">
        <h1 className="justify-start flex w-[50%]">Recently Applied</h1>
        <button
          className="justify-end flex w-[50%] text-gray-500 items-center hover:text-blue-500"
          onClick={handleSwitchToJobsAlert}
        >
          View All <TiArrowRight size={24} />
        </button>
      </div>
      <div className="flex px-4 py-4 bg-gray-100 rounded mt-3">
        <div className="flex w-[50%] justify-start text-gray-500">Jobs</div>
        <div className="flex w-[50%] justify-end">
          <span className="w-[40%] text-gray-500">Date Applied</span>
          <span className="w-[30%] text-gray-500">Status</span>
          <span className="w-[30%] text-gray-500">Action</span>
        </div>
      </div>
      <div className="flex mt-3 items-center pl-4">
        <div className="flex w-[50%]">
          <div className="w-[20%] h-16 bg-green-300 text-white flex items-center justify-center font-serif">
            UpWork
          </div>
          <div className="w-[80%] block mt-1">
            <div className="flex ml-2 ">
              <h1 className="mr-1">Network Engineer</h1>
              <span className="rounded-2xl text-blue-200 bg-blue-50 px-2 py-1">
                Remote
              </span>
            </div>
            <div className="flex justify-start items-center text-gray-500 mt-1 ml-1">
              <IoLocationOutline size={24} />{" "}
              <h1 className="mr-3">Washigton DC</h1>{" "}
              <BsCurrencyDollar size={24} />
              <span>20k-30k/month</span>
            </div>
          </div>
        </div>
        <div className="w-[50%] flex justify-end items-center">
          <span className="w-[40%] flex justify-start text-sm text-gray-500">
            {new Date().toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
              hour: "numeric",
              minute: "numeric",
            })}
          </span>
          <span
            className={`w-[30%] ${
              isActive
                ? "text-green-500 bg-lightgreen"
                : "text-red-500 bg-lightpink"
            }`}
          >
            {isActive ? "Active" : "In Active"}
          </span>
          <div className="w-[30%]">
            <button className="p-2 rounded bg-gray-100 text-blue-500 hover:bg-blue-500 hover:text-white">
              View Details
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
export default OverView;
