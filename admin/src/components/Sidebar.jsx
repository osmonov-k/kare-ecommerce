import React from "react";
import { NavLink } from "react-router-dom";
import { assets } from "../assets/assets";

const AdminSidebar = () => {
  const menuItems = [
    {
      path: "/add",
      icon: assets.add_icon,
      alt: "Add item icon",
      label: "Add Item",
    },
    {
      path: "/list",
      icon: assets.order_icon,
      alt: "List items icon",
      label: "List Items",
    },
    {
      path: "/orders",
      icon: assets.order_icon,
      alt: "Orders icon",
      label: "View Orders",
    },
  ];

  return (
    <aside className="w-[18%] min-h-screen border-r-2 border-gray-300 bg-white">
      <nav className="flex flex-col gap-3 pt-6 pl-[20%]">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l transition-colors ${
                isActive
                  ? "bg-gray-100 font-medium border-gray-400"
                  : "hover:bg-gray-50"
              }`
            }
          >
            <img
              className="w-5 h-5"
              src={item.icon}
              alt={item.alt}
              aria-hidden="true"
            />
            <span className="hidden md:inline">{item.label}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default AdminSidebar;
