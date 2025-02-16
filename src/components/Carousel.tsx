import React from "react";

const Carousel = ({ plants }: { plants: any[] }) => {
  return (
    <div className="w-full bg-white shadow-md rounded-lg p-4">
      <h3 className="text-md font-semibold">Your Plants</h3>
      <div className="flex overflow-x-auto gap-4 py-2">
        {plants.map((plant) => (
          <a key={plant.id} className="bg-gray-100 p-4 rounded-lg flex flex-col items-center"
            href="/details"
          >
            <img src={plant.image} alt={plant.name} className="w-16 h-16 rounded-full" />
            <p className="text-sm font-medium mt-2">{plant.name}</p>
            <span className="text-xs text-gray-500">{plant.status}</span>
          </a>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
