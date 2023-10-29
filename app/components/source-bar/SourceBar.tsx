"use client";
import React from "react";
import "../../globals.css";
import clsx from "clsx";
import {motion} from "framer-motion";
import {useDispatch, useSelector} from "react-redux";
import {onSelectSource} from "../../globalRedux/Features/source/sourceSlice";
import {RootState} from "../../globalRedux/store";
import {useGlobalContext} from "../../globalContext/store";
import {setSelectedGenre} from "../../globalRedux/Features/genre/genreSlice";

const SourceBar: React.FC = () => {
    const dispatch = useDispatch();
    const selectedSource = useSelector(
        (state: RootState) => state.source.selectedSource
    );
    const config = useSelector((state: RootState) => state.config);

    const {user} = useGlobalContext();

    const sources = [
        {name: "NetTruyen", label: "NetTruyen", nsfw: false},
        {name: "BaoTangTruyen", label: "BaoTangTruyen", nsfw: false},
        // {name: "CManga", label: "CManga", nsfw: false}, CManga đang lỗi
        {name: "Yurineko", label: "Yurineko", nsfw: false},
        {name: "HentaiVN", label: "HentaiVN", nsfw: true},
        {name: "LxManga", label: "LxManga", nsfw: true},
        {name: "SayHentai", label: "SayHentai", nsfw: true},
    ];

    const filteredSources = sources.filter((source) => !source.nsfw);

    const onChangeSource = (name: string) => {
        dispatch(onSelectSource(name));
        dispatch(setSelectedGenre(null));
    }

    const showSources = (sources: any[]) => {
        return sources.map((source) => (
            <div
                key={source.name}
                className={clsx("px-[15px] py-[10px] cursor-pointer relative", {
                    "text-black font-semibold": selectedSource === source.name,
                })}
                onClick={() => onChangeSource(source.name)}
            >
                <div className="relative z-10">{source.label}</div>

                {selectedSource === source.name && (
                    <motion.div
                        className="bg-lightGray rounded-full absolute inset-0 z-0"
                        layoutId="activeSection"
                        transition={{
                            type: "spring",
                            stiffness: 380,
                            damping: 30,
                        }}
                    ></motion.div>
                )}
            </div>
        ));
    };

    return (
        <div className="w-full h-fit flex justify-center">
            {user ? (
                <div
                    className="w-fit h-fit flex flex-row gap-[8px] p-[4px] text-[13px] text-white/75 font-medium rounded-full border-[1.5px] border-white/20">
                    {config.nsfw ? showSources(sources) : showSources(filteredSources)}
                </div>
            ) : (
                <div className="text-sm text-white/75 font-medium">
                    Bạn đọc hãy đăng nhập để được đọc truyện từ nhiều nguồn mà AnimeMoi đã
                    tổng hợp.
                </div>
            )}
        </div>
    );
};

export default SourceBar;
