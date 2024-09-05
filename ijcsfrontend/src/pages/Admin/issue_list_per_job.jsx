import { PencilIcon } from "@heroicons/react/24/outline";
import {
  Accordion,
  AccordionBody,
  AccordionHeader,
  Avatar,
  Button,
  Card,
  CardBody,
  CardFooter,
  Collapse,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  IconButton,
  Input,
  Textarea,
  Tooltip,
  Typography,
} from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import { CiCalendar } from "react-icons/ci";
import { FaRegMap } from "react-icons/fa";
import { FiLayers } from "react-icons/fi";
import { IoMdStopwatch } from "react-icons/io";
import { LuWallet } from "react-icons/lu";
import { PiBriefcaseLight } from "react-icons/pi";
import { Link, useLocation } from "react-router-dom";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, useFieldArray } from "react-hook-form";
import axios from "axios";

const IssuePerJob = () => {
  const location = useLocation();
  const { issue, job, company } = JSON.parse(location.state);

  const [issuePerJob, setIssuePerJob] = useState([]);

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
    console.log(company);
    console.log("issue from issue per job", location.state);

    setIssuePerJob(issue);
  }, [location]);

  const [open, setOpen] = useState();

  const handleOpen = (value) => setOpen(open === value ? "" : value);

  const [openModal, setOpenModal] = useState(false);
  const handleOpenModal = () => setOpenModal(!openModal);

  const [openInfoModal, setOpenInfoModal] = useState(false);
  const handleOpenInfoBox = () => setOpenInfoModal(!openInfoModal);

  const RemoveJob = async () => {
    await axios
      .patch(`http://localhost:8000/job_issue/all-issue/remove-job/${job.id}/`, {
        reason: reason,
      })
      .then((response) => {
        console.log(response.data);
        setOpenInfoModal(false);
      })
      .catch((error) => console.log(error));
    console.log(job.id, reason);
  };

  const ModalBody = () => {
    return (
      <div className="border py-5 xl:px-10 space-y-5">
        <div className="flex flex-col md:flex-row justify-between w-full">
          <div className="flex gap-2  py-2 items-center">
            <div>
              <img
                src={`http://localhost:8000${company.logo}`}
                alt={company.name}
                className="rounded-full w-16"
              />
            </div>
            <div className="w-full">
              <p className="text-lg font-bold">{job.title}</p>
              <div className="flex gap-3">
                <p className="text-gray-700 text-sm">at {company.name}</p>
                <p className="bg-green-500 text-white px-3 rounded text-sm flex items-center">
                  {job.job_category}
                </p>
              </div>
            </div>
          </div>
          <div className="flex px-2 md:justify-center items-center md:items-end gap-2">
            
            <button
              onClick={handleOpenInfoBox}
              className="bg-red-700 text-white py-2 px-10 rounded text-sm flex items-center gap-2  transition ease-in-out delay-150 hover:-translate-y-1    duration-300"
            >
              Remove Job
            </button>
          </div>
        </div>
        <div className="flex grid-cols-1 space-y-10 md:space-y-0 md:grid-cols-2">
          <div className="w-[45rem] md:col-span- flex flex-col space-y-5  h-full">
            <div className="space-y-2 ">
              <Typography className="font-bold">Job Description</Typography>
              <Typography className="text-gray-700 px-2 tracking-wide text-pretty whitespace-break-spaces  break-words">
                {job.job_description}
              </Typography>
            </div>

            <div className="space-y-2">
              <p className="font-bold">Requirements</p>
              <ul className="px-7">
                {job.required_skill &&
                  job.required_skill.map((val, index) => {
                    return (
                      <li className="text-gray-700 text-sm list-disc">{val}</li>
                    );
                  })}
              </ul>
            </div>

            <div className="space-y-2">
              <p className="font-bold">Responsibility</p>
              <ul className="px-7">
                {job.responsiblity &&
                  job.responsiblity.map((val, index) => {
                    return (
                      <li className="text-gray-700 text-sm list-disc">{val}</li>
                    );
                  })}
              </ul>
            </div>
            <div className="space-y-2">
              <p className="font-bold">Benefit</p>
              <ul className="px-7">
                {job.job_benefits &&
                  job.job_benefits.map((val, index) => {
                    return (
                      <li className="text-gray-700 text-sm list-disc">{val}</li>
                    );
                  })}
              </ul>
            </div>
          </div>
          <div className="space-y-3 ">
            <div className="md:flex w-full space-y-3 md:space-y-0">
              <div className="w-full justify-center flex flex-col items-center">
                <div className="border p-5 flex flex-col items-center w-full">
                  <LuWallet size={25} className="text-blue-500" />
                  <p className="font-bold text-sm ">Sallary</p>
                  {job.salary &&
                    (job.salary.sallaryChoice == "fixed" ? (
                      <p className="text-green-500 font-bold">
                        {job.salary.sallary} {job.salary.currency}
                      </p>
                    ) : job.salary.sallaryChoice == "Range" ? (
                      <div className="flex justify-center gap-2 w-full">
                        <p className="text-green-500 font-bold">
                          {job.salary.sallary.min}
                        </p>
                        <span>-</span>
                        <p className="text-green-500 font-bold">
                          {job.salary.sallary.max} {job.salary.currency}
                        </p>
                      </div>
                    ) : job.salary.sallaryChoice == "on-agreement" ? (
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

                  {job.location && (
                    <p className="text-gray-700 text-sm">
                      {job.location["region"]} , {job.location["additional"]}
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
                  <p className="text-xs font-semibold">{job.post_date}</p>
                </div>

                <div className="flex flex-col items-center">
                  <IoMdStopwatch size={25} className="text-blue-500" />

                  <p className="text-gray-500 text-xs">Job Expiry in</p>
                  <p className="text-xs font-bold">{job.deadline}</p>
                </div>

                <div className="flex flex-col items-center">
                  <FiLayers size={25} className="text-blue-500" />

                  <p className="text-gray-500 text-xs">Job Level</p>
                  <p className="text-xs font-bold">{job.job_level}</p>
                </div>

                <div className="flex flex-col items-center">
                  <LuWallet size={25} className="text-blue-500" />

                  <p className="text-gray-500 text-xs">Experience</p>
                  <p className="text-xs font-bold">{job.req_experience}</p>
                </div>

                <div className="col-span-2 flex flex-col items-center lg:w-1/2">
                  <PiBriefcaseLight size={25} className="text-blue-500" />
                  <p className="text-gray-500 text-xs">Education</p>
                  <p className="text-xs font-bold text-center w-full">
                    {job.education}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div>
      <div>
        <div className="border ml-4 px-4 flex justify-between mb-2 rounded-lg  border-blue-gray-100 py-5">
          {/* <Typography>Issue Reports for {job.title}</Typography> */}
          <div className="flex justify-between w-full">
            <div className={""}>
              <div className="flex items-center gap-3">
                <Avatar
                  src={`http://localhost:8000${company.logo}`}
                  alt={company.name}
                  size="md"
                />
                <div className="flex flex-col">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal opacity-70 capitalize"
                  >
                    {company.name}
                  </Typography>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {job.title}
                  </Typography>
                </div>
              </div>
            </div>
            <div className={"flex gap-3 items-center text-md font-serif"}>
              <Typography
                variant="small"
                color="blue-gray"
                className="font-normal"
              >
                {job.post_date}
              </Typography>
              <p>-</p>
              <Typography
                variant="small"
                color="blue-gray"
                className="font-normal"
              >
                {job.deadline}
              </Typography>
            </div>
            <Button
              variant="outline"
              onClick={() => {
                setOpenModal(true);
              }}
            >
              Review Job
            </Button>
          </div>
        </div>
        {issuePerJob &&
          issuePerJob.map((val, index) => {
            return (
              <div className="flex" key={index}>
                <div className="mb-2 px-1 py-10">
                  <Typography className="text-md">{index + 1}</Typography>
                </div>
                <Accordion
                  open={open === index}
                  className="mb-2 rounded-lg border border-blue-gray-100 px-4"
                >
                  <div onClick={() => handleOpen(index)}>
                    <div className="flex gap-2  px-4 py-5  cursor-pointer">
                      <AccordionHeader
                        className={`border-b-0 transition-colors  text-md  ${
                          open === index
                            ? "text-blue-500 hover:!text-blue-700"
                            : ""
                        }`}
                      >
                        <p className="overflow-clip w-2/3">{val}</p>
                      </AccordionHeader>{" "}
                    </div>
                  </div>
                  <AccordionBody className="pt-0 text-base font-normal px-10">
                    {val}
                  </AccordionBody>
                </Accordion>
              </div>
            );
          })}
      </div>

      <Dialog
        open={openModal}
        handler={handleOpenModal}
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0.9, y: -100 },
        }}
        size="lg"
      >
        <DialogHeader>Job Detail</DialogHeader>
        <DialogBody>
          <ModalBody />
        </DialogBody>
      </Dialog>
      <Dialog
        size="xs"
        open={openInfoModal}
        handler={handleOpenInfoBox}
        className="bg-transparent shadow-none"
      >
        <Card className="mx-auto w-full max-w-[24rem]">
          <CardBody className="flex flex-col gap-4">
            <Typography variant="h6" color="blue-gray">
              Reason for Removal {`" ${job.title} "`} job
            </Typography>

            <Typography className="-mb-2" variant="h6">
              Reason
            </Typography>
            <Textarea label="Reason" size="lg" {...register("reason")} />
          </CardBody>
          <CardFooter className="pt-0">
            <Button variant="gradient" onClick={RemoveJob} fullWidth>
              Confirm
            </Button>
          </CardFooter>
        </Card>
      </Dialog>
    </div>
  );
};

export default IssuePerJob;
