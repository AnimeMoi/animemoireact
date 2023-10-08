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
