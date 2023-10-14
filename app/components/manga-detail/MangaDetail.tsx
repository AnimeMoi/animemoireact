"use client";
import React, { useEffect, useState } from "react";
import "../../globals.css";
import "./MangaDetail.css";
import Image from "next/image";
import { Domain } from "../../domain";
import { getStatusText } from "../../utils/getStatusText";
import { MangaDetailProps } from "../../types/App";
import auth from "../auth/Firebase";
import AnimeMoiGenres from "../../public/assets/genre-types/AnimeMoi/tags.json";

const MangaDetail: React.FC<MangaDetailProps> = ({ host, params }) => {
	const [data, setData] = useState<any | null>(null);
	const [genres, setGenres] = useState<string[]>([]);

	const mapGenreIdToName = (genreId: number): string => {
		const genre = AnimeMoiGenres.find((item) => item.id === genreId);
		return genre ? genre.Name : `Thể loại không xác định: (${genreId})`;
	};

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetch(
					`${Domain}AnimeMoi/Manga?idComic=${params.searchParams.id}&host=${host}`
				);

				if (!response.ok) {
					throw new Error("Network response was not ok");
				}

				const responseData = await response.json();
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

	const statusText = data ? getStatusText(data.status) : "";

	const handleFollowClick = async (manga: any) => {
		var user = auth.currentUser;
		if (user === null) {
			alert("Bạn cần đăng nhập để theo dõi truyện.");
			return;
		}
		const token = await user.getIdTokenResult();
		const response = await fetch(
			`${Domain}Service/Follow?idComic=${manga.id}`,
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token.token}`,
				},
			}
		);

		const data = await response.json();
		alert(`Theo dõi thành công ${data.message}`);
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
							<div className="w-full h-fit flex">
								<div
									className="flex px-[15px] py-[10px] bg-success rounded-full cursor-pointer move-up"
									onClick={() => handleFollowClick(data)}
								>
									<p className="text-[13px] text-white font-semibold">
										Theo dõi
									</p>
								</div>
							</div>
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
