"use client";
import { redirect } from "next/navigation";
import auth, { CheckAuth } from "../../components/auth/Firebase";
import { useEffect, useState } from "react";
import { User } from "firebase/auth";

export default function Page() {
	const [isAdmin, setIsAdmin] = useState(true);
	const user = CheckAuth();
	checkRole(user, setIsAdmin);
	useEffect(() => {
		if (!isAdmin) return redirect("/");
	}, [isAdmin]);

	return (
		<>{user === null ? <></> : <h1>{`Hello admin ${user?.displayName}`}</h1>}</>
	);
}

function checkRole(user: User | null, setIsAdmin: any) {
	user?.getIdTokenResult().then((idTokenResult) => {
		if (!idTokenResult.claims.admin) {
			setIsAdmin(false);
		}
	});
}
