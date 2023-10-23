"use client";
import React, { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import "../../globals.css";
import "./NewMangaUpdate.css";
import {
  CaretDoubleLeft,
  CaretDoubleRight,
  CaretLeft,
  CaretRight,
} from "@phosphor-icons/react";
import { GetMangas, GetTotal } from "../../utils/manga";
import MangaInfoOverlay from "../manga-info-overlay/MangaInfoOverlay";
import Loading from "../../loading";
import { useDispatch, useSelector } from "react-redux";
import { setMangasData } from "../../globalRedux/Features/mangas/mangasSlice";
import { RootState } from "../../globalRedux/store";
import { SearchParams } from "../../types/App";
import { Search } from "../../utils/search";
import { setCurrentPage } from "../../globalRedux/Features/page/pageSlice";
import { mapGenreIdToName } from "../../utils/genre";

const NewMangaUpdate: React.FC = () => {
  const dispatch = useDispatch();
  const mangasData = useSelector((state: RootState) => state.mangas.data);
  const selectedSource = useSelector(
    (state: RootState) => state.source.selectedSource
  );
  const selectedGenre = useSelector(
    (state: RootState) => state.genres.selectedGenres
  );
  const currentPage = useSelector((state: RootState) => state.page.value);
  const [totalManga, setTotalManga] = useState(0); // Tổng số manga

  const itemsPerPage = 28; // Số manga trên mỗi trang
  const totalPages = Math.ceil(totalManga / itemsPerPage); // Tổng số trang

  const fetchData = useCallback(async () => {
    try {
      dispatch(setMangasData([]));
      if (!selectedGenre) {
        const newData = await GetMangas(selectedSource, currentPage);
        dispatch(setMangasData(newData));

        const total = await GetTotal(selectedSource);
        setTotalManga(total);
      } else {
        const searchParams: SearchParams = {
          query: "",
          page: currentPage,
          genres: selectedGenre,
          exclude: [],
          status: 0,
          host: selectedSource,
        };
        const data = await Search(searchParams);
        dispatch(setMangasData(data));
      }
    } catch (error) {}
  }, [dispatch, selectedGenre, selectedSource, currentPage]);

  useEffect(() => {
    fetchData().then(() => {});
  }, [fetchData, selectedSource, currentPage]);

  const renderMangaDiv = () => {
    const mangaDiv: React.JSX.Element[] = [];
    mangasData.forEach((item: any) => {
      // Sử dụng Optional Chain Expression để lấy số chapter từ lastChapterTitle
      const chapterNumber =
        item.lastChapterTitle?.match(/(\d+(\.\d+)?)/)?.[0] || "N/A";

      mangaDiv.push(
        <Link
          className="manga w-fit h-fit flex flex-col gap-[18px] cursor-pointer"
          key={item.id}
          href={`/pages/details/${selectedSource}?id=${
            item.id === 0 ? item.url : item.id
          }`}
          rel={`preload`}
        >
          <div className="w-[124px] h-[184px] relative overflow-hidden">
            <Image
              src={item.cover}
              alt={item.titles[0]}
              fill
              className="object-cover rounded-[18px] outline outline-1.5 outline-white/20 outline-offset-[-1.5px]"
              sizes="400px"
              loading={`lazy`}
              quality={100}
            />
          </div>
          <div className="w-[124px] h-fit flex flex-col items-center overflow-hidden gap-[5px] px-[3px]">
            <p className="w-full text-sm text-lightGray font-semibold text-center whitespace-nowrap text-ellipsis overflow-hidden">
              {item.titles[0]}
            </p>
            <p className="text-xs text-white/75 font-medium">
              Chapter {chapterNumber ?? "N/A"}
            </p>
          </div>
          <div className="manga-info-overlay">
            <MangaInfoOverlay
              author={item.author ?? "Đang cập nhật"}
              views={item.views ?? 0}
              title={item.titles[0]}
              description={
                item.description
                  ? item.description
                  : "Nội dung truyện đang được cập nhật."
              }
              cover={item.cover}
              status={item.status}
            />
          </div>
        </Link>
      );
    });
    return mangaDiv;
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      dispatch(setCurrentPage(currentPage - 1));
    }
  };

  const handleNextPage = () => {
    dispatch(setCurrentPage(currentPage + 1));
  };

  const handleFirstPage = () => {
    dispatch(setCurrentPage(1));
  };

  const handleLastPage = () => {
    if (totalPages) {
      dispatch(setCurrentPage(totalPages));
    }
  };

  return (
    <div className="w-full h-fit flex flex-col gap-[40px]">
      {selectedGenre ? (
        <p className="text-xl text-lightGray font-semibold">
          Truyện thể loại {mapGenreIdToName(selectedGenre[0])}
        </p>
      ) : (
        <p className="text-xl text-lightGray font-semibold">
          Truyện mới cập nhật
        </p>
      )}
      {mangasData.length === 0 ? (
        <Loading />
      ) : (
        <div className="flex flex-wrap justify-center gap-[42px]">
          {renderMangaDiv()}
        </div>
      )}
      <div className="flex justify-center mt-[30px]">
        <div className="w-fit h-[48px] flex flex-row items-center gap-[15px] px-[15px] rounded-full border-[1.5px] border-white/20">
          {!selectedGenre && (
            <button
              className="w-fit h-fit flex flex-row items-center gap-[5px]"
              onClick={handleFirstPage}
              disabled={currentPage === 1}
            >
              <CaretDoubleLeft color="#f4f4f4" weight="bold" size={15} />
              <p className="text-[13px] text-white/75 font-semibold">
                Trang đầu
              </p>
            </button>
          )}
          <button
            className="w-fit h-fit flex flex-row items-center gap-[5px]"
            onClick={handlePrevPage}
            disabled={currentPage === 1}
          >
            <CaretLeft color="#f4f4f4" weight="bold" size={15} />
          </button>
          {totalPages && !selectedGenre ? (
            <p className="text-[13px] text-lightGray font-semibold mx-2.5">
              {currentPage} trên {totalPages}
            </p>
          ) : (
            <p className="text-[13px] text-lightGray font-semibold mx-2.5">
              {currentPage}
            </p>
          )}
          <button
            className="w-fit h-fit flex flex-row items-center gap-[5px]"
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
          >
            <CaretRight color="#f4f4f4" weight="bold" size={15} />
          </button>
          {!selectedGenre && (
            <button
              className="w-fit h-fit flex flex-row items-center gap-[5px]"
              onClick={handleLastPage}
              disabled={currentPage === totalPages}
            >
              <p className="text-[13px] text-white/75 font-semibold">
                Trang cuối
              </p>
              <CaretDoubleRight color="#f4f4f4" weight="bold" size={15} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default NewMangaUpdate;
