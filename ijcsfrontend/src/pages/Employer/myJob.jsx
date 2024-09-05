import { useEffect, useState } from "react";
import axios from "axios";
import { useUserContext } from "../../context/context";
import DeadlineCountdown from "../../components/remaining_date";
import { FcApproval } from "react-icons/fc";
import CheckCircleOutlineRoundedIcon from "@mui/icons-material/CheckCircleOutlineRounded";
import MoreHorizRoundedIcon from "@mui/icons-material/MoreHorizRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { SlOptionsVertical } from "react-icons/sl";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { useNavigate, Link } from "react-router-dom";

const MyJob = (props) => {
  const navigate = useNavigate();

  const [errorMessage, setErrorMessage] = useState("");
  const [message, setMessage] = useState("");
  const [job4overview, setJob4Overview] = useState([]);

  const { user } = useUserContext();
  const [job, setJob] = useState([]);

  const [open, setOpen] = useState(false);
  const [reason, setReason] = useState("");

  const handleOpen = (reason) => {
    setOpen(!open);
    setReason(reason);
  };

  const [showOption, setShowOption] = useState({
    state: false,
    index: 0,
  });


  useEffect(() => {
    async function getJob() {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/user/employer/jobs/${user.id}/`
        );
        console.log(response.data["job_list"]); // Assuming the response has a 'data' property
        // setJob(response.data["job_list"]);
        // props.limit&&setJob4Overview(job.slice(0, props.limit))
        setJob(
          props.limit
            ? response.data["job_list"].slice(0, props.limit)
            : response.data["job_list"]
        );
      } catch (error) {
        console.log(error);
      }
    }

    getJob();
  }, [props.id]); // Include props.id as a dependency to re-fetch when it changes


  const options = [
    {
      label: "Edit",
      func: (id) => {
        alert(id);
        localStorage.setItem("job_id", id);
        navigate("/EmployerDashboard/dashboard/updateJob");
      },
    },
    {
      label: "Delete",
      func: async (id) => {
        if (window.confirm("Are you sure to delete this job?")) {
          try {
            await axios
              .delete(`http://127.0.0.1:8000/job/delete_job/${user.id}/${id}/`)
              .then((val) => {
                console.log(val);
                setJob(job.filter((jb)=>jb.id!==id))
                setErrorMessage("");
                setMessage("Job Deleted Successfully");
              })
              .catch((err) => {
                setMessage("");
                setErrorMessage("Failed to Delete Job");
                console.log(err);
              });
          } catch (error) {
            alert(error);
            console.log(error);
          }
        }
      },
    },
    {
      label: "Detail",
      func: (job_id) => {
        alert(job_id);
        localStorage.setItem("job_id", job_id);
        navigate(`/job_detail/${job_id}`);
      },
    },
  ];



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
      <table className="table-auto w-full border border-collapse border-spacing-2">
        <thead>
          <tr className="text-start">
            <th className="border border-slate-600 text-start px-3 py-2 bg-blue-500 text-white ">
              Jobs
            </th>
            <th className="border border-slate-600 text-start px-3 py-2 bg-blue-500 text-white ">
              Status
            </th>
            <th className="border border-slate-600 text-start px-3 py-2 bg-blue-500 text-white ">
              Applications
            </th>
            <th className="border border-slate-600 text-start px-3 py-2 bg-blue-500 text-white ">
              Action
            </th>
          </tr>
        </thead>
        <tbody className=" ">
          {job &&
            job.map((job, index) => {
              return (
                <tr key={index} className="text-start  hover:shadow-lg">
                  <td className=" border border-slate-600 px-3 py-3">
                    <div className="flex flex-col gap-2">
                      <p>
                        <strong>{job["job"].title}</strong>
                      </p>
                      <div className="flex gap-3 text-gray-500">
                        <p>{job["job"].job_type}</p>
                        <DeadlineCountdown deadlineString={job.job.deadline} />
                      </div>
                    </div>
                  </td>
                  <td className="border border-slate-600 px-3 py-3">
                    {(() => {
                      switch (job["job"].status.toString().toLowerCase()) {
                        case "pending":
                          return (
                            <span className="text-blue-500">
                              <MoreHorizRoundedIcon /> pending
                            </span>
                          );
                        case "approved":
                          return (
                            <span className="text-green-500">
                              <CheckCircleOutlineRoundedIcon /> approved
                            </span>
                          );

                        case "declined":
                          return (
                            <span className="text-orange-500">
                              <CloseRoundedIcon className="border rounded-full border-orange-500" />{" "}
                              declined
                            </span>
                          );
                        case "removed":
                          return (
                            <span className="text-red-500 flex gap-5">
                              <td>
                                <span>
                                  <CloseRoundedIcon className="border rounded-full border-orange-500" />{" "}
                                  Removed
                                </span>
                              </td>
                              <td>
                                <p
                                  onClick={() => handleOpen(job["job"])}
                                  color="blue"
                                  value="Reason"
                                  className="cursor-pointer text-blue-500 underline  hover:underline-offset-2"
                                >
                                  Reason
                                </p>
                              </td>
                            </span>
                          );
                        case "rejected":
                          return (
                            <span className="text-green-500">
                              <CheckCircleOutlineRoundedIcon /> rejected
                            </span>
                          );

                        default:
                          return null;
                      }
                    })()}
                  </td>
                  <td className="border border-slate-600 px-3 py-3">
                    {job["number_application"] == 0
                      ? " Not Applied "
                      : `${job["number_application"]}  ${
                          job["number_application"] == 1
                            ? " Application"
                            : "Applications"
                        } `}
                  </td>
                  <td className="border border-slate-600 px-3 py-3">
                    <div className="relative">
                      <div className="flex">
                        <Link
                          to={"/EmployerDashboard/dashboard/job_application"}
                          state={job["job"].id}
                        >
                          <button
                            className="text-blue-500 py-2 px-5 rounded bg-gray-300 hover:bg-blue-500 hover:text-white disabled:opacity-50"
                            disabled={job["number_application"] == 0}
                          >
                            View Applications
                          </button>
                        </Link>

                        <button
                          onClick={() =>
                            setShowOption((prevState) => ({
                              ...prevState,
                              state: !prevState.state,
                              index: index,
                            }))
                          }
                          className="text-blue-500 hover:bg-blue-100 p-2 rounded-md"
                        >
                          <SlOptionsVertical size={20} />
                        </button>

                        {showOption["state"] &&
                          index === showOption["index"] && (
                            <div className="absolute top-full left-0 z-10 w-1/2 bg-gray-100  rounded-md shadow-lg ">
                              {options.map((option, idx) => (
                                <button
                                  data-modal-target="popup-modal"
                                  data-modal-toggle="popup-modal"
                                  type="button"
                                  key={idx}
                                  onClick={() => {
                                    option.func(job["job"].id);
                                    setShowOption((prevState) => ({
                                      ...prevState,
                                      state: !prevState.state,
                                      index: 0,
                                    }));
                                  }}
                                  className="hover:bg-blue-500 w-full text-start p-2 border-b-2 hover:text-white hover:shadow-md"
                                >
                                  {option.label}
                                </button>
                              ))}
                            </div>
                          )}
                      </div>
                    </div>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>

      <Dialog open={open} handler={handleOpen}>
        <DialogHeader>Reason for Job Removal</DialogHeader>
        <DialogBody>{reason.reason}</DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={handleOpen}
            className="mr-1"
          >
            <span>Close</span>
          </Button>

          <Button
            variant="gradient"
            color="green"
            onClick={() => options[0].func(reason.id)}
          >
            <span>Edit Job</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </div>
  );
};

export default MyJob;
