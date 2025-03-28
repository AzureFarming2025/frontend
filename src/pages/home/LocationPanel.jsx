import React from "react";
import MenuDropDown from "@components/selector/MenuDropDown";

const LocationPanel = () => {
  const dropdown_options = [
    { value: "all", label: "All Items" }, // Option to show all items
    { value: "completed", label: "Completed Tasks" }, // Option to filter completed tasks
    { value: "pending", label: "Pending Tasks" }, // Option to filter pending tasks
    { value: "archived", label: "Archived Items" }, // Option to filter archived items
  ];

  return (
      <div className="bg-white p-4 rounded-lg shadow">
        <div className="flex justify-between items-center">
        <h3 className="text-lg font-bold">Locations</h3>
        <MenuDropDown options={dropdown_options}/>
        </div>
        <select className="select select-bordered w-full mt-2">
          <option>USA</option>
          <option>Korea</option>
        </select>
  
        <div className="mt-4">
          <p className="text-sm">132 My Street, Kingston, New York</p>
          <p className="text-green-700 text-sm">Reserved (3)</p>
        </div>
      </div>
    );
  };
  
  export default LocationPanel;
  