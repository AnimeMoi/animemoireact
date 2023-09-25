"use client";
import React, { useState, useEffect } from "react";
import "../../globals.css";
import "./NewMangaUpdate.css";
import {
  CaretLeft,
  CaretRight,
  CaretDoubleLeft,
  CaretDoubleRight,
} from "@phosphor-icons/react";
import Image from "next/image";
import MangaInfoOverlay from "../manga-info-overlay/MangaInfoOverlay";
import { Domain } from "../../domain";
import Link from "next/link";
import Loading from "../../loading";
import { useSourceContext } from "../../sourceContext";

const NewMangaUpdate: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1); // Trang hiện tại
  const [data, setData] = useState([]); // Dữ liệu truyện
  const [totalManga, setTotalManga] = useState(0); // Tổng số manga
  const [isLoading, setIsLoading] = useState(true); // Trạng thái loading

  const { selectedSource } = useSourceContext(); // Sử dụng React Context

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch dữ liệu truyện theo trang hiện tại
        const response = await fetch(
          `${Domain}${selectedSource}?page=${currentPage}&size=24`
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const responseData = await response.json();
        const newData = responseData.mangas;
        setData(newData);

        // Fetch tổng số manga (Hiện tại hỗ trợ NetTruyen và Yurineko)
        const totalResponse = await fetch(`${Domain}${selectedSource}/Total`);

        if (!totalResponse.ok) {
          throw new Error("Network response was not ok");
        }

        const total = await totalResponse.json();
        setTotalManga(total);

        // Tải xong dữ liệu, tắt trạng thái loading
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsLoading(false); // Đảm bảo tắt loading nếu có lỗi
      }
    };

    fetchData();
  }, [currentPage, selectedSource]);

  const itemsPerPage = 24; // Số manga trên mỗi trang
  const totalPages = Math.ceil(totalManga / itemsPerPage); // Tổng số trang

  const renderMangaDiv = () => {
    const mangaDiv: React.JSX.Element[] = [];
    data.forEach((item: any, index: number) => {
      // Sử dụng Regular Expression để lấy số chapter từ lastChapterTitle
      const chapterNumber =
        (item.lastChapterTitle &&
          item.lastChapterTitle.match(/(\d+(\.\d+)?)/)?.[0]) ||
        "N/A";

      mangaDiv.push(
        <Link
          className="manga w-fit h-fit flex flex-col gap-[18px] cursor-pointer"
          key={index}
          href={`/pages/details/NetTruyen?id=${item.id}`}
        >
          <div className="w-[150px] h-[220px] relative overflow-hidden">
            <Image
              src={item.cover}
              alt={item.titles[0]}
              fill
              className="object-cover rounded-[18px] outline outline-2 outline-white/20 outline-offset-[-2px]"
              sizes="1200px"
            />
          </div>
          <div className="w-[150px] h-fit flex flex-col items-center overflow-hidden gap-[2px] px-[4px]">
            <p className="w-full text-[15px] text-lightGray font-semibold text-center whitespace-nowrap text-ellipsis overflow-hidden">
              {item.titles[0]}
            </p>
            <p className="text-[13px] text-white/75 font-medium">
              {selectedSource === "NetTruyen"
                ? `Chapter ${chapterNumber}`
                : "Chapter N/A"}
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
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const handleFirstPage = () => {
    setCurrentPage(1);
  };

  const handleLastPage = () => {
    setCurrentPage(totalPages);
  };

  const shouldShowPagination =
    selectedSource === "NetTruyen" || selectedSource === "Yurineko";

  return (
    <div className="w-full h-fit flex flex-col gap-[30px]">
      <p className="text-xl text-lightGray font-semibold">
        Truyện mới cập nhật
      </p>
      {isLoading ? (
        // Nếu isLoading là true, hiển thị component Loading
        <Loading />
      ) : (
        <div className="flex flex-wrap justify-center gap-[44px]">
          {renderMangaDiv()}
        </div>
      )}
      {shouldShowPagination && (
        <div className="flex justify-center mt-[30px]">
          <div className="w-fit h-[48px] flex flex-row items-center gap-[20px] px-[15px] rounded-full border-[1.5px] border-white/20">
            <button
              className="w-fit h-fit flex flex-row items-center gap-[5px]"
              onClick={handleFirstPage}
              disabled={currentPage === 1}
            >
              <CaretDoubleLeft color="#f4f4f4" weight="bold" size={16} />
              <span className="text-sm text-white/75 font-semibold">
                Trang đầu
              </span>
            </button>
            <button
              className="w-fit h-fit flex flex-row items-center gap-[5px]"
              onClick={handlePrevPage}
              disabled={currentPage === 1}
            >
              <CaretLeft color="#f4f4f4" weight="bold" size={16} />
            </button>
            <span className="text-sm text-lightGray font-semibold mx-2.5">
              {currentPage} trên {totalPages}
            </span>
            <button
              className="w-fit h-fit flex flex-row items-center gap-[5px]"
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
            >
              <CaretRight color="#f4f4f4" weight="bold" size={16} />
            </button>
            <button
              className="w-fit h-fit flex flex-row items-center gap-[5px]"
              onClick={handleLastPage}
              disabled={currentPage === totalPages}
            >
              <span className="text-sm text-white/75 font-semibold">
                Trang cuối
              </span>
              <CaretDoubleRight color="#f4f4f4" weight="bold" size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default NewMangaUpdate;
