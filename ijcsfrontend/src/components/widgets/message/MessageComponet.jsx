import React, { useState } from "react";
import { MdOutlineMarkUnreadChatAlt, MdOutlineMessage } from "react-icons/md";
import { IoClose } from "react-icons/io5";
import Chat from "./Chat";
const MessageComponet = ({ user, employer }) => {
  const [isOffcanvasOpen, setIsOffcanvasOpen] = useState(false);
  const toggleOffcanvas = () => {
    setIsOffcanvasOpen(!isOffcanvasOpen);
  };

  return (
    <div>
      <button
        className="flex  gap-2  px-3 py-2  border-2 border-blue-500 items-center  text-blue-700 font-bold hover:text-white hover:bg-blue-500 hover:border-white transition-all duration-75 ease-in-out "
        onClick={toggleOffcanvas}
      >
        <MdOutlineMessage size={23} />
        Message
      </button>

      <div
        className={`z-3 fixed top-0 right-0 h-full w-1/3 bg-white shadow-lg transition-transform transform ${
          isOffcanvasOpen ? "translate-y-0" : "translate-y-full"
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
          <Chat receiverUsername={user} employer={employer} />
        </div>
      </div>
    </div>
  );
};

export default MessageComponet;
