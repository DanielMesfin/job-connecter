import React from "react";

const JobCard = (props) => {
  return (
    <div>
      <h2>Title {props.job["fields"]["title"]}</h2>
      <h3>Score {props.job.score}</h3>
    </div>
  );
};
export default JobCard;
