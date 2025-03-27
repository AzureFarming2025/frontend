import React from "react";
import {
  MdOutlineThermostat,
  MdOpacity,
  MdWbSunny
} from "react-icons/md";

const sensors = [
  {
    icon: <MdOutlineThermostat className="text-red-500" size={24} />,
    label: "Temperature",
    value: "27℃",
    range: "20~25℃",
    color: "text-red-500"
  },
  {
    icon: <MdOpacity className="text-blue-500" size={24} />,
    label: "Humidity",
    value: "46%",
    range: "40~60%",
    color: "text-blue-500"
  },
  {
    icon: <MdWbSunny className="text-yellow-500" size={24} />,
    label: "Light",
    value: "77%",
    range: "60~80%",
    color: "text-yellow-500"
  }
];

const SensorStats = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {sensors.map((sensor, index) => (
        <div
          key={index}
          className="flex flex-col items-center justify-center p-4 rounded-xl bg-base-100 shadow text-center"
        >
          <div className="mb-2">{sensor.icon}</div>
          <div className="text-sm font-semibold">{sensor.label}</div>
          <div className={`text-xl font-bold ${sensor.color}`}>
            {sensor.value}
          </div>
          <div className="text-xs text-gray-400">Optimal: {sensor.range}</div>
        </div>
      ))}
    </div>
  );
};

export default SensorStats;
