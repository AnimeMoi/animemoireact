import Image from "next/image";
import React from "react";
import "../../globals.css";
import { MangaInfoProps } from "../../types/App";
import { getStatusText } from "../../utils/getStatusText";
import "../new-manga-update/NewMangaUpdate.css";

const MangaInfoOverlay: React.FC<MangaInfoProps> = (props) => {
  const { cover, title, author, status, views, description } = props;
  const statusText = getStatusText(status);

  return (
    <div className="w-[320px] h-fit flex flex-col gap-[20px] p-[14px] bg-richBlack/80 backdrop-blur-[10px] rounded-[22px] border-[1px] border-white/20">
      <div className="w-full h-fit flex flex-row items-start gap-[14px]">
        <div className="w-[90px] h-[130px] relative overflow-hidden">
          <Image
            src={cover}
            alt={title}
            fill
            className="object-cover rounded-[8px] outline outline-[1px] outline-white/20 outline-offset-[-1px]"
            sizes="1200px"
          />
        </div>
        <div className="h-fit flex flex-col grow shrink-0 basis-0 gap-[5px] pt-[3px] overflow-hidden">
          <p className="w-full text-[13px] text-lightGray font-semibold whitespace-nowrap text-ellipsis overflow-hidden">
            {title}
          </p>
          <p className="w-full text-[11px] text-white/75 font-medium whitespace-nowrap text-ellipsis overflow-hidden">
            Tác giả: {author}
          </p>
          <p className="w-full text-[11px] text-white/75 font-medium whitespace-nowrap text-ellipsis overflow-hidden">
            Tình trạng: {statusText}
          </p>
          {/*<p className="w-full text-xs text-white opacity-75 font-medium whitespace-normal text-ellipsis overflow-hidden">*/}
          {/*    Lượt đọc: {views.toLocaleString().replace(/,/g, ".")}*/}
          {/*</p>*/}
        </div>
      </div>
      <div className="w-full h-fit flex flex-col gap-[5px]">
        <p className="text-[13px] text-lightGray font-semibold">Nội dung</p>
        <p className="w-full text-[11px] text-white/75 font-medium leading-5 max-h-[160px] text-ellipsis overflow-hidden">
          {description}
        </p>
      </div>
    </div>
  );
};

export default MangaInfoOverlay;
