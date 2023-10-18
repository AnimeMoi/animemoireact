"use client";
import React, {createContext, Dispatch, SetStateAction, useContext, useMemo, useState} from "react";
import {User} from "firebase/auth";
import auth from "../components/auth/Firebase";

type GlobalContextProps = {
    user: User | null;
    setUser: Dispatch<SetStateAction<User | null>>;
};

const GlobalContext = createContext<GlobalContextProps>({
    user: {} as User | null,
    setUser: () => {
    },
});

export const GlobalProvider = ({children}: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);

    auth.onAuthStateChanged((user) => {
        setUser(user);
    });

    const contextValue = useMemo(
        () => ({
            user,
            setUser,
        }),
        [user]
    );

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
