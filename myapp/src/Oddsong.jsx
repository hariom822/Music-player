import React, { useState } from "react";
import { useSelector } from "react-redux";
import { IoClose } from "react-icons/io5";
import { FaExpand } from "react-icons/fa";

const Oddsong = () => {
  const { singers, viewMode } = useSelector((s) => s.music);
  const { darkMode } = useSelector((s) => s.theme);

  const allSongs = singers.flatMap((singer) =>
    singer.songs.map((song) => ({
      ...song,
      singerName: singer.name,
    }))
  );

  const uniqueSongs = [...new Map(allSongs.map((s) => [s.id, s])).values()];
  const shuffledSongs = uniqueSongs.sort(() => Math.random() - 0.5);

  const [currentVideo, setCurrentVideo] = useState(null);
  const [fullscreen, setFullscreen] = useState(false);

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
      className={`mt-[63px] ml-0 md:ml-64 p-4 md:p-8 min-h-screen ${
        darkMode ? "text-white bg-black" : "text-black bg-white"
      }`}
    >
      <h1 className="text-2xl md:text-3xl font-bold mb-6">Odd Songs</h1>

      {viewMode === "table" && (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-gray-600">
                <th className="p-3">Thumbnail</th>
                <th className="p-3">Title</th>
                <th className="p-3">Singer</th>
              </tr>
            </thead>

            <tbody>
              {shuffledSongs.map((song) => (
                <tr
                  key={song.id}
                  className="border-b border-gray-700 hover:bg-gray-700/40 cursor-pointer"
                  onClick={() => {
                    setFullscreen(false);
                    setCurrentVideo(song);
                  }}
                >
                  <td className="p-3">
                    <img src={song.thumbnail} className="w-20 rounded-lg" />
                  </td>
                  <td className="p-3">{song.title}</td>
                  <td className="p-3">{song.singerName}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {viewMode === "card" && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {shuffledSongs.map((song) => (
            <div
              key={song.id}
              className="bg-[#181818] p-4 rounded-lg cursor-pointer hover:bg-[#262626]"
              onClick={() => {
                setFullscreen(false);
                setCurrentVideo(song);
              }}
            >
              <img src={song.thumbnail} className="w-full h-40 rounded-lg" />
              <p className="mt-2 font-semibold">{song.title}</p>
              <p className="text-sm opacity-60">{song.singerName}</p>
            </div>
          ))}
        </div>
      )}
      {currentVideo && !fullscreen && (
        <div className="fixed bottom-0 left-0 md:left-64 right-0 bg-black p-4 border-t border-gray-700 z-40">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-lg text-white">{currentVideo.title}</h3>

            <div className="flex gap-4">
              <FaExpand
                size={22}
                className="cursor-pointer text-white"
                onClick={() => setFullscreen(true)}
              />

              <IoClose
                size={26}
                className="cursor-pointer text-white"
                onClick={() => setCurrentVideo(null)}
              />
            </div>
          </div>

          <iframe
            src={convertEmbed(currentVideo.url)}
            className="w-full h-72 rounded-lg"
            allow="autoplay"
          ></iframe>
        </div>
      )}
      {currentVideo && fullscreen && (
        <div className="fixed inset-0 bg-black z-50 p-5 flex flex-col">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-white">{currentVideo.title}</h2>

            <IoClose
              size={30}
              className="cursor-pointer text-white"
              onClick={() => setFullscreen(false)}
            />
          </div>

          <iframe
            src={convertEmbed(currentVideo.url)}
            className="w-full h-full rounded-lg"
            allow="autoplay"
          ></iframe>
        </div>
      )}
    </div>
  );
};

export default Oddsong;
