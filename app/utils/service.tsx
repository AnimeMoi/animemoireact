import { User } from "firebase/auth";
import { Domain } from "../domain";

export const Follow = async (idComic: any, token: string) => {
	const response = await fetch(`${Domain}Service/Follow?idComic=${idComic}`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		},
	});

	return await response.json();
};

export const UnFollow = async (idComic: any, token: string) => {
	const response = await fetch(`${Domain}Service/UnFollow?idComic=${idComic}`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		},
	});

	return await response.json();
};

export const GetProcess = async (user: User, idComic: string) => {
	try {
		const token = await user.getIdToken();
		const response = await fetch(
			`${Domain}Service/GetProcess?idComic=${idComic}`,
			{
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
			}
		);

		const json = await response.json();
		return json;
	} catch (e) {
		console.error(e);
		throw e;
	}
};
