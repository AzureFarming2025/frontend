import React, { useState } from "react";
import Avatar from "@components/Avatar";
import Button from "@components/Button";

// ✅ 임시 더미 데이터 (API 연결 없이 테스트)
const dummyPlantDetails = {
  id: 1,
  name: "Tomato",
  avatar: "https://via.placeholder.com/128",
  status: "Healthy",
  advice: "Your plant is doing well! Keep checking the soil moisture 🌱",
  waterTimer: "00:00:32",
  lastPhoto: "https://via.placeholder.com/200",
  missions: [
    { id: 1, text: "Press 'Hi' button to greet your plant.", completed: false },
    { id: 2, text: "Watch an ad to unlock watering.", completed: false },
    { id: 3, text: "Check the latest plant diary photo.", completed: false },
  ],
};

const Details = () => {
  const [plant] = useState(dummyPlantDetails);
  const [missions, setMissions] = useState(plant.missions);

  // ✅ 미션 완료 처리
  const completeMission = (id: number) => {
    setMissions((prev) =>
      prev.map((m) => (m.id === id ? { ...m, completed: true } : m))
    );
  };

  return (
    <div className="w-full flex flex-col md:flex-row gap-6 p-6">
      {/* 좌측 패널 - 정보 & 팁 */}
      <div className="w-full md:w-1/3 bg-white shadow-md rounded-lg p-4">
        <h2 className="text-lg font-semibold">{plant.name} Info</h2>
        <p className="text-gray-500 mt-2">{plant.advice}</p>
      </div>

      {/* 중앙 패널 - 아바타 & 컨트롤 패널 */}
      <div className="w-full md:w-1/3 flex flex-col items-center bg-white shadow-md rounded-lg p-6">
        <Avatar src={plant.avatar} size="large" />
        <h3 className="text-lg font-semibold mt-4">{plant.name}</h3>
        <p className="text-gray-500">{plant.status}</p>

        {/* 컨트롤 패널 */}
        <div className="mt-6 flex gap-4">
          <Button
            text="Say Hi"
            onClick={() => completeMission(1)}
            disabled={missions[0].completed}
          />
          <Button
            text="Watch Ad"
            onClick={() => completeMission(2)}
            disabled={missions[1].completed}
          />
        </div>
      </div>

      {/* 우측 패널 - 현재 상태 & 미션 */}
      <div className="w-full md:w-1/3 bg-white shadow-md rounded-lg p-4">
        <h2 className="text-lg font-semibold">Plant Status</h2>
        <p className="text-gray-500">Next Water Timer: {plant.waterTimer}</p>

        <h3 className="text-md font-semibold mt-4">Missions</h3>
        <ul className="mt-2">
          {missions.map((mission) => (
            <li
              key={mission.id}
              className={`py-2 border-b last:border-none ${
                mission.completed ? "text-gray-400 line-through" : "text-gray-700"
              }`}
            >
              <input
                type="checkbox"
                checked={mission.completed}
                onChange={() => completeMission(mission.id)}
                className="mr-2"
              />
              {mission.text}
            </li>
          ))}
        </ul>

        {/* 최근 식물 다이어리 사진 */}
        <h3 className="text-md font-semibold mt-6">Plant Diary</h3>
        <img src={plant.lastPhoto} alt="Latest plant diary" className="mt-2 rounded-lg shadow" />
      </div>
    </div>
  );
};

export default Details;
