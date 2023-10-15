"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useGlobalContext } from "../../context/store";
import "../../globals.css";
import AnimeMoiGenres from "../../public/assets/genre-types/AnimeMoi/tags.json";
import { MangaDetailProps } from "../../types/App";
import { getStatusText } from "../../utils/getStatusText";
import { GetManga } from "../../utils/manga";
import { Follow, GetProcess, UnFollow } from "../../utils/service";
import { ButtonSuccess, ButtonWarning } from "../button/button";
import "./MangaDetail.css";

const MangaDetail: React.FC<MangaDetailProps> = ({ host, params }) => {
	const [data, setData] = useState<any | null>(null);
	const [genres, setGenres] = useState<string[]>([]);
	const { user, follow, setFollow } = useGlobalContext();

	const mapGenreIdToName = (genreId: number): string => {
		const genre = AnimeMoiGenres.find((item) => item.id === genreId);
		return genre ? genre.Name : `Thể loại không xác định: (${genreId})`;
	};

	useEffect(() => {
		const fetchData = async () => {
			try {
				const responseData = await GetManga(params, host);
				setData(responseData);

				const mangaGenres = responseData.genres || [];
				const genreNames = mangaGenres.map((genreId: number) =>
					mapGenreIdToName(genreId)
				);
				setGenres(genreNames);

				const manga = {
					id: responseData.id,
					cover: responseData.cover,
					title: responseData.titles[0],
					lastChapterTitle: responseData.lastChapterTitle,
					lastTimeUpdate: responseData.lastTimeUpdate,
				};

				localStorage.setItem("manga", JSON.stringify(manga));
			} catch (error) {
				console.error("Error fetching data:", error);
			}
		};

		fetchData();
	}, [host, params]);

	const checkFollow = async () => {
		if (user === null) {
			return;
		}
		const _follow = await GetProcess(user, params.searchParams.id);
		if (_follow[0]) {
			setFollow(_follow[0]);
		}
	};

	useEffect(() => {
		checkFollow();
	}, []);

	const statusText = data ? getStatusText(data.status) : "";

	const handleFollowClick = async (manga: any) => {
		if (user === null) {
			alert("Bạn cần đăng nhập để theo dõi truyện.");
			return;
		}
		const token = await user.getIdToken();
		const data = await Follow(manga.id, token);
		if (data.message === "success") {
			setFollow({});
		}
	};

	const handleUnFollowClick = async (manga: any) => {
		const token = await user!.getIdToken();
		const data = await UnFollow(manga.id, token);
		if (data.message === "success") {
			setFollow(null);
		}
	};

	return (
		<>
			{data && (
				<div className="w-[560px] h-fit flex flex-col gap-[30px]">
					<div className="w-full h-fit flex flex-row gap-[25px]">
						<div className="w-[160px] h-[230px] relative overflow-hidden">
							<Image
								src={data.cover}
								alt=""
								fill
								className="object-cover rounded-[20px] outline outline-[2px] outline-white/20 outline-offset-[-2px]"
								sizes="1200px"
							/>
						</div>
						<div className="flex flex-col grow shrink-0 basis-0 justify-between overflow-hidden">
							<div className="flex flex-col gap-[15px]">
								<p className="w-full text-lg text-lightGray font-semibold whitespace-nowrap text-ellipsis overflow-hidden">
									{data.titles[0]}
								</p>
								<div className="flex flex-col gap-[5px]">
									<p className="w-full text-sm text-white/75 font-medium whitespace-nowrap text-ellipsis overflow-hidden">
										Tác giả: {data.author ?? "Đang cập nhật"}
									</p>
									<p className="w-full text-sm text-white/75 font-medium whitespace-nowrap text-ellipsis overflow-hidden">
										Tình trạng: {statusText}
									</p>
									<p className="w-full text-sm text-white/75 font-medium leading-6 max-h-[72px] text-ellipsis overflow-hidden">
										Thể loại: {genres.join(" - ")}
									</p>
								</div>
							</div>
							{follow === null ? (
								<ButtonSuccess
									text={"Theo dõi"}
									func={() => handleFollowClick(data)}
								></ButtonSuccess>
							) : (
								<ButtonWarning
									text={"Huỷ theo dõi"}
									func={() => handleUnFollowClick(data)}
								></ButtonWarning>
							)}
						</div>
					</div>
					<div className="w-full h-fit flex flex-col gap-[15px]">
						<p className="text-lg text-lightGray font-semibold">Nội dung</p>
						<p className="text-sm text-lightGray font-medium leading-6 p-[15px] rounded-[22px] border-[1.5px] border-white/20">
							{data.description
								? data.description
								: "Nội dung truyện đang được cập nhật. Truyện sẽ được cập nhật nhanh và đầy đủ nhất tại AnimeMoi."}
						</p>
					</div>
				</div>
			)}
		</>
	);
};

export default MangaDetail;
