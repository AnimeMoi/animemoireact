"use client";
import { redirect } from "next/navigation";
import auth, { CheckAuth } from "../../components/auth/Firebase";
import { useEffect, useState } from "react";
import { User } from "firebase/auth";
import { search } from "../../utils/search";
import { AddComic } from "../../components/add-comic/AddComic";
import { ButtonPrimary } from "../../components/button/button";

export default function Page() {
	// Check role begin
	const [isAdmin, setIsAdmin] = useState(true);
	const user = CheckAuth();
	checkRole(user, setIsAdmin);

	useEffect(() => {
		if (!isAdmin) return redirect("/");
	}, [isAdmin]);
	// Check role end

	// Search Begin
	const [searchInput, setSearchInput] = useState("");
	const [searchResults, setSearchResults] = useState([]);
	const [isSearchResultVisible, setIsSearchResultVisible] = useState(false);
	const [delayedChange, setDelayedChange] = useState("");

	useEffect(() => {
		const timeout = setTimeout(() => {
			setDelayedChange(searchInput);
		}, 300);
		return () => clearTimeout(timeout);
	}, [searchInput]);

	useEffect(() => {
		if (delayedChange !== "") {
			const fetchData = async (value: string) => {
				setIsSearchResultVisible(value.length > 0);
				setSearchResults(await search(value, "NetTruyen"));
			};

			fetchData(delayedChange);
		} else {
			setIsSearchResultVisible(false);
		}
	}, [delayedChange]);
	// Search End

	// var totalComic = fetch(`${Domain}Admin`);

	const [addComic, setAddComic] = useState(false);

	const handleShowComponentAddComic = () => {
		setAddComic(!addComic);
	};

	return (
		<>
			{user === null ? (
				<></>
			) : (
				<div className="w-screen min-h-screen flex items-center bg-richBlack flex-col gap-5">
					<h1 className="text-white text-xl">{`Hello admin ${user?.displayName}`}</h1>
					<div>
						<span className="text-white">Tổng số truyện hiện tại: </span>
					</div>
					<div>
						<ButtonPrimary
							text="Thêm truyện"
							func={handleShowComponentAddComic}
						></ButtonPrimary>
					</div>
					{addComic === false ? <></> : <AddComic></AddComic>}
				</div>
			)}
		</>
	);
}

function checkRole(user: User | null, setIsAdmin: any) {
	user?.getIdTokenResult().then((idTokenResult) => {
		if (!idTokenResult.claims.admin) {
			setIsAdmin(false);
		}
	});
}
