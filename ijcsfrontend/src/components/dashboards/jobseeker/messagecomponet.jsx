import React, { useState } from "react";
import { IoClose } from "react-icons/io5";
import MessageData from "./message";
import { FaBell } from "react-icons/fa";

const MessageComponetJS = ({ user }) => {
  const [isOffcanvasOpen, setIsOffcanvasOpen] = useState(false);
  const toggleOffcanvas = () => {
    setIsOffcanvasOpen(!isOffcanvasOpen);
  };

  return (
    <div className="z-30">
      <button
        className="flex gap-2 px-1 py-1 border-2 border-blue-500 items-center text-blue-700 font-bold hover:text-white hover:bg-blue-500 hover:border-white transition-all duration-75 ease-in-out rounded-full"
        onClick={toggleOffcanvas}
      >
        <FaBell className="  hover:text-white hover:bg-blue-500 hover:border-white transition-all duration-75 ease-in-out mr-3" />
      </button>

      <div
        className={`z-3 fixed top-0 right-0 h-full w-1/3 bg-white shadow-lg transition-transform transform ${
          isOffcanvasOpen ? "translate-x-0" : "translate-x-full"
        }`}
        style={{ overflowY: "auto" }}
      >
        <div className="p-4">
          <h2 className="text-xl font-bold mb-4">Your Message</h2>
          <button
            className="fixed right-0 top-0 m-4 p-2 bg-blue-500 text-white rounded-full"
            onClick={toggleOffcanvas}
          >
            <IoClose />
          </button>
          <MessageData receiverUsername={user.id} />
        </div>
      </div>
    </div>
  );
};

export default MessageComponetJS;
