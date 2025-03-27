// src/pages/PlantDetailsPage.jsx
import React from "react";
import PlantStatus from "@components/PlantStatus";
import GrowthChart from "@components/GrowthChart";
import SensorStats from "@components/SensorStats";
import TipsSection from "@components/TipsSection";
import ControlPanel from "@components/ControlPanel";
import InteractionPanel from "@components/InteractionPanel";
import ConnectionPanel from "@components/ConnectionPanel";
import ActivityLog from "@components/ActivityLogCard";

const Details = () => {
  return (
    <div className="p-6 grid grid-cols-1 lg:grid-cols-3 gap-6 bg-gradient-to-br from-green-50 to-white min-h-screen">
      {/* Left Panel */}
      <div className="col-span-1">å
        <PlantStatus />
        <SensorStats />
      </div>

      {/* Center Panel */}
      <div className="col-span-1 lg:col-span-2 space-y-6">
        <GrowthChart />
        <TipsSection />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <ControlPanel />
          <InteractionPanel />
        </div>
        <ConnectionPanel />
        <ActivityLog />
      </div>
    </div>
  );
};

export default Details;
