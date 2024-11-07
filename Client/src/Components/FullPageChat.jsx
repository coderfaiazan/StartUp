import React, { useState, useRef, useEffect } from "react";
import { PaperAirplaneIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { useSelector, useDispatch } from "react-redux";
import { addMessage, sendRagChatCompletion } from "../Redux/Slices/chatSlice";


const FullPageChat = ({ onClose, onSubmit }) => {
  const [inputMessage, setInputMessage] = useState("");
  const messagesEndRef = useRef(null);

  const handleInputChange = (e) => setInputMessage(e.target.value);

  const dispatch = useDispatch();

  const { messages } = useSelector((state) => state.chat);

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   if (inputMessage.trim() === "") return;

  //   onSubmit(inputMessage);
  //   setInputMessage("");
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (inputMessage.trim() === "") return;

    dispatch(addMessage({ role: "user", content: inputMessage }));

    try {
      await dispatch(
        sendRagChatCompletion({
          collectionId: "mycollection",
          message: inputMessage,
        })
      ).unwrap();
    } catch (error) {
      console.error("Error in chat interaction:", error);
    }

    setInputMessage("");
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="fixed inset-0 bg-gray-100 z-50 flex flex-col overflow-hidden">
      <div className="bg-blue-600 text-white p-4 flex justify-between items-center">
        <h2 className="text-xl font-bold">Startup Assistant</h2>
        <button onClick={onClose} className="text-white hover:text-gray-200">
          <XMarkIcon className="h-6 w-6" />
        </button>
      </div>
      <div className="flex-grow overflow-y-auto p-4 space-y-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${
              message.role == "assistant" ? "justify-start" : "justify-end"
            }`}
          >
            <div
              className={`max-w-[75%] p-3 rounded-lg ${
                message.role == "assistant"
                  ? "bg-white text-gray-800 shadow"
                  : "bg-blue-600 text-white"
              }`}
            >
              {message.content}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <form onSubmit={handleSubmit} className="p-4 bg-white border-t">
        <div className="flex items-center">
          <input
            type="text"
            value={inputMessage}
            onChange={handleInputChange}
            placeholder="Type your message..."
            className="flex-grow p-2 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white p-2 rounded-r-lg hover:bg-blue-700 transition duration-300"
          >
            <PaperAirplaneIcon className="h-6 w-6" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default FullPageChat;
