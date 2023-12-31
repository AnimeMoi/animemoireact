"use client";
import Image from "next/image";
import React, { Suspense } from "react";
import MangaHistory from "./components/manga-history/MangaHistory";
import NavBar from "./components/nav-bar/NavBar";
import NewMangaUpdate from "./components/new-manga-update/NewMangaUpdate";
import SourceBar from "./components/source-bar/SourceBar";
import Loading from "./loading";
import Thumbnail from "./public/assets/images/thumbnail.png";

export default function Home() {
  return (
    <div className="w-screen min-h-screen flex justify-center items-center bg-richBlack">
      <div className="hidden w-[1200px] h-full tablet:flex flex-col justify-start items-center gap-[50px] px-[40px]">
        <div className="w-full h-fit flex sticky top-0 z-[100]">
          <NavBar isHomePage={true} isGenres={true} />
        </div>
        <div className="w-full min-h-[calc(100vh-90px-50px)] flex flex-col gap-[50px]">
          <SourceBar />
          <Suspense fallback={<Loading />}>
            <NewMangaUpdate />
          </Suspense>
          <MangaHistory />
          <div className="w-full h-[50px]"></div>
          <div className="w-full h-fit flex flex-row justify-between items-center pt-[25px] py-[50px] border-t-[1px] border-white/[.15]">
            <div className="flex flex-col gap-[6px]">
              <p className="text-lg text-lightGray font-semibold uppercase tracking-wider">
                AnimeMoi
              </p>
              <p className="text-sm text-white/75 font-medium">
                1 sản phẩm của tdquang266 và hoang3402
              </p>
            </div>
            <p className="text-sm text-white/75 font-medium">
              © 2023 AnimeMoi. Tất cả quyền được bảo lưu.
            </p>
          </div>
        </div>
      </div>
      <div className="tablet:hidden w-full h-full flex flex-col justify-center items-center gap-[50px]">
        <div className="w-[400px] h-[200px] relative overflow-hidden">
          <Image
            src={Thumbnail}
            alt=""
            fill
            sizes="(max-width: 390px) 100vw, (max-width: 1080px) 50vw"
            className="object-contain"
          />
        </div>
        <div className="w-[350px] flex flex-col gap-[8px] text-center">
          <p className="text-[22px] text-lightGray font-semibold">
            AnimeMoi mobile is coming
          </p>
          <p className="text-sm text-white/75 font-medium">
            In the meantime, please use the desktop site for the best experience
          </p>
        </div>
      </div>
    </div>
  );
}
