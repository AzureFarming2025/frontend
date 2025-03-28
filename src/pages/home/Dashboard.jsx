import React, { useState } from "react";
import { Button, Badge, Card } from "react-daisyui";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi2";
import { FaCheckCircle } from "react-icons/fa";
import Title from "@components/field/Title";
import { useNavigate } from "react-router-dom";

const samplePlants = [
  {
    id: 1,
    name: "Monstera",
    image: "https://placehold.co/300x400",
    status: "Healthy",
    label: "Label 1",
  },
  {
    id: 2,
    name: "Fiddle Leaf Fig",
    image: "https://placehold.co/300x400",
    status: "Needs Water",
    label: null,
  },
  {
    id: 3,
    name: "Peace Lily",
    image: "https://placehold.co/300x400",
    status: "Healthy",
    label: "Label 2",
  },
];

const StatCard = ({ title, value, color }) => (
  <div className={`p-4 rounded-xl text-center ${color}`}>
    <div className="text-sm font-semibold">{title}</div>
    <div className="text-2xl font-bold">{value}</div>
  </div>
);

const LocationCard = () => (
  <div className="bg-white rounded-xl shadow p-4 w-[80%]">
    {/* <div className="text-sm font-semibold mb-2">Locations</div> */}
    <div className="mb-2">
      <select className="select select-bordered select-sm w-full">
        <option>USA</option>
        <option>Korea</option>
      </select>
    </div>
    <img
      src="https://placehold.co/300x200"
      alt="map"
      className="rounded-lg mb-2"
    />
    <div className="text-xs text-gray-600">
      132 My Street, Kingston, New York <br />
      <span className="text-green-600 font-semibold">Reserved (3)</span>
      <span className="float-right">12 / 30</span>
    </div>
  </div>
);

const TagCheckbox = ({ label, checked, color = "success" }) => (
  <label
    className={`btn btn-soft ${
      checked ? `btn-${color}` : `btn-outline btn-${color}`
    } justify-between`}
  >
    {label}
    <input
      type="checkbox"
      className={`checkbox checkbox-${color}`}
      defaultChecked={checked}
    />
  </label>
);

export default function Dashboard() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();
  const visibleCount = 3;

  const nextSlide = () => {
    if (currentIndex < samplePlants.length - visibleCount) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };
  const handleCardClick = (i) => {
    navigate(`/details/${i}`);
  };
  return (
    <div className="bg-white min-h-screen p-8">
      {/* Header */}
      <Title text="Dashboard" />
      <div className="max-w-screen mx-auto space-y-8 mt-4">
        {/* Status Summary */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatCard title="Active" value="5" color="bg-green-100 text-green-800" />
          <StatCard title="Maximum" value="10" color="bg-blue-100 text-blue-800" />
          <StatCard title="Issues" value="10" color="bg-red-100 text-red-800" />
          <div className="bg-white p-4 rounded-xl text-center border border-gray-200">
            <p className="text-sm font-semibold text-gray-600">Automated</p>
            <p className="text-2xl font-bold text-green-600">ON</p>
          </div>
        </div>

        {/* Gardening Carousel */}
        <h2 className="text-lg font-bold">My Gardenings</h2>

        <div className="space-y-2 flex flex-row gap-4">      
          <div className="relative">
            <div className="flex gap-1 overflow-hidden">
              {samplePlants.slice(currentIndex, currentIndex + visibleCount).map((plant) => (
                  <div
                      key={plant.id}
                      className="min-w-[220px] bg-white rounded-xl p-4 shadow-glow relative cursor-pointer"
                      onClick={() => handleCardClick(plant.id)} // 여기!
                    >
                      <div className="w-full h-36 rounded-md bg-gray-100">
                        <img
                          src={plant.image}
                          alt={plant.name}
                          className="w-full h-36 object-cover rounded-md"
                          loading="lazy"
                        />
                      </div>
                      <div className="mt-2 font-bold text-lg">{plant.name}</div>
                      <div className="flex items-center justify-between mt-1 text-sm">
                        <span className="flex items-center gap-1 text-green-600">
                          <FaCheckCircle /> {plant.status}
                        </span>
                        {plant.label && <Badge color="success">⚡ {plant.label}</Badge>}
                      </div>
                    </div>
              ))}

              {/* Add Card Placeholder with Checklist */}
              <div className="min-w-[220px] bg-white rounded-xl p-4 shadow-md flex flex-col gap-2">
                <Button color="success" size="sm">+ Add Plant</Button>
                <div className="bg-lime-100 rounded-xl p-3 text-sm space-y-1">
                  <p className="font-medium">1/3</p>
                  <p>[Plant Name]</p>
                  <ul className="list-disc list-inside text-xs text-gray-700">
                    <li>💧 Water: OK</li>
                    <li>☀️ Sunlight: Low</li>
                    <li>🌫️ Humidity: Good</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Carousel Controls */}
            <div className="absolute -left-6 top-1/2 -translate-y-1/2">
              <Button
                size="sm"
                shape="circle"
                color="ghost"
                onClick={prevSlide}
                disabled={currentIndex === 0}
              >
                <HiChevronLeft size={20} />
              </Button>
            </div>
            <div className="absolute -right-6 top-1/2 -translate-y-1/2">
              <Button
                size="sm"
                shape="circle"
                color="ghost"
                onClick={nextSlide}
                disabled={currentIndex >= samplePlants.length - visibleCount}
              >
                <HiChevronRight size={20} />
              </Button>
            </div>
          </div>

          {/* Carousel Indicator */}
          <div className="text-sm text-gray-500 text-right">
            {currentIndex + 1} / {samplePlants.length - visibleCount + 1}
          </div>
        </div>

        {/* Motivational Quote */}
        <div className="bg-white my-10 rounded-xl py-3 px-5 text-center text-sm text-green-800 shadow-sm">
          🌱 Nature doesn’t wait. Today’s small care creates tomorrow’s abundant harvest.
        </div>
        <div className="flex gap-12 gap-x-8">
        <div className="w-full">
            <div className="skeleton h-full w-auto"></div>
        </div>
        {/* Location Info */}
        <div className="flex flex-col w-full">
          <div className="text-subheading mb-4">
              Locations
          </div>
          <LocationCard />
        </div>
        {/* Checklist Buttons */}
        <div className="flex flex-col gap-2 w-full">
          <div className="text-subheading mb-4">
            Daily Missions
          </div>
          <TagCheckbox label="Personal growth" checked color="primary" />
          <TagCheckbox label="Personal growth" checked color="primary" />
          <TagCheckbox label="Work-life balance" checked={false} color="secondary" />
          <TagCheckbox label="Work-life balance" checked={false} color="secondary" />
          <TagCheckbox label="Work-life balance" checked={false} color="secondary" />
        </div>
        </div>
      </div>
    </div>
  );
}
