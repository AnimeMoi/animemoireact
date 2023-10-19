"use client";
import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
  useMemo,
} from "react";
import auth from "../components/auth/Firebase";
import { User } from "firebase/auth";

export type GlobalProviderProps = {
  children: React.ReactNode;
};

export type GlobalContextProps = {
  user: User | null;
  setUser: Dispatch<SetStateAction<User | null>>;
};

export const GlobalContext = createContext<GlobalContextProps | undefined>(
  undefined
);

export const ContextProvider: React.FC<GlobalProviderProps> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);

  auth.onAuthStateChanged((authUser) => {
    setUser(authUser);
  });

  const contextValue = useMemo(() => ({ user, setUser }), [user]);

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
