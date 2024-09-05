import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import UserRedirection from "../components/userRedirection";
import jseeker from "../assets/images/hp.png";
import { PiBriefcaseLight } from "react-icons/pi";
import { GrSearch } from "react-icons/gr";
import { GoPeople } from "react-icons/go";
import { HiBuildingOffice2 } from "react-icons/hi2";

import { GoPerson } from "react-icons/go";
import { LuUploadCloud } from "react-icons/lu";
import { FcApproval } from "react-icons/fc";

import { IoLocationOutline } from "react-icons/io5";
import { CiBookmark } from "react-icons/ci";

import fb from "../assets/images/logo_facebook.jpg";

const HomePage = () => {
  const navigate = useNavigate();

  const redirectToRegisterEmployer = () => {
    navigate("/registerEmployer");
  };
  const redirectToLogin = () => {
    navigate("/login");
  };

  const redirectToJobSeeker = () => {
    navigate("/jobSeeker");
  };

  const data = [
    {
      label: "Live Job",
      icon: (
        <PiBriefcaseLight size={30} color="white" className="text-blue-500" />
      ),
      number: "12,345",
    },
    {
      label: "Companies",
      icon: (
        <HiBuildingOffice2 size={30} color="white" className="text-blue-500" />
      ),
      number: "12,345",
    },
    {
      label: "Candidates",
      icon: <GoPeople size={30} color="white" className="text-blue-500" />,
      number: "12,345",
    },
    {
      label: "Live Job",
      icon: (
        <PiBriefcaseLight size={30} color="white" className="text-blue-500" />
      ),
      number: "12,345",
    },
  ];
  const RoundArrow = (props) => {
    return (
      <div className={`${props.angle && ""}`}>
        <div
          className={`graph__wrapper relative left-[57%] bottom-[2rem] scale-y-[-1] text-blue-500 ${
            props.angle && "rotate-180  left-[7%]"
          }`}
        >
          <svg
            width="41%"
            height={"80"}
            viewBox="0 0 435 80"
            version="1.1"
            style={{ overflow: "visible" }}
            transform="rotate(-15)"
          >
            <g
              id="Page-1"
              stroke="none"
              strokeWidth="1"
              fill="none"
              fillRule="evenodd"
              sketchType="MSPage"
            >
              {/* Dashed path */}
              <path
                strokeDasharray="20,25"
                className="dashed"
                fill=""
                stroke="black" // Changed color to black
                strokeWidth="2" // Thinner dashed line
                strokeLinejoin="round"
                strokeMiterlimit="10"
                d="M1.4,7.5c0,10,40,57,211.5,151.5s272.5-0.5,289,1"
              />

              {/* Arrowhead */}
              <polyline
                id="arrow"
                points="0,-9 18,0 0,9 5,0"
                fill="black" // Changed color to black
                transform={`${
                  props.angle ? "translate(0,0)" : "translate(500, 159)"
                }`} // Increased bending angle
                className={`${props.angle && "rotate-180"}`}
              />
            </g>
          </svg>
        </div>
      </div>
    );
  };

  const ijcsSteps = [
    {
      icon: <GoPerson size={30} className="text-blue-500" />,
      title: "Create Account",
      desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit.Lorem ipsum dolor sit amet consectetur adipisicing elit.",

      arrow: <RoundArrow />,
    },
    {
      icon: <LuUploadCloud size={30} className="text-blue-500" />,
      title: "Upload / Make CV",
      desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit.Lorem ipsum dolor sit amet consectetur adipisicing elit.",
      arrow: <RoundArrow angle={180} />,
    },
    {
      icon: <GrSearch size={30} className="text-blue-500" />,
      title: "Find Suitable Job",
      desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit.Lorem ipsum dolor sit amet consectetur adipisicing elit.",
      arrow: <RoundArrow />,
    },
    {
      icon: <FcApproval size={30} className="text-blue-500" />,
      title: "Apply Job",
      desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit.Lorem ipsum dolor sit amet consectetur adipisicing elit.",
      arrow: null,
    },
  ];

  const featuredJob = [
    {
      title: "Technical Support Specialist",
      jobType: "Full Time",
      sallary: "100,000",
      logo: { fb },
      companyName: "Facebook inc",
      companyLocation: "Addis Ababa",
    },
    {
      title: "Technical Support Specialist",
      jobType: "Full Time",
      sallary: "100,000",
      logo: { fb },
      companyName: "Facebook inc",
      companyLocation: "Addis Ababa",
    },
    {
      title: "Technical Support Specialist",
      jobType: "Full Time",
      sallary: "100,000",
      logo: { fb },
      companyName: "Facebook inc",
      companyLocation: "Addis Ababa",
    },
    {
      title: "Technical Support Specialist",
      jobType: "Full Time",
      sallary: "100,000",
      logo: { fb },
      companyName: "Facebook inc",
      companyLocation: "Addis Ababa",
    },
    {
      title: "Technical Support Specialist",
      jobType: "Full Time",
      sallary: "100,000",
      logo: { fb },
      companyName: "Facebook inc",
      companyLocation: "Addis Ababa",
    },
    {
      title: "Technical Support Specialist",
      jobType: "Full Time",
      sallary: "100,000",
      logo: { fb },
      companyName: "Facebook inc",
      companyLocation: "Addis Ababa",
    },
    {
      title: "Technical Support Specialist",
      jobType: "Full Time",
      sallary: "100,000",
      logo: { fb },
      companyName: "Facebook inc",
      companyLocation: "Addis Ababa",
    },
    {
      title: "Technical Support Specialist",
      jobType: "Full Time",
      sallary: "100,000",
      logo: { fb },
      companyName: "Facebook inc",
      companyLocation: "Addis Ababa",
    },
    {
      title: "Technical Support Specialist",
      jobType: "Full Time",
      sallary: "100,000",
      logo: { fb },
      companyName: "Facebook inc",
      companyLocation: "Addis Ababa",
    },
  ];

  const popularCategory = [
    {
      icon: "",
      category: "",
      openPlaces: "",
    },
  ];

  return (
    <div className="bg-gray-100 px-3 md:px-10  lg:px-44  lg:py-20">
      <div className="grid md:grid-cols-2  ">
        <div className="space-y-4 py-10 md:py-32  ">
          <h1 className="text-5xl font-semibold lg:w-[90%]">
            Find a job that suits your interest & skills.
          </h1>
          <p className="w-2/3">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.Lorem ipsum
            dolor sit amet consectetur adipisicing elit.
          </p>
          <div className="md:border  md:h-16 flex space-y-2 md:space-y-0 flex-col md:flex-row md:justify-evenly   md:bg-white">
            <div className="flex items-center pl-3 w-full h-full bg-white">
              <label htmlFor="os" className="text-blue-500 cursor-pointer ">
                <GrSearch className="text-blue-500 cursor-pointer" />
              </label>
              <input
                type="text"
                name="ordinary_search"
                id="os"
                placeholder="job title , keyword ..."
                className="outline-none border-none  focus:border-none px-3 h-12 w-full  md:h-full md:w-auto"
              />
            </div>

            <div className="flex items-center pl-3 w-full h-full bg-white">
              <label
                htmlFor="search_location"
                className="text-blue-500 cursor-pointer"
              >
                <IoLocationOutline className="text-blue-500" />
              </label>

              <input
                type="text"
                name="search_location"
                id="search_location"
                placeholder="Your Location "
                className="outline-none border-none px-3 h-12 md:h-full w-full"
              />
            </div>

            <button className="bg-blue-500  px-5 rounded text-white h-12 md:w-2/6 w-full  md:h-auto border">
              Find Job
            </button>
          </div>

          <p className="text-xs text-gray-800">
            <span className="text-gray-400">Suggestion :</span> Designer ,
            Programmer , Digital Marketing , video Editing ...
          </p>
        </div>
        <div className="w-full h-full md:py-18">
          <img
            src={jseeker}
            alt="job-seeker"
            className="w-full"
            width={100}
            height={100}
          />
        </div>
      </div>

      {/* data analytics */}
      <div className="grid grid-cols-2  md:grid-cols-4 md:px-[10%] gap-[30%] h-20">
        {data.map((value, index) => {
          return (
            <div
              key={index}
              className="border w-44 bg-white flex items-center py-2 px-3 gap-3 rounded-md mb-2"
            >
              <div className="bg-blue-300 p-3 rounded-md">{value.icon}</div>
              <div>
                <p className="font-bold">{value.number}</p>
                <p className="text-sm text-gray-500">{value.label}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* how ijc works */}
      <div className="py-10">
        <h1 className="text-center font-bold py-4">How IJC works</h1>
        <div className="grid space-y-4 md:grid-cols-4 justify-center items-center">
          {ijcsSteps.map((value, index) => {
            return (
              <div
                key={index}
                className={`flex flex-col justify-center items-center  px-5 py-3 hover:bg-white duration-700 transition-all odd:bg-white gap-5 even:border-white border-4`}
              >
                <p className="text-xs font-bold lg:hidden">step {index + 1}</p>
                <div className="border p-5 rounded-full bg-white">
                  {value.icon}
                </div>
                <p className="font-bold">{value.title}</p>
                <p className="text-sm text-gray-500 text-center">
                  {value.desc}
                </p>
                <div className="absolute hidden xl:block w-[20%]">
                  {value.arrow}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* featured job */}

      <div className="">
        <div className="flex justify-between">
          <p className="font-bold">Featured Job</p>
          <Link to={"/login"}>
            <button className="border border-blue-500 px-5 py-2 text-blue-500 font-semibold rounded">
              View All
            </button>
          </Link>
        </div>
        <div className="grid space-y-2  md:grid-cols-3 space-x-2 p-3">
          {featuredJob.map((value, index) => {
            return (
              
              
              <Link
                to={`find-job/job-detail/${index}`}
                key={index}
                className={`border border-gray-300 py-2 px-3 rounded-md  space-y-1 cursor-pointer hover:scale-105 duration-300 bg-gradient-to-r from-yellow-50  ${
                  index == 0 ? "hidden" : ""
                }`}
              >
                <p className="font-semibold">{value.title}</p>
                <div className="flex gap-3">
                  <p className="text-green-900 font-bold text-xs">
                    {value.jobType}
                  </p>
                  <p className="text-xs text-gray-500 text-center">
                    Sallary : {value.sallary}
                  </p>
                </div>
                <div className="flex gap-4">
                  <div>
                    <img
                      src={fb}
                      alt="logo"
                      className="w-10"
                      width={100}
                      height={100}
                    />
                  </div>
                  <div>
                    <p className="font-semibold">{value.companyName}</p>
                    <div className="flex gap-24">
                      <div className="flex gap-1">
                        <IoLocationOutline />
                        <p className="text-xs text-gray-500 text-center">
                          {value.companyLocation}
                        </p>
                      </div>
                      <button>
                        <CiBookmark className="hover:scale-110" />
                      </button>
                    </div>
                  </div>
                </div>
              </Link>


            );
          })}
        </div>
      </div>
      <UserRedirection />
    </div>
  );
};

export default HomePage;
