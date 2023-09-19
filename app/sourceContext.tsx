"use client";
import React, { createContext, useContext, useState } from "react";

type SourceContextType = {
  selectedSource: string;
  onSelectSource: (source: string) => void;
};

export const SourceContext = createContext<SourceContextType>({
  selectedSource: "NetTruyen", // Mặc định là "NetTruyen"
  onSelectSource: () => {}, // Một hàm callback rỗng ban đầu
});

export const useSourceContext = () => useContext(SourceContext);

type SourceProviderProps = {
  children: React.ReactNode;
};

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
