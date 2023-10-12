// export type Mangas = {
//   numberManga: number;
//   mangas: [
//     {
//       id: number;
//       title: [
//         {
//           id: number;
//           title: string;
//         },
//       ];
//       url: string;
//       cover: string;
//       author: string;
//       description: string;
//       genreMangas: {
//         id: number;
//       };
//     },
//   ];
// };

import { Icon } from "@phosphor-icons/react";
import { ReactElement, ReactNode } from "react";
import { JsxAttribute, JsxElement } from "typescript";

export type SourceProviderProps = {
  children: React.ReactNode;
};

export type SourceContextProps = {
  selectedSource: string;
  onSelectSource: (source: string) => void;
};

export type Chapter = {
  id: number;
  title: string;
  timeUpdate: string;
  views: number;
};

export type Chapters = Chapter[];

export type NavBarProps = {
  isHomePage: boolean;
};

export type ButtonProps = {
  text: string;
  func: any;
};

export type SignUpProps = {
  onAuthStateChanged: (user: any) => void;
};

export type SignInProps = {
  onAuthStateChanged: (user: any) => void;
};

export type MangaReadProps = {
  host: string;
  params: any;
};

export type SearchResultProps = {
  results: any[];
};

export type ReportMangaProps = {
  onSend: () => void;
  onClose: () => void;
};

export type MangaInfoProps = {
  cover: string;
  title: string;
  author: string;
  status: number;
  views: number;
  description: string;
};

export type MangaDetailProps = {
  host: string;
  params: any; // Truyền biến params qua props
};

export type ChapterListProps = {
  host: string;
  params: any; // Truyền biến params qua props
};

/*
Nhưng tôi đã làm 1 file sourceContext rồi và tôi cần bạn viết lại giúp:
- sourceContext.tsx:
"use client";
import React, { createContext, useContext, useState } from "react";

export type SourceProviderProps = {
  children: React.ReactNode;
};

export type SourceContextProps = {
  selectedSource: string;
  onSelectSource: (source: string) => void;
};

export const SourceContext = createContext<SourceContextProps>({
  selectedSource: "NetTruyen", // Mặc định là "NetTruyen"
  onSelectSource: () => {}, // Một hàm callback rỗng ban đầu
});

export const SourceProvider: React.FC<SourceProviderProps> = ({ children }) => {
  const [selectedSource, setSelectedSource] = useState("NetTruyen");

  const onSelectSource = (source: string) => {
    setSelectedSource(source);
  };

  return (
    <SourceContext.Provider value={{ selectedSource, onSelectSource }}>
      {children}
    </SourceContext.Provider>
  );
};

export const useSourceContext = () => {
  const context = useContext(SourceContext);
  if (!context) {
    throw new Error("useMangaContext must be used within a MangaProvider");
  }
  return context;
};
*/
