import React from "react";
import { FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const User = () => {
  const navigate = useNavigate();

  const loginUser = JSON.parse(localStorage.getItem("user"));

  const logoutUser = () => {
    sessionStorage.removeItem("loginuser");
    alert("Logout successful!");
    navigate("/login");
  };

  return (
    <div className="bg-blue-200 text-white min-h-screen p-10">

      <div className="bg-[#1a1a1a] p-6 rounded-xl shadow-lg max-w-xl mx-auto">
        <h2 className="text-3xl font-bold mb-4 flex items-center gap-3">
          <FaUserCircle size={40} className="text-blue-400" />
          User Profile
        </h2>

        {loginUser ? (
          <div className="space-y-3 text-lg">
            <p><strong>Name:</strong> {loginUser.name}</p>
            <p><strong>Email:</strong> {loginUser.email}</p>
            <p><strong>Phone:</strong> {loginUser.phone}</p>
            <p><strong>Date of Birth:</strong> {loginUser.dob}</p>
            <p><strong>Password:</strong> {loginUser.password}</p>

            <button
              onClick={logoutUser}
              className="mt-5 bg-red-600 px-5 py-2 rounded-lg hover:bg-red-700 text-white font-semibold"
            >
              Logout
            </button>
          </div>
        ) : (
          <p className="text-gray-400">No user logged in.</p>
        )}
      </div>

    </div>
  );
};

export default User;
