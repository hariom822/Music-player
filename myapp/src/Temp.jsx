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
        <div className="flex items-center justify-center w-full h-100 bg-white rounded-lg shadow-md">
          <div className="flex flex-col items-center gap-3">
            <div
              className="w-30 h-30 rounded-full border-10 border-gray-300 border-t-blue-600 animate-spin"
              role="status"
              aria-label="Loading"
            ></div>
            <span className="text-sm text-gray-600 font-bold">
              Loading, please wait…
            </span>
          </div>
        </div>
      ) : (
        <div
          className={`flex-1 ml-64 mt-10 p-6 overflow-y-auto ${
            darkMode ? "bg-black text-white" : "bg-white text-black"
          }`}
        >
          <h2 className="text-2xl font-bold mb-3">Favourite Singers</h2>

          <div className="flex gap-5 overflow-x-auto pb-2">
            {singers.map((singer) => (
              <div
                key={singer.id}
                className="text-center cursor-pointer"
                onClick={() => dispatch(setSelectedSinger(singer))}
              >
                <img
                  src={singer.photo}
                  className="w-20 h-20 rounded-full border-2 border-gray-500 object-cover"
                />
                <p className="text-sm mt-2">{singer.name}</p>
              </div>
            ))}
          </div>

          <h1 className="text-4xl font-bold mb-6 mt-6">All Songs</h1>

          {viewMode === "table" && (
            <table
              className={`w-full border-collapse ${
                darkMode ? "text-white" : "text-black"
              }`}
            >
              <thead>
                <tr className="border-b border-gray-600 text-left">
                  <th className="p-3">Thumbnail</th>
                  <th className="p-3">Title</th>
                  <th className="p-3">Singer</th>
                  <th className="p-3">Favourite</th>
                </tr>
              </thead>

              <tbody>
                {filteredSongs.map((song) => (
                  <tr
                    key={song.id}
                    className="border-b border-gray-700 hover:bg-gray-700/40 cursor-pointer"
                    onClick={() => checkLoginBeforePlay(song)}
                  >
                    <td
                      className="p-3"
                      onClick={(e) => {
                        e.stopPropagation(); 
                        checkLoginBeforePlay(song);
                      }}
                    >
                      {currentVideo?.id === song.id ? (
                        <iframe
                          src={convertEmbed(song.url)}
                          className="w-32 h-20 rounded-lg"
                          allow="autoplay"
                        ></iframe>
                      ) : (
                        <img
                          src={song.thumbnail}
                          className="w-20 rounded-lg cursor-pointer"
                        />
                      )}
                    </td>

                    <td className="p-3">{song.title}</td>
                    <td className="p-3">{song.singerName}</td>

                    <td className="p-3">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          dispatch(toggleFavourite(song));
                        }}
                      >
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
          )}

          {viewMode === "card" && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {filteredSongs.map((song) => (
                <div
                  key={song.id}
                  className="bg-[#181818] p-4 rounded-xl hover:bg-[#262626]"
                >
                  {currentVideo?.id === song.id && !fullScreen ? (
                    <div className="relative">
                      <iframe
                        src={convertEmbed(song.url)}
                        className="w-full h-40 rounded-lg"
                        allow="autoplay"
                      ></iframe>

                      <button
                        className="absolute top-2 right-2 bg-black/60 p-2 rounded-full"
                        onClick={() => setFullScreen(true)}
                      >
                        <FaExpand className="text-white" />
                      </button>

                      <IoClose
                        size={26}
                        onClick={() => setCurrentVideo(null)}
                        className="absolute top-2 left-2 bg-black/60 p-1 rounded-full cursor-pointer"
                      />
                    </div>
                  ) : (
                    <LazyLoadImage
                      src={song.thumbnail}
                      onClick={() => checkLoginBeforePlay(song)}
                      className="w-full h-40 rounded-xl cursor-pointer"
                    />
                  )}

                  <div className="mt-2">
                    <p className="font-semibold">{song.title}</p>
                    <p className="text-gray-400 text-sm">{song.singerName}</p>

                    <div className="flex justify-end mt-2">
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
              <div className="flex justify-between p-4">
                <h3 className="text-xl text-white">{currentVideo.title}</h3>

                <IoClose
                  size={32}
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
