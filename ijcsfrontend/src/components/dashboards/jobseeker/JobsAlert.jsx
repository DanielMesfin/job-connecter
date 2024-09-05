import React from "react";
import { useLocation } from "react-router-dom";

import RecommendJobList from "../../body/RecommendJobList";

const JobsAlert = () => {
  const autedUserData = useLocation()?.state?.data  || JSON.parse(localStorage.getItem("user"));

  return (
    <>
      Jobs Alert Component
      <div className="">
        <RecommendJobList jobseekerId={autedUserData.id} />
      </div>
    </>
  );
};
export default JobsAlert;
