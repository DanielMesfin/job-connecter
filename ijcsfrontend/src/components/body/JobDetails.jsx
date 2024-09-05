import React, { useState, useEffect } from "react";
import { FaMapLocationDot } from "react-icons/fa6";
import { IoBagCheckOutline } from "react-icons/io5";
import { IoMdCloseCircle } from "react-icons/io";
import { IoLogoLinkedin } from "react-icons/io5";
import { GoArrowRight } from "react-icons/go";
import { SiTelegram } from "react-icons/si";
import { FaFacebook } from "react-icons/fa";
import { IoLayersSharp } from "react-icons/io5";
import { TfiBag } from "react-icons/tfi";
import {
  FacebookShareButton,
  TelegramShareButton,
  LinkedinShareButton,
} from "react-share";
import axios from "axios";
import "./style.css";

const JobDetails = ({ job, isPopupOpen, setPopupOpen, jobseekerId }) => {
  const [, setJobSeeker] = useState();
  const [isFormVisible, setFormVisible] = useState(false);
  const [resume, setResume] = useState(null);
  const [cover_letter, setCoverLetter] = useState("");

  const handleApply = () => {
    setFormVisible(true);
  };
  const handleFormVisiblity = () => {
    setFormVisible(false);
  };
  // const handleClose = () => {
  //   setFormVisible(false);
  //   setPopupOpen(false);
  // };
  const handleResumeChange = (e) => {
    setResume(e.target.files[0]);
  };

  const loadJobSeeker = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:8000/candidate/all/${jobseekerId}/`
      );

      setJobSeeker(data);
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
  };
  useEffect(() => {
    loadJobSeeker();
  }, []);
  const application = async () => {
    const applicationData = new FormData();
    applicationData.append("jobseekerId", jobseekerId);
    applicationData.append("jobId", job.pk);
    applicationData.append("resume", resume);
    applicationData.append("cover_letter", cover_letter);

    await axios
      .post(
        "http://127.0.0.1:8000/applications/submit-application/",
        applicationData
      )
      .then((response) => {
        const popupContainer = document.createElement("div");
        popupContainer.className =
          "fixed top-0 left-0 w-screen h-screen flex justify-center items-center bg-black bg-opacity-50 z-[1000]";

        const popup = document.createElement("div");
        popup.className =
          "bg-white text-center py-9 px-6 w-[40%] rounded shadow-lg";

        const message = document.createElement("p");
        message.textContent = response.data.message;
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

        setFormVisible(false);
      })
      .catch((err) => alert(err));
  };

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center  z-50  ${
        isPopupOpen ? "" : "hidden"
      }`}
    >
      <div className="absolute inset-0 bg-black opacity-50"></div>

      <div className="relative bg-white py-4 rounded shadow-md w-[80%] px-8">
        <h2 className="text-xl font-bold mb-4 text-center text-blue-gray-200 py-4 font-serif">
          Job Details
        </h2>

        {/* <div className="w-56">{JSON.stringify(jobSeeker)}</div> */}
        {/* {jobSeeker?.socialMediaLink[1]?.key}
        {jobSeeker?.socialMediaLink[1]?.value} */}
        {/* {JSON.stringify(job)} */}
        <div className="flex gap-10">
          <div className="text-blue-gray-800">
            <div className="mb-4 block gap-1">
              <h1 className="font-bold">Job Description</h1>
              <p className="text-sm w-[80%] ms-1 mt-1">{job.fields.job_description}</p>
            </div>
            <div className="mb-4 block gap-1">
              <h1 className="font-bold">Required Skills</h1>
              <ul className="block ms-6 mt-1">
                {job.fields.required_skill.map((skill, index) => (
                  <li className="text-sm list-disc" key={index}>
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
            <div className="mb-4 block gap-1">
              <h1 className="font-bold">Responsiblities</h1>
              <ul className="block ms-6 mt-1">
                {job.fields.responsiblity.map((responsiblity, index) => (
                  <li className="text-sm" key={index}>
                    {responsiblity}
                  </li>
                ))}
              </ul>
            </div>
            <div className="mb-4 block gap-1">
              <h1 className="font-bold">Benefits</h1>
              <ul className="block ms-6 mt-1">
                {job.fields.job_benefits.map((benefit, index) => (
                  <li className="text-sm" key={index}>
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>
            <div className="mb-4 flex gap-1">
              <p className="font-bold">Job ID:</p>
              <p>{job.pk}</p>
            </div>
            <div className="mb-4 flex gap-1">
              <p className="font-bold">JobSeeker ID:</p>
              <p>{jobseekerId}</p>
            </div>
          </div>
          <div className="text-blue-gray-800">
            <div className="block">
              <div className="border-2 mb-4 border-blue-100 px-8 py-4 rounded flex gap-10">
                {/* <div className="text-center block border-r-2 pr-9 pt-2 border-blue-100">
                  <h1 className="text-blue-gray-800">
                    Salary ({job.fields.salary.currency.toUpperCase()})
                  </h1>
                  <p className="text-green-500 mt-1">
                    {job.fields.salary.sallary}
                    {job.fields.salary.currency}
                  </p>
                  <p className="text-gray-400 font-serif">
                    {job.fields.salary.sallaryType}
                  </p>
                </div> */}
                <div className="text-center block">
                  <FaMapLocationDot
                    className="flex justify-center mx-auto mb-2 text-blue-500"
                    size={35}
                  />
                  <h1 className="font-medium text-blue-gray-800">
                    Job Location
                  </h1>
                  <p className="text-gray-400">{job.fields.location.region}</p>
                </div>
              </div>
              <div className="border-2 border-blue-100 border-b-0 px-8 py-4">
                <h1>Job Overview</h1>
                <div className="flex justify-center flex-nowrap w-full gap-10 mt-4">
                  <div className="block">
                    <IoBagCheckOutline
                      className="text-blue-500 mb-2"
                      size={29}
                    />
                    <h1 className="text-gray-400">JOB POSTED</h1>
                    <p className="font-serif text-blue-gray-600">
                      {job.fields.post_date}
                    </p>
                  </div>
                  <div className="block">
                    <IoLayersSharp className="mb-2 text-blue-500" size={25} />
                    <h1 className="text-gray-400">JOB LEVEL</h1>
                    <p className="font-serif text-blue-gray-600">
                      {job.fields.job_level}
                    </p>
                  </div>
                  <div className="block">
                    <TfiBag className="text-blue-500 mb-2" size={25} />
                    <h1 className="text-gray-400">EDUCATION</h1>
                    <p className="font-serif text-blue-gray-600">
                      {job.fields.education}
                    </p>
                  </div>
                </div>
              </div>
              <div className="border-2 border-blue-100 px-8 py-4 block">
                <h1 className="h-1 mb-6">Share this Job</h1>
                <div className="mb-5 flex flex-wrap gap-2 mt-1">
                  <FacebookShareButton
                    url="ijcs.com"
                    hashtag={`#Check out this job:${job.fields.title}`}
                    style={{
                      padding: "0.4rem",
                      backgroundColor: "#BFDBFE",
                      borderRadius: "0.375rem",
                    }}
                  >
                    <FaFacebook className="text-blue-500" />
                  </FacebookShareButton>
                  <LinkedinShareButton
                    url="ijcs.com"
                    title={`Title: ${job.fields.title}`}
                    summary={`Description: ${job.fields.job_description}`}
                    style={{
                      padding: "0.4rem",
                      backgroundColor: "#BFDBFE",
                      borderRadius: "0.375rem",
                    }}
                  >
                    <IoLogoLinkedin className="text-blue-500" />
                  </LinkedinShareButton>
                  <TelegramShareButton
                    url="ijcs.com"
                    quote={`Check out this job`}
                    title={`Title: ${job.fields.title}`}
                    hashtag={`Check out this job:\n
                    Title: ${job.fields.title}\n
                    Education: ${job.fields.education}`}
                    style={{
                      padding: "0.4rem",
                      backgroundColor: "#BFDBFE",
                      borderRadius: "0.375rem",
                    }}
                  >
                    <SiTelegram className="text-blue-500" />
                  </TelegramShareButton>
                </div>
                <h1 className="mb-1">Job tags</h1>
                <div className="flex flex-nowrap">
                  {job.fields.tag.map((tag, index) => (
                    <p className="p-2 bg-gray-200 rounded-md" key={index}>
                      {tag}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Add more job details as needed */}
        {!isFormVisible && (
          <div className="flex justify-end">
            <button
              className="px-4 py-2 flex justify-center items-center absolute top-7 right-5 bg-blue-500 text-white rounded hover:bg-blue-600"
              onClick={handleApply}
            >
              Apply Now
              <GoArrowRight className="ml-2" size={20} />
            </button>
            <button
              className="absolute -top-3 hover:text-red-500 -right-6 p-2 text-gray-400 bg-white rounded-full"
              onClick={() => setPopupOpen(false)}
            >
              <IoMdCloseCircle className="w-full h-full" size={25} />
            </button>
          </div>
        )}
        {isFormVisible && (
          <div className="mt-4 absolute animate-slideIn -top-4 right-0 bg-white p-10 pb-16 shadow-md">
            <button
              className="absolute -top-2 -right-3 bg-white rounded-full p-1 text-gray-400 hover:text-red-500"
              onClick={handleFormVisiblity}
            >
              <IoMdCloseCircle className="w-full h-full" size={25} />
            </button>
            <div className="mb-4 w-96">
              <label className="block font-bold mb-2" htmlFor="resume">
                Resume (PDF)
              </label>
              <input
                type="file"
                id="resume"
                name="resume"
                className="border border-blue-gray-600 w-96 rounded"
                onChange={handleResumeChange}
              />
            </div>
            <div className="mb-4">
              <label className="block font-bold mb-2" htmlFor="description">
                Cover Letter
              </label>
              <textarea
                id="cover_letter"
                rows="4"
                name="cover_letter"
                value={cover_letter}
                onChange={(e) => setCoverLetter(e.target.value)}
                className="w-full border border-blue-gray-400 rounded px-2 py-1"
              ></textarea>
            </div>
            <div className="flex justify-end">
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                onClick={application}
              >
                Submit
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default JobDetails;
