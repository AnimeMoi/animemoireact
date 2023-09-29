"use client";
import Image from "next/image";
import Thumbnail from "../../../images/thumbnail.png";
import NavBar from "../../../components/nav-bar/NavBar";
import MangaDetail from "../../../components/manga-detail/MangaDetail";
import ChapterList from "../../../components/chapter-list/ChapterList";
import { useEffect, useState } from "react";
import { Domain } from "../../../domain";
import { Chapters } from "../../../types/App";

export default function Page(params: any) {
	const [dataDetailManga, setDataDetailManga] = useState<any | null>(null);
	const [chapters, setChapters] = useState<Chapters>([
		{ id: 0, title: "", url: "", timeUpdate: "" },
	]);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const responseMangaDetail = await fetch(
					`${Domain}${params.params.host}/Manga?url=${params.searchParams.id}`
				);

				const responseListChapter = await fetch(
					`${Domain}${params.params.host}/Chapter?url=${params.searchParams.id}`
				);

				if (!responseMangaDetail.ok || !responseListChapter.ok) {
					throw new Error("Network response was not ok");
				}

				const responseData = await responseMangaDetail.json();
				const data: Chapters = await responseListChapter.json();

				setDataDetailManga(responseData);
				setChapters(data);
			} catch (error) {
				console.error("Error fetching data:", error);
			}
		};

		fetchData();
	}, [params.params.host, params]);

	return (
		<div className="w-screen min-h-screen flex justify-center items-center bg-richBlack">
			<div className="hidden w-[1200px] h-full tablet:flex flex-col justify-start items-center gap-[50px] px-[40px]">
				<NavBar isHomePage={false} />
				<div className="w-full min-h-[calc(100vh-90px-50px)] flex flex-col gap-[50px]">
					<div className="w-full h-fit flex flex-row flex-wrap justify-center gap-[60px]">
						<MangaDetail data={dataDetailManga} />
						<ChapterList data={chapters} host={params.params.host} />
					</div>
					<div className="w-full h-[50px]"></div>
					<div className="w-full h-fit flex flex-row justify-between items-center pt-[25px] py-[50px] border-t-[1.5px] border-white/[.15]">
						<div className="flex flex-col gap-[6px]">
							<p className="text-lg text-lightGray font-semibold uppercase tracking-wider">
								AnimeMoi
							</p>
							<p className="text-sm text-white/75 font-medium">
								1 sản phẩm của tdquang266 và hoang3402
							</p>
						</div>
						<p className="text-sm text-white/75 font-medium">
							© 2023 AnimeMoi. Tất cả quyền được bảo lưu.
						</p>
					</div>
				</div>
			</div>
			<div className="tablet:hidden w-full h-full flex flex-col justify-center items-center gap-[50px]">
				<div className="w-[400px] h-[200px] relative overflow-hidden">
					<Image
						src={Thumbnail}
						alt=""
						fill
						sizes="(max-width: 390px) 100vw, (max-width: 1080px) 50vw"
						className="object-contain"
					/>
				</div>
				<div className="w-[350px] flex flex-col gap-[8px] text-center">
					<p className="text-[22px] text-lightGray font-semibold">
						AnimeMoi mobile is coming
					</p>
					<p className="text-sm text-white/75 font-medium">
						In the meantime, please use the desktop site for the best experience
					</p>
				</div>
			</div>
		</div>
	);
}
