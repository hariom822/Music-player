import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSearchText, setViewMode } from "./redux/singerSlice";
import { FaHeart, FaMoon, FaSun, FaTable, FaThLarge } from "react-icons/fa";
import { useNavigate, Link } from "react-router-dom";
import { toggleTheme } from "./redux/themeSlice";
import { IoClose } from "react-icons/io5";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showUserDropdown, setShowUserDropdown] = useState(false);

  const { searchText, favourites, viewMode } = useSelector((s) => s.music);
  const { darkMode } = useSelector((s) => s.theme);

  const loginUser = JSON.parse(localStorage.getItem("user"));

  const toggleUserDropdown = () => setShowUserDropdown(!showUserDropdown);

  const logoutUser = () => {
    localStorage.removeItem("user");
    alert("Logout successful!");
    navigate("/login");
    setShowUserDropdown(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 flex flex-col md:flex-row items-center justify-between gap-2 md:gap-4 px-3 sm:px-6 py-2 md:py-3 transition-all
        ${darkMode ? "bg-[#101010] text-white" : "bg-gray-200 text-black"}`}
    >
     
      <h2
        className="text-lg sm:text-xl md:text-2xl font-bold cursor-pointer flex-shrink-0"
        onClick={() => navigate("/")}
      >
        Music App
      </h2>

      <input
        type="text"
        value={searchText}
        onChange={(e) => dispatch(setSearchText(e.target.value))}
        placeholder="Search songs..."
        className={`flex-1 max-w-full md:max-w-md px-3 py-1.5 md:py-2 rounded-full outline-none text-sm md:text-base
          ${darkMode ? "bg-[#242424] text-white placeholder-gray-400" : "bg-white text-black placeholder-gray-500"}`}
      />

      <div className="flex items-center gap-1 sm:gap-2 md:gap-3 flex-wrap md:flex-nowrap">
      
        <button
          onClick={() => dispatch(toggleTheme())}
          className="px-2 py-1.5 md:px-3 md:py-2 rounded-full transition font-bold flex items-center justify-center"
        >
          {darkMode ? <FaSun size={18} className="text-yellow-400" /> : <FaMoon size={18} className="text-black" />}
        </button>

        <button
          onClick={() => dispatch(setViewMode(viewMode === "card" ? "table" : "card"))}
          className={`px-2 py-1.5 md:px-3 md:py-2 rounded-full transition flex items-center justify-center
            ${darkMode ? "bg-gray-800" : "bg-white hover:bg-gray-300"}`}
        >
          {viewMode === "card" ? <FaTable size={16} /> : <FaThLarge size={16} />}
        </button>

        <button
          onClick={() => navigate("/favourite")}
          className={`flex items-center gap-1 px-2 py-1 md:px-3 md:py-1.5 rounded-full flex-shrink-0 text-sm md:text-base
            ${darkMode ? "bg-gray-800" : "bg-gray-300"}`}
        >
          <FaHeart className="text-red-500" />
          <span>{favourites.length}</span>
        </button>

        <div className="relative flex-shrink-0">
          <button
            onClick={toggleUserDropdown}
            className={`px-3 py-1.5 md:px-4 md:py-2 rounded-full font-bold transition text-sm md:text-base
              ${darkMode ? "bg-white text-black" : "bg-black text-white"}`}
          >
            User
          </button>

          {showUserDropdown && (
            <div
              className={`absolute right-0 mt-2 w-[90vw] max-w-[360px] sm:w-[380px] border rounded-xl shadow-lg z-50
                ${darkMode ? "bg-black text-white border-gray-700" : "bg-white text-black border-gray-300"}`}
            >
              <div className="flex justify-between items-center px-4 py-2 bg-blue-600 rounded-t-xl">
                <h3 className="text-base font-semibold">User Profile</h3>
                <IoClose
                  size={22}
                  onClick={() => setShowUserDropdown(false)}
                  className="cursor-pointer text-white"
                />
              </div>

              {loginUser ? (
                <div className="px-4 py-3 space-y-2 text-sm md:text-base font-medium">
                  <p><strong>Name:</strong> {loginUser.name}</p>
                  <p><strong>Email:</strong> {loginUser.email}</p>
                  <p><strong>Phone:</strong> {loginUser.phone}</p>
                  <p><strong>DOB:</strong> {loginUser.dob}</p>

                  <button
                    onClick={logoutUser}
                    className="mt-3 w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-2 rounded-lg transition-all"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div className="text-center py-5 font-bold text-sm md:text-base">
                  No user logged in <br />
                  <Link to="/signup" className="underline">Signup</Link>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
