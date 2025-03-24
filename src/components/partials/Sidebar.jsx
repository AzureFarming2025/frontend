import React, { useState, useEffect, useRef, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  MdMenu,
  MdClose,
  MdKeyboardArrowDown,
  MdOutlineKeyboardDoubleArrowLeft,
  MdOutlineKeyboardDoubleArrowRight,
} from "react-icons/md";
import { sidebarConfig } from "@config/sidebarConfig";

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const { pathname, hash } = useLocation();
  const navigate = useNavigate();
  const sidebarRef = useRef(null);

  const isMobile = window.innerWidth < 1024;
  const [sidebarExpanded, setSidebarExpanded] = useState(() =>
    isMobile
      ? true
      : JSON.parse(localStorage.getItem("sidebar-expanded")) ?? false
  );

  const [openTabs, setOpenTabs] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("openTabs")) || {};
    } catch {
      return {};
    }
  });

  useEffect(() => {
    if (!isMobile)
      localStorage.setItem("sidebar-expanded", JSON.stringify(sidebarExpanded));
  }, [sidebarExpanded]);

  useEffect(
    () => localStorage.setItem("openTabs", JSON.stringify(openTabs)),
    [openTabs]
  );

  useEffect(() => {
    const newOpenTabs = sidebarConfig.navigation.reduce((acc, menu) => {
      if (menu.type === "dropdown" && pathname.startsWith(menu.path))
        acc[menu.path] = true;
      return acc;
    }, {});
    setOpenTabs(newOpenTabs);
  }, [pathname]);

  const toggleDropdown = useCallback((menu) => {
    setOpenTabs((prev) => ({ ...prev, [menu]: !prev[menu] }));
  }, []);

  return (
    <>
      {/* Mobile overlay for modal drawer */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-gray-900/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside
        ref={sidebarRef}
        className={`h-screen z-50 transition-all bg-white dark:bg-gray-800 shadow-lg p-4 flex flex-col
        ${sidebarOpen ? "translate-x-0" : "-translate-x-64 lg:translate-x-0"} 
        ${
          isMobile
            ? "w-64 fixed left-0 top-0"
            : sidebarExpanded
            ? "w-64"
            : "w-20"
        } lg:flex`}
      >
        {/* Mobile header with close button */}
        <div className="lg:hidden flex justify-between items-center mb-6">
          <img src="/logo.svg" alt="Pomo" className="w-10 h-10" />
          <button
            className="text-gray-500 hover:text-gray-400"
            onClick={() => setSidebarOpen(false)}
          >
            <MdClose size={20} />
          </button>
        </div>

        {/* Desktop logo section */}
        <div className="hidden lg:flex items-center my-8">
          <img src="/logo.svg" alt="Pomo" className="w-10 h-10" />
          {sidebarExpanded && (
            <span className="ml-2 text-lg font-bold text-gray-900">Pomo</span>
          )}
        </div>

        {/* Sidebar navigation menu */}
        <SidebarNav
          sidebarExpanded={sidebarExpanded}
          openTabs={openTabs}
          toggleDropdown={toggleDropdown}
        />

        {/* User settings and actions */}
        <SidebarFooter />

        {/* Collapse button for desktop */}
        {!isMobile && (
          <SidebarToggle
            sidebarExpanded={sidebarExpanded}
            setSidebarExpanded={setSidebarExpanded}
          />
        )}
      </aside>
    </>
  );
};

