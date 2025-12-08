import React, { useState } from "react";
import { IoClose } from "react-icons/io5";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { toggleFavourite } from "./redux/singerSlice";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useNavigate } from "react-router-dom";

const Center = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { selectedSinger, searchText, favourites } = useSelector(
    (state) => state.music
  );
  const { darkMode } = useSelector((s) => s.theme);

  const [currentVideo, setCurrentVideo] = useState(null);

  const checkLoginBeforePlay = (song) => {
    const loginUser = sessionStorage.getItem("loginuser");
    if (!loginUser) {
      alert("Please login first!");
      navigate("/login");
      return;
    }
    setCurrentVideo(song);
  };

  if (!selectedSinger) {
    return (
      <div
        className={`flex-1 p-6 ml-0 md:ml-64 mt-[80px] ${
          darkMode ? "bg-black text-white" : "bg-white text-black"
        }`}
      >
        <h2 className="text-3xl text-center opacity-70">Select a Singer</h2>
      </div>
    );
  }

  const filteredSongs = selectedSinger.songs.filter((song) =>
    song.title.toLowerCase().includes(searchText.toLowerCase())
  );

  const convertEmbed = (url) => {
    if (url.includes("youtu.be")) {
      return `https://www.youtube.com/embed/${url.split("youtu.be/")[1].split("?")[0]}`;
    }
    if (url.includes("watch?v=")) {
      return `https://www.youtube.com/embed/${new URL(url).searchParams.get("v")}`;
    }
    return url;
  };

  return (
    <div
      className={`flex-1 ml-0 md:ml-64 mt-[80px] p-6 overflow-y-auto min-h-screen ${
        darkMode ? "bg-black text-white" : "bg-white text-black"
      }`}
    >
      <h2 className="text-4xl font-bold mb-6">{selectedSinger.name} Songs</h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {filteredSongs.map((song) => (
          <div
            key={song.id}
            className="bg-[#181818] dark:bg-gray-900 p-4 rounded-xl hover:bg-[#262626] transition"
          >
            <LazyLoadImage
              src={song.thumbnail}
              onClick={() => checkLoginBeforePlay(song)}
              className="w-full h-40 rounded-xl cursor-pointer object-cover"
            />

            <div className="flex justify-between items-center mt-2">
              <p className="truncate">{song.title}</p>
              <button onClick={() => dispatch(toggleFavourite(song))}>
                {favourites.find((x) => x.id === song.id) ? (
                  <FaHeart className="text-red-500" />
                ) : (
                  <FaRegHeart className="text-gray-400" />
                )}
              </button>
            </div>
          </div>
        ))}
      </div>

      {currentVideo && (
        <div className="fixed bottom-0 left-0 md:left-64 right-0 bg-black p-4 z-50">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-xl">{currentVideo.title}</h3>
            <IoClose
              size={26}
              onClick={() => setCurrentVideo(null)}
              className="cursor-pointer text-white"
            />
          </div>

          <iframe
            src={convertEmbed(currentVideo.url)}
            className="w-full h-80 mt-3 rounded-lg"
            allow="autoplay"
          ></iframe>
        </div>
      )}
    </div>
  );
};

export default Center;
