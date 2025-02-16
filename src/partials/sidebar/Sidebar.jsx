import React, { useState, useEffect, useRef, useCallback, useMemo } from "react";
import SidebarContainer from "./SidebarContainer";
import SidebarHeader from "./SidebarHeader";
import SidebarNav from "./SidebarNav";
import SidebarToggle from "./SidebarToggle";

function Sidebar({ sidebarOpen, setSidebarOpen, variant = "default" }) {
  const sidebar = useRef(null);
  const trigger = useRef(null);

  // ✅ `openTabs` 상태 (localStorage 복원, useMemo로 최적화)
  const initialOpenTabs = useMemo(() => {
    try {
      return JSON.parse(localStorage.getItem("openTabs")) || {};
    } catch {
      return {};
    }
  }, []);

  const [openTabs, setOpenTabs] = useState(initialOpenTabs);

  // ✅ Sidebar 확장 상태 복원 (렌더링 강제 적용)
  const storedSidebarExpanded = localStorage.getItem("sidebar-expanded");
  const [sidebarExpanded, setSidebarExpanded] = useState(
    storedSidebarExpanded === null ? false : storedSidebarExpanded === "true"
  );

  // ✅ sidebarExpanded 변경 시 localStorage 업데이트
  useEffect(() => {
    localStorage.setItem("sidebar-expanded", sidebarExpanded);
    document.body.classList.toggle("sidebar-expanded", sidebarExpanded);
  }, [sidebarExpanded]);

  // ✅ openTabs 변경 시 localStorage 업데이트
  useEffect(() => {
    localStorage.setItem("openTabs", JSON.stringify(openTabs));
  }, [openTabs]);

  // ✅ 특정 `dropdown` 메뉴 토글 (useCallback으로 최적화)
  const toggleDropdown = useCallback((menu) => {
    setOpenTabs((prev) => ({
      ...prev,
      [menu]: !prev[menu],
    }));
  }, []);

  return (
    <SidebarContainer sidebarOpen={sidebarOpen} variant={variant} sidebarRef={sidebar}>
      <SidebarHeader setSidebarOpen={setSidebarOpen} triggerRef={trigger} />
      <SidebarNav
        sidebarExpanded={sidebarExpanded}
        openTabs={openTabs}
        setOpenTabs={setOpenTabs}
        toggleDropdown={toggleDropdown}
      />
      <SidebarToggle setSidebarExpanded={setSidebarExpanded} sidebarExpanded={sidebarExpanded} />
    </SidebarContainer>
  );
}

export default Sidebar;
