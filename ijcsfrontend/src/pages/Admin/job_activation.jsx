import { useEffect, useState } from "react";
import axios from "axios";
import { useUserContext } from "../../context/context";
import DeadlineCountdown from "../../components/remaining_date";
import { FcApproval } from "react-icons/fc";
import CheckCircleOutlineRoundedIcon from "@mui/icons-material/CheckCircleOutlineRounded";
import MoreHorizRoundedIcon from "@mui/icons-material/MoreHorizRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { SlOptionsVertical } from "react-icons/sl";

import { useNavigate, Link } from "react-router-dom";
import { button } from "@material-tailwind/react";

const MyJob = (props) => {
  const navigate = useNavigate();
  

  const [errorMessage, setErrorMessage] = useState("");
  const [message, setMessage] = useState("");

  const { user } = useUserContext();
  const [job, setJob] = useState([]);
  useEffect(() => { 
    async function getJob() {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/admins/get_job_activation_request/${user.id}/`
        );
        console.log(response.data["job_list"]); // Assuming the response has a 'data' property
        setJob(response.data["job_list"]);
      } catch (error) {
        console.log(error);
      }
    }

    getJob();
  }, [props.id]); // Include props.id as a dependency to re-fetch when it changes

  const JobDetail = (job_id) => {
    alert(job_id);
    localStorage.setItem("job_id", job_id);
    navigate("/AdminDashboard/dashboard/job_detail");
  };

  return (
    <div>
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

      {job ? (
        <table className="table-auto w-full border border-collapse border-spacing-2  border-slate-500">
          <thead>
            <tr className="text-start">
              <th className="border border-slate-600 text-start px-3 py-2 bg-gray-200">
                Jobs
              </th>
              <th className="border border-slate-600 text-start px-3 py-2 bg-gray-200">
                Status
              </th>
              <th className="border border-slate-600 text-start px-3 py-2 bg-gray-200">
                Applications
              </th>
              <th className="border border-slate-600 text-start px-3 py-2 bg-gray-200">
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
                          <strong>{job.title}</strong>
                        </p>
                        <div className="flex gap-3 text-gray-500">
                          <p>{job.job_type}</p>
                          <DeadlineCountdown deadlineString={job.deadline} />
                        </div>
                      </div>
                    </td>
                    <td className="border border-slate-600 px-3 py-3">
                      {(() => {
                        switch (job.status.toString().toLowerCase()) {
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
                      no.applications
                    </td>
                    <td className="border border-slate-600 px-3 py-3">
                      <div className="relative">
                        <button
                          onClick={() => {JobDetail(job.id)}}
                          className="text-blue-500 py-2 px-5 rounded hover:bg-blue-500 hover:text-white"
                        >
                          Job Detail
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      ) : (
        <div
          className="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400"
          role="alert"
        >
          <span className="font-medium">There is no job waiting for activation</span>
        </div>
      )}
    </div>
  );
};

export default MyJob;
