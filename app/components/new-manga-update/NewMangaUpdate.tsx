import React from "react";
import "../../globals.css";
import "./NewMangaUpdate.css";
import Image from "next/image";
import MangaCover from "../../images/demo-manga-covers/shingeki-no-kyojin.jpg";

const NewMangaUpdate: React.FC = () => {
  const renderMangaDivs = () => {
    const mangaDivs = [];
    for (let i = 0; i < 10; i++) {
      mangaDivs.push(
        <div
          className="manga w-fit h-fit flex flex-col gap-[20px] cursor-pointer"
          key={i}
        >
          <Image
            src={MangaCover}
            alt={""}
            className="w-[180px] h-[260px] rounded-[20px] outline outline-2 outline-white/20 outline-offset-[-2px]"
          />
          <div className="w-[180px] h-fit flex flex-col items-center overflow-hidden gap-[4px] px-[8px]">
            <p className="w-full text-base text-lightGray font-semibold text-center whitespace-nowrap text-ellipsis overflow-hidden">
              Shingeki no Kyojin
            </p>
            <p className="text-sm text-white opacity-75 font-medium">
              Chapter 139
            </p>
          </div>
        </div>
      );
    }
    return mangaDivs;
  };

  return (
    <div className="font-primary w-fit h-fit flex flex-col gap-[30px]">
      <div className="w-full h-fit flex flex-row justify-between items-center">
        <p className="text-xl text-lightGray font-semibold">
          Truyện mới cập nhật
        </p>
        <p className="text-base text-white opacity-75 font-semibold">
          NetTruyen
        </p>
      </div>
      <div className="w-fit h-fit grid gap-[40px] grid-cols-5">
        {renderMangaDivs()}
      </div>
    </div>
  );
};

export default NewMangaUpdate;
