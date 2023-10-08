"use client";
import { redirect } from "next/navigation";
import auth, { CheckAuth } from "../../components/auth/Firebase";
import { ReactNode, useEffect, useState } from "react";
import { User } from "firebase/auth";
import { search } from "../../utils/search";
import { AddComic } from "../../components/add-comic/AddComic";
import { ButtonPrimary } from "../../components/button/button";
import { Domain } from "../../domain";

export default function Page() {
	// Check role begin
	const [isAdmin, setIsAdmin] = useState(true);
	const user = CheckAuth();
	checkRole(user, setIsAdmin);

	useEffect(() => {
		if (!isAdmin) return redirect("/");
	}, [isAdmin]);
	// Check role end

	// Get total comic
	const [totalComic, setTotalComic] = useState("Loading");
	useEffect(() => {
		fetch("https://hoang3409.link/api/AnimeMoi/TotalComic?host=all")
			.then((result) => result.text())
			.then((result) => {
				setTotalComic(result);
			})
			.catch((e) => {
				console.error(e);
				setTotalComic("Error");
			});
	});
	// End get total comic

	const [addComic, setAddComic] = useState(false);

	const handleShowComponentAddComic = () => {
		setAddComic(!addComic);
	};

	return (
		<div>
			{user === null ? (
				<div>You are not an admin</div>
			) : (
				<div className="w-screen min-h-screen flex items-center bg-richBlack flex-col gap-5">
					<h1 className="text-white text-xl">{`Hello admin ${user?.displayName}`}</h1>
					<h2 className="text-white">Tổng số truyện hiện tại: {totalComic}</h2>
					<ButtonPrimary
						text="Thêm truyện"
						func={handleShowComponentAddComic}
					></ButtonPrimary>
					{addComic === false ? <></> : <AddComic></AddComic>}
				</div>
			)}
		</div>
	);
}

function checkRole(user: User | null, setIsAdmin: any) {
	user?.getIdTokenResult().then((idTokenResult) => {
		if (!idTokenResult.claims.admin) {
			setIsAdmin(false);
		}
	});
}
