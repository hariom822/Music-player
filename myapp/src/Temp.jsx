import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { LazyLoadImage } from "react-lazy-load-image-component";
import {
  toggleFavourite,
  addToHistory,
  setSelectedSinger,
} from "./redux/singerSlice";
import { FaHeart, FaRegHeart, FaExpand } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const Temp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const { singers, favourites, searchText, viewMode } = useSelector(
    (state) => state.music
  );

  useEffect(() => {
    if (singers && singers.length !== 0) {
      setLoading(false);
    }
  }, [singers]);

  const { darkMode } = useSelector((s) => s.theme);

  const [currentVideo, setCurrentVideo] = useState(null);
  const [fullScreen, setFullScreen] = useState(false);

  const allSongs =
    singers?.flatMap((singer) =>
      singer?.songs?.map((song) => ({
        ...song,
        singerName: singer.name,
      }))
    ) || [];

  const filteredSongs = allSongs.filter((song) =>
    song.title?.toLowerCase().includes(searchText.toLowerCase())
  );

  const checkLoginBeforePlay = (song) => {
    const loginUser = sessionStorage.getItem("loginuser");
    if (!loginUser) {
      alert("Please login first!");
      navigate("/login");
      return;
    }
    dispatch(addToHistory(song));
    setCurrentVideo(song);
    setFullScreen(false);
  };

  const convertEmbed = (url) => {
    if (!url) return "";
    if (url.includes("youtu.be"))
      return `https://www.youtube.com/embed/${url.split("youtu.be/")[1].split("?")[0]}`;
    if (url.includes("watch?v="))
      return `https://www.youtube.com/embed/${new URL(url).searchParams.get("v")}`;
    return url;
  };

  return (
    <>
      {loading ? (
        <div className="flex items-center justify-center w-full h-[60vh] bg-white rounded-lg shadow-md">
          <div className="flex flex-col items-center gap-3">
            <div className="w-10 h-10 sm:w-16 sm:h-16 rounded-full border-4 border-gray-300 border-t-blue-600 animate-spin"></div>
            <span className="text-sm sm:text-base text-gray-600 font-bold">Loading…</span>
          </div>
        </div>
      ) : (
        <div
          className={`flex-1 mt-[63px] p-3 sm:p-6 overflow-y-auto ${
            darkMode ? "bg-black text-white" : "bg-white text-black"
          } ml-0 md:ml-64`}
        >
          <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-3">Favourite Singers</h2>

          <div className="flex gap-4 sm:gap-5 overflow-x-auto pb-2">
            {singers.map((singer) => (
              <div
                key={singer.id}
                className="text-center cursor-pointer min-w-[60px] sm:min-w-[70px]"
                onClick={() => dispatch(setSelectedSinger(singer))}
              >
                <img
                  src={singer.photo}
                  className="w-12 h-12 sm:w-16 sm:h-16 rounded-full border-2 border-gray-500 object-cover"
                />
                <p className="text-xs sm:text-sm mt-1 sm:mt-2">{singer.name}</p>
              </div>
            ))}
          </div>

          <h1 className="text-xl sm:text-2xl md:text-4xl font-bold mb-6 mt-6">All Songs</h1>
          {viewMode === "table" && (
            <div className="overflow-x-auto">
              <table className={`w-full border-collapse ${darkMode ? "text-white" : "text-black"}`}>
                <thead>
                  <tr className="border-b border-gray-600 text-left">
                    <th className="p-2 sm:p-3">Thumbnail</th>
                    <th className="p-2 sm:p-3">Title</th>
                    <th className="p-2 sm:p-3">Singer</th>
                    <th className="p-2 sm:p-3">Favourite</th>
                  </tr>
                </thead>

                <tbody>
                  {filteredSongs.map((song) => (
                    <tr
                      key={song.id}
                      className="border-b border-gray-700 hover:bg-gray-700/40 cursor-pointer"
                      onClick={() => checkLoginBeforePlay(song)}
                    >
                      <td className="p-1 sm:p-3">
                        {currentVideo?.id === song.id ? (
                          <iframe
                            src={convertEmbed(song.url)}
                            className="w-24 sm:w-32 h-16 sm:h-20 rounded-lg"
                            allow="autoplay"
                          ></iframe>
                        ) : (
                          <img
                            src={song.thumbnail}
                            className="w-20 sm:w-24 rounded-lg cursor-pointer"
                          />
                        )}
                      </td>

                      <td className="p-1 sm:p-3 text-sm sm:text-base">{song.title}</td>
                      <td className="p-1 sm:p-3 text-sm sm:text-base">{song.singerName}</td>

                      <td className="p-1 sm:p-3">
                        <button onClick={() => dispatch(toggleFavourite(song))}>
                          {favourites.find((x) => x.id === song.id) ? (
                            <FaHeart className="text-red-500" />
                          ) : (
                            <FaRegHeart />
                          )}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          {viewMode === "card" && (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
              {filteredSongs.map((song) => (
                <div
                  key={song.id}
                  className="bg-[#181818] p-2 sm:p-3 md:p-4 rounded-xl hover:bg-[#262626]"
                >
                  {currentVideo?.id === song.id && !fullScreen ? (
                    <div className="relative">
                      <iframe
                        src={convertEmbed(song.url)}
                        className="w-full h-28 sm:h-32 md:h-40 rounded-lg"
                        allow="autoplay"
                      ></iframe>

                      <button
                        className="absolute top-2 right-2 bg-black/60 p-2 rounded-full"
                        onClick={() => setFullScreen(true)}
                      >
                        <FaExpand className="text-white" />
                      </button>

                      <IoClose
                        size={24}
                        onClick={() => setCurrentVideo(null)}
                        className="absolute top-2 left-2 bg-black/60 p-1 rounded-full cursor-pointer"
                      />
                    </div>
                  ) : (
                    <LazyLoadImage
                      src={song.thumbnail}
                      onClick={() => checkLoginBeforePlay(song)}
                      className="w-full h-28 sm:h-32 md:h-40 rounded-xl cursor-pointer"
                    />
                  )}

                  <div className="mt-2">
                    <p className="font-semibold text-sm sm:text-base">{song.title}</p>
                    <p className="text-gray-400 text-xs sm:text-sm">{song.singerName}</p>

                    <div className="flex justify-end mt-1 sm:mt-2">
                      <button onClick={() => dispatch(toggleFavourite(song))}>
                        {favourites.find((x) => x.id === song.id) ? (
                          <FaHeart className="text-red-500" />
                        ) : (
                          <FaRegHeart className="text-gray-400" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {fullScreen && currentVideo && (
            <div className="fixed inset-0 bg-black z-[999] flex flex-col">
              <div className="flex justify-between p-3 sm:p-4">
                <h3 className="text-base sm:text-lg md:text-xl text-white">
                  {currentVideo.title}
                </h3>

                <IoClose
                  size={28}
                  onClick={() => setFullScreen(false)}
                  className="cursor-pointer text-white"
                />
              </div>

              <iframe
                src={convertEmbed(currentVideo.url)}
                className="w-full flex-1"
                allow="autoplay"
              ></iframe>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Temp;
