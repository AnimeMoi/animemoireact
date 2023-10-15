"use client";

import {
	Dispatch,
	SetStateAction,
	createContext,
	useContext,
	useState,
} from "react";

interface ContextProps {
	data: object[];
	setData: Dispatch<SetStateAction<[]>>;
	selectedSource: string;
	setSelectedSource: Dispatch<SetStateAction<string>>;
}

const GlobalContext = createContext<ContextProps>({
	data: [] as [],
	setData: () => [] as [],
	selectedSource: "NetTruyen",
	setSelectedSource: (): string => "",
});

export const GlobalContextProvider = ({ children }:{children: React.ReactNode}) => {
	const [data, setData] = useState([] as []); // Dữ liệu truyện
	const [selectedSource, setSelectedSource] = useState("NetTruyen");

	return (
		<GlobalContext.Provider
			value={{ data, setData, selectedSource, setSelectedSource }}
		>
			{children}
		</GlobalContext.Provider>
	);
};

export const useGlobalContext = () => useContext(GlobalContext);
