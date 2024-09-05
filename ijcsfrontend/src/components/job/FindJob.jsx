import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaBookmark } from "react-icons/fa";
import { GrLocation } from "react-icons/gr";
import { useLocation } from "react-router-dom";

function FindJob() {
  const location = useLocation();
  const searchQuery = new URLSearchParams(location.search).get("searchQuery");
  const [preferences, setPreferences] = useState({
    location: "",
    industry: [],
    job_type: "",
    job_category: "",
    sallary: "",
  });
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);

  useEffect(() => {
    fetchJobs();
  }, [preferences]);

  const fetchJobs = () => {
    // API call to fetch jobs based on preferences
    // Replace with your own API call implementation
    const apiUrl = "http://127.0.0.1:8000/job/get_jobs/";
    const queryParams = new URLSearchParams({
      location: preferences.location,
      industry: preferences.industry.join(","),
      job_type: preferences.job_type,
      job_category: preferences.job_category,
      sallary: preferences.sallary,
    });

    fetch(`${apiUrl}?${queryParams}`)
      .then((response) => response.json())
      .then((data) => {
        setJobs(data);
        setFilteredJobs(data);
      })
      .catch((error) => console.log(error));
  };
  const handleFilterChange = (event) => {
    const { name, value, type, checked } = event.target;

    if (type === "checkbox") {
      // Handle industry checkboxes separately
      let updatedIndustry = [...preferences.industry];

      if (checked) {
        updatedIndustry.push(value);
      } else {
        updatedIndustry = updatedIndustry.filter(
          (industryItem) => industryItem !== value
        );
      }

      setPreferences({ ...preferences, industry: updatedIndustry });
    } else {
      setPreferences({ ...preferences, [name]: value });
    }
  };

  const handleAllPreferences = () => {
    // Handle all preferences together
    fetchJobs();
  };

  const filterJobs = () => {
    let filtered = jobs;

    if (preferences.location) {
      filtered = filtered.filter(
        (job) => job.location.region === preferences.location
      );
    }

    if (preferences.industry.length > 0) {
      filtered = filtered.filter((job) =>
        preferences.industry.some((industryItem) =>
          job.tag.includes(industryItem)
        )
      );
    }

    if (preferences.job_type) {
      filtered = filtered.filter(
        (job) => job.job_type === preferences.job_type
      );
    }
    if (preferences.job_category) {
      filtered = filtered.filter(
        (job) => job.job_category === preferences.job_category
      );
    }

    if (preferences.sallary) {
      filtered = filtered.filter(
        (job) => job.salary.sallary === preferences.sallary
      );
    }

    setFilteredJobs(filtered);
  };

  useEffect(() => {
    filterJobs();
  }, [jobs]);

  return (
    <div className="mx-auto">
      <div className="w-full h-14 bg-gray-200 px-28 text-gray-500">
        <h1 className="float-start my-4">Find Jobs</h1>
        <p className="float-end  my-4">Home / Find Jobs</p>
        {searchQuery}
      </div>
      <div className="flex gap-3 py-6 mx-5">
        <div className="border-r px-6 border-blue-gray-400 w-1/4 mr-10">
          <div className="">
            <h1 className="font-semibold">Filters:</h1>
          </div>
          {/* Preference Inputs */}
          <select
            name="location"
            value={preferences.location}
            onChange={handleFilterChange}
            className="my-2 p-3 border border-gray-300 rounded-none w-full"
          >
            <option value="" className="py-2">
              Select Location
            </option>
            <option value="Addis Ababa">Addis Ababa</option>
            <option value="San Francisco">Dire Dawa</option>
            <option value="Sidama Region">Sidama Region</option>
            <option value="South Western Ethiopia">
              South Western Ethiopia
            </option>
          </select>

          <div className="my-2 w-full">
            <h4 className="font-semibold">Industry:</h4>
            <label className="flex items-center">
              <input
                type="checkbox"
                name="industry"
                value="Personal Development"
                checked={preferences.industry.includes("Personal Development")}
                onChange={handleFilterChange}
                className="mr-2 w-4 h-4 rounded-0"
              />
              Personal Development
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                name="industry"
                value="IT and SOFTWARE"
                checked={preferences.industry.includes("IT and SOFTWARE")}
                onChange={handleFilterChange}
                className="mr-2 w-4 h-4 rounded-0"
              />
              IT and Software
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                name="industry"
                value="Business"
                checked={preferences.industry.includes("Business")}
                onChange={handleFilterChange}
                className="mr-2 w-4 h-4 rounded-none"
              />
              Business
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                name="industry"
                value="Photograpy and Video"
                checked={preferences.industry.includes("Photograpy and Video")}
                onChange={handleFilterChange}
                className="mr-2 w-4 h-4 rounded-none"
              />
              Photograpy and Video
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                name="industry"
                value="Finance and Accounting"
                checked={preferences.industry.includes(
                  "Finance and Accounting"
                )}
                onChange={handleFilterChange}
                className="mr-2 w-4 h-4 rounded-none"
              />
              Finance and Accounting
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                name="industry"
                value="Office Productivity"
                checked={preferences.industry.includes("Office Productivity")}
                onChange={handleFilterChange}
                className="mr-2 w-4 h-4 rounded-none"
              />
              Office Productivity
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                name="industry"
                value="Marketing"
                checked={preferences.industry.includes("Marketing")}
                onChange={handleFilterChange}
                className="mr-2 w-4 h-4 rounded-none"
              />
              Marketing
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                name="industry"
                value="Design"
                checked={preferences.industry.includes("Design")}
                onChange={handleFilterChange}
                className="mr-2 rounded-none w-4 h-4"
              />
              Design
            </label>
            {/* Add more industry checkboxes */}
          </div>
          <div className="my-4">
            <h4 className="font-semibold">Job Type:</h4>
            <label className="flex items-center">
              <input
                type="radio"
                name="job_type"
                value="Contract"
                checked={preferences.job_type === "Contract"}
                onChange={handleFilterChange}
                className="mr-2 w-4 h-4"
              />
              Contract
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="job_type"
                value="Part-time"
                checked={preferences.job_type === "Part-time"}
                onChange={handleFilterChange}
                className="mr-2 w-4 h-4"
              />
              Part-time
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="job_type"
                value="Full-time"
                checked={preferences.job_type === "Full-time"}
                onChange={handleFilterChange}
                className="mr-2 w-4 h-4"
              />
              Full-time
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="job_type"
                value="Permanent"
                checked={preferences.job_type === "Permanent"}
                onChange={handleFilterChange}
                className="mr-2 w-4 h-4"
              />
              Permanent
            </label>
            {/* Add more job type radio buttons */}
          </div>
          <div className="my-4">
            <h4 className="font-semibold">Job Category:</h4>
            <label className="flex items-center">
              <input
                type="radio"
                name="job_category"
                value="Remote"
                checked={preferences.job_category === "Remote"}
                onChange={handleFilterChange}
                className="mr-2 w-4 h-4"
              />
              Remote
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="job_category"
                value="On-site"
                checked={preferences.job_category === "On-site"}
                onChange={handleFilterChange}
                className="mr-2 w-4 h-4"
              />
              On Site
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="job_category"
                value="Freelance"
                checked={preferences.job_category === "Freelance"}
                onChange={handleFilterChange}
                className="mr-2 w-4 h-4"
              />
              Freelance
            </label>
            {/* Add more job type radio buttons */}
          </div>
          <div className="my-4">
            <h4 className="font-semibold">Salary Range:</h4>
            <label className="flex items-center">
              <input
                type="radio"
                name="sallary"
                value="500"
                checked={preferences.sallary === "500"}
                onChange={handleFilterChange}
                className="mr-2 w-4 h-4"
              />
              <span className="font-semibold text-gray-600 text-xl mr-1">
                &lt;
              </span>{" "}
              500
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="sallary"
                value="500-1000"
                checked={preferences.sallary === "500-1000"}
                onChange={handleFilterChange}
                className="mr-2 w-4 h-4"
              />
              500 - 1000
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="sallary"
                value="2000"
                checked={preferences.sallary === "2000"}
                onChange={handleFilterChange}
                className="mr-2 w-4 h-4"
              />
              <span className="font-semibold text-gray-600 text-xl mr-1">
                &gt;
              </span>{" "}
              2000
            </label>
            {/* Add more salary range radio buttons */}
          </div>
          {/* <button
            onClick={handleAllPreferences}
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          >
            Apply Filters
          </button> */}
        </div>
        {/* Display Filtered Jobs */}
        <div className="w-3/4">
          {filteredJobs.length === 0 ? (
            <div className="shadow-lg p-14 font-serif text-2xl text-center text-blue-gray-900 items-center">
              No jobs found.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredJobs
                .filter((job) => {
                  if (!searchQuery) {
                    return true; // Display all jobs if searchQuery is null or empty
                  } else {
                    // Display jobs that have the searchQuery in title, job_tag, or job_role
                    const lowerCaseQuery = searchQuery.toLowerCase();
                    return (
                      job?.title?.toLowerCase().includes(lowerCaseQuery) ||
                      job?.job_tag?.toLowerCase().includes(lowerCaseQuery) ||
                      job?.job_role?.toLowerCase().includes(lowerCaseQuery)
                    );
                  }
                })
                .map((job, index) => (
                  <Link
                    to={`/find-job/job-detail/${job.id}`}
                    key={index}
                    className="bg-white rounded shadow-md p-4 transform hover:scale-105 transition duration-300"
                  >
                    <h3 className="text-lg font-bold mb-2">{job.title}</h3>
                    <div className="flex gap-3 items-center">
                      <p className="mb-2 uppercase bg-green-50 py-1 px-2 font-semibold text-green-500 rounded">
                        {job.job_type}
                      </p>
                      <p className="text-gray-600 text-lg -mt-2">
                        Salary:{" "}
                        {typeof job.salary.sallary === "object"
                          ? `${job.salary.sallary.min} - ${job.salary.sallary.max}`
                          : job.salary.sallary}
                        <span>{job.salary.currency}</span>
                      </p>
                    </div>

                    <div className="text-gray-600 flex items-center gap-1">
                      <GrLocation />
                      <span>{job.location.region}</span>
                    </div>

                    <div className="flex justify-end text-gray-500">
                      <FaBookmark />
                    </div>
                    {/* {JSON.stringify(job.salary.sallary)} */}
                    {/* Display more job details */}
                  </Link>
              //     <Link
              //   to={`find-job/job-detail/${index}`}
              //   key={index}
              //   className={`border border-gray-300 py-2 px-3 rounded-md  space-y-1 cursor-pointer hover:scale-105 duration-300 bg-gradient-to-r from-yellow-50  ${
              //     index == 0 ? "hidden" : ""
              //   }`}
              // >
              //   <p className="font-semibold">{value.title}</p>
              //   <div className="flex gap-3">
              //     <p className="text-green-900 font-bold text-xs">
              //       {value.jobType}
              //     </p>
              //     <p className="text-xs text-gray-500 text-center">
              //       Sallary : {value.sallary}
              //     </p>
              //   </div>
              //   <div className="flex gap-4">
              //     <div>
              //       <img
              //         src={fb}
              //         alt="logo"
              //         className="w-10"
              //         width={100}
              //         height={100}
              //       />
              //     </div>
              //     <div>
              //       <p className="font-semibold">{value.companyName}</p>
              //       <div className="flex gap-24">
              //         <div className="flex gap-1">
              //           <IoLocationOutline />
              //           <p className="text-xs text-gray-500 text-center">
              //             {value.companyLocation}
              //           </p>
              //         </div>
              //         <button>
              //           <CiBookmark className="hover:scale-110" />
              //         </button>
              //       </div>
              //     </div>
              //   </div>
              // </Link>



                ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default FindJob;
