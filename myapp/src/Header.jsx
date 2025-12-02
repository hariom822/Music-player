import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSearchText,setViewMode  } from "./redux/singerSlice";
import { FaHeart, FaMoon, FaSun } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toggleTheme } from "./redux/themeSlice";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { searchText, favourites } = useSelector((s) => s.music);
  const { darkMode } = useSelector((s) => s.theme);
  const isLogin = sessionStorage.getItem('loginuser')
  const { viewMode } = useSelector((s) => s.music);

  // const handleLogout =()=>{
  //   sessionStorage.removeItem('loginuser')
  //   navigate('/')
  // }
  return (
    <div
      className={`w-full fixed top-0 flex items-center justify-between px-6 py-4 z-50 transition-all 
        ${darkMode ? "bg-[#101010] text-white" : "bg-gray-200 text-black"}`}
    >
      <h2
        className="text-xl font-bold cursor-pointer"
        onClick={() => navigate("/")}
      >
        Music App
      </h2>

      <input
        type="text"
        value={searchText}
        onChange={(e) => dispatch(setSearchText(e.target.value))}
        placeholder="Search songs..."
        className={`px-4 py-2 rounded-full w-96 outline-none
          ${darkMode ? "bg-[#242424] text-white" : "bg-white text-black"}`}
      />

      <div className="flex items-center gap-4">
        <button onClick={() => dispatch(toggleTheme())} 
        className="px-3 py-2 rounded-full transition  font-bold">
            {darkMode ? (
    <FaSun size={22} className="text-yellow-400" />
  ) : (
    <FaMoon size={22} className="text-black" />
  )}
        </button>
        {/* {isLogin?(<><button
          onClick={()=>handleLogout()}
          className="bg-blue-600 px-4 py-2 rounded-full hover:bg-blue-700 transition text-white"
        >
          Logout
        </button></>):(<>
        <button
          onClick={() => navigate("/login")}
          className="bg-blue-600 px-4 py-2 rounded-full hover:bg-blue-700 transition text-white"
        >
          Login
        </button>

        <button
          onClick={() => navigate("/signup")}
          className="bg-green-600 px-4 py-2 rounded-full hover:bg-green-700 transition text-white"
        >
          Signup
        </button>
        </>)} */}
        <button onClick={() =>
         dispatch(setViewMode(viewMode === "card" ? "table" : "card"))
            }
         className="px-3 py-2 bg-gray-300 rounded-full">
  {viewMode === "card" ? <p>table</p>  :<p>cart</p> }
</button>
        

        <button onClick={() => navigate("/favourite")}>
          <div
            className={`flex items-center gap-1 px-3 py-1 rounded-full cursor-pointer
            ${darkMode ? "bg-[#242424]" : "bg-gray-300"}`}
          >
            <FaHeart className="text-red-500" />
            <p>{favourites.length}</p>
          </div>
        </button>

        <button
          onClick={() => navigate("/user")}
          className={`px-4 py-2 rounded-full font-bold transition
          ${darkMode ? "bg-white text-black" : "bg-black text-white"}`}
        >
          User
        </button>
      </div>
    </div>
  );
};

export default Header;
