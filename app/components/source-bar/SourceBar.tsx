"use client";
import React from "react";
import "../../globals.css";
import clsx from "clsx";
import {motion} from "framer-motion";
import {useDispatch, useSelector} from "react-redux";
import {onSelectSource} from "../../globalRedux/Features/source/sourceSlice";
import {RootState} from "../../globalRedux/store";
import {useGlobalContext} from "../../globalContext/store";

const SourceBar: React.FC = () => {
    const dispatch = useDispatch();
    const selectedSource = useSelector(
        (state: RootState) => state.source.selectedSource
    );

    const {user} = useGlobalContext();

    const sources = [
        {name: "NetTruyen", label: "NetTruyen"},
        {name: "BaoTangTruyen", label: "BaoTangTruyen"},
        {name: "CManga", label: "CManga"},
        {name: "Yurineko", label: "Yurineko"},
        {name: "HentaiVN", label: "HentaiVN"},
        {name: "LxManga", label: "LxManga"},
        {name: "SayHentai", label: "SayHentai"},
    ];

    return (
        <div className="w-full h-fit flex justify-center">
            {user ? (
                <div
                    className="w-fit h-fit flex flex-row gap-2.5 p-[5px] text-sm text-white/75 font-medium rounded-full border-[1.5px] border-white/20">
                    {sources.map((source) => (
                        <div
                            key={source.name}
                            className={clsx("px-[15px] py-[10px] cursor-pointer relative", {
                                "text-black font-semibold": selectedSource === source.name,
                            })}
                            onClick={() => dispatch(onSelectSource(source.name))}
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
                    ))}
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
