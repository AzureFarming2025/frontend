import React from "react";
import { FaLightbulb } from "react-icons/fa"; // Updated import
import { Card } from "react-daisyui";

const tips = [
  {
    title: "💧 Watering Advice",
    description: "Water only when the soil feels dry. Basil prefers slightly dry soil.",
  },
  {
    title: "☀️ Light Conditions",
    description: "Ensure at least 6 hours of sunlight daily or use a grow light.",
  },
  {
    title: "🌡️ Temperature",
    description: "Maintain a room temperature between 18°C - 25°C.",
  },
];

const TipsSection = () => {
  return (
    <div>
      <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
        <FaLightbulb className="w-5 h-5 text-yellow-500" /> {/* Updated icon */}
        Tips & Recommendations
      </h2>
      <div className="grid gap-4">
        {tips.map((tip, index) => (
          <Card key={index} className="bg-green-50 border border-green-200">
          <Card.Body>
              <h3 className="font-medium text-green-800">{tip.title}</h3>
              <p className="text-sm text-gray-700 mt-1">{tip.description}</p>
            </Card.Body>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default TipsSection;
