"use client";
import { redirect } from "next/navigation";
import { CheckAuth } from "../../components/auth/Firebase";
import { useEffect, useState } from "react";
import { User } from "firebase/auth";
import { AddComic } from "../../components/add-comic/AddComic";
import { ButtonPrimary } from "../../components/button/button";
import { getTotal } from "../../utils/comic";

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
		const fetchData = async () => {
			let result = await getTotal();
			setTotalComic(result.toString());
		};

		fetchData();
	}, []);
	// End get total comic

	const [addComic, setAddComic] = useState(false);
	const [deleteComic, setDeteleComic] = useState(false);
	const [deleteChapter, setDeteleChapter] = useState(false);

	const handleShowComponentAddComic = () => {
		
		setAddComic(!addComic);
	};
	const handleShowComponentDeleteComic = () => {
		setDeteleComic(!deleteComic);
	};

	const handleShowComponentDeleteChapter = () => {
		setDeteleChapter(!deleteChapter);
	}

	return (
		<div>
			{user === null ? (
				<div>You are not an admin</div>
			) : (
				<div className="w-screen min-h-screen flex items-center bg-richBlack flex-col gap-5">
					<h1 className="text-white text-xl">{`Hello admin ${user?.displayName}`}</h1>
					<h2 className="text-white">Tổng số truyện hiện tại: {totalComic}</h2>
					<div className="flex gap-5">
						<ButtonPrimary
							text="Thêm truyện"
							func={handleShowComponentAddComic}
						></ButtonPrimary>
						<ButtonPrimary
							text="Xoá truyện"
							func={handleShowComponentDeleteComic}
						></ButtonPrimary>
						<ButtonPrimary
							text="Xoá chương"
							func={handleShowComponentDeleteChapter}
						></ButtonPrimary>
					</div>
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
