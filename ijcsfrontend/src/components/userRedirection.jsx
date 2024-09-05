import React from "react";
import UserRedirectionCard from "./widgets/userRedirectingCard";
import hrPointer from "../assets/images/hrPointer22.png";
import cp from '../assets/images/pc (2).png'

const UserRedirection = () => {
  return (
    <div className="flex flex-col md:flex-row md:justify-center gap-3 p-2 md:gap-10">
      <UserRedirectionCard image={cp} title="Candidate" content="" bg="white" path="/register" activate="Candidate"/>
      <UserRedirectionCard image={hrPointer} title="Employer" content="" bg="blue" path="/register" activate="employer"/>
    </div>
  );
};
export default UserRedirection;
