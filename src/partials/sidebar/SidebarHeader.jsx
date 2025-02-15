import React from "react";
import { NavLink } from "react-router-dom";

const SidebarHeader = ({ setSidebarOpen, triggerRef }) => {
  return (
    <div className="flex justify-between mb-10 pr-3 sm:px-2">
      {/* Close button */}
      <button
        ref={triggerRef}
        className="lg:hidden text-gray-500 hover:text-gray-400"
        onClick={() => setSidebarOpen(false)}
        aria-controls="sidebar"
        aria-expanded="true"
      >
        {/* <span className="sr-only">Close sidebar</span> */}
        <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
          <path d="M10.7 18.7l1.4-1.4L7.8 13H20v-2H7.8l4.3-4.3-1.4-1.4L4 12z" />
        </svg>
      </button>

      {/* Logo */}
      <NavLink end to="/" className="block">
        <svg className="fill-violet-500" xmlns="http://www.w3.org/2000/svg" width={32} height={32}>
          <path d="M31.956 14.8C31.372 6.92 25.08.628 17.2.044V5.76a9.04 9.04 0 0 0 9.04 9.04h5.716Z" />
        </svg>
      </NavLink>
    </div>
  );
};

export default SidebarHeader;
