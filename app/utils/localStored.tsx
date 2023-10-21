export function getMangas() {
    const storedMangas = localStorage.getItem("mangas");
    return storedMangas ? JSON.parse(storedMangas) : [];
}

export function findIndexByChapNumber(chapters: any[], chapNumber: number) {
    return chapters.findIndex((item: any) => item.chapNumber === chapNumber);
}