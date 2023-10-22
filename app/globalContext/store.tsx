"use client";
import React, {createContext, useContext, useEffect, useMemo, useState,} from "react";
import auth from "../components/auth/Firebase";
import {User} from "firebase/auth";
import {GlobalContextProps, GlobalProviderProps} from "../types/App";

export const GlobalContext = createContext<GlobalContextProps | undefined>(undefined);

export const ContextProvider: React.FC<GlobalProviderProps> = ({children}) => {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        auth.onAuthStateChanged((authUser) => {
            setUser(authUser);
        });
    }, []);

    const contextValue = useMemo(() => ({user, setUser}), [user]);

    return (
        <GlobalContext.Provider value={contextValue}>
            {children}
        </GlobalContext.Provider>
    );
};

export const useGlobalContext = () => {
    const context = useContext(GlobalContext);
    if (!context) {
        throw new Error("useGlobalContext must be used within a GlobalProvider");
    }
    return context;
};
