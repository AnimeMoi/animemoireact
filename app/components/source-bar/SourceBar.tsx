"use client";
import React, { useEffect, useState } from "react";
import "../../globals.css";
import clsx from "clsx";
import { motion } from "framer-motion";
import { useSourceContext } from "../../sourceContext";
import auth from "../auth/Firebase";

function CheckAuth() {
	const [isLoggedIn, setIsLoggedIn] = useState(false);

	useEffect(() => {
		auth.onAuthStateChanged((user) => {
			if (user) {
				setIsLoggedIn(true);
			} else {
				setIsLoggedIn(false);
			}
		});
	}, [isLoggedIn]);

	return isLoggedIn;
}

const SourceBar: React.FC = () => {
	const { selectedSource, onSelectSource } = useSourceContext(); // Sử dụng React Context

	const sources = [
		{ name: "NetTruyen", label: "NetTruyen" },
		{ name: "BaoTangTruyen", label: "BaoTangTruyen" },
		{ name: "CManga", label: "CManga" },
		{ name: "Yurineko", label: "Yurineko" },
		{ name: "HentaiVn", label: "HentaiVN" },
		{ name: "LxManga", label: "LxManga" },
		{ name: "SayHentai", label: "SayHentai" },
	];

	const isLoggedIn = CheckAuth();

	return (
		<div className="w-full h-fit flex justify-center">
			{isLoggedIn ? (
				<div className="w-fit h-fit flex flex-row gap-2.5 p-[5px] text-sm text-white/75 font-semibold rounded-full border-[1.5px] border-white/20">
					{sources.map((source) => (
						<div
							key={source.name}
							className={clsx("px-[15px] py-[10px] cursor-pointer relative", {
								"text-black": selectedSource === source.name,
							})}
							onClick={() => onSelectSource(source.name)} // Gọi hàm callback từ React Context
						>
							<span className="relative z-10">{source.label}</span>

							{selectedSource === source.name && (
								<motion.span
									className="bg-lightGray rounded-full absolute inset-0 z-0"
									layoutId="activeSection"
									transition={{
										type: "spring",
										stiffness: 380,
										damping: 30,
									}}
								></motion.span>
							)}
						</div>
					))}
				</div>
			) : (
				<p className="text-sm text-white/75 font-semibold">
					Đăng nhập để được đọc truyện từ nhiều nguồn mà AnimeMoi đã tổng hợp.
				</p>
			)}
		</div>
	);
};

export default SourceBar;
