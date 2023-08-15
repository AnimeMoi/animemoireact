import React from "react";
import "../../globals.css";
import Image from "next/image";
// import MangaCover from "../../images/demo-manga-covers/shingeki-no-kyojin.jpg";
// import MangaCover1 from "../../images/demo-manga-covers/Sono-Bisque-Doll-Wa-Koi-O-Suru.jpg";

interface MangaInfoProps {
  coverImage: string;
  title: string;
  author: string;
  status: string;
  views: string;
  description: string;
}

const MangaInfoItem = ({ coverImage, title, author, status, views, description }: MangaInfoProps) => {
  return (
    <MangaInfo
      coverImage={coverImage}
      title={title}
      author={author}
      status={status}
      views={views}
      description={description}
    />
  )
}

const MangaInfo: React.FC<MangaInfoProps> = (props) => {
  const { coverImage, title, author, status, views, description } = props;

  return (
    <div className="font-primary w-[340px] h-fit flex flex-col gap-[20px] p-4 bg-richBlack/[.55] backdrop-blur-[10px] rounded-[26px] border-[1.5px] border-white/20">
      <div className="w-full h-fit flex flex-row items-start gap-[20px]">
        <div className="w-[100px] h-[140px] rounded-[10px] outline outline-[1px] outline-white/20 outline-offset-[-1px] relative overflow-hidden">
          <Image src={coverImage} alt={title} fill objectFit="cover" />
        </div>
        <div className="h-fit flex flex-col grow shrink-0 basis-0 gap-[5px] pt-[5px] overflow-hidden">
          <p className="w-full text-sm text-lightGray font-semibold whitespace-nowrap text-ellipsis overflow-hidden">{title}</p>
          <p className="w-full text-xs text-white opacity-75 font-medium whitespace-nowrap text-ellipsis overflow-hidden">Tác giả: {author}</p>
          <p className="w-full text-xs text-white opacity-75 font-medium whitespace-nowrap text-ellipsis overflow-hidden">Tình trạng: {status}</p>
          <p className="w-full text-xs text-white opacity-75 font-medium whitespace-normal text-ellipsis overflow-hidden">Lượt đọc: {views}</p>
        </div>
      </div>
      <div className="w-full h-fit flex flex-col gap-[5px]">
        <p className="text-sm text-lightGray font-semibold">Nội dung</p>
        <p className="w-full text-xs text-white opacity-75 font-medium leading-5 max-h-[160px] text-ellipsis overflow-hidden">{description}</p>
      </div>
    </div>
  );
};

export default MangaInfoItem;
