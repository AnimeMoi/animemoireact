import Image from "next/image";
import React from "react";
import "../../globals.css";
import DemoCover from "../../images/demo-manga-covers/shingeki-no-kyojin.jpg";

const MangaFollowed: React.FC = () => {
  return (
    <div className="w-full h-fit flex flex-col gap-[30px]">
      <p className="text-xl text-lightGray font-semibold">
        Truyện đang theo dõi
      </p>
      <div className="flex flex-row flex-wrap gap-[50px]">
        <div className="w-[340px] h-fit flex flex-row gap-5 p-[15px] rounded-[26px] border-[1.5px] border-white/20">
          <div className="w-[100px] h-[140px] relative overflow-hidden">
            <Image
              src={DemoCover}
              alt=""
              fill
              className="object-cover rounded-[11px] outline outline-[1px] outline-white/20 outline-offset-[-1px]"
              sizes="1200px"
            />
          </div>
          <div className="flex flex-col grow shrink-0 basis-0 overflow-hidden gap-[5px] py-[5px]">
            <p className="w-full text-sm text-lightGray font-semibold whitespace-nowrap text-ellipsis overflow-hidden">
              Tên truyện
            </p>
            <p className="w-full text-xs text-white/75 font-medium whitespace-nowrap text-ellipsis overflow-hidden">
              Chapter mới nhất
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MangaFollowed;
