"use client";
import React, { useEffect, useState } from "react";
import { TrashSimple } from "@phosphor-icons/react";
import "../../globals.css";
import Image from "next/image";

const MangaHistory: React.FC = () => {
  const [mangas, setMangas] = useState<any[]>([]);

  useEffect(() => {
    const storedMangas = localStorage.getItem("mangas");
    const parsedMangas = storedMangas ? JSON.parse(storedMangas) : [];
    setMangas(parsedMangas);
  }, []);

  const handleDeleteClick = (index: number) => {
    const updatedMangas = [...mangas];
    updatedMangas.splice(index, 1);
    localStorage.setItem("mangas", JSON.stringify(updatedMangas));
    setMangas(updatedMangas);
  };

  if (mangas.length === 0) {
    return null;
  }

  return (
    <div className="w-full h-fit flex flex-col gap-[30px]">
      <p className="text-xl text-lightGray font-semibold">Lịch sử đọc truyện</p>
      <div className="flex flex-row flex-wrap gap-[50px]">
        {mangas.map((manga: any, index: number) => (
          <div
            key={index}
            className="w-[340px] h-fit flex flex-row gap-5 p-[15px] rounded-[26px] border-[1.5px] border-white/20"
          >
            <div className="w-[100px] h-[140px] relative overflow-hidden">
              <Image
                src={manga.cover}
                alt=""
                fill
                className="object-cover rounded-[11px] outline outline-[1px] outline-white/20 outline-offset-[-1px]"
                sizes="1200px"
              />
            </div>
            <div className="flex flex-col grow shrink-0 basis-0 justify-between overflow-hidden py-[5px]">
              <div className="flex flex-col gap-[5px]">
                <p className="w-full text-sm text-lightGray font-semibold whitespace-nowrap text-ellipsis overflow-hidden">
                  {manga.title}
                </p>
                <p className="w-full text-xs text-white/75 font-medium whitespace-nowrap text-ellipsis overflow-hidden">
                  Đang đọc: {manga.lastChapterTitle}
                </p>
              </div>
              {/* <p
                className="text-xs text-red-500 font-semibold cursor-pointer"
                onClick={() => handleDeleteClick(index)}
              >
                Xoá
              </p> */}
              <div className="w-full h-fit flex justify-end">
                <div
                  className="w-fit h-fit p-[10px] bg-red-500 rounded-full cursor-pointer"
                  onClick={() => handleDeleteClick(index)}
                >
                  <TrashSimple color="#fff" weight="bold" size={14} />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MangaHistory;
