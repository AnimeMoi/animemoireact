import { FirebaseError } from "firebase/app";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import Image from "next/image";
import React, { useState } from "react";
import "../../globals.css";
import GithubLogo from "../../public/assets/images/brand-logo/github-logo.png";
import GoogleLogo from "../../public/assets/images/brand-logo/google-logo.png";
import XLogo from "../../public/assets/images/brand-logo/x-logo.png";
import { SignInProps } from "../../types/App";
import auth, {
  GithubProvider,
  GoogleProvider,
  XProvider,
} from "../auth/Firebase";
import "./SignInOverlay.css";
import { ForgotPassword } from "../forgot-password/ForgotPassword";

const SignInOverlay: React.FC<SignInProps> = ({ onAuthStateChanged }) => {
  const [forgetPassword, setForgetPassword] = useState(false);

  const handleEmailClick = () => {
    let email = document.getElementById("email") as HTMLInputElement | null;
    let password = document.getElementById(
      "password"
    ) as HTMLInputElement | null;
    if (password === null || email === null) return;
    signInWithEmailAndPassword(auth, email.value, password.value)
      .then((result) => {
        onAuthStateChanged(result.user);
      })
      .catch((error: FirebaseError) => {
        const err = document.getElementById("error");
        if (err === null) return;
        err.innerText = error.message;
        console.error(error);
      });
  };

  const handleGoogleClick = () => {
    signInWithPopup(auth, GoogleProvider)
      .then((result) => {
        onAuthStateChanged(result.user);
      })
      .catch((error: FirebaseError) => {
        const err = document.getElementById("error");
        if (err === null) return;
        err.innerText = error.message;
        console.error(error);
      });
  };

  const handleXClick = () => {
    signInWithPopup(auth, XProvider)
      .then((result) => {
        onAuthStateChanged(result.user);
      })
      .catch((error: FirebaseError) => {
        const err = document.getElementById("error");
        if (err === null) return;
        err.innerText = error.message;
        console.error(error);
      });
  };

  const handleGithubClick = () => {
    signInWithPopup(auth, GithubProvider)
      .then((result) => {
        onAuthStateChanged(result.user);
      })
      .catch((error: FirebaseError) => {
        const err = document.getElementById("error");
        if (err === null) return;
        err.innerText = error.message;
        console.error(error);
      });
  };

  return (
    <>
      {!forgetPassword ? (
        <div className="w-[335px] h-fit flex flex-col gap-[20px] p-4 bg-richBlack/[.65] backdrop-blur-[10px] rounded-[28px] border-[1px] border-white/20 overlay-show">
          <p className="text-lg text-lightGray font-semibold text-center">
            Đăng nhập
          </p>
          <div className="w-full grid gap-[13px] grid-cols-2">
            <div
              className="w-[145px] h-[46px] flex flex-row justify-center items-center gap-[10px] rounded-full border-[1.5px] border-white/20 cursor-pointer move-up"
              onClick={handleGoogleClick}
            >
              <Image src={GoogleLogo} alt={""} className="w-[16px] h-[16px]" />
              <p className="text-sm text-lightGray font-semibold">Google</p>
            </div>
            <div
              className="w-[145px] h-[46px] flex flex-row justify-center items-center gap-[10px] rounded-full border-[1.5px] border-white/20 cursor-pointer move-up"
              onClick={handleXClick}
            >
              <Image src={XLogo} alt={""} className="w-[16px] h-[16px]" />
              <p className="text-sm text-lightGray font-semibold">X</p>
            </div>
            <div
              className="move-up w-[145px] h-[46px] flex flex-row justify-center items-center gap-[10px] rounded-full border-[1.5px] border-white/20 cursor-pointer"
              onClick={handleGithubClick}
            >
              <Image src={GithubLogo} alt={""} className="w-[16px] h-[16px]" />
              <p className="text-sm text-lightGray font-semibold">Github</p>
            </div>
          </div>
          <div className="w-full h-fit flex flex-row items-center gap-[10px]">
            <div className="w-full h-px bg-white/[.15]"></div>
            <p className="text-xs text-white opacity-75 font-semibold">hoặc</p>
            <div className="w-full h-px bg-white/[.15]"></div>
          </div>
          <div className="w-full h-fit flex flex-col items-start gap-[10px]">
            <p className="text-sm text-lightGray font-semibold">Email*</p>
            <div className="w-full h-[48px] flex px-[16px] rounded-full border-[1.5px] border-white/20">
              <input
                type="text"
                placeholder="you@example.com"
                className="w-full bg-transparent border-none outline-none placeholder:text-sm placeholder:text-white/60 placeholder:font-medium text-sm text-white/75 font-medium"
              />
            </div>
          </div>
          <div className="w-full h-fit flex flex-col items-start gap-[10px]">
            <p className="text-sm text-lightGray font-semibold">Mật khẩu*</p>
            <div className="w-full h-[48px] flex px-[16px] rounded-full border-[1.5px] border-white/20">
              <input
                type="password"
                className="w-full bg-transparent border-none outline-none text-sm text-white/75 font-medium"
              />
            </div>
          </div>
          <div className="w-full h-fit flex flex-row justify-center items-center gap-5 mt-5 mb-[9px]">
            <div
              className="w-[145px] h-[46px] flex justify-center items-center rounded-full bg-lightGray cursor-pointer move-up"
              onClick={handleEmailClick}
            >
              <p className="text-sm text-black font-semibold">Đăng nhập</p>
            </div>
            <p
              className="text-xs text-white/75 hover:text-[#d9f21c] font-semibold cursor-pointer"
              onClick={() => setForgetPassword(true)}
            >
              Quên mật khẩu?
            </p>
          </div>
        </div>
      ) : (
        <ForgotPassword />
      )}
    </>
  );
};

export default SignInOverlay;
