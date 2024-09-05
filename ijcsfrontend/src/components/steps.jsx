// src/components/Steps.js

import React from 'react';

const Steps = () => {
  return (
    <div className="flex items-center justify-center space-x-8">
      {/* Step 1 */}
      <div className=" ">
        <div className="bg-blue-500 rounded-full w-12 h-12 flex items-center justify-center ">
          1
        </div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 bg-blue-500"></div>
      </div>

      {/* Arrow */}
      <div className="w-8 h-8 flex items-center justify-center text-gray-500">
        →
      </div>

      {/* Step 2 */}
      {/* Repeat the same structure for other steps */}
    </div>
  );
};

export default Steps;
