import React from "react";

const Avatar = ({ userId }: { userId: number }) => {
  return (
    <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center">
      <span className="text-gray-500">👤</span>
    </div>
  );
};

export default Avatar;
