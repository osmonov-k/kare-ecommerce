import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import { useLocation } from "react-router-dom";

const SearchBar = () => {
  const { search, setSearch, showSearch, setShowSearch } =
    useContext(ShopContext);
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsSearchVisible(location.pathname.includes("collection"));
  }, [location]);

  const handleSearchClose = () => {
    setShowSearch(false);
    setSearch("");
  };

  if (!(showSearch && isSearchVisible)) return null;

  return (
    <div className="border-t border-b bg-gray-50 text-center" role="search">
      <div className="inline-flex items-center justify-center border border-gray-400 px-5 py-2 my-5 mx-3 rounded-full w-3/4 sm:w-1/2">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 outline-none bg-inherit text-sm"
          type="search"
          placeholder="Search products..."
          aria-label="Search products"
        />
        <button
          type="submit"
          aria-label="Submit search"
          className="cursor-pointer"
        >
          <img
            src={assets.search_icon}
            className="w-4"
            alt=""
            aria-hidden="true"
          />
        </button>
      </div>
      <button
        onClick={handleSearchClose}
        className="inline w-3 cursor-pointer"
        aria-label="Close search"
      >
        <img src={assets.cross_icon} alt="" aria-hidden="true" />
      </button>
    </div>
  );
};

export default SearchBar;
