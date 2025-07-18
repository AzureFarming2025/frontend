import React, { useState, useEffect } from "react";
import { Routes, Route, useLocation, Outlet } from "react-router-dom";

import "./css/style.css";

import Sidebar from "./components/partials/Sidebar";
import Header from "./components/partials/Header";

import Dashboard from "./pages/home/Dashboard";
import Activities from "./pages/Activities";
import ProfilePage from "./pages/profile/ProfilePage";
import AboutUsPage from "./pages/support/AboutUsPage";
import Details from "./pages/Details";
import Templates from "./pages/Templates";
import { SignIn, SignUp, ResetPassword } from "./pages/auth/Auth";
import Settings from "./pages/Settings";
import ContactUsPage from "./pages/support/ContactUsPage";

function App() {
  const location = useLocation();
  const [sidebarExpanded, setSidebarExpanded] = useState(() => {
    try {
      return window.innerWidth < 1024
        ? true
        : JSON.parse(localStorage.getItem("sidebar-expanded")) ?? false;
    } catch (error) {
      console.error("Error parsing sidebar-expanded from localStorage:", error);
      return false; // Default to false if parsing fails
    }
  });

  const BoardLayout = () => (
    <div className="flex h-screen w-screen overflow-hidden bg-white">
      {/* Sidebar (fixed & full height) */}
      <div className="hidden md:block h-full">
        <Sidebar
          sidebarExpanded={sidebarExpanded}
          setSidebarExpanded={setSidebarExpanded}
        />
      </div>

      {/* Drawer (mobile only) */}
      <div className="drawer">
        <input id="my-drawer" type="checkbox" className="drawer-toggle" />
        {/* Main content area */}
        <div className="flex-1 flex flex-col overflow-hidden drawer-content">
          <Header
            sidebarExpanded={sidebarExpanded}
            setSidebarExpanded={setSidebarExpanded}
          />
          <div className="flex-1 overflow-auto bg-base-100 p-4">
            <Outlet />
          </div>
        </div>
        <div className="drawer-side md:hidden">
          <label
            htmlFor="my-drawer"
            className="drawer-overlay"
            onClick={() => setSidebarExpanded(false)}
          ></label>
          <Sidebar
            sidebarExpanded={sidebarExpanded}
            setSidebarExpanded={setSidebarExpanded}
          />
        </div>
      </div>
    </div>
  );

  useEffect(() => {
    document.documentElement.style.scrollBehavior = "auto";
    window.scroll({ top: 0 });
    document.documentElement.style.scrollBehavior = "";
  }, [location.pathname]);
  useEffect(() => {
    console.log();
  }, [sidebarExpanded]);

  return (
    <div className="page-transition">
      <Routes>
        {/* Auth routes */}
        <Route path="/" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        {/* Main layout */}
        <Route path="/" element={<BoardLayout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="activities" element={<Activities />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="about" element={<AboutUsPage />} />
          <Route path="support" element={<ContactUsPage />} />
          <Route path="settings" element={<Settings />} />
        </Route>

        {/* Standalone pages */}
        <Route path="/details" element={<Details />} />
        <Route path="/details/:id" element={<Details />} />
        <Route path="/templates" element={<Templates />} />
      </Routes>
    </div>
  );
}

export default App;
