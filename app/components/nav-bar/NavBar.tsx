"use client";
import React, { useEffect, useState } from "react";
import "../../globals.css";
import "./NavBar.css";
import { House, MagnifyingGlass, List } from "@phosphor-icons/react";
import Image from "next/image";
import Avatar from "../../images/avatar.jpg";
import SignInOverlay from "../sign-in-overlay/SignInOverlay";
import SignUpOverlay from "../sign-up-overlay/SignUpOverlay";
import AccountSettingOverlay from "../account-setting-overlay/AccountSettingOverlay";
import Firebase from "../auth/Firebase";

type NavBarProps = {
  isHomePage: boolean;
};

function CheckAuth() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    Firebase.onAuthStateChanged((user) => {
      if (user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    });
  }, [isLoggedIn]);

  return isLoggedIn;
}

const NavBar: React.FC<NavBarProps> = ({ isHomePage }) => {
  const [showOverlayType, setShowOverlayType] = useState<
    "signIn" | "signUp" | "accountSetting" | null
  >(null);

  const isLoggedIn = CheckAuth();

  function handleAuthStateChanged(user: any) {
    if (user) {
      setShowOverlayType(null);
    }
  }

  const handleOverlayToggle =
    (type: "signIn" | "signUp" | "accountSetting") => () => {
      setShowOverlayType(type);
    };

  const showSignInOverlay = showOverlayType === "signIn";
  const showSignUpOverlay = showOverlayType === "signUp";
  const showAccountSettingOverlay = showOverlayType === "accountSetting";

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      setShowOverlayType(null);
    }
  };

  const handleButtonClick = () => (): void => {};

  return (
    <div className="font-primary w-full h-[90px] flex flex-row justify-between items-center bg-richBlack border-b-[1.5px] border-white/[.15] sticky top-0 z-[100]">
      <div className="text-2xl text-lightGray font-semibold uppercase tracking-wider">
        AnimeMoi
      </div>
      <div className="w-fit h-fit flex flex-row gap-[15px]">
        {isHomePage ? null : (
          <div className="w-[48px] h-[48px] flex justify-center items-center rounded-full border-[1.5px] border-lightGray/20">
            <House color="#f4f4f4" weight="bold" size={18} />
          </div>
        )}
        <div className="w-[280px] h-[48px] flex flex-row items-center gap-2.5 px-[15px] rounded-full border-[1.5px] border-lightGray/20">
          <MagnifyingGlass color="#f4f4f4" weight="bold" size={18} />
          <input
            type="text"
            placeholder="Tìm truyện"
            className="w-full h-full bg-transparent border-none outline-none placeholder:text-sm placeholder:text-white/75 placeholder:font-medium text-sm text-white/75 font-medium"
          />
        </div>
        <div className="w-fit h-[48px] flex flex-row items-center gap-2.5 px-[15px] rounded-full border-[1.5px] border-lightGray/20 cursor-pointer">
          <List color="#f4f4f4" weight="bold" size={18} />
          <span className="text-sm text-lightGray/75 font-medium">
            Thể loại
          </span>
        </div>
      </div>
      {isLoggedIn ? (
        <Image
          src={Avatar}
          alt={""}
          className="scale-in w-[45px] h-[45px] rounded-full outline outline-[1.5px] outline-white/20 outline-offset-[-1.5px] cursor-pointer"
          onClick={handleOverlayToggle("accountSetting")}
        />
      ) : (
        <div className="w-fit h-fit flex flex-row gap-5 items-center">
          <span
            className="scale-in text-sm text-lightGray font-semibold cursor-pointer"
            onClick={handleOverlayToggle("signIn")}
          >
            Đăng nhập
          </span>
          <div
            className="scale-in w-fit h-fit px-[15px] py-[10px] bg-lightGray rounded-full cursor-pointer"
            onClick={handleOverlayToggle("signUp")}
          >
            <span className="text-sm text-black font-semibold">Đăng ký</span>
          </div>
        </div>
      )}

      {showSignInOverlay && (
        <div
          className="fixed inset-0 flex justify-center items-center bg-richBlack/75 z-[200]"
          onClick={handleOverlayClick}
        >
          <SignInOverlay
            onAuthStateChanged={handleAuthStateChanged}
            onEmailSignIn={handleButtonClick}
          />
        </div>
      )}

      {showSignUpOverlay && (
        <div
          className="fixed inset-0 flex justify-center items-center bg-richBlack/75 z-[200]"
          onClick={handleOverlayClick}
        >
          <SignUpOverlay
            onAuthStateChanged={handleAuthStateChanged}
            onEmailSignUp={handleButtonClick}
          />
        </div>
      )}

      {/* Lớp phủ để làm nổi bật AccountSettingOverlay */}
      {showAccountSettingOverlay && (
        <div
          className="fixed inset-0 bg-black/75 z-[150]"
          onClick={handleOverlayClick}
        />
      )}

      {showAccountSettingOverlay && (
        <div className="absolute top-[90%] right-0 z-[200]">
          <AccountSettingOverlay
            onEdit={handleButtonClick}
          />
        </div>
      )}
    </div>
  );
};

export default NavBar;
