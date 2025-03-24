import React, { useState, useEffect } from "react";
// import { useUserStore, usePlantStore } from "../store";
// import Carousel from "@components/Carousel";

import Sidebar from "@components/partials/Sidebar";
import Header from "@components/partials/Header";
import FilterButton from "@components/DropdownFilter";
import Datepicker from "@components/Datepicker";
import DashboardCard01 from "@components/partials/dashboard/DashboardCard01";
import DashboardCard02 from "@components/partials/dashboard/DashboardCard02";
import DashboardCard03 from "@components/partials/dashboard/DashboardCard03";
import DashboardCard04 from "@components/partials/dashboard/DashboardCard04";
import DashboardCard05 from "@components/partials/dashboard/DashboardCard05";
import DashboardCard06 from "@components/partials/dashboard/DashboardCard06";
import DashboardCard07 from "@components/partials/dashboard/DashboardCard07";
import DashboardCard08 from "@components/partials/dashboard/DashboardCard08";
import DashboardCard09 from "@components/partials/dashboard/DashboardCard09";
import DashboardCard10 from "@components/partials/dashboard/DashboardCard10";
import DashboardCard11 from "@components/partials/dashboard/DashboardCard11";
import DashboardCard12 from "@components/partials/dashboard/DashboardCard12";
import DashboardCard13 from "@components/partials/dashboard/DashboardCard13";
import Banner from "@components/partials/Banner";

import Avatar from "@components/Avatar";
// import QuickStart from "@components/QuickStart";
// import Carousel from "@/components/Carousel";

// ✅ 임시 더미 데이터 (API 호출 없이 테스트 가능)
const dummyDashboard = {
  username: "TestUser",
  achievements: 5,
  medals: 3,
  upcomingTasks: [
    { title: "Water your plants", date: "Feb 20, 2025" },
    { title: "Harvest tomatoes", date: "Feb 21, 2025" },
  ],
  advice: "Remember to check soil moisture before watering! 🌱",
};

const dummyPlants = [
  {
    id: 1,
    name: "Tomato",
    status: "Healthy",
    image: "https://via.placeholder.com/64",
  },
  {
    id: 2,
    name: "Lettuce",
    status: "Needs Water",
    image: "https://via.placeholder.com/64",
  },
  {
    id: 3,
    name: "Basil",
    status: "Growing",
    image: "https://via.placeholder.com/64",
  },
];

// const Home = () => {
//   const [dashboardData] = useState(dummyDashboard);
//   const [plants] = useState(dummyPlants);

//   return (
//     <div className="w-full flex flex-col gap-6 p-6">
//       {/* 상단 고정 패널 - 사용자 정보 */}
//       <div className="bg-white shadow-md rounded-lg p-4 flex items-center justify-between">
//         <div>
//           <h2 className="text-lg font-semibold">Welcome, {dashboardData.username}!</h2>
//           <p className="text-gray-500">Achievements: {dashboardData.achievements}</p>
//         </div>
//         <div className="flex items-center gap-4">
//           <span className="text-gray-700">Medals: {dashboardData.medals}</span>
//           <Avatar userId={1} />
//         </div>
//       </div>

//       {/* 캐러셀 - 사용자의 작물 상태 */}
//       <Carousel plants={plants} />

//       {/* 퀵스타트 버튼 */}
//       <QuickStart />

//       {/* 일정 목록 */}
//       <div className="bg-white shadow-md rounded-lg p-4">
//         <h3 className="text-md font-semibold">Upcoming Tasks</h3>
//         <ul className="mt-2">
//           {dashboardData.upcomingTasks.length > 0 ? (
//             dashboardData.upcomingTasks.map((task, index) => (
//               <li key={index} className="py-2 border-b last:border-none">
//                 {task.title} - <span className="text-gray-500">{task.date}</span>
//               </li>
//             ))
//           ) : (
//             <p className="text-gray-500">No upcoming tasks</p>
//           )}
//         </ul>
//       </div>

//       {/* 광고용 배너 */}
//       <div className="w-full bg-gray-300 h-28 flex items-center justify-center rounded-lg shadow-md">
//         <p className="text-gray-700">📢 Promotional Banner Placeholder</p>
//       </div>

//       {/* 창고 정보 (미정) */}
//       <div className="bg-white shadow-md rounded-lg p-4">
//         <h3 className="text-md font-semibold">Warehouse Info</h3>
//         <p className="text-gray-500">Coming soon...</p>
//       </div>

//       {/* 봇 대화형 어드바이스 */}
//       <div className="flex items-center gap-3 p-4 bg-blue-100 border border-blue-300 rounded-lg shadow">
//         <span className="text-blue-500">🤖</span>
//         <p className="text-blue-700">{dashboardData.advice}</p>
//       </div>
//     </div>
//   );
// };

function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  // const { fetchProfile, fetchDashboard } = useUserStore();
  // const { fetchPlants } = usePlantStore();

  // useEffect(() => {
  //   fetchProfile();
  //   fetchDashboard();
  //   fetchPlants();
  // }, []);

  return (
    <div className="flex h-screen overflow-hidden">
      {/* <Carousel /> */}
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        {/*  Site header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main className="grow">
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
            {/* Dashboard actions */}
            <div className="sm:flex sm:justify-between sm:items-center mb-8">
              {/* Left: Title */}
              <div className="mb-4 sm:mb-0">
                <h1 className="text-2xl md:text-3xl text-gray-800 dark:text-gray-100 font-bold">
                  Dashboard
                </h1>
              </div>

              {/* Right: Actions */}
              <div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">
                {/* Filter button */}
                <FilterButton align="right" />
                {/* Datepicker built with React Day Picker */}
                <Datepicker align="right" />
                {/* Add view button */}
                <button className="btn bg-gray-900 text-gray-100 hover:bg-gray-800 dark:bg-gray-100 dark:text-gray-800 dark:hover:bg-white">
                  <svg
                    className="fill-current shrink-0 xs:hidden"
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                  >
                    <path d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z" />
                  </svg>
                  <span className="max-xs:sr-only">Add View</span>
                </button>
              </div>
            </div>

            {/* Cards */}
            <div className="grid grid-cols-12 gap-6">
              {/* Line chart (Acme Plus) */}
              <DashboardCard01 />
              {/* Line chart (Acme Advanced) */}
              <DashboardCard02 />
              {/* Line chart (Acme Professional) */}
              <DashboardCard03 />
              {/* Bar chart (Direct vs Indirect) */}
              <DashboardCard04 />
              {/* Line chart (Real Time Value) */}
              <DashboardCard05 />
              {/* Doughnut chart (Top Countries) */}
              <DashboardCard06 />
              {/* Table (Top Channels) */}
              <DashboardCard07 />
              {/* Line chart (Sales Over Time) */}
              <DashboardCard08 />
              {/* Stacked bar chart (Sales VS Refunds) */}
              <DashboardCard09 />
              {/* Card (Customers) */}
              <DashboardCard10 />
              {/* Card (Reasons for Refunds) */}
              <DashboardCard11 />
              {/* Card (Recent Activity) */}
              <DashboardCard12 />
              {/* Card (Income/Expenses) */}
              <DashboardCard13 />
            </div>
          </div>
        </main>

        <Banner />
      </div>
    </div>
  );
  // return (
  //   <>
  //   <div className="flex h-screen overflow-hidden">
  //      {/* Sidebar */}
  //      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
  //      <Home />
  //   </div>
  //   </>
  // );
}

export default Dashboard;
