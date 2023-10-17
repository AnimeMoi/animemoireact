"use client";
import React, { Dispatch, SetStateAction, useCallback, useEffect } from "react";
import "../../globals.css";

interface ScrollIndicatorProps {
	scrollPercentage: number;
	setScrollPercentage: Dispatch<SetStateAction<number>>;
}

const ScrollIndicator: React.FC<ScrollIndicatorProps> = ({
	scrollPercentage,
	setScrollPercentage,
}) => {
	const handleScroll = useCallback(() => {
		const windowHeight = window.innerHeight;
		const documentHeight = document.documentElement.scrollHeight - windowHeight;
		const scrolled = window.scrollY;
		const percentage = (scrolled / documentHeight) * 100;

		setScrollPercentage(percentage);
	}, [setScrollPercentage]);

	useEffect(() => {
		window.addEventListener("scroll", handleScroll);

		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, [handleScroll]);

	return (
		<div
			className="w-full h-[4px] bg-[#d9f21c] rounded-full"
			style={{ width: `${scrollPercentage}%` }}
		></div>
	);
};

export default ScrollIndicator;
