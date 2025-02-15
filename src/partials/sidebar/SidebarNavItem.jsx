import React from "react";

const SidebarNavItem = ({ href, icon, title, isActive, onClick }) => {
  return (
    <a
      href={href}
      className={`block text-gray-800 dark:text-gray-100 truncate transition duration-150 px-4 py-2 rounded-lg
        ${isActive ? "bg-violet-500 text-white font-semibold" : "hover:bg-gray-100 dark:hover:bg-gray-700"}
      `}
      onClick={onClick}
    >
      <div className="flex items-center">
        {icon}
        <span className="text-sm font-medium ml-4 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
          {title}
        </span>
      </div>
    </a>
  );
};

export default SidebarNavItem;
