import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ProfileOverview from "./ProfileOverview";
import PointsAndPurchase from "./PointsAndPurchase";
import SecuritySection from "./SecuritySection";

import Title from "@components/field/Title";

export default function ProfilePage() {
  const navigate = useNavigate();
  const [pointsHistory, setPointsHistory] = useState([
    { date: "2023-10-01", action: "Daily Reward", points: 50 },
    { date: "2023-09-30", action: "Redeemed for Discount", points: -200 },
    { date: "2023-09-29", action: "Completed Mission", points: 100 },
    { date: "2023-09-28", action: "Referral Bonus", points: 150 },
    { date: "2023-09-27", action: "Purchase Reward", points: 200 },
    { date: "2023-09-26", action: "Daily Reward", points: 50 },
  ]);
  const [purchaseHistory, setPurchaseHistory] = useState([
    { date: "2023-10-01", item: "Smart Farm Subscription", amount: 50 },
    { date: "2023-09-30", item: "Plant Nutrients", amount: 20 },
    { date: "2023-09-29", item: "Water Pump Replacement", amount: 15 },
    { date: "2023-09-28", item: "Soil Sensor", amount: 30 },
    { date: "2023-09-27", item: "LED Grow Light", amount: 40 },
    { date: "2023-09-26", item: "Fertilizer", amount: 25 },
  ]);

  const [form, setForm] = useState({
    name: "Emily",
    email: "emily@example.com",
    avatar: "https://i.pravatar.cc/100?img=1",
    theme: "light",
    language: "English",
    points: 1200,
    lastLogin: "2023-10-01 12:34:56",
    twoFactorEnabled: false,
    address: "123 Main St",
    city: "New York",
    state: "NY",
    zip: "10001",
  });

  return (
    <div className="bg-white min-h-screen p-6 space-y-6">
      <Title text="Profile" />
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="col-span-full">
          <ProfileOverview
            form={form}
            setForm={setForm}
          />
        </div>
        <div className="lg:col-span-3 space-y-6">
          <PointsAndPurchase
            form={form}
            pointsHistory={pointsHistory}
            purchaseHistory={purchaseHistory}
          />
          <SecuritySection
            form={form}
            navigate={navigate}
          />
        </div>
      </div>
    </div>
  );
}
