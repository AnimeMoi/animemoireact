"use client";
import React, { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import "../../globals.css";
import "./MangaDetail.css";
import { ButtonSuccess, ButtonWarning } from "../button/button";
import { getStatusText } from "../../utils/getStatusText";
import { GetManga } from "../../utils/manga";
import { Follow, GetProcess, UnFollow } from "../../utils/service";
import { MangaDetailProps } from "../../types/App";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { setMangaData } from "../../globalRedux/Features/manga/mangaSlice";
import { setFollow } from "../../globalRedux/Features/follow/followSlice";
import { RootState } from "../../globalRedux/store";
import { useGlobalContext } from "../../globalContext/store";
import { getMangas } from "../../utils/localStored";
import { setSelectedGenre } from "../../globalRedux/Features/genre/genreSlice";
import { mapGenreIdToName } from "../../utils/genre";
import { setCurrentPage } from "../../globalRedux/Features/page/pageSlice";

const MangaDetail: React.FC<MangaDetailProps> = ({ host, params }) => {
  const dispatch = useDispatch();
  const mangaData = useSelector((state: RootState) => state.manga.data);
  const follow = useSelector((state: RootState) => state.follow.value);
  const { user } = useGlobalContext();

  const [genres, setGenres] = useState<number[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseData = await GetManga(params, host);
        dispatch(setMangaData(responseData));

        const mangaGenres = responseData.genres || [];
        setGenres(mangaGenres);

        const mangas = getMangas();

        const manga = {
          id: responseData.id,
          cover: responseData.cover,
          title: responseData.titles[0],
          lastChapterTitle: responseData.lastChapterTitle,
          lastTimeUpdate: responseData.lastTimeUpdate,
          host: host,
        };

        const existingMangaIndex = mangas.findIndex(
          (item: any) => item.info.id === manga.id
        );

        if (existingMangaIndex !== -1) {
          mangas[existingMangaIndex].info = manga;
        } else {
          mangas.push({ info: manga });
        }

        localStorage.setItem("mangas", JSON.stringify(mangas));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData().then(() => {});
  }, [dispatch, host, params]);

  const checkFollow = useCallback(async () => {
    dispatch(setFollow(null));
    if (user === null) {
      return;
    }
    const _follow = await GetProcess(user, params.searchParams.id);
    if (_follow) {
      dispatch(setFollow(_follow));
    }
  }, [params.searchParams.id, dispatch, user]);

  useEffect(() => {
    checkFollow().then(() => {});
  }, [checkFollow]);

  const handleFollowClick = async (manga: any) => {
    if (user === null) {
      alert("Bạn cần đăng nhập để theo dõi truyện.");
      return;
    }
    const token = await user.getIdToken();
    const mangaData = await Follow(manga.id, token);
    if (mangaData.message === "success") {
      dispatch(setFollow({}));
    }
  };

  const handleUnFollowClick = async (manga: any) => {
    const token = await user!.getIdToken();
    const mangaData = await UnFollow(manga.id, token);
    if (mangaData.message === "success") {
      dispatch(setFollow(null));
    }
  };

  function handleClickOnGenre(genre: number) {
    dispatch(setCurrentPage(1));
    dispatch(setSelectedGenre([genre]));
  }

  return (
    <div>
      {mangaData && (
        <div className="w-[580px] h-fit flex flex-col gap-[30px]">
          <div className="w-full h-fit flex flex-row gap-[25px]">
            <div className="w-[160px] h-[230px] relative overflow-hidden">
              <Image
                src={mangaData.cover}
                alt=""
                fill
                className="object-cover rounded-[20px] outline outline-[2px] outline-white/20 outline-offset-[-2px]"
                sizes="1200px"
              />
            </div>
            <div className="flex flex-col grow shrink-0 basis-0 justify-between overflow-hidden">
              <div className="flex flex-col gap-[15px]">
                <p className="w-full text-[17px] text-lightGray font-semibold whitespace-nowrap text-ellipsis overflow-hidden">
                  {mangaData.titles[0]}
                </p>
                <div className="flex flex-col gap-[5px]">
                  <p className="w-full text-[13px] text-white/75 font-medium whitespace-nowrap text-ellipsis overflow-hidden">
                    Tác giả: {mangaData.author ?? "Đang cập nhật"}
                  </p>
                  <p className="w-full text-[13px] text-white/75 font-medium whitespace-nowrap text-ellipsis overflow-hidden">
                    Tình trạng: {getStatusText(mangaData.status)}
                  </p>
                  <div className="w-full text-[13px] text-white/75 font-medium leading-6 max-h-[72px] text-ellipsis overflow-hidden">
                    Thể loại:{" "}
                    {genres.map((genre) => (
                      <div key={genre} className="inline-block">
                        {genre !== genres[0] && (
                          <div className="inline-block mx-[5px]"> - </div>
                        )}
                        <Link
                          href={`/`}
                          onClick={() => handleClickOnGenre(genre)}
                        >
                          <div className="inline-block hover:text-[#d9f21c]">
                            {mapGenreIdToName(genre)}
                          </div>
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="w-full h-fit flex">
                {follow === null ? (
                  <ButtonSuccess
                    text={"Theo dõi"}
                    func={() => handleFollowClick(mangaData)}
                  ></ButtonSuccess>
                ) : (
                  <ButtonWarning
                    text={"Huỷ theo dõi"}
                    func={() => handleUnFollowClick(mangaData)}
                  ></ButtonWarning>
                )}
              </div>
            </div>
          </div>
          <div className="w-full h-fit flex flex-col gap-[15px]">
            <p className="text-[17px] text-lightGray font-semibold">Nội dung</p>
            <p className="text-[13px] text-lightGray font-medium leading-[24px] p-[15px] rounded-[22px] border-[1.5px] border-white/20">
              {mangaData.description
                ? mangaData.description
                : "Nội dung truyện đang được cập nhật. Truyện sẽ được cập nhật nhanh và đầy đủ nhất tại AnimeMoi."}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default MangaDetail;
