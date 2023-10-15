"use client";
import {
	CaretLeft,
	CaretRight,
	MagnifyingGlass,
	SealWarning,
} from "@phosphor-icons/react";
import moment from "moment";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Domain, DomainGetImage } from "../../domain";
import "../../globals.css";
import Loading from "../../loading";
import { MangaReadProps } from "../../types/App";
import { getLinkTelegramImage } from "../../utils/image";
import ReportManga from "../report-manga/ReportManga";
import "./MangaRead.css";

const MangaRead: React.FC<MangaReadProps> = ({ host, params }) => {
	const [data, setData] = useState<string[]>([]);
	const [isLoading, setIsLoading] = useState(true); // Trạng thái loading

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

	const handleButtonClick = () => (): void => {};

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetch(
					`${Domain}AnimeMoi/ChapterDetail?idChapter=${params.searchParams.id}&host=${host}`
				);

				if (!response.ok) {
					throw new Error("Network response was not ok");
				}

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

				setIsLoading(false);
			} catch (error) {
				console.error("Error fetching data:", error);
				setIsLoading(false);
			}
		};

		fetchData();
	}, [host, params]);

	const storedManga =
		typeof window !== "undefined" && localStorage.getItem("manga");
	const manga = storedManga ? JSON.parse(storedManga) : null;

	const formattedLastTimeUpdate = manga?.lastTimeUpdate
		? moment(manga.lastTimeUpdate).format("HH:mm DD/MM/YYYY")
		: null;

	return (
		<>
			{manga && (
				<div className="w-full h-fit flex flex-col gap-[80px]">
					<div className="w-full h-fit flex flex-col gap-[60px]">
						<div className="flex flex-col items-center gap-[6px]">
							<p className="text-xl text-lightGray font-semibold">
								{manga.title}
							</p>
							<p className="text-xl text-lightGray font-semibold">
								{manga.lastChapterTitle}
							</p>
							<p className="text-sm text-white/75 font-medium italic">
								[Cập nhật lúc: {formattedLastTimeUpdate}]
							</p>
						</div>
						<div className="flex flex-row justify-center items-center gap-[30px]">
							<button className="w-fit h-fit flex flex-row items-center gap-[5px]">
								<CaretLeft color="#f4f4f4" weight="bold" size={16} />
								<p className="text-sm text-white/75 font-semibold">
									Chương trước
								</p>
							</button>
							<div className="flex flex-row items-center gap-[15px]">
								<div className="w-[280px] h-[48px] flex flex-row items-center gap-2.5 px-[15px] rounded-full border-[1.5px] border-white/20">
									<MagnifyingGlass color="#f4f4f4" weight="bold" size={18} />
									<input
										type="text"
										placeholder="Tìm chương"
										className="w-full h-full bg-transparent border-none outline-none placeholder:text-sm placeholder:text-white/75 placeholder:font-medium text-sm text-white/75 font-medium"
									/>
								</div>
								<div
									className="w-fit h-[48px] flex flex-row items-center gap-2.5 px-[15px] rounded-full bg-warning cursor-pointer"
									onClick={handleOverlayToggle("reportManga")}
								>
									<SealWarning color="#000" weight="bold" size={20} />
									<p className="text-sm text-black font-medium">Báo lỗi</p>
								</div>
							</div>
							<button className="w-fit h-fit flex flex-row items-center gap-[5px]">
								<p className="text-sm text-white/75 font-semibold">
									Chương sau
								</p>
								<CaretRight color="#f4f4f4" weight="bold" size={16} />
							</button>
						</div>
					</div>
					{isLoading ? (
						// Nếu isLoading là true, hiển thị component Loading
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
