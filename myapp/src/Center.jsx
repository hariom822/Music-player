import React, { useState } from "react";
import { IoClose } from "react-icons/io5";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { toggleFavourite } from "./redux/singerSlice";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useNavigate } from "react-router-dom";

const Center = () => {
  const dispatch = useDispatch();
  const navigate=useNavigate()
  const { selectedSinger, searchText, favourites } = useSelector(
    (state) => state.music
  );
const { darkMode } = useSelector((s) => s.theme);
  const [currentVideo, setCurrentVideo] = useState(null);

  const checkLoginBeforePlay = (song) => {
    const loginUser = sessionStorage.getItem("loginuser");

    if (!loginUser) {
      alert("Please login first!");
      navigate('/login')
      return; 
    }

    setCurrentVideo(song);
  };

  if (!selectedSinger) {
    return (
      <div className="flex-1 text-white p-6 ml-64 mt-24">
        <h2 className="text-3xl text-center opacity-70">Select a Singer</h2>
      </div>
    );
  }

  const filteredSongs = selectedSinger.songs.filter((song) =>
    song.title.toLowerCase().includes(searchText.toLowerCase())
  );

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
const allsong=()=>{
  navigate("*");
}


  return (
    <>
    
    <div className={ `flex-1 ml-64 mt-10 p-6 bg-black text-white overflow-y-auto  ${darkMode ? "bg-black text-white" : "bg-white text-black"}`} >
   
      <div className="grid grid-cols-2">
        <h2 className="text-4xl font-bold mb-6">{selectedSinger.name} Songs</h2>
      {/* <button className=" flex items-center gap-2 px-4 py-2 mb-4 ml-88 h-10 w-24 bg-blue-200 text-white rounded-full  " onClick={allsong}>All Song</button> */}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {filteredSongs.map((song) => (
          <div
            key={song.id}
            className="bg-[#181818] p-4 rounded-xl hover:bg-[#262626]"
          >
            <LazyLoadImage
              src={song.thumbnail}
              onClick={() => checkLoginBeforePlay(song)} 
              className="w-full h-40 rounded-xl cursor-pointer"
            />

            <div className="flex justify-between items-center mt-2">
              <p>{song.title}</p>

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
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-black">
          <div className="flex justify-between">
            <h3 className="text-xl">{currentVideo.title}</h3>
            <IoClose
              size={26}
              onClick={() => setCurrentVideo(null)}
              className="cursor-pointer"
            />
          </div>

          <iframe
            src={convertEmbed(currentVideo.url)}
            className="w-full h-80 mt-3 rounded-lg"
          ></iframe>
        </div>
      )}
    </div>
    </>
  );
};

export default Center;
