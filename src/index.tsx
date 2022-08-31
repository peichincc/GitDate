import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import App from "./App";
import Home from "./pages/home/Home";
import Profile from "./pages/profile/Profile";
import Signin from "./pages/profile/Signin";
import Signup from "./pages/profile/Signup";

const root = ReactDOM.createRoot(document.getElementById("root")!);

root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<Home />} />
        <Route path="profile" element={<Profile />} />
        <Route path="signin" element={<Signin />} />
        <Route path="signup" element={<Signup />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  </BrowserRouter>
);
