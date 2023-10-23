import React from "react";
import "../../globals.css";
import auth from "../auth/Firebase";
import "./AccountSettingOverlay.css";
import { Config } from "../../types/App";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../globalRedux/store";
import { setNSFW } from "../../globalRedux/Features/config/configSlice";
import { Switch } from "@headlessui/react";

const AccountSetting = ({ onClose }: { onClose: () => void }) => {
  const config: Config = useSelector((state: RootState) => state.config);
  const dispatch = useDispatch();

  function logout() {
    auth
      .signOut()
      .then(() => {
        console.log("Logout success");
        onClose(); // Gọi onClose để ẩn overlay sau khi đăng xuất
      })
      .catch((e) => {
        console.error(e);
      });
  }

  return (
    <div className="w-[280px] h-fit flex flex-col gap-[32px] p-4 bg-richBlack/60 backdrop-blur-[10px] rounded-3xl border-[1px] border-white/20 overlay-show">
      <div className="w-full h-fit flex flex-col justify-start gap-[5px]">
        <p className="text-sm text-lightGray font-semibold">
          {auth.currentUser?.displayName}
        </p>
        <p className="text-xs text-white opacity-75 font-medium">
          {auth.currentUser?.email}
        </p>
      </div>
      <div className={`flex gap-[5px] items-center`}>
        <p className="text-white text-sm font-semibold">NSFW: </p>
        <Switch
          checked={config.nsfw}
          onChange={() => dispatch(setNSFW(!config.nsfw))}
          className={`${
            config.nsfw ? "bg-[green]" : "bg-[gray]"
          } relative inline-flex h-6 w-11 items-center rounded-full`}
        >
          <span className="sr-only text-white">Enable NSFW</span>
          <span
            className={`${
              config.nsfw ? "translate-x-6" : "translate-x-1"
            } inline-block h-4 w-4 transform rounded-full transition bg-white`}
          />
        </Switch>
      </div>
      <div className="flex justify-end">
        <div
          className="scale-up flex px-[14px] py-[10px] rounded-full bg-lightGray cursor-pointer"
          onClick={logout}
        >
          <p className="text-xs text-black font-semibold">Đăng xuất</p>
        </div>
      </div>
    </div>
  );
};

export default AccountSetting;
