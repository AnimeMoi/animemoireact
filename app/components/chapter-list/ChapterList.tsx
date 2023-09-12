"use client";
import React, { useEffect, useState } from "react";
import "../../globals.css";
import "./ChapterList.css";
import { MagnifyingGlass } from "@phosphor-icons/react";
import Link from "next/link";
import { Domain } from "@/app/domain";
import { Chapters } from "@/app/types/App";
import moment from "moment";
import "moment/locale/vi";

type ChapterListProps = {
  host: string;
  params: any; // Truyền biến params qua props
};

const ChapterList: React.FC<ChapterListProps> = ({ host, params }) => {
  const [chapters, setChapters] = useState<Chapters>([
    { id: 0, title: "", url: "", timeUpdate: "" },
  ]);

  const [isLatestFirst, setIsLatestFirst] = useState(true); // State để theo dõi thứ tự hiển thị chapter

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${Domain}${host}/Chapter?url=${params.searchParams.id}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
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

    fetchData();
  }, [host, params, isLatestFirst]);

  const toggleOrder = () => {
    // Hàm để đảo ngược thứ tự hiển thị
    setIsLatestFirst(!isLatestFirst);
  };

  const formatDate = (timeUpdate: string) => {
    const chapterDate = moment(timeUpdate);
    const currentYear = moment().year();
    const diffInMonths = moment().diff(chapterDate, "months");

    if (chapterDate.isValid()) {
      if (diffInMonths === 0) {
        return chapterDate.fromNow();
      } else {
        const formattedDate = chapterDate.format(
          currentYear === chapterDate.year() ? "HH:mm - DD/MM" : "DD/MM/YY"
        );

        return formattedDate;
      }
    } else {
      return "Ngày tháng không hợp lệ";
    }
  };

  return (
    <div className="w-[500px] h-fit flex flex-col gap-[30px]">
      <div className="flex flex-row justify-between items-center">
        <div className="w-[280px] h-[48px] flex flex-row items-center gap-2.5 px-[15px] rounded-full border-[1.5px] border-white/20">
          <MagnifyingGlass color="#f4f4f4" weight="bold" size={18} />
          <input
            type="text"
            placeholder="Tìm chương"
            className="w-full h-full bg-transparent border-none outline-none placeholder:text-sm placeholder:text-white/75 placeholder:font-medium text-sm text-white/75 font-medium"
          />
        </div>
        <p
          className={`scale-in text-sm font-semibold ${
            isLatestFirst ? "text-lightGray" : "text-white/75"
          }`}
          onClick={toggleOrder}
          style={{ cursor: "pointer" }}
        >
          Đọc mới nhất
        </p>
        <p
          className={`scale-in text-sm font-semibold ${
            isLatestFirst ? "text-white/75" : "text-lightGray"
          }`}
          onClick={toggleOrder}
          style={{ cursor: "pointer" }}
        >
          Đọc từ đầu
        </p>
      </div>
      <div className="w-full h-[542px] flex flex-col gap-[20px] p-[20px] rounded-[22px] border-[1.5px] border-white/20 overflow-y-scroll no-scrollbar">
        {chapters.map((chapter) => (
          <div
            key={chapter.title}
            className="flex flex-row justify-between items-center"
          >
            <Link
              href={`/pages/reader/${host}?id=${chapter.id}`}
              className="w-[320px] text-sm text-lightGray font-semibold whitespace-nowrap text-ellipsis overflow-hidden"
            >
              {chapter.title}
            </Link>
            <p className="text-sm text-white/75 font-medium">
              {formatDate(chapter.timeUpdate)}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChapterList;
