import React from "react";
// const stats = [
//     { label: "Active", value: "5", icon: "🌿", color: "bg-green-200" },
//     { label: "Maximum", value: "10", icon: "🔵", color: "bg-blue-200" },
//     { label: "Issues", value: "10", icon: "🚨", color: "bg-red-200" },
//     { label: "Automated", value: "ON", icon: "⚡", color: "bg-green-300" },
//   ];

const StatCards = (stats)=> {
    return (
      <div className="grid grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <div key={index} className={`card p-4 ${stat.color} text-center rounded-lg`}>
            <p className="text-xl">{stat.icon}</p>
            <p className="text-2xl font-bold">{stat.value}</p>
            <p className="text-sm">{stat.label}</p>
          </div>
        ))}
      </div>
    );
  };
  
  export default StatCards;
  