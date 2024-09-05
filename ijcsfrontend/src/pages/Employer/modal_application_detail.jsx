import React, { useState, useEffect } from "react";
import { Button } from "@material-tailwind/react";
import { MdStarOutline, MdOutlineStarPurple500 } from "react-icons/md";

import { FaFilePdf, FaGraduationCap, FaRegMap } from "react-icons/fa6";
import { MdOutlineMessage } from "react-icons/md";
import { IoMdStopwatch } from "react-icons/io";

import { CiCalendar, CiLocationArrow1 } from "react-icons/ci";
import { IoPersonOutline } from "react-icons/io5";

import { GrLocation } from "react-icons/gr";
import { LuPhoneCall } from "react-icons/lu";
import { PiGlobeLight } from "react-icons/pi";
import { TfiEmail } from "react-icons/tfi";
import { Link } from "react-router-dom";
import MessageComponet from "../../components/widgets/message/MessageComponet";
import axios from "axios";

const ModalBody = (props) => {
  const job_applicant = props?.applicant;

  const [fav_jobSeeker, setFavJobSeeker] = useState(false);

  useEffect(() => {
    const Check_app_in_shortlist = async () => {
      await axios
        .get(
          `http://localhost:8000/applications/shortlist/check-app-shortlist/${job_applicant.application.id}/`
        )
        .then((val) => {
          setFavJobSeeker(val.data);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    Check_app_in_shortlist();
  }, [fav_jobSeeker]);

 

  const Add_toShortlist = async () => {
    if (fav_jobSeeker == false) {
      await axios
        .post(
          `http://localhost:8000/applications/shortlist/add-to-shortlist/${job_applicant.application.id}/`
        )
        .then((val) => {
          console.log(val.data);
          setFavJobSeeker(true);
        })
        .catch((error) => {
          console.log(error);
          setFavJobSeeker(false);
        });
    } else {
      await axios
        .delete(
          `http://localhost:8000/applications/shortlist/remove-from-shortlist/${job_applicant.application.id}/`
        )
        .then((val) => {
          console.log(val.data);
          setFavJobSeeker(false);
        })
        .catch((error) => {
          console.log(error);
          setFavJobSeeker(false);
        });
    }
    console.log("job rejected");
  };


  const RejectApplication = async () => {
    await axios
      .patch(
        `http://localhost:8000/applications/application-status/${job_applicant.application.id}/`
      )
      .then((val) => {
        console.log(val.data);
        // Add_toShortlist()
      })
      .catch((error) => {
        console.log(error);
      });

    console.log("job rejected");
  };
  return (
    job_applicant && (
      <div className="space-y-6 w-full">
        <div className="flex items-center gap-3 justify-between">
          <div className="flex items-center gap-3">
            <img
              src={`http://localhost:8000${job_applicant.job_seeker.profile_picture}`}
              alt=""
              className="rounded-full h-16 w-16"
            />
            <div>
              <p className="font-bold text-lg capitalize text-black">
                {job_applicant.job_seeker.first_name}
                &nbsp;
                {job_applicant.job_seeker.last_name}
              </p>
              <p className="text-gray-500 text-sm">website Designer </p>
            </div>
          </div>
          <div className="flex gap-4">
       
            {/* messagecomponet */}
            <MessageComponet
              user={job_applicant["application"]["job_seeker_id"]}
              employer={1}
            />
            <a
              href={`mailto:${job_applicant.job_seeker.email}`}
              className="border-2 border-blue-500 items-center  text-blue-700 font-bold hover:text-white hover:bg-blue-500 hover:border-white transition-all duration-75 ease-in-out "
            >
              {" "}
              <button className="flex  gap-2  px-3 py-2">
                <TfiEmail size={20} />
                Send Email
              </button>
            </a>
          </div>
        </div>
        <div className="flex gap-3 justify-end">
          <button
            className="h-10 bg-blue-200 hover:bg-blue-400 rounded-md p-2 flex"
            onClick={() => {
              Add_toShortlist();
              // setFavJobSeeker(!fav_jobSeeker)
            }}
          >
            {!fav_jobSeeker == true ? (
              <MdStarOutline size={23} />
            ) : (
              <MdOutlineStarPurple500 size={23} />
            )}
          </button>
          <Button
            variant="outline"
            color="red"
            size="md"
            onClick={RejectApplication}
          >
            Reject
          </Button>
        </div>
        <div className="flex gap-4">
          <div className="w-full space-y-5">
            <div className="">
              <p className="text-lg font-semibold text-black">Biography</p>
              <div className="space-y-6">
                {/* {JSON.stringify(props)} */}
                <p className="text-normal leading-relaxed text-gray-500 dark:text-gray-400 tracking-wider">
                  {job_applicant.job_seeker?.bio}
                </p>
              </div>
            </div>
            <hr />
            <div>
              <p className="text-lg font-semibold text-black">Cover Letter</p>
              <div className="space-y-6 leading-relaxed text-gray-500 dark:text-gray-400 tracking-wider">
                <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                  {job_applicant.application.cover_letter}
                </p>
              </div>
            </div>
          </div>
          <div className="space-y-3 w-full">
            <div className="md:flex w-full space-y-3 md:space-y-0">
              <div className="w-full justify-center flex flex-col items-center">
                <div className="border p-5 flex flex-col items-center w-full">
                  <CiCalendar size={25} className="text-blue-500" />
                  <p className="text-xs text-black font-bold">Date of Birth</p>
                  <p className="text-sm text-gray-500">
                    {" "}
                    {job_applicant.job_seeker.birth_date}
                  </p>
                </div>
              </div>
              <div className="w-full flex flex-col items-center">
                <div className="border p-5 flex w-full  flex-col items-center">
                  <FaRegMap size={25} className="text-blue-500" />
                  <p className="text-xs text-black font-bold">Nationality</p>
                  <p className="text-sm text-gray-500 ">
                    {job_applicant.job_seeker.nationality}
                  </p>
                </div>
              </div>
            </div>
            <div className="border py-5 px-5 space-y-3 w-full">
              <div className="grid grid-cols-3">
                <div className="flex flex-col items-center mb-4">
                  <IoPersonOutline size={25} className="text-blue-500" />
                  <p className="text-xs text-black font-bold">Gender</p>
                  <p className="text-xs font-semibold">
                    {job_applicant.job_seeker.gender}
                  </p>
                </div>

                <div className="flex flex-col items-center">
                  <IoMdStopwatch size={25} className="text-blue-500" />

                  <p className="text-xs text-black font-bold">Experience</p>
                  <p className="text-xs font-bold">
                    {job_applicant.job_seeker.experience} Years
                  </p>
                </div>

                <div className=" flex flex-col items-center">
                  <FaGraduationCap size={25} className="text-blue-500" />
                  <p className="text-xs text-black font-bold">Education</p>
                  <p className="text-xs font-bold text-center w-full">
                    cvdfafdaf
                  </p>
                </div>
              </div>
            </div>
            <Button
              color="white"
              className="w-full justify-center flex flex-col items-center cursor-pointer"
            >
              <a  
                href={`http://localhost:8000/media/${job_applicant.application.resume}`}
                target="_blank"
                className="border p-5 flex flex-col items-center gap-2 w-full"
              >
                <FaFilePdf size={25} className="text-blue-500" />
                <p className="text-sm font-bold">Download CV</p>
              </a>
            </Button>
            {/* <div className="border space-y-3 py-5 px-5  ">
              <p className="font-semibold text-black">Contact Information</p>
              <div className="flex gap-2">
                <PiGlobeLight size={25} className="text-blue-500 " />
                <div className="">
                  <p className="text-xs">Website</p>
                  <p className="text-black text-sm font-bold">
                    wwww.website.com
                  </p>
                </div>
              </div>
              <hr />
              <div className="flex gap-2">
                <GrLocation size={25} className="text-blue-500 " />
                <div className="">
                  <p className="text-xs">Location</p>
                  <p className="text-black text-sm font-bold">
                    {job_applicant.job_seeker.location || "-"}
                  </p>
                </div>
              </div>
              <hr />
              <div className="flex gap-2">
                <LuPhoneCall size={25} className="text-blue-500 " />
                <div className="">
                  <p className="text-xs">Phone</p>
                  <p className="text-black text-sm font-bold">
                    {job_applicant.job_seeker.phone || "-"}
                  </p>
                </div>
              </div>
              <hr />
              <div className="flex gap-2">
                <TfiEmail size={25} className="text-blue-500 " />
                <div className="">
                  <p className="text-xs">Email Address</p>
                  <p className="text-black text-sm font-bold">
                    {job_applicant.job_seeker.email || "-"}
                  </p>
                </div>
              </div> */}
              {/* <div className="flex gap-5">
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
                </div> */}
            {/* </div> */}
          </div>
        </div>
      </div>
    )
  );
};
export default ModalBody;
