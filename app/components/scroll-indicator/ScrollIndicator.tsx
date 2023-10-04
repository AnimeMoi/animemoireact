"use client";
import React, { useEffect, useState } from "react";
import "../../globals.css";

const ScrollIndicator: React.FC = () => {
  const [scrollPercentage, setScrollPercentage] = useState<number>(0);

  const handleScroll = () => {
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight - windowHeight;
    const scrolled = window.scrollY;
    const percentage = (scrolled / documentHeight) * 100;

    setScrollPercentage(percentage);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      className="w-full h-[4px] bg-[#d9f21c] rounded-full"
      style={{ width: `${scrollPercentage}%` }}
    ></div>
  );
};

export default ScrollIndicator;
