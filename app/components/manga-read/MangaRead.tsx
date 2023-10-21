"use client";
import {CaretLeft, CaretRight, MagnifyingGlass, SealWarning} from "@phosphor-icons/react";
import Image from "next/image";
import React, {useCallback, useEffect, useState} from "react";
import {Domain, DomainGetImage} from "../../domain";
import "../../globals.css";
import Loading from "../../loading";
import {MangaReadProps} from "../../types/App";
import {getLinkTelegramImage} from "../../utils/image";
import ReportManga from "../report-manga/ReportManga";
import "./MangaRead.css";
import moment from "moment";
import Link from "next/link";
import {getMangas} from "../../utils/localStored";

const MangaRead: React.FC<MangaReadProps> = ({host, params}) => {
    const [data, setData] = useState<string[]>([]);
    const [comic, setComic] = useState<any>();
    const [formattedCurrentTimeUpdate, setFormattedCurrentTimeUpdate] = useState<string | null>(null);
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

    const updateChapterIndex = useCallback(() => {
        if (!comic) {
            return;
        }

        const storedMangas = localStorage.getItem("mangas");
        const mangas = storedMangas ? JSON.parse(storedMangas) : [];

        const existingMangaIndex = mangas.findIndex(
            (item: any) => item.info.id == params.searchParams.idComic
        );

        const idxCurrent = comic.chapters.findIndex(
            (item: any) => item.chapNumber == comic.current.chapNumber
        );

        const idxPrev = comic.chapters.findIndex(
            (item: any) => item.chapNumber == comic.current.chapNumber - 1
        );

        const idxNext = comic.chapters.findIndex(
            (item: any) => item.chapNumber == comic.current.chapNumber + 1
        );

        comic.prev = comic.chapters[idxPrev];
        comic.next = comic.chapters[idxNext];
        comic.current = comic.chapters[idxCurrent];

        mangas[existingMangaIndex].prev = comic.prev;
        mangas[existingMangaIndex].next = comic.next;
        mangas[existingMangaIndex].current = comic.current;
        localStorage.setItem("mangas", JSON.stringify(mangas));
        setComic(comic)
    }, [comic, params.searchParams.idComic])

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
                    if (url.startsWith('//')) {
                        return `https:${url}`;
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

    useEffect(() => {
        const mangas = getMangas();

        if (Array.isArray(mangas)) {
            const existingMangaIndex = mangas.findIndex(
                (item: any) => item.info.id == params.searchParams.idComic
            );

            if (existingMangaIndex !== -1) {
                setComic(mangas[existingMangaIndex]);
                updateChapterIndex();
            }
        }
    }, [params.searchParams.id, params.searchParams.idComic, updateChapterIndex]);

    useEffect(() => {
        setFormattedCurrentTimeUpdate(comic
            ? moment(comic.current.timeUpdate).format("HH:mm DD/MM/YYYY")
            : null)
    }, [comic]);

    const handlePrevClick = () => {
        setData([])
        comic.current = comic.prev;
        updateChapterIndex()
    }

    const handleNextClick = () => {
        setData([])
        comic.current = comic.next;
        updateChapterIndex()
    }


    return (
        <>
            {comic && (
                <div className="w-full h-fit flex flex-col gap-[80px]">
                    <div className="w-full h-fit flex flex-col gap-[60px]">
                        <div className="flex flex-col items-center gap-[16px]">
                            <div className="flex flex-col items-center gap-[4px]">
                                <p className="text-[19px] text-lightGray font-semibold">
                                    {comic.info.title}
                                </p>
                                <p className="text-[19px] text-lightGray font-semibold">
                                    {comic.current.title}
                                </p>
                            </div>
                            <p className="text-[13px] text-white/75 font-medium italic">
                                [Cập nhật lúc: {formattedCurrentTimeUpdate}]
                            </p>
                        </div>
                        <div className="flex flex-row justify-center items-center gap-[30px]">
                            {comic.prev && (
                                <Link
                                    href={`/pages/reader/${host}?idComic=${comic.info.id}&id=${comic.prev.id}`}
                                    onClick={handlePrevClick}
                                >
                                    <div
                                        className="w-fit h-fit flex flex-row items-center gap-[5px]"
                                    >
                                        <CaretLeft color="#fff" weight="bold" size={15}/>
                                        <p className="text-[13px] text-white/75 font-semibold">
                                            Chương trước
                                        </p>
                                    </div>
                                </Link>
                            )}
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
                            {comic.next && (
                                <Link
                                    href={`/pages/reader/${host}?idComic=${comic.info.id}&id=${comic.next.id}`}
                                    onClick={handleNextClick}
                                >
                                    <div
                                        className="w-fit h-fit flex flex-row items-center gap-[5px]"
                                    >
                                        <p className="text-[13px] text-white/75 font-semibold">
                                            Chương sau
                                        </p>
                                        <CaretRight color="#fff" weight="bold" size={15}/>
                                    </div>
                                </Link>
                            )}
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
