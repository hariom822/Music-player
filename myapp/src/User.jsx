import React from "react";
import { FaUserCircle, FaArrowLeft } from "react-icons/fa";
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
    <div
      className="min-h-screen flex items-center justify-center p-4 sm:p-10 bg-blue-200"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1503264116251-35a269479413?auto=format&fit=crop&w=1950&q=80')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="bg-white/90 text-[#1a1a1a] p-6 sm:p-10 rounded-2xl shadow-2xl max-w-md w-full transition-all duration-500">
        <h2 className="text-3xl sm:text-4xl font-extrabold mb-6 flex items-center gap-4 border-b pb-4 border-gray-300">
          <FaUserCircle size={50} className="text-blue-400 drop-shadow-md" />
          User Profile
        </h2>

        {loginUser ? (
          <div className="space-y-4 text-base sm:text-lg font-semibold tracking-wide">
            <p>
              <strong className="text-blue-400">Name:</strong> {loginUser.name}
            </p>
            <p>
              <strong className="text-blue-400">Email:</strong> {loginUser.email}
            </p>
            <p>
              <strong className="text-blue-400">Phone:</strong> {loginUser.phone}
            </p>
            <p>
              <strong className="text-blue-400">Date of Birth:</strong> {loginUser.dob}
            </p>
            <p>
              <strong className="text-blue-400">Password:</strong> {loginUser.password}
            </p>

            <div className="flex flex-col sm:flex-row gap-3 mt-6">
              <button
                onClick={() => navigate(-1)}
                className="flex-1 bg-green-400 px-6 py-3 rounded-lg hover:bg-green-500 text-white font-bold shadow-lg transition-all duration-300"
              >
                <FaArrowLeft className="inline mr-2" />
                Back
              </button>

              <button
                onClick={logoutUser}
                className="flex-1 bg-red-600 px-6 py-3 rounded-lg hover:bg-red-700 text-white font-bold shadow-lg transition-all duration-300"
              >
                Logout
              </button>
            </div>
          </div>
        ) : (
          <p className="text-gray-400 text-center py-5 text-lg sm:text-xl">
            No user logged in.
          </p>
        )}
      </div>
    </div>
  );
};

export default User;
