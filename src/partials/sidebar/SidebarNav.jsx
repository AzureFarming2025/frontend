import React, { useEffect, useRef, useState, useMemo, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { sidebarConfig } from "@config/sidebarConfig";
import { MdKeyboardArrowDown } from "react-icons/md";

const SidebarNav = ({ sidebarExpanded, openTabs, setOpenTabs, toggleDropdown }) => {
  const { pathname, hash } = useLocation();
  const navigate = useNavigate();
  const fullPath = `${pathname}${hash}`;

  // ✅ `useMemo`를 사용하여 sidebarConfig를 최적화
  const activeTabs = useMemo(() => {
    return sidebarConfig.reduce((acc, menu) => {
      if (menu.type === "dropdown" && pathname === (menu.path)) {
        acc[menu.path] = true;
      }
      return acc;
    }, {});
  }, [fullPath]);

  // ✅ 최초 로딩 및 URL 변경 시 `openTabs` 업데이트
  useEffect(() => {
    setOpenTabs((prev) => {
      const updatedTabs = { ...prev, ...activeTabs };
      return JSON.stringify(prev) === JSON.stringify(updatedTabs) ? prev : updatedTabs;
    });
  }, [fullPath, setOpenTabs, activeTabs]);

  return (
    <div className="space-y-8 w-full">
      {sidebarConfig.map((item, index) => {
        const isActive = (pathname === item.path);
        const isDropdownActive = openTabs[item.path] || false;

        return item.type === "dropdown" ? (
          <div key={index} className="relative">
            <SidebarNavItem
              href={item.path}
              icon={item.icon && <item.icon size={22} />}
              title={item.title}
              isActive={isActive}
              sidebarExpanded={sidebarExpanded}
              istoggle
              isDropdownActive={isDropdownActive}
              onClick={() => navigate(item.path)}
              toggleAction={() => toggleDropdown(item.path)}
            />
            <SidebarLinkGroup active={isDropdownActive}>
              {item.subItems.map((sub, subIndex) => (
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
          </div>
        ) : (
          <SidebarNavItem
            key={index}
            href={item.path}
            icon={item.icon && <item.icon size={22} />}
            title={item.title}
            isActive={isActive}
            sidebarExpanded={sidebarExpanded}
            onClick={() => navigate(item.path)}
          />
        );
      })}
    </div>
  );
};

// ✅ SidebarLinkGroup 최적화 (useCallback 활용)
const SidebarLinkGroup = ({ active, children }) => {
  const contentRef = useRef(null);
  const [height, setHeight] = useState(active ? `${contentRef.current?.scrollHeight}px` : "0px");

  useEffect(() => {
    if (active) {
      setTimeout(() => {
        if (contentRef.current) {
          setHeight(`${contentRef.current.scrollHeight}px`);
        }
      }, 10);
    } else {
      setHeight("0px");
    }
  }, [active]);

  return (
    <ul
      ref={contentRef}
      className="transition-[max-height] duration-300 ease-in-out overflow-hidden"
      style={{ maxHeight: height }}
    >
      {children}
    </ul>
  );
};

// ✅ SidebarNavItem 최적화 (useCallback 활용)
const SidebarNavItem = React.memo(({ 
  href, 
  icon, 
  title, 
  isActive, 
  onClick, 
  istoggle, 
  isDropdownActive, 
  isSubMenu, 
  sidebarExpanded, 
  toggleAction 
}) => {
  if (isSubMenu && !sidebarExpanded) return null;

  const [bgColor, setBgColor] = useState("");
  const [textColor, setTextColor] = useState("text-gray-800 dark:text-gray-100");

  useEffect(() => {
    if (isActive) {
      setBgColor(isSubMenu ? "" : "bg-violet-500");
      setTextColor(isSubMenu ? "text-violet-500 font-semibold" : "text-white font-semibold");
    } else {
      setBgColor("bg-transparent");
      setTextColor(isSubMenu ? "text-gray-800 dark:text-gray-100" : "text-gray-800 dark:text-gray-100");
    }
  }, [isActive, isSubMenu, sidebarExpanded]);

  return (
    <div
      className={`flex items-center justify-between w-full p-3 rounded-lg cursor-pointer transition-colors duration-500 ease-in-out ${bgColor}`}
      onClick={onClick}
    >
      <div className={`flex items-center transition-colors duration-500 ease-in-out ${textColor}`}>
        {icon}
        {sidebarExpanded && <span className="text-sm font-medium ml-4">{title}</span>}
      </div>
      {istoggle && sidebarExpanded && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleAction();
          }}
          className="px-2 transform transition-transform duration-300 ease-in-out"
        >
          <MdKeyboardArrowDown className={`${isDropdownActive ? "rotate-180" : "rotate-0"} opacity-30`} />
        </button>
      )}
    </div>
  );
});

export default SidebarNav;
