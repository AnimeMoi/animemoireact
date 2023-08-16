import React from "react";
import "../../globals.css";
import "./NewMangaUpdate.css";
import Image from "next/image";
import MangaInfoOverplay from "../manga-info-overplay/MangaInfoOverplay";
import { Default } from "../manga-info-overplay/MangaInfoOverplay.stories";

const NewMangaUpdate: React.FC = () => {
  const renderMangaDiv = () => {
    const mangaDiv = [];
    for (let i = 0; i < 10; i++) {
      mangaDiv.push(
        <div className="manga w-fit h-fit flex flex-col gap-[20px] cursor-pointer" key={i}>
          <div className="w-[180px] h-[260px] relative overflow-hidden">
            <Image src={"https://honeysanime.com/wp-content/uploads/2017/12/Boruto-Naruto-Next-Generations-500x750.jpg"} alt={""} fill objectFit="cover" className="rounded-[20px] outline outline-2 outline-white/20 outline-offset-[-2px]" />
          </div>
          <div className="w-[180px] h-fit flex flex-col items-center overflow-hidden gap-[4px] px-[8px]">
            <p className="w-full text-base text-lightGray font-semibold text-center whitespace-nowrap text-ellipsis overflow-hidden">Uzumaki Boruto</p>
            <p className="text-sm text-white opacity-75 font-medium">Chapter 80</p>
          </div>
          <MangaInfoOverplay {...Default.args} />
        </div>
      );
    }
    return mangaDiv;
  };

  return (
    <div className="font-primary w-fit h-fit flex flex-col gap-[30px]">
      <div className="w-full h-fit flex flex-row justify-between items-center">
        <p className="text-xl text-lightGray font-semibold">Truyện mới cập nhật</p>
        <p className="text-base text-white opacity-75 font-semibold">NetTruyen</p>
      </div>
      <div className="w-fit h-fit grid gap-x-[51px] gap-y-[41px] grid-cols-5">
        {renderMangaDiv()}
      </div>
    </div>
  );
};

export default NewMangaUpdate;
