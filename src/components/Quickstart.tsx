import React from "react";

const QuickStart = () => {
  return (
    <div className="w-full grid grid-cols-2 gap-4">
      <button className="p-3 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600">
        Create Crop 🌱
      </button>
      <button className="p-3 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600">
        Watch Ad 📺
      </button>
      <button className="p-3 bg-yellow-500 text-white rounded-lg shadow-md hover:bg-yellow-600">
        Q&A ❓
      </button>
      <button className="p-3 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600">
        My Benefits 🎁
      </button>
    </div>
  );
};

export default QuickStart;
