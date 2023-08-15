import React, { useState } from "react";
import "../../globals.css";
import "./NewMangaUpdate.css";
import Image from "next/image";
import MangaCover from "../../images/demo-manga-covers/shingeki-no-kyojin.jpg";
import MangaInfoOverplay from "../manga-info-overplay/MangaInfoOverplay";

const NewMangaUpdate: React.FC = () => {
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseOver = () => {
    setIsHovering(true);
  };

  const handleMouseOut = () => {
    setIsHovering(false);
  };

  const renderMangaDiv = () => {
    const mangaDiv = [];
    for (let i = 0; i < 10; i++) {
      mangaDiv.push(
        <div className="manga w-fit h-fit flex flex-col gap-[20px] cursor-pointer" key={i} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
          <Image
            src={MangaCover}
            alt={""}
            className="w-[180px] h-[260px] rounded-[20px] outline outline-2 outline-white/20 outline-offset-[-2px]"
          />
          <div className="w-[180px] h-fit flex flex-col items-center overflow-hidden gap-[4px] px-[8px]">
            <p className="w-full text-base text-lightGray font-semibold text-center whitespace-nowrap text-ellipsis overflow-hidden">Shingeki no Kyojin</p>
            <p className="text-sm text-white opacity-75 font-medium">Chapter 139</p>
          </div>
          {isHovering && (
            <MangaInfoOverplay
              coverImage={MangaCover}
              title={"Shingeki no Kyojin"}
              author={"Isayama Hajime"}
              status={"Hoàn thành"}
              views={"10M"}
              description={"Hơn 100 năm trước, giống người khổng lồ Titan đã tấn công và đẩy loài người tới bờ vực tuyệt chủng. Những con người sống sót tụ tập lại, xây bao quanh mình 1 tòa thành 3 lớp kiên cố và tự nhốt mình bên trong để trốn tránh những cuộc tấn công của người khổng lồ. Họ tìm mọi cách để tiêu diệt người khổng lồ nhưng không thành công. Và sau 1 thế kỉ hòa bình, giống khổng lồ đã xuất hiện trở lại, một lần nữa đe dọa sự tồn vong của con người... Eren và cô em gái Mikasa phải chứng kiến một cảnh tượng cực kinh khủng - mẹ của mình bị ăn thịt ngay trước mắt. Eren thề rằng cậu sẽ giết tất cả những tên khổng lồ mà cậu gặp..."}
            />
          )}
        </div>
      );
    }
    return mangaDiv;
  };

  return (
    <div className="font-primary w-fit h-fit flex flex-col gap-[30px]">
      <div className="w-full h-fit flex flex-row justify-between items-center">
        <p className="text-xl text-lightGray font-semibold">Truyện mới cập nhật</p>
        <p className="text-base text-white opacity-75 font-semibold">NetTruyen</p>
      </div>
      <div className="w-fit h-fit grid gap-x-[51px] gap-y-[41px] grid-cols-5">
        {renderMangaDiv()}
      </div>
    </div>
  );
};

export default NewMangaUpdate;
