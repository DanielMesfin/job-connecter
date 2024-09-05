import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FiPhoneCall } from "react-icons/fi";
import { PiBriefcaseLight } from "react-icons/pi";
import { GrSearch } from "react-icons/gr";

const EmpNavBar = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  console.log(currentPath);

  const regionslist = [
    "Addis Ababa",
    "Afar Region",
    "Amhara Region",
    "Benishangul-Gumuz Region",
    "Dire Dawa",
    "Gambela Region",
    "Harari Region",
    "Oromia Region",
    "Sidama Region",
    "Somali Region",
    "South Ethiopia Region",
    "South Western Ethiopia",
    "Southern Nations, Nationalities, and Peoples' Region",
    "Tigray Region",
  ];
  const [selectedNav, setSelectedNav] = useState("Home");
  const [region, setRegion] = useState(regionslist[0]);

  const [expandNavBar, setExpandNavBar] = useState(false);

  return (
    <>
      <nav className="">
        <div className="flex flex-col bg-black text-white md:text-black md:flex-row justify-around py-3 px-5   gap-5 md:gap-0 md:bg-gray-100  md:h-12 ">
          <div className="flex flex-col md:flex-row gap-5  md:gap-5 lg:gap-20">
            <Link
              to={"/"}
              className="hover:border-b-2 hover:border-blue-500 hover:text-blue-500 font-medium  transition-all duration-200"
            >
              Home
            </Link>
            <Link className="hover:border-b-2 hover:border-blue-500 hover:text-blue-500 font-medium transition-all duration-200">
              Find job Seeker
            </Link>
            <Link to={"/EmployerDashboard"}  className="hover:border-b-2 hover:border-blue-500 hover:text-blue-500 font-medium transition-all duration-200">
              Dashboard
            </Link>
            <Link to={"/EmployerDashboard/dashboard/applications"} className="hover:border-b-2 hover:border-blue-500 hover:text-blue-500 font-medium transition-all duration-200">
              Applications
            </Link>
            <Link to={"/EmployerDashboard/dashboard/myjob"} className="hover:border-b-2 hover:border-blue-500 hover:text-blue-500 font-medium transition-all duration-200">
              My Job
            </Link>
            <Link className="hover:border-b-2 hover:border-blue-500 hover:text-blue-500 font-medium transition-all duration-200">
              Custromer Support
            </Link>
          </div>

          <div className="md:px-10">
            <div className="flex gap-3 items-center">
              <FiPhoneCall />
              <a href="tel:+251965-847366" className="hover:border-b-2 hover:border-blue-500 hover:text-blue-500 font-medium">
                <p>(+251)-965-847366</p>
              </a>
            </div>
          </div>
        </div>

        {/* {!currentPath.includes("/login") || */}
           {/* (!currentPath.includes("/registerEmployer") && ( */}
            
          {/* ))} */}
      </nav>
    </>
  );
};

export default EmpNavBar;
