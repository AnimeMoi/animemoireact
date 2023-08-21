import React from 'react';
import "../../globals.css";
import NavBar from '../../components/nav-bar/NavBar';
import NewMangaUpdate from '../../components/new-manga-update/NewMangaUpdate';

const HomePage = () => {
  return (
    <div className="w-screen flex justify-center bg-richBlack">
        <div className="w-[1200px] flex flex-col justify-start items-center gap-[60px] px-[48px] pb-[48px]">
            <NavBar isLoggedIn={false} isHomePage={true} />
            <NewMangaUpdate />
        </div>
    </div>
  );
};

export default HomePage;
