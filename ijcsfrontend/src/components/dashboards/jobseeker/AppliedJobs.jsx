import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { BsCurrencyDollar } from "react-icons/bs";
import { IoLocationOutline } from "react-icons/io5";
import { IoMdCloseCircle } from "react-icons/io";
import axios from "axios";

const AppliedJobs = () => {
  const authenticatedUserData = useLocation()?.state?.data  || JSON.parse(localStorage.getItem("user"));
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null); // Track the selected job for displaying details

  const loadAppliedJobs = async () => {
    const { data } = await axios.get(
      `http://127.0.0.1:8000/applications/${authenticatedUserData.id}/`
    );
    setAppliedJobs(data.applications);
  };

  useEffect(() => {
    loadAppliedJobs();
  }, []);

  // Function to handle the "View Details" button click
  const handleViewDetails = (job) => {
    setSelectedJob(job);
  };

  // Function to close the popup
  const handleClosePopup = () => {
    setSelectedJob(null);
  };

  return (
    <div>
      {/* {authenticatedUserData.id} */}
      Applied Jobs
      <div className="flex px-4 py-4 bg-gray-100 rounded mt-3">
        <div className="flex w-[50%] justify-start text-gray-500">JOBS</div>
        <div className="flex w-[50%] justify-end">
          <span className="w-[40%] text-gray-500">DATE APPLIED</span>
          <span className="w-[40%] text-gray-500">STATUS</span>
          <span className="w-[20%] text-gray-500">ACTION</span>
        </div>
      </div>
      {/* {JSON.stringify(appliedJobs)} */}
      {appliedJobs.length > 0 ? (
        appliedJobs.map((job) => (
          <div key={job.id}>
            {/* <div className="">{JSON.stringify(recommendation)}</div> */}
            <div className="flex mt-3 items-center pl-4 ">
              <div className="flex w-[46%]">
                <div className="w-[20%] h-16 bg-green-300 text-white flex items-center justify-center font-serif">
                  company {job.id}
                </div>
                <div className="w-[80%] block mt-1">
                  <div className="flex ml-2 ">
                    <h1 className="mr-1">{job.job_title}</h1>
                    <span className="rounded-2xl text-blue-200 bg-blue-50 px-2 py-1">
                      {job.job_category}
                    </span>
                  </div>
                  <div className="flex justify-start items-center text-gray-500 mt-1 ml-1">
                    <IoLocationOutline size={24} />{" "}
                    <h1 className="mr-3">{job.location.region}</h1>{" "}
                    <BsCurrencyDollar size={24} />
                    <span>{job.salary.sallary}/month</span>
                  </div>
                </div>
              </div>
              <div className="w-[54%] flex justify-end items-center gap-5">
                <span className="w-[50%] flex justify-start text-sm text-gray-500">
                  {job.applied_date}
                </span>
                <span className="w-[40%] flex justify-start text-sm text-gray-500 ps-2">
                  {job.application_status === "AP" && (
                    <span className="text-yellow-500">Pending</span>
                  )}
                  {job.application_status === "RJ" && (
                    <span className="text-red-500">Rejected</span>
                  )}
                  {job.application_status === "IN" && (
                    <span className="text-green-500">Accepted</span>
                  )}
                </span>
                <div className="w-[30%]">
                  <button
                    className="p-2 rounded bg-gray-100 text-blue-500 hover:bg-blue-500 hover:text-white"
                    onClick={() => handleViewDetails(job)} // Pass the selected job to the handler function
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p className="text-blue-gray-500 text-center items-center text-2xl">
          No applied jobs found.
        </p>
      )}
      {/* Popup to display application details */}
      {selectedJob && (
        <div className="fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-4 rounded-lg relative">
            <button
              className="-right-3 -top-3 absolute  rounded-full p-1 bg-gray-100 text-gray-400  hover:text-red-500"
              onClick={handleClosePopup}
            >
              <IoMdCloseCircle size={25} />
            </button>
            <h1 className="text-lg  font-medium mb-4 text-center border-b border-gray-400 pb-3 ">{selectedJob.job_title}</h1>
            <div className="flex gap-24">
              <div className="block border-blue-gray-400">
                <p className="mb-2">
                  <span className="mr-1">Job Catgory:</span>
                  {selectedJob.job_category}
                </p>
                <p className="mb-2">
                  <span className="mr-1">Job Location:</span>
                  {selectedJob.location.region}
                </p>
                <p className="mb-2">
                  <span className="mr-1">Salary:</span>{" "}
                  {selectedJob.salary.sallary}/month
                </p>
              </div>
              <div className="block">
                <p className="mb-2">
                  <span className="mr-1">Applied Date:</span>{" "}
                  {selectedJob.applied_date}
                </p>
                <p className="mb-4">
                  <span className="mr-1">Application Status:</span>{" "}
                  {selectedJob.application_status === "AP"
                    ? " is pending."
                    : selectedJob.application_status === "IN"
                    ? "Congratulations! Your application has been approved."
                    : selectedJob.application_status === "RJ"
                    ? "We are sorry, but your application has been rejected."
                    : "Unknown application status."}
                </p>
                <p className="mb-2">
                  <span className="mr-1">Resume:</span> {selectedJob.resume}
                </p>
              </div>
            </div>
            <div className="mx-auto">
              <p>Cover Letter:</p>
              <p className="mb-2">{selectedJob.cover_letter}</p>
            </div>
            <button className="btn float-end bg-blue-100 text-blue-gray-900 p-2 rounded hover:bg-blue-500 hover:text-white">
              Edit Application
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AppliedJobs;
