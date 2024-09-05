// src/components/Chat.js
import React, { useState, useEffect, useRef } from "react";
import WebSocket from "react-websocket";
import ChatMessage from "./messagechat";
const MessageData = ({ receiverUsername }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [socket, setSocket] = useState(null);
  const messageContainerRef = useRef(null);
  // to me collapse the message
  const [isCollapsed, setIsCollapsed] = useState(true);
  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

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
          // Send a special message to request existing messages
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

  const sendMessage = () => {
    if (socket && input.trim() !== "") {
      socket.send(
        JSON.stringify({
          message: {
            sender: 1,
            receiver: receiverUsername,
            message: input,
            messagesender: receiverUsername,
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
    scrollToBottom();
  };

  const scrollToBottom = () => {
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTop =
        messageContainerRef.current.scrollHeight;
    }
  };

  
  return (
    <div>
      <button onClick={toggleCollapse}>
        {isCollapsed ? "Show Message" : "Hide Message"}
      </button>
      {!isCollapsed && (
        <div className="flex flex-col bg-white">
          <div
            className="flex-grow p-4 overflow-y-auto"
            ref={messageContainerRef}
          >
            {messages.map((msg, index) => (
              <div
                key={index}
                className={
                  msg.message["message"]["sender"] == receiverUsername
                    ? "text-left"
                    : "text-right "
                }
              >
                
                {/* {
              
            msg.message["message"]["sender"] ==
            msg.message["message"]["employer"]["id"]?  JSON.stringify(msg.message["message"]["employer"]["full_name"])
           : JSON.stringify(msg.message)
          //  JSON.stringify(msg.message["message"]["employer"]["first_name"])
        } */}
                {messages == [] && <h2>Ther is no message in your chat</h2>}
                <ChatMessage messagedata={msg.message["message"]} />
              </div>
            ))}
          </div>
          <div className="flex p-4  items-center ">
            <input
              type="text"
              value={input}
              onChange={handleInputChange}
              placeholder="Type your message..."
              className="flex-grow p-2 mr-2 border rounded bottom-0"
            />
            <button
              onClick={sendMessage}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MessageData;
