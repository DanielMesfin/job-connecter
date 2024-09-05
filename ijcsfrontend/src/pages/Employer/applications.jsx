import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useUserContext } from "../../context/context";
import axios from "axios";

import { MdStarOutline, MdOutlineStarPurple500 } from "react-icons/md";
import { HiOutlineMail } from "react-icons/hi";
import {
  FaFacebook,
  FaFilePdf,
  FaGraduationCap,
  FaLinkedin,
  FaRegMap,
  FaXTwitter,
} from "react-icons/fa6";
import { MdOutlineMessage } from "react-icons/md";
import { IoIosLink, IoMdStopwatch } from "react-icons/io";
import { PiBriefcaseLight } from "react-icons/pi";
import { LuWallet } from "react-icons/lu";
import { FiLayers } from "react-icons/fi";
// import { CiCalendar } from "react-icons/ci";
import MessageComponet from "../../components/widgets/message/MessageComponet";

import { CiCalendar, CiLocationArrow1 } from "react-icons/ci";
import { IoPersonOutline } from "react-icons/io5";

import { GrLocation } from "react-icons/gr";
import { LuPhoneCall } from "react-icons/lu";
import { PiGlobeLight } from "react-icons/pi";
import { TfiEmail } from "react-icons/tfi";
import ModalBody from "./modal_application_detail";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
  Input,
  Textarea,
  Stepper,
  Step,
  Typography,
} from "@material-tailwind/react";
const Applications = () => {
  const { user } = useUserContext();
  const employer_id = user.id;

  const job_id = useLocation();

  const [job_applications, setJobApplications] = useState([]);
  const [job_applicant, setJobApplicant] = useState({});

  const [errorMessage, setErrorMessage] = useState("");
  const [message, setMessage] = useState("");

  const [openModal, setOpenModal] = useState(false);
  const handleOpen = () => setOpenModal(!openModal);

  useEffect(() => {
    const fetchJobApplication = async () => {
      await axios
        .get(
          `http://localhost:8000/applications/job-application/${
            employer_id + "/" + "00"
          }/`
        )
        .then((val) => {
          console.log("==========================");
          console.log("application data : ", val.data.application);
          console.log(
            val.data.application
              ? val.data.application
              : val.data
              ? val.data
              : []
          );
          console.log("==========================");
          setJobApplications(val.data.application && val.data.application);
        })
        .catch((err) => {
          console.log("==========================");
          console.log(err);
          console.log("==========================");
          setErrorMessage("Failed to fetch application");
          setMessage("");
          console.log(err);
        });
    };
    fetchJobApplication();
  }, []);

  // const fetchApplicantInfo = async (app_id, applicant_id) => {
  //   await axios
  //     .get(
  //       `http://localhost:8000/applications/job-applicant/${app_id}/${applicant_id}`
  //     )
  //     .then((val) => {
  //       console.log(val.data);
  //       setJobApplicant(val.data);
  //       setOpenModal(true);
  //     })
  //     .catch((err) => {
  //       console.log(err);1000301015007
  //     });
  // };

  console.log("application from state : ", job_applications);

  return (
    <div>
      {errorMessage && (
        <div
          className="p-4  text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
          role="alert"
        >
          <span className="font-medium">Danger alert!</span>
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
      <div>
        <p className="font- text-lg">Applicants</p>
      </div>

      {job_applications.length != 0 ? (
        <div>
          {/* // <table className="table-auto w-full border border-collapse border-spacing-2  border-slate-500 ">
        //   <thead>
        //     <tr className="text-start">
        //       <th className="border border-slate-600 text-start px-3 py-2 bg-gray-200">
        //         Profile Picture
        //       </th>
        //       {/* <th className="border border-slate-600 text-start px-3 py-2 bg-gray-200">
        //         Full Name
        //       </th>
        //       <th className="border border-slate-600 text-start px-3 py-2 bg-gray-200">
        //         Applications
        //       </th> */}
          {/* //       <th className="border border-slate-600 text-start px-3 py-2 bg-gray-200">
        //         Action
        //       </th>
        //     </tr> */}
          {/* //   </thead> */}
          {/* //   <tbody className=" "> */}

          <div className="flex flex-col gap-3 mt-3">
            {job_applications &&
              job_applications.map((application, index) => {
                console.log(application);
                return (
                  <div
                    key={index}
                    className="text-start flex   hover:shadow-lg hover:shadow-blue-500 border border-blue-500 items-center justify-between pr-10 rounded-md "
                  >
                    <div className="   px-3 py-3">
                      <div className="flex gap-3 items-center">
                        <p className="font-bold text-blue-500">{index + 1}</p>
                        <img
                          src={`http://localhost:8000${application.job_seeker.profile_picture}`}
                          alt={application.full_name}
                          className="w-14 h-14 rounded-lg"
                        />
                        <div className="space-y-2">
                          <p className="font-bold ">
                            {application.job_seeker.first_name} &nbsp;{" "}
                            {application.job_seeker.last_name}
                          </p>
                          <p className=" text-gray-400">Profession</p>
                        </div>
                      </div>
                    </div>
                    {/* <td className="border border-slate-600 px-3 py-3"></td>
                    <td className="border border-slate-600 px-3 py-3">
                      no.applications
                    </td> */}
                    <div className="   flex border border-blue-500 rounded-md">
                      <div className="relative">
                        <button
                          onClick={() => {
                            setJobApplicant(application);
                            setOpenModal(true);
                          }}
                          className="text-blue-500 py-2 px-5 rounded hover:bg-blue-500 hover:text-white"
                        >
                          View Detail
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      ) : (
        <div
          className="p-4  text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
          role="alert"
        >
          <span className="font-medium">Danger alert!</span>
          There is No Application yet !
        </div>
      )}

      <Dialog
        open={openModal}
        handler={handleOpen}
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0.9, y: -10},
        }}
        size="lg"
      >
        <DialogHeader>Applicant Information</DialogHeader>
        <DialogBody>
          <ModalBody applicant={job_applicant} />
        </DialogBody>
      </Dialog>
    </div>
  );
};
export default Applications;
