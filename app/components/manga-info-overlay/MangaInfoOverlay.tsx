import React from "react";
import "../../globals.css";
import "../new-manga-update-nettruyen/NewMangaUpdate.css";
import Image from "next/image";

type MangaInfoProps = {
  coverImage: any;
  title: string;
  author: string;
  status: string;
  views: number;
  description: string;
};

const MangaInfoOverlay: React.FC<MangaInfoProps> = (props) => {
  const { coverImage, title, author, status, views, description } = props;

  return (
    <div className="w-[320px] h-fit flex flex-col gap-[20px] p-4 bg-richBlack/80 backdrop-blur-[10px] rounded-[24px] border-[1.5px] border-white/20">
      <div className="w-full h-fit flex flex-row items-start gap-[15px]">
        <div className="w-[90px] h-[130px] relative overflow-hidden">
          <Image
            src={coverImage}
            alt={title}
            fill
            className="object-cover rounded-[8px] outline outline-[1px] outline-white/20 outline-offset-[-1px]"
            sizes="1200px"
          />
        </div>
        <div className="h-fit flex flex-col grow shrink-0 basis-0 gap-[5px] pt-[5px] overflow-hidden">
          <p className="w-full text-sm text-lightGray font-semibold whitespace-nowrap text-ellipsis overflow-hidden">
            {title}
          </p>
          <p className="w-full text-xs text-white opacity-75 font-medium whitespace-nowrap text-ellipsis overflow-hidden">
            Tác giả: {author}
          </p>
          <p className="w-full text-xs text-white opacity-75 font-medium whitespace-nowrap text-ellipsis overflow-hidden">
            Tình trạng: {status}
          </p>
          {/* <p className="w-full text-xs text-white opacity-75 font-medium whitespace-normal text-ellipsis overflow-hidden">
            Lượt đọc: {views.toLocaleString().replace(/,/g, ".")}
          </p> */}
        </div>
      </div>
      <div className="w-full h-fit flex flex-col gap-[5px]">
        <p className="text-sm text-lightGray font-semibold">Nội dung</p>
        <p className="w-full text-xs text-white/75 font-medium leading-5 max-h-[160px] text-ellipsis overflow-hidden">
          {description}
        </p>
      </div>
    </div>
  );
};

export default MangaInfoOverlay;
