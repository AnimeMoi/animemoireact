"use client";
import { TrashSimple } from "@phosphor-icons/react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import "../../globals.css";
import Link from "next/link";
import { getMangas } from "../../utils/localStored";

const MangaHistory: React.FC = () => {
  const [mangas, setMangas] = useState<any[]>([]);

  useEffect(() => {
    const parsedMangas = getMangas();
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
    <div className="w-full h-fit flex flex-col gap-[40px]">
      <p className="text-xl text-lightGray font-semibold">Lịch sử đọc truyện</p>
      <div className="flex flex-row flex-wrap gap-[50px]">
        {mangas.map((manga: any, index: number) => (
          <div
            key={manga.info.id}
            className="w-[340px] h-fit flex flex-row gap-[14px] p-[12px] rounded-[22px] border-[1.5px] border-white/20"
          >
            <div className="w-[80px] h-[110px] relative overflow-hidden">
              <Image
                src={manga.info.cover}
                alt=""
                fill
                className="object-cover rounded-[10px] outline outline-[1px] outline-white/20 outline-offset-[-1px]"
                sizes="1200px"
              />
            </div>
            <div className="flex flex-col grow shrink-0 basis-0 justify-between overflow-hidden pt-px">
              <div className="flex flex-col gap-[4px] pr-[12px]">
                <Link
                  href={`/pages/details/${manga.info.host}?id=${manga.info.id}`}
                >
                  <p className="w-full text-[13px] text-lightGray font-semibold whitespace-nowrap text-ellipsis overflow-hidden">
                    {manga.info.title}
                  </p>
                </Link>
                <p className="w-full text-[11px] text-white/75 font-medium whitespace-nowrap text-ellipsis overflow-hidden">
                  Mới nhất: {manga.info.lastChapterTitle}
                </p>
                {manga.current && (
                  <Link
                    href={`/pages/reader/${manga.info.host}?idComic=${manga.info.id}&id=${manga.current.id}`}
                  >
                    <p className="w-full text-[11px] text-white/75 hover:text-[#d9f21c] font-medium whitespace-nowrap text-ellipsis overflow-hidden cursor-pointer">
                      Đọc tiếp: {manga.current.title}
                    </p>
                  </Link>
                )}
              </div>
              <div className="w-full h-fit flex justify-end">
                <div
                  className="w-fit h-fit p-[8px] bg-red-500 rounded-full cursor-pointer"
                  onClick={() => handleDeleteClick(index)}
                >
                  <TrashSimple color="#fff" weight="bold" size={12} />
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
