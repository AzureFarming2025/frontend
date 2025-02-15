import React, { useState, useEffect, useRef } from "react";
import SidebarContainer from "./SidebarContainer";
import SidebarHeader from "./SidebarHeader";
import SidebarNav from "./SidebarNav";
import SidebarToggle from "./SidebarToggle";

function Sidebar({ sidebarOpen, setSidebarOpen, variant = "default" }) {
  const trigger = useRef(null);
  const sidebar = useRef(null);
  
  const storedSidebarExpanded = localStorage.getItem("sidebar-expanded");
  const [sidebarExpanded, setSidebarExpanded] = useState(
    storedSidebarExpanded === null ? false : storedSidebarExpanded === "true"
  );

  useEffect(() => {
    localStorage.setItem("sidebar-expanded", sidebarExpanded);
    document.body.classList.toggle("sidebar-expanded", sidebarExpanded);
  }, [sidebarExpanded]);

  return (
    <SidebarContainer sidebarOpen={sidebarOpen} variant={variant} sidebarRef={sidebar}>
      <SidebarHeader setSidebarOpen={setSidebarOpen} triggerRef={trigger} />
      <SidebarNav setSidebarExpanded={setSidebarExpanded} />
      <SidebarToggle setSidebarExpanded={setSidebarExpanded} sidebarExpanded={sidebarExpanded} />
    </SidebarContainer>
  );
}

export default Sidebar;
