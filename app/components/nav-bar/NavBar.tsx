"use client"
import React, {useState} from "react";
import "../../globals.css";
import "./NavBar.css";
import {House, List, MagnifyingGlass} from "@phosphor-icons/react";
import Image from "next/image";
import Avatar from "../../images/avatar.jpg";
import SignInOverlay from "../sign-in-overlay/SignInOverlay";
import SignUpOverlay from "../sign-up-overlay/SignUpOverlay";
import auth from "../auth/Firebase";

type NavBarProps = {
    isLogin: boolean;
    isHomePage: boolean;
};

const NavBar: React.FC<NavBarProps> = ({isLogin, isHomePage}: NavBarProps) => {
    const [showOverlayType, setShowOverlayType] = useState<'signIn' | 'signUp' | null>(null);

    function handleAuthStateChanged(user: any) {
        if (user) {
            setShowOverlayType(null);
        }
    }

    const handleOverlayToggle = (type: 'signIn' | 'signUp') => () => {
        setShowOverlayType(type);
    };

    const showSignInOverlay = showOverlayType === 'signIn';
    const showSignUpOverlay = showOverlayType === 'signUp';

    const handleOverlayClick = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget) {
            setShowOverlayType(null);
        }
    };

    function logout() {
        auth.signOut().then(() => {
            console.log("Logout success")
        }).catch((e) => {
            console.error(e)
        })
    }

    function handleButtonClick() {

    }


    return (
        <div
            className="font-primary w-full h-[90px] flex flex-row justify-between items-center bg-richBlack/75 backdrop-blur-[10px] border-b-[1.5px] border-white/[.15] sticky top-0 z-[3]">
            <div className="text-[22px] text-lightGray font-semibold uppercase tracking-wider">AnimeMoi</div>
            <div className="w-fit h-fit flex flex-row gap-[15px]">
                {isHomePage ? (
                    <></>
                ) : (
                    <div
                        className="w-[48px] h-[48px] flex justify-center items-center rounded-full border-[1.5px] border-lightGray/20">
                        <House color="#f4f4f4" weight="bold" size={18}/>
                    </div>
                )}
                <div
                    className="w-[280px] h-[48px] flex flex-row items-center gap-2.5 px-[15px] rounded-full border-[1.5px] border-lightGray/20">
                    <MagnifyingGlass color="#f4f4f4" weight="bold" size={18}/>
                    <input type="text" placeholder="Tìm truyện"
                           className="w-full h-full bg-transparent border-none outline-none placeholder:text-sm placeholder:text-white/75 placeholder:font-medium text-sm text-white/75 font-medium"/>
                </div>
                <div
                    className="w-fit h-[48px] flex flex-row items-center gap-2.5 px-[15px] rounded-full border-[1.5px] border-lightGray/20 cursor-pointer">
                    <List color="#f4f4f4" weight="bold" size={18}/>
                    <span className="text-sm text-lightGray/75 font-medium">Thể loại</span>
                </div>
            </div>
            {isLogin ? (
                <Image
                    src={Avatar}
                    alt={""}
                    className="w-[45px] h-[45px] rounded-full outline outline-[1.5px] outline-white/20 outline-offset-[-1.5px]"
                    onClick={logout}
                />
            ) : (
                <div className="w-fit h-fit flex flex-row gap-5 items-center">
                    <span className="scale-in text-sm text-lightGray font-semibold cursor-pointer"
                          onClick={handleOverlayToggle('signIn')}>Đăng nhập</span>
                    <div className="scale-in w-fit h-fit px-[15px] py-[10px] bg-lightGray rounded-full cursor-pointer"
                         onClick={handleOverlayToggle('signUp')}>
                        <span className="text-sm text-black font-semibold">Đăng ký</span>
                    </div>
                </div>
            )}

            {showSignInOverlay && (
                <div
                    className="w-full h-full fixed top-[230px] left-0 flex justify-center items-center bg-richBlack/75 z-[1]"
                    onClick={handleOverlayClick}>
                    <SignInOverlay
                        onAuthStateChanged={handleAuthStateChanged}
                    />
                </div>
            )}

            {showSignUpOverlay && (
                <div className="w-full h-full top-0 left-0 flex justify-center items-center bg-richBlack/75 z-[1]"
                     onClick={handleOverlayClick}>
                    <SignUpOverlay
                        onEmailSignUp={handleButtonClick}
                        onGoogleSignUp={handleButtonClick}
                        onXSignUp={handleButtonClick}
                        onFacebookSignUp={handleButtonClick}
                    />
                </div>
            )}
        </div>
    );
};

export default NavBar;
