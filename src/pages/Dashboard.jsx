import React from "react";
import { IoPowerSharp } from "react-icons/io5";
import { FaCheckCircle } from "react-icons/fa";

const UserHeader = () => (
  <div className="flex justify-between items-center">
    <h1 className="text-2xl font-semibold">
      Welcome back, <span className="text-green-700 font-bold">Seo-a</span>
    </h1>
  </div>
);

const StatCard = ({ title, value, color, icon }) => (
  <div className={`p-4 rounded-xl text-center ${color}`}>
    <div className="text-lg font-semibold">{title}</div>
    <div className="text-2xl font-bold">{value}</div>
  </div>
);

const PlantCard = ({ imgSrc, title, label }) => (
  <div className="carousel-item w-52 flex-shrink-0">
    <div className="bg-white rounded-2xl shadow p-3 relative w-full">
      <img
        src={imgSrc}
        alt="plant"
        className="rounded-xl object-cover h-40 w-full"
      />
      <div className="mt-2 font-bold">{title}</div>
      {label && (
        <div className="flex items-center gap-2 text-sm text-green-600">
          <FaCheckCircle /> <span>{label}</span>
        </div>
      )}
    </div>
  </div>
);

const TagCheckbox = ({ label, checked, color = "success" }) => (
  <label
    className={`btn ${
      checked ? `btn-${color}` : `btn-outline btn-${color}`
    } justify-between`}
  >
    {label}{" "}
    <input
      type="checkbox"
      className={`checkbox checkbox-${color}`}
      defaultChecked={checked}
    />
  </label>
);

const LocationCard = () => (
  <div className="bg-white rounded-xl shadow p-4 w-72">
    <div className="text-sm font-semibold mb-2">Locations</div>
    <div className="mb-2">
      <select className="select select-bordered select-sm w-full">
        <option>USA</option>
        <option>Korea</option>
      </select>
    </div>
    <img
      src="https://via.placeholder.com/250x150?text=Map"
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

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-[#f9faf5] p-6 font-sans">
      <UserHeader />
      <div className="bg-white rounded-2xl p-6 shadow-md">
        {/* Stats */}
        <div className="grid grid-cols-4 gap-4 mt-6">
          <StatCard
            title="Active"
            value="5"
            color="bg-lime-100 text-green-800"
          />
          <StatCard
            title="Maximum"
            value="10"
            color="bg-blue-100 text-blue-800"
          />
          <StatCard title="Issues" value="10" color="bg-red-100 text-red-800" />
          <div className="bg-white border p-4 rounded-xl text-center">
            <div className="text-lg font-semibold">Automated</div>
            <div className="flex justify-center items-center gap-1 text-green-600 text-xl mt-1">
              <IoPowerSharp /> <span className="text-base font-bold">ON</span>
            </div>
          </div>
        </div>

        {/* Gardening - Carousel Style */}
        <div className="mt-8">
          <h2 className="text-lg font-semibold mb-4">My Gardenings</h2>
          <div className="carousel carousel-center space-x-4 p-2 bg-base-100 rounded-box">
            <PlantCard
              imgSrc="https://www.houseplantsexpert.com/image-files/monstera-deliciosa.jpg"
              title="Blog title"
              label="Label 1"
            />
            <PlantCard
              imgSrc="https://cdn.shopify.com/s/files/1/0150/6262/products/CalatheaMedallion6_1024x1024.jpg"
              title="Blog title"
            />
            <div className="carousel-item w-52 flex-shrink-0">
              <div className="text-sm w-full">
                <button className="btn btn-success btn-sm mb-2 w-full">
                  + Add Plants
                </button>
                <div className="bg-lime-100 p-3 rounded-xl text-xs">
                  <div>1/3</div>
                  <p>[해당 품종 이름] 작물 정보 (2단)</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quote */}
        <div className="mt-6 text-center text-green-800 text-sm font-medium">
          🌱 Nature doesn’t wait. Today’s small care creates tomorrow’s abundant
          harvest.
        </div>

        {/* Bottom Section */}
        <div className="mt-6 flex justify-between items-start">
          <div className="flex flex-col gap-2">
            <TagCheckbox label="Personal growth" checked />
            <TagCheckbox label="Personal growth" checked />
            <TagCheckbox
              label="Work-life balance"
              checked={false}
              color="accent"
            />
          </div>
          <LocationCard />
        </div>
      </div>
    </div>
  );
}
