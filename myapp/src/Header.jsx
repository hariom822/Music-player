import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSearchText,setViewMode  } from "./redux/singerSlice";
import { FaHeart, FaMoon, FaSun,FaTable,FaThLarge } from "react-icons/fa";
import { useNavigate ,Link} from "react-router-dom";
import { toggleTheme } from "./redux/themeSlice";
import { IoClose } from "react-icons/io5";
const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [show, setShow] = useState(true)
  const { searchText, favourites } = useSelector((s) => s.music);
  const { darkMode } = useSelector((s) => s.theme);
  const isLogin = sessionStorage.getItem('loginuser')
  const { viewMode } = useSelector((s) => s.music);
  const loginUser = JSON.parse(localStorage.getItem("user"));
  const userdata =()=>{
    // navigate('/user')
    setShow(!show)
  }
  const deleteuser=()=>{
    localStorage.removeItem("user");
    alert("Logout successful!");
    navigate("/login");
  }
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
        
<button
  onClick={() => dispatch(setViewMode(viewMode === "card" ? "table" : "card"))}
  className="px-3 py-2 rounded-full bg-white hover:bg-gray-400 transition flex items-center justify-center"
>
  {viewMode === "card" ? (
    <FaTable size={20} className="text-black" />
  ) : (
    <FaThLarge size={20} className="text-black" />
  )}
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
        {show?(<button
          onClick={() =>userdata()}
          className={`px-4 py-2 rounded-full font-bold transition
          ${darkMode ? "bg-white text-black" : "bg-black text-white"}`}
        >
          User
        </button>):(
          <div>
          <button
          onClick={() =>userdata()}
          className={`px-4 py-2 rounded-full font-bold transition
          ${darkMode ? "bg-white text-black" : "bg-black text-white"}`}
        >
          User
        </button>
        <div
  className={`fixed top-15 right-0 w-[380px] h-[320px]  
    border rounded-t-xl z-[999] flex flex-col 
    ${darkMode ? "text-white bg-black" : "bg-white text-black"}`}
>


  <div className={`flex justify-between items-center px-4 py-3 bg-blue-600  rounded-t-xl
    `}>
    <h2 className="text-xl font-semibold flex items-center  gap-5">
      User Profile
    </h2>
    <IoClose
     size={35}
      onClick={() => setShow(true)}
       className="absolute top-2 right-2 bg-black/60 p-1 rounded-full cursor-pointer"
    />
  </div>
  {loginUser ? (
    <div className={`px-5 py-4 space-y-3 text-[17px] text-gray-700 font-medium
    ${darkMode ? "text-white bg-black" : "bg-white text-black"}`}>
      <p><strong>Name:</strong> {loginUser.name}</p>
      <p><strong>Email:</strong> {loginUser.email}</p>
      <p><strong>Phone:</strong> {loginUser.phone}</p>
      <p><strong>Date of Birth:</strong> {loginUser.dob}</p>
      <button
      onClick={()=>deleteuser()}
        className="mt-5 w-full bg-red-600 px-5 py-2 rounded-lg hover:bg-red-700 text-white font-semibold transition-all"
      >
        Logout
      </button>
    </div>
  ) : (
    <div className={`text-center text-gray-600 py-6 font-bold font-xl
      ${darkMode ? "text-white bg-black" : "bg-white text-black"}`}>No user logged in <br/>
      <Link to={'/signup'} className="underline m-6">Singup</Link></div>
  )}
</div>
</div>
           )}
      </div>
    </div>
  );
};

export default Header;
