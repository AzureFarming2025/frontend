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
    <div className="pt-3 px-auto hidden lg:inline-flex mt-auto flex-col items-end">
      <button
        className="w-20 px-8 py-2 text-gray-300 hover:text-gray-400"
        onClick={() => setSidebarExpanded(!sidebarExpanded)}
      >
        {sidebarExpanded ? (UnFoldIcon): (FoldIcon)}
        <span></span>
      </button>
    </div>
  );
};

export default SidebarToggle;
