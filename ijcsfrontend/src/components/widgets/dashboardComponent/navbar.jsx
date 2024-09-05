import React from "react";
import { IoIosNotifications } from "react-icons/io";
import placeholder from "../../../assets/images/person.jpg";

function NavBar() {
  return (
    <div className="flex-1 left-0">
      <div className="flex justify-between bg-gray-200 shadow-lg py-4 px-3 ">
        <h2 className="text-2xl font-bold ">Navbar</h2>
        <div className="flex gap-3 ">
          <button>
            <IoIosNotifications color="blue" className="w-32 h-6" />
          </button>
          <img
            className="bg-green-400 rounded-full h-16 w-16 flex items-center justify-center"
            src={placeholder}
            alt=""
            srcSet=""
          />
        </div>
      </div>
    </div>
  );
}

export default NavBar;
