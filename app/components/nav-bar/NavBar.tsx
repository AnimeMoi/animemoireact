"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { House, List, MagnifyingGlass } from "@phosphor-icons/react";
import "../../globals.css";
import "./NavBar.css";
import Avatar from "../../public/assets/images/avatar.jpg";
import AccountSettingOverlay from "../account-setting-overlay/AccountSettingOverlay";
import GenreOverlay from "../genre-overlay/GenreOverlay";
import SearchResult from "../search-result/SearchResult";
import SignInOverlay from "../sign-in-overlay/SignInOverlay";
import SignUpOverlay from "../sign-up-overlay/SignUpOverlay";
import { clickToHide } from "../../utils/clickToHide";
import { Search } from "../../utils/search";
import { NavBarProps, SearchParams } from "../../types/App";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../globalRedux/store";
import { useGlobalContext } from "../../globalContext/store";
import { setSelectedGenre } from "../../globalRedux/Features/genre/genreSlice";
import { setCurrentPage } from "../../globalRedux/Features/page/pageSlice";

const NavBar = ({ isHomePage, isGenres }: NavBarProps) => {
  const selectedGenre = useSelector(
    (state: RootState) => state.genres.selectedGenres
  );
  const [showOverlayType, setShowOverlayType] = useState<
    "genre" | "signIn" | "signUp" | "accountSetting" | null
  >(null);

  const dispatch = useDispatch();
  const selectedSource = useSelector(
    (state: RootState) => state.source.selectedSource
  );

  const { user } = useGlobalContext();

  const [searchInput, setSearchInput] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearchResultVisible, setIsSearchResultVisible] = useState(false);
  const [delayedChange, setDelayedChange] = useState("");

  function handleAuthStateChanged() {
    setShowOverlayType(null);
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
          page: 1,
          genres: [],
          exclude: [],
          status: 0,
          host: selectedSource,
        };
        const data = await Search(searchParams);
        if (data) {
          setSearchResults(data);
          setIsSearchResultVisible(data.length > 0);
        }
      };

      fetchData(delayedChange).then(() => {});
    } else {
      setIsSearchResultVisible(false);
    }
  }, [delayedChange, selectedSource]);

  const clickToHideSearchResult = clickToHide(
    "searchResult",
    setIsSearchResultVisible
  );

  useEffect(() => {
    document.addEventListener("click", clickToHideSearchResult);

    return () => {
      document.removeEventListener("click", clickToHideSearchResult);
    };
  }, [clickToHideSearchResult]);

  useEffect(() => {
    setShowOverlayType(null);
  }, [selectedSource, selectedGenre]);

  const handleReset = () => {
    dispatch(setCurrentPage(1));
    dispatch(setSelectedGenre(null));
  };

  return (
    <div className="w-full h-[85px] flex flex-row justify-between items-center bg-richBlack border-b-[1px] border-white/[.15]">
      <div className="text-2xl text-lightGray font-semibold uppercase tracking-wider">
        <Link href={`/`} onClick={handleReset}>
          AnimeMoi
        </Link>
      </div>
      <div className="w-fit h-fit flex flex-row gap-[15px]">
        {isHomePage ? null : (
          <Link
            href={`/`}
            className="w-[46px] h-[46px] flex justify-center items-center rounded-full border-[1.5px] border-white/20"
          >
            <House color="#f4f4f4" weight="bold" size={18} />
          </Link>
        )}
        <div className="relative">
          <div className="w-[280px] h-[46px] flex flex-row items-center gap-2.5 px-[15px] rounded-full border-[1.5px] border-white/20">
            <MagnifyingGlass color="#f4f4f4" weight="bold" size={18} />
            <input
              type="text"
              placeholder="Tìm truyện"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="w-full h-full bg-transparent border-none outline-none placeholder:text-[13px] placeholder:text-white/75 placeholder:font-medium text-[13px] text-white/75 font-medium"
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
        {isGenres && (
          <div
            className="w-fit h-[46px] flex flex-row items-center gap-2.5 px-[14px] rounded-full border-[1.5px] border-white/20 cursor-pointer"
            onClick={handleOverlayToggle("genre")}
          >
            <List color="#f4f4f4" weight="bold" size={18} />
            <p className="text-[13px] text-lightGray/75 font-medium">
              Thể loại
            </p>
          </div>
        )}
      </div>
      {user ? (
        <Image
          src={user.photoURL || Avatar}
          alt={""}
          width={44}
          height={44}
          className="scale-in rounded-full outline outline-[1.5px] outline-white/20 outline-offset-[-1.5px] cursor-pointer"
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
          <GenreOverlay />
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
          <AccountSettingOverlay onClose={() => setShowOverlayType(null)} />
        </div>
      )}
    </div>
  );
};

export default NavBar;
