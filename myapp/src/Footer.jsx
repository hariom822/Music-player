import React from "react";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
import { useSelector } from "react-redux";

const Footer = () => {
  const { darkMode } = useSelector((s) => s.theme);

  return (
        <div className={ `flex-1 ml-64 mt-10 p-6 bg-black text-white overflow-y-auto  ${darkMode ? "bg-black text-white" : "bg-white text-black"}`} >

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">

        <div>
          <h2 className="text-2xl font-bold">Music App</h2>
          <p className="mt-2 opacity-70 text-sm">
            Enjoy your music with style. Listen, explore and vibe!
          </p>
        </div>

        <div>
          <h3 className="font-semibold text-lg mb-2">Quick Links</h3>
          <ul className="space-y-2 opacity-80">
            <li className="cursor-pointer hover:opacity-100 transition">Home</li>
            <li className="cursor-pointer hover:opacity-100 transition">Singers</li>
            <li className="cursor-pointer hover:opacity-100 transition">New Songs</li>
            <li className="cursor-pointer hover:opacity-100 transition">Favourites</li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold text-lg mb-2">Follow Us</h3>

          <div className="flex items-center gap-4 text-2xl">
            <FaFacebook className="cursor-pointer hover:text-blue-500 transition" />
            <FaInstagram className="cursor-pointer hover:text-pink-500 transition" />
            <FaTwitter className="cursor-pointer hover:text-blue-400 transition" />
          </div>
        </div>
      </div>

      <p className="text-center mt-6 opacity-60 text-sm">
        © {new Date().getFullYear()} Music App — All Rights Reserved.
      </p>
    </div>
  );
};

export default Footer;
