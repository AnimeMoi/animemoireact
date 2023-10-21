import {User} from "firebase/auth";
import {Domain} from "../domain";

export const Follow = async (idComic: any, token: string) => {
    const response = await fetch(`${Domain}Service/Follow?idComic=${idComic}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });

    return await response.json();
};

export const UnFollow = async (idComic: any, token: string) => {
    const response = await fetch(`${Domain}Service/UnFollow?idComic=${idComic}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });

    return await response.json();
};

export const GetProcess = async (user: User, idComic: string) => {
    try {
        const token = await user.getIdToken();
        const response = await fetch(
            `${Domain}Service/GetProcess?idComic=${idComic}`,
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        if (response.status === 204) return null;
        return await response.json();
    } catch (e) {
        console.error(e);
        throw e;
    }
};

export async function SaveProcess(follow: any, user: any, params: any) {
    if (follow === null) return;
    const token = await user.getIdToken();
    await fetch(
        `${Domain}Service/SaveProcess?idComic=${params.searchParams.idComic}&idChapter=${params.searchParams.id}`,
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        }
    );
}