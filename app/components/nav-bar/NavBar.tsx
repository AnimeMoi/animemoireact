"use client";
import React, { useEffect, useState } from "react";
import "../../globals.css";
import "./NavBar.css";
import { House, MagnifyingGlass, List } from "@phosphor-icons/react";
import Image from "next/image";
import Link from "next/link";
import { useSourceContext } from "../../sourceContext";
import { NavBarProps, SearchParams } from "../../types/App";
import auth from "../auth/Firebase";
import Avatar from "../../public/assets/images/avatar.jpg";
import SearchResult from "../search-result/SearchResult";
import GenreOverlay from "../genre-overlay/GenreOverlay";
import SignInOverlay from "../sign-in-overlay/SignInOverlay";
import SignUpOverlay from "../sign-up-overlay/SignUpOverlay";
import AccountSettingOverlay from "../account-setting-overlay/AccountSettingOverlay";
import { Search } from "../../utils/search";
import { clickToHide } from "../../utils/clickToHide";

const NavBar: React.FC<NavBarProps> = ({ isHomePage }) => {
  const [showOverlayType, setShowOverlayType] = useState<
    "genre" | "signIn" | "signUp" | "accountSetting" | null
  >(null);

  const { selectedSource, onSelectSource } = useSourceContext();
  const isLoggedIn = auth.currentUser;

  const [searchInput, setSearchInput] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearchResultVisible, setIsSearchResultVisible] = useState(false);
  const [delayedChange, setDelayedChange] = useState("");

  function handleAuthStateChanged(user: any) {
    if (user) {
      setShowOverlayType(null);
    }
  }

  const handleOverlayToggle =
    (type: "genre" | "signIn" | "signUp" | "accountSetting") => () => {
      setShowOverlayType(type);
    };

  const showGenreOverlay = showOverlayType === "genre";
  const showSignInOverlay = showOverlayType === "signIn";
  const showSignUpOverlay = showOverlayType === "signUp";
  const showAccountSettingOverlay = showOverlayType === "accountSetting";

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      setShowOverlayType(null);
    }
  };

  const handleButtonClick = () => (): void => {};

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDelayedChange(searchInput);
    }, 300);
    return () => clearTimeout(timeout);
  }, [searchInput]);

  useEffect(() => {
    if (delayedChange !== "") {
      const fetchData = async (value: string) => {
        const searchParams: SearchParams = {
          query: value,
          page: 0,
          genres: [null],
          exclude: [null],
          status: 0,
          host: selectedSource,
        };
        const data = await Search(searchParams);
        if (data) {
          setSearchResults(data);
          setIsSearchResultVisible(data.length > 0);
        }
      };

      fetchData(delayedChange);
    } else {
      setIsSearchResultVisible(false);
    }
  }, [delayedChange]);

  const clickToHideSearchResult = clickToHide(
    "searchResult",
    setIsSearchResultVisible
  );

  useEffect(() => {
    document.addEventListener("click", clickToHideSearchResult);

    return () => {
      document.removeEventListener("click", clickToHideSearchResult);
    };
  }, []);

  const [selectedGenre, setSelectedGenre] = useState<number | null>(null);

  const handleGenreSelect = (genre: number) => {
    setSelectedGenre(genre);
    setShowOverlayType(null);
  };

  return (
    <div className="w-full h-[90px] flex flex-row justify-between items-center bg-richBlack border-b-[1.5px] border-white/[.15]">
      <div className="text-2xl text-lightGray font-semibold uppercase tracking-wider">
        <Link href={`/`}>AnimeMoi</Link>
      </div>
      <div className="w-fit h-fit flex flex-row gap-[15px]">
        {isHomePage ? null : (
          <Link
            href={`/`}
            className="w-[48px] h-[48px] flex justify-center items-center rounded-full border-[1.5px] border-white/20"
          >
            <House color="#f4f4f4" weight="bold" size={18} />
          </Link>
        )}
        <div className="relative">
          <div className="w-[280px] h-[48px] flex flex-row items-center gap-2.5 px-[15px] rounded-full border-[1.5px] border-white/20">
            <MagnifyingGlass color="#f4f4f4" weight="bold" size={18} />
            <input
              type="text"
              placeholder="Tìm truyện"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="w-full h-full bg-transparent border-none outline-none placeholder:text-sm placeholder:text-white/75 placeholder:font-medium text-sm text-white/75 font-medium"
            />
          </div>
          {isSearchResultVisible && (
            <div
              id="searchResult"
              className="absolute top-[120%] left-0 z-[200]"
            >
              <SearchResult results={searchResults} />
            </div>
          )}
        </div>
        <div
          className="w-fit h-[48px] flex flex-row items-center gap-2.5 px-[15px] rounded-full border-[1.5px] border-white/20 cursor-pointer"
          onClick={handleOverlayToggle("genre")}
        >
          <List color="#f4f4f4" weight="bold" size={18} />
          <p className="text-sm text-lightGray/75 font-medium">Thể loại</p>
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
          <p
            className="scale-in text-sm text-lightGray font-semibold cursor-pointer"
            onClick={handleOverlayToggle("signIn")}
          >
            Đăng nhập
          </p>
          <div
            className="scale-in w-fit h-fit px-[15px] py-[10px] bg-lightGray rounded-full cursor-pointer"
            onClick={handleOverlayToggle("signUp")}
          >
            <p className="text-sm text-black font-semibold">Đăng ký</p>
          </div>
        </div>
      )}

      {showGenreOverlay && (
        <div
          className="fixed inset-0 flex justify-center items-start pt-[90px] bg-richBlack/75 z-[200]"
          onClick={handleOverlayClick}
        >
          <GenreOverlay onGenreSelect={handleGenreSelect} />
        </div>
      )}

      {showSignInOverlay && (
        <div
          className="fixed inset-0 flex justify-center items-center bg-richBlack/75 z-[200]"
          onClick={handleOverlayClick}
        >
          <SignInOverlay onAuthStateChanged={handleAuthStateChanged} />
        </div>
      )}

      {showSignUpOverlay && (
        <div
          className="fixed inset-0 flex justify-center items-center bg-richBlack/75 z-[200]"
          onClick={handleOverlayClick}
        >
          <SignUpOverlay onAuthStateChanged={handleAuthStateChanged} />
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
            onClose={() => setShowOverlayType(null)}
          />
        </div>
      )}
    </div>
  );
};

export default NavBar;
