import React from "react";
import "../../globals.css";
import "./NewMangaUpdate.css";
import Image from "next/image";
import MangaInfoOverlay from "../manga-info-overlay/MangaInfoOverlay";
import {Domain} from "@/app/domain";

const NewMangaUpdate: React.FC = async () => {
    const request = await fetch(`${Domain}NetTruyen?page=1`);
    const response = await request.json();
    const data = response.mangas;

    const renderMangaDiv = () => {
        const mangaDiv: React.JSX.Element[] = [];
        data.forEach((item: any, index: number) => {
            mangaDiv.push(
                <div className="manga w-fit h-fit flex flex-col gap-[20px]" key={index}>
                    <div className="w-[180px] h-[260px] relative overflow-hidden">
                        <Image
                            src={item.cover}
                            alt={item.title[0].title} fill objectFit="cover"
                            className="rounded-[20px] outline outline-2 outline-white/20 outline-offset-[-2px]"/>
                    </div>
                    <div className="w-[180px] h-fit flex flex-col items-center overflow-hidden gap-[4px] px-[8px]">
                        <p className="manga-title w-full text-base text-lightGray font-semibold text-center whitespace-nowrap text-ellipsis overflow-hidden cursor-pointer">
                            {item.title[0].title}
                        </p>
                        <p className="text-sm text-white opacity-75 font-medium">
                            Chapter 80
                        </p>
                    </div>
                    <div className="manga-info-overlay">
                        <MangaInfoOverlay
                            author={item.author}
                            views={item.views ?? 0}
                            title={item.title[0].title}
                            description={item.description}
                            coverImage={item.cover}
                            status={item.status}
                        />
                    </div>
                </div>
            );
        })
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
