import React, { useEffect, useState } from "react";
import {
  Link,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { IoLayersSharp } from "react-icons/io5";
import { IoSettingsOutline } from "react-icons/io5";
import { PiBellSimpleRinging, PiBriefcaseLight } from "react-icons/pi";
import { RxHamburgerMenu } from "react-icons/rx";
import { CiCircleRemove } from "react-icons/ci";

import { FaBell } from "react-icons/fa";
import { IoIosLogOut } from "react-icons/io";
import { BsBookmark } from "react-icons/bs";
import { PiShoppingBagOpenLight } from "react-icons/pi";
import { PiBellRingingBold } from "react-icons/pi";
import PostJob from "./postJob";
import UpdateJob from "./updateJob";
import MyJob from "./myJob";
import Applications from "./applications";
import Schedules from "./schedule";
import UpdateEmployer from "./updateEmployer";
import EmpNavBar from "./navbar";
import OverView from "./overview";
import { useUserContext } from "../../context/context";
import ApplicationPerJob from "./applications-perJob";
// Key Of Object

const EmployerDashboard = () => {
  const { user, profile_full } = useUserContext();
  const url_path = useLocation().pathname;

  const navigate = useNavigate();

  const [fullSideBar, setFullSideBar] = useState(false);

  console.log(url_path);

  const [selectedNav, setSelectedNav] = useState("Home");
  const [expandNavBar, setExpandNavBar] = useState(false);
  const [showIssue, setShowIssue] = useState(false);
  const [issue, setIssue] = useState([
    {
      from: "adaafasff",
      msg: "adasfasfffffffffffffffffffffffff",
    },
    {
      from: "adaafasff",
      msg: "adasfasfffffffffffffffffffffffff",
    },
    {
      from: "adaafasff",
      msg: "adasfasfffffffffffffffffffffffff",
    },
    {
      from: "adaafasff",
      msg: "adasfasfffffffffffffffffffffffff",
    },
  ]);
  const sideNaveData = [
    {
      label: "Overview",
      isActive: true,
      path: "/EmployerDashboard",
      icon: <IoLayersSharp size={24} className="hover:text-blue-500 mr-2" />,
    },
    {
      label: "Post Job",
      path: "/EmployerDashboard/dashboard/postjob",
      isActive: false,
      icon: (
        <PiShoppingBagOpenLight
          size={24}
          className="hover:text-blue-500 mr-2"
        />
      ),
    },
    {
      label: "My Jobs",
      path: "/EmployerDashboard/dashboard/myjob",
      isActive: false,
      icon: <BsBookmark size={24} className="hover:text-blue-500 mr-2" />,
    },
    {
      label: "Applications",
      path: "/EmployerDashboard/dashboard/all_applications",
      isActive: false,
      icon: (
        <PiBellSimpleRinging size={24} className="hover:text-blue-500 mr-2" />
      ),
    },
    {
      label: "Schedules",
      path: "/EmployerDashboard/dashboard/schedules",
      isActive: false,
      icon: (
        <PiBellSimpleRinging size={24} className="hover:text-blue-500 mr-2" />
      ),
    },
    {
      label: "Settings",
      path: "/EmployerDashboard/dashboard/settings",
      isActive: false,
      icon: (
        <IoSettingsOutline size={24} className="hover:text-blue-500 mr-2" />
      ),
    },
    {
      label: "LogOut",
      path: "/",
      icon: (
        <IoIosLogOut
          size={18}
          className="hover:text-blue-500 mr-2"
          style={{ transform: "rotate(220deg)" }}
        />
      ),
    },
  ];

  return user==null ? (
    navigate("/login")
  ) : (
    <>
      <EmpNavBar />
      {/* navbar */}
      <div className="flex    bg-gray-300 md:bg-white md:flex-row justify-around py-3">
        <Link to={"/"} className="flex gap-1 items-center justify-start">
          <PiBriefcaseLight className="w-20 h-7 text-blue-500" />
          <p className="font-bold">IJC</p>
        </Link>

        <div className="flex  md:justify-center gap-2">
          <button className="text-blue-500 px-7 py-3 border border-white rounded-md ">
            <PiBellRingingBold
              onClick={() => setShowIssue(!showIssue)}
              className="hover:scale-150"
            />
            {showIssue && (
              <div className="absolute w-52 mt-5 -ml-20 text-black space-y-1  transition-all duration-1000 ease-in-out bg-gray-300  p-2 rounded-md">
                {issue.map((val, index) => {
                  return (
                    <div className="border-b-[1px] flex flex-col   border-blue-500 w- py-3 hover:bg-blue-500  hover:text-white">
                      <p>issue</p>
                    </div>
                  );
                })}
              </div>
            )}
          </button>

          <button className="border  border-blue-500 px-7 hover:text-white  hover:border-white text-blue-500 hover:bg-blue-500 hover:rounded-md transition-all ease-in-out duration-300">
            <Link
              to={"/EmployerDashboard/dashboard/postjob"}
              className=" font-semibold "
            >
              {" "}
              Post A Job{" "}
            </Link>
          </button>

          <div className="cursor-pointer">
            <img
              src={`http://localhost:8000/media/${user.logo}`}
              width={40}
              className=" rounded-full"
              alt=""
            />
          </div>
          <div></div>
        </div>
      </div>

      <div className="flex  border-t-[1px] border-gray-300 ">
        {/* side bar */}
        <div className="pl-4 lg:ml-32 border-r-[1px] border-gray-300 py-5 ">
          <div className="flex gap-3 pr-3">
            <h1
              className={`text-gray-500   w-full  lg:pr-10   ${
                !fullSideBar ? "hidden" : "block"
              }`}
            >
              DASHBOARD
            </h1>
            <button
              onClick={() => setFullSideBar(!fullSideBar)}
              className="lg:collapse text-blue-500 font-bold px-3"
            >
              {!fullSideBar ? (
                <RxHamburgerMenu size={25} />
              ) : (
                <CiCircleRemove size={25} />
              )}
            </button>
          </div>
          {/* Start Of Side Nave*/}
          <div className="flex flex-col  mt-4">
            {sideNaveData.map((item, index) => (
              <Link
                to={item.label!="LogOut"&&item.path}
                state={item.label == "Applications" ? "*" : ""}
                key={index}
                className={`block transition-none   ${
                  fullSideBar && "w-64"
                } hover:transition-none hover:bg-blue-50 hover:border-l-[3px] hover:border-blue-500 pl-3 pr-10 lg:pr-28 py-2 hover:text-blue-500 active:text-blue-500 active:border-l-[3px] active:border-blue-500 ${
                  item.path == url_path && "bg-blue-50"
                }`}
                onClick={item.label == "LogOut" && (() => {
                  
                    localStorage.removeItem("authedUserData");
                    localStorage.removeItem("user");
                    setTimeout(() => {
                      navigate("/login");
                    }, 0);
                  
                })}
              >
                <span
                  className={
                    item.isActive
                      ? "flex align-middle text-blue-500"
                      : "flex align-middle"
                  }
                >
                  {item.icon}

                  <p className={`lg:block ${fullSideBar ? "block" : "hidden"}`}>
                    {item.label}
                  </p>
                </span>
              </Link>
            ))}
          </div>
          {/* End Of Side Nave*/}
        </div>
        <div className="w-full h-full px-1 lg:px-16 py-5">
          {profile_full == false && (
            <div className="border mb-3 px-5 h-20  bg-red-100 rounded-md flex py-2 justify-between items-center">
              <p className="text-sm lowercase font-semibold">
                Complete your profile to get full performance of{" "}
                <span className="uppercase">ijc</span>
              </p>{" "}
              <button
                onClick={() => {
                  navigate("/EmployerDashboard/dashboard/settings");
                }}
                className="hover:bg-blue-500 px-3 py-1 rounded-md hover:text-white text-blue-500 underline hover:no-underline"
              >
                Complete Profile
              </button>
            </div>
          )}
          <Routes>
            <Route path="/" element={<OverView />} />
            <Route
              path="dashboard/postjob"
              element={<PostJob id={user.id} />}
            />
            <Route path="dashboard/myjob" element={<MyJob id={user.id} />} />
            <Route
              path="dashboard/updateJob"
              element={<UpdateJob id={user.id} />}
            />
            <Route
              path="dashboard/job_application"
              element={<ApplicationPerJob />}
            />
            <Route
              path="dashboard/all_applications"
              element={<Applications />}
            />
            <Route path="dashboard/schedules" element={<Schedules />} />
            <Route
              path="dashboard/settings"
              element={<UpdateEmployer employer={user} />}
            />
          </Routes>
        </div>
      </div>
    </>
  );
};
export default EmployerDashboard;
