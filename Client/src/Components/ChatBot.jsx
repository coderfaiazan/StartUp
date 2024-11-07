import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { XMarkIcon, ArrowsPointingOutIcon } from "@heroicons/react/24/solid";
import { useNavigate, useLocation } from "react-router-dom";
import {
  sendRagChatCompletion,
  addMessage,
  clearError,
} from "../Redux/Slices/chatSlice";

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputMessage, setInputMessage] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const messagesEndRef = useRef(null);
  const dispatch = useDispatch();
  const { messages, loading, error } = useSelector(
    (state) => state.chat
  );

  useEffect(() => {
    if (location.pathname === "/chat") {
      setIsOpen(false);
    }
  }, [location]);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen]);

  // useEffect(() => {
  //   if (!currentCollection) {
  //     dispatch(createVectorStoreCollection("chatbot"))
  //       .unwrap()
  //       .then(() => console.log("Vector store collection created successfully"))
  //       .catch((error) =>
  //         console.error("Failed to create vector store collection:", error)
  //       );
  //   }
  // }, [dispatch, currentCollection]);

  const toggleChat = () => setIsOpen(!isOpen);
  const openFullPageChat = () => navigate("/chat");

  const handleInputChange = (e) => setInputMessage(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (inputMessage.trim() === "") return;

    dispatch(addMessage({ role: "user", content: inputMessage }));

    try {
      await dispatch(
        sendRagChatCompletion({
          message: inputMessage,
        })
      ).unwrap();
    } catch (error) {
      console.error("Error in chat interaction:", error);
    }

    setInputMessage("");
  };

  const handleCloseError = () => {
    dispatch(clearError());
  };

  if (location.pathname === "/chat") {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {isOpen ? (
        <div
          className={`bg-white rounded-lg shadow-xl w-80 flex flex-col h-96 border-2 border-blue-400 animate-chatOpen ${
            isOpen ? "animate-shine" : ""
          }`}
        >
          <div className="bg-blue-600 text-white p-4 rounded-t-lg flex justify-between items-center">
            <h3 className="font-bold">Startup Assistant</h3>
            <div className="flex items-center space-x-2">
              <button
                onClick={openFullPageChat}
                className="text-white hover:text-gray-200"
              >
                <ArrowsPointingOutIcon className="h-5 w-5" />
              </button>
              <button
                onClick={toggleChat}
                className="text-white hover:text-gray-200"
              >
                <XMarkIcon className="h-5 w-5" />
              </button>
            </div>
          </div>
          <div className="flex-grow p-4 overflow-y-auto">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`mb-4 ${
                  message.role === "assistant" ? "text-left" : "text-right"
                }`}
              >
                <div
                  className={`inline-block p-2 rounded-lg ${
                    message.role === "assistant"
                      ? "bg-gray-200 text-gray-800"
                      : "bg-blue-600 text-white"
                  }`}
                >
                  {message.content}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          <form onSubmit={handleSubmit} className="p-4 border-t">
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
                disabled={loading}
              >
                Send
              </button>
            </div>
          </form>
          {error && (
            <div
              className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
              role="alert"
            >
              <strong className="font-bold">Error:</strong>
              <span className="block sm:inline"> {error}</span>
              <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
                <svg
                  className="fill-current h-6 w-6 text-red-500"
                  role="button"
                  onClick={handleCloseError}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <title>Close</title>
                  <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
                </svg>
              </span>
            </div>
          )}
        </div>
      ) : (
        <button
          onClick={toggleChat}
          className="bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition duration-300 flex items-center justify-center animate-pulse"
          style={{ minWidth: "48px", minHeight: "48px" }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
            />
          </svg>
        </button>
      )}
    </div>
  );
};

export default ChatBot;
