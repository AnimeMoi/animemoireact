export function getMangas() {
    const storedMangas = localStorage.getItem("mangas");
    return storedMangas ? JSON.parse(storedMangas) : [];
}