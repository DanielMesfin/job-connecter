import React, { useState, useEffect } from "react";
import axios from "axios";
import { CiBookmark, CiCalendar } from "react-icons/ci";
import {
  FaArrowRight,
  FaFacebook,
  FaLinkedin,
  FaXTwitter,
} from "react-icons/fa6";
import { BsWallet2 } from "react-icons/bs";

import { FaRegMap } from "react-icons/fa";
import { PiBriefcaseLight } from "react-icons/pi";
import { LuWallet } from "react-icons/lu";
import { FiLayers } from "react-icons/fi";
import { IoIosLink, IoMdStopwatch } from "react-icons/io";
import { HiOutlineMail } from "react-icons/hi";
import { IoLocationOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { useUserContext } from "../../context/context";

const JobDetail4Admin = () => {
  const { user } = useUserContext();
  const [jobDetail, setJobDetail] = useState({});
  const [jobId, setJobId] = useState();
  const [errorMessage, setErrorMessage] = useState("");
  const [message, setMessage] = useState("");


  useEffect(() => {
    const getJob = async () => {
      const job_id = localStorage.getItem("job_id");
      setJobId(job_id);
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/job/company_job_detail/${user.id}/${job_id}`
        );
        const jobDetailData = response.data["detail"];
        console.log("job detail data", jobDetailData);
        setJobDetail(jobDetailData);
        console.log("job detail", jobDetail);
        setErrorMessage("");
        setMessage("Job Detail Fetched Successfully");
      } catch (err) {
        console.log(err);
        setMessage("");
        setErrorMessage("Failed to Fetch Job Detail! Please Try Again");
      }
    };

    getJob();
  }, [user.id]);

  const Approve = async () => {
    try {
      await axios
        .patch(`http://127.0.0.1:8000/job/approve_job/${user.id}/${jobId}/`)
        .then((val) => {
          console.log(val);
          setErrorMessage("");
          setMessage("Job Activated Successfully");
        })
        .catch((err) => {
          console.log(err);
          setMessage("");
          setErrorMessage("Job Approval Failed! Please Try Again");
        });
    } catch (err) {
      console.log(err);
      setMessage("");
      setErrorMessage("Failed to Fetch Job Detail! Please Try Again");
    }
  };
  const Decline = async () => {
    try {
      await axios
        .patch(`http://127.0.0.1:8000/job/decline_job/${user.id}/${jobId}/`)
        .then((val) => {
          console.log(val);
          setErrorMessage("");
          setMessage("Job Activation Request Declined Successfully !");
        })
        .catch((err) => {
          console.log(err);
          setMessage("");
          setErrorMessage(
            "Failed to Decline Job Activation Request! Please Try Again"
          );
        });
    } catch (err) {
      console.log(err);
      setMessage("");
      setErrorMessage("Failed to Fetch Job Detail! Please Try Again");
    }
  };
  return (
    <div className="   ">
      {errorMessage && (
        <div
          class="p-4  text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
          role="alert"
        >
          <span class="font-medium">Danger alert!</span>
          {errorMessage}
        </div>
      )}
      {message && (
        <div
          className="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400"
          role="alert"
        >
          <span className="font-medium">Success alert!</span> {message}
        </div>
      )}
      <div className="border py-5 xl:px-10 space-y-5">
        <div className="flex flex-col md:flex-row justify-between w-full">
          <div className="flex gap-2  py-2 items-center">
            <div>
              <img
                src={`http://localhost:8000/media/${jobDetail.logo}`}
                alt={jobDetail.company_name}
                className="rounded-full w-16"
              />
            </div>
            <div className="w-full">
              <p className="text-lg font-bold">{jobDetail.title}</p>
              <div className="flex gap-3">
                <p className="text-gray-700 text-sm">
                  at {jobDetail.company_name}
                </p>
                <p className="bg-green-500 text-white px-3 rounded text-sm flex items-center">
                  {jobDetail.job_category}
                </p>
              </div>
            </div>
          </div>
          <div className="flex px-2 md:justify-center items-center md:items-end gap-2">
            <button
              onClick={() => Approve()}
              className="bg-blue-700 text-white py-2 px-10 rounded text-sm flex items-center gap-2  transition ease-in-out delay-150 hover:-translate-y-1    duration-300"
            >
              Approve
            </button>
            <button
              onClick={() => Decline()}
              className="bg-red-700 text-white py-2 px-10 rounded text-sm flex items-center gap-2  transition ease-in-out delay-150 hover:-translate-y-1    duration-300"
            >
              Decline
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1 space-y-10 md:space-y-0 md:grid-cols-2">
          <div className="md:col-span- flex flex-col space-y-5 w-full h-full">
            <div className="space-y-2 w-full h-full">
              <p className="font-bold">Job Description</p>
              <p className="text-gray-700 px-2 tracking-wide text-pretty whitespace-break-spaces ">
                {jobDetail.job_description}
              </p>
            </div>

            <div className="space-y-2">
              <p className="font-bold">Requirements</p>
              <ul className="px-7">
                {jobDetail.required_skill &&
                  jobDetail.required_skill.map((val, index) => {
                    return (
                      <li className="text-gray-700 text-sm list-disc">{val}</li>
                    );
                  })}
              </ul>
            </div>

            <div className="space-y-2">
              <p className="font-bold">Responsibility</p>
              <ul className="px-7">
                {jobDetail.responsiblity &&
                  jobDetail.responsiblity.map((val, index) => {
                    return (
                      <li className="text-gray-700 text-sm list-disc">{val}</li>
                    );
                  })}
              </ul>
            </div>
            <div className="space-y-2">
              <p className="font-bold">Benefit</p>
              <ul className="px-7">
                {jobDetail.job_benefits &&
                  jobDetail.job_benefits.map((val, index) => {
                    return (
                      <li className="text-gray-700 text-sm list-disc">{val}</li>
                    );
                  })}
              </ul>
            </div>
          </div>
          <div className="space-y-3 w-full">
            <div className="md:flex w-full space-y-3 md:space-y-0">
              <div className="w-full justify-center flex flex-col items-center">
                <div className="border p-5 flex flex-col items-center w-full">
                  <LuWallet size={25} className="text-blue-500" />
                  <p className="font-bold text-sm ">Sallary</p>
                  {jobDetail.salary &&
                    (jobDetail.salary.sallaryChoice == "fixed" ? (
                      <p className="text-green-500 font-bold">
                        {jobDetail.salary.sallary} {jobDetail.salary.currency}
                      </p>
                    ) : jobDetail.salary.sallaryChoice == "Range" ? (
                      <div className="flex justify-center gap-2 w-full">
                        <p className="text-green-500 font-bold">
                          {jobDetail.salary.sallary.min}
                        </p>
                        <span>-</span>
                        <p className="text-green-500 font-bold">
                          {jobDetail.salary.sallary.max}{" "}
                          {jobDetail.salary.currency}
                        </p>
                      </div>
                    ) : jobDetail.salary.sallaryChoice == "on-agreement" ? (
                      <p className="text-green-500 font-bold">undesclosed</p>
                    ) : (
                      ""
                    ))}
                </div>
              </div>
              <div className="w-full flex flex-col items-center">
                <div className="border p-5 flex w-full  flex-col items-center">
                  <FaRegMap size={25} className="text-blue-500" />
                  <p className="font-bold text-sm">Job Location</p>

                  {jobDetail.location && (
                    <p className="text-gray-700 text-sm">
                      {jobDetail.location["region"]} ,{" "}
                      {jobDetail.location["additional"]}
                    </p>
                  )}
                </div>
              </div>
            </div>
            <div className="border py-5 px-5 space-y-3 w-full">
              <p className="font-semibold">Job Overview</p>
              <div className="grid grid-cols-3 ">
                <div className="flex flex-col items-center mb-4">
                  <CiCalendar size={25} className="text-blue-500" />
                  <p className="text-gray-500 text-xs">job posted</p>
                  <p className="text-xs font-semibold">{jobDetail.post_date}</p>
                </div>

                <div className="flex flex-col items-center">
                  <IoMdStopwatch size={25} className="text-blue-500" />

                  <p className="text-gray-500 text-xs">Job Expiry in</p>
                  <p className="text-xs font-bold">{jobDetail.deadline}</p>
                </div>

                <div className="flex flex-col items-center">
                  <FiLayers size={25} className="text-blue-500" />

                  <p className="text-gray-500 text-xs">Job Level</p>
                  <p className="text-xs font-bold">{jobDetail.job_level}</p>
                </div>

                <div className="flex flex-col items-center">
                  <LuWallet size={25} className="text-blue-500" />

                  <p className="text-gray-500 text-xs">Experience</p>
                  <p className="text-xs font-bold">
                    {jobDetail.req_experience}
                  </p>
                </div>

                <div className="col-span-2 flex flex-col items-center lg:w-1/2">
                  <PiBriefcaseLight size={25} className="text-blue-500" />
                  <p className="text-gray-500 text-xs">Education</p>
                  <p className="text-xs font-bold text-center w-full">
                    {jobDetail.education}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default JobDetail4Admin;
