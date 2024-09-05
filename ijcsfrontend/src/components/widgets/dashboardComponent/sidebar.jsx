import React from "react";
import { Link } from "react-router-dom";
function SideBar() {
  const linkList = [
    {
      path: "/EmployerDashboard/dashboard",
      text: "Dashboard",
    },
    {
      path: "/EmployerDashboard/post",
      text: "Post Job",
    },
    {
      path: "EmployerDashboard/postedJob",
      text: "My Job",
    },
    {
      path: "/applications",
      text: "Applications",
    },
    {
      path: "/schedules",
      text: "Schedules",
    },

    {
      path: "/settings",
      text: "Settings",
    },
  ];

  return (
    <div className="w-64 bg-white p-4 shadow-lg">
      <div className="h-20 text-center">
        <h2 className="text-2xl font-bold mb-4 ">IJC</h2>
      </div>

      <div>
        {linkList.map((value, index) => {
          return (
            <Link to={value.path} key={index}>
              <button
                className={`hover:bg-blue-500 text-start w-full py-3 px-2   `}
              >
                {value.text}
              </button>
              <hr />
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default SideBar;
