import React, { useState, useEffect } from "react";
import axios from "axios";

const ControlPanel = () => {
  const [wateringEnabled, setWateringEnabled] = useState(false);
  const [moistureLevel, setMoistureLevel] = useState(50);

  // ✅ 초기 데이터 불러오기
  useEffect(() => {
    const fetchControlState = async () => {
      try {
        const res = await axios.get("/api/plants/basil/control");
        const { watering, targetMoisture } = res.data;

        setWateringEnabled(watering);
        setMoistureLevel(targetMoisture);
      } catch (error) {
        console.error("Failed to fetch initial control state:", error);
      }
    };

    fetchControlState();
  }, []);

  const handleToggle = async () => {
    const newState = !wateringEnabled;
    setWateringEnabled(newState);

    try {
      await axios.post("/api/plants/basil/control/toggle", { watering: newState });
    } catch (err) {
      console.error("Failed to update toggle:", err);
    }
  };

  const handleSliderChange = (e) => {
    const newValue = parseInt(e.target.value);
    setMoistureLevel(newValue);
  };

  const handleSliderCommit = async () => {
    try {
      await axios.post("/api/plants/basil/control/moisture", { value: moistureLevel });
    } catch (err) {
      console.error("Failed to send moisture level:", err);
    }
  };

  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">💻 Control Panel</h2>

      <div className="flex items-center justify-between mb-6">
        <span className="text-sm font-medium text-gray-700">💧 Auto Watering</span>
        <input
          type="checkbox"
          className="toggle toggle-success"
          checked={wateringEnabled}
          onChange={handleToggle}
        />
      </div>

      <div className="mb-2 text-sm text-gray-600">
        🌿 Target Moisture Level: <span className="font-semibold">{moistureLevel}%</span>
      </div>

      <input
        type="range"
        min="0"
        max="100"
        value={moistureLevel}
        className="range range-success w-full"
        onChange={handleSliderChange}
        onMouseUp={handleSliderCommit}
        onTouchEnd={handleSliderCommit}
      />

      <div className="flex justify-between text-xs px-1 mt-1 text-gray-500">
        <span>0%</span>
        <span>50%</span>
        <span>100%</span>
      </div>
    </div>
  );
};

export default ControlPanel;
