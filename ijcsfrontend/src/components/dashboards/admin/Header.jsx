import React from "react";
const Header = () => {
    return (
      <header className="bg-gray-700 p-4 text-white flex justify-between items-center">
        <div>
          <input
            type="text"
            placeholder="Search..."
            className="p-2 rounded-md mr-2"
          />
          <button className="bg-blue-500 p-2 rounded-md">Search</button>
        </div>
        <div>
          <button className="bg-yellow-500 p-2 rounded-md mr-2">Notifications</button>
          {/* Add notification icon or count here */}
        </div>
      </header>
    );
  };
  export default Header;