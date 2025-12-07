import React from "react";
import { FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import {  FaArrowLeft } from "react-icons/fa";
const User = () => {
  const navigate = useNavigate();

  const loginUser = JSON.parse(localStorage.getItem("user"));

  const logoutUser = () => {
    sessionStorage.removeItem("loginuser");
    alert("Logout successful!");
    navigate("/login");
  };

  return (
    <div className="bg-blue-200 text-white min-h-screen p-10 flex items-center justify-center"
      style={{
    backgroundImage: "url('https://images.unsplash.com/photo-1503264116251-35a269479413?auto=format&fit=crop&w=1950&q=80')",
    backgroundSize: "cover",
    backgroundPosition: "center"
  }}>

      <div className="text-[#1a1a1a]  p-8 rounded-2xl shadow-2xl max-w-xl w-full transition-all duration-500 shadow-black">

        <h2 className="text-4xl font-extrabold mb-6 flex items-center gap-4 border-b pb-4 border-gray-700">
          <FaUserCircle size={50} className="text-blue-400 drop-shadow-md" />
          User Profile
        </h2>

        {loginUser ? (
          <div className="space-y-4 text-2xl font-bold tracking-wide">

            <p><strong className="text-blue-300">Name:</strong> {loginUser.name}</p>
            <p><strong className="text-blue-300">Email:</strong> {loginUser.email}</p>
            <p><strong className="text-blue-300">Phone:</strong> {loginUser.phone}</p>
            <p><strong className="text-blue-300">Date of Birth:</strong> {loginUser.dob}</p>
            <p><strong className="text-blue-300">Password:</strong> {loginUser.password}</p>

            <div className="flex grid-cols-2 items-center space-between">
               <button
              onClick={() => navigate(-1)}
              className="mt-6 bg-green-300 px-6 py-3 rounded-lg hover:bg-green-400 text-white font-bold shadow-lg
                         hover:shadow-red-600/40  transition-all duration-300"
            >
              Back
            </button>
            <button
              onClick={logoutUser}
              className="mt-6 bg-red-600 px-6 py-3 rounded-lg hover:bg-red-700 text-white font-bold shadow-lg
                         hover:shadow-red-600/40 ml-auto transition-all duration-300"
            >
              Logout
            </button>
            </div>
          </div>
        ) : (
          <p className="text-gray-400 text-center py-5 text-xl">No user logged in.</p>
        )}
      </div>

    </div>
  );
};

export default User;
