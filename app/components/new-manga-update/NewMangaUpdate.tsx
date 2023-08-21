import React from "react";
import "../../globals.css";
import "./NewMangaUpdate.css";
import Image from "next/image";
import MangaInfoOverlay from "../manga-info-overlay/MangaInfoOverlay";

const NewMangaUpdate: React.FC = () => {
  const renderMangaDiv = () => {
    const mangaDiv = [];
    for (let i = 0; i < 10; i++) {
      mangaDiv.push(
        <div className="manga w-fit h-fit flex flex-col gap-[20px] cursor-pointer" key={i}>
          <div className="w-[180px] h-[260px] relative overflow-hidden">
            <Image
              src={
                "https://honeysanime.com/wp-content/uploads/2017/12/Boruto-Naruto-Next-Generations-500x750.jpg"
              }
              alt={""}
              fill
              objectFit="cover"
              className="rounded-[20px] outline outline-2 outline-white/20 outline-offset-[-2px]"
            />
          </div>
          <div className="w-[180px] h-fit flex flex-col items-center overflow-hidden gap-[4px] px-[8px]">
            <p className="w-full text-base text-lightGray font-semibold text-center whitespace-nowrap text-ellipsis overflow-hidden">
              Uzumaki Boruto
            </p>
            <p className="text-sm text-white opacity-75 font-medium">
              Chapter 80
            </p>
          </div>
          <div className="manga-info-overlay">
            <MangaInfoOverlay
              coverImage={
                "https://honeysanime.com/wp-content/uploads/2017/12/Boruto-Naruto-Next-Generations-500x750.jpg"
              }
              title="Uzumaki Boruto"
              author="Ikemoto Mikio - Kishimoto Masashi - Kodachi Ukyou"
              status="Đang tiến hành"
              views={5661179}
              description="Boruto là phần tiếp nối của siêu phẩm Naruto huyền thoại. Trong phần này, truyện tập trung vào cậu bé Boruto, con trai của Naruto. Truyện mở đầu bằng cảnh làng lá hoang tàn và một nhân vật bí ẩn tuyên bố về cái chết của Naruto cùng sự chấm dứt của thời đại Ninja hoàng kim. Chuyện gì đã xảy ra? Số phận của các nhân vật như Naruto, Sasuke… ra sao? Và vì sao Boruto lại đeo băng đô với biểu tượng làng lá bị cắt ngang?"
            />
          </div>
        </div>
      );
    }
    return mangaDiv;
  };

  return (
    <div className="font-primary w-full h-fit flex flex-col gap-[30px]">
      <div className="flex flex-row justify-between items-center">
        <p className="text-xl text-lightGray font-semibold">
          Truyện mới cập nhật
        </p>
        <p className="text-base text-white opacity-75 font-semibold">
          NetTruyen
        </p>
      </div>
      <div className="flex flex-wrap justify-center gap-[50px]">
        {renderMangaDiv()}
      </div>
    </div>
  );
};

export default NewMangaUpdate;
