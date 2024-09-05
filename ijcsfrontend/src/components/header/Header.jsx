import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FiPhoneCall } from "react-icons/fi";
import { PiBriefcaseLight } from "react-icons/pi";
import { GrSearch } from "react-icons/gr";
import { RxHamburgerMenu } from "react-icons/rx";
import { CiCircleRemove } from "react-icons/ci";
import { Input, Option, Select } from "@material-tailwind/react";

const Header = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

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
  const Toggle = () => {
    setExpandNavBar(!expandNavBar);
  };
  // const handleMouseEnter = () => {
  //   navigate("/find-job");
  // };
  const handleMouseEnter = () => {
    navigate(`/find-job?searchQuery=${searchQuery}`);
  };
  const handleInputChange = (e) => {
    const newSearchQuery = e.target.value;
    setSearchQuery(newSearchQuery);

    // Update the URL with the new search query
    const currentPath = location.pathname;
    const newUrl = `${currentPath}?searchQuery=${encodeURIComponent(
      newSearchQuery
    )}`;
    navigate(newUrl);
  };

  return (
    <>
      <nav className="">
        <div className="flex flex-col bg-black text-white md:text-black md:flex-row justify-around py-3 px-5   gap-5 md:gap-0 md:bg-gray-100  md:h-12 ">
          <div className="flex justify-between md:collapse">
            <Link to={"/"} className="flex gap-1 items-center">
              <PiBriefcaseLight className="w-10 h-7 text-blue-500" />
              <p className="font-bold">IJC</p>
            </Link>

            <div onClick={Toggle} className="flex justify-end  cursor-pointer ">
              {!expandNavBar ? (
                <RxHamburgerMenu size={35} />
              ) : (
                <CiCircleRemove size={35} />
              )}
            </div>
          </div>
          <div
            className={`flex ${
              !expandNavBar
                ? "flex-row hidden md:flex"
                : "flex flex-col transition-all duration-700 ease-in-out"
            }  md:flex-row gap-5  md:gap-5 lg:gap-20`}
          >
            <Link
              to={"/"}
              className="hover:border-b-2 hover:border-blue-500 hover:text-blue-500 font-medium  transition-all duration-200"
            >
              Home
            </Link>
            <Link
              to={"/find-job"}
              className="hover:border-b-2 hover:border-blue-500 hover:text-blue-500 font-medium transition-all duration-200"
            >
              Find job
            </Link>
            <Link className="hover:border-b-2 hover:border-blue-500 hover:text-blue-500 font-medium transition-all duration-200">
              Employers
            </Link>
            <Link
              to={
                JSON.parse(localStorage.getItem("user"))
                  ? "/jobseeker-dashboard"
                  : "/login"
              }
              className="hover:border-b-2 hover:border-blue-500 hover:text-blue-500 font-medium transition-all duration-200"
            >
              Job seekers
            </Link>
            <Link className="hover:border-b-2 hover:border-blue-500 hover:text-blue-500 font-medium transition-all duration-200">
              Custromer Support
            </Link>
          </div>

          <div className="hidden md:block md:px-10">
            <div className="flex gap-3 items-center">
              <FiPhoneCall />
              <a
                href="tel:+251965-847366"
                className="hover:border-b-2 hover:border-blue-500 hover:text-blue-500 font-medium"
              >
                <p>(+251)-965-847366</p>
              </a>
            </div>
          </div>
        </div>

        {!currentPath.includes("/AdminDashboard") && (
          <div className="flex flex-col gap-4 px-2  w-full bg-gray-300 md:bg-white md:flex-row justify-center py-3 lg:pl-52">
            <div> </div>

            <Link to={"/"} className="hidden  md:flex gap-1 items-center">
              <PiBriefcaseLight className="w-10 h-7 text-blue-500" />
              <p className="font-bold">IJC</p>
            </Link>

            <div>
              <Select
                size="lg"
                label="Region"
                name="region"
                id="region"
                // className="py-3 px-5 w-full md:w-44 "
                onChange={(e) => setRegion(e.target.value)}
              >
                {regionslist.map((value, index) => {
                  return (
                    <Option key={index} value={value}>
                      {value}
                    </Option>
                  );
                })}
              </Select>
            </div>
            <Input
              size="lg"
              type="text"
              name="search"
              id="search"
              label="Job title , keyword , company"
              className="outline-none md:w-full h-auto w-full md:h-auto bg-gray-300 md:bg-white text-black"
              icon={<GrSearch className="text-blue-500" />}
              onMouseEnter={handleMouseEnter}
              value={searchQuery}
              onChange={handleInputChange}
            />

            <div className="flex gap-5 w-full justify-start md:justify-center">
              <Link
                to={"/login"}
                className="text-blue-500 px-7 py-3 border border-blue-500  rounded-md hover:bg-blue-500 hover:text-white"
              >
                <button>Sign in</button>
              </Link>
              <button className="border text-white bg-blue-500 px-7 rounded-md hover:bg-white hover:text-blue-500 hover:border-blue-500">
                <Link to={"/register"}>Post Jobs</Link>
              </button>
            </div>
          </div>
        )}
      </nav>
    </>
  );
};

export default Header;
