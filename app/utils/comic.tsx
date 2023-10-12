import { Domain } from "../domain";

export async function getComic(
	page: number = 1,
	host: string = "all",
	size: number = 20
) {
	const request = await fetch(
		`${Domain}AnimeMoi?host=${host}&page=${page}&size=${size}`
	);
	const data = await request.json();
	return data.mangas;
}

export async function getTotal(host: string = "all"): Promise<number> {
	return fetch(`https://hoang3409.link/api/AnimeMoi/TotalComic?host=${host}`)
		.then((result) => result.text())
		.then((result) => {
			return parseInt(result);
		})
		.catch((e) => {
			console.error(e);
			return 0;
		});
}
