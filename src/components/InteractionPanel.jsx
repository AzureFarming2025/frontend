import React, { useState } from "react";

const InteractionPanel = () => {
  const [missions, setMissions] = useState([
    { id: 1, title: "👋 Say hello to your plant", done: false },
    { id: 2, title: "📺 Watch ad to enable watering", done: false },
    { id: 3, title: "📖 Check plant diary", done: false },
  ]);

  const handleComplete = (id) => {
    setMissions((prev) =>
      prev.map((m) => (m.id === id ? { ...m, done: true } : m))
    );
  };

  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">🎯 Daily Missions</h2>
      <div className="space-y-4">
        {missions.map((mission) => (
          <div
            key={mission.id}
            className={`card shadow-sm bg-base-100 transition duration-300 ${
              mission.done ? "opacity-60" : ""
            }`}
          >
            <div className="card-body py-4 px-5">
              <h3 className="text-sm font-medium flex items-center justify-between">
                {mission.title}
                {mission.done ? (
                  <span className="badge badge-success text-white">Done</span>
                ) : (
                  <button
                    className="btn btn-sm btn-outline btn-success"
                    onClick={() => handleComplete(mission.id)}
                  >
                    Complete
                  </button>
                )}
              </h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InteractionPanel;
