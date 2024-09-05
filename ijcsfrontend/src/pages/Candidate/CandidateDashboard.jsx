import React, { useState } from "react";
import { Link } from "react-router-dom";
import { IoIosNotifications } from "react-icons/io";
import placeholder from "../../assets/images/person.jpg";
import ApplyJob from "./ApplyJob"
import Dashboard from "./Dashboard";

const CandidateDashboard = () => {
  const [activeLink, setActiveLink] = useState("Dashboard");
  const linkList = [
    {
      path: "/CandidateDashboard/dashboard",
      text: "Dashboard",
    },
    {
      path: "/CandidateDashboard/apply",
      text: "Apply Job",
    },
    {
      path: "/applyJob",
      text: "My Applications",
    },

    {
      path: "/settings",
      text: "Settings",
    },
  ];

  const renderContent = () => {
    switch (activeLink) {
      case "Dashboard":
        return <Dashboard />;
      case "Post Job":
        return <ApplyJob />;
      default:
        return null;
    }
  };

  return (
    <>
    <div className="flex h-screen bg-gray-200 ">
      {/* Sidebar */}
      <div className="w-64 bg-white p-4 shadow-lg">
        <h2 className="text-2xl font-bold mb-4">IJC</h2>
        <div>
          {linkList.map((value, index) => {
            return (
              <Link to={value.path} key={index}>
                <button
                  onClick={() => setActiveLink(value.text)}
                  className={`hover:bg-blue-500 text-start w-full py-3 px-2 ${
                    activeLink == value.text
                      ? "bg-blue-500 font-semibold text-gray-100"
                      : ""
                  } `}
                >
                  {value.text}
                </button>
                <hr />
              </Link>
            );
          })}
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 p-10s ">
        {/* Navbar */}
        <div className="flex justify-between mb-8 bg-white shadow-lg rounded-bl-3xl rounded-br-3xl ">
          <h2 className="text-2xl font-bold ">Navbar</h2>
          <div className="flex gap-3 ">
            <button>
              <IoIosNotifications color="blue" className="w-32 h-6" />
            </button>

            <img
              className="bg-green-400 rounded-full h-16 w-16 flex items-center justify-center"
              src={placeholder}
              alt=""
              srcSet=""
            />
          </div>
        </div>

        {/* Dashboard content */}
        <div className="bg-white p-4 shadow-lg w-full h-full">
          {renderContent()}
        </div>
      </div>
    </div>
    </>
    
  );
};

export default CandidateDashboard;
