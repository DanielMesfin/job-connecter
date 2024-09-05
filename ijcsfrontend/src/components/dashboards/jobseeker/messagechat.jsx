const ChatMessage = (messagedata) => (
  <div
    className={`flex items-end mb-4 ${
      messagedata["messagedata"]["sender"] ==
      messagedata["messagedata"]["employer"]["id"]
        ? "justify-start"
        : "justify-end"
    }`}
  >
    <img
      src={
        messagedata["messagedata"]["sender"] ==
        messagedata["messagedata"]["employer"]["id"]
          ? `http://localhost:8000${messagedata["messagedata"]["employer"]["logo"]}`
          : `http://localhost:8000${messagedata["messagedata"]["room"]["profile_picture"]}`
      }
      alt={`${messagedata["messagedata"]["employer"]["logo"]}'s avatar`}
      className="w-10 h-10 rounded-full mr-2 border-spacing-4"
    />
    <div className="bg-gray-200 p-4 rounded-lg">
      <div className="flex gap-4 items-center">
        <p className="font-semibold ">
        {
      messagedata["messagedata"]["sender"] ==
      messagedata["messagedata"]["employer"]["id"]
        ? messagedata["messagedata"]["employer"]["full_name"]
        : messagedata["messagedata"]["room"]["first_name"]
    }
        </p>
        <p className="font-normal text-xs text-gray-700">
          {messagedata["messagedata"]["timestamp"]}
        </p>
      </div>
       {
        messagedata["messagedata"]["content"]!=""? 
        <p className="text-sm px-5">{messagedata["messagedata"]["content"]}</p>
        :<button>
        <a href={`http://localhost:8000${messagedata["messagedata"]["filepath"]}`} target="_blank">File</a>
      </button>
       }
     
      <p>{messagedata["messagedata"]["haveseen"]}</p>
    </div>
    
  </div>
);
export default ChatMessage;
