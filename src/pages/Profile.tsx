import React, { useState } from "react";
import Button from "@components/Button";
import Sidebar from '@components/partials/Sidebar';

const Profile = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  // ✅ 더미 데이터 (API 요청 전에 임시로 사용)
  const [profile, setProfile] = useState({
    username: "JohnDoe",
    email: "johndoe@example.com",
    membership: "Basic Plan",
    points: 1200,
  });

  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
    <div className="max-w-3xl mx-auto p-6">
      {/* Profile Header */}
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl p-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">{profile.username}</h1>
        <p className="text-gray-600 dark:text-gray-300 mt-2">{profile.email}</p>
      </div>

      {/* User Info & Membership */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 shadow-md rounded-xl p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Membership</h2>
          <p className="text-gray-600 dark:text-gray-300 mt-1">{profile.membership}</p>
          <Button text="Upgrade Plan" onClick={() => setIsModalOpen(true)} variant="primary" />
        </div>

        <div className="bg-white dark:bg-gray-800 shadow-md rounded-xl p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Points</h2>
          <p className="text-gray-600 dark:text-gray-300 mt-1">{profile.points} pts</p>
          <Button text="Redeem Points" onClick={() => console.log("Redeeming...")} variant="secondary" />
        </div>
      </div>

      {/* Subscription Plan Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-lg max-w-lg w-full">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Upgrade Membership</h2>
            <p className="text-gray-600 dark:text-gray-300 mt-2">
              Unlock premium features and automation with our Pro plan.
            </p>

            <div className="mt-4 space-y-4">
              <div className="p-4 border rounded-lg flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">Basic Plan</h3>
                  <p className="text-gray-600 dark:text-gray-400">Free access with limited features.</p>
                </div>
                <Button text="Select" onClick={() => setProfile({ ...profile, membership: "Basic Plan" })} variant="secondary" />
              </div>

              <div className="p-4 border rounded-lg flex justify-between items-center bg-blue-50 dark:bg-blue-900">
                <div>
                  <h3 className="text-lg font-medium text-blue-600 dark:text-blue-300">Pro Plan</h3>
                  <p className="text-blue-500 dark:text-blue-300">Full access to all features & automation.</p>
                </div>
                <Button
                  text="Upgrade"
                  onClick={() => setProfile({ ...profile, membership: "Pro Plan" })}
                  variant="primary"
                />
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <Button text="Close" onClick={() => setIsModalOpen(false)} variant="danger" />
            </div>
          </div>
        </div>
      )}
    </div>
    </div>
  );
};

export default Profile;
