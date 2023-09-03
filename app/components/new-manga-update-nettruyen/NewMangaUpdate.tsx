"use client";
import React, {useEffect, useState} from "react";
import "../../globals.css";
import "./NewMangaUpdate.css";
import {CaretDoubleLeft, CaretDoubleRight, CaretLeft, CaretRight} from "@phosphor-icons/react";
import Image from "next/image";
import MangaInfoOverlay from "../manga-info-overlay/MangaInfoOverlay";
import {Domain} from "../../domain";
import Link from "next/link";

const NewMangaUpdate: React.FC = () => {
    // Client Component nên không thể sử dụng async/await được
    // const request = await fetch(`${Domain}NetTruyen?page=1`);
    // const response = await request.json();
    // const data = response.mangas;

    const [currentPage, setCurrentPage] = useState(1); // Trang hiện tại
    const [data, setData] = useState([]); // Dữ liệu truyện
    const [totalManga, setTotalManga] = useState(0); // Tổng số manga

    useEffect(() => {
        // Fetch dữ liệu truyện theo trang hiện tại
        fetch(`${Domain}NetTruyen?page=${currentPage}&size=24`)
            .then((response) => response.json())
            .then((responseData) => {
                const newData = responseData.mangas;
                setData(newData);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });

        // Fetch tổng số manga
        fetch(`${Domain}NetTruyen/Total`)
            .then((response) => response.json())
            .then((total) => {
                setTotalManga(total); // Lưu tổng số manga vào state
            })
            .catch((error) => {
                console.error("Error fetching total manga:", error);
            });
    }, [currentPage]);

    const itemsPerPage = 24; // Số manga trên mỗi trang
    const totalPages = Math.ceil(totalManga / itemsPerPage); // Tổng số trang

    const renderMangaDiv = () => {
        const mangaDiv: React.JSX.Element[] = [];
        data.forEach((item: any, index: number) => {
            if (!item.author) {
                item.author = "Đang cập nhật";
            }
            if (!item.description) {
                item.description = "Nội dung truyện đang được cập nhật.";
            }

            mangaDiv.push(
                <Link
                    className="manga w-fit h-fit flex flex-col gap-[18px] cursor-pointer"
                    key={index}
                    href={`/pages/details/NetTruyen?id=${item.id}`}
                >
                    <div className="w-[150px] h-[220px] relative overflow-hidden">
                        <Image
                            src={item.cover}
                            alt={item.title[0].title}
                            fill
                            className="object-cover rounded-[18px] outline outline-2 outline-white/20 outline-offset-[-2px]"
                            sizes="1200px"
                        />
                    </div>
                    <div className="w-[150px] h-fit flex flex-col items-center overflow-hidden gap-[2px] px-[4px]">
                        <p className="w-full text-[15px] text-lightGray font-semibold text-center whitespace-nowrap text-ellipsis overflow-hidden">
                            {item.title[0].title}
                        </p>
                        <p className="text-[13px] text-white opacity-75 font-medium">
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

    return (
        <div className="font-primary w-full h-fit flex flex-col gap-[30px]">
            <div className="flex flex-row justify-between items-center">
                <p className="text-xl text-lightGray font-semibold">
                    Truyện mới cập nhật
                </p>
                <p className="text-base text-white/75 font-semibold">
                    NetTruyen
                </p>
            </div>
            <div className="flex flex-wrap justify-center gap-[44px]">
                {renderMangaDiv()}
            </div>
            <div className="flex justify-center mt-[30px]">
                <div
                    className="w-fit h-[48px] flex flex-row items-center gap-[20px] px-[15px] rounded-full border-[1.5px] border-lightGray/20">
                    <button
                        className="w-fit h-fit flex flex-row items-center gap-[5px]"
                        onClick={handleFirstPage}
                        disabled={currentPage === 1}
                    >
                        <CaretDoubleLeft color="#f4f4f4" weight="bold" size={16}/>
                        <span className="text-sm text-white/75 font-semibold">
              Trang đầu
            </span>
                    </button>
                    <button
                        className="w-fit h-fit flex flex-row items-center gap-[5px]"
                        onClick={handlePrevPage}
                        disabled={currentPage === 1}
                    >
                        <CaretLeft color="#f4f4f4" weight="bold" size={16}/>
                    </button>
                    <span className="text-sm text-lightGray font-semibold mx-2.5">
            {currentPage} trên {totalPages}
          </span>
                    <button
                        className="w-fit h-fit flex flex-row items-center gap-[5px]"
                        onClick={handleNextPage}
                        disabled={currentPage === totalPages}
                    >
                        <CaretRight color="#f4f4f4" weight="bold" size={16}/>
                    </button>
                    <button
                        className="w-fit h-fit flex flex-row items-center gap-[5px]"
                        onClick={handleLastPage}
                        disabled={currentPage === totalPages}
                    >
            <span className="text-sm text-white/75 font-semibold">
              Trang cuối
            </span>
                        <CaretDoubleRight color="#f4f4f4" weight="bold" size={16}/>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default NewMangaUpdate;