import { Domain } from "../domain";

export const search = async (value: string) => {
	try {
		const response = await fetch(`${Domain}AnimeMoi/Search?host=NetTruyen`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				query: value,
				page: 0,
				genres: [],
				exclude: [],
				status: 0,
			}),
		});

		if (!response.ok) {
			console.error("Network response was not ok");
		}

		const data = await response.json();
		return data;
	} catch (error) {
		console.error("Error fetching data:", error);
		return null;
	}
};
