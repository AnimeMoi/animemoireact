"use client";
import React, { createContext, useContext, useState } from "react";

type ContextType = {
  isYurinekoVisible: boolean;
  toggleYurinekoVisibility: () => void;
  isHentaiVNVisible: boolean;
  toggleHentaiVNVisibility: () => void;
  // Thêm các trạng thái và hoạt động khác tại đây
};

const ToggleContext = createContext<ContextType>({
  isYurinekoVisible: false,
  toggleYurinekoVisibility: () => {},
  isHentaiVNVisible: false,
  toggleHentaiVNVisibility: () => {},
  // Khởi tạo giá trị mặc định cho các trạng thái khác
});

export const useToggleContext = () => useContext(ToggleContext);

export const ToggleProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isYurinekoVisible, setIsYurinekoVisible] = useState(false);
  const [isHentaiVNVisible, setIsHentaiVNVisible] = useState(false);
  // Thêm các state khác tại đây

  const toggleYurinekoVisibility = () => {
    setIsYurinekoVisible((prev) => !prev);
  };

  const toggleHentaiVNVisibility = () => {
    setIsHentaiVNVisible((prev) => !prev);
  };
  // Thêm các hàm xử lý khác tại đây

  return (
    <ToggleContext.Provider
      value={{
        isYurinekoVisible,
        toggleYurinekoVisibility,
        isHentaiVNVisible,
        toggleHentaiVNVisibility,
        // Thêm các trạng thái và hàm xử lý khác vào value
      }}
    >
      {children}
    </ToggleContext.Provider>
  );
};
