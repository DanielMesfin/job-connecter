// src/components/Chat.js
import React, { useState, useEffect, useRef } from "react";
import WebSocket from "react-websocket";
import ChatMessage from "./chating_avator";
import { MdAttachFile } from "react-icons/md";
const Chat = ({ receiverUsername, employer }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [socket, setSocket] = useState(null);
  const [selectedFilepath ,setSelectedFilepath]=useState('')
  const messageContainerRef = useRef(null);

  useEffect(() => {
    const newSocket = new window.WebSocket(
      `ws://localhost:8000/ws/chat/${receiverUsername}/`
    );
    setSocket(newSocket);
    {
      newSocket &&
        (newSocket.onmessage = (event) => {
          handleData(event.data);
          console.log("data handler");
        });
    }
    {
      newSocket &&
        (newSocket.onopen = () => {
          newSocket.send(JSON.stringify({ type: "fetch_messages" }));
        });
    }

    scrollToBottom();
    return () => {
      if (socket && socket.readyState === WebSocket.OPEN) {
        socket.close();
      }
    };
  }, [receiverUsername]);

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleFileUpload =   (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append('file', file);

    try {
      if (socket) {
        socket.send(
          JSON.stringify({
            message: {
              sender: employer,
              filepath:  event.target.files[0].name,
              messagesender: employer + "+e",
              receiver: receiverUsername,
              message:''
            },
          })
        );
        setInput("");
      }
        console.log('File uploaded successfully!');
    } catch (error) {
        console.error('Error uploading file:', error);
    }
};


  const sendMessage = () => {
    if (socket && input.trim() !== "") {
      socket.send(
        JSON.stringify({
          message: {
            sender: employer,
            message: input,
            messagesender: employer + "+e",
            receiver: receiverUsername,
            filepath:''
          },
        })
      );
      setInput("");
    }
  };

  const handleData = (data) => {
    const message = JSON.parse(data);
    setMessages((prevMessages) => [...prevMessages, message]);
    console.log(messages);
    scrollToBottom();
  };

  const scrollToBottom = () => {
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTop =
        messageContainerRef.current.scrollHeight;
    }
  };

//   const handleFileChange = (event) => {
//     const selectedFile = event.target.files[0];
//     console.log("these is selected file")
//     console.log(selectedFile)
//     selectedFilepath(selectedFile)
//     // Do something with the file (e.g., store it in state)
// };



  return (
    <div className="flex flex-col bg-white">
      <div className="flex-grow p-4 overflow-y-auto" ref={messageContainerRef}>
        {messages.map((msg, index) => {
          console.log("message data on mapping : ", msg);
          return (
            <div
              key={index}
              className={`
              ${
                msg.message["message"]["sender"] ==
                msg.message["message"]["employer"]["id"]
                  ? "text-start left-0"
                  : "text-end right-0"
              }`}
            >
              <ChatMessage messagedata={msg.message["message"]} />
            </div>
          );
        })}
      </div>
         
      <div className="flex p-4  items-center ">
      <div className="px-4">
        <label htmlFor="upload-file" className="cursor-pointer">
            <MdAttachFile size={25}/>
          </label>
          <input type="file" name="file" onChange={handleFileUpload} id="upload-file" className="hidden" />
      </div>
        <div className="w-full">
          <input
            type="text"
            value={input}
            onChange={handleInputChange}
            placeholder="Type your message..."
            className="flex-grow p-2 mr-2 border rounded bottom-0 w-full"
          />
          
        </div>
        <button
          onClick={sendMessage}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
        >
          Send
        </button></div>
       
    </div>
  );
};

export default Chat;
