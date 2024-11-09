import React from "react";
import { Route, Routes } from "react-router-dom";
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
  return (
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
          />
          <Route
            path="/explore"
            element={
              <AuthProvider>
                <ExploreProjects />
              </AuthProvider>
            }
          />
          <Route
            path="/project/:id"
            element={
              <AuthProvider>
                <ProjectDetailsPage />
              </AuthProvider>
            }
          />
          <Route
            path="/start-project"
            element={
              <AuthProvider>
                <StartProjectPage />
              </AuthProvider>
            }
          />
          <Route
            path="/dashboard"
            element={
              <AuthProvider>
                <UserDashboard />
              </AuthProvider>
            }
          />
          <Route
            path="/transactions"
            element={
              <AuthProvider>
                <TransactionPage />
              </AuthProvider>
            }
          />
          <Route
            path="/profile"
            element={
              <AuthProvider>
                <ProfilePage />
              </AuthProvider>
            }
          />
          <Route
            path="/admin"
            element={
              <AuthProvider>
                <AdminDashboard />
              </AuthProvider>
            }
          />
          <Route
            path="/chat"
            element={
              <AuthProvider>
                <ChatPage />
              </AuthProvider>
            }
          />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </main>
      <ChatBot />
      <Footer />
    </div>
  );
}

export default App;
