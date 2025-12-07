import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setSelectedSinger } from "./redux/singerSlice";
import { useNavigate } from "react-router-dom";

const Singers = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { singers, viewMode } = useSelector((s) => s.music);
  const { darkMode } = useSelector((s) => s.theme);

  const handleSingerClick = (singer) => {
    dispatch(setSelectedSinger(singer));
    navigate("/");
  };

  return (
    <div
      className={`ml-64 mt-10 p-8 ${
        darkMode ? "text-white bg-black" : "text-black bg-white"
      }`}
    >
      <h1 className="text-3xl font-bold mb-6">All Singers</h1>

      {viewMode === "table" && (
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-gray-600">
              <th className="p-3">Photo</th>
              <th className="p-3">Name</th>
            </tr>
          </thead>

          <tbody>
            {singers.map((singer) => (
              <tr
                key={singer.id}
                className="border-b border-gray-700 hover:bg-gray-700/40 cursor-pointer"
                onClick={() => handleSingerClick(singer)}
              >
                <td className="p-3">
                  <img
                    src={singer.photo}
                    className="w-20 h-20 rounded-full object-cover"
                  />
                </td>
                <td className="p-3 text-lg font-semibold">
                  {singer.name}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {viewMode === "card" && (
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
      )}
    </div>
  );
};

export default Singers;
