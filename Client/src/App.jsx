import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Navbar, Footer, AuthProvider, ChatBot } from "./Components";
import {
  HomePage,
  ExploreProjects,
  ProjectDetailsPage,
  StartProjectPage,
  UserDashboard,
  TransactionPage,
  ProfilePage,
  AdminDashboard,
  SignIn,
  SignUp,
  ErrorPage,
  ChatPage,
} from "./Pages";

function App() {
  const [messages, setMessages] = useState([
    {
      text: "Hello! How can I help you with your startup queries today?",
      isBot: true,
    },
  ]);

  const handleChatSubmit = (message) => {
    const newMessage = { text: message, isBot: false };
    setMessages((prev) => [...prev, newMessage]);

    setTimeout(() => {
      const botResponse = getBotResponse(message);
      setMessages((prev) => [...prev, { text: botResponse, isBot: true }]);
    }, 1000);
  };

  const getBotResponse = (message) => {
    const lowerCaseMessage = message.toLowerCase();
    if (lowerCaseMessage.includes("funding")) {
      return "Our platform offers various funding options for startups. You can create a project and set a funding goal. Backers can then contribute to your project if they find it interesting.";
    } else if (
      lowerCaseMessage.includes("start") ||
      lowerCaseMessage.includes("create project")
    ) {
      return "To start a project, click on the 'Start a Project' button in the navigation bar. You'll need to provide details about your startup, set a funding goal, and create rewards for backers.";
    } else if (lowerCaseMessage.includes("reward")) {
      return "Rewards are incentives you offer to backers based on their contribution level. They can be products, services, or experiences related to your startup.";
    } else {
      return "I'm not sure about that. Can you please rephrase your question or ask about funding, starting a project, or rewards?";
    }
  };
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-gray-50">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route
              path="/"
              element={
                <AuthProvider>
                  <HomePage />
                </AuthProvider>
              }
              errorElement={<ErrorPage />}
            />
            <Route
              path="/explore"
              element={
                <AuthProvider>
                  <ExploreProjects />
                </AuthProvider>
              }
              errorElement={<ErrorPage />}
            />
            <Route
              path="/project/:id"
              element={
                <AuthProvider>
                  <ProjectDetailsPage />
                </AuthProvider>
              }
              errorElement={<ErrorPage />}
            />
            <Route
              path="/start-project"
              element={
                <AuthProvider>
                  <StartProjectPage />
                </AuthProvider>
              }
              errorElement={<ErrorPage />}
            />
            <Route
              path="/dashboard"
              element={
                <AuthProvider>
                  <UserDashboard />
                </AuthProvider>
              }
              errorElement={<ErrorPage />}
            />
            <Route
              path="/transactions"
              element={
                <AuthProvider>
                  <TransactionPage />
                </AuthProvider>
              }
              errorElement={<ErrorPage />}
            />
            <Route
              path="/profile"
              element={
                <AuthProvider>
                  <ProfilePage />
                </AuthProvider>
              }
              errorElement={<ErrorPage />}
            />
            <Route
              path="/admin"
              element={
                <AuthProvider>
                  <AdminDashboard />
                </AuthProvider>
              }
              errorElement={<ErrorPage />}
            />
            <Route
              path="/chat"
              element={
                <AuthProvider>
                  <ChatPage messages={messages} onSubmit={handleChatSubmit} />
                </AuthProvider>
              }
            />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </main>
        <ChatBot messages={messages} onSubmit={handleChatSubmit} />
        <Footer />
      </div>
    </Router>
  );
}

export default App;
