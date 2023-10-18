import {Domain} from "../domain";

export const GetMangas = async (
    selectedSource: string,
    currentPage: number
) => {
    try {
        // Fetch dữ liệu truyện theo trang hiện tại
        const response = await fetch(
            `${Domain}AnimeMoi?host=${selectedSource}&page=${currentPage}&size=24`
        );

        const responseData = await response.json();
        return responseData["mangas"];
    } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
    }
};

export const GetManga = async (params: any, host: string) => {
    try {
        const response = await fetch(
            `${Domain}AnimeMoi/Manga?idComic=${params.searchParams.id}&host=${host}`
        );

        return await response.json();
    } catch (e) {
        console.error(e);
        throw e;
    }
};

export const GetTotal = async (selectedSource: string = "all") => {
    try {
        // Fetch tổng số manga (Hiện tại hỗ trợ NetTruyen và Yurineko)
        const totalResponse = await fetch(
            `${Domain}AnimeMoi/TotalComic?host=${selectedSource}`
        );

        return await totalResponse.json();
    } catch (error) {
        console.error("Error fetching total manga:", error);
        throw error;
    }
};
