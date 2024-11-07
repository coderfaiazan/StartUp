import React from "react";
import FullPageChat from "../Components/FullPageChat";
import { useNavigate } from "react-router-dom";

const ChatPage = ({ messages, onSubmit }) => {
  const navigate = useNavigate();

  return (
    <FullPageChat
      messages={messages}
      onClose={() => navigate(-1)}
      onSubmit={onSubmit}
    />
  );
};

export default ChatPage;
