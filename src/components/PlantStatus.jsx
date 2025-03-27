import React from "react";

const PlantStatus = () => {
  return (
    <div className="flex items-center gap-6">
      <div className="avatar">
        <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
          <img
            src="/images/plants/basil.png"
            alt="basil"
            className="object-cover"
          />
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold text-green-800">
          🌿 Basil <span className="ml-2 text-sm text-gray-500">Italy</span>
        </h2>

        <div className="mt-2 space-y-1 text-sm text-gray-700">
          <p>💧 Thrives with less water</p>
          <p>🌬️ Fresh and rich aroma</p>
          <p>☀️ Loves sunlight and airy spaces</p>
        </div>
      </div>
    </div>
  );
};

export default PlantStatus;
