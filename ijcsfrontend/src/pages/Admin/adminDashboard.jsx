import React, { useState } from "react";
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
import { IoIosLogOut } from "react-icons/io";
import { BsBookmark } from "react-icons/bs";
import { PiShoppingBagOpenLight } from "react-icons/pi";
import { PiBellRingingBold } from "react-icons/pi"; 
import Schedules from "./schedule";
import EmpNavBar from "./navbar";
import OverView from "./overview";
import { useUserContext } from "../../context/context";
import UpdateAdmin from "./updateAdmin";
import AddSubAdmin from "./add_sub_admin";
import JobActivation from "./job_activation";
import JobDetail4Admin from "./job_detail_admin";
import { RxHamburgerMenu } from "react-icons/rx";
import { CiCircleRemove } from "react-icons/ci";
import NumberOfIssue from "./view_issue_report";
import { Avatar } from "@material-tailwind/react";
import IssuePerJob from "./issue_list_per_job";
import Applications from "../Employer/applications";
// Key Of Object

const AdminDashboard = () => {
  const { user } = useUserContext();
  const navigate = useNavigate();
  const url_path = useLocation().pathname;
  const [fullSideBar, setFullSideBar] = useState(false);
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
      path: "/AdminDashboard",
      icon: <IoLayersSharp size={24} className="hover:text-blue-500 mr-2" />,
    },

    {
      label: "Activation Requests",
      path: "/AdminDashboard/dashboard/job_activation",
      isActive: false,
      icon: <BsBookmark size={24} className="hover:text-blue-500 mr-2" />,
    },
    {
      label: "View Issue Report",
      path: "/AdminDashboard/dashboard/job_issue",
      isActive: false,
      icon: <BsBookmark size={24} className="hover:text-blue-500 mr-2" />,
    },
    {
      label: "Settings",
      path: "/AdminDashboard/dashboard/settings",
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

  user.access_level == "super_admin" &&
    sideNaveData.push({
      label: "Add SubAdmin",
      path: "/AdminDashboard/dashboard/add_sub_admin",
      isActive: false,
      icon: (
        <PiShoppingBagOpenLight
          size={24}
          className="hover:text-blue-500 mr-2"
        />
      ),
    });
  return (
    <>
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

          <div className="cursor-pointer">
            <Avatar
              src={`http://localhost:8000${user.profile_picture}`}
              width={40}
              className=" rounded-full"
              alt=""
            />
          </div>
        </div>
      </div>

      <div className="flex  border-t-[1px] border-gray-300 ">
        {/* side bar */}
        <div className="pl-4 lg:ml-32 border-r-[1px] border-gray-300 py-5 ">
          <div className="flex gap-3 ">
            <h1
              className={`text-gray-500   w-full  lg:pr-10 lg:block  pl-4  ${
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
          <div className="flex flex-col  mt-4 py-5">
            {sideNaveData.map((item, index) => (
              <Link
                to={item.path}
                key={index}
                className={`block transition-none  border-blue-500  ${
                  fullSideBar && "w-64"
                } hover:transition-none hover:bg-blue-50 hover:border-l-[3px] hover:border-blue-500 pl-3  py-2 hover:text-blue-500 active:text-blue-500 active:border-l-[3px] active:border-blue-500 ${
                  item.path == url_path && "bg-blue-50"
                }`}
              >
                <span
                  className={
                    item.isActive
                      ? "flex align-middle text-blue-500 "
                      : "flex align-middle"
                  }
                >
                  {item.icon}
                  <p
                    className={`lg:block ${
                      fullSideBar ? "block w-full" : "hidden"
                    }`}
                  >
                    {item.label}
                  </p>
                </span>
              </Link>
            ))}
          </div>
          {/* End Of Side Nave*/}
        </div>
        <div className="w-full h-full px-1 py-5">
          <Routes>
            <Route path="/" element={<OverView />} />
            <Route
              path="dashboard/add_sub_admin"
              element={<AddSubAdmin id={user.id} />}
            />
            <Route
              path="dashboard/job_activation"
              element={<JobActivation id={user.id} />}
            />
            <Route path="dashboard/applications" element={<Applications />} />
            <Route path="dashboard/job_issue" element={<NumberOfIssue />} />
            <Route path="dashboard/schedules" element={<Schedules />} />
            <Route path="dashboard/job_detail" element={<JobDetail4Admin />} />
            <Route
              path="dashboard/job_issue_per_job"
              element={<IssuePerJob />}
            />
            <Route
              path="dashboard/settings"
              element={<UpdateAdmin employer={user} />}
            />
          </Routes>
        </div>
      </div>
    </>
  );
};
export default AdminDashboard;
