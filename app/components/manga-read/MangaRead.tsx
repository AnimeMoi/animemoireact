"use client";
import React, { useEffect, useState } from "react";
import "../../globals.css";
import "./MangaRead.css";
import {
	CaretLeft,
	CaretRight,
	MagnifyingGlass,
	SealWarning,
} from "@phosphor-icons/react";
import Image from "next/image";
import { Domain, DomainGetImage } from "../../domain";
import Loading from "../../loading";
import { Chapter, Chapters } from "../../types/App";

type MangaReadProps = {
	params: any;
};

const MangaRead: React.FC<MangaReadProps> = ({ params }) => {
	const [data, setData] = useState([]);
	const [comic, setComic] = useState<any | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	const [chapters, setChapters] = useState<Chapters>([
		{ id: 0, title: "", timeUpdate: "", views: 0 },
	]);

	useEffect(() => {
		(async () => {
			try {
				const responseComicDetail = await fetch(
					`${Domain}${params.params.host}/Manga?url=${params.searchParams.idComic}`
				);

				const response = await fetch(
					`${Domain}${params.params.host}/ChapterDetail?url=${params.searchParams.id}`
				);

				const responseLC = await fetch(
					`${Domain}${params.params.host}/Chapter?url=${params.searchParams.idComic}`
				);

				if (!response.ok || !responseComicDetail.ok) {
					throw new Error("Network response was not ok");
				}

				const responseComic = await responseComicDetail.json();
				const responseData = await response.json();
				const responseListChapter: Chapters = await responseLC.json();

				for (let i = 0; i < responseData.length; i++) {
					if (responseData[i].includes("ntcdntemp"))
						responseData[
							i
						] = `${DomainGetImage}${params.params.host}/GetImage?url=${responseData[i]}`;
				}

				setChapters(responseListChapter);
				setComic(responseComic);
				setData(responseData);
				setIsLoading(false);
			} catch (error) {
				console.error("Error fetching data:", error);
				setIsLoading(false);
			}
		})();
	}, [isLoading, params]);

	return (
		<div className="w-full h-fit flex flex-col gap-[80px]">
			<div className="w-full h-fit flex flex-col gap-[60px]">
				<div className="flex flex-col items-center gap-[6px]">
					<p className="text-xl text-lightGray font-semibold">
						{comic === null ? "" : comic.titles[0]}
						{chapters.length == 0
							? ""
							: ` - ` +
							  chapters.find((c) => c.id.toString() === params.searchParams.id)
									?.title}
					</p>
					<p className="text-sm text-white/75 font-medium italic">
						[Cập nhật lúc: HH:mm dd/MM/yyyy]
					</p>
				</div>
				<div className="flex flex-row justify-center items-center gap-[30px]">
					<button className="w-fit h-fit flex flex-row items-center gap-[5px]">
						<CaretLeft color="#f4f4f4" weight="bold" size={16} />
						<span className="text-sm text-white/75 font-semibold">
							Chương trước
						</span>
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
						<div className="w-fit h-[48px] flex flex-row items-center gap-2.5 px-[15px] rounded-full bg-warning cursor-pointer">
							<SealWarning color="#000" weight="bold" size={20} />
							<span className="text-sm text-black font-medium">Báo lỗi</span>
						</div>
					</div>
					<button className="w-fit h-fit flex flex-row items-center gap-[5px]">
						<span className="text-sm text-white/75 font-semibold">
							Chương sau
						</span>
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
		</div>
	);
};

export default MangaRead;
