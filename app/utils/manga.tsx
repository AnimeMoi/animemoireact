import { Domain } from "../domain";

export const fetchMangaData = async (
	selectedSource: string,
	currentPage: number
) => {
	try {
		// Fetch dữ liệu truyện theo trang hiện tại
		const response = await fetch(
			`${Domain}AnimeMoi?host=${selectedSource}&page=${currentPage}&size=24`
		);

		if (!response.ok) {
			throw new Error("Network response was not ok");
		}

		const responseData = await response.json();
		const newData = responseData.mangas;

		return newData;
	} catch (error) {
		console.error("Error fetching data:", error);
		throw error;
	}
};

export const GetTotal = async (selectedSource: string = "all") => {
	try {
		// Fetch tổng số manga (Hiện tại hỗ trợ NetTruyen và Yurineko)
		const totalResponse = await fetch(
			`${Domain}AnimeMoi/TotalComic?host=${selectedSource}`
		);

		if (!totalResponse.ok) {
			throw new Error("Network response was not ok");
		}

		const total = await totalResponse.json();
		return total;
	} catch (error) {
		console.error("Error fetching total manga:", error);
		throw error;
	}
};
