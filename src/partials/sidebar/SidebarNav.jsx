import React from "react";
import { useLocation } from "react-router-dom";
import { sidebarConfig } from "@config/sidebarConfig";
import SidebarLinkGroup from "./SidebarLinkGroup";
import SidebarNavItem from "./SidebarNavItem";

const SidebarNav = ({ setSidebarExpanded }) => {
  const { pathname } = useLocation();

  return (
    <div className="space-y-8">
      {sidebarConfig.map((item, index) => {
        const isActive = pathname === item.path; // 현재 URL이 메뉴와 일치하는지 확인
        const isDropdownActive = item.type === "dropdown" && item.subItems.some(sub => pathname === sub.path); // 서브메뉴 중 활성화된 항목이 있는지 확인

        return item.type === "dropdown" ? (
          <SidebarLinkGroup key={index} activecondition={isDropdownActive}>
            {(handleClick, open) => (
              <>
                <SidebarNavItem
                  href="#0"
                  icon={item.icon ? <item.icon size={28} /> : null}
                  title={item.title}
                  isActive={isDropdownActive} // 드롭다운 메뉴 활성화 상태 적용
                  onClick={(e) => {
                    e.preventDefault();
                    handleClick();
                    setSidebarExpanded(true);
                  }}
                />
                {open && (
                  <div className="pl-6 space-y-2">
                    {item.subItems.map((sub, subIndex) => (
                      <SidebarNavItem
                        key={subIndex}
                        href={sub.path}
                        title={sub.title}
                        isActive={pathname === sub.path} // 서브메뉴 항목 활성화 상태 적용
                      />
                    ))}
                  </div>
                )}
              </>
            )}
          </SidebarLinkGroup>
        ) : (
          <SidebarNavItem
            key={index}
            href={item.path}
            icon={item.icon ? <item.icon size={28} /> : null}
            title={item.title}
            isActive={isActive} // 개별 네비게이션 아이템 활성화 상태 적용
          />
        );
      })}
    </div>
  );
};

export default SidebarNav;
