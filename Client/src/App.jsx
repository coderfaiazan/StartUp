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
    </Router>
  );
}

export default App;
