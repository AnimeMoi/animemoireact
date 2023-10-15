import React from "react";
import "../../globals.css";
import Image from "next/image";
import DemoCover from "../../public/assets/images/demo-manga-covers/shingeki-no-kyojin.jpg";

const FindManga: React.FC = () => {
  return (
    <div className="w-full h-fit flex flex-col gap-5 ">
      <div className="w-[100px] h-[140px] relative overflow-hidden">
        <Image
          src={DemoCover}
          alt=""
          fill
          className="object-cover rounded-[11px] outline outline-[1px] outline-white/20 outline-offset-[-1px]"
          sizes="1200px"
        />
      </div>
      <p className="text-[15px] text-lightGray font-semibold">
        Shingeki no Kyojin
      </p>
      <p className="text-[13px] text-white/75 font-medium">Chapter 139</p>
    </div>
  );
};

export default FindManga;
