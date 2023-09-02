"use client";
import React from "react";
import { useToggleContext } from "../toggleContext";
import NewMangaUpdate_Yurineko from "./new-manga-update-yurineko/NewMangaUpdate";

const VisibilityHandler: React.FC = () => {
  const { isYurinekoVisible } = useToggleContext();

  if (isYurinekoVisible) {
    return <NewMangaUpdate_Yurineko />;
  }

  return null;
};

export default VisibilityHandler;
