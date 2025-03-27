import React from "react";

const ActivityLogCard = ({ log }) => {
  if (!log) {
    return <div className="text-red-500">Log data is missing</div>;
  }

  return (
    <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-4 flex items-center space-x-4">
      <div className="p-3 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-500">
        {log.icon && React.isValidElementType(log.icon) ? (
          <log.icon size={24} /> // 컴포넌트 타입을 렌더링
        ) : (
          <span>Invalid Icon</span>
        )}{" "}
        {log.type || "Unknown Type"}
      </div>
      <div className="flex-1">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
          {log.description || "No description available"}
        </h3>
        <p className="text-gray-600 dark:text-gray-400 text-sm">
          {log.timestamp || "No timestamp provided"}
        </p>
      </div>
    </div>
  );
};

export default ActivityLogCard;