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
      className={`ml-0 md:ml-64 mt-[63px] p-4 md:p-8 ${
        darkMode ? "text-white bg-black" : "text-black bg-white"
      } min-h-screen`}
    >
      <h1 className="text-2xl md:text-3xl font-bold mb-6">All Singers</h1>

      {viewMode === "table" && (
        <div className="overflow-x-auto">
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
                      className="w-16 h-16 md:w-20 md:h-20 rounded-full object-cover"
                    />
                  </td>
                  <td className="p-3 text-lg font-semibold">
                    {singer.name}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {viewMode === "card" && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {singers.map((singer) => (
            <div
              key={singer.id}
              className="text-center cursor-pointer hover:scale-105 transition"
              onClick={() => handleSingerClick(singer)}
            >
              <img
                src={singer.photo}
                className="w-28 h-28 md:w-32 md:h-32 rounded-full mx-auto object-cover"
              />
              <p className="mt-3 text-base md:text-lg font-semibold">
                {singer.name}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Singers;
