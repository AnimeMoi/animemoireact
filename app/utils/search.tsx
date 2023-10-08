import { Domain } from "../domain";

export async function search(query: string, host: string) {
	try {
		const response = await fetch(`${Domain}AnimeMoi/Search?host=${host}`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				query: query,
				page: 1,
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
		console.error("Error fetching data: ", error);
	}
}
