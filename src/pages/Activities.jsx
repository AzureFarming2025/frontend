import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import Sidebar from '../partials/sidebar/Sidebar';
import Header from '../partials/Header';
import FilterButton from '../components/DropdownFilter';
import Datepicker from '../components/Datepicker';
import DashboardCard01 from '../partials/dashboard/DashboardCard01';
import Banner from '../partials/Banner';

export default function Activities() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // ✅ 해시 변경 감지 후 스크롤 이동
  useEffect(() => {
    const scrollToHash = () => {
      if (location.hash) {
        const targetId = location.hash.replace("#", "");
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
          setTimeout(() => {
            targetElement.scrollIntoView({ behavior: "smooth", block: "start" });
          }, 0);
        } else {
          // 요소가 아직 렌더링되지 않은 경우 MutationObserver 사용
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
  }, [location]);

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        {/* Site header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main className="grow">
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">

            {/* Dashboard actions */}
            <div className="sm:flex sm:justify-between sm:items-center mb-8">
              {/* Left: Title */}
              <div className="mb-4 sm:mb-0">
                <h1 className="text-2xl md:text-3xl text-gray-800 dark:text-gray-100 font-bold">Dashboard</h1>
              </div>

              {/* Right: Actions */}
              <div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">
                <FilterButton align="right" />
                <Datepicker align="right" />
                <button className="btn bg-gray-900 text-gray-100 hover:bg-gray-800 dark:bg-gray-100 dark:text-gray-800 dark:hover:bg-white">
                  <span className="max-xs:sr-only">Add View</span>
                </button>                
              </div>
            </div>

            {/* Cards */}
            <div className="grid grid-cols-12 gap-6">
              {/* 일반적인 컴포넌트 */}
              <DashboardCard01 />

              {/* ✅ 해시 이동 테스트 */}
              <button
                onClick={() => navigate("#users")}
                className="btn bg-blue-500 text-white px-4 py-2 rounded"
              >
                이동: Users 섹션
              </button>

              <div id="users" className="mt-10 p-4 border border-gray-300 bg-gray-100 rounded">
                <h2 className="text-xl font-bold">Users 섹션</h2>
                <DashboardCard01 />
              </div>

            </div>

          </div>
        </main>

        <Banner />
      </div>
    </div>
  );
}
