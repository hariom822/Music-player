import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setSelectedSinger } from "./redux/singerSlice";
import { useNavigate } from "react-router-dom";

const Singers = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { singers } = useSelector((s) => s.music);
  const { darkMode } = useSelector((s) => s.theme);

  const handleSingerClick = (singer) => {
    dispatch(setSelectedSinger(singer)); 
    navigate("/"); 
  };

  return (
    <div className={`ml-64 mt-10 p-8 ${darkMode ? "text-white bg-black" : "text-black bg-white"}`}>
      <h1 className="text-3xl font-bold mb-6">All Singers</h1>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {singers.map((singer) => (
          <div
            key={singer.id}
            className="text-center cursor-pointer hover:scale-105 transition"
            onClick={() => handleSingerClick(singer)}
          >
            <img
              src={singer.photo}
              className="w-32 h-32 rounded-full mx-auto object-cover"
            />
            <p className="mt-3 text-lg font-semibold">{singer.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Singers;