// ✅ SidebarNav - Handles menu navigation
const SidebarNav = ({ sidebarExpanded, openTabs, toggleDropdown }) => {
  const { pathname, hash } = useLocation();
  const navigate = useNavigate();
  const fullPath = `${pathname}${hash}`;

  return (
    <div className="flex flex-col space-y-4">
      {/* Navigation section */}
      <SidebarSection label="Navigation" sidebarExpanded={sidebarExpanded}>
        <ul className="space-y-2">
          {sidebarConfig.navigation.map(
            ({ path, title, icon: Icon, type, subItems }, index) => {
              const isActive = fullPath.startsWith(path);
              const isDropdownActive = openTabs[path] || false;
              const isAnySubActive =
                subItems?.some((sub) => fullPath.startsWith(sub.path)) ?? false;

              return type === "dropdown" ? (
                <li key={index} className="relative">
                  <SidebarNavItem
                    href={path}
                    icon={<Icon size={20} />}
                    title={title}
                    isActive={isActive || isAnySubActive}
                    isDropdownActive={isDropdownActive}
                    sidebarExpanded={sidebarExpanded}
                    isDropdown
                    toggleAction={() => toggleDropdown(path)}
                    onClick={() => navigate(path)}
                  />
                  <SidebarLinkGroup active={isDropdownActive}>
                    {subItems.map((sub, subIndex) => (
                      <SidebarNavItem
                        key={subIndex}
                        href={sub.path}
                        title={sub.title}
                        isActive={fullPath.startsWith(sub.path)}
                        isSubMenu
                        sidebarExpanded={sidebarExpanded}
                        onClick={() => navigate(sub.path)}
                      />
                    ))}
                  </SidebarLinkGroup>
                </li>
              ) : (
                <SidebarNavItem
                  key={index}
                  href={path}
                  icon={<Icon size={20} />}
                  title={title}
                  isActive={isActive}
                  sidebarExpanded={sidebarExpanded}
                  onClick={() => navigate(path)}
                />
              );
            }
          )}
        </ul>
      </SidebarSection>

      {/* User & Settings section */}
      <SidebarSection label="User & Settings" sidebarExpanded={sidebarExpanded}>
        <ul className="space-y-2">
          {sidebarConfig.settings.map(({ path, title, icon: Icon }, index) => (
            <SidebarNavItem
              key={index}
              href={path}
              icon={<Icon size={20} />}
              title={title}
              isActive={fullPath.startsWith(path)}
              sidebarExpanded={sidebarExpanded}
              onClick={() => navigate(path)}
            />
          ))}
        </ul>
      </SidebarSection>
    </div>
  );
};

// ✅ SidebarNavItem - Handles each menu item
const SidebarNavItem = ({
  href,
  icon,
  title,
  isActive,
  isDropdownActive,
  isSubMenu,
  sidebarExpanded,
  onClick,
  isDropdown,
  toggleAction,
}) => {
  return (
    <div
      className={`flex items-center justify-between w-full p-3 py-2.5 rounded-full cursor-pointer transition-all duration-300 
      ${isActive && !isSubMenu ? "bg-primary text-white" : ""} 
      ${
        isSubMenu && isActive
          ? "text-primary font-semibold"
          : "text-gray-800 dark:text-gray-100"
      }
      ${isDropdownActive && !isActive ? "bg-transparent" : ""}
      ${isSubMenu ? "ml-8 text-sm" : "text-label"}
      `}
      onClick={onClick}
    >
      <div className="flex items-center">
        {icon && (
          <span className={`mr-3 ${sidebarExpanded ? "" : "text-link"}`}>
            {icon}
          </span>
        )}
        {sidebarExpanded && (
          <span className="text-label font-medium">{title}</span>
        )}
        {!sidebarExpanded && (
          <span className="block md:hidden text-label font-medium">
            {title}
          </span>
        )}
      </div>
      {isDropdown && sidebarExpanded && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleAction();
          }}
          className="px-2 transition-transform duration-300"
        >
          <MdKeyboardArrowDown
            className={`${
              isDropdownActive ? "rotate-180" : "rotate-0"
            } opacity-30`}
          />
        </button>
      )}
    </div>
  );
};

// ✅ SidebarToggle - Desktop collapse button
const SidebarToggle = ({ sidebarExpanded, setSidebarExpanded }) => (
  <button
    className="absolute right-[-12px] top-1/2 transform -translate-y-1/2 bg-gray-300 dark:bg-gray-700 p-2 rounded-full shadow-lg hidden lg:block"
    onClick={() => setSidebarExpanded(!sidebarExpanded)}
  >
    {sidebarExpanded ? (
      <MdOutlineKeyboardDoubleArrowLeft size={20} />
    ) : (
      <MdOutlineKeyboardDoubleArrowRight size={20} />
    )}
  </button>
);

// ✅ SidebarSection - Dividers with section labels
const SidebarSection = ({ label, sidebarExpanded = true, children }) => (
  <div className="space-y-2">
    {sidebarExpanded && (
      <p className="text-overline font-semibold text-gray-500 uppercase p-2">
        {label}
      </p>
    )}
    {children}
    <hr className="border-gray-200 dark:border-gray-700 my-4" />
  </div>
);

// ✅ SidebarLinkGroup - Animates dropdown menus
const SidebarLinkGroup = React.memo(({ active, children }) => (
  <ul
    className={`overflow-hidden transition-all duration-300 ${
      active ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
    }`}
  >
    {children}
  </ul>
));

// ✅ SidebarFooter - Upgrade button
const SidebarFooter = () => (
  <div className="mt-auto p-2">
    <button className="w-full bg-green-100 text-green-700 p-1.5 rounded-lg text-sm font-medium flex items-center justify-center">
      Upgrade to Pro
    </button>
  </div>
);

export default Sidebar;
