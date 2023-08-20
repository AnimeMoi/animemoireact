import React from "react";
import "../../globals.css";
import "./NewMangaUpdate.css";
import Image from "next/image";
import MangaInfoOverlay from "../manga-info-overlay/MangaInfoOverlay";
import { Default } from "../manga-info-overlay/MangaInfoOverlay.stories";

const NewMangaUpdate: React.FC = () => {
  const renderMangaDiv = () => {
    const mangaDiv = [];
    for (let i = 0; i < 10; i++) {
      mangaDiv.push(
        <div className="manga w-fit h-fit flex flex-col gap-[20px]" key={i}>
          <div className="w-[180px] h-[260px] relative overflow-hidden">
            <Image src={"https://honeysanime.com/wp-content/uploads/2017/12/Boruto-Naruto-Next-Generations-500x750.jpg"} alt={""} fill objectFit="cover" className="rounded-[20px] outline outline-2 outline-white/20 outline-offset-[-2px]" />
          </div>
          <div className="w-[180px] h-fit flex flex-col items-center overflow-hidden gap-[4px] px-[8px]">
            <p className="manga-title w-full text-base text-lightGray font-semibold text-center whitespace-nowrap text-ellipsis overflow-hidden cursor-pointer">Uzumaki Boruto</p>
            <p className="text-sm text-white opacity-75 font-medium">Chapter 80</p>
          </div>
          <div className="manga-info-overlay">
            <MangaInfoOverlay {...Default.args} />
          </div>
        </div>
      );
    }
    return mangaDiv;
  };

  return (
    <div className="font-primary w-full h-fit flex flex-col gap-[30px]">
      <div className="flex flex-row justify-between items-center">
        <p className="text-xl text-lightGray font-semibold">Truyện mới cập nhật</p>
        <p className="text-base text-white opacity-75 font-semibold">NetTruyen</p>
      </div>
      <div className="flex flex-wrap justify-center gap-[50px]">
        {renderMangaDiv()}
      </div>
    </div>
  );
};

export default NewMangaUpdate;
