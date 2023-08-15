"use client"
import React, {useState} from "react";
import "../../globals.css";
import "./NavBar.css";
import {House, List, MagnifyingGlass} from "@phosphor-icons/react";
import Image from "next/image";
import Avatar from "../../images/avatar.jpg";

type NavBarProps = {
    isLoggedIn: boolean;
    isHomePage: boolean;
    onSignin?: () => void;
    onSignup?: () => void;
};

const NavBar: React.FC<NavBarProps> = ({isLoggedIn, isHomePage, onSignin, onSignup}) => {
    const [isSigninClicking, setIsSigninClicking] = useState(false);
    const [isSignupClicking, setIsSignupClicking] = useState(false);

    const handleSigninClick = () => {
        if (onSignin) {
            onSignin();
        }
        setIsSigninClicking(true);
    };

    const handleSignupClick = () => {
        if (onSignup) {
            onSignup();
        }
        setIsSignupClicking(true);
    };

    return (
        <div
            className="font-primary w-full h-[90px] flex flex-row justify-between items-center bg-richBlack/[.75] backdrop-blur-[10px] border-b-[1.5px] border-white/[.15] sticky top-0 z-[1]">
            <div className="text-[22px] text-lightGray font-semibold uppercase tracking-wider">AnimeMoi</div>
            <div className="w-fit h-fit flex flex-row gap-[15px]">
                {isHomePage ? (
                    null
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
                           className="w-full h-full bg-transparent border-none outline-none placeholder:text-sm placeholder:text-white opacity-75 placeholder:font-medium"/>
                </div>
                <div
                    className="w-fit h-[48px] flex flex-row items-center gap-2.5 px-[15px] rounded-full border-[1.5px] border-lightGray/20">
                    <List color="#f4f4f4" weight="bold" size={18}/>
                    <span className="text-sm text-lightGray opacity-75 font-medium">Thể loại</span>
                </div>
            </div>
            {isLoggedIn ? (
                <Image
                    src={Avatar}
                    alt={""}
                    className="w-[45px] h-[45px] rounded-full outline outline-[1.5px] outline-white/20 outline-offset-[-1.5px]"
                />
            ) : (
                <div className="w-fit h-fit flex flex-row gap-5 items-center">
                    <span
                        className={`text-sm text-lightGray font-semibold cursor-pointer ${isSigninClicking ? 'active' : ''}`}
                        onClick={handleSigninClick}>Đăng nhập</span>
                    <div
                        className={`w-fit h-fit px-[15px] py-[10px] bg-lightGray rounded-full cursor-pointer ${isSignupClicking ? 'active' : ''}`}
                        onClick={handleSignupClick}>
                        <span className="text-sm text-black font-semibold">Đăng ký</span>
                    </div>
                </div>
            )}
        </div>
    );
};

export default NavBar;
