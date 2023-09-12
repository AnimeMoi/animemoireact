import React, { useState } from "react";
import "../../globals.css";
import "./AccountSettingOverlay.css";
import auth from "../auth/Firebase";
import { useToggleContext } from "@/app/toggleContext";

type AccountSettingProps = {
  onEdit: () => void;
};

const AccountSetting: React.FC<AccountSettingProps> = ({ onEdit }) => {
  const [isEditClicking, setIsEditClicking] = useState(false);
  const { toggleYurinekoVisibility, isYurinekoVisible } = useToggleContext();

  const handleEditClick = () => {
    onEdit();
    setIsEditClicking(true);
  };

  const handleYurinekoCheckboxChange = () => {
    toggleYurinekoVisibility();
  };

  function logout() {
    auth.signOut().then(() => {
        console.log("Logout success")
    }).catch((e) => {
        console.error(e)
    })
  }

  return (
    <div className="w-[280px] h-fit flex flex-col gap-5 p-4 bg-richBlack/60 backdrop-blur-[10px] rounded-3xl border-[1.5px] border-white/20 overlay-show">
      <div className="w-full h-fit flex flex-row justify-between items-center">
        <div className="w-full h-fit flex flex-col justify-start gap-[5px]">
          <p className="text-sm text-lightGray font-semibold">Admin</p>
          <p className="text-xs text-white opacity-75 font-medium">
            admin123@gmail.com
          </p>
        </div>
        <div
          className="scale-up flex px-[12px] py-[8px] rounded-full border-[1.5px] border-white/20 cursor-pointer"
          onClick={handleEditClick}
        >
          <span className="text-xs text-lightGray font-semibold">Sửa</span>
        </div>
      </div>
      <div className="w-full h-px bg-white/10"></div>
      <div className="w-full h-fit flex flex-col justify-start gap-5">
        <p className="text-sm text-lightGray font-semibold">Nguồn truyện</p>
        <div className="w-full h-fit flex flex-col gap-5">
          <label className="w-full h-fit flex flex-row items-center gap-3">
            <input
              type="checkbox"
              name="option"
              className="w-[16px] h-[16px]"
            />
            <span className="text-xs text-lightGray font-medium">
              BaoTangTruyen
            </span>
          </label>
          <label className="w-full h-fit flex flex-row items-center gap-3">
            <input
              type="checkbox"
              name="option"
              className="w-[16px] h-[16px]"
            />
            <span className="text-xs text-lightGray font-medium">CManga</span>
          </label>
          <label className="w-full h-fit flex flex-row items-center gap-3">
            <input
              type="checkbox"
              name="option"
              className="w-[16px] h-[16px]"
            />
            <span className="text-xs text-lightGray font-medium">LxManga</span>
          </label>
          <label className="w-full h-fit flex flex-row items-center gap-3">
            <input
              type="checkbox"
              name="option"
              className="w-[16px] h-[16px] accent-white"
              checked={isYurinekoVisible}
              onChange={handleYurinekoCheckboxChange}
            />
            <span className="text-xs text-lightGray font-medium">Yurineko</span>
          </label>
        </div>
      </div>
      <div className="w-full h-fit flex justify-end">
        <div
          className="scale-up flex px-[14px] py-[10px] rounded-full bg-lightGray cursor-pointer"
          onClick={logout}
        >
          <span className="text-xs text-black font-semibold">Đăng xuất</span>
        </div>
      </div>
    </div>
  );
};

export default AccountSetting;
