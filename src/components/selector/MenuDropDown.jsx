import React from "react";
import { Dropdown } from "react-daisyui";
import { BiChevronDown } from "react-icons/bi";

// const options = [
//     { value: "all", label: "All Items" }, // Option to show all items
//     { value: "completed", label: "Completed Tasks" }, // Option to filter completed tasks
//     { value: "pending", label: "Pending Tasks" }, // Option to filter pending tasks
//     { value: "archived", label: "Archived Items" }, // Option to filter archived items
// ];
const MenuDropDown = ({ options, onChange }) => (
    <Dropdown hover>
      <Dropdown.Toggle size="xs">
        <span>View</span>
        <span>
          <BiChevronDown size={18} />
        </span>
      </Dropdown.Toggle>
      <Dropdown.Menu className="w-48">
        {options.map((option) => (
          <Dropdown.Item key={option.value} onClick={() => onChange(option.value)}>
            {option.label}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );

  export default MenuDropDown;