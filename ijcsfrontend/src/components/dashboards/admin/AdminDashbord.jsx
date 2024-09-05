import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { IoLayersSharp } from "react-icons/io5";
import axios from "axios";
import { IoLocationOutline } from "react-icons/io5";
import { PiBellSimpleRinging } from "react-icons/pi";
import { IoSettingsOutline } from "react-icons/io5";
import { FaArrowRightToBracket } from "react-icons/fa6";
import { BsCurrencyDollar } from "react-icons/bs";
import { FaBell } from "react-icons/fa";
import { IoIosLogOut } from "react-icons/io";
import { BsBookmark } from "react-icons/bs";
import { TiArrowRight } from "react-icons/ti";
import { PiShoppingBagOpenLight } from "react-icons/pi";
import "../jobseeker/Job_Seeker_Dashboard.css";
import MessageComponet from "../../widgets/message/MessageComponet";

const LinkList = ({ data }) => {
  const location = useLocation(); // get the current location object
  const pathname = location.pathname; // get the current pathname
  return (
    <div className="flex flex-col float-end mt-4">
      {data.map((item, index) => (
        <Link
          key={index}
          to={item.link}
          className={
            pathname === item.link
              ? "block transition-none w-64 hover:transition-none hover:bg-blue-50 hover:border-l-[3px] hover:border-blue-500 pl-3 pr-28 py-2 hover:text-blue-500 active:text-blue-500 active:border-l-[3px] active:border-blue-500 bg-blue-50"
              : "block transition-none w-64 hover:transition-none hover:bg-blue-50 hover:border-l-[3px] hover:border-blue-500 pl-3 pr-28 py-2 hover:text-blue-500 active:text-blue-500 active:border-l-[3px] active:border-blue-500"
          }
        >
          <span
            className={
              pathname === item.link
                ? "flex align-middle text-blue-500"
                : "flex align-middle"
            }
          >
            {item.icon}
            {item.label}
          </span>
        </Link>
      ))}
    </div>
  );
};
const AdminDashbord = () => {
  const isActive = new Date().getHours() > 7 && new Date().getHours() < 18;
  const jsonData = [
    {
      label: "Overview",
      link: "/jobseeker_dashboard",
      icon: <IoLayersSharp size={24} className="hover:text-blue-500 mr-2" />,
    },
    {
      label: "Applied Jobs",
      link: "/",
      icon: (
        <PiShoppingBagOpenLight
          size={24}
          className="hover:text-blue-500 mr-2"
        />
      ),
    },
    {
      label: "Favorite Jobs",
      link: "/",

      icon: <BsBookmark size={24} className="hover:text-blue-500 mr-2" />,
    },
    {
      label: "Jobs Alert",
      link: "/recommended_job",
      icon: (
        <PiBellSimpleRinging size={24} className="hover:text-blue-500 mr-2" />
      ),
    },
    {
      label: "Settings",
      link: "/",
      icon: (
        <IoSettingsOutline size={24} className="hover:text-blue-500 mr-2" />
      ),
    },
    {
      label: "LogOut",
      link: "/",
      icon: (
        <IoIosLogOut
          size={18}
          className="hover:text-blue-500 mr-2"
          style={{ transform: "rotate(220deg)" }}
        />
      ),
    },
  ];
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
  const [jobSeakers, setJobSeeker] = useState([]);
  const getJobSeekers = async () => {
    const response = await axios.get(
      "http://127.0.0.1:8000/candidate/jobseeker/"
    );
    setJobSeeker(response.data);
  };
  useEffect(() => {
    getJobSeekers();
  }, []);
  return (
    <>
      <div className="flex align-middle my-2 pl-[15%] pr-[4%]">
        <div className="flex justify-start w-[50%]">
          <span className="flex items-center">
            <PiShoppingBagOpenLight
              size={40}
              className="hover:text-blue-500 text-blue-500 mr-1"
            />
            IJCS
          </span>
        </div>
        <div className="flex justify-end w-[50%]">
          <span className="items-center flex">
            <FaBell className="text-gray-500 mr-3" />
          </span>
          <div className="w-[9%] mr-2 bg-blue-50 h-14 rounded-[50%]">
            <img width={100} src="" className="rounded" />
          </div>
        </div>
      </div>
      <div className="flex justify-center mx-4 border-b-[1px] border-t-[1px] border-gray-500">
        <MessageComponet />
        <div className="w-[30%] border-r-[1px] border-gray-500 py-5 pt-16">
          <h1 className="text-gray-500 text-right w-full pr-10">
            CANDIDATE DASHBOARD
          </h1>
          <LinkList data={jsonData} />
        </div>
        <div className="w-[70%] p-[5%]">
          {jobSeakers.map((jobSeaker, index) => (
            <div key={index}>
              <p>
                HELLO,
                <span className="mx-1">{jobSeaker.first_name}</span>
                <span>{jobSeaker.last_name}</span>
              </p>
              <p className="text-gray-400">
                Here is your daily activities and job alerts
              </p>
              <img width={100} src={jobSeaker.profile_picture} />
            </div>
          ))}
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
          <div className="bg-red-400 my-6 p-3 rounded">
            {jobSeakers.map((jobSeaker, index) => (
              <div key={index} className="flex items-center">
                <div className="w-[85%] flex items-center">
                  <div className="w-[9%] mr-2 bg-white h-16 rounded-[50%]">
                    <img
                      width={100}
                      src={jobSeaker.profile_picture}
                      className="rounded"
                    />
                  </div>
                  <div className="text-white w-[60%]">
                    <h1>Your Profile is Not Complited!</h1>
                    <p>
                      Complite your profile to get the most out of the system
                    </p>
                  </div>
                </div>
                <div className="">
                  <button className="bg-white rounded px-3 py-1 text-red-400 flex items-center">
                    Edit Profile <FaArrowRightToBracket className="ml-1" />{" "}
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="flex px-3">
            <h1 className="justify-start flex w-[50%]">Recently Applied</h1>
            <Link
              className="justify-end flex w-[50%] text-gray-500 items-center hover:text-blue-500"
              to={`/`}
            >
              View All <TiArrowRight size={24} />
            </Link>
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
              <div className="w-[20%] h-16 bg-green-300 text-white flex items-center justify-center font-serif">UpWork</div>
              <div className="w-[80%] block mt-1">
                <div className="flex ml-2 ">
                  <h1 className="mr-1">Network Engineer</h1>
                  <span className="rounded-2xl text-blue-200 bg-blue-50 px-2 py-1">Remote</span>
                </div>
                <div className="flex justify-start items-center text-gray-500 mt-1 ml-1">
                  <IoLocationOutline size={24} /> <h1 className="mr-3">Washigton DC</h1> <BsCurrencyDollar size={24} /><span>20k-30k/month</span>
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
        </div>
      </div>
    </>
  );
};

export default AdminDashbord;
