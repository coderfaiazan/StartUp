import React from "react";
import FullPageChat from "../Components/FullPageChat";
import { useNavigate } from "react-router-dom";

const ChatPage = () => {
  const navigate = useNavigate();

  return (
    <FullPageChat
      onClose={() => navigate(-1)}
    />
  );
};

export default ChatPage;
