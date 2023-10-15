import { Domain } from "../domain";
import { SearchParams } from "../types/App";

export const Search = async ({
	query,
	page,
	genres,
	exclude,
	status,
}: SearchParams) => {
	try {
		const response = await fetch(`${Domain}AnimeMoi/Search?host=NetTruyen`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				query,
				page,
				genres,
				exclude,
				status,
			}),
		});

		const data = await response.json();
		return data;
	} catch (error) {
		console.error("Error fetching data:", error);
		return null;
	}
};
