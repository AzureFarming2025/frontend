import React from "react";
// const plants = [
//     { id: 1, name: "Monstera", image: "/path-to-image", status: "Healthy" },
//     { id: 2, name: "Fiddle Leaf Fig", image: "/path-to-image", status: "Needs Water" },
//   ];

const GardeningCards = ({ items }) => {
    return (
      <div>
        <h3 className="text-lg font-bold">My Gardenings</h3>
        <div className="grid grid-cols-2 gap-4 mt-3">
          {items?.map((plant) => (
            <div key={`pot_${plant.id}`} className="card bg-white p-4 rounded-lg shadow">
              <img src={plant.image} alt={plant.name} className="w-full rounded-md" />
              <h4 className="mt-2 font-semibold">{plant.name}</h4>
              <p className="badge badge-success mt-1">{plant.status}</p>
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  export default GardeningCards;
  