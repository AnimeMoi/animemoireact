"use client";
import {
	CaretLeft,
	CaretRight,
	MagnifyingGlass,
	SealWarning,
} from "@phosphor-icons/react";
import Image from "next/image";
import React, { useCallback, useEffect, useState } from "react";
import { Domain } from "../../domain";
import "../../globals.css";
import Loading from "../../loading";
import { MangaReadProps } from "../../types/App";
import { getLinkTelegramImage } from "../../utils/image";
import ReportManga from "../report-manga/ReportManga";
import "./MangaRead.css";
import moment from "moment";
import Link from "next/link";
import { findIndexByChapNumber, getMangas } from "../../utils/localStored";
import { formatDate } from "../../utils/formatDate";

const MangaRead: React.FC<MangaReadProps> = ({ host, params }) => {
	const [data, setData] = useState<string[]>([]);
	const [comic, setComic] = useState<any>();
	const [chapters, setChapters] = useState<any[]>([]);
	const [chaptersFilter, setChaptersFilter] = useState<any[]>([]);
	const [searchInput, setSearchInput] = useState("");
	const [isSearchResultVisible, setIsSearchResultVisible] = useState(false);
	const [formattedCurrentTimeUpdate, setFormattedCurrentTimeUpdate] = useState<
		string | null
	>(null);
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
		if (!comic) return;

		const mangas = getMangas();

		const existingMangaIndex = mangas.findIndex(
			(item: any) => item.info.id == params.searchParams.idComic
		);

		if (comic.current.id != params.searchParams.id) {
			const existingChapterIndex = comic.chapters.findIndex(
				(item: any) => item.id == params.searchParams.id
			);
			comic.current = comic.chapters[existingChapterIndex];
			mangas[existingMangaIndex].current = comic.current;
		}

		let { chapNumber: currentChapNumber } = comic.current;
		const idxCurrent = findIndexByChapNumber(comic.chapters, currentChapNumber);
		const idxPrev = findIndexByChapNumber(
			comic.chapters,
			currentChapNumber - 1
		);
		const idxNext = findIndexByChapNumber(
			comic.chapters,
			currentChapNumber + 1
		);

		comic.prev = comic.chapters[idxPrev];
		comic.next = comic.chapters[idxNext];
		comic.current = comic.chapters[idxCurrent];

		mangas[existingMangaIndex].prev = comic.prev;
		mangas[existingMangaIndex].next = comic.next;
		mangas[existingMangaIndex].current = comic.current;
		localStorage.setItem("mangas", JSON.stringify(mangas));
		setComic(comic);
	}, [comic, params.searchParams.id, params.searchParams.idComic]);

	const handleButtonClick = () => (): void => {};

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetch(
					`${Domain}AnimeMoi/ChapterDetail?idChapter=${params.searchParams.id}&host=${host}`
				);

				const responseData = await response.json();

				const processedDataPromises = responseData.map((url: string) => {
					if (url.includes("ntcdntemp")) {
						return `${Domain}AnimeMoi/GetImage?host=${params.params.host}&url=${url}`;
					}
					if (url.startsWith("//")) {
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

		fetchData().then(() => {});
	}, [host, params]);

	useEffect(() => {
		const mangas = getMangas();

		if (Array.isArray(mangas)) {
			const existingMangaIndex = mangas.findIndex(
				(item: any) => item.info.id == params.searchParams.idComic
			);

			if (existingMangaIndex !== -1) {
				setComic(mangas[existingMangaIndex]);
				setChapters(mangas[existingMangaIndex].chapters);
				updateChapterIndex();
			}
		}
	}, [params.searchParams.id, params.searchParams.idComic, updateChapterIndex]);

	useEffect(() => {
		setFormattedCurrentTimeUpdate(
			comic ? moment(comic.current.timeUpdate).format("HH:mm DD/MM/YYYY") : null
		);
	}, [comic]);

	const handlePrevClick = () => {
		setData([]);
		comic.current = comic.prev;
		updateChapterIndex();
	};

	const handleNextClick = () => {
		setData([]);
		comic.current = comic.next;
		updateChapterIndex();
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

	const handleChapterClick = (target: any) => {
		setData([]);
		setSearchInput("");
		comic.current = target;
		updateChapterIndex();
	};

	return (
		<>
			{comic && (
				<div className="w-full h-fit flex flex-col gap-[80px]">
					<div className="w-full h-fit flex flex-col gap-[60px]">
						<div className="flex flex-col items-center gap-[16px]">
							<Link
								href={`/pages/details/${comic.info.host}?id=${comic.info.id}`}
							>
								<div className="flex flex-col items-center gap-[4px]">
									<p className="text-[19px] text-lightGray font-semibold">
										{comic.info.title}
									</p>
									<p className="text-[19px] text-lightGray font-semibold">
										{comic.current.title}
									</p>
								</div>
							</Link>
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
									<div className="w-fit h-fit flex flex-row items-center gap-[5px]">
										<CaretLeft color="#fff" weight="bold" size={15} />
										<p className="text-[13px] text-white/75 font-semibold">
											Chương trước
										</p>
									</div>
								</Link>
							)}
							<div className="flex flex-row items-center gap-[15px]">
								<div className="w-[280px] h-[46px] flex flex-row items-center gap-2.5 px-[15px] rounded-full border-[1.5px] border-white/20">
									<MagnifyingGlass color="#f4f4f4" weight="bold" size={18} />
									<input
										type="text"
										placeholder="Tìm chương"
										className="w-full h-full bg-transparent border-none outline-none placeholder:text-[13px] placeholder:text-white/75 placeholder:font-medium text-[13px] text-white/75 font-medium"
										onChange={(e) => setSearchInput(e.target.value)}
										value={searchInput}
									/>
								</div>
								<div
									className="w-fit h-[46px] flex flex-row items-center gap-[8px] px-[15px] rounded-full bg-warning cursor-pointer"
									onClick={handleOverlayToggle("reportManga")}
								>
									<SealWarning color="#000" weight="bold" size={20} />
									<p className="text-sm text-black font-medium">Báo lỗi</p>
								</div>
							</div>
							{comic.next && (
								<Link
									href={`/pages/reader/${host}?idComic=${comic.info.id}&id=${comic.next.id}`}
									onClick={handleNextClick}
								>
									<div className="w-fit h-fit flex flex-row items-center gap-[5px]">
										<p className="text-[13px] text-white/75 font-semibold">
											Chương sau
										</p>
										<CaretRight color="#fff" weight="bold" size={15} />
									</div>
								</Link>
							)}
						</div>
					</div>
					{isSearchResultVisible && (
						<div
							className={`w-full max-h-[537px] flex flex-col flex-grow gap-[20px] p-[20px] rounded-[22px] border-[1.5px] border-white text-white`}
						>
							{chaptersFilter.map((chapter: any) => (
								<div
									key={chapter.id}
									className="flex flex-row justify-between items-center"
								>
									<Link
										href={`/pages/reader/${host}?idComic=${comic.info.id}&id=${chapter.id}`}
										className={`w-[300px] text-[13px] hover:text-[#d9f21c] whitespace-nowrap text-ellipsis overflow-hidden flex items-center`}
										onClick={() => handleChapterClick(chapter)}
									>
										{chapter.title}
									</Link>
									<p className="text-[13px] text-white/75 font-medium">
										{formatDate(chapter.timeUpdate)}
									</p>
								</div>
							))}
						</div>
					)}
					{data.length == 0 ? (
						<Loading />
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
