import React, { useState, useEffect } from "react";
import axios from "axios";
import { IoMdCloseCircle } from "react-icons/io";
import fb from "../assets/images/logo_facebook.jpg";
import { CiBookmark, CiCalendar } from "react-icons/ci";
import {
  FaArrowRight,
  FaFacebook,
  FaLinkedin,
  FaXTwitter,
} from "react-icons/fa6";
import {
  Avatar,
  Button,
  Card,
  CardBody,
  CardFooter,
  Dialog,
  DialogBody,
  DialogHeader,
  Textarea,
  Typography,
} from "@material-tailwind/react";

import { FaRegMap } from "react-icons/fa";
import { PiBriefcaseLight } from "react-icons/pi";
import { LuWallet } from "react-icons/lu";
import { FiLayers } from "react-icons/fi";
import { IoIosLink, IoMdStopwatch } from "react-icons/io";
import { HiOutlineMail } from "react-icons/hi";
import { IoLocationOutline } from "react-icons/io5";
import { Link, useParams } from "react-router-dom";
import { useUserContext } from "../context/context";
import { FaExclamation } from "react-icons/fa";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, useFieldArray } from "react-hook-form";

// const featuredJob = [
//   {
//     title: "Technical Support Specialist",
//     jobType: "Full Time",
//     sallary: "100,000",
//     logo: { fb },
//     companyName: "Facebook inc",
//     companyLocation: "Addis Ababa",
//   },
//   {
//     title: "Technical Support Specialist",
//     jobType: "Full Time",
//     sallary: "100,000",
//     logo: { fb },
//     companyName: "Facebook inc",
//     companyLocation: "Addis Ababa",
//   },
//   {
//     title: "Technical Support Specialist",
//     jobType: "Full Time",
//     sallary: "100,000",
//     logo: { fb },
//     companyName: "Facebook inc",
//     companyLocation: "Addis Ababa",
//   },
//   {
//     title: "Technical Support Specialist",
//     jobType: "Full Time",
//     sallary: "100,000",
//     logo: { fb },
//     companyName: "Facebook inc",
//     companyLocation: "Addis Ababa",
//   },
//   {
//     title: "Technical Support Specialist",
//     jobType: "Full Time",
//     sallary: "100,000",
//     logo: { fb },
//     companyName: "Facebook inc",
//     companyLocation: "Addis Ababa",
//   },
//   {
//     title: "Technical Support Specialist",
//     jobType: "Full Time",
//     sallary: "100,000",
//     logo: { fb },
//     companyName: "Facebook inc",
//     companyLocation: "Addis Ababa",
//   },
//   {
//     title: "Technical Support Specialist",
//     jobType: "Full Time",
//     sallary: "100,000",
//     logo: { fb },
//     companyName: "Facebook inc",
//     companyLocation: "Addis Ababa",
//   },
//   {
//     title: "Technical Support Specialist",
//     jobType: "Full Time",
//     sallary: "100,000",
//     logo: { fb },
//     companyName: "Facebook inc",
//     companyLocation: "Addis Ababa",
//   },
//   {
//     title: "Technical Support Specialist",
//     jobType: "Full Time",
//     sallary: "100,000",
//     logo: { fb },
//     companyName: "Facebook inc",
//     companyLocation: "Addis Ababa",
//   },
// ];

