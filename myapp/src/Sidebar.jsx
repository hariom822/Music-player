import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  FaHome,
  FaHistory,
  FaHeart,
  FaUser,
  FaCompactDisc,
  FaMicrophoneAlt,
  FaMusic,
} from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { clearHistory } from "./redux/singerSlice";

const Sidebar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const history = useSelector((state) => state.music?.history) || [];
  const { darkMode } = useSelector((state) => state.theme);

  return (
    <div
      className={`w-64 h-screen fixed top-16 left-0 overflow-y-auto p-5 transition-all
      ${darkMode ? "bg-[#0c0c0c] text-white" : "bg-[#f1f1f1] text-black"}`}
    >
      <div className="space-y-5">

        <div
          onClick={() => navigate("/")}
          className="flex items-center gap-3 text-lg cursor-pointer hover:opacity-80 transition"
        >
          <FaHome />
          <span>Home</span>
        </div>

        <div
          onClick={() => navigate("/singers")}
          className="flex items-center gap-3 text-lg cursor-pointer hover:opacity-80 transition"
        >
          <FaMicrophoneAlt />
          <span>Singers</span>
        </div>

        <div
          onClick={() => navigate("/newsongs")}
          className="flex items-center gap-3 text-lg cursor-pointer hover:opacity-80 transition"
        >
          <FaMusic />
          <span>New Songs</span>
        </div>

        <div
          onClick={() => navigate("/oddsong")}
          className="flex items-center gap-3 text-lg cursor-pointer hover:opacity-80 transition"
        >
          <FaMusic />
          <span>Old Songs</span>
        </div>

        <div
          onClick={() => navigate("/favourite")}
          className="flex items-center gap-3 text-lg cursor-pointer hover:opacity-80 transition"
        >
          <FaHeart className="text-red-500" />
          <span>Favourites</span>
        </div>

        <div
          onClick={() => navigate("/user")}
          className="flex items-center gap-3 text-lg cursor-pointer hover:opacity-80 transition"
        >
          <FaUser />
          <span>User Profile</span>
        </div>
      </div>

      <div className="mt-8 flex items-center justify-between">
        <h2 className="text-xl font-bold flex items-center gap-2">
          <FaHistory /> History
        </h2>

        {history.length > 0 && (
          <MdDelete
            size={22}
            className="cursor-pointer hover:text-red-500"
            onClick={() => dispatch(clearHistory())}
          />
        )}
      </div>
      <div className="mt-4 space-y-3">
        {history.length === 0 ? (
          <p className="opacity-60 text-sm">No recently played songs</p>
        ) : (
          history.map((item, index) => (
            <div
              key={index}
              className="flex items-center gap-3 cursor-pointer hover:bg-[#1b1b1b] p-2 rounded-lg transition"
            >
              <img
                src={item.thumbnail}
                className="w-12 h-12 rounded-lg object-cover"
              />
              <div>
                <p className="font-semibold">{item.title}</p>
                <p className="text-xs opacity-60">{item.singerName}</p>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="mt-10 opacity-70 text-sm flex gap-3 items-center">
        <FaCompactDisc />
        <span>Powered by Music App</span>
      </div>
    </div>
  );
};

export default Sidebar;
