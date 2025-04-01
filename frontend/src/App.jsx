import React, { useEffect } from "react";

import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./components/pages/HomePage";

import SettingPage from "./components/pages/SettingPage";
import ProfilePage from "./components/pages/ProfilePage";
import LoginPage from "./components/pages/LoginPage";
import SignUpPage from "./components/pages/SignUpPage";
import useAuthStore from "./store/useAuthStore.js";

import { Loader } from "lucide-react";

import { Toaster } from "react-hot-toast";
import { useThemeStore } from "./store/useThemeStore.js";

export default function App() {
  const { authUser, checkAuth, isCheckingAuth, onlineUsers } = useAuthStore(); // using the states as we made the store in store.js
  const { theme } = useThemeStore(); // using the theme store

  console.log(onlineUsers);
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth && !authUser)
    // if (true)
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );

  //
  return (
    <div data-theme={theme}>
      <Navbar />

      <Routes>
        <Route
          path="/"
          //  if User then Home page Otherwise navigate to Login page
          element={authUser ? <HomePage /> : <Navigate to="/login" />}
        />
        <Route
          //  if not  User then SignUp   navigate to Home  page "/"
          path="/signup"
          element={!authUser ? <SignUpPage /> : <Navigate to="/" />}
        />
        <Route
          path="/login"
          element={!authUser ? <LoginPage /> : <Navigate to="/" />}
        />
        <Route path="/settings" element={<SettingPage />} />
        <Route
          path="/profile"
          element={authUser ? <ProfilePage /> : <Navigate to="/login" />}
        />
      </Routes>

      <Toaster />
    </div>
  );
}
