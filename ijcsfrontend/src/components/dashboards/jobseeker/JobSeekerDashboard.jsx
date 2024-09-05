import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { IoLayersSharp } from "react-icons/io5";
import { IoSettingsOutline } from "react-icons/io5";
import { PiBellSimpleRinging } from "react-icons/pi";
import { FaBell } from "react-icons/fa";
import { IoIosLogOut } from "react-icons/io";
import { BsBookmark } from "react-icons/bs";
import { PiShoppingBagOpenLight } from "react-icons/pi";

import OverView from "./OverView";
import AppliedJobs from "./AppliedJobs";
import Settings from "./Settings";
import FavoriteJobs from "./FavoriteJobs";
import JobsAlert from "./JobsAlert";
import MessageComponet from "./messagecomponet";
// import JobDetails from "./JobDetails";
import axios from "axios";

const JobSeekerDashbord = () => {
  const autedUserData =
    useLocation()?.state?.data || JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();
  const [authedJobSeekerData, setAuthedJobSeekerData] = useState(null);
  const [sideNaveData, setSideNaveData] = useState([
    {
      label: "Overview",
      isActive: true,
      icon: <IoLayersSharp size={24} className="hover:text-blue-500 mr-2" />,
    },
    {
      label: "Applied Jobs",
      isActive: false,
      icon: (
        <PiShoppingBagOpenLight
          size={24}
          className="hover:text-blue-500 mr-2"
        />
      ),
    },
    {
      label: "Favorite Jobs",
      isActive: false,
      icon: <BsBookmark size={24} className="hover:text-blue-500 mr-2" />,
    },
    {
      label: "Jobs Alert",
      isActive: false,
      icon: (
        <PiBellSimpleRinging size={24} className="hover:text-blue-500 mr-2" />
      ),
    },
    {
      label: "Settings",
      isActive: false,
      icon: (
        <IoSettingsOutline size={24} className="hover:text-blue-500 mr-2" />
      ),
    },
  ]);
  const [activeComponent, setActiveComponent] = useState("Overview");

  const handleComponentChange = (label) => {
    setActiveComponent(label);
    const updatedData = sideNaveData.map((item) =>
      item.label === label
        ? { ...item, isActive: true }
        : { ...item, isActive: false }
    );
    setSideNaveData(updatedData);
  };

  const renderActiveComponent = () => {
    switch (activeComponent) {
      case "Overview":
        return <OverView handleComponentChange={handleComponentChange} />;
      case "Applied Jobs":
        return <AppliedJobs />;
      case "Favorite Jobs":
        return <FavoriteJobs />;
      case "Jobs Alert":
        return <JobsAlert handleComponentChange={handleComponentChange} />;
      case "Settings":
        return <Settings />;
      case "Job Details":
        return <JobDetails />;
      default:
        return null;
    }
  };
  const loadJobSeeker = async () => {
    if (autedUserData.id !== null) {
      try {
        const { data } = await axios.get(
          `http://localhost:8000/candidate/all/${autedUserData.id}/`
        );

        setAuthedJobSeekerData(data);
      } catch (error) {
        const popupContainer = document.createElement("div");
        popupContainer.className =
          "fixed top-0 left-0 w-screen h-screen flex justify-center items-center bg-black bg-opacity-50 z-[1000]";

        const popup = document.createElement("div");
        popup.className =
          "bg-white text-center py-9 px-6 w-[40%] rounded shadow-lg";

        const message = document.createElement("p");
        message.textContent = `Data Loading Error Of: ${error.message}`;
        message.className = "text-lg text-gray-800 mb-4";
        popup.appendChild(message);

        const okButton = document.createElement("button");
        okButton.textContent = "OK";
        okButton.className =
          "text-sm text-blue-500 focus:outline-none bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded";
        okButton.addEventListener("click", () => {
          document.body.removeChild(popupContainer);
        });
        popup.appendChild(okButton);

        popupContainer.appendChild(popup);
        document.body.appendChild(popupContainer);
      }
    }else{
      navigate('/login')
    }
  };
  useEffect(() => {
    const logoutChannel = new BroadcastChannel("logoutChannel");

    logoutChannel.onmessage = () => {
      localStorage.removeItem("user");
      navigate("/login"); // Redirect to login page using React Router, adjust the path as needed
    };

    loadJobSeeker();

    return () => {
      logoutChannel.close();
    };
  }, [navigate]);

  const handleLogout = () => {
    const logoutSignal = Date.now().toString();
    localStorage.setItem("logoutSignal", logoutSignal);
    new BroadcastChannel("logoutChannel").postMessage(logoutSignal);
  };

  return (
    <>
      {/* {authedJobSeekerData.profile_picture} */}
      {authedJobSeekerData && autedUserData.id ? (
        <div>
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
                {/* staritng */}
                <FaBell className="text-gray-500 mr-3" />
                <div className="flex justify-center mx-4 border-b-[1px] border-t-[1px] border-gray-500">
                  <div>
                    <MessageComponet user={autedUserData} />
                  </div>
                </div>
                {/* ending */}
              </span>
              <div className="w-[9%] mr-2 bg-blue-50 h-14 rounded-[100%]">
                <img
                  src={authedJobSeekerData?.profile_picture}
                  className="rounded-[100%] w-full h-full"
                />
              </div>
            </div>
          </div>
          <div className="flex justify-center mx-4 border-b-[1px] border-t-[1px] border-gray-500">
            {/* <div>
              <MessageComponet />
            </div> */}
            <div className="w-[30%] border-r-[1px] border-gray-500 py-5 pt-16">
              <h1 className="text-gray-500 text-right w-full pr-10">
                CANDIDATE DASHBOARD
              </h1>
              {/* Start Of Side Nave*/}
              <div className="flex flex-col float-end mt-4">
                {sideNaveData.map((item, index) => (
                  <button
                    onClick={() => handleComponentChange(item.label)}
                    key={index}
                    className={
                      item.isActive
                        ? "block transition-none w-64 hover:transition-none hover:bg-blue-50 border-l-[3px] border-blue-500 pl-3 pr-28 py-2 hover:text-blue-500 active:text-blue-500 active:border-l-[3px] active:border-blue-500 bg-blue-50"
                        : "block transition-none w-64 hover:transition-none hover:bg-blue-50 hover:border-l-[3px] hover:border-blue-500 pl-3 pr-28 py-2 hover:text-blue-500 active:text-blue-500 active:border-l-[3px] active:border-blue-500"
                    }
                  >
                    <span
                      className={
                        item.isActive
                          ? "flex align-middle text-blue-500"
                          : "flex align-middle"
                      }
                    >
                      {item.icon}
                      {item.label}
                    </span>
                  </button>
                ))}
                <div className="w-full flex items-center justify-start">
                  <button
                    className="w-full ps-4 flex justify-start items-center py-2 hover:text-blue-500 hover:bg-blue-50 hover:border-l-[3px] hover:border-blue-500"
                    onClick={handleLogout}
                  >
                    <IoIosLogOut
                      size={22}
                      className="hover:text-blue-500 mr-2"
                      style={{ transform: "rotate(220deg)" }}
                    />
                    Logout
                  </button>
                </div>
              </div>
              {/* End Of Side Nave*/}
            </div>
            <div className="w-[70%] ps-[2%] p-[5%]">
              {renderActiveComponent()}
            </div>
          </div>
        </div>
      ) : (
        // Content to display when authedJobSeekerData is null
        <div className="mx-auto text-center py-24">
          <p className="">Please log in to view the content. login</p>
          <Link to={'/login'} className="">Here</Link>
        </div>
      )}
    </>
  );
};
const MemoizedJobSeekerDashboard = React.memo(JobSeekerDashbord);
// export default JobSeekerDashbord;
export default MemoizedJobSeekerDashboard;
