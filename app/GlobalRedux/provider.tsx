"use client";
import React from "react";
import { Provider } from "react-redux";
import store from "./store";

export type GlobalProviderProps = {
  children: React.ReactNode;
};

const ReduxProvider: React.FC<GlobalProviderProps> = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};

export default ReduxProvider;
