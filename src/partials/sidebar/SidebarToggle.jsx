import React from "react";
import { MdOutlineKeyboardDoubleArrowLeft, MdOutlineKeyboardDoubleArrowRight } from "react-icons/md";

const SidebarToggle = ({ sidebarExpanded, setSidebarExpanded }) => {
  const UnFoldIcon = (
    <MdOutlineKeyboardDoubleArrowLeft size={32}/>
  );
  const FoldIcon = (
    <MdOutlineKeyboardDoubleArrowRight size={32}/>
  );
  return (
    <div className="pt-3 hidden lg:inline-flex justify-end mt-auto flex-col items-end">
      <button
        className="w-20 px-6 py-2 text-gray-400 hover:text-gray-500 dark:text-gray-500 dark:hover:text-gray-400"
        onClick={() => setSidebarExpanded(!sidebarExpanded)}
      >
        {sidebarExpanded ? (UnFoldIcon): (FoldIcon)}
        <span>Collapse</span>
      </button>
    </div>
  );
};

export default SidebarToggle;
