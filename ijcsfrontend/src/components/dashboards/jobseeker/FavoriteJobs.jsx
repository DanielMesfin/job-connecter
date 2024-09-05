import React from "react";
import { useLocation } from "react-router-dom";
import RecommendJobList from "../../body/RecommendJobList";
const FavoriteJobs = () => {
  // const autedUserData = useLocation()?.state?.userData;
  const autedUserData = useLocation()?.state?.data || JSON.parse(localStorage.getItem("user"));
  const showOnlyFavorites = true; // Set the boolean value here
  return (
    <div>
      {autedUserData.id}Favorite Jobs Component
      <div className="">
        <RecommendJobList
          jobseekerId={autedUserData.id}
          showOnlyFavorites={showOnlyFavorites} // Pass the boolean value as a prop
        />
      </div>
    </div>
  );
};
export default FavoriteJobs;
