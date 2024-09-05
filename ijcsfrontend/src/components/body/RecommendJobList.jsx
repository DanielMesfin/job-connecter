import React, { useEffect, useState, createContext } from "react";
import { BsCurrencyDollar } from "react-icons/bs";
import { IoLocationOutline } from "react-icons/io5";
import { FaBookmark } from "react-icons/fa6";
import axios from "axios";

import JobDetails from "./JobDetails";

export const RecommendationContext = createContext();

const RecommendJobList = (props) => {
  const [recommendations, setRecommendations] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [isPopupOpen, setPopupOpen] = useState(false); // Track the state of the popup

  useEffect(() => {
    axios
      .get(
        `http://127.0.0.1:8000/recommendation/recommend_jobs_for_each_skill/${props.jobseekerId}/`
      )
      .then((response) => {
        console.log("response");
        console.log(response.data);
        setRecommendations(response.data["recommendations"]);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [props.employerId]);

  // Filter the recommendations based on the showOnlyFavorites prop
  const filteredRecommendations = props.showOnlyFavorites
    ? recommendations.filter((rec) => rec.is_favorite)
    : recommendations;
  console.log("This is filteredRecommendations", filteredRecommendations);
  const handleViewDetails = (job) => {
    setSelectedJob(job);
    setPopupOpen(true); // Open the popup when the view details button is clicked
  };

  const handleApply = () => {
    // Handle the apply button click event here
    // You can show another popup form or perform any other action
    console.log("Apply button clicked");
  };
  
  const handleFavorite = (jobId) => {

    const recommendation = recommendations.find((rec) => rec.pk === jobId);
    const favoriteData = new FormData();
    favoriteData.append("jobseeker_id", props.jobseekerId);
    favoriteData.append("job_id", jobId);

    console.log("Recommendation inside handleFavorite:", recommendation);
    if (!recommendation) return; // Return early if recommendation is not found
  
    // Send a POST request to toggle the favorite status
    axios
      .post(`http://127.0.0.1:8000/favorite/toggle_favorite_job/`, 
        favoriteData
      )
      .then((response) => {
        console.log("This is favourite job adding respone: ",response)
      })
      .catch((error) => {
        console.error(error);
      });
  };
  return (
    <div>
      <div className="flex px-4 py-4 bg-gray-100 rounded mt-3">
        <div className="flex w-[50%] justify-start text-gray-500">Jobs</div>
        <div className="flex w-[50%] justify-end">
          <span className="w-[40%] text-gray-500">Posted Date</span>
          <span className="w-[40%] text-gray-500">Deadline Date</span>
          <span className="w-[20%] text-gray-500">Action</span>
        </div>
      </div>
      {filteredRecommendations.length === 0 ? (
        <div className="flex justify-center items-center pt-10 text-3xl font-extralight text-gray-500 font-serif">No Favorite Jobs Found</div>
      ) : (
        <RecommendationContext.Provider value={filteredRecommendations}>
          <ul>
            {recommendations.map((recommendation, index) => (
              <li key={index}>
                {/* <div className="">{JSON.stringify(recommendation)}</div> */}
                <div className="flex mt-3 items-center pl-4">
                  <div className="flex w-[50%]">
                    <div className="w-[20%] h-16 bg-green-300 text-white flex items-center justify-center font-serif">
                      company {recommendation.fields.employer}
                    </div>
                    <div className="w-[80%] block mt-1">
                      <div className="flex ml-2 ">
                        <h1 className="mr-1">{recommendation.fields.title}</h1>
                        <span className="rounded-2xl text-blue-200 bg-blue-50 px-2 py-1">
                          {recommendation.fields.job_category}
                        </span>
                      </div>
                      <div className="flex justify-start items-center text-gray-500 mt-1 ml-1">
                        <IoLocationOutline size={24} />{" "}
                        <h1 className="mr-3">
                          {recommendation.fields.location.region}
                        </h1>{" "}
                        <BsCurrencyDollar size={24} />
                        <span>
                          {recommendation.fields.salary.sallary}/month
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="w-[50%] flex justify-end items-center">
                    <span className="w-[40%] flex justify-start text-sm text-gray-500">
                      {recommendation.fields.post_date}
                    </span>
                    <span className="w-[40%] flex justify-start text-sm text-gray-500">
                      {recommendation.fields.deadline}
                    </span>

                    <div className="w-[35%] flex gap-3">
                      {/* Here is where I am going to handle is favorites job saving */}
                      <button onClick={() => handleFavorite(recommendation.pk)}>
                        <FaBookmark
                          className={`text-blue-500 ${
                            recommendation.is_favorite
                              ? "text-blue-500"
                              : "text-gray-500"
                          }`}
                        />
                      </button>
                      {/* Here is where I am going to end handle is favorites job saving */}
                      <button
                        onClick={() => handleViewDetails(recommendation)}
                        className="p-2 rounded bg-gray-100 text-blue-500 hover:bg-blue-500 hover:text-white"
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </RecommendationContext.Provider>
      )}
      {/* Render the JobDetails component with the selected job */}
      {selectedJob && (
        <JobDetails
          job={selectedJob}
          isPopupOpen={isPopupOpen}
          setPopupOpen={setPopupOpen}
          handleApply={handleApply}
          jobseekerId={props.jobseekerId}
        />
      )}
    </div>
  );
};

export default RecommendJobList;
