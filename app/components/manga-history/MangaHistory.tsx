"use client";
import {TrashSimple} from "@phosphor-icons/react";
import Image from "next/image";
import React, {useEffect, useState} from "react";
import "../../globals.css";
import Link from "next/link";

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
                        key={manga.info.id}
                        className="w-[340px] h-fit flex flex-row gap-[16px] p-[14px] rounded-[22px] border-[1.5px] border-white/20"
                    >
                        <div className="w-[90px] h-[130px] relative overflow-hidden">
                            <Image
                                src={manga.info.cover}
                                alt=""
                                fill
                                className="object-cover rounded-[8px] outline outline-[1px] outline-white/20 outline-offset-[-1px]"
                                sizes="1200px"
                            />
                        </div>
                        <div className="flex flex-col grow shrink-0 basis-0 justify-between overflow-hidden pt-[3px]">
                            <div className="flex flex-col gap-[5px]">
                                <Link href={`/pages/details/${manga.info.host}?id=${manga.info.id}`}>
                                    <p className="w-full text-sm text-lightGray font-semibold whitespace-nowrap text-ellipsis overflow-hidden">
                                        {manga.info.title}
                                    </p>
                                </Link>
                                <p className="w-full text-xs text-white/75 font-medium whitespace-nowrap text-ellipsis overflow-hidden">
                                    Chương mới nhất: {manga.info.lastChapterTitle}
                                </p>
                                <Link
                                    href={`/pages/reader/${manga.info.host}?idComic=${manga.info.id}&id=${manga.current.id}`}>
                                    <p className="w-full text-xs text-white/75 hover:text-[#d9f21c] font-medium whitespace-nowrap text-ellipsis overflow-hidden cursor-pointer">
                                        Đọc tiếp: {manga.current.title}
                                    </p>
                                </Link>
                            </div>
                            <div className="w-full h-fit flex justify-end">
                                <div
                                    className="w-fit h-fit p-[10px] bg-red-500 rounded-full cursor-pointer"
                                    onClick={() => handleDeleteClick(index)}
                                >
                                    <TrashSimple color="#fff" weight="bold" size={14}/>
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
