import React from "react";
import { BsArrowRight } from "react-icons/bs";
import { Link } from "react-router-dom";

const UserRedirectionCard = (props) => {
  return (
    <div
      className={`w-full md:w-2/3   border pt-2 md:pt-5 pb-2  px-3 md:px-10 ${
        props.bg == "blue" ? "bg-blue-500 text-white" : "bg-gray-300"
      }   space-y-5 rounded-lg grid grid-cols-2`}
    >
      <div className="space-y-2  md:space-y-5">
        <h1 className="text-lg md:text-2xl font-semibold">
          Become a {props.title}
        </h1>
        <p className="w-full text-sm">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Similique
          delectus facilis voluptatibus eius illo consequatur animi consectetur{" "}
        </p>
        <Link to={props.path} state={props.activate}>
          <button className="bg-white text-blue-500 font-semibold py-2 px-5 rounded-md mt-4 flex gap-2">
            Register Now <BsArrowRight className="my-1" />
          </button>
        </Link>
      </div>
      <div className="h-32  ">
        <img src={props.image} alt="image" className="h-32 md:w-full" />
      </div>
    </div>
  );
};
export default UserRedirectionCard;
