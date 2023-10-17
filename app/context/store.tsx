"use client";
import {
	Dispatch,
	SetStateAction,
	createContext,
	useContext,
	useMemo,
	useState,
} from "react";
import { User } from "firebase/auth";
import auth from "../components/auth/Firebase";

type GlobalContextProps = {
	data: object[];
	setData: Dispatch<SetStateAction<object[]>>;
	user: User | null;
	setUser: Dispatch<SetStateAction<User | null>>;
	follow: any | null;
	setFollow: Dispatch<SetStateAction<object | null>>;
};

const GlobalContext = createContext<GlobalContextProps>({
	data: [] as object[],
	setData: (input: any) => {},
	user: {} as User | null,
	setUser: (input: any) => {},
	follow: null,
	setFollow: (input: any) => {},
});

export const GlobalProvider = ({ children }: { children: React.ReactNode }) => {
	const [data, setData] = useState<object[]>([]); // Dữ liệu truyện
	const [user, setUser] = useState<User | null>(null);
	const [follow, setFollow] = useState<any | null>(null);

	auth.onAuthStateChanged((user) => {
		setUser(user);
	});

	const contextValue = useMemo(
		() => ({
			data,
			setData,
			user,
			setUser,
			follow,
			setFollow,
		}),
		[data, follow, user]
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
