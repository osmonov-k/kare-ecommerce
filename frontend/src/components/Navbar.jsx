import React, { useContext, useState } from "react";
import { assets } from "../assets/assets";
import { NavLink, Link } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";

const Navbar = () => {
  const [isMobileMenuVisible, setIsMobileMenuVisible] = useState(false);
  const {
    setShowSearch,
    getCartCount,
    navigate,
    token,
    setToken,
    setCartItems,
  } = useContext(ShopContext);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken("");
    setCartItems({});
    navigate("/login");
  };

  const handleSearchClick = () => {
    setShowSearch(true);
    navigate("/collection");
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuVisible(!isMobileMenuVisible);
  };

  return (
    <div className="flex items-center justify-between py-5 font-medium">
      <Link to="/" aria-label="Home page">
        <img src={assets.logo} className="w-36" alt="Company logo" />
      </Link>

      <NavLink
        to="https://admin-kare.kanatosmon.com/"
        target="_blank" // Opens in new tab
        rel="noopener noreferrer" // Security best practice
        className="flex flex-col items-center gap-1 bg-gray-800 text-white px-3 py-1 rounded-md"
      >
        <p className="font-medium">ADMIN WEBSITE</p>
      </NavLink>

      {/* Desktop Navigation */}
      <ul className="hidden sm:flex gap-5 text-sm text-gray-700">
        <NavLink to="/" className="flex flex-col items-center gap-1">
          <p>HOME</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>

        <NavLink to="/collection" className="flex flex-col items-center gap-1">
          <p>SHOP</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>

        <NavLink to="/about" className="flex flex-col items-center gap-1">
          <p>ABOUT</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>

        <NavLink to="/contact" className="flex flex-col items-center gap-1">
          <p>CONTACT</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
      </ul>

      {/* Action Icons */}
      <div className="flex items-center gap-6">
        <button
          onClick={handleSearchClick}
          aria-label="Search products"
          className="cursor-pointer"
        >
          <img src={assets.search_icon} className="w-5" alt="Search" />
        </button>

        <div className="group relative">
          <button
            onClick={() => !token && navigate("/login")}
            aria-label={token ? "Account menu" : "Sign in"}
            className="cursor-pointer"
          >
            <img
              src={assets.profile_icon}
              className="w-6.5 mt-2"
              alt="Profile"
            />
          </button>

          {token && (
            <div className="group-hover:block hidden absolute right-0 pt-4 z-10">
              <div className="flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded shadow">
                <button
                  onClick={() => navigate("/profile")}
                  className="text-left cursor-pointer hover:text-black"
                  aria-label="My profile"
                >
                  My Profile
                </button>
                <button
                  onClick={() => navigate("/orders")}
                  className="text-left cursor-pointer hover:text-black"
                  aria-label="My orders"
                >
                  Orders
                </button>
                <button
                  onClick={handleLogout}
                  className="text-left cursor-pointer hover:text-black"
                  aria-label="Sign out"
                >
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>

        <Link to="/cart" className="relative" aria-label="Shopping cart">
          <img src={assets.cart_icon} className="w-5 min-w-5" alt="Cart" />
          {getCartCount() > 0 && (
            <span
              className="absolute -right-1 -bottom-1 w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]"
              aria-label={`${getCartCount()} items in cart`}
            >
              {getCartCount()}
            </span>
          )}
        </Link>

        <button
          onClick={toggleMobileMenu}
          className="cursor-pointer sm:hidden"
          aria-label="Toggle menu"
        >
          <img src={assets.menu_icon} className="w-5" alt="Menu" />
        </button>
      </div>

      {/* Mobile Menu  */}
      <div
        className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all ${
          isMobileMenuVisible ? "w-full" : "w-0"
        }`}
      >
        <div className="flex flex-col text-gray-600">
          <button
            onClick={toggleMobileMenu}
            className="flex items-center gap-4 p-3"
            aria-label="Close menu"
          >
            <img src={assets.dropdown_icon} className="h-4 rotate-180" alt="" />
            <span>Back</span>
          </button>

          <NavLink
            onClick={toggleMobileMenu}
            className="py-2 pl-6 border"
            to="/"
          >
            Home
          </NavLink>
          <NavLink
            onClick={toggleMobileMenu}
            className="py-2 pl-6 border"
            to="/collection"
          >
            Shop
          </NavLink>
          <NavLink
            onClick={toggleMobileMenu}
            className="py-2 pl-6 border"
            to="/about"
          >
            About
          </NavLink>
          <NavLink
            onClick={toggleMobileMenu}
            className="py-2 pl-6 border"
            to="/contact"
          >
            Contact
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
