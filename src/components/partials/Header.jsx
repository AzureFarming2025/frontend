import { useState } from "react";
import SearchModal from "@components/ModalSearch";
import Notifications from "@components/DropdownNotifications";
import Help from "@components/DropdownHelp";
import UserMenu from "@components/DropdownProfile";
import ThemeToggle from "@components/ThemeToggle";

const Header = ({ sidebarOpen, setSidebarOpen }) => {
  const [searchModalOpen, setSearchModalOpen] = useState(false);

  return (
    <header className="px-6 py-3 flex items-center justify-between">
      {/* 좌측: 햄버거 버튼 & 타이틀 */}
      <div className="flex items-center gap-4">
        {/* 햄버거 버튼 (모바일에서 사이드바 열기) */}
        <button
          className="btn btn-ghost btn-circle lg:hidden"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          <span className="sr-only">Open sidebar</span>
          <svg className="w-6 h-6" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <rect x="4" y="5" width="16" height="2" />
            <rect x="4" y="11" width="16" height="2" />
            <rect x="4" y="17" width="16" height="2" />
          </svg>
        </button>

        {/* 대시보드 타이틀 */}
        <h2 className="text-lg font-semibold">
          Welcome back, <span className="text-green-700 font-bold">Seoa</span>
        </h2>
      </div>

      {/* 우측: 검색, 알림, 테마 토글, 유저 메뉴 */}
      <div className="flex items-center space-x-4">
        {/* 검색 버튼 */}
        <button
          className={`btn btn-ghost btn-circle ${searchModalOpen ? "bg-gray-200" : ""}`}
          onClick={() => setSearchModalOpen(true)}
          aria-controls="search-modal"
        >
          <span className="sr-only">Search</span>
          <svg className="w-5 h-5" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
            <path d="M7 14c-3.86 0-7-3.14-7-7s3.14-7 7-7 7 3.14 7 7-3.14 7-7 7ZM7 2C4.243 2 2 4.243 2 7s2.243 5 5 5 5-2.243 5-5-2.243-5-5-5Z" />
            <path d="m13.314 11.9 2.393 2.393a.999.999 0 1 1-1.414 1.414L11.9 13.314a8.019 8.019 0 0 0 1.414-1.414Z" />
          </svg>
        </button>
        <SearchModal id="search-modal" searchId="search" modalOpen={searchModalOpen} setModalOpen={setSearchModalOpen} />

        {/* 알림 */}
        <Notifications align="right" />

        {/* 도움말 */}
        <Help align="right" />

        {/* 테마 변경 버튼 */}
        <ThemeToggle />

        {/* 구분선 */}
        <div className="w-px h-6 bg-gray-200"></div>

        {/* 유저 프로필 */}
        <div className="flex items-center gap-2">
          <UserMenu align="right" />
          <div>
            <p className="text-sm font-bold">POMO store 2</p>
            <p className="text-xs text-gray-500">amoore1999@hotmail.com</p>
          </div>
        </div>
      </div>
      <div className="divider"></div>
    </header>
  );
};

export default Header;
