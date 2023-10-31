"use client";
import { MagnifyingGlass, Star } from "@phosphor-icons/react";
import Link from "next/link";
import React, { useCallback, useEffect, useState } from "react";
import { Domain } from "../../domain";
import "../../globals.css";
import { ChapterListProps, Chapters } from "../../types/App";
import { formatDate } from "../../utils/formatDate";
import "./ChapterList.css";
import { useSelector } from "react-redux";
import { RootState } from "../../globalRedux/store";
import { getMangas } from "../../utils/localStored";

const ChapterList: React.FC<ChapterListProps> = ({ host, params }) => {
  const follow = useSelector((state: RootState) => state.follow.value);
  const [chapters, setChapters] = useState<any[]>([]);
  const [chaptersFilter, setChaptersFilter] = useState<any[]>([]);
  const [searchInput, setSearchInput] = useState("");
  const [isSearchResultVisible, setIsSearchResultVisible] = useState(false);
  const [isLatestFirst, setIsLatestFirst] = useState(true); // State để theo dõi thứ tự hiển thị chapter
  const [followLocal, setFollowLocal] = useState<any>({});

  const fetchData = useCallback(async () => {
    try {
      const response = await fetch(
        `${Domain}AnimeMoi/Chapter?idComic=${params.searchParams.id}&host=${host}`
      );
      const data: Chapters = await response.json();

      if (isLatestFirst) {
        setChapters(data);
      } else {
        setChapters(data.reverse());
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, [host, isLatestFirst, params.searchParams.id]);

  useEffect(() => {
    fetchData().then(() => {
      console.log("fetch data complete");
    });
    getMangas().forEach((item: any) => {
      if (item.info.id == params.searchParams.id) {
        setFollowLocal(item);
      }
    });
  }, [host, params, isLatestFirst, fetchData]);

  const toggleOrder = () => {
    setIsLatestFirst(!isLatestFirst);
  };

  const handleChapterClick = (
    chapter: Chapters[number],
    listChapter: Chapters
  ) => {
    const mangas = getMangas();

    const existingMangaIndex = mangas.findIndex(
      (item: any) => item.info.id == params.searchParams.id
    );

    mangas[existingMangaIndex].chapters = listChapter;
    mangas[existingMangaIndex].current = chapter;

    localStorage.setItem("mangas", JSON.stringify(mangas));
  };

  const showChapter = (chapters: any) => {
    return chapters.map((chapter: any) => (
      <div
        key={chapter.id}
        className="flex flex-row justify-between items-center"
      >
        <Link
          href={`/pages/reader/${host}?idComic=${params.searchParams.id}&id=${
            chapter.id === 0 ? chapter.url : chapter.id
          }`}
        >
          <div
            className={`w-[300px] text-[13px] ${
              follow && chapter["chapNumber"] <= follow["lastChapterNumber"]
                ? "text-white/75 font-medium"
                : "text-lightGray font-semibold"
            } hover:text-[#d9f21c] whitespace-nowrap text-ellipsis overflow-hidden flex items-center`}
            onClick={() => handleChapterClick(chapter, chapters)}
          >
            {chapter.title}
            {follow && chapter["chapNumber"] == follow["lastChapterNumber"] && (
              <Star
                color="rgba(39, 245, 47, 0.8)"
                weight="fill"
                size={14}
                style={{ marginLeft: 10 }}
              />
            )}
            {followLocal.current &&
              chapter["chapNumber"] == followLocal.current["chapNumber"] && (
                <Star
                  color="rgba(255, 255, 255, 0.75)"
                  weight="fill"
                  size={14}
                  style={{ marginLeft: 10 }}
                />
              )}
          </div>
        </Link>
        <p className="text-[13px] text-white/75 font-medium">
          {formatDate(chapter.timeUpdate)}
        </p>
      </div>
    ));
  };

  useEffect(() => {
    if (searchInput.length == 0) {
      setIsSearchResultVisible(false);
      return;
    }
    const result = chapters.filter((e) =>
      e.title.toLowerCase().includes(searchInput.toLowerCase())
    );
    result.sort((a: any, b: any) => (a.chapNumber > b.chapNumber ? 1 : -1));
    setChaptersFilter(result);
    setIsSearchResultVisible(true);
  }, [chapters, searchInput]);

  return (
    <div className="w-[480px] h-fit flex flex-col gap-[30px]">
      <div className="flex flex-row justify-between items-center">
        <div className="w-[280px] h-[46px] flex flex-row items-center gap-2.5 px-[15px] rounded-full border-[1.5px] border-white/20">
          <MagnifyingGlass color="#f4f4f4" weight="bold" size={18} />
          <input
            type="text"
            placeholder="Tìm chương"
            className="w-full h-full bg-transparent border-none outline-none placeholder:text-[13px] placeholder:text-white/75 placeholder:font-medium text-[13px] text-white/75 font-medium"
            onChange={(e) => setSearchInput(e.target.value)}
          />
        </div>
        <p
          className={`scale-in text-[13px] ${
            isLatestFirst
              ? "text-lightGray font-semibold"
              : "text-white/75 font-medium"
          }`}
          onClick={toggleOrder}
          style={{ cursor: "pointer" }}
        >
          Đọc mới nhất
        </p>
        <p
          className={`scale-in text-[13px] ${
            isLatestFirst
              ? "text-white/75 font-medium"
              : "text-lightGray font-semibold"
          }`}
          onClick={toggleOrder}
          style={{ cursor: "pointer" }}
        >
          Đọc từ đầu
        </p>
      </div>
      <div className="w-full h-fit flex flex-col gap-[15px] p-[15px] rounded-[22px] border-[1.5px] border-white/20">
        <p className="text-[13px] text-lightGray font-medium leading-[22px]">
          Ngôi sao màu xanh có nghĩa là chương đã được đồng bộ với máy chủ (Khi
          bạn đọc trên 80% chương truyện sẽ bắt đầu đồng bộ với máy chủ)
        </p>
        <p className="text-[13px] text-lightGray font-medium leading-[22px]">
          Ngôi sao màu trắng có nghĩa là chương đã đọc ở máy của bạn (Khi bạn
          bắt đầu đọc chương sẽ được lưu ngay)
        </p>
      </div>
      <div className="w-full max-h-[458px] flex flex-col flex-grow gap-5 p-5 rounded-[22px] border-[1.5px] border-white/20 overflow-y-scroll no-scrollbar">
        {chapters.length === 0 ? (
          <p className="w-full text-center text-sm text-lightGray font-semibold">
            Chapter đang được cập nhật, bạn đọc hãy quay lại sau!
          </p>
        ) : (
          <>
            {isSearchResultVisible
              ? showChapter(chaptersFilter)
              : showChapter(chapters)}
          </>
        )}
      </div>
    </div>
  );
};

export default ChapterList;
