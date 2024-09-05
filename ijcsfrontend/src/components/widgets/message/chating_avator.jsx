const ChatMessage = (messagedata) => (
  <div  className={`flex  items-end mb-4 ${
    messagedata["messagedata"]["sender"] ==
    messagedata["messagedata"]["employer"]["id"]
      ? "justify-end"
      : "justify-start "
  }`}>
     
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

      {/* // className={
    //   messagedata["messagedata"]["sender"] ==
    //   messagedata["messagedata"]["employer"]
    //     ? "text-left bg-gray-500 p-4 rounded-lg"
    //     : "text-right bg-blue-400  p-4 rounded-lg"
  // } */}
  <div className={` p-4 rounded-lg bg-gray-200`}>
  <div className="flex gap-4 items-center">
      <p className="font-semibold justify-self-start">
        { messagedata["messagedata"]["sender"] ==
          messagedata["messagedata"]["employer"]["id"] ? messagedata["messagedata"]["employer"]["full_name"] :messagedata["messagedata"]["room"]["first_name"]}
      </p>
      <p className="font-normal ml-3 text-xs justify-self-start ">
        {messagedata["messagedata"]["timestamp"]}
      </p>
    </div>
    {/* </div> */}
 
    {/* <div className="ml-10 border p-2 rounded-md bg-gray-200"> */}
      {/* {JSON.stringify(messagedata["messagedata"]["sender"]) +
        JSON.stringify(messagedata["messagedata"]["employer"]["id"])} */}
      {/* <p className="font-semibold justify-self-start">{messagedata["messagedata"]["employer"]["full_name"]}</p> */}
      {
        messagedata["messagedata"]["content"]!=""?
     
      <p className="font-semibold justify-self-start">
        { messagedata["messagedata"]["content"]}
      </p>
      :
      <button>
        <a href={`http://localhost:8000${messagedata["messagedata"]["filepath"]}`} target="_blank">File</a>
      </button>
      }
      <p className="font-semibold justify-self-start">
        {messagedata["messagedata"]["haveseen"]}
      </p>
    </div>
  </div>
);
export default ChatMessage;
