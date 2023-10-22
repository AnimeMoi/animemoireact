import {Config} from "../types/App";

export function getMangas() {
    const storedMangas = localStorage.getItem("mangas");
    return storedMangas ? JSON.parse(storedMangas) : [];
}

export function findIndexByChapNumber(chapters: any[], chapNumber: number) {
    return chapters.findIndex((item: any) => item.chapNumber === chapNumber);
}

export function saveConfig(config: Config) {
    localStorage.setItem("config", JSON.stringify(config));
}

export function getConfig() {
    if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
        const storedConfig = localStorage.getItem("config");
        return storedConfig ? JSON.parse(storedConfig) : {};
    }

    return {};
}