const JobDetail = () => {
  const userx = JSON.parse(localStorage.getItem("user"));

  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const [showApplyForm, setShowApplyForm] = useState(false);

  const [resumeFile, setResumeFile] = useState(null);
  const [coverLetter, setCoverLetter] = useState("");

  const [job, setJob] = useState(null);
  const [employer, setEmployer] = useState(null);

  const { id } = useParams();
  const { user } = useUserContext();
  const [jobDetail, setJobDetail] = useState({});

  const [errorMessage, setErrorMessage] = useState("");
  const [message, setMessage] = useState("");

  const [featuredJob, setFeaturedJob] = useState([]);

  // Handling for today
  const handleApplyClick = () => {
    if (!userx) {
      setShowLoginPopup(true);
    } else {
      setShowApplyForm(true);
    }
  };

  const handleResumeFileChange = (event) => {
    const file = event.target.files[0];
    setResumeFile(file);
  };

  const handleCoverLetterChange = (event) => {
    const value = event.target.value;
    setCoverLetter(value);
  };

  const application = async () => {
    const applicationData = new FormData();
    applicationData.append("jobseekerId", userx.id);
    applicationData.append("jobId", id);
    applicationData.append("resume", resumeFile);
    applicationData.append("cover_letter", coverLetter);

    await axios
      .post(
        "http://127.0.0.1:8000/applications/submit-application/",
        applicationData
      )
      .then((response) => {
        setShowApplyForm(false);
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
      })
      .catch((err) => alert(err));
  };
  const handleApplyFormSubmit = (event) => {
    event.preventDefault();
    application();
    // Handle the form submission logic here
    // You can access the resumeFile and coverLetter state values to perform further actions
  };

  // http://127.0.0.1:8000/job/get_jobs/1/
  const fetchJobAndEmployer = async () => {
    try {
      const jobResponse = await axios.get(
        `http://127.0.0.1:8000/job/get_jobs/${id}/`
      );
      const jobData = jobResponse.data;
      setJob(jobData);
      console.log("This is jobData", jobData);

      // Extract the employer ID from the job data
      const employerId = jobData.employer;

      // Fetch the employer details using the employer ID
      const employerResponse = await axios.get(
        `http://127.0.0.1:8000/user/employer/${employerId}/`
      );
      const employerData = employerResponse.data;
      setEmployer(employerData);
      console.log("This is employerData", employerData);
    } catch (error) {
      console.error("Failed with error", error);
    }
  };
  const fetchFeaturedJob = async () => {
    try {
      const featuredJob = await axios.get(
        `http://127.0.0.1:8000/recommendation/fetch_simmilar_job/${id}/`
      );

      setFeaturedJob(featuredJob.data);
      console.log("This is featuredJob", featuredJob.data);
    } catch (error) {
      console.error("Failed with error", error);
    }
  };

  useEffect(() => {
    // const getJob = async () => {
    //   const job_id = localStorage.getItem("job_id");
    //   try {
    //     const response = await axios.get(
    //       `http://127.0.0.1:8000/job/company_job_detail/${user.id}/${job_id}`
    //     );

    //     const jobDetailData = response.data["detail"];
    //     console.log("job detail data", jobDetailData);
    //     setJobDetail(jobDetailData);
    //     console.log("job detail", jobDetail);
    //     setErrorMessage("");
    //     setMessage("Job Detail Fetched Successfully");
    //   } catch (err) {
    //     console.log(err);
    //     setMessage("");
    //     setErrorMessage("Failed to Fetch Job Detail! Please Try Again");
    //   }
    // };
    // getJob();

    fetchJobAndEmployer();
    fetchFeaturedJob();
  }, [user.id, id]);
  const validationSchema4login = yup
    .object({
      reason: yup.string().required("Reason is Required"),
    })
    .required();

  let {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setError,
  } = useForm({
    resolver: yupResolver(validationSchema4login),
    defaultValues: {
      reason: "",
    },
  });
  const reason = watch("reason");

  useEffect(() => {
    const getJob = async () => {
      const job_id = localStorage.getItem("job_id");
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/job/company_job_detail/${user.id}/${id}`
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

  const [openInfoModal, setOpenInfoModal] = useState(false);
  const handleOpenInfoBox = () => setOpenInfoModal(!openInfoModal);

  const ReportIssue = async () => {
    await axios
      .post(`http://localhost:8000/job_issue/raise-issues/2/`, {
        reason: reason,
      })
      .then((response) => {
        console.log(response.data);
        setOpenInfoModal(false);
      })
      .catch((error) => console.log(error));
    console.log(reason);
  };
  return (
    <div className="px-5 xl:px-[10%]">
      <div className="border py-5 xl:px-10 space-y-5">
        <div className="flex flex-col md:flex-row justify-between w-full">
          <div className="flex gap-2  py-2 items-center">
            <div className="w-16 h-16 rounded-full">
              <Avatar
                src={`http://localhost:8000/media/${jobDetail.logo}`}
                alt={jobDetail?.company_name}
                size="lg"
              />
            </div>
            {/* This is job {JSON.stringify(job) } */}
            <div className="w-full">
              <p className="text-lg font-bold">{job?.title}</p>
              <div className="flex gap-3">
                <p className="text-gray-700 text-sm">at {employer?.username}</p>
                <p className="bg-green-500 text-white px-3 rounded text-sm flex items-center">
                  {job?.job_category}
                </p>
              </div>
            </div>
          </div>
          <div className="flex px-2 md:justify-center items-center md:items-end gap-2">
            <div className="bg-blue-100 p-2 rounded-md cursor-pointer order-2 md:order-1">
              <CiBookmark
                className="hover:scale-110  text-blue-500"
                size={20}
              />
            </div>
            {/* Login Popup */}
            {showLoginPopup && (
              <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black bg-opacity-50">
                <div className="bg-white p-8 rounded shadow-lg">
                  <h2 className="text-3xl font-semibold mb-4 text-center text-gray-800">
                    Login to Apply
                  </h2>
                  <p className="mb-4 text-lg text-center text-gray-600">
                    Please login to apply for the job
                  </p>
                  <button
                    className="bg-red-500 text-white mx-auto flex justify-center py-2 px-4 rounded"
                    onClick={() => setShowLoginPopup(false)}
                  >
                    Close
                  </button>
                </div>
              </div>
            )}
            <button
              className="bg-blue-700 text-white py-2 px-10 rounded text-sm flex items-center gap-2  transition ease-in-out delay-150 hover:-translate-y-1 duration-300"
              onClick={handleApplyClick}
            >
              Apply Now{" "}
              <FaArrowRight size={15} className="hover:animate-ping " />
            </button>
            {/* Apply Form */}
            {showApplyForm && (
              <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black bg-opacity-50">
                <form
                  onSubmit={handleApplyFormSubmit}
                  className="bg-white rounded-lg p-8 shadow-lg relative"
                >
                  <button
                    className="absolute -top-4 hover:text-red-500 -right-5 p-1 text-gray-400 bg-white rounded-full"
                    onClick={() => setShowApplyForm(false)}
                  >
                    <IoMdCloseCircle className="w-full h-full" size={27} />
                  </button>
                  <h2 className="text-3xl font-semibold mb-4 text-center text-gray-800">
                    Apply for the Job
                  </h2>
                  <div className="mb-4">
                    <label
                      htmlFor="resume"
                      className="text-lg text-gray-800 mb-2"
                    >
                      Resume:
                    </label>
                    <input
                      type="file"
                      id="resume"
                      accept=".pdf,.doc,.docx"
                      onChange={handleResumeFileChange}
                      className="border border-gray-300 rounded-lg p-2 w-full"
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="coverLetter"
                      className="text-lg text-gray-800 mb-2"
                    >
                      Cover Letter:
                    </label>
                    <textarea
                      id="coverLetter"
                      value={coverLetter}
                      onChange={handleCoverLetterChange}
                      className="border border-gray-300 rounded-0 p-2 w-full focus:outline-blue-200 h-24"
                    />
                  </div>
                  <button
                    type="submit"
                    className="bg-blue-500 text-white py-2 px-4 rounded"
                  >
                    Submit
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
        <div className="grid grid-cols-1 space-y-10 md:space-y-0 md:grid-cols-2">
          <div className="md:col-span- flex flex-col space-y-5 w-full h-full">
            <div className="space-y-2 w-full h-full">
              <p className="font-bold">Job Description</p>
              <p className="text-gray-700 px-2 tracking-wide text-pretty whitespace-break-spaces ">
                {job?.job_description}
              </p>
            </div>

            <div className="space-y-2">
              <p className="font-bold">Requirements</p>
              <ul className="px-7">
                {job?.required_skill &&
                  job?.required_skill.map((val, index) => {
                    return (
                      <li
                        key={index}
                        className="text-gray-700 text-sm list-disc"
                      >
                        {val}
                      </li>
                    );
                  })}
              </ul>
            </div>

            <div className="space-y-2">
              <p className="font-bold">Responsibility</p>
              <ul className="px-7">
                {job?.responsiblity &&
                  job?.responsiblity.map((val, index) => {
                    return (
                      <li
                        key={index}
                        className="text-gray-700 text-sm list-disc"
                      >
                        {val}
                      </li>
                    );
                  })}
              </ul>
            </div>
            <div className="space-y-2">
              <p className="font-bold">Benefit</p>
              <ul className="px-7">
                {job?.job_benefits &&
                  job?.job_benefits.map((val, index) => {
                    return (
                      <li
                        key={index}
                        className="text-gray-700 text-sm list-disc"
                      >
                        {val}
                      </li>
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
                  {job?.salary &&
                    (job?.salary?.sallaryChoice == "fixed" ? (
                      <p className="text-green-500 font-bold">
                        {job?.salary?.sallary} {job?.salary?.currency}
                      </p>
                    ) : job?.salary?.sallaryChoice == "Range" ? (
                      <div className="flex justify-center gap-2 w-full">
                        <p className="text-green-500 font-bold">
                          {job?.salary?.sallary?.min}
                        </p>
                        <span>-</span>
                        <p className="text-green-500 font-bold">
                          {job?.salary?.sallary?.max} {job?.salary?.currency}
                        </p>
                      </div>
                    ) : job?.salary?.sallaryChoice == "on-agreement" ? (
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

                  {job?.location && (
                    <p className="text-gray-700 text-sm">
                      {job?.location["region"]} , {job?.location["additional"]}
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
                  <p className="text-xs font-semibold">{job?.post_date}</p>
                </div>

                <div className="flex flex-col items-center">
                  <IoMdStopwatch size={25} className="text-blue-500" />

                  <p className="text-gray-500 text-xs">Job Expiry in</p>
                  <p className="text-xs font-bold">{job?.deadline}</p>
                </div>

                <div className="flex flex-col items-center">
                  <FiLayers size={25} className="text-blue-500" />

                  <p className="text-gray-500 text-xs">Job Level</p>
                  <p className="text-xs font-bold">{job?.job_level}</p>
                </div>

                <div className="flex flex-col items-center">
                  <LuWallet size={25} className="text-blue-500" />

                  <p className="text-gray-500 text-xs">Experience</p>
                  <p className="text-xs font-bold">{job?.req_experience}</p>
                </div>

                <div className="col-span-2 flex flex-col items-center lg:w-1/2">
                  <PiBriefcaseLight size={25} className="text-blue-500" />
                  <p className="text-gray-500 text-xs">Education</p>
                  <p className="text-xs font-bold text-center w-full">
                    {job?.education}
                  </p>
                </div>
              </div>
            </div>

            <div className="border py-5 px-5 space-y-2 ">
              <p className="font-semibold">Job Overview</p>
              <div className="flex gap-5">
                <div className="flex gap-2 bg-blue-100 px-2 py-1 rounded text-blue-500 cursor-pointer hover:bg-blue-200">
                  <IoIosLink size={20} />
                  <p className="text-sm">Copy </p>
                </div>
                <div className="  bg-blue-100 px-1 py-1 rounded text-blue-500 cursor-pointer hover:bg-blue-200">
                  <FaLinkedin size={20} />
                </div>
                <div className="  bg-blue-100 px-1 py-1 rounded text-blue-500 cursor-pointer hover:bg-blue-200">
                  <FaFacebook size={20} />
                </div>
                <div className="  bg-blue-100 px-1 py-1 rounded text-blue-500 cursor-pointer hover:bg-blue-200">
                  <FaXTwitter size={20} />
                </div>
                <div className="  bg-blue-100 px-1 py-1 rounded text-blue-500 cursor-pointer hover:bg-blue-200">
                  <HiOutlineMail size={20} />
                </div>
              </div>
            </div>
            <div className="flex justify-end">
              <Button
                variant="outlined"
                className="rounded-full flex gap-1"
                onClick={handleOpenInfoBox}
              >
                <FaExclamation className="" size={15} color="red" />
                Report
              </Button>
            </div>
          </div>
        </div>

        {/* Featured Jobs */}
        <div>
          <p className="font-bold">Related Jobs</p>
          <div className="grid space-y-2  md:grid-cols-3 space-x-2 p-3">
            {featuredJob?.recommened_job_list?.map((job) => {
              const { title, location, job_type, salary } = job.fields;
              const id = job.pk;

              return (
                <Link
                  to={`/find-job/job-detail/${id}`}
                  key={id}
                  className={`border border-gray-300 py-2 px-3 rounded-md  space-y-1 cursor-pointer hover:scale-105 duration-300 bg-gradient-to-r from-yellow-50  ${
                    featuredJob?.length == 0 ? "hidden" : ""
                  }`}
                >
                  <p className="font-semibold">{title}</p>
                  <div className="flex gap-3">
                    <p className="text-green-900 font-bold text-xs">
                      {job_type}
                    </p>
                    <p className="text-xs text-gray-500 text-center">
                      Sallary : {salary?.sallary}
                    </p>
                  </div>
                  <div className="flex gap-4">
                    <div>
                      <img src={fb} alt="logo" className="w-10" />
                    </div>
                    <div>
                      <p className="font-semibold">
                        {featuredJob?.companyName}
                      </p>
                      <div className="flex gap-24">
                        <div className="flex gap-1">
                          <IoLocationOutline />
                          <p className="text-xs text-gray-500 text-center">
                            {location?.region}
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
      </div>

      <Dialog
        size="xs"
        open={openInfoModal}
        handler={handleOpenInfoBox}
        className="bg-transparent shadow-none"
      >
        <Card className="mx-auto w-full max-w-[24rem]">
          <CardBody className="flex flex-col gap-4">
            <Typography variant="h6" color="blue-gray">
              Report issue on Job
            </Typography>

            <Typography className="-mb-2" variant="h6">
              Issue
            </Typography>
            <Textarea label="Issue" size="lg" {...register("reason")} />
          </CardBody>
          <CardFooter className="pt-0">
            <Button variant="gradient" onClick={ReportIssue} fullWidth>
              Finsish
            </Button>
          </CardFooter>
        </Card>
      </Dialog>
    </div>
  );
};
export default JobDetail;
