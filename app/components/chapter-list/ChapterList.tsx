"use client";
import {MagnifyingGlass} from "@phosphor-icons/react";
import Link from "next/link";
import React, {useEffect, useState} from "react";
import {Domain} from "../../domain";
import "../../globals.css";
import {ChapterListProps, Chapters} from "../../types/App";
import {formatDate} from "../../utils/formatDate";
import "./ChapterList.css";
import {useSelector} from "react-redux";
import {RootState} from "../../globalRedux/store";

const ChapterList: React.FC<ChapterListProps> = ({host, params}) => {
    const follow = useSelector((state: RootState) => state.follow.value);
    const [chapters, setChapters] = useState<Chapters>([
        {id: 0, title: "", timeUpdate: "", views: 0},
    ]);

    const [isLatestFirst, setIsLatestFirst] = useState(true); // State để theo dõi thứ tự hiển thị chapter

    useEffect(() => {
        const fetchData = async () => {
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
        };

        fetchData().then(() => {
        });
    }, [host, params, isLatestFirst]);

    const toggleOrder = () => {
        // Hàm để đảo ngược thứ tự hiển thị
        setIsLatestFirst(!isLatestFirst);
    };

    const handleChapterClick = (chapter: Chapters[number]) => {
        const storedMangas = localStorage.getItem("mangas");
        const mangas = storedMangas ? JSON.parse(storedMangas) : [];

        const storedManga = localStorage.getItem("manga");
        const manga = storedManga ? JSON.parse(storedManga) : {};

        manga.lastChapterTitle = chapter.title;

        const existingMangaIndex = mangas.findIndex(
            (item: any) => item.id === manga.id
        );

        if (existingMangaIndex !== -1) {
            mangas[existingMangaIndex] = manga;
        } else {
            mangas.push(manga);
        }

        localStorage.setItem("mangas", JSON.stringify(mangas));
        localStorage.setItem("manga", JSON.stringify(manga));
    };

    return (
        <div className="w-[500px] h-fit flex flex-col gap-[30px]">
            <div className="flex flex-row justify-between items-center">
                <div
                    className="w-[280px] h-[46px] flex flex-row items-center gap-2.5 px-[15px] rounded-full border-[1.5px] border-white/20">
                    <MagnifyingGlass color="#f4f4f4" weight="bold" size={18}/>
                    <input
                        type="text"
                        placeholder="Tìm chương"
                        className="w-full h-full bg-transparent border-none outline-none placeholder:text-[13px] placeholder:text-white/75 placeholder:font-medium text-[13px] text-white/75 font-medium"
                    />
                </div>
                <p
                    className={`scale-in text-[13px] ${
                        isLatestFirst
                            ? "text-lightGray font-semibold"
                            : "text-white/75 font-medium"
                    }`}
                    onClick={toggleOrder}
                    style={{cursor: "pointer"}}
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
                    style={{cursor: "pointer"}}
                >
                    Đọc từ đầu
                </p>
            </div>
            {chapters.length === 0 ? (
                <div className={'text-white font-medium flex items-center'}>
                    <p className={'m-auto'}>Tác giả đang cập nhật, bạn đọc hãy quay lại sau!</p>
                </div>
            ) : (
                <div
                    className="w-full max-h-[537px] flex flex-col flex-grow gap-[20px] p-[20px] rounded-[22px] border-[1.5px] border-white/20 overflow-y-scroll no-scrollbar">
                    {chapters.map((chapter: any) => (
                        <div
                            key={chapter.id}
                            className="flex flex-row justify-between items-center"
                        >
                            <Link
                                href={`/pages/reader/${host}?idComic=${
                                    params.searchParams.id
                                }&id=${chapter.id === 0 ? chapter.url : chapter.id}`}
                                passHref
                                legacyBehavior
                            >
                                <a
                                    className={`w-[300px] text-[13px] ${
                                        follow && chapter["chapNumber"] <= follow["lastChapterNumber"]
                                            ? "text-white/75 font-medium"
                                            : "text-lightGray font-semibold"
                                    } hover:text-[#d9f21c] whitespace-nowrap text-ellipsis overflow-hidden flex items-center`}
                                    onClick={() => handleChapterClick(chapter)}
                                >
                                    {chapter.title}
                                    {/* {follow &&
                  chapter["chapNumber"] == follow["lastChapterNumber"] && (
                    <Star
                      color="rgba(255, 255, 255, 0.75"
                      weight="fill"
                      size={14}
                      style={{ marginLeft: 10 }}
                    />
                  )} */}
                                </a>
                            </Link>
                            <p className="text-[13px] text-white/75 font-medium">
                                {formatDate(chapter.timeUpdate)}
                            </p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ChapterList;
