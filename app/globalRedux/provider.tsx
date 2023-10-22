"use client";
import React from "react";
import {Provider} from "react-redux";
import store from "./store";
import {GlobalProviderProps} from "../types/App";

const ReduxProvider: React.FC<GlobalProviderProps> = ({children}) => {
    return <Provider store={store}>{children}</Provider>;
};

export default ReduxProvider;
