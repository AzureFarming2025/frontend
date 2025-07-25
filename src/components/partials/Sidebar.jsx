import React, { useState, useEffect, useRef, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  MdKeyboardArrowDown,
  MdOutlineKeyboardDoubleArrowLeft,
  MdOutlineKeyboardDoubleArrowRight,
} from "react-icons/md";
import { sidebarConfig } from "@config/sidebarConfig";

// NOTE: Collapse animation is currently broken on large screens.
// It used to work smoothly in commit `725507d0e94d31e1beef229adf141e4cc7ce5381` (e.g., transition between expanded/collapsed).
// Likely regressed during layout/width refactor.
// Consider reverting relevant changes from that commit or debugging transition logic after final layout stabilizes.

const Sidebar = ({ sidebarExpanded, setSidebarExpanded }) => {
  const location = useLocation();
  const { pathname, hash } = location;
  const sidebarRef = useRef(null);
  const isMobile = window.innerWidth < 1024;

  const [openTabs, setOpenTabs] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("openTabs")) || {};
    } catch {
      return {};
    }
  });
  useEffect(() => {
    if (!isMobile) {
      localStorage.setItem("sidebar-expanded", JSON.stringify(sidebarExpanded));
    }
  }, [isMobile]);
  useEffect(() => {
    document.documentElement.style.scrollBehavior = "auto";
    window.scroll({ top: 0 });
    document.documentElement.style.scrollBehavior = "";
  }, [setSidebarExpanded, location.pathname]);
  useEffect(() => {
    localStorage.setItem("openTabs", JSON.stringify(openTabs));
  }, [openTabs]);

  useEffect(() => {
    const newOpenTabs = sidebarConfig.navigation.reduce((acc, menu) => {
      if (menu.type === "dropdown" && pathname.startsWith(menu.path)) {
        acc[menu.path] = true;
      }
      return acc;
    }, {});
    setOpenTabs(newOpenTabs);
  }, [pathname]);

  useEffect(() => {
    const scrollToHash = () => {
      if (hash) {
        const targetId = hash.replace("#", "");
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
          setTimeout(() => {
            targetElement.scrollIntoView({
              behavior: "smooth",
              block: "start",
            });
          }, 0);
        } else {
          const observer = new MutationObserver(() => {
            const newTarget = document.getElementById(targetId);
            if (newTarget) {
              newTarget.scrollIntoView({ behavior: "smooth", block: "start" });
              observer.disconnect();
            }
          });
          observer.observe(document.body, { childList: true, subtree: true });
        }
      }
    };
    scrollToHash();
  }, [hash]);

  const toggleDropdown = useCallback((menu) => {
    setOpenTabs((prev) => ({ ...prev, [menu]: !prev[menu] }));
  }, []);

  return (
    <aside
      ref={sidebarRef}
      className={`overflow-hidden
        h-screen flex-1
        fixed top-0 left-0 z-50 bg-white shadow-lg
        transition-[width,transform] duration-300 ease-in-out
        overflow-hidden
        md:relative
        w-80
        ${
          sidebarExpanded
            ? "px-4 md:w-64 md:translate-x-0"
            : "px-2 md:w-20 md:-translate-x-0"
        }`}
    >
      <div className="flex-1 flex flex-col h-full pb-10 justify-between">
        {/* Desktop logo */}
        <div className="h-16 flex items-center justify-between mb-10 p-2 bg-white md:flex-row">
          <div className="h-16 flex items-center">
            <img src="/logo.svg" alt="Pomo" className="w-10 h-10" />
            {sidebarExpanded && (
              <span className="ml-2 text-2xl">Logo Title</span>
            )}
          </div>
          <SidebarToggle
            sidebarExpanded={sidebarExpanded}
            setSidebarExpanded={setSidebarExpanded}
          />
        </div>
        <SidebarNav
          sidebarExpanded={sidebarExpanded}
          openTabs={openTabs}
          toggleDropdown={toggleDropdown}
        />
        <SidebarFooter />
      </div>
    </aside>
  );
};

// ✅ SidebarNav - Handles menu navigation
const SidebarNav = ({ sidebarExpanded, openTabs, toggleDropdown }) => {
  const { pathname, hash } = useLocation();
  const navigate = useNavigate();
  const fullPath = `${pathname}${hash}`;

  return (
    <div className="flex flex-col space-y-4 menu w-full">
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
                  <SidebarLinkGroup
                    active={isDropdownActive}
                    sidebarExpanded={sidebarExpanded}
                  >
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
      className={`flex items-center justify-between w-full p-4 py-3 rounded-xl cursor-pointer transition-all duration-300
      ${isActive && !isSubMenu ? "btn btn-lg btn-primary text-white" : ""} 
      ${
        isSubMenu && isActive
          ? "text-primary font-semibold"
          : "text-gray-800"
      }
      ${isDropdownActive && !isActive ? "bg-transparent" : ""}
      ${isSubMenu ? "ml-4 text-sm" : "text-label"}`}
      onClick={onClick}
    >
      <div className="flex items-center">
        {icon && (
          <span className={`${sidebarExpanded ? "mr-3" : "text-label"}`}>
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
          className="transition-color duration-300"
        >
          <MdKeyboardArrowDown
            className={`${
              isDropdownActive ? "rotate-180" : "rotate-0"
            } opacity-60`}
            size={16}
          />
        </button>
      )}
    </div>
  );
};

// ✅ SidebarToggle - Desktop collapse button
const SidebarToggle = ({ sidebarExpanded, setSidebarExpanded }) => (
  <button
    className="btn btn-circle btn-ghost"
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
    <hr className="border-gray-200 my-4" />
  </div>
);

// ✅ SidebarLinkGroup - Animates dropdown menus
const SidebarLinkGroup = React.memo(
  ({ active, sidebarExpanded = true, children }) => (
    <ul
      className={`overflow-hidden transition-all duration-300 
      ${active ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"}
      ${sidebarExpanded ? "block" : "hidden"}
    }`}
    >
      {children}
    </ul>
  )
);

// ✅ SidebarFooter - Upgrade button
const SidebarFooter = () => (
  <div className="mt-auto">
    <button className="btn btn-block btn-soft btn-secondary">
      Upgrade to Pro
    </button>
  </div>
);

export default Sidebar;
