import React, { useState } from "react";
import { Routes, Route, Outlet } from "react-router-dom";

import "./css/style.css";

import Sidebar from "./components/partials/Sidebar";
import Header from "./components/partials/Header";

import Dashboard from "./pages/Dashboard";
import Activities from "./pages/Activities";
import Profile from "./pages/Profile";
import About from "./pages/About";
import Details from "./pages/Details";
import Templates from "./pages/Templates";
import { SignIn, SignUp, ForgotPassword } from "./pages/Auth";

function App() {
  const [sidebarExpanded, setSidebarExpanded] = useState(() =>
    window.innerWidth < 1024
      ? true
      : JSON.parse(localStorage.getItem("sidebar-expanded")) ?? false
  );

  const BoardLayout = () => (
    <div className="flex-1 h-screen overflow-auto">
      <div className="drawer md:drawer-open">
        <input id="my-drawer" type="checkbox" className="drawer-toggle" />
        {/* Main area with left margin on desktop */}
        <div className="flex flex-col drawer-content z-0">
          <Header
            sidebarExpanded={sidebarExpanded}
            setSidebarExpanded={setSidebarExpanded}
          />
          {/* <div className="overflow-auto bg-base-100 p-4">
            <Outlet />
          </div> */}
        </div>
        {/* Drawer (mobile only) */}
        <div className="drawer-side">
          <label
            htmlFor="my-drawer"
            className="drawer-overlay z-40"
            onClick={() => setSidebarExpanded(false)}
          ></label>
          <div className="z-50">
            <Sidebar
              sidebarExpanded={sidebarExpanded}
              setSidebarExpanded={setSidebarExpanded}
            />
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="page-transition">
      <Routes>
        {/* Auth routes */}
        <Route path="/" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        {/* Main layout */}
        <Route path="/" element={<BoardLayout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="activities" element={<Activities />} />
          <Route path="profile" element={<Profile />} />
          <Route path="about" element={<About />} />
        </Route>

        {/* Standalone pages */}
        <Route path="/details" element={<Details />} />
        <Route path="/templates" element={<Templates />} />
      </Routes>
    </div>
  );
}

export default App;
