import React from "react";
import { assets } from "../assets/assets";

const AdminNavbar = ({ setToken }) => {
  const handleLogout = () => {
    setToken("");
  };

  return (
    <header className="flex items-center justify-between py-3 px-[4%] bg-white shadow-sm">
      <img
        className="w-[max(10%,80px)] min-w-[60px]"
        src={assets.logo}
        alt="Company Logo"
      />
      <button
        onClick={handleLogout}
        aria-label="Logout"
        className="bg-gray-700 hover:bg-gray-800 text-white px-5 py-2 rounded-full text-sm transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
      >
        Logout
      </button>
    </header>
  );
};

export default AdminNavbar;
