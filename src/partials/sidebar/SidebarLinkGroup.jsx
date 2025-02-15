import React, { useState, useEffect } from "react";

function SidebarLinkGroup({ children, activecondition }) {
  const [open, setOpen] = useState(activecondition);

  useEffect(() => {
    setOpen(activecondition); // 현재 경로가 드롭다운 항목과 관련이 있으면 자동으로 열기
  }, [activecondition]);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <ul
      className={`py-2 mb-2 rounded-lg last:mb-0 bg-[linear-gradient(135deg,var(--tw-gradient-stops))] 
        ${activecondition ? "from-violet-500/[0.12] dark:from-violet-500/[0.24] to-violet-500/[0.04]" : ""}
      `}
    >
      {children(handleClick, open)}
    </ul>
  );
}

export default SidebarLinkGroup;
