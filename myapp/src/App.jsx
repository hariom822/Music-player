import React, { useState, useEffect } from "react";
import Header from "./Header";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";
import Center from "./Center";
import User from "./User";
import Login from "./Login";
import Signup from "./Signup ";
import { useDispatch, useSelector } from "react-redux";
import { fetchSingers } from "./redux/singerSlice";
import Favourite from "./Favourite";
import Temp from "./Temp";
import Singers from "./Singers";
import NewSongs from "./Newsongs";
import Oddsong from "./Oddsong";
import Footer from "./Footer";
function LayoutWrapper({ children }) {
  const location = useLocation();
  const hideLayout = location.pathname === "/login" ||
   location.pathname === "/signup" ||
    location.pathname === "/user" ||
     location.pathname === "/favourite";

  return (
    <>
      {!hideLayout && <Header />}
      {!hideLayout && <Sidebar />}
      
      <div>{children}</div>
    </>
  );
}
export default function App() {
  const dispatch = useDispatch();
  const { selectedSinger } = useSelector((state) => state.music);
  useEffect(() => {
    dispatch(fetchSingers());
  }, []);
  return (
    <div>
      <BrowserRouter>
        <LayoutWrapper>
          <Routes>
            <Route
              path="/"
              element={
                <>
                  {!selectedSinger && <Temp />}
                  {selectedSinger && <Center />}
                </>}/>
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/user" element={<User />} />
            <Route path="/favourite" element={<Favourite />} />
            <Route path="/singers" element={<Singers />} />
            <Route path="/newsongs" element={<NewSongs />} />
            <Route path="/oddsong" element={<Oddsong />} />
            <Route path="*" element={<Temp />} />
           <Route path="/footer" element={<Footer />} />
          </Routes>
        </LayoutWrapper>
      </BrowserRouter>
    </div>
  );
}
