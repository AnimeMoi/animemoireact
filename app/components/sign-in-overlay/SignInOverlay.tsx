import React, { useState } from "react";
import "../../globals.css";
import "./SignInOverlay.css";
import Image from "next/image";
import GoogleLogo from "../../images/brand-logo/google-logo.png";
import FacebookLogo from "../../images/brand-logo/facebook-logo.png";
import XLogo from "../../images/brand-logo/x-logo.png";

type SignInProps = {
  onEmailSignUp: () => void;
  onGoogleSignUp: () => void;
  onXSignUp: () => void;
  onFacebookSignUp: () => void;
};

const SignInOverlay: React.FC<SignInProps> = ({
  onEmailSignUp,
  onGoogleSignUp,
  onXSignUp,
  onFacebookSignUp,
}) => {
  const [isEmailClicking, setIsEmailClicking] = useState(false);
  const [isGoogleClicking, setIsGoogleClicking] = useState(false);
  const [isXClicking, setIsXClicking] = useState(false);
  const [isFacebookClicking, setIsFacebookClicking] = useState(false);

  const handleEmailClick = () => {
    onEmailSignUp();
    setIsEmailClicking(true);
  };

  const handleGoogleClick = () => {
        signInWithPopup(auth, provider)
            .then((result) => {
                const credential = GoogleAuthProvider.credentialFromResult(result)
                const token = credential?.accessToken
                console.log(`success: ${token}`)
                onAuthStateChanged(result.user)
            })
            .catch((error) => {
                console.error(error)
            })
        setIsGoogleClicking(true);
    };

  const handleXClick = () => {
    onXSignUp();
    setIsXClicking(true);
  };

  const handleFacebookClick = () => {
    onFacebookSignUp();
    setIsFacebookClicking(true);
  };

  return (
    <div className="font-primary w-[335px] h-fit flex flex-col gap-[20px] p-4 bg-richBlack/50 backdrop-blur-[10px] rounded-[34px] border-[1.5px] border-white/20 overlay-show">
      <p className="text-lg text-lightGray font-semibold text-center">
        Đăng nhập
      </p>
      <div className="w-full grid gap-[13px] grid-cols-2">
        <div
          className="w-[145px] h-[46px] flex flex-row justify-center items-center gap-[10px] rounded-full border-[1.5px] border-lightGray/20 cursor-pointer move-up"
          onClick={handleGoogleClick}
        >
          <Image src={GoogleLogo} alt={""} className="w-[16px] h-[16px]" />
          <span className="text-sm text-lightGray font-semibold">Google</span>
        </div>
        <div
          className="w-[145px] h-[46px] flex flex-row justify-center items-center gap-[10px] rounded-full border-[1.5px] border-lightGray/20 cursor-pointer move-up"
          onClick={handleXClick}
        >
          <Image src={XLogo} alt={""} className="w-[16px] h-[16px]" />
          <span className="text-sm text-lightGray font-semibold">X</span>
        </div>
        <div
          className="w-[145px] h-[46px] flex flex-row justify-center items-center gap-[10px] rounded-full border-[1.5px] border-lightGray/20 cursor-pointer move-up"
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
          />
        </div>
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
        className="w-full h-[48px] mt-[20px] flex justify-center items-center rounded-full bg-lightGray cursor-pointer move-up"
        onClick={handleEmailClick}
      >
        <span className="text-sm text-black font-semibold">Đăng nhập</span>
      </div>
    </div>
  );
};

export default SignInOverlay;

    