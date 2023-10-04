"use client";
import React, { createContext, useContext, useState } from "react";

type SourceProviderProps = {
  children: React.ReactNode;
};

type SourceContextProps = {
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
