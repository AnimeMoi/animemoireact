import React, { useState } from "react";
import "../../globals.css";
import "./SignUpOverlay.css";
import Image from "next/image";
import GoogleLogo from "../../images/brand-logo/google-logo.png";
import FacebookLogo from "../../images/brand-logo/facebook-logo.png";
import XLogo from "../../images/brand-logo/x-logo.png";
import auth from "../auth/Firebase";
import {GoogleAuthProvider, signInWithPopup, TwitterAuthProvider} from "firebase/auth";

type SignUpProps = {
  onEmailSignUp: () => void;
  onAuthStateChanged: (user: any) => void;
};

const SignUpOverlay: React.FC<SignUpProps> = ({
  onEmailSignUp,
  onAuthStateChanged,
}) => {
  const [isEmailClicking, setIsEmailClicking] = useState(false);

  const [email, setEmail] = useState("");
  const [isInvalidEmail, setIsInvalidEmail] = useState(false);
  const [isEmailEmpty, setIsEmailEmpty] = useState(false);

  const handleEmailClick = () => {
    setIsInvalidEmail(false);
    setIsEmailEmpty(false);

    if (email.trim() === "") {
      setIsEmailEmpty(true);
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setIsInvalidEmail(true);
      return;
    }

    onEmailSignUp();
    setIsEmailClicking(true);
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
    setIsInvalidEmail(false);
    setIsEmailEmpty(false);
  };

  const GoogleProvider = new GoogleAuthProvider();
  const handleGoogleClick = () => {
    signInWithPopup(auth, GoogleProvider)
      .then((result) => {
        onAuthStateChanged(result.user);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const XProvider = new TwitterAuthProvider();
  const handleXClick = () => {
    signInWithPopup(auth, XProvider)
      .then((result) => {
        onAuthStateChanged(result.user);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleFacebookClick = () => {};

  return (
    <div className="font-primary w-[335px] h-fit flex flex-col gap-[20px] p-4 bg-richBlack/50 backdrop-blur-[10px] rounded-[34px] border-[1.5px] border-white/20 overlay-show">
      <p className="text-lg text-lightGray font-semibold text-center">
        Đăng ký
      </p>
      <div className="w-full grid gap-[13px] grid-cols-2">
        <div
          className="move-up w-[145px] h-[46px] flex flex-row justify-center items-center gap-[10px] rounded-full border-[1.5px] border-lightGray/20 cursor-pointer"
          onClick={handleGoogleClick}
        >
          <Image src={GoogleLogo} alt={""} className="w-[16px] h-[16px]" />
          <span className="text-sm text-lightGray font-semibold">Google</span>
        </div>
        <div
          className="move-up w-[145px] h-[46px] flex flex-row justify-center items-center gap-[10px] rounded-full border-[1.5px] border-lightGray/20 cursor-pointer"
          onClick={handleXClick}
        >
          <Image src={XLogo} alt={""} className="w-[16px] h-[16px]" />
          <span className="text-sm text-lightGray font-semibold">X</span>
        </div>
        <div
          className="move-up w-[145px] h-[46px] flex flex-row justify-center items-center gap-[10px] rounded-full border-[1.5px] border-lightGray/20 cursor-pointer"
          onClick={handleFacebookClick}
        >
          <Image src={FacebookLogo} alt={""} className="w-[16px] h-[16px]" />
          <span className="text-sm text-lightGray font-semibold">Facebook</span>
        </div>
      </div>
      <div className="w-full h-fit flex flex-row items-center gap-[10px]">
        <div className="w-full h-px bg-white/[.15]"></div>
        <span className="text-xs text-white opacity-75 font-semibold">
          hoặc
        </span>
        <div className="w-full h-px bg-white/[.15]"></div>
      </div>
      <div className="w-full h-fit flex flex-col items-start gap-[10px]">
        <span className="text-sm text-lightGray font-semibold">Email*</span>
        <div className="w-full h-[48px] flex px-[16px] rounded-full border-[1.5px] border-lightGray/20">
          <input
            type="text"
            placeholder="you@example.com"
            className="w-full bg-transparent border-none outline-none placeholder:text-sm placeholder:text-white/75 placeholder:font-medium text-sm text-white/75 font-medium"
            value={email}
            onChange={handleEmailChange}
            onBlur={handleEmailChange}
          />
        </div>
        {isInvalidEmail && (
          <span className="text-xs text-red-500 font-semibold">
            Định dạng Email không hợp lệ
          </span>
        )}
        {isEmailEmpty && (
          <span className="text-xs text-red-500 font-semibold">
            Đây là mục bắt buộc
          </span>
        )}
      </div>
      <div className="w-full h-fit flex flex-col items-start gap-[10px]">
        <span className="text-sm text-lightGray font-semibold">Mật khẩu*</span>
        <div className="w-full h-[48px] flex px-[16px] rounded-full border-[1.5px] border-lightGray/20">
          <input
            type="password"
            className="w-full bg-transparent border-none outline-none text-sm text-white/75 font-medium"
          />
        </div>
      </div>
      <div
        className="move-up w-full h-[48px] mt-[20px] flex justify-center items-center rounded-full bg-lightGray cursor-pointer"
        onClick={handleEmailClick}
      >
        <span className="text-sm text-black font-semibold">Đăng ký</span>
      </div>
    </div>
  );
};

export default SignUpOverlay;
