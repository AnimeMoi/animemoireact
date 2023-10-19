import React, { useState } from "react";
import "../../globals.css";
import { ReportMangaProps } from "../../types/App";
import "./ReportManga.css";

const ReportManga: React.FC<ReportMangaProps> = ({ onSend, onClose }) => {
  const [isSendClicking, setIsSendClicking] = useState(false);
  const [isCloseClicking, setIsCloseClicking] = useState(false);

  const handleSendClick = () => {
    onSend();
    setIsSendClicking(true);
  };

  const handleCloseClick = () => {
    onClose();
    setIsCloseClicking(true);
  };

  return (
    <div className="w-[320px] h-fit flex flex-col gap-[36px] p-[18px] bg-richBlack/[.65] backdrop-blur-[10px] rounded-3xl border-[1px] border-white/20 overlay-show">
      <div className="w-full h-fit flex flex-col gap-2.5">
        <p className="text-sm text-lightGray font-semibold">Báo lỗi truyện</p>
        <p className="text-xs text-white opacity-75 font-medium">
          Cảm ơn bạn đã hỗ trợ báo lỗi, truyện sẽ được fix trong thời gian sớm
          nhất.
        </p>
      </div>
      <div className="w-full h-fit flex flex-col gap-[18px]">
        <label className="w-full h-fit flex flex-row gap-2.5">
          <input type="checkbox" name="option" className="w-[16px] h-[16px]" />
          <p className="text-xs text-lightGray font-medium">
            Ảnh bị lỗi, không thấy ảnh
          </p>
        </label>
        <label className="w-full h-fit flex flex-row gap-2.5">
          <input type="checkbox" name="option" className="w-[16px] h-[16px]" />
          <p className="text-xs text-lightGray font-medium">Chapter bị trùng</p>
        </label>
        <label className="w-full h-fit flex flex-row gap-2.5">
          <input type="checkbox" name="option" className="w-[16px] h-[16px]" />
          <p className="text-xs text-lightGray font-medium">
            Chapter chưa dịch
          </p>
        </label>
        <label className="w-full h-fit flex flex-row gap-2.5">
          <input type="checkbox" name="option" className="w-[16px] h-[16px]" />
          <p className="text-xs text-lightGray font-medium">Up sai truyện</p>
        </label>
      </div>
      <div className="w-full h-fit flex flex-row justify-end items-center gap-[15px]">
        <div
          className="scale-up flex px-[14px] py-[10px] rounded-full bg-success cursor-pointer"
          onClick={handleSendClick}
        >
          <p className="text-xs text-white font-semibold">Gửi đi</p>
        </div>
        <div
          className="scale-up flex px-[14px] py-[10px] rounded-full bg-lightGray cursor-pointer"
          onClick={handleCloseClick}
        >
          <p className="text-xs text-black font-semibold">Đóng</p>
        </div>
      </div>
    </div>
  );
};

export default ReportManga;
