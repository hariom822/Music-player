import React, { useState } from "react";
import { useSelector } from "react-redux";
import { FaHeart, FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Favourite = () => {
  const navigate = useNavigate();
  const { favourites } = useSelector((s) => s.music);

  const [playSong, setPlaySong] = useState(null);

  const convertEmbed = (url) => {
    if (url.includes("youtu.be")) {
      const id = url.split("youtu.be/")[1].split("?")[0];
      return `https://www.youtube.com/embed/${id}`;
    }
    if (url.includes("watch?v=")) {
      const id = new URL(url).searchParams.get("v");
      return `https://www.youtube.com/embed/${id}`;
    }
    return url;
  };

  return (
    <div className="text-white p-6 ">

      <div className="flex items-center gap-4 mb-6">
        <FaArrowLeft
          className="cursor-pointer text-2xl"
          onClick={() => navigate(-1)}
        />
        <h2 className="text-3xl text-black font-bold flex items-center gap-2">
          <FaHeart className="text-red-500" /> Favourite Songs
        </h2>
      </div>

      {favourites.length === 0 ? (
        <p className="opacity-70 text-xl">No favourite songs added yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {favourites.map((song) => (
            <div
              key={song.id}
              className="bg-[#181818] p-4 rounded-lg cursor-pointer"
              onClick={() => setPlaySong(song)}
            >
              <img
                src={song.thumbnail}
                className="w-full h-40 object-cover rounded-lg"
              />
              <h3 className="mt-3 font-semibold">{song.title}</h3>
            </div>
          ))}
        </div>
      )}

      {playSong && (
        <div className="fixed bottom-0 left-0 right-0 bg-black p-4 shadow-lg">
          <div className="flex justify-between text-xl mb-2">
            <p>{playSong.title}</p>
            <button onClick={() => setPlaySong(null)}>Close</button>
          </div>

          <iframe
            src={convertEmbed(playSong.url)}
            className="w-full h-72 rounded-lg"
            allow="autoplay"
          ></iframe>
        </div>
      )}
    </div>
  );
};

export default Favourite;
