"use client";
import React, { createContext, useContext, useState } from "react";

export const SourceContext = createContext({
	selectedSource: "NetTruyen",
	onSelectSource: (source: string) => {},
});

export const SourceProvider = ({ children }: { children: React.ReactNode }) => {
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
