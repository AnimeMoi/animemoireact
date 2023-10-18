import {Domain} from "../domain";
import {SearchParams} from "../types/App";

export const Search = async ({
                                 query,
                                 page,
                                 genres,
                                 exclude,
                                 status,
                                 host,
                             }: SearchParams) => {
    try {
        const response = await fetch(`${Domain}AnimeMoi/Search?host=${host}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                query,
                page,
                genres,
                exclude,
                status,
            }),
        });

        return await response.json();
    } catch (error) {
        console.error("Error fetching data:", error);
        return null;
    }
};
