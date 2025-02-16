import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import Sidebar from '../partials/sidebar/Sidebar';
import Header from '../partials/Header';
import FilterButton from '../components/DropdownFilter';
import Datepicker from '../components/Datepicker';
import Banner from '../partials/Banner';
import ActivityLogCard from '../components/ActivityLogCard'; // 활동 로그 카드 컴포넌트
import { MdTimeline, MdEmojiEvents, MdHistory } from "react-icons/md";

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

  // ✅ 더미 데이터: 사용자 활동 로그
  const activityLogs = [
    { id: 1, type: "watering", description: "Watered 'Tomato Plant'", timestamp: "2025-02-16 10:30", icon: <MdHistory size={24} /> },
    { id: 2, type: "harvest", description: "Harvested 'Basil'", timestamp: "2025-02-15 14:15", icon: <MdEmojiEvents size={24} /> },
    { id: 3, type: "new-plant", description: "Started growing 'Mint'", timestamp: "2025-02-14 09:45", icon: <MdTimeline size={24} /> },
  ];

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        {/* Site header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main className="grow">
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-7xl mx-auto">

            {/* Dashboard actions */}
            <div className="sm:flex sm:justify-between sm:items-center mb-8">
              {/* Left: Title */}
              <div className="mb-4 sm:mb-0">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Activity Log</h1>
                <p className="text-gray-600 dark:text-gray-400">View your recent actions and track plant progress.</p>
              </div>

              {/* Right: Actions */}
              <div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">
                <FilterButton align="right" />
                <Datepicker align="right" />
              </div>
            </div>

            {/* Cards: Activity Logs */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {activityLogs.map((log) => (
                <ActivityLogCard key={log.id} log={log} />
              ))}
            </div>

            {/* 해시 이동 테스트 */}
            <button
              onClick={() => navigate("#logs")}
              className="btn bg-blue-500 text-white px-4 py-2 rounded mt-6"
            >
              Scroll to Logs
            </button>

            {/* Logs Section */}
            <div id="logs" className="mt-10 p-6 border border-gray-300 bg-gray-100 rounded">
              <h2 className="text-xl font-bold">Logs Section</h2>
              {activityLogs.map((log) => (
                <ActivityLogCard key={log.id} log={log} />
              ))}
            </div>

          </div>
        </main>

        <Banner />
      </div>
    </div>
  );
}
