import React from "react";

type ActivityLogProps = {
  log: {
    id: number;
    type: string;
    description: string;
    timestamp: string;
    icon: React.ReactNode;
  };
};

const ActivityLogCard: React.FC<ActivityLogProps> = ({ log }) => {
  return (
    <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-4 flex items-center space-x-4">
      <div className="p-3 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-500">
        {log.icon}
      </div>
      <div className="flex-1">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{log.description}</h3>
        <p className="text-gray-600 dark:text-gray-400 text-sm">{log.timestamp}</p>
      </div>
    </div>
  );
};

export default ActivityLogCard;
