"use client";
import {CaretLeft, CaretRight, MagnifyingGlass, SealWarning,} from "@phosphor-icons/react";
import moment from "moment";
import Image from "next/image";
import React, {useEffect, useState} from "react";
import {Domain, DomainGetImage} from "../../domain";
import "../../globals.css";
import Loading from "../../loading";
import {MangaReadProps} from "../../types/App";
import {getLinkTelegramImage} from "../../utils/image";
import ReportManga from "../report-manga/ReportManga";
import "./MangaRead.css";

const MangaRead: React.FC<MangaReadProps> = ({host, params}) => {
    const [data, setData] = useState<string[]>([]);
    const [showOverlayType, setShowOverlayType] = useState<"reportManga" | null>(
        null
    );

    const handleOverlayToggle = (type: "reportManga") => () => {
        setShowOverlayType(type);
    };

    const showReportMangaOverlay = showOverlayType === "reportManga";

    const handleOverlayClick = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget) {
            setShowOverlayType(null);
        }
    };

    const handleButtonClick = () => (): void => {
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(
                    `${Domain}AnimeMoi/ChapterDetail?idChapter=${params.searchParams.id}&host=${host}`
                );

                const responseData = await response.json();

                const processedDataPromises = responseData.map((url: string) => {
                    if (url.includes("ntcdntemp")) {
                        return `${DomainGetImage}AnimeMoi/GetImage?host=${params.params.host}&url=${url}`;
                    }
                    if (!url.includes("http")) {
                        return getLinkTelegramImage(url);
                    }
                    return Promise.resolve(url);
                });
                const processedData = await Promise.all(processedDataPromises);

                setData(processedData);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData().then(() => {
        });
    }, [host, params]);

    const storedMangas = localStorage.getItem("mangas");
    const mangas = storedMangas ? JSON.parse(storedMangas) : [];

    const existingMangaIndex = mangas.findIndex(
        (item: any) => item.info.id == params.searchParams.idComic
    );

    const manga = mangas[existingMangaIndex]

    const formattedCurrentTimeUpdate = manga?.currentTimeUpdate
        ? moment(manga.currentTimeUpdate).format("HH:mm DD/MM/YYYY")
        : null;

    return (
        <>
            {manga && (
                <div className="w-full h-fit flex flex-col gap-[80px]">
                    <div className="w-full h-fit flex flex-col gap-[60px]">
                        <div className="flex flex-col items-center gap-[16px]">
                            <div className="flex flex-col items-center gap-[4px]">
                                <p className="text-[19px] text-lightGray font-semibold">
                                    {manga.info.title}
                                </p>
                                <p className="text-[19px] text-lightGray font-semibold">
                                    {manga.currentChapterTitle}
                                </p>
                            </div>
                            <p className="text-[13px] text-white/75 font-medium italic">
                                [Cập nhật lúc: {formattedCurrentTimeUpdate}]
                            </p>
                        </div>
                        <div className="flex flex-row justify-center items-center gap-[30px]">
                            <button className="w-fit h-fit flex flex-row items-center gap-[5px]">
                                <CaretLeft color="#fff" weight="bold" size={15}/>
                                <p className="text-[13px] text-white/75 font-semibold">
                                    Chương trước
                                </p>
                            </button>
                            <div className="flex flex-row items-center gap-[15px]">
                                <div
                                    className="w-[280px] h-[46px] flex flex-row items-center gap-2.5 px-[15px] rounded-full border-[1.5px] border-white/20">
                                    <MagnifyingGlass color="#f4f4f4" weight="bold" size={18}/>
                                    <input
                                        type="text"
                                        placeholder="Tìm chương"
                                        className="w-full h-full bg-transparent border-none outline-none placeholder:text-[13px] placeholder:text-white/75 placeholder:font-medium text-[13px] text-white/75 font-medium"
                                    />
                                </div>
                                <div
                                    className="w-fit h-[46px] flex flex-row items-center gap-[8px] px-[15px] rounded-full bg-warning cursor-pointer"
                                    onClick={handleOverlayToggle("reportManga")}
                                >
                                    <SealWarning color="#000" weight="bold" size={20}/>
                                    <p className="text-sm text-black font-medium">Báo lỗi</p>
                                </div>
                            </div>
                            <button className="w-fit h-fit flex flex-row items-center gap-[5px]">
                                <p className="text-[13px] text-white/75 font-semibold">
                                    Chương sau
                                </p>
                                <CaretRight color="#fff" weight="bold" size={15}/>
                            </button>
                        </div>
                    </div>
                    {data.length == 0 ? (
                        <Loading/>
                    ) : (
                        <div className="w-full h-fit flex flex-col items-center">
                            {data.map((chapter: any) => (
                                <Image
                                    key={chapter}
                                    src={chapter}
                                    alt={""}
                                    width={"700"}
                                    height={"1000"}
                                />
                            ))}
                        </div>
                    )}

                    {showReportMangaOverlay && (
                        <div
                            className="fixed inset-0 flex justify-center items-center bg-richBlack/75 z-[200]"
                            onClick={handleOverlayClick}
                        >
                            <ReportManga
                                onSend={handleButtonClick}
                                onClose={handleButtonClick}
                            />
                        </div>
                    )}
                </div>
            )}
        </>
    );
};

export default MangaRead;
